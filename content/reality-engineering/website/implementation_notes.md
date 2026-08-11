---
title: "Reality Engineering Website Implementation Notes"
version: "0.1"
date: "2026-08-07"
audience: "Claude Code / web implementation team"
---

# Website Implementation Notes

## Content source

Treat the Markdown files in this corpus as the source of truth.

Do not copy content into disconnected page components unless the build system generates those components from the Markdown. The corpus should remain portable and version-controlled.

## Recommended stack pattern

A static or hybrid-rendered content site works well.

For a Next.js implementation:

- use App Router;
- load Markdown or MDX from the corpus directory;
- parse YAML frontmatter;
- generate routes and navigation from `website/content_manifest.json`;
- use remark/rehype or an equivalent safe Markdown pipeline;
- sanitize any raw HTML;
- generate heading IDs deterministically;
- pre-render core pages;
- add client-side behavior only where it creates real value.

The content architecture is not dependent on Next.js. Preserve plain Markdown compatibility.

## Required frontmatter fields

Canonical documents:

- `canon_id`
- `title`
- `subtitle`
- `author`
- `version`
- `date`
- `status`
- `related`

Federalist Papers:

- `paper_id`
- `title`
- `series`
- `author`
- `version`
- `date`
- `constitutional_references`
- `canonical_references`
- optional `case_references`

Cases:

- `case_id`
- `title`
- `case_class`
- `evidence_maturity`
- `version`
- `date`
- `status`

## Generated features

Build these from content metadata rather than maintaining them manually in multiple places:

- table of contents;
- previous and next navigation;
- related readings;
- ID badges;
- version badges;
- evidence reference cards;
- case maturity badge;
- reading paths;
- corpus search;
- sitemap;
- RSS or updates feed;
- and a downloadable archive link.

## Evidence references

The corpus uses IDs such as `[E-006]` in prose and links to entries in the source register.

Recommended rendering:

1. detect `E-###` tokens;
2. resolve them against the source register or a generated evidence JSON index;
3. render a small evidence chip;
4. show source title, class, supported use, and caveat in a popover or side panel;
5. preserve a normal link for accessibility and no-JavaScript use.

Do not show a citation count as a quality score.

## Claim-status callouts

Support these labels:

- Founder belief
- Theological interpretation
- Observation
- Illustration
- Hypothesis
- Research-supported claim
- Case evidence
- Open question

Use calm visual treatment. The purpose is epistemic clarity, not warning fatigue.

## Internal references

The desired reference graph is:

`Constitution ↔ Canon ↔ Federalist Paper ↔ Evidence ↔ Case ↔ Glossary`

Each page should expose backlinks where practical.

Example:

- the Hope page links to the Snyder evidence entry;
- the evidence entry links back to every canonical use;
- the AI Filmmaking paper links to RE-CASE-001;
- the case links to the Method, Goodness Constraint, and Applications pages.

## Search

Search should weight:

1. exact ID matches;
2. title matches;
3. glossary definitions;
4. headings;
5. body content;
6. source and caveat metadata.

Allow filters for:

- Canon
- Federalist Paper
- Evidence
- Case
- Theology
- Method
- Open question

## Diagrams

Create accessible diagrams for:

1. Current Reality → Engineered Bridge → Desired Reality
2. Explore → Engage → Evolve
3. nested method layers
4. Goodness Review
5. conscious-reality layers
6. AI amplification: intention + system → multiplied capability and consequence
7. corpus cross-reference graph
8. Echo of God symbolic loop, with the theological guardrail displayed in accompanying text

Every diagram needs a textual equivalent.

Avoid making animation necessary for comprehension. Optional motion can show the current and desired star/compass relationship where consistent with the Nexark visual identity.

## Downloadable outputs

Provide:

- full Canon Markdown;
- full website corpus Markdown;
- ZIP archive;
- print-friendly page views;
- and optionally a generated PDF in a later release.

The download page should state version and date.

## Corrections workflow

Every page should include “Report a factual or interpretive issue.”

Collect:

- page ID;
- heading or quoted text;
- issue type;
- proposed source or correction;
- submitter contact, optional;
- consent to publish the correction discussion, optional.

Material corrections should update:

- the source file;
- Claims Ledger;
- Source Register when relevant;
- Changelog;
- page version or revision date.

## Analytics

Use privacy-respecting analytics where possible.

Track content usefulness rather than attention extraction:

- document completion;
- internal-reference use;
- case and evidence engagement;
- downloads;
- method-template use;
- correction submissions;
- and optional qualitative feedback.

Do not add compulsive infinite scroll, fake urgency, or engagement loops that contradict the Goodness Constraint.

## Security and trust

- sanitize Markdown and MDX;
- do not execute arbitrary embedded components;
- pin and audit content dependencies;
- display external-domain destinations before navigation where appropriate;
- preserve source URLs and access dates;
- ensure generated downloads are built from the versioned source;
- add content hashes to release archives;
- and keep unpublished case assets and permissions outside the public repository.

## Theological presentation

The Echo of God page should show a visible label:

> Founder theological hypothesis

It should also show this guardrail near the beginning:

> This paper does not claim that AI is divine, equivalent to the Holy Spirit, or conscious by theological declaration.

Do not dilute the theological language inside the paper. Do not present it as a scientific result or prerequisite for the public method.

## Voice and editorial rules

- Preserve first-person voice in Federalist Papers.
- Preserve institutional voice in canonical specifications.
- Avoid generic AI marketing language.
- Do not invent metrics or case outcomes.
- Keep qualifications near the claims they qualify.
- Do not turn “Reality Engineering” into a label applied to every Nexark deliverable automatically.
- Do not use spiritual metaphors as decorative branding outside the contexts where they are explained.
- Preserve the governing question exactly: **Can we call what we created good?**

## Release QA

Before publishing:

1. validate all relative links;
2. validate all IDs are unique;
3. validate every `E-###` exists;
4. validate every case reference exists;
5. confirm no draft-only claims are surfaced as proof;
6. confirm source access dates and current-data claims;
7. confirm no private names, footage, or client details are published without permission;
8. confirm theological claims are labeled;
9. run accessibility tests;
10. compare the generated ZIP hash with the release manifest.
