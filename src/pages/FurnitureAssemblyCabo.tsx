import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Package, Wrench, Clock, ArrowRight, Shield } from 'lucide-react';

const Footer = lazy(() => import('@/components/Footer'));

export default function FurnitureAssemblyCabo() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Furniture Assembly Service",
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
      "priceRange": "$60+",
      "openingHours": "Mo-Su 00:00-23:59"
    },
    "areaServed": {
      "@type": "City",
      "name": "Cabo San Lucas"
    }
  };

  return (
    <>
      <SEO
        title="Furniture Assembly Cabo San Lucas | IKEA & Wayfair Assembly | Cabos Handyman"
        description="Professional furniture assembly service in Cabo San Lucas. Expert assembly for IKEA, Wayfair, Amazon, and all furniture brands. Same-day service available. Starting at $60."
        canonicalUrl="/furniture-assembly-cabo"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8905;-109.9167"
        schemaMarkup={schemaMarkup}
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-600 to-orange-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Package size={20} />
              <span className="text-sm font-medium">Expert Furniture Assembly</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Professional Furniture Assembly in Cabo San Lucas
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Skip the frustration of confusing instructions and missing parts. Expert assembly for IKEA, Wayfair, Amazon, and all furniture brands. Same-day service available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                Book Assembly Service <ArrowRight size={20} />
              </a>
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-400 transition-colors"
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
              Ordering furniture online to Cabo San Lucas is convenient until you realize it arrives in 47 pieces with instructions in three languages—none of which make sense. Whether you're an expat setting up your new home, a vacation rental owner furnishing a property, or simply don't have the time or tools for assembly, professional furniture assembly service saves hours of frustration.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With over 20 years serving Los Cabos and thousands of furniture pieces assembled, our bilingual team (English/Spanish) expertly handles everything from simple nightstands to complex bedroom sets, outdoor furniture, and office workstations. You relax while we handle the heavy lifting, confusing instructions, and precise assembly.
            </p>
          </div>

          {/* Why DIY Assembly Fails */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 border-l-4 border-orange-600 p-8 rounded-lg mb-12 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Wrench className="text-orange-600" size={28} />
              Why DIY Furniture Assembly Usually Goes Wrong
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-gray-900 mb-2">Common Frustrations:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 flex-shrink-0">•</span>
                    <span>Instructions that make no sense (especially IKEA's wordless diagrams)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 flex-shrink-0">•</span>
                    <span>Missing or wrong hardware pieces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 flex-shrink-0">•</span>
                    <span>Tools you don't own (hex keys, Allen wrenches, specialty screwdrivers)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 flex-shrink-0">•</span>
                    <span>Heavy lifting that requires 2+ people</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-2">What Actually Happens:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 flex-shrink-0">•</span>
                    <span>4 hours wasted on a "simple" dresser</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 flex-shrink-0">•</span>
                    <span>Stripped screws from wrong tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 flex-shrink-0">•</span>
                    <span>Wobbly furniture from incorrect assembly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 flex-shrink-0">•</span>
                    <span>Back pain from awkward positions</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 font-semibold mt-4">
              <strong>Professional Solution:</strong> We assemble a typical dresser in 45 minutes. Complex bedroom sets? 2-3 hours. You use that time to actually enjoy your day in Cabo.
            </p>
          </div>

          {/* What We Assemble */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Furniture We Expertly Assemble</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Bedroom Furniture</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Bed frames (all sizes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Dressers and nightstands</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Wardrobes and armoires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Headboards and footboards</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Living Room</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>TV stands and entertainment centers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Coffee tables and end tables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Bookshelves and display units</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Storage ottomans</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Dining & Kitchen</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Dining tables and chairs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Kitchen islands and carts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Bar stools and benches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Buffets and sideboards</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Office Furniture</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Desks and workstations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Office chairs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Filing cabinets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Bookcases and shelving</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Outdoor Furniture</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Patio sets and loungers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Outdoor dining sets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Umbrellas and shade structures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Storage benches</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Specialty Items</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Baby cribs and changing tables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Gym equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Pet furniture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Custom modular systems</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Brands We Assemble */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Major Brands</h2>
            <p className="text-gray-600 mb-6">We expertly assemble furniture from:</p>
            <div className="flex flex-wrap justify-center gap-4 text-lg font-semibold text-gray-700">
              <span className="bg-gray-100 px-6 py-3 rounded-lg">IKEA</span>
              <span className="bg-gray-100 px-6 py-3 rounded-lg">Wayfair</span>
              <span className="bg-gray-100 px-6 py-3 rounded-lg">Amazon</span>
              <span className="bg-gray-100 px-6 py-3 rounded-lg">Ashley Furniture</span>
              <span className="bg-gray-100 px-6 py-3 rounded-lg">Costco</span>
              <span className="bg-gray-100 px-6 py-3 rounded-lg">Target</span>
              <span className="bg-gray-100 px-6 py-3 rounded-lg">West Elm</span>
              <span className="bg-gray-100 px-6 py-3 rounded-lg">Pottery Barn</span>
              <span className="bg-gray-100 px-6 py-3 rounded-lg">+ All Others</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Simple, Transparent Pricing</h2>
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-8 max-w-2xl mx-auto border border-orange-200">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-orange-600 mb-2">$60</div>
                <p className="text-gray-600">Service call includes diagnosis and first hour of assembly</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Additional hours charged at competitive hourly rate</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Most single furniture pieces: $60-120 total</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Complex bedroom sets: $150-300</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Multiple pieces? Ask about package pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">All tools and hardware included</span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm text-center italic">
                For complete property setups with multiple furniture pieces, check our <a href="/property-setup-cabo" className="text-orange-600 hover:underline font-medium">Property Setup Packages</a>.
              </p>
            </div>
          </div>

          {/* Why Choose Professional Assembly */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Choose Professional Assembly?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Clock className="text-orange-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Save Hours of Time</h3>
                  <p className="text-gray-600">What takes you 4 frustrating hours takes us 45 minutes. Spend your Cabo time on the beach, not with an Allen wrench.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Shield className="text-orange-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Done Right the First Time</h3>
                  <p className="text-gray-600">Proper assembly means sturdy, stable furniture that lasts. No wobbly dressers or stripped screws from wrong tools.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Wrench className="text-orange-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Professional Tools</h3>
                  <p className="text-gray-600">We bring all necessary tools, including specialty equipment for complex assemblies. No last-minute hardware store trips.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Package className="text-orange-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Cleanup Included</h3>
                  <p className="text-gray-600">We remove all packaging materials, boxes, and plastic. You're left with beautiful furniture, not piles of cardboard.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skip the Frustration. We'll Handle Assembly.</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Same-day service available for most furniture assembly jobs in Cabo San Lucas. Get your instant quote now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Book Assembly Now <ArrowRight size={20} />
              </a>
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-400 transition-colors"
              >
                Call: +52 612 169 8328
              </a>
            </div>
            <p className="text-orange-100 mt-6 text-sm">
              Same-Day Service Available • Bilingual Team • 20+ Years Experience • Licensed & Insured
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
