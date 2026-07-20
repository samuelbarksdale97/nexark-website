"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HOW IT WORKS — a sequence, not a comparison.
 *
 * The previous version was three equal boxes in a grid: a journey rendered as a menu, with
 * nothing to say that Learn comes before Build. Three side-by-side cards of identical weight
 * is the shape you use for *options*, and these are not options.
 *
 * So it is a track now. A line runs through three stations and draws as you scroll; each
 * station lights when the line reaches it. That is the same visual language already running
 * in the hero (a drawn path with nodes on it) and the orbit — reused, not re-invented.
 *
 * The line is a CSS transform on a gradient bar, deliberately NOT an SVG: it flips from
 * horizontal to vertical with one CSS rule, and the scroll handler never reads layout.
 */

type Step = { when: string; title: string; body: string; out: string };

const STEPS: Step[] = [
  {
    when: "Week 1–2",
    title: "Learn",
    body: "We sit inside the operation you already have and map how it actually runs — not how the org chart says it does.",
    out: "A plan you can read",
  },
  {
    when: "Week 3–6",
    title: "Build",
    body: "Systems engineered around your real workflow. You see working software early and often, never a reveal at the end.",
    out: "Software that fits",
  },
  {
    when: "Ongoing",
    title: "Partner",
    body: "Your business keeps moving, so the system does too. We stay on to extend it, sharpen it, and keep it honest.",
    out: "It keeps earning",
  },
];

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
      // 0 as the track enters from below, 1 once it is comfortably in view
      const raw = 1 - (r.top - window.innerHeight * 0.34) / (window.innerHeight * 0.44);
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
    <section className="hiw" data-nav="dark" id="roadmap">
      <div className="wrap">
        <div className="sec-head wide reveal">
          <span className="eyebrow">How it works</span>
          <h2>
            A working system in <em>weeks, not quarters.</em>
          </h2>
        </div>

        <div className="hiw-track" ref={ref} style={{ ["--p" as string]: p.toFixed(3) }}>
          <div className="hiw-rail" aria-hidden="true">
            <i className="hiw-rail-fill" />
          </div>

          <ol className="hiw-steps">
            {STEPS.map((s, i) => {
              // each station lights as the line reaches it
              const lit = p >= (i + 0.35) / STEPS.length;
              return (
                <li key={s.title} className={`hiw-step${lit ? " lit" : ""}`}>
                  <span className="hiw-node" aria-hidden="true" />
                  <span className="hiw-when">{s.when}</span>
                  <h3>
                    <span className="hiw-idx">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h3>
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
