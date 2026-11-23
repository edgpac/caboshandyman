import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://www.caboshandyman.com';
const OUTPUT_PATH = path.join(__dirname, 'public', 'sitemap.xml');

// Pages marked noindex (TV mounting, water leak detector, and blog posts
// with "noindex": true) and flooring are deliberately left out — a sitemap
// should only list URLs we want indexed.
const staticPages = [
  // Core
  { url: '/', changefreq: 'weekly', priority: '1.0' },
  { url: '/services', changefreq: 'monthly', priority: '0.9' },
  { url: '/contact', changefreq: 'monthly', priority: '0.9' },
  { url: '/about', changefreq: 'monthly', priority: '0.8' },
  { url: '/faq', changefreq: 'monthly', priority: '0.8' },
  { url: '/blog', changefreq: 'weekly', priority: '0.8' },
  { url: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { url: '/terms', changefreq: 'yearly', priority: '0.3' },

  // Property services - highest priority
  { url: '/property-care-plans', changefreq: 'monthly', priority: '0.95' },
  { url: '/property-setup-cabo', changefreq: 'monthly', priority: '0.90' },
  { url: '/vacation-rental-setup-cabo', changefreq: 'monthly', priority: '0.90' },

  // Main service category pages
  { url: '/plumber-cabo-san-lucas', changefreq: 'monthly', priority: '0.90' },
  { url: '/handyman-cabo-san-lucas', changefreq: 'monthly', priority: '0.90' },
  { url: '/electrical-services-cabo', changefreq: 'monthly', priority: '0.88' },
  { url: '/kitchen-services-cabo', changefreq: 'monthly', priority: '0.88' },
  { url: '/bathroom-services-cabo', changefreq: 'monthly', priority: '0.88' },

  // Plumbing sub-pages
  { url: '/toilet-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/toilet-leak-repair-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/toilet-tub-unclogging-cabo', changefreq: 'monthly', priority: '0.82' },
  { url: '/faucet-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/sink-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/bathroom-sink-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/water-heater-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/garbage-disposal-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },

  // Electrical sub-pages
  { url: '/ceiling-fan-installation-cabo', changefreq: 'monthly', priority: '0.82' },
  { url: '/ceiling-light-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/outlet-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/generator-hookup-cabo-san-lucas', changefreq: 'monthly', priority: '0.80' },
  { url: '/ac-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },

  // Kitchen sub-pages
  { url: '/countertop-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/backsplash-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/tile-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },

  // Bathroom sub-pages
  { url: '/shower-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },

  // Handyman sub-pages
  { url: '/furniture-assembly-cabo', changefreq: 'monthly', priority: '0.82' },
  { url: '/painting-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/door-lock-replacement-cabo-san-lucas', changefreq: 'monthly', priority: '0.80' },
  { url: '/window-repair-cabo-san-lucas', changefreq: 'monthly', priority: '0.80' },
];

function getBlogPosts() {
  try {
    const blogPostsFile = path.join(__dirname, 'src', 'blog-posts.json');
    if (fs.existsSync(blogPostsFile)) {
      const data = fs.readFileSync(blogPostsFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn('No blog-posts.json found, using static pages only');
  }
  return [];
}

// Shared layout pieces change every page at once; counting them would put
// the same date on every URL again, so only a page's own files count.
const SHARED_COMPONENTS = new Set(['Navigation', 'Footer', 'SEO', 'RelatedServices', 'GradientText']);

function git(args) {
  return execFileSync('git', args, { cwd: __dirname, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
}

function hasFullGitHistory() {
  try {
    return git(['rev-parse', '--is-shallow-repository']) === 'false';
  } catch {
    return false;
  }
}

function resolveSource(fromFile, spec) {
  const base = spec.startsWith('@/') ? path.join(__dirname, 'src', spec.slice(2)) : path.resolve(path.dirname(fromFile), spec);
  return ['.tsx', '.ts', '.jsx', '.js'].map(ext => base + ext).find(f => fs.existsSync(f)) ?? null;
}

// Route -> its page file plus the page's own local imports (one level),
// read from App.tsx so the map never drifts from the real routes.
function routeSourceFiles() {
  const appFile = path.join(__dirname, 'src', 'App.tsx');
  const app = fs.readFileSync(appFile, 'utf8');
  const components = Object.fromEntries(
    [...app.matchAll(/const (\w+) = lazy\(\(\) => import\("([^"]+)"\)\)/g)].map(m => [m[1], resolveSource(appFile, m[2])]),
  );
  const routes = {};
  for (const m of app.matchAll(/<Route path="([^"]+)" element={<(\w+) \/>}/g)) {
    const pageFile = components[m[2]];
    if (!pageFile) continue;
    const imports = [...fs.readFileSync(pageFile, 'utf8').matchAll(/from ['"]((?:\.{1,2}|@)\/[^'"]+)['"]/g)]
      .map(i => i[1])
      .filter(spec => !SHARED_COMPONENTS.has(path.basename(spec)))
      .map(spec => resolveSource(pageFile, spec))
      .filter(Boolean);
    routes[m[1]] = [pageFile, ...imports];
  }
  return routes;
}

// Last commit date touching a page's own files. Without full git history (a
// shallow CI clone) the date would be wrong, so lastmod is left out instead:
// Google ignores lastmod it can't trust, and a missing one is neutral.
function lastModifiedByRoute() {
  if (!hasFullGitHistory()) {
    console.warn('⚠️  Shallow or missing git history — sitemap lastmod omitted for static pages');
    return {};
  }
  const result = {};
  for (const [route, files] of Object.entries(routeSourceFiles())) {
    const dates = files
      .map(f => {
        try {
          return git(['log', '-1', '--format=%cs', '--', path.relative(__dirname, f)]);
        } catch {
          return '';
        }
      })
      .filter(Boolean)
      .sort();
    if (dates.length) result[route] = dates[dates.length - 1];
  }
  return result;
}

function generateSitemap() {
  const blogPosts = getBlogPosts();
  const lastmods = lastModifiedByRoute();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  staticPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${page.url}</loc>\n`;
    if (lastmods[page.url]) xml += `    <lastmod>${lastmods[page.url]}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  blogPosts.filter(post => !post.noindex).forEach(post => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}/blog/${post.slug}</loc>\n`;
    xml += `    <lastmod>${post.publishDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  return xml;
}

function writeSitemap() {
  try {
    const sitemap = generateSitemap();
    const publicDir = path.join(__dirname, 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    fs.writeFileSync(OUTPUT_PATH, sitemap);
    console.log('✅ Sitemap generated:', OUTPUT_PATH);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

writeSitemap();
