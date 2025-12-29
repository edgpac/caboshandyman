import React from 'react';
import { Helmet } from 'react-helmet-async';
import ServiceMenuPopup from '../components/ServiceMenuPopup';

export default function ServicesPage() {
  const [selectedProject, setSelectedProject] = React.useState<string>('Modern Kitchen');
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(true);

  return (
    <>
      <Helmet>
        <title>Handyman Services & Pricing Cabo San Lucas | Cabos Handyman</title>
        <meta
          name="description"
          content="Complete handyman service menu with transparent pricing in Cabo San Lucas. Kitchen, bathroom, electrical, plumbing, painting, drain cleaning, toilet & tub unclogging. $60 service call. 20+ years experience. Licensed & insured."
        />
        <meta
          name="keywords"
          content="handyman cabo san lucas, plumbing cabo, electrical cabo, kitchen remodel cabo, bathroom renovation cabo, toilet unclogging cabo, drain cleaning cabo san lucas, handyman pricing, emergency plumbing cabo"
        />
        <link rel="canonical" href="https://caboshandyman.com/services" />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Handyman Services & Pricing - Cabo San Lucas" />
        <meta property="og:description" content="70+ handyman services with transparent pricing. Kitchen, bathroom, electrical, plumbing. $60 service call. 24/7 emergency service." />
        <meta property="og:url" content="https://caboshandyman.com/services" />
        <meta property="og:type" content="website" />

        {/* Schema.org Service Catalog Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Cabos Handyman",
            "image": "https://caboshandyman.com/logo.png",
            "telephone": "+52-612-169-8328",
            "email": "loscabohandyman@gmail.com",
            "url": "https://caboshandyman.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Cabo San Lucas",
              "addressRegion": "Baja California Sur",
              "addressCountry": "MX"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "22.8905",
              "longitude": "-109.9167"
            },
            "priceRange": "$60-$1200",
            "openingHours": "Mo-Su 00:00-23:59",
            "areaServed": {
              "@type": "City",
              "name": "Cabo San Lucas"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Handyman Services Cabo San Lucas",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Toilet Installation Cabo San Lucas",
                    "description": "Professional toilet installation and replacement service in Cabo San Lucas",
                    "provider": {
                      "@type": "LocalBusiness",
                      "name": "Cabos Handyman"
                    }
                  },
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": "200",
                    "priceCurrency": "USD"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Toilet Unclogging Cabo San Lucas",
                    "description": "Emergency drain cleaning and unclogging service in Cabo San Lucas. Available 24/7. $60 service call covers most clogs.",
                    "provider": {
                      "@type": "LocalBusiness",
                      "name": "Cabos Handyman"
                    }
                  },
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": "60",
                    "priceCurrency": "USD"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Ceiling Fan Installation Cabo San Lucas",
                    "description": "Professional ceiling fan installation service in Cabo San Lucas",
                    "provider": {
                      "@type": "LocalBusiness",
                      "name": "Cabos Handyman"
                    }
                  },
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": "180",
                    "priceCurrency": "USD"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Kitchen Remodeling Cabo San Lucas",
                    "description": "Complete kitchen remodeling service including cabinets, countertops, plumbing, and electrical",
                    "provider": {
                      "@type": "LocalBusiness",
                      "name": "Cabos Handyman"
                    }
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-20">
        {/* SEO Header - Hidden but crawlable */}
        <div className="sr-only">
          <h1>Handyman Services Cabo San Lucas - Professional Home Repair & Maintenance</h1>
          <p>Licensed handyman serving Cabo San Lucas with 70+ services including plumbing, electrical, painting, kitchen & bathroom remodeling, toilet unclogging, drain cleaning, and emergency repairs. Transparent pricing starting at $60. Available 24/7.</p>
        </div>

        {/* Visible Header */}
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white py-16 px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Complete Service Menu & Pricing</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Transparent pricing for all handyman services in Cabo San Lucas<br />
            $60 service call includes first hour of labor
          </p>
        </div>

        {/* Service Categories */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { name: 'Modern Kitchen', icon: '🍳', description: 'Plumbing, electrical, installation' },
              { name: 'Luxury Bathroom', icon: '🛁', description: 'Toilet unclogging, installation, tile' },
              { name: 'Commercial Office', icon: '🏢', description: 'Office buildout, electrical, HVAC' },
              { name: 'Community Center', icon: '🏘️', description: 'Maintenance, facility repairs, safety' },
              { name: 'Restaurant Buildout', icon: '🍽️', description: 'Commercial kitchen, compliance' },
              { name: 'Home Addition', icon: '🏠', description: 'Construction, emergency plumbing, basics' }
            ].map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedProject(category.name);
                  setIsMenuOpen(true);
                }}
                className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-left ${
                  selectedProject === category.name ? 'ring-2 ring-teal-500' : ''
                }`}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-teal-500 text-white rounded-xl p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">Need a Custom Quote?</h3>
            <p className="text-lg mb-6">Call us for a free estimate on your specific project</p>
            <a
              href="tel:+526121698328"
              className="inline-block bg-white text-teal-600 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition-colors"
            >
              Call +52 612 169 8328
            </a>
          </div>
        </div>

        <ServiceMenuPopup
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          projectType={selectedProject}
        />
      </div>
    </>
  );
}
