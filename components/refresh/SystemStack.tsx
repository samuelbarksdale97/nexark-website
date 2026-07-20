"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SCHEMATICS } from "./stack-schematics";

/**
 * THE LAYER STACK — recreated from scale.com (reference frames in
 * `directives/website-refresh/enterprise-proto/inspo/`).
 *
 * What makes the reference read the way it does, in order of importance:
 *
 *  1. Planes offset in X AND Y, not just Z. The back planes drift up-and-right, the front
 *     planes down-and-left, so every plane's edge is visible and the stack reads as a
 *     physical deck rather than a flat fan.
 *  2. The media plane is SEMI-TRANSPARENT and tinted, sitting inside the deck — the
 *     wireframes read through it. An opaque photo kills the whole effect.
 *  3. The annotation is DENSE: contour blobs, dotted scan lines, scattered diamond glyphs,
 *     tiny numeric labels, wavy connectors with node squares. Sparse annotation reads as
 *     decoration; dense annotation reads as a system inspecting the image.
 *  4. The images cycle — the same deck, different subject floating through it.
 *
 * Geometry is generated from a seeded PRNG at module scope so server and client render
 * identical markup (Math.random here would be a hydration mismatch).
 */

type Slide = { src: string; alt: string; label: string; key: string };

type Props = {
  slides: Slide[];
  eyebrow?: string;
  heading: string;
  em?: string;
  body?: string;
  cta?: { label: string; href: string };
};

/* ---------- deterministic geometry ---------- */

const mulberry32 = (a: number) => () => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const VB = { w: 900, h: 506 }; // matches the source frames the schematics were authored against

/** annotation marks scattered across a plane — the diamonds and chevrons in the reference */
function makeGlyphs(seed: number, n: number) {
  const r = mulberry32(seed);
  return Array.from({ length: n }, () => {
    const x = 30 + r() * (VB.w - 60);
    const y = 26 + r() * (VB.h - 52);
    const s = 3 + r() * 4;
    const rot = r() * 360;
    return { x, y, s, rot };
  });
}

/** closed organic blobs — the segmentation contours traced over the subject.
 *  Catmull-Rom through the points, converted to cubics: a naive quadratic with a fixed
 *  control offset produces spiky polygons, not the smooth topographic traces in the
 *  reference. The smoothing IS the look. */
function makeContours(seed: number, n: number) {
  const r = mulberry32(seed);
  return Array.from({ length: n }, () => {
    const cx = 90 + r() * (VB.w - 180);
    const cy = 70 + r() * (VB.h - 140);
    const count = 9 + Math.floor(r() * 4);
    const rx = 26 + r() * 74;
    const ry = 18 + r() * 46;
    const pts: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const j = 0.7 + r() * 0.5;
      pts.push([cx + Math.cos(a) * rx * j, cy + Math.sin(a) * ry * j]);
    }
    const at = (i: number) => pts[(i + count) % count];
    let d = `M ${at(0)[0].toFixed(1)},${at(0)[1].toFixed(1)}`;
    for (let i = 0; i < count; i++) {
      const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
      const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d + " Z";
  });
}

/** wavy connector runs with node squares — the routing web on the mid planes */
function makeWires(seed: number, n: number) {
  const r = mulberry32(seed);
  return Array.from({ length: n }, () => {
    const y0 = 60 + r() * (VB.h - 120);
    const x0 = 60 + r() * 120;
    const x1 = VB.w - 80 - r() * 140;
    const bow = (r() - 0.5) * 150;
    const mid = (x0 + x1) / 2;
    return {
      d: `M ${x0.toFixed(0)},${y0.toFixed(0)} C ${(x0 + 90).toFixed(0)},${(y0 + bow).toFixed(0)} ${(mid + 40).toFixed(0)},${(y0 - bow).toFixed(0)} ${x1.toFixed(0)},${(y0 + bow * 0.4).toFixed(0)}`,
      nodes: [
        { x: x0, y: y0 },
        { x: x1, y: y0 + bow * 0.4 },
      ],
    };
  });
}

