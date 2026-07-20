"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Artificial Intelligence / Real <industry>" — the orbit.
 *
 * ── Why this was rewritten (2026-07-20) ─────────────────────────────────────────────────
 * The previous version had THREE position systems fighting each frame, and instrumenting it
 * proved every symptom Sam reported:
 *
 *   1. An arc-length ellipse defining the ideal path.
 *   2. A per-tile radius multiplier that took each tile OFF that path onto its own ellipse.
 *      Measured normalised radii ran 0.737 → 1.159 across twelve tiles: not one orbit with
 *      variation, but twelve different orbits. ("They all seem like they're doing their own
 *      thing" — they were.)
 *   3. A collision push + clamp that overrode both, discontinuously. Measured frame-to-frame
 *      steps spiked to 22.4px against a 0.67px mean — a 33× jump, exactly the push step size.
 *      That was the visible zigzag. And the clamp pinned large-radius tiles to the field edge
 *      for up to 62% of their frames, where they stopped following any curve at all.
 *
 * Each layer had been added to patch a symptom of the one before it.
 *
 * ── The model now ───────────────────────────────────────────────────────────────────────
 * ONE closed path, shared by every tile. Its radius varies with ANGLE — never with tile
 * identity — so the loop is irregular (which is what makes it feel designed rather than
 * mechanical) while every tile still rides the same curve.
 *
 *     R(θ) = clamp( ellipse(θ) × harmonics(θ),  clearance(θ),  fieldLimit(θ) )
 *
 * The copy clearance is baked INTO THE PATH, not applied per tile. That is the whole trick:
 * deform the curve once, and no tile ever has to be pushed off it. There is no per-tile
 * jitter, no collision push, and no clamp — so there is nothing left to fight.
 *
 * The path is sampled and arc-length parameterised once per resize. Per frame the loop only
 * reads a lookup table and writes transforms; it never touches layout.
 */

type Industry = { word: string; img: string; blurb: string; ink: string };

const INDUSTRIES: Industry[] = [
  { word: "Hospitality", img: "hero-venue", ink: "#8F6519",  // was #6600CC — purple is the logo only
    blurb: "Venues where the welcome has to feel personal every single time." },
  { word: "Construction", img: "construction", ink: "#8A5520",
    blurb: "Change orders, daily logs, and a schedule that stays honest." },
  { word: "Property", img: "clip-property", ink: "#2F5D50",
    blurb: "Buildings, compliance, and the evidence that proves it happened." },
  { word: "HVAC", img: "hvac", ink: "#215C63",
    blurb: "Dispatch, service history, and invoices that leave with the tech." },
  { word: "Members", img: "clip-scan", ink: "#8A5A2B",
    blurb: "Loyalty that belongs to the business, not to one person's memory." },
  { word: "Auto Shops", img: "autoservice", ink: "#7A3B45",
    blurb: "Estimates, approvals, and a bay schedule nobody has to babysit." },
  { word: "Nightlife", img: "clip-ticketing", ink: "#4A2E7A",
    blurb: "Doors, lists, and ticketing that hold up on the busiest night." },
  { word: "Gyms", img: "fitness", ink: "#2E5A78",
    blurb: "Memberships, check-ins, and billing that stops leaking quietly." },
  { word: "Restaurants", img: "clip-restaurant", ink: "#8C3B2E",
    blurb: "Service, close-out, and reconciliation that finishes itself." },
  { word: "Barbershops", img: "barbershop", ink: "#6B4326",
    blurb: "Chairs, walk-ins, and regulars who never re-introduce themselves." },
  { word: "Charters", img: "clip-yacht", ink: "#1F5673",
    blurb: "Bookings and turnarounds for operators who are rarely at a desk." },
  { word: "Multi-site", img: "clip-multisite", ink: "#3D4A7A",
    blurb: "Two locations or ten, running off one source of truth." },
];

const TAU = Math.PI * 2;
const SAMPLES = 900;
const ORBIT_SECONDS = 260;
const COMPACT_W = 860;

/** how far the tile scale swings between the far side of the loop and the near side */
const SCALE_MIN = 0.42;
const SCALE_MAX = 1.0;

type Path = { xs: number[]; ys: number[]; cum: number[]; total: number; minX: number; maxX: number };

/**
 * Build the shared loop. Everything that shapes it is a function of θ alone — that is what
 * guarantees a single path rather than one per tile.
 */
function buildPath(W: number, H: number, copy: { w: number; h: number }, tileW: number, tileH: number): Path {
  const cx = W / 2;
  const cy = H / 2;
  const rx = W * 0.40;
  const ry = H * 0.45;
  const halfW = (tileW * SCALE_MAX) / 2;
  const halfH = (tileH * SCALE_MAX) / 2;
  // the loop may not exceed this or tiles leave the section
  const limX = Math.max(40, W / 2 - halfW - 6);
  const limY = Math.max(40, H / 2 - halfH - 6);
  // ...nor come inside this, or it lands on the headline
  const clrX = copy.w / 2 + halfW + 22;
  const clrY = copy.h / 2 + halfH + 22;

  const xs: number[] = [];
  const ys: number[] = [];
  const cum: number[] = [0];
  let minX = Infinity;
  let maxX = -Infinity;

  for (let k = 0; k <= SAMPLES; k++) {
    const t = (k / SAMPLES) * TAU;
    const c = Math.cos(t);
    const s = Math.sin(t);

    // base ellipse radius at this angle
    const base = 1 / Math.hypot(c / rx, s / ry);
    // gentle harmonics: the loop is irregular, but irregular in θ — identical for every tile
    const shaped = base * (1 + 0.11 * Math.cos(2 * t + 0.6) + 0.06 * Math.cos(3 * t - 1.1));
    // the copy box and the field edge, expressed as radii along this same angle
    const clearance = 1 / Math.hypot(c / clrX, s / clrY);
    const limit = 1 / Math.hypot(c / limX, s / limY);

    const r = Math.min(Math.max(shaped, clearance), Math.max(limit, clearance));
    const x = cx + c * r;
    const y = cy + s * r;
    xs.push(x);
    ys.push(y);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (k > 0) {
      cum.push(cum[k - 1] + Math.hypot(x - xs[k - 1], y - ys[k - 1]));
    }
  }
  return { xs, ys, cum, total: cum[SAMPLES], minX, maxX };
}

/** point at a given distance along the loop — binary search, no allocation */
function atLength(path: Path, len: number) {
  const target = ((len % path.total) + path.total) % path.total;
  let lo = 0;
  let hi = SAMPLES;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    if (path.cum[mid] <= target) lo = mid;
    else hi = mid;
  }
  const seg = path.cum[lo + 1] - path.cum[lo] || 1;
  const f = (target - path.cum[lo]) / seg;
  return {
    x: path.xs[lo] + (path.xs[lo + 1] - path.xs[lo]) * f,
    y: path.ys[lo] + (path.ys[lo + 1] - path.ys[lo]) * f,
  };
}

