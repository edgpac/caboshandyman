import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

const today = new Date().toISOString().split('T')[0];

const links = [
  { url: '/', changefreq: 'weekly', priority: 1.0, lastmod: today },
  { url: '/services', changefreq: 'monthly', priority: 0.8, lastmod: today },
  { url: '/about', changefreq: 'monthly', priority: 0.7, lastmod: today },
  { url: '/contact', changefreq: 'monthly', priority: 0.9, lastmod: today },
  { url: '/gallery', changefreq: 'weekly', priority: 0.6, lastmod: today },
];

const sitemap = new SitemapStream({ 
  hostname: 'https://www.caboshandyman.com',
  xmlns: {
    news: false,
    xhtml: false,
    image: false,
    video: false
  }
});

const writeStream = createWriteStream(resolve('public', 'sitemap.xml'));

sitemap.pipe(writeStream);
links.forEach(link => sitemap.write(link));
sitemap.end();

streamToPromise(sitemap).then(() => console.log('✅ Sitemap generated successfully!'));
