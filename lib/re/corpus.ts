import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit, SKIP } from "unist-util-visit";
import type { Root as MdastRoot, Link, Text, Heading } from "mdast";
import type { Root as HastRoot, Element } from "hast";

/**
 * The Reality Engineering corpus lives as versioned Markdown in
 * content/reality-engineering/ — a faithful copy of reality_engineering_canon_v0_1
 * (Genesis repo, 2026-08-07). Per the canon's implementation notes the Markdown IS
 * the source of truth: routes, titles and ordering come from website/content_manifest.json,
 * and pages are generated from it — never hand-copied into components.
 */

const CORPUS_ROOT = path.join(process.cwd(), "content", "reality-engineering");
const BASE_ROUTE = "/reality-engineering";

export type ManifestDoc = {
  path: string;
  type: string;
  title: string;
  route?: string;
  id?: string;
  version?: string;
  date?: string;
  status?: string;
  word_count?: number;
};

export type TocEntry = { id: string; text: string; depth: 2 | 3 };

export type RenderedDoc = {
  meta: ManifestDoc;
  frontmatter: Record<string, unknown>;
  subtitle?: string;
  html: string;
  toc: TocEntry[];
  related: { title: string; route: string }[];
  prev?: { title: string; route: string };
  next?: { title: string; route: string };
};

/**
 * Routes gated OUT of production publication. RE-CASE-001's manifest status is
 * "Publishable with final subject/client approval and public asset link" — until Sam
 * confirms that approval, the case ships on preview deploys only (so he can taste-pass
 * it) and is excluded when RE_PUBLISH_GATED=strict is set for a production build.
 */
const APPROVAL_GATED_ROUTES = new Set([
  `${BASE_ROUTE}/cases/ai-enhanced-promotional-film`,
]);

/** Reader-priority order (publication_map.md route table + reading paths). */
const READING_ORDER: string[] = [
  `${BASE_ROUTE}/start`,
  `${BASE_ROUTE}/from-sam`,
  `${BASE_ROUTE}/foundations`,
  `${BASE_ROUTE}/constitution`,
  `${BASE_ROUTE}/method`,
  `${BASE_ROUTE}/good`,
  `${BASE_ROUTE}/hope`,
  `${BASE_ROUTE}/why-now`,
  `${BASE_ROUTE}/conscious-reality`,
  `${BASE_ROUTE}/ai`,
  `${BASE_ROUTE}/echo-of-god`,
  `${BASE_ROUTE}/applications`,
  `${BASE_ROUTE}/cases`,
  `${BASE_ROUTE}/cases/ai-enhanced-promotional-film`,
  `${BASE_ROUTE}/papers`,
  `${BASE_ROUTE}/papers/on-reality-engineering`,
  `${BASE_ROUTE}/papers/on-the-genesis-moment`,
  `${BASE_ROUTE}/papers/on-the-goodness-constraint`,
  `${BASE_ROUTE}/papers/on-hope`,
  `${BASE_ROUTE}/papers/on-conscious-reality`,
  `${BASE_ROUTE}/papers/on-ai-as-amplifier`,
  `${BASE_ROUTE}/papers/on-ai-filmmaking-as-reality-engineering`,
  `${BASE_ROUTE}/papers/on-the-limits-of-engineering`,
  `${BASE_ROUTE}/papers/on-the-thread-the-needle-moment`,
  `${BASE_ROUTE}/papers/on-the-good-news`,
  `${BASE_ROUTE}/evidence/standard`,
  `${BASE_ROUTE}/evidence/sources`,
  `${BASE_ROUTE}/evidence/claims`,
  `${BASE_ROUTE}/evidence/verification`,
  `${BASE_ROUTE}/evidence/legacy-audit`,
  `${BASE_ROUTE}/evidence/case-standard`,
  `${BASE_ROUTE}/evidence/qa`,
  `${BASE_ROUTE}/glossary`,
  `${BASE_ROUTE}/history`,
  `${BASE_ROUTE}/changelog`,
  `${BASE_ROUTE}/release/v0-1`,
  `${BASE_ROUTE}/faq`,
  `${BASE_ROUTE}/cross-references`,
];

let manifestCache: { corpusVersion: string; corpusDate: string; docs: ManifestDoc[] } | null = null;

export function getManifest() {
  if (manifestCache) return manifestCache;
  const raw = JSON.parse(
    fs.readFileSync(path.join(CORPUS_ROOT, "website", "content_manifest.json"), "utf8"),
  );
  const gate = process.env.RE_PUBLISH_GATED === "strict";
  const docs = (raw.documents as ManifestDoc[])
    .filter((d) => d.route && d.route !== BASE_ROUTE) // landing page is hand-built from landing_page_copy.md
    .filter((d) => fs.existsSync(path.join(CORPUS_ROOT, d.path)))
    .filter((d) => !(gate && APPROVAL_GATED_ROUTES.has(d.route!)));
  docs.sort((a, b) => {
    const ia = READING_ORDER.indexOf(a.route!);
    const ib = READING_ORDER.indexOf(b.route!);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });
  manifestCache = { corpusVersion: raw.version as string, corpusDate: raw.date as string, docs };
  return manifestCache;
}

export function getDocRoutes(): string[] {
  return getManifest().docs.map((d) => d.route!);
}

function docByCorpusPath(p: string): ManifestDoc | undefined {
  const norm = path.posix.normalize(p);
  return getManifest().docs.find((d) => d.path === norm);
}

