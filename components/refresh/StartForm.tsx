"use client";

import { useState } from "react";

type Path = "optimization" | "innovation" | null;

export function StartForm() {
  const [path, setPath] = useState<Path>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    payload.path = path ?? "";
    try {
      const res = await fetch("/api/start-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Something went wrong. Please email sam@nexark.ai directly and we'll jump on it.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="form-wrap" style={{ textAlign: "center", padding: "40px 0" }}>
        <span className="eyebrow center">Message received</span>
        <h2 style={{ fontSize: "clamp(30px,4vw,48px)", margin: "22px 0 18px" }}>
          Thank you. <em>We&apos;ll be in touch.</em>
        </h2>
        <p className="lead-para" style={{ maxWidth: 520, margin: "0 auto" }}>
          This went straight to Sam. You&apos;ll hear back within one business day — and the first
          thing we&apos;ll do is listen.
        </p>
      </div>
    );
  }

  return (
    <div className="form-wrap">
      <form id="lead-form" onSubmit={handleSubmit}>
        <div className="sec-head reveal" style={{ marginBottom: 34 }}>
          <span className="eyebrow">First, which sounds more like you?</span>
        </div>
        <div className="path-choice reveal">
          <button
            type="button"
            className={`path-opt${path === "optimization" ? " sel" : ""}`}
            onClick={() => setPath("optimization")}
          >
            <h3>Something isn&apos;t working the way it should.</h3>
            <p>
              You&apos;re spending time on work that shouldn&apos;t need you. Tools don&apos;t talk to
              each other, and you&apos;ve been too busy running the business to fix what&apos;s
              underneath it.
            </p>
          </button>
          <button
            type="button"
            className={`path-opt${path === "innovation" ? " sel" : ""}`}
            onClick={() => setPath("innovation")}
          >
            <h3>I have an idea I want to build.</h3>
            <p>
              You see an opportunity — a product, a platform, a new revenue model. The vision is
              clear, and you need someone who can hear it and actually build it.
            </p>
          </button>
        </div>

        {path === "optimization" && (
          <div>
            <div className="field">
              <label>What&apos;s holding the business back right now?</label>
              <textarea
                name="holdingBack"
                placeholder="The part of the operation that costs you the most time, money, or sleep…"
              />
            </div>
            <div className="grid-2">
              <div className="field">
                <label>How long has this been going on?</label>
                <input type="text" name="howLong" placeholder="e.g. about a year" />
              </div>
              <div className="field">
                <label>What have you already tried?</label>
                <input type="text" name="alreadyTried" placeholder="Tools, hires, workarounds…" />
              </div>
            </div>
          </div>
        )}

        {path === "innovation" && (
          <div>
            <div className="field">
              <label>What would you build if you had the capability?</label>
              <textarea
                name="changeEverything"
                placeholder="Describe the product, platform, or idea you've been sitting on…"
              />
            </div>
            <div className="grid-2">
              <div className="field">
                <label>How far along is the idea?</label>
                <input type="text" name="howFarAlong" placeholder="Napkin sketch → spec → prototype" />
              </div>
              <div className="field">
                <label>Why now?</label>
                <input type="text" name="whyNow" placeholder="What makes this the moment?" />
              </div>
            </div>
          </div>
        )}

        {path && (
          <div id="lead-fields">
            <div className="field">
              <label>If this worked, what would change for you?</label>
              <textarea name="whatWouldChange" placeholder="Paint the picture of the next generation…" />
            </div>
            <div className="grid-2">
              <div className="field">
                <label>Name</label>
                <input type="text" name="name" placeholder="Your name" required />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" name="email" placeholder="you@company.com" required />
              </div>
            </div>
            <div className="field">
              <label>
                Phone <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span>
              </label>
              <input type="tel" name="phone" placeholder="(555) 555-5555" />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
              disabled={submitting}
            >
              {submitting ? "Sending…" : "Start the Conversation"} <span className="arw">→</span>
            </button>
            {error && (
              <p className="form-note" style={{ color: "var(--amber-hi)" }}>
                {error}
              </p>
            )}
            <p className="form-note">
              This goes straight to Sam — not a shared inbox. You&apos;ll hear back within one business
              day.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
