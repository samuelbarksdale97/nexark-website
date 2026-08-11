import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RefreshShell } from "@/components/refresh/RefreshShell";
import { getDocByRoute, getDocRoutes, getManifest } from "@/lib/re/corpus";
import { RE_SEO, RE_SITE } from "@/lib/re/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDocRoutes().map((route) => ({
    slug: route.replace(/^\/reality-engineering\//, "").split("/"),
  }));
}

type Props = { params: Promise<{ slug: string[] }> };

async function routeFromParams(props: Props) {
  const { slug } = await props.params;
  return `/reality-engineering/${slug.join("/")}`;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const route = await routeFromParams(props);
  const doc = await getDocByRoute(route);
  if (!doc) return {};
  const seo = RE_SEO[route];
  return {
    title: `${seo?.title ?? doc.meta.title} | ${RE_SITE.title}`,
    description: seo?.description ?? RE_SITE.description,
  };
}

export default async function CanonPage(props: Props) {
  const route = await routeFromParams(props);
  const doc = await getDocByRoute(route);
  if (!doc) notFound();
  const { corpusVersion, corpusDate } = getManifest();
  const { meta, subtitle, html, toc, related, prev, next } = doc;

  const theological = meta.status === "Founder theological hypothesis";
  const issueMail = `mailto:sbarksdale@nexark.ai?subject=${encodeURIComponent(
    `Correction — ${meta.id ?? meta.title} (Reality Engineering ${corpusVersion})`,
  )}`;

  return (
    <RefreshShell active="re">
      <main className="re re-doc" data-nav="light">
        <div className="wrap">
          <nav className="re-crumb" aria-label="Breadcrumb">
            <Link href="/reality-engineering">Reality Engineering</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{meta.title}</span>
          </nav>

          {/* div, not <header>/<footer>: refresh.css styles bare `.nx header` (fixed nav)
              and `.nx footer` (site footer), so semantic tags here inherit chrome styles */}
          <div className="re-dochead">
            <p className="re-meta">
              {meta.id && <span className="re-id">{meta.id}</span>}
              <span>v{meta.version ?? corpusVersion}</span>
              <span>{meta.date ?? corpusDate}</span>
              {meta.status && (
                <span className={theological ? "re-status re-status-theo" : "re-status"}>
                  {meta.status}
                </span>
              )}
            </p>
            <h1>{meta.title}</h1>
            {subtitle && <p className="re-subtitle">{subtitle}</p>}
          </div>

          <div className="re-docgrid">
            {toc.length > 1 && (
              <aside className="re-toc">
                <details className="re-toc-inner" open>
                  <summary>On this page</summary>
                  <ol>
                    {toc.map((t) => (
                      <li key={t.id}>
                        <a href={`#${t.id}`}>{t.text}</a>
                      </li>
                    ))}
                  </ol>
                </details>
              </aside>
            )}

            <div className="re-body">
              <article className="re-prose" dangerouslySetInnerHTML={{ __html: html }} />

              {related.length > 0 && (
                <section className="re-related" aria-label="Related canonical documents">
                  <h2>Related in the canon</h2>
                  <ul>
                    {related.map((r) => (
                      <li key={r.route}>
                        <Link href={r.route}>{r.title}</Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <div className="re-docfoot">
                <p className="re-correct">
                  Part of <Link href="/reality-engineering">The Reality Engineering Canon</Link> v
                  {corpusVersion} · <a href={issueMail}>Report a factual or interpretive issue</a>
                </p>
                <nav className="re-pn" aria-label="Corpus navigation">
                  {prev ? (
                    <Link className="re-pn-a" href={prev.route}>
                      <span>← Previous</span>
                      <b>{prev.title}</b>
                    </Link>
                  ) : (
                    <span />
                  )}
                  {next ? (
                    <Link className="re-pn-a re-pn-next" href={next.route}>
                      <span>Next →</span>
                      <b>{next.title}</b>
                    </Link>
                  ) : (
                    <span />
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </RefreshShell>
  );
}
