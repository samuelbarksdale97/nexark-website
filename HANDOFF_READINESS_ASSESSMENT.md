# HANDOFF — AI Readiness Assessment on nexark.ai

**Date:** 2026-07-20 · **From:** Genesis strategy session (Sam + research synthesis)
**Goal:** Replace the current `/start` long-form with a 5-question, click-through **AI Readiness
Assessment** that scores the visitor and routes them: **qualified → book a call · not qualified →
receive the free automation checklist.** The "Start Your Journey" CTAs already point at `/start`
([app/page.tsx:153](app/page.tsx#L153), `components/refresh/ScrollHero.tsx:295`), so no CTA
rewiring is needed — this is a rebuild of the `/start` page experience plus one new API route.

Canonical spec source (Genesis repo): `assets/nexark/ai-readiness-assessment/ASSESSMENT_v1.md`.
This handoff is self-contained — you do not need Genesis access to build.

---

## 1. The flow

```
"Start Your Journey" CTA (unchanged)
        │
        ▼
/start — intro screen: what this is, ~60 seconds, 5 questions
        │
        ▼
Q1 → Q2 → Q3 → Q4 → Q5   (one question per screen, click an option → auto-advance)
        │
        ▼
Score computed CLIENT-SIDE → verdict shown IMMEDIATELY (no email wall before the result)
        │
   ┌────┴──────────────────────────┐
   ▼                               ▼
READY (score ≥11, no hard flags)   NOT YET (everything else)
"You sound like the businesses     "You're building the foundation."
 we do our best work with."        Email capture → we send the checklist PDF
Name + email capture →             + graceful copy (see §5)
book-a-call step (see §6)
        │                               │
        ▼                               ▼
POST /api/readiness  ← BOTH paths submit answers + score + contact
(email Sam + Supabase insert — reuse the start-lead resilience pattern)
```

Rules that are non-negotiable in this flow:
- **Never the word "survey" or "quiz" anywhere.** It is the *AI Readiness Assessment* and it
  produces a *Readiness Score*. Framing is self-discovery — value flows TO the visitor.
- **Verdict before email.** The score/verdict renders instantly from client-side state. Email is
  asked only where a reason exists: to book the call, or to send the checklist. (Ceremony Gate
  G-C3: no data asked without its reason attached.)
- **Result page is a mirror, not a grade.** "You're ready" / "You're building the foundation" —
  never a percentage, never a failing tone.

## 2. The five questions — EXACT copy, options, and points

Do not reword, reorder, or add options — the option copy is engineered so every answer is
socially acceptable to pick (that's what keeps answers honest) and each question targets a
validated buyer-psychology dimension. Points are shown in brackets; never display points or
per-question feedback to the visitor.

**Q1 — What's driving you to look at AI right now?**
- [3] Something's breaking — the way we operate today can't keep up with the business
- [2] We're growing, and I don't want our operations to fall behind our ambition
- [1] Businesses around me are using it and I don't want to be left out
- [0] Honestly, just curious — no pressing reason

**Q2 — Imagine an expert handed you the exact plan next week. What would realistically happen?**
- [3] I'd want them to build and run it with me — I don't need another project on my plate
- [2] I'd put someone on my team on it and stay close
- [1] Honestly? It would probably sit until things calm down
- [0] I'd take the plan and build it myself with AI tools ← **HARD FLAG**

**Q3 — When you think about paying for this kind of help, which is closest?**
- [3] It's an investment in staying ahead — good work costs money
- [2] I'd invest if I could see the return within a few months
- [1] I'd want to try something small and cheap before spending real money
- [0] I'm mainly looking to cut costs — ideally replace some payroll ← **HARD FLAG**

**Q4 — Last time you handed something important to an outside pro (accountant, agency, contractor) — how did it go?**
- [3] Well — I hire experts, hold them to outcomes, and get out of their way
- [2] Good, though I stayed heavily involved the whole time
- [1] Mixed — I've been burned before, so I'm cautious now
- [0] I don't really hand things off — nobody does it like I do ← **HARD FLAG**

**Q5 — If this were a fit, who would need to say yes?**
- [3] Me — and I could make that call within the month
- [2] Me and a partner — we decide together, quickly
- [1] I'd need to pitch it to the owner / leadership
- [0] There's no budget for this yet — I'm exploring for later

## 3. Scoring & routing logic

```ts
const score = q1 + q2 + q3 + q4 + q5;              // 0–15
const hardFlag = q2 === 0 || q3 === 0 || q4 === 0; // the deal-killer answers
const verdict: "ready" | "not_yet" =
  score >= 11 && !hardFlag ? "ready" : "not_yet";
```

That's the whole model — binary routing, exactly two result screens. The hard-flag rule exists
because a high-urgency DIYer or a "replace payroll" buyer still isn't a fit no matter the total;
do not soften it.

## 4. Page & interaction spec (`/start` rebuild)

- Keep `RefreshShell` and the site's existing visual system (black/white/gold — purple is logo
  only). This page is hero-adjacent: it deserves ceremony, not a form dump.
- **Intro screen** replaces the current hero copy. Suggested copy (fine to art-direct, keep the
  substance):
  - Eyebrow: `Start your journey`
  - H1: `First, let's find out if you're ready.`
  - Lede: `We do our best work with businesses that are ready for it — and it's not everybody.
    Five questions, about sixty seconds. You'll know where you stand, and so will we.`
  - Button: `Begin →`
- **One question per screen.** Big tappable option cards (full-row buttons, not radios), click →
  brief selected-state beat → auto-advance. Subtle progress indicator (e.g. `2 / 5`). Back
  navigation allowed. Keyboard: options focusable, Enter selects.
- **Result reveal is a staged brand moment**, not an instant swap: short beat (score "resolving"),
  then the verdict line lands, then the CTA. Beats REPLACE each other, never stack; keep it
  ≤2.5s with tap-to-skip. One hero moment only — don't also animate the option screens.
- Existing `StartForm.tsx` (the optimization/innovation long-form) is **retired** from `/start`.
  Keep the component in the tree if anything else imports it; otherwise delete. `/api/start-lead`
  stays (other entry points may use it; the new route is separate).

## 5. Result screens — copy

**READY:**
- Eyebrow: `Your readiness: high`
- H1: `You sound like the businesses we do our best work with.`
- Body: `Your answers tell us you're not shopping for a gadget — you're ready to change how the
  work gets done. That's the only kind of engagement we take. Let's talk about what that looks
  like for your business.`
- Then: name + email (+ optional phone) → book-a-call step (§6). Submit also fires
  `/api/readiness` with answers + score.

**NOT YET:**
- Eyebrow: `Your readiness: building`
- H1: `You're building the foundation — start here.`
- Body: `Honest answers deserve an honest read: the businesses that get the most out of working
  with us are usually mid-fire, decision-ready, and done doing it all themselves. You're not
  there yet — and that's fine. The Ultimate AI Automation Checklist is 50 things you can start
  on now. When something starts breaking, you'll know where to find us.`
- Email field with reason attached: `Where should we send the checklist?` → submit fires
  `/api/readiness` (stores lead, emails Sam, sends checklist to the visitor).
- No shame, no "unfortunately", no consolation-prize tone.

## 6. Backend — `/api/readiness` (new route)

Model it on `app/api/start-lead/route.ts` (nodemailer via Gmail SMTP + best-effort Supabase
insert; success if EITHER channel lands; error only if both fail — keep that resilience pattern
and the same env vars).

Payload: `{ verdict, score, hardFlag, answers: {q1..q5}, name?, email, phone? }`.

1. **Email to Sam** — subject like `[Readiness] READY 13/15 — Jane (jane@x.com)` with a
   per-question breakdown (question label + chosen option text). These answers are pre-call
   recon; readability of this email matters.
2. **Supabase insert** — table `readiness_submissions` (create migration): id, created_at,
   verdict, score, hard_flag, answers jsonb, name, email, phone.
3. **NOT-YET path: send the checklist to the visitor** via the same SMTP transport — short
   on-voice email + the PDF (attach or link). Checklist asset: use placeholder path
   `/public/downloads/nexark-ai-automation-checklist.pdf`. **The v3 PDF is being produced in
   Genesis and will be dropped in at that exact path — do NOT source the old v2.0 checklist PDF**
   (it contains unverified stats and dead contact info and must never ship).

## 7. Inputs needed from Sam (build everything else without waiting)

1. **Booking link** (Calendly / cal.com / Google appointment link) for the READY step. Until it
   exists, fall back to the current pattern: "This went straight to Sam — you'll hear back within
   one business day." Wire the link as an env var (`NEXT_PUBLIC_BOOKING_URL`) so dropping it in
   later is a one-line change.
2. **v3 checklist PDF** → `/public/downloads/nexark-ai-automation-checklist.pdf` (coming from
   Genesis).

## 8. Acceptance criteria

- [ ] All "Start Your Journey" CTAs land on the new assessment; 5 clicks + email reaches a
      terminal state in under 90 seconds on a phone.
- [ ] Scoring verified against §3 (including: 12 points WITH a hard flag → `not_yet`; 11 points
      no flags → `ready`; 10 points no flags → `not_yet`).
- [ ] Verdict renders with NO network dependency; `/api/readiness` failure never blocks the
      visitor's result (show the graceful direct-email fallback used by StartForm today).
- [ ] Both paths deliver: Sam gets the scored email; Supabase row lands; not-yet visitor
      receives the checklist email.
- [ ] `/a11y-gate` passes with zero blockers (6 viewports × 2 themes); result-reveal has
      tap-to-skip; option cards ≥44px tap targets; no `100vh` (use `svh`).
- [ ] No occurrence of the words "survey" or "quiz" anywhere in copy, code-facing strings
      shown to users, or meta tags.
- [ ] Mobile 375px: one question fully visible per viewport, no horizontal scroll.

## 9. Why these questions (context, for judgment calls during build)

Every competitor "AI readiness assessment" audits technical capability (data, infra, governance).
This one deliberately audits the *buyer* — urgency, willingness to delegate, investment framing,
delegation history, authority — because Nexark's actual win/loss record shows buyer posture, not
capability, predicted every deal. Each hard flag corresponds to a real lost-deal archetype. If a
copy tweak is ever needed for layout, preserve the dimension each question measures and keep
every option flattering enough to pick honestly.
