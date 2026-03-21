import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://www.caboshandyman.com';
const OUTPUT_PATH = path.join(__dirname, 'public', 'sitemap.xml');

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
  { url: '/property-management-cabo-san-lucas', changefreq: 'monthly', priority: '0.95' },
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
  { url: '/water-leak-detector-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/commercial-sink-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.80' },

  // Electrical sub-pages
  { url: '/ceiling-fan-installation-cabo', changefreq: 'monthly', priority: '0.82' },
  { url: '/ceiling-light-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/outlet-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/generator-hookup-cabo-san-lucas', changefreq: 'monthly', priority: '0.80' },
  { url: '/bathroom-lighting-cabo-san-lucas', changefreq: 'monthly', priority: '0.80' },
  { url: '/office-lighting-cabo-san-lucas', changefreq: 'monthly', priority: '0.80' },
  { url: '/common-area-lighting-cabo-san-lucas', changefreq: 'monthly', priority: '0.80' },
  { url: '/decorative-lighting-cabo-san-lucas', changefreq: 'monthly', priority: '0.80' },

  // Kitchen sub-pages
  { url: '/cabinet-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/countertop-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/backsplash-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/tile-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/kitchen-hardware-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.80' },
  { url: '/pantry-shelving-cabo-san-lucas', changefreq: 'monthly', priority: '0.80' },

  // Bathroom sub-pages
  { url: '/shower-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/shower-head-replacement-cabo-san-lucas', changefreq: 'monthly', priority: '0.80' },
  { url: '/towel-rack-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.80' },
  { url: '/mirror-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.80' },
  { url: '/bathroom-shelving-cabo-san-lucas', changefreq: 'monthly', priority: '0.80' },

  // Handyman sub-pages
  { url: '/furniture-assembly-cabo', changefreq: 'monthly', priority: '0.82' },
  { url: '/tv-mounting-cabo', changefreq: 'monthly', priority: '0.82' },
  { url: '/painting-cabo-san-lucas', changefreq: 'monthly', priority: '0.82' },
  { url: '/door-lock-replacement-cabo-san-lucas', changefreq: 'monthly', priority: '0.80' },
  { url: '/window-repair-cabo-san-lucas', changefreq: 'monthly', priority: '0.80' },
  { url: '/landscape-maintenance-cabo-san-lucas', changefreq: 'monthly', priority: '0.80' },
  { url: '/booth-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.78' },
  { url: '/bar-installation-cabo-san-lucas', changefreq: 'monthly', priority: '0.78' },
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

function generateSitemap() {
  const blogPosts = getBlogPosts();
  const today = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  staticPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  blogPosts.forEach(post => {
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
