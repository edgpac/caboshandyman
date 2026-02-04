import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Home, Calendar, DollarSign, Star, ArrowRight, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Footer = lazy(() => import('@/components/Footer'));

export default function VacationRentalSetupCabo() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Vacation Rental Setup and Maintenance",
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
      "priceRange": "$250-$1000",
      "openingHours": "Mo-Su 00:00-23:59"
    },
    "areaServed": {
      "@type": "City",
      "name": "Cabo San Lucas"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "250",
      "highPrice": "1000"
    }
  };

  return (
    <>
      <SEO
        title="Vacation Rental Setup Cabo San Lucas | Airbnb & VRBO Maintenance | Cabos Handyman"
        description="Complete vacation rental setup and maintenance service in Cabo San Lucas. Turnover service, ongoing maintenance contracts, and emergency repairs for Airbnb and VRBO properties. Packages from $250/month."
        canonicalUrl="/vacation-rental-setup-cabo"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
        schemaMarkup={schemaMarkup}
      />

      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Home size={20} />
              <span className="text-sm font-medium">Vacation Rental Professionals</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Vacation Rental Setup & Maintenance in Los Cabos
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Keep your Airbnb and VRBO properties guest-ready with professional turnover service, ongoing maintenance contracts, and 24/7 emergency repairs. Maximize your 5-star reviews and rental income.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                Get Maintenance Quote <ArrowRight size={20} />
              </a>
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 transition-colors"
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
              Managing vacation rentals in Cabo San Lucas is profitable, but maintenance issues can destroy your 5-star rating overnight. One broken AC unit, clogged toilet, or malfunctioning ceiling fan during peak season can cost you thousands in lost bookings and negative reviews.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With over 20 years serving Cabo's vacation rental market, our bilingual team (English/Spanish) provides complete setup, turnover service, preventive maintenance contracts, and 24/7 emergency response. Focus on guest experience and bookings while we handle everything else.
            </p>
          </div>

          {/* Property Manager Pain Points */}
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 border-l-4 border-blue-600 p-8 rounded-lg mb-12 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Star className="text-blue-600" size={28} />
              The Real Cost of Vacation Rental Downtime
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Case Study:</strong> A property manager with 5 Cabo rentals contacted us after a disastrous month. Their previous handyman was unreliable, leading to:
            </p>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold flex-shrink-0">❌</span>
                <span>2-star review from guests who arrived to a broken AC (lost $3,200 in future bookings)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold flex-shrink-0">❌</span>
                <span>Emergency plumber charging 3x normal rates at midnight ($450 for a simple clog)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold flex-shrink-0">❌</span>
                <span>TV mounting done incorrectly, damaging the wall (repair + repainting: $280)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold flex-shrink-0">❌</span>
                <span>Hours spent coordinating multiple contractors instead of managing rentals</span>
              </li>
            </ul>
            <p className="text-gray-700 font-semibold">
              <strong>Our Solution:</strong> Monthly maintenance contract ($250/month per property) that includes preventive maintenance, priority emergency response, and turnover coordination. Their review rating recovered to 4.9 stars within 3 months, and they've added 3 more properties to their portfolio.
            </p>
          </div>

          {/* Services Overview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Vacation Rental Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Home className="text-blue-600" size={24} />
                  Initial Property Setup
                </h3>
                <p className="text-gray-600 mb-3">
                  Launching a new vacation rental? We handle complete property preparation:
                </p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Furniture assembly (beds, sofas, dining sets)</li>
                  <li>• TV mounting in bedrooms and living areas</li>
                  <li>• Ceiling fan installation (essential for Cabo climate)</li>
                  <li>• Mirror and artwork hanging</li>
                  <li>• Smart home device setup (locks, thermostats)</li>
                  <li>• Safety inspections (smoke detectors, CO detectors)</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="text-blue-600" size={24} />
                  Turnover & Deep Cleaning Coordination
                </h3>
                <p className="text-gray-600 mb-3">
                  Seamless guest transitions with maintenance checks during turnover:
                </p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• AC filter changes and system checks</li>
                  <li>• Plumbing inspections (toilets, showers, drains)</li>
                  <li>• Electrical safety checks</li>
                  <li>• Appliance functionality tests</li>
                  <li>• Pool equipment verification</li>
                  <li>• Door lock and window seal checks</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="text-blue-600" size={24} />
                  Preventive Maintenance Programs
                </h3>
                <p className="text-gray-600 mb-3">
                  Scheduled maintenance prevents expensive emergency repairs:
                </p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Monthly AC servicing (critical in Cabo heat)</li>
                  <li>• Quarterly plumbing inspections</li>
                  <li>• Electrical system safety audits</li>
                  <li>• Exterior paint and stucco condition checks</li>
                  <li>• Weatherproofing before rainy season</li>
                  <li>• Hurricane preparedness before storm season</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="text-blue-600" size={24} />
                  24/7 Emergency Response
                </h3>
                <p className="text-gray-600 mb-3">
                  Guests don't wait for business hours. Neither do we:
                </p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• 30-minute emergency response time</li>
                  <li>• AC failures (deadly in Cabo's summer heat)</li>
                  <li>• Plumbing emergencies (burst pipes, clogs)</li>
                  <li>• Electrical failures</li>
                  <li>• Lock and security issues</li>
                  <li>• Direct communication with guests (bilingual)</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Home className="text-blue-600" size={24} />
                  Window Screen Repair & Rescreening
                </h3>
                <p className="text-gray-600 mb-3">
                  Keep bugs out and ocean breeze flowing:
                </p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Torn or damaged screen replacement</li>
                  <li>• Salt air and UV damage repair</li>
                  <li>• Pet-resistant heavy-duty mesh available</li>
                  <li>• Standard and solar-blocking screen options</li>
                  <li>• Perfect for Cabo's harsh coastal environment</li>
                  <li>• Custom estimates based on quantity and size</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="text-blue-600" size={24} />
                  Custom Service Quotes
                </h3>
                <p className="text-gray-600 mb-3">
                  Every property and maintenance need is unique. We provide personalized estimates tailored to your specific requirements:
                </p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Custom pricing based on property size and needs</li>
                  <li>• Flexible service packages and scheduling</li>
                  <li>• Volume discounts for multiple properties</li>
                  <li>• Transparent estimates with no hidden fees</li>
                  <li>• Professional consultation included</li>
                  <li>• Same-day estimates available</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-700 font-semibold mb-3">Get Your Custom Quote:</p>
                  <div className="space-y-2">
                    <a href="tel:+526121698328" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                      <span>📞</span> +52 612 169 8328
                    </a>
                    <a href="mailto:loscabohandyman@gmail.com" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                      <span>✉️</span> loscabohandyman@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance Contract Pricing */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Flexible Maintenance Plans</h2>
            <p className="text-center text-gray-600 mb-8 text-lg">
              Predictable monthly pricing protects your rental income and guest satisfaction ratings.
            </p>
            <div className="grid md:grid-cols-3 gap-6">

              {/* Single Property */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-colors">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Single Property</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">$250</div>
                  <p className="text-gray-500">Per month</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">Monthly preventive maintenance visit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700"><strong>1 FREE drain unclog</strong> per month ($80 value)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">AC filter cleaning (monthly - prevents breakdowns)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">Window screen repair (up to 3 screens/month)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700"><strong>15% discount</strong> on all repairs</span>
                  </li>
                </ul>
                <p className="text-xs text-gray-500 italic mb-4">Perfect for single vacation rental owners</p>
                <a href="/contact" className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Get Started
                </a>
              </div>

              {/* Multiple Properties */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-blue-600 rounded-xl p-6 text-white transform scale-105 shadow-xl">
                <div className="bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                  BEST VALUE
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Multi-Property</h3>
                  <div className="text-4xl font-bold mb-2">$600</div>
                  <p className="text-blue-100">For 3 properties</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>All single property benefits × 3</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span><strong>2 FREE drain unclogs</strong> per property/month ($240 value)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>Shower cartridge replacement (when needed, prevents leaks)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>Window screen replacement (up to 5 screens per property/month)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span><strong>25% discount</strong> on all repairs + same-day emergency response</span>
                  </li>
                </ul>
                <p className="text-xs text-blue-100 italic mb-4">Best for vacation rental property managers</p>
                <a href="/contact" className="block w-full text-center bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Get Started
                </a>
              </div>

              {/* Portfolio Management */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-colors">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Portfolio (6+)</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">$1,000+</div>
                  <p className="text-gray-500">Custom pricing</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">All multi-property benefits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700"><strong>Unlimited drain unclogs</strong> (all properties, no limits)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">Quarterly shower cartridge replacement (all bathrooms - proactive)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">Window screen replacement (unlimited across portfolio)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700"><strong>30% discount</strong> on all major repairs + 30-minute emergency response</span>
                  </li>
                </ul>
                <p className="text-xs text-gray-500 italic mb-4">Ideal for large vacation rental portfolios</p>
                <a href="/contact" className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Get Custom Quote
                </a>
              </div>
            </div>
          </div>

          {/* Why Cabo Rentals Need Professional Maintenance */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Cabo Vacation Rentals Require Expert Maintenance</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Harsh Coastal Environment</h3>
                <p className="text-gray-600">
                  Salt air accelerates corrosion on fixtures, hinges, and electrical components. Without regular maintenance, doors stick, faucets leak, and AC units fail prematurely—all guest satisfaction killers.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">High Guest Turnover Stress</h3>
                <p className="text-gray-600">
                  Every guest checkout-to-checkin cycle stresses plumbing, appliances, and fixtures. Preventive checks during turnover catch issues before the next guest arrives.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Climate Extremes</h3>
                <p className="text-gray-600">
                  Cabo's intense heat demands perfect AC performance. A broken AC unit in July isn't just uncomfortable—it's uninhabitable and results in immediate cancellations.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Guest Expectations</h3>
                <p className="text-gray-600">
                  Cabo vacation rentals compete with luxury resorts. Guests paying $300-800/night expect flawless functionality. One maintenance issue can tank your rating.
                </p>
              </div>
            </div>
          </div>

          {/* ROI Calculation */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 border-l-4 border-green-600 p-8 rounded-lg mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <DollarSign className="text-green-600" size={28} />
              The Math: Why Maintenance Contracts Pay For Themselves
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <p className="font-bold mb-2">WITHOUT Maintenance Contract:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Emergency AC repair at midnight: $450</li>
                  <li>• Lost booking from 2-star review: $2,400</li>
                  <li>• Expensive rush plumber: $280</li>
                  <li>• Time coordinating 5+ contractors: priceless</li>
                  <li className="font-bold pt-2">Cost per property/year: $3,000-5,000+</li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-2">WITH Maintenance Contract ($250/month):</p>
                <ul className="space-y-1 text-sm">
                  <li>• Preventive maintenance catches issues early</li>
                  <li>• Priority emergency response (no price gouging)</li>
                  <li>• 15-25% discount on all repairs</li>
                  <li>• One point of contact for everything</li>
                  <li className="font-bold pt-2">Cost per property/year: $3,000</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 font-semibold mt-4">
              <strong>The real savings?</strong> Protecting your 5-star rating, maximizing occupancy, and eliminating stress. Property managers with contracts report 15-20% fewer guest complaints and higher review scores.
            </p>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Protect Your Rental Income & Guest Satisfaction</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Stop losing bookings to maintenance issues. Get a custom maintenance plan for your Cabo vacation rentals today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Request Maintenance Quote <ArrowRight size={20} />
              </a>
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 transition-colors"
              >
                Call: +52 612 169 8328
              </a>
            </div>
            <p className="text-blue-100 mt-6 text-sm">
              24/7 Emergency Service • Bilingual Team • 20+ Years Experience • Licensed & Insured
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
