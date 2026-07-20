import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

/**
 * Start-a-conversation lead handler.
 * Delivers every lead by (1) emailing Sam via Gmail SMTP and (2) a best-effort
 * Supabase insert. Returns success if EITHER channel lands, so leads are never
 * silently dropped; returns an error status only if BOTH fail (the UI then tells
 * the visitor to email directly).
 */
export async function POST(req: NextRequest) {
  try {
    const d = await req.json();
    const {
      path = "",
      name = "",
      email = "",
      phone = "",
      holdingBack = "",
      howLong = "",
      alreadyTried = "",
      changeEverything = "",
      howFarAlong = "",
      whyNow = "",
      whatWouldChange = "",
    } = d ?? {};

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const isOpt = path === "optimization";
    const lines = [
      `Path: ${path || "—"}`,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      "",
      isOpt ? `What's holding the business back: ${holdingBack}` : `What they'd build: ${changeEverything}`,
      isOpt ? `How long: ${howLong}` : `How far along: ${howFarAlong}`,
      isOpt ? `Already tried: ${alreadyTried}` : `Why now: ${whyNow}`,
      `If it worked, what would change: ${whatWouldChange}`,
    ]
      .filter(Boolean)
      .join("\n");

    let emailed = false;
    let stored = false;

    // 1) Email Sam
    const gmailUser = process.env.GMAIL_ADDRESS;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const notify = process.env.LEAD_NOTIFY_EMAIL || "samuel.barksdale97@gmail.com";
    if (gmailUser && gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: { user: gmailUser, pass: gmailPass },
        });
        await transporter.sendMail({
          from: `Nexark Website <${gmailUser}>`,
          to: notify,
          replyTo: email,
          subject: `New Nexark lead — ${name}`,
          text: lines,
        });
        emailed = true;
      } catch (e) {
        console.error("start-lead email failed:", e);
      }
    }

    // 2) Best-effort Supabase insert (table optional; failure is non-fatal)
    const sbUrl = process.env.SUPABASE_URL;
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (sbUrl && sbKey) {
      try {
        const r = await fetch(`${sbUrl}/rest/v1/nexark_leads`, {
          method: "POST",
          headers: {
            apikey: sbKey,
            Authorization: `Bearer ${sbKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            path,
            name,
            email,
            phone,
            details: { holdingBack, howLong, alreadyTried, changeEverything, howFarAlong, whyNow, whatWouldChange },
          }),
        });
        stored = r.ok;
        if (!r.ok) console.error("start-lead supabase insert failed:", r.status, await r.text());
      } catch (e) {
        console.error("start-lead supabase failed:", e);
      }
    }

    if (emailed || stored) return NextResponse.json({ success: true });
    return NextResponse.json({ error: "Could not deliver the message." }, { status: 502 });
  } catch (e) {
    console.error("start-lead error:", e);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
