"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AI READINESS ASSESSMENT — the /start experience.
 *
 * Spec: HANDOFF_READINESS_ASSESSMENT.md (repo root). Rules that are load-bearing:
 *   - Never the words "survey" or "quiz". It is the Assessment; it yields a Readiness Score.
 *   - Verdict is computed CLIENT-SIDE and shown before any email is asked (Ceremony G-C3: no data
 *     without its reason attached). /api/readiness failing must never block the visitor's result.
 *   - The result is a mirror, not a grade — no percentage, no failing tone.
 *
 * TWO DOORS (Sam, 07-20): the hero establishes transform vs build across its scroll panels and
 * hands off here. The intro screen is the fork itself — "What brings you to Nexark?" — so the
 * first interaction captures `track` and begins the assessment in one tap. The five scored
 * questions are byte-identical to the spec and unchanged by track: they measure buyer POSTURE
 * (urgency, delegation, investment, authority), which predicts a good client through either door,
 * and the hard flags disqualify a bad one of either kind.
 */

type Track = "transform" | "build";

const TRACKS: { id: Track; label: string; note: string }[] = [
  {
    id: "transform",
    label: "Transform how my business runs",
    note: "You've already built the business. The systems, the busywork, the parts that don't talk to each other — you want that rebuilt.",
  },
  {
    id: "build",
    label: "Build something new",
    note: "An app, a platform, a product that doesn't exist yet. You want it built and shipped — from a blank page to your customers' hands.",
  },
];

// EXACT copy + points from the spec. Options are ordered as displayed; `pts` carries the score for
// each. Do not reword, reorder, or add options.
const QUESTIONS: { q: string; options: { text: string; pts: number }[] }[] = [
  {
    q: "What's driving you to look at AI right now?",
    options: [
      { text: "Something's breaking — the way we operate today can't keep up with the business", pts: 3 },
      { text: "We're growing, and I don't want our operations to fall behind our ambition", pts: 2 },
      { text: "Businesses around me are using it and I don't want to be left out", pts: 1 },
      { text: "Honestly, just curious — no pressing reason", pts: 0 },
    ],
  },
  {
    q: "Imagine an expert handed you the exact plan next week. What would realistically happen?",
    options: [
      { text: "I'd want them to build and run it with me — I don't need another project on my plate", pts: 3 },
      { text: "I'd put someone on my team on it and stay close", pts: 2 },
      { text: "Honestly? It would probably sit until things calm down", pts: 1 },
      { text: "I'd take the plan and build it myself with AI tools", pts: 0 },
    ],
  },
  {
    q: "When you think about paying for this kind of help, which is closest?",
    options: [
      { text: "It's an investment in staying ahead — good work costs money", pts: 3 },
      { text: "I'd invest if I could see the return within a few months", pts: 2 },
      { text: "I'd want to try something small and cheap before spending real money", pts: 1 },
      { text: "I'm mainly looking to cut costs — ideally replace some payroll", pts: 0 },
    ],
  },
  {
    q: "Last time you handed something important to an outside pro (accountant, agency, contractor) — how did it go?",
    options: [
      { text: "Well — I hire experts, hold them to outcomes, and get out of their way", pts: 3 },
      { text: "Good, though I stayed heavily involved the whole time", pts: 2 },
      { text: "Mixed — I've been burned before, so I'm cautious now", pts: 1 },
      { text: "I don't really hand things off — nobody does it like I do", pts: 0 },
    ],
  },
  {
    q: "If this were a fit, who would need to say yes?",
    options: [
      { text: "Me — and I could make that call within the month", pts: 3 },
      { text: "Me and a partner — we decide together, quickly", pts: 2 },
      { text: "I'd need to pitch it to the owner / leadership", pts: 1 },
      { text: "There's no budget for this yet — I'm exploring for later", pts: 0 },
    ],
  },
];

const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL || "https://cal.com/sam-barksdale/discovery";

type Stage = "intro" | "questions" | "resolving" | "result";

