# QUICK PROMPT FOR AI ASSISTANTS

Copy and paste this to any AI assistant to brief them on the blog system:

---

I have a React website (caboshandyman.com) with a "hidden blog" system for SEO. Blog articles exist at `/blog/slug` URLs but are NOT linked anywhere on the main site - only discovered through Google via sitemap.xml.

**To add a new blog article, I need help with 2 steps:**

**Step 1: Create article content file**
Location: `src/blog-content/article-slug.jsx`
Format: React component returning JSX with article content
Example:
```jsx
export default function ArticleName() {
  return (
    <>
      <p className="lead text-xl text-muted-foreground mb-6">Intro...</p>
      <h2>Section</h2>
      <p>Content...</p>
      <h3>Subsection</h3>
      <ul><li>Point 1</li></ul>
    </>
  );
}
```

**Step 2: Add metadata entry**
Location: `src/blog-posts.json`
Format: Add to JSON array:
```json
{
  "title": "Article Title",
  "slug": "article-slug",
  "publishDate": "YYYY-MM-DD",
  "description": "SEO description 150-160 chars",
  "category": "Category",
  "author": "Cabos Handyman"
}
```

**SLUG RULES:** lowercase, hyphens only, 3-8 words, no special chars

**SEO REQUIREMENTS:**
- 1,500-3,000 words
- Include: "handyman services Cabo San Lucas", "Los Cabos", "caboshandyman.com"
- Multiple H2/H3/H4 headers
- Bullet points for scannability
- Bold `<strong>` important terms
- Include contact: +52 612 169 8328, caboshandyman.com, loscabohandyman@gmail.com
- Business details: 20+ years, 600+ projects, $100 service call, 24/7 emergency

**After adding article:**
```bash
npm run build  # Auto-generates sitemap
```

**Full documentation:** Read AI-ASSISTANT-GUIDE.md for complete details

**Business:** Cabos Handyman - professional handyman/construction services in Cabo San Lucas, Mexico. Services include: kitchen/bathroom remodeling, TV mounting, ceiling fans, plumbing, electrical, painting, emergency repairs, and more.

Can you help me create a new blog article about [TOPIC]?
