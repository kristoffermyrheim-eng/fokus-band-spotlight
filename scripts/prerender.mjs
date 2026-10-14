/**
 * Prerenders a static HTML shell for every app route, so deep links work for
 * crawlers as well as browsers.
 *
 * Without this, GitHub Pages answers /nyheter/<slug> with 404.html — a browser
 * recovers via the SPA redirect, but Facebook, LinkedIn and friends see a 404
 * and never read the og:-tags that react-helmet-async writes client-side. That
 * means no link preview when an article is shared.
 *
 * Each page here is dist/index.html with the head tags rewritten for that
 * route, written to <route>/index.html so Pages serves it with a 200. The app
 * still renders the page itself on the client; only the head is prebuilt.
 *
 * News metadata comes from src/data/news.ts (the single source of truth) via
 * Vite's SSR module loader, and image URLs are resolved through the build
 * manifest so they point at the hashed, deployed filenames.
 *
 * Runs as part of `npm run build`.
 */

import { createServer } from "vite";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const SITE_URL = (process.env.SITE_URL || "https://www.storbandetfokus.no").replace(/\/+$/, "");

const SITE_TITLE =
  "Storbandet Fokus – Jazz- og storband i Re, Tønsberg, Vestfold | Konserter og booking";
const SITE_DESCRIPTION =
  "Storbandet Fokus er et jazz- og storband i Re, Tønsberg, Vestfold. Vi spiller konserter og kan bookes til arrangementer, events og kulturkvelder.";
const DEFAULT_IMAGE = "/FokusLogo.png";

/** Routes without their own metadata — they get the site defaults plus their own URL. */
const STATIC_ROUTES = [
  { route: "/var-historie" },
  { route: "/medlemmer" },
  { route: "/medlemsside" },
  { route: "/videoer" },
  {
    route: "/nyheter",
    title: "Nyheter – Storbandet Fokus",
    description:
      "Siste nytt fra Storbandet Fokus – konserter, arrangementer og nyheter.",
  },
];

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** "14.10.2026" → "2026-10-14" for article:published_time. */
const toIsoDate = (date) => {
  const [day, month, year] = String(date).split(".");
  if (!day || !month || !year) return undefined;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const absoluteUrl = (urlPath) =>
  urlPath.startsWith("http") ? urlPath : `${SITE_URL}${urlPath.startsWith("/") ? "" : "/"}${urlPath}`;

/** Load the news data through Vite so TypeScript and image imports both resolve. */
async function loadArticles() {
  const server = await createServer({
    configFile: false,
    root: ROOT,
    logLevel: "error",
    appType: "custom",
    server: { middlewareMode: true, hmr: false },
    resolve: { alias: { "@": path.join(ROOT, "src") } },
  });

  try {
    const { getNewsArticles } = await server.ssrLoadModule("/src/data/news.ts");
    return getNewsArticles();
  } finally {
    await server.close();
  }
}

/**
 * In SSR, an imported image resolves to its source path ("/src/assets/x.jpg").
 * The manifest maps that to the built filename ("assets/x-X7f2k1.jpg").
 */
async function loadAssetResolver() {
  let manifest = {};
  try {
    manifest = JSON.parse(await readFile(path.join(DIST, ".vite", "manifest.json"), "utf8"));
  } catch {
    throw new Error(
      "dist/.vite/manifest.json not found — run `vite build` (with build.manifest enabled) first."
    );
  }

  return (sourcePath) => {
    if (!sourcePath) return undefined;
    const entry = manifest[sourcePath.replace(/^\//, "")];
    return entry?.file ? `/${entry.file}` : sourcePath;
  };
}

/** Drop the tags we are about to replace, so no page ends up with two of each. */
function stripHeadTags(html) {
  return html
    .replace(/[^\S\n]*<title>[\s\S]*?<\/title>\n?/i, "")
    .replace(/[^\S\n]*<meta\s+name="description"[^>]*>\n?/i, "")
    .replace(/[^\S\n]*<link\s+rel="canonical"[^>]*>\n?/i, "")
    .replace(/[^\S\n]*<meta\s+property="og:(?:title|description|type|image|url)"[^>]*>\n?/gi, "")
    .replace(/[^\S\n]*<meta\s+name="twitter:(?:card|title|description|image)"[^>]*>\n?/gi, "");
}

function renderHead({ title, socialTitle, description, url, image, type = "website", publishedAt }) {
  const imageUrl = absoluteUrl(image || DEFAULT_IMAGE);
  // Keep the social title identical to the one react-helmet-async sets on the
  // client, so JS-executing crawlers don't see two different headlines.
  const shareTitle = socialTitle || title;
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${escapeHtml(shareTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${imageUrl}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(shareTitle)}" />`,
    `<meta property="og:locale" content="nb_NO" />`,
    publishedAt && `<meta property="article:published_time" content="${publishedAt}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(shareTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${imageUrl}" />`,
  ].filter(Boolean);

  return tags.map((tag) => `    ${tag}`).join("\n");
}

async function writePage(route, html) {
  const dir = path.join(DIST, route.replace(/^\//, ""));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), html, "utf8");
  console.log(`  ${route}`);
}

async function main() {
  const shellPath = path.join(DIST, "index.html");
  const shell = stripHeadTags(await readFile(shellPath, "utf8"));

  if (!shell.includes("</head>")) {
    throw new Error("dist/index.html has no </head> — cannot inject metadata.");
  }

  const render = (meta) => shell.replace("</head>", `${renderHead(meta)}\n  </head>`);

  const [articles, resolveAsset] = await Promise.all([loadArticles(), loadAssetResolver()]);

  console.log("Prerendering routes:");

  for (const { route, title, description } of STATIC_ROUTES) {
    await writePage(
      route,
      render({
        title: title || SITE_TITLE,
        description: description || SITE_DESCRIPTION,
        url: `${SITE_URL}${route}`,
      })
    );
  }

  for (const article of articles) {
    const route = `/nyheter/${article.slug}`;
    await writePage(
      route,
      render({
        title: `${article.title} – Storbandet Fokus`,
        socialTitle: article.title,
        description: article.excerpt,
        url: `${SITE_URL}${route}`,
        image: resolveAsset(article.ogImageUrl || article.coverImageUrl),
        type: "article",
        publishedAt: toIsoDate(article.date),
      })
    );
  }

  console.log(`Done — ${STATIC_ROUTES.length + articles.length} page(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
