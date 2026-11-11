import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Runs after the client build (dist/) and the SSR build (dist-ssr/). Writes
// one finished HTML file per sitemap URL so Google gets each page's own
// title, description, canonical, H1 and text in the raw HTML instead of the
// same empty <div id="root"> shell for every URL.

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const SITE_URL = "https://www.caboshandyman.com";

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
// The untouched shell stays available for every URL that isn't pre-rendered
// (vercel.json rewrites unknown paths to it), so an unknown path never gets
// the homepage's HTML and canonical.
fs.writeFileSync(path.join(dist, "spa-shell.html"), template);

const { render } = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);

const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
  const url = m[1].trim();
  if (!url.startsWith(SITE_URL)) throw new Error(`Unexpected sitemap URL: ${url}`);
  return url.slice(SITE_URL.length) || "/";
});

// Static fallback tags in index.html that a page's own Helmet tags replace —
// keeps exactly one title / og:title / description etc. per page.
const metaKey = (tag) => tag.match(/\s(?:name|property)="([^"]+)"/)?.[1];

function buildPage(html, helmet) {
  const headTags = [helmet.title, helmet.meta, helmet.link, helmet.script]
    .map((part) => part.toString())
    .join("\n    ");
  const pageMetaKeys = new Set([...headTags.matchAll(/<meta[^>]*>/g)].map((m) => metaKey(m[0])).filter(Boolean));

  let page = template.replace(/<meta[^>]*>/g, (tag) => {
    const key = metaKey(tag);
    return key && pageMetaKeys.has(key) ? "" : tag;
  });
  if (helmet.title.toString().includes("</title>")) {
    page = page.replace(/<title>[\s\S]*?<\/title>/, "");
  }
  const lang = helmet.htmlAttributes.toString().match(/lang="([^"]+)"/)?.[1];
  if (lang) page = page.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);

  page = page.replace("</head>", `    ${headTags}\n  </head>`);
  if (!page.includes('<div id="root"></div>')) throw new Error("Template is missing <div id=\"root\"></div>");
  return page.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

let failures = 0;
for (const route of routes) {
  try {
    const { html, helmet } = await render(route);
    if (!helmet) throw new Error("no Helmet output");
    if (!/<h1[\s>]/.test(html)) console.warn(`⚠️  ${route}: no <h1> in rendered HTML`);
    const out = route === "/" ? path.join(dist, "index.html") : path.join(dist, route.replace(/^\//, ""), "index.html");
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, buildPage(html, helmet));
    console.log(`✅ ${route}`);
  } catch (error) {
    failures += 1;
    console.error(`❌ ${route}:`, error);
  }
}

// vite-plugin-compression already wrote index.html.gz/.br from the shell —
// drop them so no stale pre-compressed copy of the old homepage remains.
for (const ext of [".gz", ".br"]) fs.rmSync(path.join(dist, `index.html${ext}`), { force: true });

if (failures > 0) {
  console.error(`Pre-rendering failed for ${failures} route(s).`);
  process.exit(1);
}
console.log(`Pre-rendered ${routes.length} routes.`);
