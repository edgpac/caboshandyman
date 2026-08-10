/**
 * Single source of truth for the business claims that appear across the site.
 *
 * These numbers were previously hardcoded in a dozen places and had drifted
 * apart — one page published a 5.0 rating from 600 reviews while another
 * published 4.8 from 150. Completed jobs and submitted reviews are different
 * measures: most customers never leave a review, so reviewCount is always far
 * lower than projectsCompleted. Keep them separate and update them here only.
 *
 * IMPORTANT: googleRating and googleReviewCount are published in Schema.org
 * aggregateRating markup. Google requires these to match genuine reviews on
 * the Google Business Profile, so only ever set them to the real current
 * figures — never to an aspirational or rounded-up number.
 */

export const businessStats = {
  /** Year the business opened. Also published as schema foundingDate. */
  foundingYear: 2019,

  /** Founder's hands-on trade experience, which predates the company. */
  yearsExperience: 20,

  /** Jobs completed since founding. Not the same as review count. */
  projectsCompleted: 600,

  /** Current Google Business Profile average. Verify before changing. */
  googleRating: 4.8,

  /** Current Google Business Profile review count. Verify before changing. */
  googleReviewCount: 150,
} as const;

/** "20+ years of experience" — describes the trade, not the company's age. */
export const yearsExperienceLabel = `${businessStats.yearsExperience}+`;

/** "600+" */
export const projectsCompletedLabel = `${businessStats.projectsCompleted}+`;

/** "4.8" */
export const googleRatingLabel = businessStats.googleRating.toFixed(1);

/** "150+ Google reviews" */
export const googleReviewsLabel = `${businessStats.googleReviewCount}+ Google reviews`;

/** Schema.org AggregateRating node, shared by every page that publishes one. */
export const aggregateRatingSchema = {
  "@type": "AggregateRating",
  ratingValue: googleRatingLabel,
  reviewCount: String(businessStats.googleReviewCount),
} as const;