export function Assessment() {
  const [track, setTrack] = useState<Track | null>(null);
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0); // 0..4
  const [picks, setPicks] = useState<(number | null)[]>([null, null, null, null, null]);
  const [selecting, setSelecting] = useState<number | null>(null); // brief selected-state beat
  const advanceTimer = useRef<number | null>(null);

  // contact + submission
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false); // both channels down → direct-email fallback

  useEffect(() => () => { if (advanceTimer.current) window.clearTimeout(advanceTimer.current); }, []);

  const scores = picks.map((p, i) => (p === null ? 0 : QUESTIONS[i].options[p].pts));
  const score = scores.reduce((a, b) => a + b, 0);
  const hardFlag = scores[1] === 0 || scores[2] === 0 || scores[3] === 0;
  const verdict: "ready" | "not_yet" = score >= 11 && !hardFlag ? "ready" : "not_yet";

  const beginWith = (t: Track) => {
    setTrack(t);
    setStage("questions");
    setStep(0);
  };

  const choose = (optIdx: number) => {
    if (selecting !== null) return;
    setSelecting(optIdx);
    const next = picks.slice();
    next[step] = optIdx;
    setPicks(next);
    // brief selected beat, then auto-advance
    advanceTimer.current = window.setTimeout(() => {
      setSelecting(null);
      if (step < QUESTIONS.length - 1) {
        setStep((s) => s + 1);
      } else {
        // last answer → staged resolve → result
        setStage("resolving");
        window.setTimeout(() => setStage("result"), 1600);
      }
    }, 340);
  };

  const back = () => {
    if (step === 0) {
      setStage("intro");
      setTrack(null);
      return;
    }
    setStep((s) => s - 1);
  };

  const skipResolve = () => { if (stage === "resolving") setStage("result"); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    setFailed(false);
    const answers = {
      q1: scores[0], q2: scores[1], q3: scores[2], q4: scores[3], q5: scores[4],
    };
    try {
      const res = await fetch("/api/readiness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verdict, score, hardFlag, track, answers, name, email, phone }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSent(true);
    } catch {
      // Both channels down. The visitor still has their verdict; give them the direct route.
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  /* -------------------------------------------------------------- INTRO (the fork) */
  if (stage === "intro") {
    return (
      <div className="asmt">
        <div className="asmt-head reveal">
          <span className="eyebrow">Start your journey</span>
          <h1>What brings you to Nexark?</h1>
          <p className="asmt-lede">
            Two doors, one team. Pick the one that fits — then five quick questions, about sixty
            seconds. You&apos;ll know where you stand, and so will we.
          </p>
        </div>
        <div className="asmt-forks">
          {TRACKS.map((t) => (
            <button key={t.id} type="button" className="asmt-fork" onClick={() => beginWith(t.id)}>
              <span className="asmt-fork-label">{t.label}</span>
              <span className="asmt-fork-note">{t.note}</span>
              <span className="asmt-fork-go" aria-hidden="true">Begin →</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------- QUESTIONS */
  if (stage === "questions") {
    const Q = QUESTIONS[step];
    return (
      <div className="asmt">
        <div className="asmt-progress" aria-hidden="true">
          <span className="asmt-count">{step + 1} / {QUESTIONS.length}</span>
          <span className="asmt-bar"><i style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} /></span>
        </div>
        <h2 className="asmt-q" key={step}>{Q.q}</h2>
        <ul className="asmt-opts">
          {Q.options.map((o, i) => {
            const chosen = picks[step] === i;
            const isSel = selecting === i;
            return (
              <li key={o.text}>
                <button
                  type="button"
                  className={`asmt-opt${chosen ? " chosen" : ""}${isSel ? " selecting" : ""}`}
                  onClick={() => choose(i)}
                >
                  <span className="asmt-opt-dot" aria-hidden="true" />
                  <span>{o.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <button type="button" className="asmt-back" onClick={back}>← Back</button>
      </div>
    );
  }

  /* -------------------------------------------------------------- RESOLVING (staged beat) */
  if (stage === "resolving") {
    return (
      <div className="asmt asmt-resolving" onClick={skipResolve}>
        <span className="asmt-resolve-dot" aria-hidden="true" />
        <p className="asmt-resolve-line">Reading your answers…</p>
        <button type="button" className="asmt-skip" onClick={skipResolve}>Skip →</button>
      </div>
    );
  }

  /* -------------------------------------------------------------- RESULT */
  const ready = verdict === "ready";

  if (sent) {
    return (
      <div className="asmt asmt-done reveal">
        {ready ? (
          <>
            <span className="eyebrow">You&apos;re booked in</span>
            <h1>Pick a time that works.</h1>
            <p className="asmt-lede">
              Your answers went straight to Sam — he&apos;ll have read them before you meet. Grab a
              slot and we&apos;ll take it from there.
            </p>
            <a className="btn btn-primary asmt-cta" href={BOOKING_URL} target="_blank" rel="noreferrer">
              Book your call <span className="arw">→</span>
            </a>
          </>
        ) : (
          <>
            <span className="eyebrow">On its way</span>
            <h1>Check your inbox.</h1>
            <p className="asmt-lede">
              The Ultimate AI Automation Checklist is heading to <strong>{email}</strong> now — 50
              things you can start on today. When something starts breaking, you&apos;ll know where
              to find us.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="asmt asmt-result reveal">
      <span className="eyebrow">{ready ? "Your readiness: high" : "Your readiness: building"}</span>
      <h1>{ready ? "You sound like the businesses we do our best work with." : "You're building the foundation — start here."}</h1>
      <p className="asmt-lede">
        {ready
          ? "Your answers tell us you're not shopping for a gadget — you're ready to change how the work gets done. That's the only kind of engagement we take. Let's talk about what that looks like for your business."
          : "Honest answers deserve an honest read: the businesses that get the most out of working with us are usually mid-fire, decision-ready, and done doing it all themselves. You're not there yet — and that's fine. The Ultimate AI Automation Checklist is 50 things you can start on now."}
      </p>

      {failed ? (
        <p className="asmt-fallback">
          Something went wrong on our end. Email{" "}
          <a href="mailto:samuel.barksdale97@gmail.com">samuel.barksdale97@gmail.com</a> and we&apos;ll
          get you sorted right away.
        </p>
      ) : (
        <form className="asmt-form" onSubmit={submit}>
          {ready ? (
            <>
              <p className="asmt-form-lead">Where should we send the details, and who are we talking to?</p>
              <div className="asmt-fields">
                <input className="asmt-input" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                <input className="asmt-input" type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                <input className="asmt-input" type="tel" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
              </div>
            </>
          ) : (
            <>
              <label className="asmt-form-lead" htmlFor="asmt-email">Where should we send the checklist?</label>
              <div className="asmt-fields">
                <input id="asmt-email" className="asmt-input" type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </div>
            </>
          )}
          <button type="submit" className="btn btn-primary asmt-cta" disabled={sending}>
            {sending ? "Sending…" : ready ? "Book my call" : "Send me the checklist"} <span className="arw">→</span>
          </button>
        </form>
      )}
    </div>
  );
}
