import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SEO from './SEO';
import Footer from './Footer';
import { Phone, Mail, ArrowLeft } from 'lucide-react';
import blogPosts from '../blog-posts.json';

export default function BlogPost() {
  const { slug } = useParams();
  
  // Find the blog post by slug
  const post = blogPosts.find(p => p.slug === slug);
  
  // If post not found, redirect to homepage
  if (!post) {
    return <Navigate to="/" replace />;
  }

  // Import the blog content dynamically
  const BlogContent = React.lazy(() => 
    import(`../blog-content/${post.slug}.jsx`).catch(() => 
      import('../blog-content/DefaultBlogContent.jsx')
    )
  );

  return (
    <>
      <SEO 
        title={post.title}
        description={post.description}
        canonicalUrl={`/blog/${post.slug}`}
      />
      
      <div className="min-h-screen bg-background">
        {/* Simple Header - No Navigation */}
        <header className="bg-dark-surface text-white py-4 sticky top-0 z-40 shadow-lg">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">CH</span>
              </div>
              <span className="text-xl font-bold text-primary">CABOS HANDYMAN</span>
            </a>
            <div className="flex items-center space-x-6">
              <a 
                href="tel:+526121698328" 
                className="hidden sm:flex items-center gap-2 text-white hover:text-primary transition-colors font-semibold"
              >
                <Phone size={18} />
                <span className="hidden lg:inline">612 169 8328</span>
              </a>
              <a 
                href="/contact" 
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground px-4 py-2 rounded-lg transition-colors font-semibold"
              >
                <Mail size={18} />
                Contact Us
              </a>
            </div>
          </div>
        </header>

        {/* Blog Article Content */}
        <article className="py-12 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            {/* Back Link (optional - can remove if you want it completely hidden) */}
            <a 
              href="/" 
              className="inline-flex items-center text-primary hover:text-primary-hover mb-6 text-sm font-medium"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </a>

            {/* Article Header */}
            <header className="mb-8">
              <div className="text-sm text-muted-foreground mb-2">
                {post.category} • {new Date(post.publishDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {post.title}
              </h1>
              {post.author && (
                <div className="text-muted-foreground">
                  By {post.author}
                </div>
              )}
            </header>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <React.Suspense fallback={<div>Loading...</div>}>
                <BlogContent />
              </React.Suspense>
            </div>

            {/* Call to Action at Bottom */}
            <div className="mt-12 p-8 bg-primary/5 rounded-lg border border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Need Professional Handyman Services?
              </h3>
              <p className="text-muted-foreground mb-6">
                Contact Cabos Handyman for expert service in Cabo San Lucas. 20+ years experience, 600+ completed projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:+526121698328"
                  className="bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 rounded-lg font-semibold text-center transition-colors"
                >
                  Call: 612 169 8328
                </a>
                <a 
                  href="/contact"
                  className="bg-white hover:bg-gray-50 text-primary border-2 border-primary px-6 py-3 rounded-lg font-semibold text-center transition-colors"
                >
                  Get Free Estimate
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
