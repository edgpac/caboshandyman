import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://www.caboshandyman.com';
const OUTPUT_PATH = path.join(__dirname, 'public', 'sitemap.xml');

const staticPages = [
  { url: '/', changefreq: 'weekly', priority: '1.0' },
  { url: '/contact', changefreq: 'monthly', priority: '0.9' },
  { url: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { url: '/terms', changefreq: 'yearly', priority: '0.3' },
  { url: '/kitchen-services-cabo', changefreq: 'monthly', priority: '0.85' },
  { url: '/bathroom-services-cabo', changefreq: 'monthly', priority: '0.85' },
  { url: '/electrical-services-cabo', changefreq: 'monthly', priority: '0.85' },
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
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  staticPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${page.url}</loc>\n`;
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
