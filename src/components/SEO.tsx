import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  geoRegion?: string;
  geoPlacename?: string;
  geoPosition?: string;
  schemaMarkup?: object;
  noindex?: boolean;
}

export default function SEO({ title, description, canonicalUrl, ogImage, geoRegion, geoPlacename, geoPosition, schemaMarkup, noindex }: SEOProps) {
  const defaultOgImage = '/images/cabos-handyman-og.jpg';
  const siteUrl = 'https://www.caboshandyman.com';
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  // og:image must be an absolute URL — relative paths are not resolved by
  // Facebook, WhatsApp or LinkedIn when they build a link preview.
  const ogImagePath = ogImage || defaultOgImage;
  const fullOgImage = ogImagePath.startsWith('http')
    ? ogImagePath
    : `${siteUrl}${ogImagePath}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullOgImage} />

      {/* Geographic Targeting */}
      {geoRegion && <meta name="geo.region" content={geoRegion} />}
      {geoPlacename && <meta name="geo.placename" content={geoPlacename} />}
      {geoPosition && (
        <>
          <meta name="geo.position" content={geoPosition} />
          <meta name="ICBM" content={geoPosition} />
        </>
      )}

      {/* Schema.org Structured Data */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  );
}
