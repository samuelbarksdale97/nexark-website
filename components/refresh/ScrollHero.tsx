"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * The peak: the engine assembles beneath the human, then recedes — leaving the person.
 * Real footage of real work; thin amber nodes trace the workflow over the scene, then fade.
 *
 * Panels advance on scroll. Within an active panel, its clips cross-fade so the whole
 * ten-clip set cycles across a full read of the hero.
 */

type Panel = {
  head: string;
  em: string;
  sub?: string;
  cta?: boolean;
  clips: { src: string; poster: string; alt: string }[];
};

const C = (name: string, alt: string) => ({
  src: `/refresh/clips/${name}.mp4`,
  poster: `/refresh/clips/${name}.jpg`,
  alt,
});

const PANELS: Panel[] = [
  {
    head: "Success is not an accident.",
    em: "It's engineered.",
    clips: [
      C("hero-venue", "An owner greets a guest at the check-in stand of her venue"),
      C("clip-yacht", "A charter captain at the helm as guests relax behind him"),
      C("clip-realestate", "A real estate manager walking a client through a home"),
    ],
  },
  {
    head: "Behind every calm room, a system is",
    em: "doing the work.",
    sub: "The check-in. The record. The reconciliation. None of it needs a person standing over it.",
    clips: [
      C("clip-scan", "A guest taps a phone at the door and is recognized"),
      C("clip-ticketing", "A door host fastens a wristband and waves a guest through"),
      C("clip-dashboard", "An owner glances at her day's numbers and nods"),
    ],
  },
  {
    head: "Reconciliation that took half a Saturday",
    em: "now takes seconds.",
    sub: "Twenty hours a week of compliance work became five. The busywork stopped being someone's job.",
    clips: [
      C("clip-property", "A property manager walking her building, unhurried"),
      C("clip-restaurant", "A bartender and server sharing a laugh at close"),
      C("clip-multisite", "An operator stepping between two locations, greeting a neighbor"),
    ],
  },
  {
    head: "So you can just",
    em: "be present.",
    sub: "The technology does its best work out of sight — so the people can do what only people can do.",
    cta: true,
    clips: [
      C("clip-family", "A father laughing with his daughter on the front steps, phone face-down"),
      C("clip-closing", "An owner locking up at dusk, pausing on the sidewalk, at ease"),
      C("clip-morning", "Two owners over coffee on a slow weekend morning, no work in sight"),
    ],
  },
];

const RANGES: [number, number][] = [
  [0, 0.22],
  [0.22, 0.48],
  [0.48, 0.74],
  [0.74, 1.01],
];

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/** clips are 5s; swap before they loop so a reset is never visible under the cross-fade */
const DWELL_MS = 4600;

