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
const ORBIT_SECONDS = 240;  // a smidge quicker (Sam, 07-20) — ~8%, not a gear change
const COMPACT_W = 860;

/** how far the tile scale swings between the far side of the loop and the near side */
// The reference's tiles run from roughly 45px to 180px — a 4x spread, and that variance is what
// reads as depth. Ours were 0.42-1.0 on a 172px base, which at a glance looked like one size.
const SCALE_MIN = 0.26;
const SCALE_MAX = 1.05;
// The field runs on a diagonal rather than sitting square to the viewport: near at lower-left,
// far at upper-right.
const AXIS_DEG = -21;
const AXIS = (AXIS_DEG * Math.PI) / 180;

type Path = { xs: number[]; ys: number[]; cum: number[]; total: number; minU: number; maxU: number };

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
  // ...nor come inside this, or it lands on the headline.
  const clrX = copy.w / 2 + halfW + 30;
  const clrY = copy.h / 2 + halfH + 30;
  // The copy is a RECTANGLE, so the keep-out must be one too. The old boundary was an ellipse
  // (the 2-norm), which under-protects the diagonals: near 45 degrees it sits closer to the
  // centre than the rectangle's own corner does, so tiles were free to graze the "A" at the
  // headline's top-left even though the top and left edges themselves looked fine.
  //
  // A superellipse does not fix it either — at P=3.6 the worst gap is still -34px, and no
  // finite exponent ever fully reaches the corner. The exact answer is the ray/rectangle
  // intersection: the smaller of the two axis crossings is precisely where this angle's ray
  // leaves the box. Measured over 3600 angles, that holds the full pad at every one of them.
  const EPS = 1e-6;
  const clearRadius = (c: number, s: number) =>
    Math.min(clrX / Math.max(Math.abs(c), EPS), clrY / Math.max(Math.abs(s), EPS));

  const xs: number[] = [];
  const ys: number[] = [];
  const cum: number[] = [0];
  // extent along the DIAGONAL axis, which is what depth is measured against
  let minU = Infinity;
  let maxU = -Infinity;

  for (let k = 0; k <= SAMPLES; k++) {
    const t = (k / SAMPLES) * TAU;
    // The SHAPE is evaluated in its own frame and the point is placed in the SCREEN frame one
    // rotation later. Rotating the finished path instead would tilt the keep-out box with it and
    // silently void the clearance guarantee — the copy is axis-aligned to the viewport, so the
    // clearance and the field limit must both be evaluated at the on-screen angle.
    const c0 = Math.cos(t);
    const s0 = Math.sin(t);
    const th = t + AXIS;
    const c = Math.cos(th);
    const s = Math.sin(th);

    // base ellipse radius at this angle, in the shape's own frame
    const base = 1 / Math.hypot(c0 / rx, s0 / ry);
    // gentle harmonics: the loop is irregular, but irregular in θ — identical for every tile
    const shaped = base * (1 + 0.11 * Math.cos(2 * t + 0.6) + 0.06 * Math.cos(3 * t - 1.1));
    // the copy box and the field edge, expressed as radii along the SCREEN angle
    const clearance = clearRadius(c, s);
    const limit = 1 / Math.hypot(c / limX, s / limY);

    const r = Math.min(Math.max(shaped, clearance), Math.max(limit, clearance));
    const x = cx + c * r;
    const y = cy + s * r;
    xs.push(x);
    ys.push(y);
    const u = (x - cx) * Math.cos(AXIS) + (y - cy) * Math.sin(AXIS);
    if (u < minU) minU = u;
    if (u > maxU) maxU = u;
    if (k > 0) {
      cum.push(cum[k - 1] + Math.hypot(x - xs[k - 1], y - ys[k - 1]));
    }
  }
  return { xs, ys, cum, total: cum[SAMPLES], minU, maxU };
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
      const span = path.maxU - path.minU || 1;
      for (let n = 0; n < nodes.length; n++) {
        const pt = atLength(path, (n / nodes.length + turn) * path.total);
        // depth reads along the diagonal axis — lower-left is near, upper-right is far
        const u = (pt.x - W / 2) * Math.cos(AXIS) + (pt.y - H / 2) * Math.sin(AXIS);
        const near = 1 - (u - path.minU) / span;
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

    // Hovering pauses the orbit. Two things matter here:
    //
    // 1. We hold ELAPSED TIME still rather than stopping the clock, so motion resumes exactly
    //    where it stopped instead of jumping forward by however long the cursor rested.
    // 2. The stop is EASED, not binary. A speed multiplier glides between 1 and 0 instead of
    //    snapping, so the orbit slows to a halt and lifts off again — an abrupt stop reads as
    //    a dropped frame, which is the opposite of the calm this section is going for.
    //
    // The glide is exponential smoothing keyed to real elapsed time, so it behaves the same on
    // a 120Hz display as on a 60Hz one. It approaches zero asymptotically and never quite
    // arrives, so we settle it once it is imperceptible — otherwise the tiles creep forever.
    // Asymmetric on purpose: it settles fairly promptly so the stop reads as deliberate, and
    // lifts off more gently so resuming never feels like a lurch. A single long constant left
    // the tiles still creeping at ~15% speed a second after the cursor landed, which reads as
    // a leak rather than a halt.
    const STOP_MS = 130;
    const START_MS = 520;
    let start = 0;
    let held = 0;
    let last = 0;
    let speed = 1;
    const step = (t: number) => {
      if (!start) { start = t; last = t; }
      const dt = t - last;
      last = t;
      const target = hoverRef.current ? 0 : 1;
      speed += (target - speed) * (1 - Math.exp(-dt / (target === 0 ? STOP_MS : START_MS)));
      if (target === 0 && speed < 0.05) speed = 0;
      held += dt * speed;
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
            {/* the blurb is gone (Sam, 07-20): headline, then one small action. The reference
                states the claim and stops — a paragraph under it turns the clearing into a
                content block and the field into decoration around it. */}
            <a href="/start" className="btn arc-cta">Get Started <span className="arw">→</span></a>
            <span className="sr-only" aria-live="polite">{ind.word}</span>
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
