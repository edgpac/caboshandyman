import { lazy, useState } from 'react';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import { ArrowRight, BookOpen } from 'lucide-react';
import blogPosts from '../blog-posts.json';

const Footer = lazy(() => import('@/components/Footer'));

type Post = {
  title: string;
  slug: string;
  publishDate: string;
  description: string;
  category: string;
  author?: string;
};

const categoryDescriptions: Record<string, string> = {
  'Services': 'Guides and overviews of our handyman and maintenance services in Cabo San Lucas.',
  'Installation Services': 'Step-by-step insights on professional installation projects across Los Cabos.',
  'Emergency Services': '24/7 emergency repair guides and what to do when something goes wrong.',
  'Property Management': 'Tips for absentee owners and vacation rental hosts managing property in Cabo.',
};

const categoryOrder = ['Services', 'Installation Services', 'Emergency Services', 'Property Management'];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function Blog() {
  const posts = blogPosts as Post[];

  const categories = categoryOrder.filter(cat =>
    posts.some(p => p.category === cat)
  );
  const otherCategories = [...new Set(posts.map(p => p.category))].filter(
    cat => !categoryOrder.includes(cat)
  );
  const allCategories = [...categories, ...otherCategories];

  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const grouped: Record<string, Post[]> = {};
  filtered.forEach(p => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });

  return (
    <>
      <SEO
        title="Blog & Resources | Cabos Handyman Cabo San Lucas"
        description="Guides, tips, and resources from Cabos Handyman — covering plumbing, electrical, kitchen remodeling, property management, and more in Cabo San Lucas, México."
        canonicalUrl="/blog"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />

      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen size={16} /> Resources &amp; Guides
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Practical guides for property owners in Cabo San Lucas — maintenance tips, service overviews, and what to do when things go wrong.
          </p>
        </div>
      </section>

      {/* Category filter tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-[72px] z-30">
        <div className="container mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {['All', ...allCategories].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts grouped by category */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-14">
            {Object.entries(grouped).map(([category, catPosts]) => (
              <div key={category}>
                {/* Category header */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{category}</h2>
                  {categoryDescriptions[category] && (
                    <p className="text-sm text-gray-500">{categoryDescriptions[category]}</p>
                  )}
                </div>

                {/* Post cards */}
                <div className="grid sm:grid-cols-2 gap-5">
                  {catPosts.map(post => (
                    <a
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#06756b] hover:shadow-sm transition-all group"
                    >
                      <span className="inline-block text-xs font-bold text-[#06756b] uppercase tracking-wider mb-3">
                        {post.category}
                      </span>
                      <h3 className="font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#06756b] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{formatDate(post.publishDate)}</span>
                        <span className="text-sm text-[#06756b] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read <ArrowRight size={14} />
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