export function ScrollHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const [active, setActive] = useState(0);
  const [clipIdx, setClipIdx] = useState(0);
  const [reduced, setReduced] = useState(false);

  /**
   * REAL VIEWPORT HEIGHT.
   *
   * `svh` is the right idea but it is a *static* guess at the browser's chrome. iOS Safari's
   * bottom bar OVERLAYS the viewport, and how much it takes varies by version, by orientation
   * and by whether the bar is expanded — which is why the copy still ended up behind it on a
   * real phone when it fit in every simulator.
   *
   * `visualViewport.height` is the only value that reports what is ACTUALLY visible. We take
   * it once and only update on a large change (orientation), never on the small ones the
   * collapsing toolbar produces — otherwise the hero would resize mid-scroll.
   */
  useEffect(() => {
    const root = document.documentElement;
    let applied = 0;
    const setVh = (force = false) => {
      const vv = window.visualViewport;
      const h = Math.min(vv?.height ?? window.innerHeight, window.innerHeight);
      if (!h) return;
      if (!force && applied && Math.abs(h - applied) < 120) return; // ignore toolbar collapse
      applied = h;
      root.style.setProperty("--app-vh", `${Math.round(h)}px`);
    };
    setVh(true);
    const onOrient = () => setTimeout(() => setVh(true), 250);
    window.addEventListener("orientationchange", onOrient);
    window.visualViewport?.addEventListener("resize", () => setVh());
    return () => {
      window.removeEventListener("orientationchange", onOrient);
    };
  }, []);

  /**
   * FIT GUARD. Percentages and breakpoints cannot guarantee the copy fits — the panel's
   * height depends on the device, the browser chrome, the user's text-size setting and the
   * copy itself. So measure it: compare the tallest panel against the space actually
   * available and scale the type down until it fits. Self-correcting on any screen, including
   * ones we never tested.
   */
  useEffect(() => {
    const inner = document.querySelector<HTMLElement>(".sh-inner");
    const stage = document.querySelector<HTMLElement>(".sh-stage");
    if (!inner || !stage) return;

    const apply = () => {
      stage.style.setProperty("--fit", "1");
      const cs = getComputedStyle(inner);
      const avail =
        inner.clientHeight - parseFloat(cs.paddingTop || "0") - parseFloat(cs.paddingBottom || "0");
      if (avail <= 0) return;
      let needed = 0;
      inner.querySelectorAll<HTMLElement>(".sh-panel").forEach((el) => {
        if (el.scrollHeight > needed) needed = el.scrollHeight;
      });
      if (!needed) return;
      // floor at 0.7 — below that the type is too small to be worth showing
      const fit = Math.max(0.7, Math.min(1, avail / needed));
      stage.style.setProperty("--fit", fit.toFixed(3));
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(inner);
    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);
    document.fonts?.ready.then(apply).catch(() => {});
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
      window.removeEventListener("orientationchange", apply);
    };
  }, []);

  // respect prefers-reduced-motion: stills only, system shown at rest
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // scroll → panel + the engine assembling, then receding
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let raf = 0;
    const tick = () => {
      raf = 0;
      const total = hero.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = clamp01(-hero.getBoundingClientRect().top / total);

      let next = 0;
      RANGES.forEach((r, i) => {
        if (p >= r[0] && p < r[1]) next = i;
      });
      setActive((prev) => (prev === next ? prev : next));

      if (cueRef.current) cueRef.current.style.opacity = p > 0.04 ? "0" : "1";

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

  /**
   * Rotate the clips inside whichever panel is showing.
   *
   * DWELL is deliberately shorter than the 5s clip length. Matching them meant the outgoing
   * clip hit its loop point in the middle of the cross-fade, so you saw it snap back to
   * frame one — the "quick reset" that made the transition feel broken. Swapping ~0.4s
   * early means a clip never reaches its own loop while it is still visible.
   */
  useEffect(() => {
    setClipIdx(0);
    const count = PANELS[active].clips.length;
    if (count < 2 || reduced) return;
    const id = window.setInterval(() => setClipIdx((i) => (i + 1) % count), DWELL_MS);
    return () => window.clearInterval(id);
  }, [active, reduced]);

  /**
   * Each clip plays exactly once per dwell, from its first frame. The outgoing clip is
   * paused rather than left running, so it fades out on a held frame instead of looping
   * underneath the cross-fade.
   */
  useEffect(() => {
    if (reduced) return;
    Object.entries(videoRefs.current).forEach(([k, v]) => {
      if (!v) return;
      if (k === `${active}-${clipIdx}`) {
        try { v.currentTime = 0; } catch { /* not seekable yet; it will start at 0 anyway */ }
        void v.play().catch(() => {});
      } else if (!v.paused) {
        v.pause();
      }
    });
  }, [active, clipIdx, reduced]);

  return (
    <section className="scroll-hero" data-nav="light" ref={heroRef as React.RefObject<HTMLElement>}>
      <div className="sh-stage">
        <div className="sh-plate">
          {PANELS.map((panel, pi) =>
            panel.clips.map((clip, ci) => {
              // only mount media for the panel on screen and the one after it
              const near = Math.abs(pi - active) <= 1;
              const shown = pi === active && ci === clipIdx;
              if (reduced) {
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={`${pi}-${ci}`}
                    src={clip.poster}
                    alt={shown ? clip.alt : ""}
                    aria-hidden={!shown}
                    className={`sh-media${shown ? " on" : ""}`}
                  />
                );
              }
              return (
                <video
                  key={`${pi}-${ci}`}
                  ref={(el) => { videoRefs.current[`${pi}-${ci}`] = el; }}
                  className={`sh-media${shown ? " on" : ""}`}
                  poster={clip.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload={near ? "auto" : "none"}
                  aria-label={clip.alt}
                  src={near ? clip.src : undefined}
                />
              );
            })
          )}

          <div className="sh-veil" />
          <div className="sh-copybed" />

        </div>

        <div className="sh-inner">
          {PANELS.map((panel, i) => (
            <div key={panel.em} className={`sh-panel${i === active ? " on" : ""}`} aria-hidden={i !== active}>
              <h1>
                {panel.head} <em>{panel.em}</em>
              </h1>
              {panel.sub && <p>{panel.sub}</p>}
              {panel.cta && (
                <Link href="/start" className="btn btn-primary">
                  Start your journey <span className="arw">→</span>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="sh-progress" aria-hidden="true">
          {PANELS.map((p, i) => (
            <i key={p.em} className={i === active ? "on" : undefined} />
          ))}
        </div>
        <div className="sh-cue" ref={cueRef} aria-hidden="true">
          Scroll <span />
        </div>
      </div>
    </section>
  );
}
