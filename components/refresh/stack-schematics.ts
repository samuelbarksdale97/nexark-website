/**
 * PER-CLIP SCHEMATICS — authored, not generated.
 *
 * In the reference (scale.com), every subject carries its OWN diagram: contours follow that
 * image's terrain, boxes land on that image's real objects, and the labels name what is
 * actually there ("Sedan", "Truck"). A generic overlay reused across images reads as
 * wallpaper; a schematic that maps to the frame reads as a system inspecting it.
 *
 * NOTE: there are deliberately NO hand-drawn contours here. Tracing a subject by hand reads
 * as crude the moment it sits beside contours actually extracted from the frame (see
 * EDGE_PASS.md) — Sam called it "very basic hand drawing… ruining the aesthetic," and he was
 * right. This file carries only what extraction CANNOT produce: semantic boxes on named
 * objects, the workflow steps, and their connectors.
 *
 * So each entry below was authored against its actual poster frame. Coordinates are in the
 * 900 x 506 space of the source video, and the boxes sit on real things:
 * the phone, the reader, the wristband, the egress window, the helm.
 *
 * If you swap a clip, RE-AUTHOR its schematic against the new frame. Do not carry the old
 * coordinates over — a box floating off its object is worse than no box.
 */

export type Box = { x: number; y: number; w: number; h: number; label: string };
export type Step = { x: number; y: number; label: string };
export type Schematic = {
  boxes: Box[];
  wires: string[];
  steps: Step[];
  ticks?: string[];
};

export const SCHEMATICS: Record<string, Schematic> = {
  /* Phone tapped against a reader at the door. Subject centre-left, device upper-right,
     reader lower-left. The workflow is literally travelling across the frame. */
  "clip-scan": {
    boxes: [
      { x: 522, y: 8, w: 362, h: 344, label: "MEMBER DEVICE" },
      { x: 92, y: 408, w: 334, h: 92, label: "READER" },
    ],
    wires: [
      "M 700,352 C 660,392 520,404 424,432",
      "M 260,406 C 250,346 214,300 196,268",
    ],
    steps: [
      { x: 700, y: 372, label: "TAP" },
      { x: 424, y: 452, label: "MATCH" },
      { x: 196, y: 250, label: "LOGGED" },
    ],
    ticks: ["M 470,20 L 470,120", "M 470,250 L 470,340"],
  },

  /* Empty unit walk-through. The annotations are the things a compliance record cares
     about: entry, electrical, egress. */
  "clip-property": {
    boxes: [
      { x: 74, y: 68, w: 122, h: 398, label: "UNIT ENTRY" },
      { x: 504, y: 250, w: 102, h: 56, label: "ELECTRICAL" },
      { x: 750, y: 24, w: 144, h: 312, label: "EGRESS WINDOW" },
      { x: 760, y: 306, w: 132, h: 86, label: "HEATING" },
    ],
    wires: ["M 196,266 C 300,244 420,262 504,278", "M 606,278 C 668,272 712,262 750,244"],
    steps: [
      { x: 136, y: 52, label: "INSPECT" },
      { x: 555, y: 326, label: "EVIDENCE" },
      { x: 822, y: 410, label: "FILED" },
    ],
    ticks: ["M 640,60 L 640,180", "M 640,360 L 640,470"],
  },

  /* Close-out at the bar. The counter is the object that matters, plus the second staffer
     still on the clock. */
  "clip-restaurant": {
    boxes: [
      { x: 288, y: 322, w: 566, h: 126, label: "BAR · TABS OPEN" },
      { x: 726, y: 142, w: 148, h: 362, label: "STAFF ON" },
    ],
    wires: ["M 380,368 C 470,352 596,340 726,322"],
    steps: [
      { x: 330, y: 468, label: "CLOSE" },
      { x: 570, y: 302, label: "RECONCILE" },
      { x: 800, y: 128, label: "REPORT" },
    ],
    ticks: ["M 452,180 L 452,300"],
  },

  /* The wristband is the hero object here — the whole workflow resolves onto a wrist. */
  "clip-ticketing": {
    boxes: [
      { x: 412, y: 332, w: 156, h: 98, label: "WRISTBAND" },
      { x: 686, y: 2, w: 208, h: 268, label: "GUEST · ON LIST" },
    ],
    wires: ["M 686,180 C 620,236 552,306 568,372", "M 412,382 C 356,404 320,414 318,430"],
    steps: [
      { x: 762, y: 288, label: "CHECK" },
      { x: 490, y: 450, label: "ISSUE" },
      { x: 246, y: 452, label: "COUNTED" },
    ],
    ticks: ["M 610,60 L 610,150"],
  },

  /* At the helm. Horizon runs the width of the frame; the guests are the manifest. */
  "clip-yacht": {
    boxes: [
      { x: 424, y: 376, w: 302, h: 128, label: "HELM" },
      { x: 84, y: 242, w: 302, h: 222, label: "MANIFEST · 3" },
    ],
    wires: ["M 386,330 C 452,320 520,352 574,378", "M 726,428 C 782,412 826,382 856,350"],
    steps: [
      { x: 234, y: 226, label: "BOOKING" },
      { x: 575, y: 356, label: "DISPATCH" },
      { x: 856, y: 332, label: "CONFIRMED" },
    ],
    // the horizon, read as a measured line
    ticks: ["M 0,252 L 384,246", "M 786,232 L 900,230"],
  },
};
