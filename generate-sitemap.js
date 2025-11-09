import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

const links = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/services', changefreq: 'monthly', priority: 0.8 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.9 },
  { url: '/gallery', changefreq: 'weekly', priority: 0.6 },
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
