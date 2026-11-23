// api/gone.js - 410 Gone for removed pages
// vercel.json rewrites retired URLs here so search engines drop them
// instead of passing their relevance to another page.

export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Robots-Tag', 'noindex');
  res.status(410).send(
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex">' +
      '<title>Page removed | Cabos Handyman</title></head><body>' +
      '<p>This page has been removed. <a href="https://www.caboshandyman.com/">Visit Cabos Handyman</a>.</p>' +
      '</body></html>'
  );
}
