// api/_security.js — Shared security helpers for all Vercel API endpoints

const ALLOWED_ORIGINS = [
  'https://www.caboshandyman.com',
  'https://caboshandyman.com',
];

// ─── Limits ──────────────────────────────────────────────────────────────────
const MAX_MESSAGE_LENGTH   = 2000;   // chat question / feedback
const MAX_HISTORY_MESSAGES = 20;     // conversation turns kept
const MAX_HISTORY_MSG_LEN  = 1000;   // chars per history message
const MAX_IMAGE_COUNT      = 5;      // images per analyze-parts request
const MAX_WHATSAPP_LENGTH  = 1600;   // chars in outbound SMS/WhatsApp

// ─── In-memory rate limiter ──────────────────────────────────────────────────
// Vercel functions are stateless across cold starts, but this still blocks
// rapid-fire bursts within a single warm instance.
const rateLimitStore = new Map();

/**
 * Returns true if the request is within quota, false if rate-limited.
 * @param {string} ip
 * @param {number} limit   max requests allowed in the window
 * @param {number} windowMs  window length in milliseconds
 */
function rateLimit(ip, limit, windowMs) {
  const now = Date.now();
  const record = rateLimitStore.get(ip) || { count: 0, resetAt: now + windowMs };

  if (now > record.resetAt) {
    record.count  = 0;
    record.resetAt = now + windowMs;
  }

  record.count++;
  rateLimitStore.set(ip, record);

  // Prune stale entries so the Map doesn't grow unbounded
  if (rateLimitStore.size > 2000) {
    for (const [k, v] of rateLimitStore.entries()) {
      if (now > v.resetAt) rateLimitStore.delete(k);
    }
  }

  return record.count <= limit;
}

// ─── CORS / Origin check ─────────────────────────────────────────────────────
/**
 * Sets CORS headers and returns false (responding 403) if the origin is not
 * in the allow-list. Returns true if the request should proceed.
 */
function checkOrigin(req, res) {
  const origin = req.headers.origin || '';

  const allowed = !origin || ALLOWED_ORIGINS.some(a => origin.startsWith(a));

  res.setHeader('Access-Control-Allow-Origin',
    allowed ? (origin || ALLOWED_ORIGINS[0]) : 'null');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (!allowed) {
    res.status(403).json({ error: 'Forbidden' });
    return false;
  }
  return true;
}

// ─── IP extraction ────────────────────────────────────────────────────────────
function getClientIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

// ─── HTML escaping (for email templates) ─────────────────────────────────────
/**
 * Escapes a value for safe interpolation into an HTML string.
 * Always returns a string.
 */
function sanitizeHtml(val) {
  if (val == null) return '';
  return String(val)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#x27;');
}

// ─── Conversation history validation ─────────────────────────────────────────
/**
 * Strips invalid entries and enforces per-message size limits.
 * Only keeps the most recent MAX_HISTORY_MESSAGES turns.
 */
function validateHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter(msg =>
      msg &&
      typeof msg === 'object' &&
      (msg.role === 'user' || msg.role === 'assistant') &&
      typeof msg.content === 'string'
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map(msg => ({
      role:    msg.role,
      content: msg.content.slice(0, MAX_HISTORY_MSG_LEN),
    }));
}

module.exports = {
  checkOrigin,
  rateLimit,
  getClientIp,
  sanitizeHtml,
  validateHistory,
  MAX_MESSAGE_LENGTH,
  MAX_IMAGE_COUNT,
  MAX_WHATSAPP_LENGTH,
};