export function ArcWheel() {
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef(0);
  const [i, setI] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);
  // hover is a PREVIEW: it pauses the orbit and shows that industry, but releasing must not
  // snap back to whatever the autoplay had reached. On release we hand the autoplay the word
  // the visitor was actually looking at and let it carry on from there.
  const [hovered, setHovered] = useState<number | null>(null);
  const hoverRef = useRef(false);
  const [reduced, setReduced] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    const nodes = Array.from(field.querySelectorAll<HTMLElement>(".arc-tile"));
    if (!nodes.length) return;

    let path: Path | null = null;
    let W = 0;
    let H = 0;
    let small = false;

    /* Measured ONCE per resize. The previous version read getBoundingClientRect twice per
       tile per frame — twenty-four forced layouts a frame — which is its own source of
       stutter. Nothing in the animation loop touches layout now. */
    const measure = () => {
      const fr = field.getBoundingClientRect();
      W = fr.width;
      H = fr.height;
      small = W < COMPACT_W;
      setCompact(small);
      if (small || W === 0 || H === 0) {
        path = null;
        nodes.forEach((el) => {
          el.style.left = "";
          el.style.top = "";
          el.style.transform = "";
          el.style.opacity = "";
          el.style.zIndex = "";
        });
        return;
      }
      const c = coreRef.current?.getBoundingClientRect();
      const tw = nodes[0].offsetWidth || 172;
      const th = nodes[0].offsetHeight || 136;
      path = buildPath(W, H, { w: c?.width ?? 700, h: c?.height ?? 300 }, tw, th);
    };

    const render = (turn: number) => {
      if (!path) return;
      const span = path.maxX - path.minX || 1;
      for (let n = 0; n < nodes.length; n++) {
        const pt = atLength(path, (n / nodes.length + turn) * path.total);
        // depth reads off horizontal position — left is near, right is far
        const near = 1 - (pt.x - path.minX) / span;
        const scale = SCALE_MIN + near * (SCALE_MAX - SCALE_MIN);
        const el = nodes[n];
        el.style.left = `${(pt.x / W) * 100}%`;
        el.style.top = `${(pt.y / H) * 100}%`;
        el.style.setProperty("--s", scale.toFixed(3));
        // Uniform contrast the whole way round. Fading tiles by depth made the right-hand side
        // read as blurred and out of focus; scale alone carries the depth.
        el.style.zIndex = String(Math.round(near * 40));
      }
    };

    measure();
    const ro = new ResizeObserver(() => {
      measure();
      if (path) render(0);
    });
    ro.observe(field);

    if (reduced) {
      render(0);
      return () => ro.disconnect();
    }

    // Hovering pauses the orbit. Rather than stopping the clock (which would jump when it
    // restarted), we hold the elapsed time still while paused, so motion resumes exactly where
    // it stopped.
    let start = 0;
    let held = 0;
    let last = 0;
    const step = (t: number) => {
      if (!start) { start = t; last = t; }
      if (!hoverRef.current) held += t - last;
      last = t;
      render((held / (ORBIT_SECONDS * 1000)) % 1);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [reduced]);

  useEffect(() => {
    if (pinned !== null || hovered !== null || reduced) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % INDUSTRIES.length), 5200);
    return () => window.clearInterval(id);
  }, [pinned, hovered, reduced]);

  const enter = (n: number) => { hoverRef.current = true; setHovered(n); };
  const leave = () => { hoverRef.current = false; setHovered((h) => { if (h !== null) setI(h); return null; }); };

  const active = pinned ?? hovered ?? i;
  const ind = INDUSTRIES[active];

  /* THE ROTOR.
     "Real" has to slide left/right as the word beside it changes length, not jump. That means
     the slot the word sits in needs an explicit width to transition BETWEEN — and a width can
     only transition between two numbers, never to `auto`. So every word is measured once, up
     front, exactly as the checklist demands of any generated layout: know the geometry before
     the animation, never solve it per frame.

     The row is centre-justified, so animating the slot width moves "Real" outward as the word
     grows and inward as it shrinks — the sliding is a consequence of the geometry, not a
     second animation that has to be kept in sync with the first. */
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [widths, setWidths] = useState<number[]>([]);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const host = measureRef.current;
    if (!host) return;
    const measure = () => {
      const spans = host.querySelectorAll<HTMLElement>("span");
      setWidths(Array.from(spans, (el) => el.getBoundingClientRect().width));
    };
    measure();
    // Re-measure once webfonts land — measuring against the fallback face yields widths that
    // are wrong by enough to make the first slide visibly overshoot.
    document.fonts?.ready.then(measure).catch(() => {});
    const ro = new ResizeObserver(measure); // the type is vw-based, so width tracks the viewport
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  // hold the outgoing word just long enough to rotate it out from under the incoming one
  const lastActive = useRef(active);
  useEffect(() => {
    if (lastActive.current === active) return;
    setPrev(lastActive.current);
    lastActive.current = active;
    const t = window.setTimeout(() => setPrev(null), 460);
    return () => window.clearTimeout(t);
  }, [active]);

  return (
    <section className="arc-band" data-nav="light" style={{ ["--ink-accent" as string]: ind.ink }}>
      <div className="arc-orbit">
        <div className="arc-field" ref={fieldRef}>
          {INDUSTRIES.map((x, n) => (
            <button
              key={x.word}
              type="button"
              className={`arc-tile${n === active ? " lit" : ""}`}
              aria-label={`Show ${x.word}`}
              aria-pressed={n === active}
              onMouseEnter={() => enter(n)}
              onMouseLeave={leave}
              onFocus={() => enter(n)}
              onBlur={leave}
              onClick={() => setPinned(n)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/refresh/tiles/${x.img}.jpg`} alt="" />
            </button>
          ))}
        </div>

        <div className="wrap arc-stage">
          <div className="arc-core" ref={coreRef}>
            <h2>
              {/* The ruler MUST live inside this h2. Rendered as a sibling of the headline it
                  inherited the section's base font-size instead of the headline's clamp(), so
                  every word measured at ~16px type — the slot came out far too narrow and the
                  word overflowed to the right of it. Measure where the type actually lives. */}
              <span className="arc-measure" ref={measureRef} aria-hidden="true">
                {INDUSTRIES.map((x) => (
                  <span key={x.word} className="arc-word">{x.word}</span>
                ))}
              </span>
              <span className="arc-fixed">Artificial Intelligence</span>
              <span className="arc-rotor">
                <span className="arc-real">Real</span>
                <span
                  className="arc-slot"
                  style={widths[active] ? { width: `${widths[active]}px` } : undefined}
                >
                  {/* Only the OUTGOING word is absolutely positioned. The incoming one stays in
                      flow so the slot inherits a real baseline — with both absolute, the slot's
                      baseline fell to its bottom edge and the word sat visibly high beside
                      "Real". */}
                  {prev !== null && (
                    <span key={`out-${prev}`} className="arc-word out" aria-hidden="true">
                      {INDUSTRIES[prev].word}
                    </span>
                  )}
                  <span key={active} className="arc-word in">{ind.word}</span>
                </span>
              </span>
            </h2>
            <p className="arc-blurb" aria-live="polite">{ind.blurb}</p>
            <a href="/start" className="btn arc-cta">Get Started <span className="arw">→</span></a>
          </div>
        </div>
      </div>

      {compact && (
        <div className="wrap">
          {/* Every industry in this list has a tile in the strip above — the two sets are the
              same twelve. A pill that highlighted an industry whose image was hidden was the
              mismatch Sam spotted. */}
          <ul className="arc-list">
            {INDUSTRIES.map((x, n) => (
              <li key={x.word}>
                <button
                  type="button"
                  className={n === active ? "on" : undefined}
                  style={n === active ? { background: x.ink, borderColor: x.ink } : undefined}
                  onClick={() => setPinned(n)}
                  onFocus={() => enter(n)}
                  onBlur={leave}
                >
                  {x.word}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="wrap">
        <p className="arc-kicker">
          Every business has a next arc. <em>Nexark</em> is how you get to yours.
        </p>
      </div>
    </section>
  );
}