/** `../canon/02_foundations.md#x` (relative to the doc's own folder) → its route. */
function resolveMdLink(url: string, fromDocPath: string): string | null {
  if (/^[a-z]+:/i.test(url) || url.startsWith("#")) return null;
  const [file, fragment] = url.split("#");
  if (!/\.md$/i.test(file)) return null;
  const fromDir = path.posix.dirname(fromDocPath);
  const target = path.posix.normalize(path.posix.join(fromDir, file));
  const doc = docByCorpusPath(target);
  if (!doc) return null;
  return fragment ? `${doc.route}#${fragment}` : doc.route!;
}

/** remark: drop the duplicate H1 (the template renders the title), rewrite .md links, chip E-IDs. */
function remarkCorpus(docPath: string) {
  return (tree: MdastRoot) => {
    // Drop the first level-1 heading — every corpus doc opens with its own title.
    const first = tree.children.findIndex((n) => n.type === "heading" && (n as Heading).depth === 1);
    if (first !== -1) tree.children.splice(first, 1);

    visit(tree, "link", (node: Link, index, parent) => {
      const route = resolveMdLink(node.url, docPath);
      if (route) {
        node.url = route;
        return;
      }
      // Internal .md link with no published route (implementation files): unwrap to plain text
      // rather than shipping a dead link.
      if (!/^[a-z]+:/i.test(node.url) && /\.md(#|$)/i.test(node.url) && parent && index != null) {
        parent.children.splice(index, 1, ...node.children);
        return [SKIP, index];
      }
    });

    // Evidence tokens like [E-006] become quiet chips linking to the source register.
    visit(tree, "text", (node: Text, index, parent) => {
      if (!parent || index == null || parent.type === "link") return;
      const parts = node.value.split(/(\[E-\d{3}\])/g);
      if (parts.length < 2) return;
      const replacement = parts
        .filter((p) => p !== "")
        .map((p) => {
          const m = p.match(/^\[(E-\d{3})\]$/);
          if (!m) return { type: "text", value: p } as Text;
          return {
            type: "link",
            url: `${BASE_ROUTE}/evidence/sources`,
            data: { hProperties: { className: ["re-echip"] } },
            children: [{ type: "text", value: m[1] }],
          } as unknown as Link;
        });
      parent.children.splice(index, 1, ...replacement);
      return [SKIP, index + replacement.length];
    });
  };
}

function hastText(node: Element): string {
  let out = "";
  visit(node, "text", (t: { value: string }) => {
    out += t.value;
  });
  return out;
}

/** rehype: collect the TOC after IDs exist; wrap tables for horizontal scroll containment. */
function rehypeCorpus(toc: TocEntry[]) {
  return (tree: HastRoot) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName === "h2" || node.tagName === "h3") {
        const id = String(node.properties?.id ?? "");
        if (id) toc.push({ id, text: hastText(node), depth: node.tagName === "h2" ? 2 : 3 });
      }
      if (node.tagName === "table" && parent && index != null) {
        const already = (parent as Element).properties?.className;
        if (String(already ?? "").includes("re-tablewrap")) return;
        parent.children[index] = {
          type: "element",
          tagName: "div",
          // The wrapper scrolls horizontally on small viewports, so keyboard users need to
          // be able to focus it (WCAG 2.1.1 scrollable-region-focusable).
          properties: {
            className: ["re-tablewrap"],
            tabIndex: 0,
            role: "region",
            ariaLabel: "Scrollable table",
          },
          children: [node],
        };
        return SKIP;
      }
    });
  };
}

function relatedFromFrontmatter(fm: Record<string, unknown>): { title: string; route: string }[] {
  const rel = fm.related;
  if (!Array.isArray(rel)) return [];
  const { docs } = getManifest();
  const out: { title: string; route: string }[] = [];
  for (const entry of rel) {
    const idMatch = String(entry).match(/^(RE-[A-Z]+\d*[-\d]*)/);
    if (!idMatch) continue;
    const doc = docs.find((d) => d.id === idMatch[1]);
    if (doc) out.push({ title: doc.title, route: doc.route! });
  }
  return out;
}

const renderCache = new Map<string, RenderedDoc>();

export async function getDocByRoute(route: string): Promise<RenderedDoc | null> {
  if (renderCache.has(route)) return renderCache.get(route)!;
  const { docs } = getManifest();
  const idx = docs.findIndex((d) => d.route === route);
  if (idx === -1) return null;
  const meta = docs[idx];

  const raw = fs.readFileSync(path.join(CORPUS_ROOT, meta.path), "utf8");
  const { content, data: frontmatter } = matter(raw);

  const toc: TocEntry[] = [];
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkCorpus, meta.path)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeCorpus, toc)
    .use(rehypeStringify)
    .process(content);

  const rendered: RenderedDoc = {
    meta,
    frontmatter: frontmatter as Record<string, unknown>,
    subtitle: typeof frontmatter.subtitle === "string" ? frontmatter.subtitle : undefined,
    html: String(file),
    toc: toc.filter((t) => t.depth === 2),
    related: relatedFromFrontmatter(frontmatter as Record<string, unknown>),
    prev: idx > 0 ? { title: docs[idx - 1].title, route: docs[idx - 1].route! } : undefined,
    next:
      idx < docs.length - 1
        ? { title: docs[idx + 1].title, route: docs[idx + 1].route! }
        : undefined,
  };
  renderCache.set(route, rendered);
  return rendered;
}
