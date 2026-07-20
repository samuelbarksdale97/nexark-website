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
  // Four more added 07-20 to tighten the spacing along the loop. Every one has its own photo —
  // no image is used twice, which Sam has already called out once.
  { word: "Caterers", img: "catering", ink: "#7B4A2A",
    blurb: "Head counts, timelines, and a kitchen that knows what leaves when." },
  { word: "Salons", img: "salon", ink: "#6E3F55",
    blurb: "Chairs, colour histories, and clients who rebook themselves." },
  { word: "Cleaning Crews", img: "cleaning", ink: "#2F5A5E",
    blurb: "Routes, proof of service, and invoices that follow the work." },
  { word: "Fleets", img: "logistics", ink: "#4A4535",
    blurb: "Vehicles, drivers, and a dispatch board nobody has to rebuild." },
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
// The field runs on a diagonal: near at lower-left, far at upper-right.
//
// These were one constant, and that was the mistake. Tilting the LOOP is expensive — the copy
// box stays axis-aligned to the viewport, so every degree of tilt forces the ellipse to grow to
// keep encircling it (-15 degrees cost a 1438px section; -6 degrees cost 878px). But the
// diagonal READ comes almost entirely from the size gradient, which is free. So the shape tilts
// gently and the depth axis stays steep.
const TILT_DEG = -7;
const DEPTH_DEG = -24;
const TILT = (TILT_DEG * Math.PI) / 180;
const AXIS = (DEPTH_DEG * Math.PI) / 180;

