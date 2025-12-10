export default function DefaultBlogContent() {
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground mb-4">
        Content is being updated. Please check back soon.
      </p>
      <a 
        href="/contact" 
        className="text-primary hover:text-primary-hover font-semibold"
      >
        Contact us for more information →
      </a>
    </div>
  );
}
