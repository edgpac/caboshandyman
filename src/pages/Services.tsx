import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, Star, Droplet, Wrench, ArrowRight, Shield } from 'lucide-react';
import ServiceMenuPopup from '../components/ServiceMenuPopup';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function ServicesPage() {
  const [selectedProject, setSelectedProject] = React.useState<string>('Modern Kitchen');
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

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
              "latitude": "22.8866974",
              "longitude": "-109.9139710"
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

      <Navigation />

      <div className="min-h-screen bg-gray-50">
        {/* SEO Header - Hidden but crawlable */}
        <div className="sr-only">
          <h1>Handyman Services Cabo San Lucas - Professional Home Repair & Maintenance</h1>
          <p>Licensed handyman serving Cabo San Lucas with 70+ services including plumbing, electrical, painting, kitchen & bathroom remodeling, toilet unclogging, drain cleaning, and emergency repairs. Transparent pricing starting at $60. Available 24/7.</p>
        </div>

        {/* Visible Header */}
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white py-16 px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Service Menu & Pricing</h2>
          <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 mt-4 sm:mt-6">
            {/* Main Subtitle */}
            <p className="text-xl sm:text-2xl text-white font-semibold mb-3 sm:mb-4">
              Pricing Reference Guide
            </p>

            {/* Description Lines */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                Browse our most common services and starting prices below.
              </p>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                <a
                  href="tel:+526121698328"
                  className="text-white font-bold hover:underline transition-all"
                >
                  Call us
                </a>
                {' '}for a personalized quote based on your project or issue.
              </p>
            </div>

            {/* Service Call Pricing - Highlighted */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 sm:px-6 sm:py-4 border border-white/20 mb-3 sm:mb-4">
              <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                Handyman service calls starting at $60 for most repairs.<br className="hidden sm:inline" />
                <span className="block sm:inline"> (free estimate: <a
                  href="tel:+526121698328"
                  className="font-semibold hover:underline transition-all cursor-pointer"
                >
                  +52 612 169 8328
                </a>)</span>
              </p>
            </div>

            {/* Services Not Limited Note */}
            <p className="text-sm sm:text-base text-white/80 font-medium">
              Services not limited to this list
            </p>
          </div>
        </div>

        {/* Service Categories */}
        <div className="container mx-auto px-4 py-12">
          {/* Featured Service Cards */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Featured Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
              <Link
                to="/property-setup-cabo"
                className="bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-500 rounded-lg p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-teal-500 w-12 h-12 rounded-full flex items-center justify-center">
                    <Home className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-teal-600 transition-colors">Property Setup</h3>
                </div>
                <p className="text-gray-600 mb-3">Complete move-in ready service. Furniture assembly, TV mounting, ceiling fans.</p>
                <p className="text-teal-600 font-semibold text-sm">Packages from $500</p>
                <div className="flex items-center gap-1 text-teal-600 font-semibold text-sm mt-3">
                  <span>Learn More</span>
                  <ArrowRight size={14} />
                </div>
              </Link>

              <Link
                to="/vacation-rental-setup-cabo"
                className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 rounded-lg p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center">
                    <Star className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">Rental Service</h3>
                </div>
                <p className="text-gray-600 mb-3">Airbnb & VRBO maintenance contracts. Protect your 5-star rating.</p>
                <p className="text-blue-600 font-semibold text-sm">From $250/month</p>
                <div className="flex items-center gap-1 text-blue-600 font-semibold text-sm mt-3">
                  <span>Learn More</span>
                  <ArrowRight size={14} />
                </div>
              </Link>

              <Link
                to="/plumber-cabo-san-lucas"
                className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-500 rounded-lg p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-cyan-500 w-12 h-12 rounded-full flex items-center justify-center">
                    <Droplet className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-cyan-600 transition-colors">Plumber 24/7</h3>
                </div>
                <p className="text-gray-600 mb-3">Emergency plumbing service. 30-minute response time for urgent situations.</p>
                <p className="text-cyan-600 font-semibold text-sm">Starting at $60</p>
                <div className="flex items-center gap-1 text-cyan-600 font-semibold text-sm mt-3">
                  <span>Learn More</span>
                  <ArrowRight size={14} />
                </div>
              </Link>

              <Link
                to="/property-care-plans"
                className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-500 rounded-lg p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center">
                    <Shield className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-purple-600 transition-colors">Property Care</h3>
                </div>
                <p className="text-gray-600 mb-3">Preventive maintenance plans. FREE monthly unclog included!</p>
                <p className="text-purple-600 font-semibold text-sm">From $99/month</p>
                <div className="flex items-center gap-1 text-purple-600 font-semibold text-sm mt-3">
                  <span>View Plans</span>
                  <ArrowRight size={14} />
                </div>
              </Link>

              <Link
                to="/handyman-cabo-san-lucas"
                className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-400 rounded-lg p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gray-600 w-12 h-12 rounded-full flex items-center justify-center">
                    <Wrench className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-gray-700 transition-colors">All Services</h3>
                </div>
                <p className="text-gray-600 mb-3">Complete handyman services. 20+ years experience, 600+ projects completed.</p>
                <p className="text-gray-700 font-semibold text-sm">View All Services</p>
                <div className="flex items-center gap-1 text-gray-700 font-semibold text-sm mt-3">
                  <span>Learn More</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            </div>
          </div>

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
            <p className="text-lg mb-6">Call us for a free estimate on your project or issue</p>
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

      <Footer />
    </>
  );
}