type Path = { xs: number[]; ys: number[]; cum: number[]; total: number; minU: number; maxU: number; needH: number };

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
  // ------------------------------------------------------------------------------------
  // NO CLAMPING. This is the whole redesign.
  //
  // Every previous version computed a natural ellipse radius and then clamped it outward
  // whenever it would cross the copy:
  //
  //     r = min(max(shaped, clearance), max(limit, clearance))
  //
  // That does not produce an arc that avoids the words. It produces an arc that BECOMES the
  // outline of the words wherever the two overlap — the path leaves the curve, traces the
  // keep-out boundary, and rejoins. Sam described it exactly: up, then left, then up, then
  // right. Making the keep-out rectangular (to fix a corner-clipping bug) made it worse still,
  // because a rectangle contributes straight runs and hard corners to the traced section.
  //
  // A clamp can only ever dodge. So the loop is now sized so that nothing needs dodging: build
  // the curve first, then scale the WHOLE thing uniformly until the copy sits inside it. Uniform
  // scaling about the centre preserves the shape exactly — a scaled ellipse is still an ellipse
  // — so the result is smooth everywhere by construction, with no special case anywhere on it.
  //
  // The section then grows to fit the result. Sam: "If we need to enlarge the area we're working
  // within in order to give us a proper arc, then let's do that."
  // ------------------------------------------------------------------------------------

  // the keep-out rectangle: the copy, plus a tile's half-size, plus breathing room
  const PAD = 26;
  const a = copy.w / 2 + halfW + PAD;
  const b = copy.h / 2 + halfH + PAD;

  // The base ellipse is DERIVED from the keep-out rather than picked and then inflated to fit.
  // The smallest ellipse through a rectangle's corners is the rectangle scaled by root two, so
  // that is the starting size; dividing by the harmonics' minimum keeps the dipped sections
  // outside too. Choosing an arbitrary ellipse and scaling it up until it cleared produced a
  // loop nearly twice as large as it needed to be (a 1474px section).
  //
  // Harmonics are gentler than before (0.06/0.03, was 0.11/0.06). The loop should read as an
  // arc with some life in it, not as a wobble — and a deeper dip forces a bigger ellipse for
  // the same clearance, so restraint here buys compactness for free.
  const H1 = 0.06;
  const H2 = 0.03;
  const harmonic = (t: number) => 1 + H1 * Math.cos(2 * t + 0.6) + H2 * Math.cos(3 * t - 1.1);
  let hMin = 1;
  for (let k = 0; k <= 360; k++) hMin = Math.min(hMin, harmonic((k / 360) * TAU));
  // Containment needs (a/rx)^2 + (b/ry)^2 <= 1. The root-two pair (a*sqrt2, b*sqrt2) satisfies
  // it but is far from the cheapest solution: a WIDER loop needs proportionally less height,
  // and height is what costs us section length. So fix the width generously — tiles bleeding
  // past the viewport edge is correct here, the reference does exactly that — and solve for the
  // smallest height that still encircles the copy.
  // Containment must be solved for the TILTED ellipse, not solved upright and then rotated —
  // rotating afterwards breaks it and the scale pass then inflates the loop to compensate.
  // Express each corner of the keep-out rect in the ellipse's own frame and require it inside.
  const ct = Math.cos(TILT);
  const st = Math.sin(TILT);
  // A tighter oval: the tips come in, the perimeter shortens, and twelve-plus tiles sit closer
  // together. Narrower costs height (containment forces ry up as rx comes down), so this is the
  // knee of that curve — measurable bleed almost gone, spacing roughly halved.
  const rx0 = (W * 0.44) / hMin;
  let ry0 = b;
  for (const sy of [1, -1]) {
    const u = a * ct + sy * b * st;
    const v = -a * st + sy * b * ct;
    const slack = 1 - Math.min(0.95, (u / rx0) ** 2);
    const need = Math.abs(v) / Math.sqrt(Math.max(0.05, slack));
    if (need > ry0) ry0 = need;
  }
  ry0 /= hMin;

  const xs: number[] = [];
  const ys: number[] = [];
  const cum: number[] = [0];

  // pass 1 — the pure curve, and the single scale factor that clears the copy
  const px: number[] = [];
  const py: number[] = [];
  let f = 1;
  for (let k = 0; k <= SAMPLES; k++) {
    const t = (k / SAMPLES) * TAU;
    const c0 = Math.cos(t);
    const s0 = Math.sin(t);
    // the shape is defined in its own frame; the point is placed one rotation later, so the
    // field runs on a diagonal without the shape itself being skewed
    const th = t + TILT;
    const base = 1 / Math.hypot(c0 / rx0, s0 / ry0);
    // gentle harmonics: irregular in θ, and identical for every tile
    const r = base * harmonic(t);
    const dx = Math.cos(th) * r;
    const dy = Math.sin(th) * r;
    px.push(dx);
    py.push(dy);
    // this point is clear once |dx| >= a OR |dy| >= b, so the smallest scale that clears it is
    // the easier of the two escapes; the loop as a whole needs the largest of those.
    const need = Math.min(a / Math.max(Math.abs(dx), 1e-6), b / Math.max(Math.abs(dy), 1e-6));
    if (need > f) f = need;
  }

  // pass 2 — place the scaled curve and build the arc-length table
  let minU = Infinity;
  let maxU = -Infinity;
  let maxAbsY = 0;
  for (let k = 0; k <= SAMPLES; k++) {
    const x = cx + px[k] * f;
    const y = cy + py[k] * f;
    xs.push(x);
    ys.push(y);
    if (Math.abs(y - cy) > maxAbsY) maxAbsY = Math.abs(y - cy);
    const u = (x - cx) * Math.cos(AXIS) + (y - cy) * Math.sin(AXIS);
    if (u < minU) minU = u;
    if (u > maxU) maxU = u;
    if (k > 0) cum.push(cum[k - 1] + Math.hypot(x - xs[k - 1], y - ys[k - 1]));
  }

  // what the section must be tall enough to hold
  const needH = 2 * (maxAbsY + halfH) + 40;
  return { xs, ys, cum, total: cum[SAMPLES], minU, maxU, needH };
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
      // Measure what is actually PAINTED, not its container. .arc-core is a fixed 860px box
      // that the headline only partly fills, so using its rect reserved a keep-out far wider
      // than the words — which is more of the loop deformed for no reason.
      const core = coreRef.current;
      // NOT the h2: it contains the hidden word-ruler, and a Range over its contents measures
      // all twelve industry words laid out on one nowrap line (4785px). Measure the visible
      // spans, each of which is content-sized.
      const marks = core
        ? [core.querySelector(".arc-fixed"), core.querySelector(".arc-rotor"), core.querySelector(".arc-cta")]
        : [];
      let cw = 0;
      let ch = 0;
      let top = Infinity;
      let bot = -Infinity;
      for (const m of marks) {
        if (!m) continue;
        const r = m.getBoundingClientRect();
        if (r.width > cw) cw = r.width;
        if (r.top < top) top = r.top;
        if (r.bottom > bot) bot = r.bottom;
      }
      ch = bot > top ? bot - top : 0;
      const tw = nodes[0].offsetWidth || 172;
      const th = nodes[0].offsetHeight || 136;
      path = buildPath(W, H, { w: cw || 700, h: ch || 300 }, tw, th);

      // The section grows to hold the finished curve rather than the curve being squeezed to
      // fit the section. Guarded so the ResizeObserver this triggers cannot oscillate.
      const stage = core?.closest(".arc-stage") as HTMLElement | null;
      if (stage) {
        const want = Math.round(path.needH);
        if (Math.abs((parseFloat(stage.style.minHeight) || 0) - want) > 2) {
          stage.style.minHeight = `${want}px`;
        }
      }
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
