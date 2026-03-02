# Cabos Handyman — Project Brief

Local handyman business website for **Cabos Handyman** in Cabo San Lucas, Mexico.
Live site: https://www.caboshandyman.com — hosted on **Vercel**, deployed from this repo via git push.

## Tech Stack

- **React 18** + **TypeScript** + **Vite 5**
- **Tailwind CSS 3** (custom config in `tailwind.config.ts`)
- **react-router-dom** for routing (SPA)
- **react-helmet-async** for per-page SEO/meta tags
- **GSAP v3** for stat counter animations (IntersectionObserver trigger, not ScrollTrigger)
- **motion** (framer-motion) for `GradientText.tsx` animated gradient
- **@radix-ui** component primitives
- **Supabase** for backend (AI assistant, contact forms)
- **Sharp** (dev dep) for local image optimization scripts
- **vite-plugin-compression** for brotli + gzip at build time

## PageSpeed Scores (as of Feb 2026)

| Metric | Score |
|--------|-------|
| Performance | **98** |
| Accessibility | **97** |
| Best Practices | **100** |
| SEO | **100** |

Core Web Vitals: LCP ~2s, TBT 0ms, CLS 0

## Key Files

| File | Purpose |
|------|---------|
| `src/components/MaintenanceMasterHomepage.tsx` | Main homepage — hero, stats, portfolio, CTAs |
| `src/components/Footer.tsx` | Footer — contact, FAQ link, USD→MXN currency converter |
| `src/components/BrandCarousel.tsx` | Brand logo data — points to `/public/logos/*.webp` |
| `src/components/LogoLoop.tsx` | requestAnimationFrame infinite scroll carousel engine |
| `src/components/GradientText.tsx` | Animated teal gradient text (uses motion/react) |
| `src/components/ReviewsCarousel.jsx` | Google review cards carousel |
| `src/components/SEO.tsx` | Helmet wrapper for meta/schema |
| `src/components/Navigation.tsx` | Standalone nav (used on non-homepage routes) |
| `src/assets/*.webp` | 6 portfolio images — 500×500 WebP quality 75 |
| `public/logos/*.webp` | Brand logos — WebP at 2× display size |
| `public/CHLOGO.png` | Nav logo — 96×96 PNG (displayed at 48×48) |
| `public/videos/hero-construction-bg.mp4` | Hero background video |
| `vercel.json` | 301 redirect non-www → www |
| `tailwind.config.ts` | Custom color tokens (see Color System below) |

## Routes

- `/` → `MaintenanceMasterHomepage`
- `/services` → `Services`
- `/property-care-plans` → `PropertyCarePlans`
- `/faq` → `FAQ`
- `/about` → `About`
- `/contact` → `ContactPage`
- Service pages: `/plumber-cabo`, `/electrical-cabo`, `/kitchen-remodeling-cabo`, etc.

## Color System — CRITICAL

`text-primary` in Tailwind resolves to `#4AC1C3` — **this FAILS WCAG AA contrast (2.9:1) on white/light backgrounds.**

| Use case | Correct color |
|----------|---------------|
| Teal text on **white or light** bg | `text-[#06756b]` (5.6:1 ✓) |
| Teal text on **dark** bg (nav) | `text-primary` is fine (#4AC1C3 on dark passes) |
| Teal buttons/bg | `bg-primary` or gradient `from-[#2dd4bf] via-[#049d8e] to-[#06756b]` |
| Footer teal links on white | `text-teal-700` (#0f766e, 5.5:1 ✓) |
| Body text on white | `text-gray-900` or `text-gray-800` — avoid `text-gray-400/500` |
| GradientText brand name | Uses motion/react with `['#049d8e', '#06756b']` range |

## Image Rules

- **Portfolio images** (`src/assets/*.webp`): 500×500 WebP quality 75. Displayed in `h-64` cards.
- **LCP element**: `modern-kitchen-remodel.webp` (first portfolio card). Must keep `loading="eager" fetchPriority="high"`. All other portfolio images: `loading="lazy" decoding="async"`.
- **Brand logos** (`public/logos/`): WebP format at 2× display height (64px for 32px logos, 104px for Milwaukee 52px). `cemex.png` is 3.4 KB so kept as PNG.
- **Nav logo** (`public/CHLOGO.png`): 96×96 PNG (2× for 48×48 display). Has `fetchPriority="high"` preload in `index.html`.
- Always prefer WebP over PNG/JPG for new images.

## Performance Patterns

- **Exchange rate API** in Footer is deferred with `setTimeout(fetchExchangeRate, 2000)` — do NOT move it back to immediate mount, it adds ~300ms to critical path.
- **GradientText** is lazy-loaded via Vite chunk splitting (it's 42 KB due to motion/react).
- **Stat counters** use `IntersectionObserver` + GSAP tween (not ScrollTrigger — ScrollTrigger was unreliable on mobile).
- **LogoLoop** duplicate lists use `aria-hidden="true"` + `tabIndex={-1}` on links to prevent accessibility violations.
- Brotli + gzip compression via `vite-plugin-compression` — no manual Vercel config needed.

## Google Search Console MCP Setup

Enables any Claude Code session to query GSC data (impressions, clicks, CTR, position, URL inspection, sitemaps) directly via natural language.

### One-time setup

**Step 1 — Google Cloud**
1. Go to [console.cloud.google.com](https://console.cloud.google.com) → create or select a project
2. Enable **Search Console API** (APIs & Services → Library → search "Search Console API")
3. Create a **Service Account** (IAM & Admin → Service Accounts → Create)
4. Download the credentials JSON key (Actions → Manage Keys → Add Key → JSON)
5. Save the file somewhere safe, e.g. `~/.config/gsc-credentials.json`

**Step 2 — Grant GSC access**
In [Google Search Console](https://search.google.com/search-console) → Settings → Users and permissions → Add user → paste the service account email (looks like `name@project-id.iam.gserviceaccount.com`) → set role to **Full**

**Step 3 — Enable MCP server**
Add to `~/.claude/claude.json` (global — works in all projects):

```json
{
  "mcpServers": {
    "gsc": {
      "command": "npx",
      "args": ["-y", "mcp-server-gsc"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/Users/YOUR_USERNAME/.config/gsc-credentials.json"
      }
    }
  }
}
```

Or add to `.claude/claude.json` in this project directory for project-only scope (see that file for the template).

**Step 4 — Verify**
Start a new Claude Code session and run: `list my GSC properties` — it should return `www.caboshandyman.com`.

### What you can ask once connected

- "Show clicks, impressions, and average position for caboshandyman.com last 28 days"
- "Which pages have the highest impressions but lowest CTR?"
- "What queries are driving traffic to /faq?"
- "Inspect the URL https://www.caboshandyman.com/ — any indexing issues?"
- "List all sitemaps submitted for caboshandyman.com"
- "Which pages dropped in position compared to last month?"

### Package used
[ahonn/mcp-server-gsc](https://github.com/ahonn/mcp-server-gsc) — runs via `npx`, no global install needed.

---

## What NOT to Do

- Do NOT use `text-primary` on white/light backgrounds — use `text-[#06756b]` instead.
- Do NOT add `loading="lazy"` to the first portfolio image (index 0) — it is the LCP element.
- Do NOT call `fetchExchangeRate()` immediately on mount in Footer — keep the 2s defer.
- Do NOT add large PNG images — always run through Sharp and save as WebP.
- Do NOT install `react-helmet` (not async version) — project uses `react-helmet-async`.
- Do NOT use GSAP ScrollTrigger — replaced with IntersectionObserver for mobile reliability.
