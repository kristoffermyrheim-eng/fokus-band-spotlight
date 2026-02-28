/**
 * Generates static HTML pages for each news article.
 * Reads from scripts/news-articles.json and writes to public/news/{slug}.html
 *
 * Run: node scripts/generate-news-html.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DATA_PATH = join(__dirname, "news-articles.json");
const OUT_DIR = join(ROOT, "public", "news");

const SITE_URL = "https://www.storbandetfokus.no";

function formatDate(dateStr) {
  let normalized = dateStr;
  if (dateStr.includes(".")) {
    const parts = dateStr.split(".");
    if (parts.length === 3) {
      normalized = `${parts[2]}-${parts[0]}-${parts[1]}`;
    }
  }
  const d = new Date(normalized);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildArticleHtml(article, allSlugs, baseUrl) {
  const { title, slug, date, excerpt, content, coverImageUrl, ogImageUrl } = article;
  const imageUrl = coverImageUrl || ogImageUrl || "";
  const articleUrl = `${baseUrl}/news/${slug}.html`;
  const formattedDate = formatDate(date);

  const prevSlug = allSlugs[allSlugs.indexOf(slug) + 1] ?? null;
  const nextSlug = allSlugs[allSlugs.indexOf(slug) - 1] ?? null;

  return `<!DOCTYPE html>
<html lang="nb">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/png" href="/FokusLogo.png" />
  <title>${escapeHtml(title)} – Storbandet Fokus</title>
  <meta name="description" content="${escapeHtml(excerpt)}" />
  <meta property="og:title" content="${escapeHtml(title)} – Storbandet Fokus" />
  <meta property="og:description" content="${escapeHtml(excerpt)}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${articleUrl}" />
${imageUrl ? `  <meta property="og:image" content="${baseUrl}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}" />` : ""}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)} – Storbandet Fokus" />
  <meta name="twitter:description" content="${escapeHtml(excerpt)}" />
  <link rel="canonical" href="${articleUrl}" />
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #1a1a1a; background: #fafafa; margin: 0; padding: 2rem 1rem; }
    .container { max-width: 42rem; margin: 0 auto; }
    a { color: #2563eb; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .back { display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; color: #64748b; }
    .back:hover { color: #2563eb; }
    article { background: #fff; border-radius: 0.75rem; border: 1px solid #e2e8f0; padding: 1.5rem 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
    .meta { display: flex; align-items: center; gap: 0.5rem; color: #64748b; font-size: 0.875rem; margin-bottom: 1.5rem; }
    h1 { font-size: 1.875rem; line-height: 1.25; margin: 0 0 2rem; font-weight: 700; }
    .cover { margin-bottom: 2.5rem; border-radius: 0.5rem; overflow: hidden; }
    .cover img { width: 100%; max-height: 400px; object-fit: cover; display: block; }
    .content p { color: #475569; margin-bottom: 1.5rem; }
    .content h3 { font-size: 1.5rem; margin-top: 2.5rem; margin-bottom: 1rem; font-weight: 600; }
    .content blockquote { border-left: 4px solid #2563eb; padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: #475569; }
    .content ul { color: #475569; margin-bottom: 1.5rem; padding-left: 1.5rem; }
    .content li { margin-bottom: 0.5rem; }
    .nav { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e2e8f0; }
    .nav span { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 600; }
    .nav a { color: inherit; }
    .nav a:hover { color: #2563eb; }
    .nav-next { text-align: right; }
  </style>
</head>
<body>
  <div class="container">
    <a href="/" class="back">← Tilbake til forsiden</a>
    <a href="/nyheter" class="back" style="margin-left: 1rem;">Alle nyheter</a>

    <article>
      <div class="meta">📅 ${escapeHtml(formattedDate)}</div>
      <h1>${escapeHtml(title)}</h1>
${imageUrl ? `      <div class="cover"><img src="${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}" alt="${escapeHtml(title)}" loading="lazy" /></div>` : ""}
      <div class="content">
${content}
      </div>

      <div class="nav">
        ${prevSlug ? `<a href="/news/${prevSlug}.html"><span>Forrige</span><br />← Forrige sak</a>` : "<div></div>"}
        ${nextSlug ? `<a href="/news/${nextSlug}.html" class="nav-next"><span>Neste</span><br />Neste sak →</a>` : ""}
      </div>
    </article>
  </div>
</body>
</html>
`;
}

function main() {
  const raw = readFileSync(DATA_PATH, "utf-8");
  const articles = JSON.parse(raw);

  if (!Array.isArray(articles) || articles.length === 0) {
    console.log("No articles in news-articles.json.");
    process.exit(0);
    return;
  }

  if (!existsSync(OUT_DIR)) {
    mkdirSync(OUT_DIR, { recursive: true });
    console.log("Created public/news/");
  }

  const baseUrl = process.env.SITE_URL || SITE_URL;
  const slugs = articles.map((a) => a.slug);

  for (const article of articles) {
    const html = buildArticleHtml(article, slugs, baseUrl);
    const outPath = join(OUT_DIR, `${article.slug}.html`);
    writeFileSync(outPath, html, "utf-8");
    console.log("Wrote public/news/" + article.slug + ".html");
  }

  console.log("Done. Generated " + articles.length + " page(s).");
}

main();
