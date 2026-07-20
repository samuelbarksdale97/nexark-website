import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

/**
 * AI Readiness Assessment handler.
 *
 * Mirrors app/api/start-lead/route.ts exactly on the resilience contract: deliver every
 * submission by (1) emailing Sam via Gmail SMTP and (2) a best-effort Supabase REST insert.
 * Success if EITHER channel lands; a 502 only when BOTH fail, at which point the client shows the
 * direct-email fallback. A submission is never silently dropped, and the visitor's verdict — which
 * is computed entirely client-side — never depends on this route succeeding.
 *
 * NOTE ON EMAIL TRANSPORT: the handoff mentioned Resend, but this codebase has no Resend
 * dependency or key — it runs nodemailer over Gmail SMTP, which is what start-lead already uses in
 * production. Reusing the working transport rather than introducing a new provider.
 */

type Answers = Record<"q1" | "q2" | "q3" | "q4" | "q5", number>;

// The exact question + option copy from the spec, so the email to Sam reads as real recon rather
// than "q3: 2". Kept server-side; the client owns its own copy of the same list for the UI.
const QUESTIONS: { label: string; options: string[] }[] = [
  {
    label: "What's driving you to look at AI right now?",
    options: [
      "Honestly, just curious — no pressing reason",
      "Businesses around me are using it and I don't want to be left out",
      "We're growing, and I don't want our operations to fall behind our ambition",
      "Something's breaking — the way we operate today can't keep up with the business",
    ],
  },
  {
    label: "Imagine an expert handed you the exact plan next week. What would realistically happen?",
    options: [
      "I'd take the plan and build it myself with AI tools",
      "Honestly? It would probably sit until things calm down",
      "I'd put someone on my team on it and stay close",
      "I'd want them to build and run it with me — I don't need another project on my plate",
    ],
  },
  {
    label: "When you think about paying for this kind of help, which is closest?",
    options: [
      "I'm mainly looking to cut costs — ideally replace some payroll",
      "I'd want to try something small and cheap before spending real money",
      "I'd invest if I could see the return within a few months",
      "It's an investment in staying ahead — good work costs money",
    ],
  },
  {
    label:
      "Last time you handed something important to an outside pro (accountant, agency, contractor) — how did it go?",
    options: [
      "I don't really hand things off — nobody does it like I do",
      "Mixed — I've been burned before, so I'm cautious now",
      "Good, though I stayed heavily involved the whole time",
      "Well — I hire experts, hold them to outcomes, and get out of their way",
    ],
  },
  {
    label: "If this were a fit, who would need to say yes?",
    options: [
      "There's no budget for this yet — I'm exploring for later",
      "I'd need to pitch it to the owner / leadership",
      "Me and a partner — we decide together, quickly",
      "Me — and I could make that call within the month",
    ],
  },
];

const TRACK_LABEL: Record<string, string> = {
  transform: "Transform how my business runs",
  build: "Build something new (app / product / platform)",
};

export async function POST(req: NextRequest) {
  try {
    const d = await req.json();
    const {
      verdict = "",
      score = 0,
      hardFlag = false,
      track = "",
      answers = {} as Answers,
      name = "",
      email = "",
      phone = "",
    } = d ?? {};

    if (!email) {
      return NextResponse.json({ error: "An email is required" }, { status: 400 });
    }

    // Recompute the verdict server-side rather than trusting the client's — cheap, and it keeps a
    // tampered payload from mislabelling a lead in Sam's inbox.
    const nums = [answers.q1, answers.q2, answers.q3, answers.q4, answers.q5].map((n) =>
      Number.isFinite(n) ? Number(n) : 0
    );
    const serverScore = nums.reduce((a, b) => a + b, 0);
    const serverHardFlag = nums[1] === 0 || nums[2] === 0 || nums[3] === 0;
    const serverVerdict = serverScore >= 11 && !serverHardFlag ? "ready" : "not_yet";

    const breakdown = QUESTIONS.map((q, i) => {
      const pick = nums[i];
      const chosen = q.options[pick] ?? "(no answer)";
      return `Q${i + 1} — ${q.label}\n   → ${chosen}  [${pick}]`;
    }).join("\n\n");

    const flagNote = serverHardFlag ? "  ⚑ HARD FLAG" : "";
    const summary = [
      `Readiness: ${serverVerdict === "ready" ? "READY" : "NOT YET"} — ${serverScore}/15${flagNote}`,
      `Looking to: ${TRACK_LABEL[track] || track || "—"}`,
      `Name: ${name || "—"}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      "",
      breakdown,
    ]
      .filter((l) => l !== null)
      .join("\n");

    let emailed = false;
    let stored = false;

    const gmailUser = process.env.GMAIL_ADDRESS;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const notify = process.env.LEAD_NOTIFY_EMAIL || "samuel.barksdale97@gmail.com";
    const transporter =
      gmailUser && gmailPass
        ? nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: { user: gmailUser, pass: gmailPass },
          })
        : null;

    // 1) Email Sam — this is pre-call recon, so readability matters.
    if (transporter) {
      try {
        const short = name || email;
        await transporter.sendMail({
          from: `Nexark Assessment <${gmailUser}>`,
          to: notify,
          replyTo: email,
          subject: `[Readiness] ${serverVerdict === "ready" ? "READY" : "NOT YET"} ${serverScore}/15 — ${short} (${email})`,
          text: summary,
        });
        emailed = true;
      } catch (e) {
        console.error("readiness email to Sam failed:", e);
      }
    }

    // 2) Best-effort Supabase insert. Table may not exist yet; failure is non-fatal.
    const sbUrl = process.env.SUPABASE_URL;
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (sbUrl && sbKey) {
      try {
        const r = await fetch(`${sbUrl}/rest/v1/readiness_submissions`, {
          method: "POST",
          headers: {
            apikey: sbKey,
            Authorization: `Bearer ${sbKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            verdict: serverVerdict,
            score: serverScore,
            hard_flag: serverHardFlag,
            track,
            answers,
            name,
            email,
            phone,
          }),
        });
        stored = r.ok;
        if (!r.ok) console.error("readiness supabase insert failed:", r.status, await r.text());
      } catch (e) {
        console.error("readiness supabase failed:", e);
      }
    }

    // 3) NOT-YET path: send the visitor the checklist. Best-effort — never blocks success, since
    //    Sam already has the lead. The v3 PDF drops in at the linked path (see route notes).
    if (serverVerdict === "not_yet" && transporter) {
      try {
        const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nexark.ai";
        const pdf = `${base}/downloads/nexark-ai-automation-checklist.pdf`;
        await transporter.sendMail({
          from: `Sam at Nexark <${gmailUser}>`,
          to: email,
          replyTo: notify,
          subject: "Your AI automation checklist",
          text: [
            name ? `Hi ${name.split(" ")[0]},` : "Hi,",
            "",
            "Thanks for taking the assessment. Here's the Ultimate AI Automation Checklist we",
            "promised — 50 things you can start on now, no vendor required:",
            "",
            pdf,
            "",
            "Work through what fits. When something starts breaking and you want a hand, reply to",
            "this email — it comes straight to me.",
            "",
            "— Sam",
          ].join("\n"),
        });
      } catch (e) {
        console.error("readiness checklist email failed:", e);
      }
    }

    if (emailed || stored) {
      return NextResponse.json({ success: true, verdict: serverVerdict, score: serverScore });
    }
    return NextResponse.json({ error: "Could not deliver the submission." }, { status: 502 });
  } catch (e) {
    console.error("readiness error:", e);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
