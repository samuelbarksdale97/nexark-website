"use client";

import { useEffect, useRef, useState } from "react";

/**
 * THE DIFFERENCE — "the strongest case against us".
 *
 * Content type: ARGUMENT. Pattern: derived, not borrowed — see design-wayfinder/PATTERNS.md
 * (§ARGUMENT, and the OPEN CANDIDATES entry this was selected from, 90/100).
 *
 * The section it replaces was three equal icon cards: the "icon trinity" anti-pattern, an
 * inventory shape wearing an argument's content. Three peers ask for assent before anything has
 * been at stake, and the three supports read as a service list rather than as support for a claim.
 *
 * THE STRUCTURAL IDEA: housing is the argument.
 *
 *   The counterexample gets the section's ONLY card — bounded, bordered, purchasable, finite.
 *   The claim gets no card, because it is not an item; it is the ground the card was sitting on.
 *   At the turn, the card's surface dissolves and the sentence inside stays exactly where it is,
 *   so the reader watches a bought thing stop being a distinct object and join the same
 *   undifferentiated field everyone else is standing in.
 *
 * That is "a tool isn't the same as an advantage", performed rather than asserted — one CSS
 * transition, no metaphor to decode.
 *
 * WHERE WE DEPART from the generated proposal: the proposal opened with a specific restaurant
 * group that had bought a platform. No such case was observed — the workflow invented it — and
 * Nexark does not ship invented client cases. The category-level version is used instead: a claim
 * about how commodity software necessarily works, checkable on its face, nothing attributed to
 * anyone. Same shape, same dissolve, no fabrication.
 *
 * PEAK BUDGET: this is a peak, and it collides with SystemStack. They are separated in scroll by
 * the light ArcWheel band. Do not move this section adjacent to SystemStack.
 */

const RESIDUE = [
  {
    label: "Every system agreeing",
    body: "That platform is excellent at its one job. It does not know what the books, the door, or payroll know. Nothing bought off a shelf does.",
    lead: true,
  },
  {
    label: "Work that happens with nobody in the room",
    body: "Purchased software waits to be operated. The advantage is the part that runs while you are closed.",
  },
  {
    label: "Answers out of your own data",
    body: "A vendor's dashboard answers a vendor's questions. Yours are about your business, and only your data can answer them.",
  },
];

export function Difference() {
  const turnRef = useRef<HTMLParagraphElement | null>(null);
  const [dissolved, setDissolved] = useState(false);

  useEffect(() => {
    const el = turnRef.current;
    if (!el) return;
    // Reduced motion gets the resolved state immediately — the argument is in the copy either way.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDissolved(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        // Fires ONCE and never reverses. A surface that came back would undo the argument.
        if (entries.some((e) => e.isIntersecting)) {
          setDissolved(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -35% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="band cx-band" data-nav="dark">
      <span className="connector" />
      <div className="wrap">
        <div className="cx">
          {/* ACT 1 — the case against us, stated sincerely and at full strength */}
          <p className="cx-eyebrow">The strongest case against us</p>
          <div className={`cx-exhibit${dissolved ? " dissolved" : ""}`}>
            <p>
              Buy the best reservations platform on the market. It will work exactly as
              advertised.
            </p>
          </div>

          {/* ACT 2 — the turn */}
          <span className="cx-rule" aria-hidden="true" />
          <p className="cx-turn" ref={turnRef}>
            So will the one your three closest competitors bought. Same platform, same
            configuration, same month.
          </p>

          <h2 className="cx-claim">
            A tool isn&apos;t the same as <em>an advantage.</em>
          </h2>

          {/* ACT 3 — the supports, arriving as residue rather than as peers */}
          <p className="cx-lead">What a purchase order cannot include:</p>
          <ul className="cx-residue">
            {RESIDUE.map((r) => (
              <li key={r.label} className={r.lead ? "lead" : undefined}>
                <h3>{r.label}</h3>
                <p>{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
