"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HOW IT WORKS — tall panels whose empty space carries the work.
 *
 * Reference: scale.com's card band (directives/website-refresh/debugging/, 07-20).
 * DECODE — invariants: tall portrait panel · light fill on a lighter ground · no border ·
 * large radius · one small chip top-left · a deliberate VOID beneath it · headline in the
 * middle band · body low · a quiet action at the floor · everything left-aligned to one inset.
 * Variables: the chip glyph, the headline, the body.
 *
 * The reason it reads premium is the void — content occupies under half the panel. Cramming
 * that space is what makes a card look like a feature grid instead of a statement.
 *
 * WHERE WE DEPART: scale's three cards are parallel CLAIMS, so equal panels are right there.
 * Ours are PHASES, and three identical boxes says nothing about order — that was the flaw in
 * the previous pass. So the void here is not empty: each panel holds a miniature of the system
 * doing that phase's job, drawn in the page's own languages — the annotated plan from the
 * layer stack, the tilted deck, the orbit. Same vocabulary as the hero and the wheel, which is
 * what makes the page feel like one object rather than a sequence of tricks.
 *
 * NO TIMELINES: durations were removed 07-20 (Sam) — we do not know the shape of a job before
 * we have seen the operation, and a number on a card is a promise. The phases carry the order;
 * the schedule is a conversation, not a website claim.
 */

type Step = { title: string; body: string; out: string };

const STEPS: Step[] = [
  {
    title: "Learn",
    body: "We sit inside the operation you already have and map how it actually runs — not how the org chart says it does.",
    out: "A plan you can read",
  },
  {
    title: "Build",
    body: "Systems engineered around your real workflow. You see working software early and often, never a reveal at the end.",
    out: "Software that fits",
  },
  {
    title: "Partner",
    body: "Your business keeps moving, so the system does too. We stay on to extend it, sharpen it, and keep it honest.",
    out: "It keeps earning",
  },
];

/* The three artifacts. Hairline only — these are diagrams, not illustrations, and they carry
   the same stroke weight as the schematics over the footage upstairs. */

function PlanArt() {
  // LEARN — a floorplan under annotation. Boxes land on real things; the callout names one.
  return (
    <svg viewBox="0 0 260 150" className="hiw-art" aria-hidden="true">
      <g className="a-plan">
        <path d="M14 122 L14 34 L96 34 L96 14 L214 14 L214 122 Z" className="s-line" />
        <path d="M96 34 L96 122 M14 82 L96 82 M150 14 L150 122" className="s-thin" />
      </g>
      <rect x="106" y="44" width="36" height="28" rx="3" className="s-box b1" />
      <rect x="160" y="86" width="44" height="26" rx="3" className="s-box b2" />
      <path d="M124 72 C 124 92 148 92 160 96" className="s-wire" />
      <circle cx="124" cy="58" r="2.6" className="s-dot" />
      <circle cx="182" cy="99" r="2.6" className="s-dot" />
      <text x="106" y="38" className="s-label">STATION 04</text>
      <text x="160" y="80" className="s-label">HANDOFF</text>
      <path d="M14 136 L214 136" className="s-rule" />
      <path d="M14 132 L14 140 M214 132 L214 140" className="s-thin" />
    </svg>
  );
}

function StackArt() {
  // BUILD — the tilted deck coming into register. Same geometry as SystemStack, miniature.
  return (
    <svg viewBox="0 0 260 150" className="hiw-art" aria-hidden="true">
      <g className="a-stack">
        <g className="pl p3">
          <path d="M40 96 L120 62 L220 82 L140 118 Z" className="s-line" />
        </g>
        <g className="pl p2">
          <path d="M34 76 L114 42 L214 62 L134 98 Z" className="s-line" />
          <path d="M74 60 L124 70 M104 50 L154 60" className="s-thin" />
        </g>
        <g className="pl p1">
          <path d="M28 56 L108 22 L208 42 L128 78 Z" className="s-line" />
          <rect x="92" y="38" width="30" height="16" rx="2" className="s-box b1" transform="skewY(-11)" />
        </g>
      </g>
      <path d="M232 30 L232 108" className="s-rule" />
      <path d="M228 30 L236 30 M228 108 L236 108" className="s-thin" />
      <text x="14" y="140" className="s-label">4 LAYERS · IN REGISTER</text>
    </svg>
  );
}

function OrbitArt() {
  // PARTNER — the wheel, still turning. It is the one artifact that never resolves.
  return (
    <svg viewBox="0 0 260 150" className="hiw-art" aria-hidden="true">
      <ellipse cx="130" cy="75" rx="94" ry="46" className="s-rule" />
      {/* The tiles ride the ellipse itself via offset-path. Rotating fixed points around the
          centre traces a CIRCLE, not an ellipse — which is exactly how they end up drifting off
          the line (checklist 35/38: bake the constraint into the path). Each rect is drawn at
          its own origin so the motion path carries its centre. */}
      <g className="a-orbit">
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x="-8.5"
            y="-8.5"
            width="17"
            height="17"
            rx="3"
            className={`s-box b${(i % 2) + 1} o${i}`}
          />
        ))}
      </g>
      <circle cx="130" cy="75" r="4" className="s-dot" />
      <circle cx="130" cy="75" r="13" className="s-thin" />
      <text x="14" y="140" className="s-label">ALWAYS RUNNING</text>
    </svg>
  );
}

const ART = [PlanArt, StackArt, OrbitArt];

export function Roadmap() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [p, setP] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setP(1);
      return;
    }
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      // 0 as the band enters from below, 1 once it is comfortably in view
      const raw = 1 - (r.top - window.innerHeight * 0.36) / (window.innerHeight * 0.42);
      setP(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section className="hiw" data-nav="light" id="roadmap">
      <div className="wrap">
        <div className="sec-head wide reveal">
          <span className="eyebrow">How it works</span>
          {/* The claim, then the method beneath it. "Weeks, not quarters" used to be the
              headline and could not carry it — a promise about schedule made before anyone has
              seen the operation. The headline now says the thing Sam's business actually runs
              on: people do not believe this is possible. */}
          <h2>
            We build what you were told <em>wasn&apos;t possible.</em>
          </h2>
          <p className="hiw-deck-line">Three phases. Here&apos;s how it goes.</p>
        </div>

        <div className="hiw-deck" ref={ref} style={{ ["--p" as string]: p.toFixed(3) }}>
          {/* the thread through the three chips — the only thing that says these are ordered */}
          <div className="hiw-thread" aria-hidden="true">
            <i />
          </div>

          <ol className="hiw-panels">
            {STEPS.map((s, i) => {
              const Art = ART[i];
              const lit = p >= (i + 0.3) / STEPS.length;
              return (
                <li key={s.title} className={`hiw-panel${lit ? " lit" : ""}`}>
                  <div className="hiw-top">
                    <span className="hiw-chip" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="hiw-void">
                    <Art />
                  </div>

                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <span className="hiw-out">{s.out}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
