import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Home, Package, Clock, Users, ArrowRight } from 'lucide-react';

const Footer = lazy(() => import('@/components/Footer'));

export default function PropertySetupCabo() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Property Setup and Move-In Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Cabos Handyman",
      "image": "https://caboshandyman.com/CHLOGO.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Cabo San Lucas",
        "addressRegion": "BCS",
        "addressCountry": "MX"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "22.8905",
        "longitude": "-109.9167"
      },
      "telephone": "+52-612-169-8328",
      "priceRange": "$500-$2000",
      "openingHours": "Mo-Su 00:00-23:59"
    },
    "areaServed": {
      "@type": "City",
      "name": "Cabo San Lucas"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "500",
      "highPrice": "2000"
    }
  };

  return (
    <>
      <SEO
        title="Property Setup Cabo San Lucas | Move-In Ready Service | Cabos Handyman"
        description="Professional property setup service in Cabo San Lucas. Furniture assembly, TV mounting, ceiling fans, and complete move-in packages. Get your property ready in 1-2 days. Packages from $500."
        canonicalUrl="/property-setup-cabo"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8905;-109.9167"
        schemaMarkup={schemaMarkup}
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-teal-600 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Home size={20} />
              <span className="text-sm font-medium">Complete Property Setup Service</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Move-In Ready Property Setup in Cabo San Lucas
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              From empty condo to fully furnished home in 1-2 days. Professional furniture assembly, TV mounting, ceiling fans, and complete move-in packages for Cabo San Lucas properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                Get Free Quote <ArrowRight size={20} />
              </a>
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-teal-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-400 transition-colors"
              >
                Call Now: +52 612 169 8328
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">
              Moving to Cabo San Lucas should be exciting, not exhausting. Whether you're relocating from the US or Canada, setting up a vacation rental, or preparing a property for guests, our complete property setup service transforms empty spaces into move-in ready homes in just 1-2 days.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With over 20 years of experience serving Los Cabos, our bilingual team (English/Spanish) handles everything from furniture assembly and TV mounting to ceiling fan installation and complete property staging. You focus on enjoying paradise while we handle the heavy lifting.
            </p>
          </div>

          {/* Real Example Callout */}
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 border-l-4 border-teal-600 p-8 rounded-lg mb-12 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Package className="text-teal-600" size={28} />
              Recent Project: Complete Condo Setup
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>January 9th Move-In:</strong> Expat couple relocating from California needed their 2-bedroom Cabo condo fully furnished and ready before arrival. We completed:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                <span>Complete furniture assembly (bedroom sets, dining table, outdoor furniture)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                <span>3 ceiling fans installed (essential for Cabo's climate)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                <span>65" TV professionally mounted with concealed wiring</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                <span>Full-length mirrors and decorative wall panels installed</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                <span>Shopping assistance for local items (bedding, kitchenware, essentials)</span>
              </li>
            </ul>
            <p className="text-gray-700 font-semibold mt-4">
              Result: Keys to a fully furnished, move-in ready home. Total time: 1.5 days. Package price: $1,150.
            </p>
          </div>

          {/* Why Property Setup Service is Essential in Cabo */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Property Setup Service is Essential in Cabo San Lucas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Furniture Shipping Challenges</h3>
                <p className="text-gray-600">
                  Many expats and vacation rental owners ship furniture from the US or Canada, which arrives unassembled. Without local tools or experience navigating Mexican assembly instructions, what should take hours can take days of frustration.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Time Constraints</h3>
                <p className="text-gray-600">
                  Whether you're preparing for your own arrival or getting a rental ready for paying guests, time is money. Our professional team completes in 1-2 days what might take you a week or more.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Local Shopping Knowledge</h3>
                <p className="text-gray-600">
                  Don't know where to buy quality bedding, kitchenware, or home essentials in Cabo? Our team knows the best local stores for every budget, saving you hours of driving around unfamiliar areas.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Installation</h3>
                <p className="text-gray-600">
                  Ceiling fans, TV mounting, and mirror installations require proper tools and expertise. Incorrect installation can damage walls, void warranties, or create safety hazards in Cabo's climate.
                </p>
              </div>
            </div>
          </div>

          {/* Package Pricing */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Property Setup Packages</h2>
            <p className="text-center text-gray-600 mb-8 text-lg">
              Transparent pricing based on property size. All packages include labor, tools, and coordination.
            </p>
            <div className="grid md:grid-cols-3 gap-6">

              {/* Studio Package */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-teal-500 transition-colors">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Studio/1BR</h3>
                  <div className="text-4xl font-bold text-teal-600 mb-2">$500-$800</div>
                  <p className="text-gray-500">Perfect for smaller spaces</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">Bedroom furniture assembly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">1-2 ceiling fans installed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">TV mounting (up to 55")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">Basic wall installations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">4-6 hours of work</span>
                  </li>
                </ul>
                <a href="/contact" className="block w-full text-center bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                  Get Quote
                </a>
              </div>

              {/* 2BR Package */}
              <div className="bg-gradient-to-br from-teal-600 to-teal-700 border-2 border-teal-600 rounded-xl p-6 text-white transform scale-105 shadow-xl">
                <div className="bg-yellow-400 text-teal-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                  MOST POPULAR
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">2-3 Bedroom</h3>
                  <div className="text-4xl font-bold mb-2">$800-$1,200</div>
                  <p className="text-teal-100">Ideal for most properties</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>Complete furniture assembly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>3-4 ceiling fans installed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>Multiple TV mountings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>Mirrors, shelving, wall panels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>Shopping assistance included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>8-12 hours of work</span>
                  </li>
                </ul>
                <a href="/contact" className="block w-full text-center bg-white text-teal-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Get Quote
                </a>
              </div>

              {/* Large Property Package */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-teal-500 transition-colors">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">3BR+ / Villa</h3>
                  <div className="text-4xl font-bold text-teal-600 mb-2">$1,200-$2,000</div>
                  <p className="text-gray-500">Large homes & estates</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">Extensive furniture assembly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">5+ ceiling fans installed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">Multiple rooms setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">Outdoor furniture assembly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">Full shopping coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">12-16+ hours of work</span>
                  </li>
                </ul>
                <a href="/contact" className="block w-full text-center bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                  Get Quote
                </a>
              </div>
            </div>
          </div>

          {/* Ideal For Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Benefits from Property Setup Service?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-teal-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Expats Relocating</h3>
                <p className="text-gray-600 text-sm">Moving from US/Canada and need immediate setup</p>
              </div>
              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="text-teal-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Vacation Rental Owners</h3>
                <p className="text-gray-600 text-sm">Quick turnaround for new rental properties</p>
              </div>
              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="text-teal-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Property Investors</h3>
                <p className="text-gray-600 text-sm">Staging properties for sale or rent</p>
              </div>
              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-teal-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Busy Professionals</h3>
                <p className="text-gray-600 text-sm">Time-strapped owners who value convenience</p>
              </div>
            </div>
          </div>

          {/* Process Timeline */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Simple Process, Fast Results</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-bold text-gray-900 mb-2">Contact Us</h3>
                <p className="text-gray-600 text-sm">Call, WhatsApp, or email with your property details and timeline</p>
              </div>
              <div className="text-center">
                <div className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-bold text-gray-900 mb-2">Get Quote</h3>
                <p className="text-gray-600 text-sm">Receive transparent package pricing based on your property size</p>
              </div>
              <div className="text-center">
                <div className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-bold text-gray-900 mb-2">Schedule Setup</h3>
                <p className="text-gray-600 text-sm">We coordinate delivery dates and plan the complete installation</p>
              </div>
              <div className="text-center">
                <div className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                <h3 className="font-bold text-gray-900 mb-2">Move In Ready</h3>
                <p className="text-gray-600 text-sm">Your property is fully furnished and ready in 1-2 days</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make Your Cabo Property Move-In Ready?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Stop stressing about furniture assembly, TV mounting, and property setup. Get your complete package quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Request Free Quote <ArrowRight size={20} />
              </a>
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-teal-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-400 transition-colors"
              >
                Call: +52 612 169 8328
              </a>
            </div>
            <p className="text-teal-100 mt-6 text-sm">
              Serving Cabo San Lucas and all of Los Cabos • 20+ Years Experience • Bilingual Team • Licensed & Insured
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
