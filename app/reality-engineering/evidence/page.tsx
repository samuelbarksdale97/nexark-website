import type { Metadata } from "next";
import Link from "next/link";
import { RefreshShell } from "@/components/refresh/RefreshShell";
import { getManifest } from "@/lib/re/corpus";
import { RE_SEO, RE_SITE } from "@/lib/re/seo";

export const metadata: Metadata = {
  title: `${RE_SEO["/reality-engineering/evidence"].title} | ${RE_SITE.title}`,
  description: RE_SEO["/reality-engineering/evidence"].description,
};

/**
 * The Evidence Center hub (publication_map.md): sources, claims, cases, corrections,
 * open research. The descriptions below are navigational UI copy; every substantive
 * claim lives in the corpus documents themselves.
 */
const SHELVES: { route: string; title: string; what: string }[] = [
  {
    route: "/reality-engineering/evidence/standard",
    title: "The Evidence Standard",
    what: "How the corpus separates foundational belief, founder observation, hypothesis, case evidence, and research-supported claims.",
  },
  {
    route: "/reality-engineering/evidence/sources",
    title: "Source Register",
    what: "Every external source behind the corpus — what it supports, and its caveats.",
  },
  {
    route: "/reality-engineering/evidence/claims",
    title: "Claims Ledger",
    what: "The canonical claims, each classified and tied to its support.",
  },
  {
    route: "/reality-engineering/evidence/verification",
    title: "Fact-Verification Report",
    what: "The verification pass completed for the v0.1 public-draft claims.",
  },
  {
    route: "/reality-engineering/evidence/legacy-audit",
    title: "Legacy Draft Audit",
    what: "What survived from earlier Reality Engineering drafts, what was removed, and why.",
  },
  {
    route: "/reality-engineering/evidence/case-standard",
    title: "Case Study Standard",
    what: "The template every published case must satisfy, including its Goodness Review.",
  },
  {
    route: "/reality-engineering/cases",
    title: "Casebook",
    what: "What has actually been demonstrated, labeled by evidence maturity.",
  },
];

export default function EvidenceCenter() {
  const { corpusVersion, corpusDate } = getManifest();
  return (
    <RefreshShell active="re">
      <main className="re re-doc" data-nav="light">
        <div className="wrap">
          <nav className="re-crumb" aria-label="Breadcrumb">
            <Link href="/reality-engineering">Reality Engineering</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Evidence Center</span>
          </nav>

          <div className="re-dochead">
            <p className="re-meta">
              <span>v{corpusVersion}</span>
              <span>{corpusDate}</span>
            </p>
            <h1>Evidence Center</h1>
            <p className="re-subtitle">
              A discipline that asks to be believed should show its work. Inspect the sources,
              claims, verification, and cases behind the corpus.
            </p>
          </div>

          <ul className="re-shelves">
            {SHELVES.map((s) => (
              <li key={s.route}>
                <Link href={s.route} className="re-shelf">
                  <b>{s.title}</b>
                  <span>{s.what}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </RefreshShell>
  );
}
