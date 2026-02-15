import { lazy, useState } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Home, Package, Clock, Users, ArrowRight, ChevronDown, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Footer = lazy(() => import('@/components/Footer'));

export default function PropertySetupCabo() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

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
        "latitude": "22.8866974",
        "longitude": "-109.9139710"
      },
      "telephone": "+52-612-169-8328",
      "priceRange": "$500-$2000",
      "openingHours": "Mo-Su 00:00-23:59",
      "sameAs": [
        "https://maps.app.goo.gl/hJRcahhtYjF5tkv4A",
        "https://www.facebook.com/share/19wvxoz8Cy/"
      ]
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Cabo San Lucas"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Los Cabos"
      }
    ],
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
        geoPosition="22.8866974;-109.9139710"
        schemaMarkup={schemaMarkup}
      />

      <Navigation />

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
             All plans can be tailored to your property’s needs. 
            </p>
            <div className="grid md:grid-cols-3 gap-6">

              {/* Studio Package */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-teal-500 transition-colors">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Studio/1BR</h3>
                  <div className="text-4xl font-bold text-teal-600 mb-2">$300-$500</div>
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
                  <div className="text-4xl font-bold mb-2">$500-$800</div>
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
                  <div className="text-4xl font-bold text-teal-600 mb-2">$800-$1,200</div>
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

          {/* FAQ Section */}
          <div className="mb-12">
            <button
              onClick={() => setIsFaqOpen(!isFaqOpen)}
              className="w-full flex items-center justify-between mb-6 hover:opacity-80 transition-opacity"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                Frequently Asked Questions About Property Setup in Cabo
              </h2>
              <ChevronDown
                size={32}
                className={`text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                  isFaqOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isFaqOpen && (
            <div className="max-w-3xl mx-auto space-y-4">

              {/* FAQ 1 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenQuestion(openQuestion === 'faq1' ? null : 'faq1')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    How long does property setup take in Cabo San Lucas?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-teal-600 transition-transform ${openQuestion === 'faq1' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq1' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Most property setups are completed in <strong>1-2 days</strong> depending on the package and property size:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mb-3 ml-4">
                      <li><strong>Studio/1BR ($500-800):</strong> Typically completed in 4-6 hours (same day or split across 2 half-days)</li>
                      <li><strong>2-3 Bedroom ($800-1,200):</strong> Usually requires 8-12 hours (1-2 full days depending on furniture complexity)</li>
                      <li><strong>3BR+/Villa ($1,200-2,000):</strong> Generally needs 12-16+ hours (1.5-2 days for large estates)</li>
                    </ul>
                    <p className="mb-3">
                      <strong>What affects timing:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                      <li>Furniture complexity (IKEA vs custom pieces)</li>
                      <li>Number of ceiling fans and TVs to mount</li>
                      <li>Whether furniture is already delivered or needs coordination</li>
                      <li>Additional services like shopping assistance</li>
                    </ul>
                    <p>
                      We coordinate around your schedule and can split work across multiple days if needed. For urgent move-ins, we can mobilize a larger team to complete setup in a single day. Call <a href="tel:+526121698328" className="text-teal-600 hover:underline font-medium">+52 612 169 8328</a> to discuss your timeline.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 2 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenQuestion(openQuestion === 'faq2' ? null : 'faq2')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    Do you help with furniture shopping in Cabo?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-teal-600 transition-transform ${openQuestion === 'faq2' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq2' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      <strong>Yes! Shopping assistance is included in our 2BR+ packages and available as an add-on for smaller packages.</strong>
                    </p>
                    <p className="mb-3">
                      <strong>What we help with:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-2 mb-3 ml-4">
                      <li><strong>Furniture sourcing:</strong> We know the best local stores for every budget—from affordable options at Coppel and Elektra to higher-end pieces at Liverpool and local furniture makers</li>
                      <li><strong>Essentials shopping:</strong> Bedding, kitchenware, bath supplies, cleaning products—we can purchase and deliver everything you need</li>
                      <li><strong>Home Depot Cabo runs:</strong> Hardware, tools, organizational items, outdoor furniture</li>
                      <li><strong>Appliance shopping:</strong> Refrigerators, washers, dryers, microwaves from local retailers</li>
                      <li><strong>Decorative items:</strong> Artwork, mirrors, plants, and finishing touches from local artisan markets</li>
                    </ul>
                    <p className="mb-3">
                      <strong>How it works:</strong> You can provide a shopping list, budget, and preferences. We'll either take you to stores (if you're in Cabo) or shop on your behalf and send photos for approval before purchasing. All receipts are provided, and we only charge for our time—no markup on purchases.
                    </p>
                    <p>
                      This service saves expats and remote owners days of searching unfamiliar stores. We know exactly where to find quality items at good prices in Los Cabos.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 3 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenQuestion(openQuestion === 'faq3' ? null : 'faq3')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    Can you set up my property if I'm not in Cabo yet?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-teal-600 transition-transform ${openQuestion === 'faq3' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq3' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      <strong>Absolutely! Most of our property setup clients are NOT in Cabo during installation.</strong> This is one of our most popular services for expats relocating from the US/Canada and remote vacation rental owners.
                    </p>
                    <p className="mb-3">
                      <strong>How we handle remote setups:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-2 mb-3 ml-4">
                      <li><strong>Key coordination:</strong> We work with your property manager, HOA, real estate agent, or lockbox to access the property securely</li>
                      <li><strong>Delivery coordination:</strong> We receive furniture deliveries, verify items match your orders, and report any damages immediately</li>
                      <li><strong>Photo documentation:</strong> We send before/during/after photos via WhatsApp or email so you can see progress in real-time</li>
                      <li><strong>Video walkthroughs:</strong> Upon completion, we provide a video walkthrough showing every room, installed item, and feature</li>
                      <li><strong>Shopping on your behalf:</strong> If you need items purchased, we buy, photograph for approval, and install</li>
                    </ul>
                    <p className="mb-3">
                      <strong>Communication:</strong> We communicate via WhatsApp, email, phone, or video call—whatever you prefer. Our bilingual team ensures clear communication in English or Spanish throughout the process.
                    </p>
                    <p>
                      <strong>Result:</strong> You arrive in Cabo to a fully furnished, move-in ready home without lifting a finger. Many clients arrive, unlock the door, and immediately relax by the pool. Call <a href="tel:+526121698328" className="text-teal-600 hover:underline font-medium">+52 612 169 8328</a> to discuss remote setup logistics.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 4 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenQuestion(openQuestion === 'faq4' ? null : 'faq4')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    What's included vs. not included in setup packages?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-teal-600 transition-transform ${openQuestion === 'faq4' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq4' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      <strong>✅ INCLUDED in all packages:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                      <li>All labor for furniture assembly, TV mounting, ceiling fan installation</li>
                      <li>All tools and equipment (drills, levels, stud finders, etc.)</li>
                      <li>Basic hardware (screws, anchors, cable ties for wire management)</li>
                      <li>Delivery coordination and scheduling</li>
                      <li>Furniture placement and room arrangement</li>
                      <li>Cleanup and packaging removal/disposal</li>
                      <li>Photo documentation of completed work</li>
                    </ul>
                    <p className="mb-3">
                      <strong>❌ NOT INCLUDED (but available as add-ons):</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                      <li><strong>Furniture itself:</strong> You purchase/ship furniture; we assemble and install it</li>
                      <li><strong>TVs and ceiling fans:</strong> You provide; we mount/install (or we can shop for you)</li>
                      <li><strong>Specialized mounts:</strong> Articulating TV mounts, outdoor TV enclosures (we can source and install)</li>
                      <li><strong>Electrical work beyond basic:</strong> New circuits, outlet additions, hard-wiring (we can do this, but it's quoted separately)</li>
                      <li><strong>Plumbing:</strong> New fixture installations, water line additions (also available, quoted separately)</li>
                      <li><strong>Painting or wall repairs:</strong> If assembly requires wall prep work (extra charges apply)</li>
                    </ul>
                    <p>
                      <strong>Transparent pricing:</strong> We provide detailed quotes breaking down what's included. Any add-ons or additional work discovered during setup requires your approval before proceeding. No surprise charges.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 5 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenQuestion(openQuestion === 'faq5' ? null : 'faq5')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    Do you install furniture from IKEA, Amazon, Wayfair, etc.?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-teal-600 transition-transform ${openQuestion === 'faq5' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq5' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      <strong>Yes! We assemble furniture from ANY retailer or manufacturer:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-2 mb-3 ml-4">
                      <li><strong>IKEA:</strong> One of our specialties. We've assembled hundreds of IKEA furniture pieces and know all the quirks and shortcuts</li>
                      <li><strong>Wayfair, Amazon, Overstock:</strong> Common for US buyers shipping to Cabo. We handle all box sizes and complexity levels</li>
                      <li><strong>Costco, Home Depot, Lowe's:</strong> Outdoor furniture, storage systems, office furniture</li>
                      <li><strong>Local Cabo retailers:</strong> Liverpool, Coppel, Elektra, Mueblerías (local furniture stores)</li>
                      <li><strong>Custom/artisan furniture:</strong> Locally made pieces that require assembly or installation</li>
                    </ul>
                    <p className="mb-3">
                      <strong>Important notes for importing furniture to Cabo:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                      <li>Many US retailers (IKEA, Wayfair) don't ship directly to Mexico. You'll need to ship to a US address and use a freight forwarder or bring it yourself</li>
                      <li>Mexican customs may charge import duties (typically 16-19% for personal goods)</li>
                      <li>We can recommend reliable freight forwarders who specialize in Cabo deliveries</li>
                      <li>Local Cabo retailers often have similar items at competitive prices without import hassles</li>
                    </ul>
                    <p>
                      We're experienced with assembly instructions in multiple languages and can handle even the most complex flat-pack furniture. Send us photos of what you're buying, and we'll confirm compatibility.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 6 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenQuestion(openQuestion === 'faq6' ? null : 'faq6')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    Is property setup service good for vacation rentals?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-teal-600 transition-transform ${openQuestion === 'faq6' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq6' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      <strong>Property setup is PERFECT for vacation rentals—it's one of our most popular services for Airbnb/VRBO owners.</strong>
                    </p>
                    <p className="mb-3">
                      <strong>Why vacation rental owners love this service:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-2 mb-3 ml-4">
                      <li><strong>Fast time-to-market:</strong> Get your rental guest-ready in 1-2 days instead of 1-2 weeks of DIY struggle. Start earning rental income immediately</li>
                      <li><strong>Professional presentation:</strong> Properly mounted TVs, secure ceiling fans, and expertly assembled furniture create the 5-star guest experience that drives bookings</li>
                      <li><strong>Remote ownership:</strong> 80% of Cabo vacation rental owners live in the US/Canada. We handle everything remotely with photo/video documentation</li>
                      <li><strong>Guest safety:</strong> Properly secured furniture (especially in earthquake-prone Baja), code-compliant electrical, and professional ceiling fan installation prevent guest injuries</li>
                      <li><strong>Turnkey service:</strong> We can furnish the ENTIRE rental from scratch—shopping, delivery, assembly, staging—ready for professional photos</li>
                    </ul>
                    <p className="mb-3">
                      <strong>Vacation rental-specific add-ons:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                      <li>Outdoor furniture assembly (patio sets, loungers, umbrellas)</li>
                      <li>Safe installation for guest valuables</li>
                      <li>Welcome book creation and printed materials</li>
                      <li>Lockbox installation for self-check-in</li>
                      <li>Smart lock and security camera installation</li>
                    </ul>
                    <p>
                      <strong>After setup, stay protected:</strong> Property Care Plan members ($99-299/month) receive ongoing maintenance to keep your rental in perfect condition. Call <a href="tel:+526121698328" className="text-teal-600 hover:underline font-medium">+52 612 169 8328</a> to discuss vacation rental setup packages.
                    </p>
                  </div>
                )}
              </div>

            </div>
            )}
          </div>

          {/* Property Care Plans CTA */}
          <div className="mb-12 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-4">
                  <Shield className="text-purple-600" size={20} />
                  <span className="text-purple-900 font-semibold text-sm">KEEP YOUR PROPERTY PERFECT</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Property Care Plans:<br />Ongoing Maintenance After Setup
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed">
                  You've invested in professional setup, now protect your property with regular maintenance. Property Care members get priority service, monthly inspections, and catch small issues before they become expensive problems.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">

                {/* Basic Care - $99/mo */}
                <div className="bg-white rounded-xl p-6 border-2 border-orange-300 shadow-lg">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-orange-600 mb-1">$99/mo</div>
                    <div className="text-sm text-gray-600">Basic Care</div>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>Monthly property inspection</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>1 FREE repair/month</strong> ($60 value)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>15% discount</strong> on all repairs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>Priority 4-hour emergency response</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-xs text-gray-500 italic">Perfect for full-time residents</p>
                </div>

                {/* Premium Care - $199/mo - HIGHLIGHTED */}
                <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-xl p-6 shadow-xl transform scale-105 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </div>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-white mb-1">$199/mo</div>
                    <div className="text-sm text-cyan-100">Premium Care</div>
                  </div>
                  <ul className="space-y-3 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>Bi-monthly inspections</strong> (every 2 weeks)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>2 FREE repairs/month</strong> ($120 value)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>20% discount</strong> on repairs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span>24/7 emergency service (2-hour response)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span>Photo reports + quarterly maintenance</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-xs text-cyan-100 italic">Best for vacation rentals</p>
                </div>

                {/* Elite Care - $299/mo */}
                <div className="bg-white rounded-xl p-6 border-2 border-purple-300 shadow-lg">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-purple-600 mb-1">$299/mo</div>
                    <div className="text-sm text-gray-600">Elite Care</div>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>Weekly inspections</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>UNLIMITED repairs</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>25% discount</strong> on major work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>VIP 1-hour emergency response</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>Dedicated technician + concierge service</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-xs text-gray-500 italic">Ideal for luxury properties</p>
                </div>

              </div>

              {/* ROI Example */}
              <div className="bg-white rounded-lg p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3 text-center">Protect Your Setup Investment</h3>
                <p className="text-center text-gray-700 text-sm mb-4">
                  You just spent $500-2,000 setting up your property professionally. Property Care ensures it stays that way with regular inspections catching loose ceiling fan mounts, furniture wear, and potential damage before it becomes expensive.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">Without Property Care:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Furniture loosens/breaks: $200-500 to replace</li>
                      <li>• TV mount fails: $300-800 damage + replacement</li>
                      <li>• Unnoticed leaks: $1,000-5,000 damage</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">With Premium Care ($199/mo):</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Catch loose mounts during bi-monthly inspections</li>
                      <li>• Fix small issues immediately (FREE repairs included)</li>
                      <li>• <strong>Prevent thousands in damage</strong></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <a
                  href="/property-care-plans"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-xl"
                >
                  <Shield size={20} />
                  View All Property Care Plans & Pricing
                  <ArrowRight size={20} />
                </a>
                <p className="mt-4 text-sm text-gray-600">
                  Questions? Call <a href="tel:+526121698328" className="text-purple-600 hover:underline font-medium">+52 612 169 8328</a> to discuss which plan protects your property best.
                </p>
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
