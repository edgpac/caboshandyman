# AI Assistant Guide: Cabos Handyman Hidden Blog System

## SYSTEM OVERVIEW
This is a React 18 + Vite website for Cabos Handyman (caboshandyman.com) with a "hidden blog" system designed for SEO. Blog articles exist at `/blog/slug` URLs but are NOT linked in navigation - they're only discovered through Google search results via sitemap.xml.

---

## FILE STRUCTURE

```
caboshandyman/
├── src/
│   ├── components/
│   │   ├── BlogPost.tsx              ← Blog template component (DO NOT EDIT)
│   │   ├── SEO.tsx                   ← SEO component for meta tags
│   │   └── ...other components
│   ├── blog-content/
│   │   ├── professional-handyman-services-cabo-san-lucas.jsx
│   │   ├── tv-mounting-ceiling-fans-cabo.jsx
│   │   └── DefaultBlogContent.jsx    ← Fallback component
│   ├── blog-posts.json               ← Blog metadata database (MAIN FILE TO EDIT)
│   └── App.tsx                       ← Router with blog route
├── generate-sitemap.js               ← Auto-generates sitemap from blog-posts.json
├── public/
│   └── sitemap.xml                   ← Auto-generated (DO NOT EDIT MANUALLY)
└── package.json
```

---

## HOW TO ADD NEW BLOG ARTICLES (2 STEPS)

### Step 1: Create Article Content File

**Location:** `src/blog-content/your-article-slug.jsx`

**Format:** React component that returns JSX

**Template:**
```jsx
export default function YourArticleFunctionName() {
  return (
    <>
      <p className="lead text-xl text-muted-foreground mb-6">
        Introduction paragraph with compelling hook...
      </p>

      <h2>Main Section Heading</h2>
      <p>
        Content paragraph with <strong>important terms bolded</strong> and natural keyword usage.
      </p>

      <h3>Subsection</h3>
      <ul>
        <li>Bullet point 1</li>
        <li>Bullet point 2</li>
        <li>Bullet point 3</li>
      </ul>

      <h4>Detail Level Heading</h4>
      <p>More specific content...</p>

      <h2>Another Major Section</h2>
      <p>Continue the article...</p>

      <hr className="my-8" />

      <p className="text-sm text-muted-foreground italic">
        Cabos Handyman closing statement with brand reinforcement and service summary.
      </p>
    </>
  );
}
```

**File Naming Convention:**
- Use the same name as the slug
- Example: slug `kitchen-remodeling-guide` → file `kitchen-remodeling-guide.jsx`
- Function name should be PascalCase: `KitchenRemodelingGuide()`

---

### Step 2: Add Entry to blog-posts.json

**Location:** `src/blog-posts.json`

**Format:** JSON array of blog post objects

**Required Fields:**
```json
{
  "title": "Article Title for SEO and Display",
  "slug": "url-friendly-slug-with-hyphens",
  "publishDate": "YYYY-MM-DD",
  "description": "SEO meta description (150-160 characters ideal)",
  "category": "Category Name",
  "author": "Cabos Handyman"
}
```

**Example Addition:**
```json
[
  {
    "title": "Professional Handyman Services in Cabo San Lucas: Your Complete Guide",
    "slug": "professional-handyman-services-cabo-san-lucas",
    "publishDate": "2025-12-10",
    "description": "Complete guide to professional handyman services in Cabo San Lucas. 20+ years experience, 600+ projects completed, 24/7 emergency service.",
    "category": "Services",
    "author": "Cabos Handyman"
  },
  {
    "title": "NEW ARTICLE TITLE HERE",
    "slug": "new-article-slug-here",
    "publishDate": "2025-12-15",
    "description": "SEO description for new article...",
    "category": "Renovation",
    "author": "Cabos Handyman"
  }
]
```

**CRITICAL:** Add comma after previous entry's closing `}` before adding new entry!

---

## SLUG RULES (VERY IMPORTANT)

✅ **Good slugs:**
- `kitchen-remodeling-cabo-guide`
- `emergency-plumbing-repairs`
- `bathroom-renovation-tips`

❌ **Bad slugs:**
- `Kitchen Remodeling Guide` (has spaces, capitalized)
- `kitchen_remodeling_guide` (underscores, use hyphens)
- `¡kitchen-remodeling!` (special characters)
- `the-best-kitchen-guide-2024` (avoid stop words like "the", "a")

