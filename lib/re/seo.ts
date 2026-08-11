/**
 * Per-route SEO metadata, verbatim from the corpus's website/seo_metadata.md (v0.1).
 * The corpus rule applies here: keep titles accurate; do not optimize by making claims
 * the corpus does not support.
 */

export const RE_SITE = {
  title: "Reality Engineering by Nexark",
  description:
    "Reality Engineering is a human-centered discipline for moving from a current reality to a worthy desired reality by changing the systems that shape what people and organizations can experience and create.",
};

export const RE_SEO: Record<string, { title: string; description: string }> = {
  "/reality-engineering": {
    title: "Reality Engineering: The Discipline of Deliberate State Transformation",
    description:
      "Learn how Reality Engineering moves people and organizations from current reality to desired reality through systems, human agency, AI, feedback, and stewardship.",
  },
  "/reality-engineering/from-sam": {
    title: "Why I Started Calling It Reality Engineering",
    description:
      "A personal note from Sam Barksdale on the work, the AI-enhanced film, hope, the Goodness Constraint, and the spiritual root of the discipline.",
  },
  "/reality-engineering/foundations": {
    title: "Foundations of Reality Engineering",
    description:
      "The canonical definition, state-transition model, scope, boundaries, adjacent fields, and core propositions of Reality Engineering.",
  },
  "/reality-engineering/constitution": {
    title: "The Constitution of Reality Engineering",
    description:
      "The commitments that govern Reality Engineering: truth, human agency, dignity, stewardship, evidence, constraints, and the Goodness Constraint.",
  },
  "/reality-engineering/method": {
    title: "Explore, Engage, Evolve: The Reality Engineering Method",
    description:
      "A complete method for understanding a reality, building the smallest useful intervention, and evolving the system through contact and evidence.",
  },
  "/reality-engineering/good": {
    title: "The Goodness Constraint",
    description:
      "A technically successful system can still be harmful. Learn how Reality Engineering decides what should be built and maintained.",
  },
  "/reality-engineering/hope": {
    title: "Hope as a Practice",
    description:
      "Hope is the disciplined willingness to build pathways toward a future good that is not guaranteed. Read the Reality Engineering definition and method.",
  },
  "/reality-engineering/why-now": {
    title: "Why Reality Engineering, Why Now",
    description:
      "AI is shortening the distance between intention and consequence. Explore why this moment requires deliberate, human-centered systems and stewardship.",
  },
  "/reality-engineering/conscious-reality": {
    title: "Conscious Reality and the Meaning of Success",
    description:
      "Learn how systems shape what people and organizations can perceive, remember, attempt, coordinate, and improve—without confusing thought with total control.",
  },
  "/reality-engineering/ai": {
    title: "AI as Amplifier: Cost, Benefit, and Responsibility",
    description:
      "AI can expand capability and amplify error, power, dependency, and material cost. Learn the Reality Engineering standard for responsible use.",
  },
  "/reality-engineering/echo-of-god": {
    title: "The Echo of God: A Theological Companion to Reality Engineering",
    description:
      "Sam Barksdale’s theological hypothesis on humanity as image-bearers, AI as a second-order reflection, and the sacred responsibility of technological creation.",
  },
  "/reality-engineering/applications": {
    title: "Applications and Casebook",
    description:
      "Explore personal, organizational, media, economic, and community Reality Engineering—and see what the evidence currently supports.",
  },
  "/reality-engineering/evidence": {
    title: "Reality Engineering Evidence Center",
    description:
      "Inspect the sources, claim classes, case maturity, corrections, and open research questions behind the Reality Engineering corpus.",
  },
  "/reality-engineering/papers": {
    title: "The Federalist Papers of Reality Engineering",
    description:
      "Essays that interpret, defend, challenge, and extend the Reality Engineering canon one question at a time.",
  },
  "/reality-engineering/glossary": {
    title: "Reality Engineering Glossary",
    description:
      "Definitions for current reality, desired reality, conscious reality, Human Boundary, Reality Delta, Goodness Constraint, and other core terms.",
  },
  "/reality-engineering/history": {
    title: "Development and Provenance of Reality Engineering",
    description:
      "A transparent record of how Sam Barksdale and Nexark developed and formalized this human-centered discipline, including earlier unrelated phrase use.",
  },
  "/reality-engineering/faq": {
    title: "Reality Engineering FAQ",
    description:
      "Answers about AI, manifestation, theology, conscious reality, systemic barriers, evidence, ethics, authorship, and Nexark’s role.",
  },
};
