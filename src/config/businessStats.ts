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

  /**
   * Current Google Business Profile average.
   * Verified against the live GBP listing on 2026-08-10.
   */
  googleRating: 5.0,

  /**
   * Current Google Business Profile review count.
   * Verified against the live GBP listing on 2026-08-10: 16 reviews.
   *
   * This is deliberately far lower than projectsCompleted — most customers
   * never leave a review. Do not substitute the project count here, and do
   * not round it up: Schema.org aggregateRating must match the real listing.
   * Prefer surfacing the rating rather than the count in visible copy.
   */
  googleReviewCount: 16,
} as const;

/** "20+ years of experience" — describes the trade, not the company's age. */
export const yearsExperienceLabel = `${businessStats.yearsExperience}+`;

/** "600+" */
export const projectsCompletedLabel = `${businessStats.projectsCompleted}+`;

/** "5.0" */
export const googleRatingLabel = businessStats.googleRating.toFixed(1);

/**
 * "Rated 5.0 on Google" — leads with the rating, not the count.
 * The count is small because reviews are rare, not because work is; the
 * volume story is carried by projectsCompleted and the project photos.
 */
export const googleRatingSentence = `Rated ${googleRatingLabel} on Google`;

/** "600+ projects completed since 2019" */
export const projectsSinceLabel =
  `${projectsCompletedLabel} projects completed since ${businessStats.foundingYear}`;

/** Schema.org AggregateRating node, shared by every page that publishes one. */
export const aggregateRatingSchema = {
  "@type": "AggregateRating",
  ratingValue: googleRatingLabel,
  reviewCount: String(businessStats.googleReviewCount),
} as const;