**Rules:**
- All lowercase
- Use hyphens (not underscores or spaces)
- 3-8 words maximum
- No special characters
- Include primary keyword
- Make it descriptive but concise

---

## BUILDING AND DEPLOYMENT

After adding a new article:

```bash
# Generate sitemap and build
npm run build

# The sitemap is automatically updated with new blog posts
# Deploy the build to production
```

The `generate-sitemap.js` script:
1. Reads `blog-posts.json`
2. Generates XML for all blog posts
3. Outputs to `public/sitemap.xml`
4. Runs automatically before every build

---

## SEO BEST PRACTICES FOR ARTICLES

### Content Length
- Minimum: 1,500 words
- Ideal: 2,000-3,000 words
- Google favors comprehensive content

### Keyword Strategy
**Primary Keywords (use 8-12 times):**
- "handyman services Cabo San Lucas"
- "professional handyman"
- "Los Cabos handyman"

**Secondary Keywords (use 4-8 times):**
- Service-specific terms (kitchen remodeling, plumbing repair, etc.)
- "caboshandyman.com" (website mention)

**Long-tail Keywords (use 2-4 times each):**
- "emergency handyman services in Cabo"
- "licensed handyman Los Cabos"
- Very specific service queries

### Location Mentions
Include location keywords naturally throughout:
- "Cabo San Lucas"
- "Los Cabos"
- "San José del Cabo"
- "Baja California Sur"

### Content Structure

**Must Include:**
1. **Introduction (1-2 paragraphs)** - Hook with problem/solution
2. **Multiple H2 sections** - Main topic divisions
3. **H3 subsections** - Subtopics under each H2
4. **H4 details** - Specific points when needed
5. **Bullet lists** - For easy scanning
6. **Bold important terms** - `<strong>key phrases</strong>`
7. **Natural keyword placement** - Not forced or repetitive
8. **Contact information** - Phone, website, email
9. **Call to action** - Encourage user to contact
10. **Closing statement** - Brand reinforcement

**Good Header Hierarchy Example:**
```
H2: Why Professional Handyman Services Matter
  H3: Cost Savings
  H3: Time Efficiency
  H3: Quality Workmanship
H2: Types of Handyman Services
  H3: Residential Services
    H4: Kitchen Remodeling
    H4: Bathroom Renovation
  H3: Commercial Services
    H4: Office Renovations
```

### Contact Information to Include
Always mention throughout the article:
- **Website:** caboshandyman.com
- **Phone:** +52 612 169 8328
- **Email:** loscabohandyman@gmail.com
- **Service details:** 20+ years experience, 600+ projects, 24/7 emergency service, $100 service call

---

## THE "HIDDEN BLOG" CONCEPT

**What makes it "hidden":**
- ❌ NO links in main navigation menu
- ❌ NO links in footer
- ❌ NO links on homepage
- ❌ NOT mentioned anywhere on main site

**How users find articles:**
- ✅ Google search results
- ✅ Direct URL if shared
- ✅ Sitemap.xml submission to Google
- ✅ Organic SEO rankings

**Why this approach:**
- Keeps main website clean and simple
- Articles purely for SEO/Google discovery
- Users browsing site don't see "blog clutter"
- Professional, focused user experience
- Articles serve as lead generation from search

---

## BUSINESS INFORMATION FOR ARTICLES

**Company Name:** Cabos Handyman

**Services Offered:**
- Residential handyman services
- Commercial property maintenance
- HOA and community services
- Emergency repairs (24/7)
- Kitchen remodeling
- Bathroom renovations
- TV mounting
- Ceiling fan installation
- Cabinet installation
- Plumbing repairs
- Electrical work
- Painting
- Drywall repair
- Carpentry
- Pressure washing
- And more...

**Key Stats:**
- 20+ years experience
- 600+ completed projects
- 100% satisfaction rate
- Licensed, insured, and bonded
- 30-minute emergency response time

**Pricing:**
- $100 USD service call (includes diagnosis + first 30 minutes labor)
- Free estimates for projects
- Transparent pricing, no hidden fees

**Service Area:**
- Cabo San Lucas
- San José del Cabo
- Los Cabos Corridor
- All of Los Cabos region
- Baja California Sur

---

## ARTICLE TOPICS TO CONSIDER

