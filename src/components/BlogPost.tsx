import React, { Suspense } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SEO from './SEO';
import { ArrowLeft, Phone } from 'lucide-react';
import blogPosts from '../blog-posts.json';

type Post = {
  title: string;
  slug: string;
  publishDate: string;
  description: string;
  category: string;
  author?: string;
  image?: string;
  imageCaption?: string;
};

function estimateReadTime(): string {
  return '6 min read';
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const posts = blogPosts as Post[];
  const post = posts.find(p => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const BlogContent = React.lazy(() =>
    import(`../blog-content/${post.slug}.jsx`).catch(() =>
      import('../blog-content/DefaultBlogContent.jsx')
    )
  );

  const related = posts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const others = related.length < 3
    ? [...related, ...posts.filter(p => p.slug !== post.slug && p.category !== post.category)].slice(0, 3)
    : related;

  return (
    <>
      <SEO
        title={`${post.title} | Cabos Handyman`}
        description={post.description}
        canonicalUrl={`/blog/${post.slug}`}
      />

      <div className="min-h-screen bg-white">

        {/* Minimal sticky header — Medium style */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
            <a href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">
              <ArrowLeft size={16} />
              Blog
            </a>
            <a href="/" className="text-base font-bold text-gray-900 tracking-tight">
              Cabos Handyman
            </a>
            <a
              href="tel:+526121698328"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#06756b] hover:text-[#049d8e] transition-colors"
            >
              <Phone size={15} />
              612 169 8328
            </a>
          </div>
        </header>

        {/* Article */}
        <article className="py-14 px-6">
          <div className="max-w-[680px] mx-auto">

            {/* Category */}
            <p className="text-xs font-bold uppercase tracking-widest text-[#06756b] mb-5">
              {post.category}
            </p>

            {/* Title — large serif */}
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.5px' }}
            >
              {post.title}
            </h1>

            {/* Description / subtitle */}
            <p
              className="text-xl text-gray-500 leading-relaxed mb-8"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {post.description}
            </p>

            {/* Author row */}
            <div className="flex items-center gap-3 pb-6 border-b border-gray-200 mb-10">
              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-bold">CH</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{post.author || 'Cabos Handyman'}</p>
                <p className="text-xs text-gray-400">
                  {formatDate(post.publishDate)} · {estimateReadTime()}
                </p>
              </div>
            </div>

            {/* Hero image — Medium style: full-width, after author row */}
            {post.image && (
              <figure className="mb-10 -mx-6 sm:-mx-10 md:-mx-16">
                <img
                  src={post.image}
                  alt={post.imageCaption || post.title}
                  className="w-full object-cover max-h-[520px]"
                  loading="eager"
                />
                {post.imageCaption && (
                  <figcaption className="text-center text-xs text-gray-400 mt-3 px-6 italic">
                    {post.imageCaption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Body — serif, generous size and line-height */}
            <div
              className="text-gray-800 leading-[1.85] text-[19px]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              <style>{`
                .blog-body h2 {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                  font-size: 1.6rem;
                  font-weight: 700;
                  color: #111;
                  margin-top: 2.5rem;
                  margin-bottom: 0.75rem;
                  letter-spacing: -0.3px;
                  line-height: 1.3;
                }
                .blog-body h3 {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                  font-size: 1.25rem;
                  font-weight: 700;
                  color: #111;
                  margin-top: 2rem;
                  margin-bottom: 0.5rem;
                  line-height: 1.4;
                }
                .blog-body h4 {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                  font-size: 1.05rem;
                  font-weight: 700;
                  color: #333;
                  margin-top: 1.5rem;
                  margin-bottom: 0.4rem;
                }
                .blog-body p {
                  margin-bottom: 1.5rem;
                  color: #292929;
                }
                .blog-body ul, .blog-body ol {
                  margin-bottom: 1.5rem;
                  padding-left: 1.5rem;
                }
                .blog-body li {
                  margin-bottom: 0.5rem;
                  color: #292929;
                }
                .blog-body ul li { list-style-type: disc; }
                .blog-body ol li { list-style-type: decimal; }
                .blog-body strong { color: #111; font-weight: 700; }
                .blog-body a {
                  color: #06756b;
                  text-decoration: underline;
                  text-underline-offset: 3px;
                }
                .blog-body a:hover { color: #049d8e; }
                .blog-body blockquote {
                  border-left: 3px solid #e0e0e0;
                  padding-left: 1.25rem;
                  margin: 1.5rem 0;
                  color: #666;
                  font-style: italic;
                }
                .blog-body .lead {
                  font-size: 1.2rem;
                  color: #555;
                  line-height: 1.7;
                }
              `}</style>
              <div className="blog-body">
                <Suspense fallback={
                  <div className="animate-pulse space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-100 rounded" style={{ width: `${75 + Math.random() * 25}%` }} />
                    ))}
                  </div>
                }>
                  <BlogContent />
                </Suspense>
              </div>
            </div>

            {/* Single bottom CTA — clean, not redundant */}
            <div className="mt-14 pt-10 border-t border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-bold">CH</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">Cabos Handyman</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Professional property maintenance in Cabo San Lucas & Los Cabos. <a href="/contact" className="text-[#06756b] underline underline-offset-2 hover:text-[#049d8e]">Get a free quote →</a>
                  </p>
                  <a
                    href="tel:+526121698328"
                    className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors"
                  >
                    <Phone size={14} />
                    +52 612 169 8328
                  </a>
                </div>
              </div>
            </div>

          </div>
        </article>

        {/* More posts */}
        {others.length > 0 && (
          <section className="border-t border-gray-200 py-12 px-6 bg-gray-50">
            <div className="max-w-[680px] mx-auto">
              <h2
                className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8"
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                More from Cabos Handyman
              </h2>
              <div className="space-y-6">
                {others.map(p => (
                  <a
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="flex gap-5 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">CH</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">{p.category} · {formatDate(p.publishDate)}</p>
                      <p className="font-bold text-gray-900 leading-snug group-hover:text-[#06756b] transition-colors"
                        style={{ fontFamily: 'Georgia, serif' }}>
                        {p.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{p.description}</p>
                    </div>
                  </a>
                ))}
              </div>
              <a
                href="/blog"
                className="inline-block mt-8 text-sm font-semibold text-[#06756b] hover:text-[#049d8e] transition-colors"
              >
                See all posts →
              </a>
            </div>
          </section>
        )}

        {/* Minimal footer */}
        <footer className="border-t border-gray-200 py-6 px-6">
          <div className="max-w-[680px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-400">
            <span>© 2026 Cabos Handyman · Cabo San Lucas, México</span>
            <div className="flex gap-4">
              <a href="/" className="hover:text-gray-700 transition-colors">Home</a>
              <a href="/services" className="hover:text-gray-700 transition-colors">Services</a>
              <a href="/contact" className="hover:text-gray-700 transition-colors">Contact</a>
              <a href="/blog" className="hover:text-gray-700 transition-colors">Blog</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