const DIGITS = ["01", "0110", "1111", "10", "0011", "1101", "00", "1010"];
function makeLabels(seed: number, n: number) {
  const r = mulberry32(seed);
  return Array.from({ length: n }, () => ({
    x: 20 + r() * (VB.w - 40),
    y: 34 + r() * (VB.h - 68),
    t: DIGITS[Math.floor(r() * DIGITS.length)],
  }));
}

const GLYPHS_A = makeGlyphs(11, 26);
const GLYPHS_B = makeGlyphs(27, 22);
const CONTOURS = makeContours(41, 9);
const WIRES = makeWires(73, 4);
const LABELS_A = makeLabels(97, 10);
const LABELS_B = makeLabels(131, 8);

/** only the showing slide and the one after it get a src — 10 videos eagerly loaded is not
 *  a premium experience on a phone */
const near = (i: number, idx: number, n: number) => i === idx || i === (idx + 1) % n;

const Diamond = ({ x, y, s, rot }: { x: number; y: number; s: number; rot: number }) => (
  <path
    d={`M ${x},${y - s} L ${x + s},${y} L ${x},${y + s} L ${x - s},${y} Z`}
    transform={`rotate(${rot.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})`}
  />
);

/**
 * Plane offsets. Back planes drift up-and-right, front planes down-and-left — this is the
 * single biggest difference between "a stack" and "a fan", and it is what makes the deck
 * read as physical. Do not collapse these to Z-only.
 */
/**
 * X/Y are PERCENTAGES of the plane's own size, not pixels: percentages scale with the
 * container, and combined with the plane inset in CSS they keep every translated plane
 * inside the stage box. Pixel offsets on a full-bleed plane always push past the box and
 * register as horizontal overflow at narrow widths. Z stays in px (no percentage for Z).
 */
const PLANES = [
  { key: "p-back", x: "15%", y: "-9%", z: -230 },
  { key: "p-mid-b", x: "8%", y: "-4%", z: -115 },
  { key: "p-media", x: "0%", y: "0%", z: 0 },
  // The contour field gets its own plane, INSET LESS than the media plane so it spans wider
  // than the photo — in the reference the contours clearly spill past the image onto the
  // neighbouring planes. It only works on its own plane because the luma-key filter below
  // gives it real alpha; a blend mode would be trapped in this plane's stacking context.
  { key: "p-edge", x: "-1.4%", y: "0.8%", z: 24 },
  // the authored diagram rides JUST in front of its image — enough separation to parallax,
  // close enough that a box still lands on the object it names
  { key: "p-schem", x: "-2.8%", y: "1.5%", z: 60 },
  { key: "p-mid-f", x: "-9%", y: "5.2%", z: 140 },
  { key: "p-front", x: "-15%", y: "9%", z: 230 },
];

