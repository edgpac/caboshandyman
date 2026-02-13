import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Monitor, Wrench, Shield, ArrowRight, Zap } from 'lucide-react';

const Footer = lazy(() => import('@/components/Footer'));

export default function TVMountingCabo() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "TV Mounting and Installation",
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
        "latitude": "22.8866974",
        "longitude": "-109.9139710"
      },
      "telephone": "+52-612-169-8328",
      "priceRange": "$60+",
      "openingHours": "Mo-Su 00:00-23:59",
      "sameAs": [
        "https://maps.app.goo.gl/hJRcahhtYjF5tkv4A",
        "https://www.facebook.com/share/19wvxoz8Cy/"
      ]
    },
    "areaServed": {
      "@type": "City",
      "name": "Cabo San Lucas"
    }
  };

  return (
    <>
      <SEO
        title="TV Mounting Cabo San Lucas | Professional TV Installation | Cabos Handyman"
        description="Expert TV mounting and installation service in Cabo San Lucas. Professional wall mounting with concealed wiring for all TV sizes. Same-day service available. Starting at $60."
        canonicalUrl="/tv-mounting-cabo"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
        schemaMarkup={schemaMarkup}
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Monitor size={20} />
              <span className="text-sm font-medium">Professional TV Mounting</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Expert TV Mounting Service in Cabo San Lucas
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Professional wall mounting with concealed wiring for all TV sizes. Perfect installation every time. Same-day service available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                Schedule TV Mounting <ArrowRight size={20} />
              </a>
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-purple-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-400 transition-colors"
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
              That expensive 65" TV deserves more than a wobbly mount and tangled wires hanging down the wall. Whether you're setting up a home theater, outfitting a vacation rental, or upgrading your bedroom, professional TV mounting service ensures perfect placement, secure installation, and clean concealed wiring that looks like it was built into the home.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With over 20 years serving Los Cabos and thousands of TVs professionally mounted, our bilingual team (English/Spanish) handles all TV sizes, all wall types (drywall, concrete, stucco), and complex wiring situations. Same-day service available for most installations.
            </p>
          </div>

          {/* Why DIY Mounting Fails */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-600 p-8 rounded-lg mb-12 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Shield className="text-red-600" size={28} />
              Why DIY TV Mounting Usually Goes Wrong
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <p className="font-bold text-gray-900 mb-2">Common DIY Mistakes:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">❌</span>
                    <span>TV mounted at wrong height (too high = neck pain)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">❌</span>
                    <span>Not finding studs properly (TV falls off wall)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">❌</span>
                    <span>Wrong anchors for wall type</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">❌</span>
                    <span>Cables hanging down the wall (ugly!)</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-2">Costly Consequences:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">💸</span>
                    <span>Damaged wall from incorrect mounting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">💸</span>
                    <span>Cracked TV screen from improper installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">💸</span>
                    <span>TV falling and destroying both TV and wall</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">💸</span>
                    <span>Hours of frustration and back pain</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 font-semibold">
              <strong>Professional Installation:</strong> We mount your TV at the perfect ergonomic height, securely anchored to studs or concrete, with all wiring concealed inside the wall. Installation time: 45-90 minutes depending on complexity.
            </p>
          </div>

          {/* Services Included */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete TV Mounting Service</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Monitor className="text-purple-600" size={24} />
                  Professional Wall Mounting
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>All TV sizes (32" to 85"+)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>Fixed, tilting, or full-motion mounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>Perfect height and viewing angle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>Stud-finding and secure anchoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>Level installation guaranteed</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="text-purple-600" size={24} />
                  Cable Management & Wiring
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>Concealed in-wall wiring (looks professional)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>Power outlet installation behind TV</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>HDMI, audio, and component cable routing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>Soundbar or speaker mounting included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>Clean, organized media setup</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Wrench className="text-purple-600" size={24} />
                  All Wall Types Supported
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>Standard drywall with studs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>Concrete and masonry walls (common in Cabo)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>Stucco exterior walls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>Tile and stone feature walls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>Specialty anchors for each surface</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-purple-600" size={24} />
                  Setup & Testing
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>TV connected to all devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>Sound system configuration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>Streaming device setup (Roku, Apple TV, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>Full functionality testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={18} />
                    <span>Remote control programming</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Ideal Applications */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Perfect For</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center bg-gray-50 rounded-lg p-6">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="text-purple-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Living Rooms</h3>
                <p className="text-gray-600 text-sm">Home theater and entertainment centers</p>
              </div>
              <div className="text-center bg-gray-50 rounded-lg p-6">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="text-purple-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Bedrooms</h3>
                <p className="text-gray-600 text-sm">Perfect viewing angle from bed</p>
              </div>
              <div className="text-center bg-gray-50 rounded-lg p-6">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="text-purple-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Vacation Rentals</h3>
                <p className="text-gray-600 text-sm">Guest-ready entertainment setup</p>
              </div>
              <div className="text-center bg-gray-50 rounded-lg p-6">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="text-purple-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Outdoor Spaces</h3>
                <p className="text-gray-600 text-sm">Weatherproof patio installations</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Transparent Pricing</h2>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 max-w-2xl mx-auto border border-purple-200">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-purple-600 mb-2">$60</div>
                <p className="text-gray-600">Starting price includes first hour of installation</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Basic TV mounting (smaller TVs, simple setup): $60-100</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Standard mounting with cable concealment: $120-180</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Large TVs (65"+) with full wiring: $180-250</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Concrete/masonry walls: add $30-50</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Soundbar mounting: add $30-60</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">New outlet installation: add $80-120</span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm text-center italic">
                Mount not included in price. We can supply professional-grade mounts at competitive prices or install yours.
              </p>
            </div>
          </div>

          {/* Why Professional Matters */}
          <div className="mb-12 bg-gray-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Professional TV Mounting Matters</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Safety First</h3>
                <p className="text-gray-600">
                  A 65" TV weighs 50-70 pounds. Improper mounting means it can fall, destroying the TV and potentially injuring someone. We use proper anchors rated for your TV's weight and wall type.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Perfect Viewing Experience</h3>
                <p className="text-gray-600">
                  Eye-level when seated is ideal. We calculate the perfect height based on your furniture, room size, and primary viewing position. No neck strain from TVs mounted too high.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Clean Aesthetic</h3>
                <p className="text-gray-600">
                  Concealed wiring looks professional and modern. No messy cables hanging down. Your TV looks like it was built into the wall, not an afterthought.
                </p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Perfect TV Installation?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Same-day TV mounting service available in Cabo San Lucas. Professional installation with concealed wiring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Schedule Mounting <ArrowRight size={20} />
              </a>
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-purple-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-400 transition-colors"
              >
                Call: +52 612 169 8328
              </a>
            </div>
            <p className="text-purple-100 mt-6 text-sm">
              Same-Day Service • All Wall Types • Bilingual Team • 20+ Years Experience • Licensed & Insured
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