**Completed Articles:**
1. Professional Handyman Services (general overview)
2. TV Mounting & Ceiling Fans (installation services)

**Future Article Ideas:**
- Kitchen Remodeling Guide for Cabo Homes
- Bathroom Renovation Tips for Coastal Properties
- Emergency Plumbing Repairs in Los Cabos
- Painting Services: Interior and Exterior
- Hurricane Preparation and Storm Damage Repair
- HOA Maintenance Services Guide
- Commercial Property Maintenance
- Drywall Repair and Installation
- Carpentry Services in Cabo San Lucas
- Electrical Services and Safety
- Pool Maintenance and Repair
- Outdoor Living Space Construction
- Home Addition and Expansion
- Property Maintenance for Vacation Homes
- Seasonal Maintenance Checklist

---

## COMMON MISTAKES TO AVOID

❌ **DON'T:**
- Add blog links to navigation
- Edit sitemap.xml manually
- Use underscores in slugs
- Forget commas in blog-posts.json
- Copy/paste generic content
- Keyword stuff (sounds unnatural)
- Write less than 1,500 words
- Forget location mentions
- Skip contact information
- Use technical jargon without explanation

✅ **DO:**
- Write in friendly, helpful tone
- Include specific local details
- Use real pricing from business
- Mention actual services offered
- Write for homeowners/property owners
- Include actionable advice
- Make content scannable (headers, bullets)
- Natural keyword placement
- Include calls to action
- Proofread before publishing

---

## TESTING NEW ARTICLES

After creating a new article:

### Local Testing:
```bash
npm run dev
# Visit: http://localhost:5173/blog/your-article-slug
```

### Check Sitemap:
```bash
npm run generate-sitemap
cat public/sitemap.xml
# Verify new article URL is present
```

### Production Testing:
After deployment, verify:
- Article loads correctly
- SEO meta tags are correct (view page source)
- Sitemap includes article
- No console errors
- Mobile responsive
- Images load properly (if any)

---

## TROUBLESHOOTING

### "Cannot find module './blog-posts.json'"
- Check that `src/blog-posts.json` exists
- Verify JSON is valid (no trailing commas, proper quotes)

### Article shows DefaultBlogContent
- Check that article file name matches slug exactly
- Verify file is in `src/blog-content/` directory
- Check for typos in filename

### Sitemap not updating
```bash
rm public/sitemap.xml
npm run generate-sitemap
```

### Article not appearing
- Verify entry in blog-posts.json
- Check for JSON syntax errors
- Ensure slug matches filename

---

## HELPER COMMANDS FOR AI ASSISTANTS

When helping the user add a new blog post, use these terminal commands:

### Create new article file:
```bash
nano src/blog-content/article-slug-here.jsx
```

### Edit blog-posts.json:
```bash
nano src/blog-posts.json
```

### Test locally:
```bash
npm run dev
```

### Build for production:
```bash
npm run build
```

### Generate sitemap manually:
```bash
npm run generate-sitemap
```

---

## FINAL CHECKLIST FOR NEW ARTICLES

Before considering an article complete, verify:

- [ ] Article content is 1,500+ words
- [ ] File saved as: `src/blog-content/slug-name.jsx`
- [ ] Function name is PascalCase
- [ ] Entry added to `src/blog-posts.json` with comma
- [ ] Slug is lowercase with hyphens
- [ ] Location keywords used naturally throughout
- [ ] Contact information included (phone, website, email)
- [ ] Multiple H2, H3, H4 headers for structure
- [ ] Bullet points for scannability
- [ ] Important terms bolded with `<strong>`
- [ ] Natural keyword density (not stuffed)
- [ ] Call to action included
- [ ] Closing statement with brand reinforcement
- [ ] Tested locally at `localhost:5173/blog/slug`
- [ ] Sitemap regenerated and includes new article
- [ ] Ready for `npm run build` and deployment

---

## CONTACT FOR QUESTIONS

If the user needs clarification about the system:
- The blog system was set up on December 10, 2025
- All blog components use React 18 and TypeScript/JSX
- Styling uses Tailwind CSS classes
- SEO handled by react-helmet-async
- Router is react-router-dom v6

This is a production system serving real customers searching for handyman services in Cabo San Lucas, Mexico. Content quality and SEO optimization are critical for business success.