export function SystemStack({ slides, eyebrow, heading, em, body, cta }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const mediaRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const edgeRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [reduced, setReduced] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // the subject floats through the deck — same stack, different image taking its place
  useEffect(() => {
    if (reduced || slides.length < 2) return;
    const id = window.setInterval(() => setIdx((n) => (n + 1) % slides.length), 4200);
    return () => window.clearInterval(id);
  }, [reduced, slides.length]);

  /**
   * Keep the edge pass locked to its footage. Both clips are the same duration and frame
   * rate and start together, so they track — but two <video> elements will drift over long
   * loops, and a drifting X-ray reads as a glitch rather than an overlay. Correct on a slow
   * interval rather than per-frame; anything under ~80ms of skew is invisible.
   */
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      const m = mediaRefs.current[idx];
      const e = edgeRefs.current[idx];
      if (!m || !e || e.readyState < 2) return;
      if (Math.abs(e.currentTime - m.currentTime) > 0.08) e.currentTime = m.currentTime;
    }, 500);
    return () => window.clearInterval(id);
  }, [idx, reduced]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;

    let px = 0, py = 0, prog = 0, raf = 0;
    const apply = () => {
      raf = 0;
      const open = reduced ? 1 : prog;
      stage.style.setProperty("--open", String(open));
      stage.style.transform =
        `rotateY(${(-27 * open + px * 7).toFixed(2)}deg) ` +
        `rotateX(${(4 * open - py * 5).toFixed(2)}deg) ` +
        `rotateZ(${(-1.5 * open).toFixed(2)}deg)`;
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(apply); };

    const onScroll = () => {
      const r = wrap.getBoundingClientRect();
      prog = Math.min(1, Math.max(0, 1 - (r.top - window.innerHeight * 0.16) / (window.innerHeight * 0.7)));
      schedule();
    };
    const onMove = (e: PointerEvent) => {
      if (reduced) return;
      const r = wrap.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      py = ((e.clientY - r.top) / r.height - 0.5) * 2;
      schedule();
    };
    const onLeave = () => { px = 0; py = 0; schedule(); };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const vb = useMemo(() => `0 0 ${VB.w} ${VB.h}`, []);

  return (
    <section className="lstack-band" data-nav="dark">
      {/* luminance -> alpha. RGB is forced to white and alpha is taken from the source's
          brightness, so white contour lines survive and the black ground disappears. */}
      <svg className="nx-defs" aria-hidden="true" focusable="false">
        <filter id="nx-lumakey" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0 1
                    0.2126 0.7152 0.0722 0 0"
          />
        </filter>
      </svg>
      <div className="wrap lstack-grid">
        <div className="lstack" ref={wrapRef}>
          <div className="lstack-stage" ref={stageRef}>
            {PLANES.map((p) => (
              <div
                key={p.key}
                className={`ls-plane ${p.key}`}
                style={{ ["--x" as string]: p.x, ["--y" as string]: p.y, ["--z" as string]: `${p.z}px` }}
                aria-hidden={p.key !== "p-media"}
              >
                {/* BACK — sparse edge marks and digits */}
                {p.key === "p-back" && (
                  <svg viewBox={vb} preserveAspectRatio="none">
                    <g className="ls-glyph">{GLYPHS_B.slice(0, 12).map((g, i) => <Diamond key={i} {...g} />)}</g>
                    <g className="ls-digit">{LABELS_B.map((l, i) => <text key={i} x={l.x} y={l.y}>{l.t}</text>)}</g>
                  </svg>
                )}

                {/* MID-BACK — the dotted scan field */}
                {p.key === "p-mid-b" && (
                  <svg viewBox={vb} preserveAspectRatio="none">
                    <g className="ls-scan">
                      {[70, 150, 230, 310, 390, 470].map((y) => (
                        <path key={y} d={`M 24,${y} L ${VB.w - 24},${y}`} />
                      ))}
                    </g>
                    <g className="ls-glyph">{GLYPHS_A.slice(0, 14).map((g, i) => <Diamond key={i} {...g} />)}</g>
                    <g className="ls-col">
                      {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={34} cy={54 + i * 40} r="3.4" />)}
                    </g>
                  </svg>
                )}

                {/* MEDIA — semi-transparent and tinted, INSIDE the deck */}
                {p.key === "p-media" && (
                  <>
                    {slides.map((s, i) =>
                      reduced ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={s.src} src={s.src} alt={i === idx ? s.alt : ""} aria-hidden={i !== idx}
                          className={`ls-shot${i === idx ? " on" : ""}`} />
                      ) : (
                        <video key={s.src} className={`ls-shot${i === idx ? " on" : ""}`}
                          ref={(el) => { mediaRefs.current[i] = el; }}
                          src={near(i, idx, slides.length) ? s.src.replace(".jpg", ".mp4") : undefined}
                          poster={s.src} autoPlay muted loop playsInline preload="auto" aria-label={s.alt} />
                      )
                    )}
                    <div className="ls-tint" />
                  </>
                )}

                {/* EDGE — contours extracted from the footage, per frame, on their own
                    plane. `filter: url(#nx-lumakey)` maps luminance to alpha, so the black
                    ground becomes genuinely transparent — no blend mode, therefore no
                    stacking-context trap, therefore it can sit on any plane at any offset. */}
                {p.key === "p-edge" &&
                  !reduced &&
                  slides.map((sl, i) => (
                    <video
                      key={`e-${sl.key}`}
                      className={`ls-edge${i === idx ? " on" : ""}`}
                      ref={(el) => { edgeRefs.current[i] = el; }}
                      src={near(i, idx, slides.length) ? `/refresh/clips/edge/${sl.key}.mp4` : undefined}
                      autoPlay muted loop playsInline preload="auto" aria-hidden="true"
                    />
                  ))}

                {/* MID-FRONT — the AUTHORED schematic for whichever subject is showing.
                    It cross-fades with the image, so the diagram travels with its frame. */}
                {p.key === "p-schem" &&
                  slides.map((sl, i) => {
                    const sc = SCHEMATICS[sl.key];
                    if (!sc) return null;
                    return (
                      <svg
                        key={sl.key}
                        viewBox={vb}
                        preserveAspectRatio="none"
                        className={`ls-schem${i === idx ? " on" : ""}`}
                      >
                        {sc.ticks && <g className="ls-scan">{sc.ticks.map((d, k) => <path key={k} d={d} />)}</g>}
                        <g className="ls-wire">{sc.wires.map((d, k) => <path key={k} d={d} />)}</g>

                        {sc.boxes.map((b, k) => (
                          <g key={k} className="ls-box">
                            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="3" />
                            {/* corner ticks, the way a detector draws them */}
                            <path d={`M ${b.x},${b.y + 14} L ${b.x},${b.y} L ${b.x + 14},${b.y}`} />
                            <path d={`M ${b.x + b.w - 14},${b.y + b.h} L ${b.x + b.w},${b.y + b.h} L ${b.x + b.w},${b.y + b.h - 14}`} />
                            <rect className="ls-chip" x={b.x} y={Math.max(0, b.y - 15)} width={b.label.length * 5.4 + 12} height="14" rx="2" />
                            <text x={b.x + 6} y={Math.max(0, b.y - 15) + 10}>{b.label}</text>
                          </g>
                        ))}

                        {sc.steps.map((st, k) => (
                          <g key={k} className="ls-step">
                            <circle cx={st.x} cy={st.y} r="7" />
                            <circle className="ls-step-dot" cx={st.x} cy={st.y} r="2.4" />
                            <text x={st.x} y={st.y - 13}>{st.label}</text>
                          </g>
                        ))}
                      </svg>
                    );
                  })}

                {p.key === "p-mid-f" && (
                  <svg viewBox={vb} preserveAspectRatio="none">
                    <g className="ls-glyph">{GLYPHS_A.slice(14).map((g, i) => <Diamond key={i} {...g} />)}</g>
                  </svg>
                )}

                {/* FRONT — the routing web and its nodes */}
                {p.key === "p-front" && (
                  <svg viewBox={vb} preserveAspectRatio="none">
                    <g className="ls-wire">{WIRES.map((w, i) => <path key={i} d={w.d} />)}</g>
                    <g className="ls-node">
                      {WIRES.flatMap((w, i) =>
                        w.nodes.map((n, j) => (
                          <rect key={`${i}-${j}`} x={n.x - 4} y={n.y - 4} width="8" height="8" rx="1.5" />
                        ))
                      )}
                    </g>
                    <g className="ls-digit">{LABELS_A.map((l, i) => <text key={i} x={l.x} y={l.y}>{l.t}</text>)}</g>
                    <g className="ls-glyph">{GLYPHS_B.slice(12).map((g, i) => <Diamond key={i} {...g} />)}</g>
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* which subject the deck is currently inspecting */}
          <div className="ls-readout" aria-live="polite">
            <span className="ls-dotmark" />
            {slides[idx].label}
          </div>
        </div>

        <div className="lstack-copy reveal">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2>
            {heading} {em && <em>{em}</em>}
          </h2>
          {body && <p>{body}</p>}
          {cta && (
            <a href={cta.href} className="btn btn-primary">
              {cta.label} <span className="arw">→</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
