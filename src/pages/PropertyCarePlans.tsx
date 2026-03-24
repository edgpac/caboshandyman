import { lazy } from 'react';
import SEO from '@/components/SEO';
import { Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Footer = lazy(() => import('@/components/Footer'));

export default function PropertyCarePlans() {

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Property Maintenance and Care Plans",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Cabos Handyman - Property Care Plans",
      "image": "https://www.caboshandyman.com/CHLOGO.png",
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
      "priceRange": "$99-$299",
      "openingHours": "Mo-Su 07:00-18:00",
      "sameAs": [
        "https://maps.app.goo.gl/hJRcahhtYjF5tkv4A",
        "https://www.facebook.com/share/19wvxoz8Cy/",
        "https://www.instagram.com/caboshandyman"
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
    "offers": [
      {
        "@type": "Offer",
        "name": "Basic Care Plan",
        "priceCurrency": "USD",
        "price": "99",
        "description": "Monthly property maintenance with free unclog service"
      },
      {
        "@type": "Offer",
        "name": "Premium Care Plan",
        "priceCurrency": "USD",
        "price": "199",
        "description": "Bi-monthly inspections with priority emergency service"
      },
      {
        "@type": "Offer",
        "name": "Elite Care Plan",
        "priceCurrency": "USD",
        "price": "299",
        "description": "Weekly inspections with unlimited emergency service"
      }
    ]
  };

  return (
    <>
      <SEO
        title="Property Care Plans Cabo San Lucas | From $99/mo | Cabos Handyman"
        description="Property maintenance plans for Cabo vacation rentals & homeowners. Free monthly drain unclog + 24/7 emergency response. Protect your investment. Plans from $99/mo. Call: +52 612 169 8328"
        canonicalUrl="/property-care-plans"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
        schemaMarkup={schemaMarkup}
      />

      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-cyan-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Shield size={20} />
              <span className="text-sm font-medium">Preventive Property Maintenance</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Property Care Plans<br />in Cabo San Lucas
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Preventive maintenance saves thousands in water damage. Regular inspections catch small issues before they become expensive emergencies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                Choose Your Plan <ArrowRight size={20} />
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

          {/* Why Subscriptions Beat Pay-Per-Call */}
          <div className="mb-16 bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-lg border-2 border-teal-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Why Subscriptions Save You Money
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-red-600 mb-4">❌ Pay-Per-Call Approach</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>$60-$150 per service call adds up quickly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Emergency rates 50-100% higher than regular pricing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Small problems go unnoticed until they're emergencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Unpredictable costs make budgeting difficult</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Wait times during peak tourist season</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-600 mb-4">✅ Property Care Plan</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Predictable monthly cost</strong> (as low as $99/month)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span><strong>FREE monthly unclog</strong> = $60+ value included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Catch problems early</strong> = cheaper, easier fixes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span><strong>15% discount on repairs</strong> saves hundreds annually</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Priority service</strong> when emergencies happen</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg border-2 border-green-400">
              <p className="text-center text-lg font-semibold text-gray-900">
                <strong>Real Savings Example:</strong> Regular inspections catch a $50 pipe fitting repair before it becomes a $3,500 water damage emergency. <span className="text-green-600">Your plan pays for itself instantly.</span>
              </p>
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Plans can be tailored to your property’s needs.</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Basic Care - ORANGE for action/conversion */}
              <div className="bg-white rounded-lg shadow-xl border-2 border-orange-400 overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 text-center">
                  <h3 className="text-2xl font-bold mb-1">Basic Care</h3>
                  <p className="text-white/80 text-sm italic mb-3">so you can stop ignoring small problems</p>
                  <div className="text-5xl font-bold mb-2">$99</div>
                  <div className="text-white/90 mb-4">per month</div>

                  {/* Annual Pricing Option */}
                  <div className="bg-green-600 border border-green-400 rounded-lg p-3">
                    <div className="text-sm font-bold text-white mb-1">
                      💰 PAY ANNUALLY & SAVE
                    </div>
                    <div className="text-2xl font-bold text-white">$1,089</div>
                    <div className="text-xs text-white/90">
                      ($90.75/month - Save $99!)
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Monthly inspection</strong> (plumbing, electrical, fixtures)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>1 FREE unclog per month</strong> (toilet, tub, OR sink - $60 value)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <span className="font-semibold">1 AC Filter Cleaned Per Month</span>
                        <p className="text-sm text-gray-600 mt-1">One filter cleaned during your monthly visit</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>15% discount</strong> on all repair services</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>24/7 Emergency Access</strong> - Get emergency service anytime, even after midnight (4-hour response)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Priority emergency response</strong> (4-hour guarantee)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Monthly inspection report</strong> (email summary)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Cancel anytime</strong> (no long-term contract)</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Perfect for:</strong> Single-family homes, small vacation rentals, part-time residents
                  </p>
                  <div className="flex gap-2">
                    <a
                      href="/plans/plans-en.html?plan=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-center py-3 rounded-lg font-semibold transition-colors shadow-lg text-sm"
                    >
                      📥 Download EN
                    </a>
                    <a
                      href="/plans/planes-es.html?plan=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-700 hover:bg-gray-800 text-white text-center py-3 rounded-lg font-semibold transition-colors shadow-lg text-sm"
                    >
                      📥 Descargar ES
                    </a>
                  </div>
                </div>
              </div>

              {/* Premium Care - Highlighted */}
              <div className="bg-white rounded-lg shadow-xl border-4 border-blue-500 overflow-hidden hover:shadow-2xl transition-all transform scale-105">
                <div className="bg-blue-600 text-white text-center py-2 text-sm font-bold">
                  ⭐ MOST POPULAR
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-cyan-700 text-white p-6 text-center">
                  <h3 className="text-2xl font-bold mb-1">Premium Care</h3>
                  <p className="text-white/80 text-sm italic mb-3">so you can own your property, not manage it</p>
                  <div className="text-5xl font-bold mb-2">$199</div>
                  <div className="text-blue-100 mb-4">per month</div>

                  {/* Annual Pricing Option */}
                  <div className="bg-green-600 border border-green-400 rounded-lg p-3">
                    <div className="text-sm font-bold text-white mb-1">
                      💰 PAY ANNUALLY & SAVE
                    </div>
                    <div className="text-2xl font-bold text-white">$2,189</div>
                    <div className="text-xs text-green-100">
                      ($182.42/month - Save $199!)
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Bi-monthly inspections</strong> (2x per month - comprehensive)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>2 FREE unclogs per month</strong> (any drains - $120 value)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <span className="font-semibold">3 AC Filters Cleaned Per Month</span>
                        <p className="text-sm text-gray-600 mt-1">Up to 3 filters cleaned during your monthly visit</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>20% discount</strong> on all repair services</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>24/7 Emergency Access</strong> - Priority emergency service anytime, even after midnight (4-hour response)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Priority emergency response</strong> (2-hour guarantee)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Detailed photo reports</strong> (property manager-ready)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Air filter replacement</strong> (quarterly - included)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Vacation rental coordination</strong> (around guest schedules)</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Perfect for:</strong> Active vacation rentals, high-value properties, remote owners
                  </p>
                  <div className="flex gap-2">
                    <a
                      href="/plans/plans-en.html?plan=2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition-colors text-sm"
                    >
                      📥 Download EN
                    </a>
                    <a
                      href="/plans/planes-es.html?plan=2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-700 hover:bg-gray-800 text-white text-center py-3 rounded-lg font-semibold transition-colors text-sm"
                    >
                      📥 Descargar ES
                    </a>
                  </div>
                </div>
              </div>

              {/* Elite Care */}
              <div className="bg-white rounded-lg shadow-xl border-2 border-purple-300 overflow-hidden hover:shadow-2xl transition-all">
                <div className="bg-gradient-to-br from-purple-600 to-pink-700 text-white p-6 text-center">
                  <h3 className="text-2xl font-bold mb-1">Elite Care</h3>
                  <p className="text-white/80 text-sm italic mb-3">so you can forget your property even exists</p>
                  <div className="text-5xl font-bold mb-2">$299</div>
                  <div className="text-purple-100 mb-4">per month</div>

                  {/* Annual Pricing Option */}
                  <div className="bg-green-600 border border-green-400 rounded-lg p-3">
                    <div className="text-sm font-bold text-white mb-1">
                      💰 PAY ANNUALLY & SAVE
                    </div>
                    <div className="text-2xl font-bold text-white">$3,289</div>
                    <div className="text-xs text-green-100">
                      ($274.08/month - Save $299!)
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Weekly inspections</strong> (4x per month - full property audit)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>UNLIMITED unclogs</strong> (all drains, any time)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <span className="font-semibold">Unlimited AC Filters Cleaned Per Month</span>
                        <p className="text-sm text-gray-600 mt-1">All your filters cleaned during your monthly visit</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>25% discount</strong> on all repair services</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>24/7 VIP Emergency Access</strong> - Fastest emergency response anytime, even after midnight (2-hour response)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>VIP emergency service</strong> (1-hour guarantee, 24/7)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Comprehensive digital reports</strong> (photos, videos, recommendations)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Free minor repairs</strong> (up to $100/month value included)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Dedicated property technician</strong> (same person, every visit)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Concierge coordination</strong> (vendors, deliveries, contractors)</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Perfect for:</strong> Luxury rentals, property portfolios, commercial properties
                  </p>
                  <div className="flex gap-2">
                    <a
                      href="/plans/plans-en.html?plan=3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg font-semibold transition-colors text-sm"
                    >
                      📥 Download EN
                    </a>
                    <a
                      href="/plans/planes-es.html?plan=3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-700 hover:bg-gray-800 text-white text-center py-3 rounded-lg font-semibold transition-colors text-sm"
                    >
                      📥 Descargar ES
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Build Your Own / Servicio por Proyecto */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 mb-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="inline-block bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                    Build Your Own
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Have a specific project in mind?</h3>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-4">
                    No monthly contract needed. Tell us what you need, share your budget and expectations — we quote, agree, and get it done. No surprises, no long-term commitments.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {['Remodeling','Full bathrooms','Painting','Electrical','Plumbing','Kitchens','AC install','Custom carpentry','And more...'].map(tag => (
                      <span key={tag} className="bg-white/10 border border-white/20 text-gray-200 text-xs px-3 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 md:min-w-[220px]">
                  <div className="bg-white/10 border border-white/20 rounded-lg p-4 text-sm text-gray-300 leading-relaxed">
                    <p className="text-white font-semibold mb-1">How it works</p>
                    You propose · We quote<br />We agree · We execute · Done
                  </div>
                  <a
                    href="/plans/project-en.html?autodownload=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white text-gray-900 py-3 px-4 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors"
                  >
                    📥 Download Brochure EN
                  </a>
                  <a
                    href="/plans/proyecto-es.html?autodownload=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold text-sm transition-colors"
                  >
                    📥 Descargar Folleto ES
                  </a>
                </div>
              </div>
            </div>

            {/* Emergency Service Comparison */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-6 md:p-8 mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                🚨 Why 24/7 Access Matters
              </h3>
              <p className="text-center text-gray-700 mb-6">
                Plumbing emergencies don't wait for business hours. Here's the difference between members and non-members when disaster strikes at 2am:
              </p>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="text-left py-4 px-6 font-bold">Scenario</th>
                      <th className="text-center py-4 px-6 font-bold">Non-Member</th>
                      <th className="text-center py-4 px-6 font-bold bg-green-600">Property Care Member</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-semibold">Emergency at 2am</td>
                      <td className="text-center py-4 px-6">
                        <div className="text-red-600 font-bold mb-1">❌ Not Available</div>
                        <div className="text-sm text-gray-600">Must wait until 7am</div>
                        <div className="text-xs text-red-500 mt-1">Could be $1,000s in damage overnight</div>
                      </td>
                      <td className="text-center py-4 px-6 bg-green-50">
                        <div className="text-green-600 font-bold mb-1">✅ We're On Our Way</div>
                        <div className="text-sm text-gray-700">2-4 hour response</div>
                        <div className="text-xs text-green-600 mt-1">Problem stopped quickly</div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-semibold">Emergency Cost</td>
                      <td className="text-center py-4 px-6">
                        <div className="text-red-600 font-bold mb-1">$300 callout + 2x rates</div>
                        <div className="text-sm text-gray-600">Total: $500-800 per emergency</div>
                      </td>
                      <td className="text-center py-4 px-6 bg-green-50">
                        <div className="text-green-600 font-bold mb-1">$0 Extra Fee</div>
                        <div className="text-sm text-gray-700">Included in monthly plan</div>
                        <div className="text-xs text-green-600 mt-1">Plus 15-25% discount on repairs</div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-semibold">Annual Cost (2 emergencies)</td>
                      <td className="text-center py-4 px-6">
                        <div className="font-bold text-gray-800 mb-1">$1,000-1,600</div>
                        <div className="text-sm text-gray-600">Pay as you go</div>
                      </td>
                      <td className="text-center py-4 px-6 bg-green-50">
                        <div className="font-bold text-green-600 mb-1">$1,188-3,588/year</div>
                        <div className="text-sm text-gray-700">PLUS:</div>
                        <ul className="text-xs text-gray-600 mt-1 text-left inline-block">
                          <li>• 4-26 inspections/year</li>
                          <li>• 12-24 free unclogs/year</li>
                          <li>• 15-25% off all repairs</li>
                          <li>• Prevention = fewer emergencies</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold">Peace of Mind</td>
                      <td className="text-center py-4 px-6">
                        <div className="text-gray-600">😰 Hope nothing breaks at night</div>
                      </td>
                      <td className="text-center py-4 px-6 bg-green-50">
                        <div className="text-green-600">😴 Sleep soundly - help is one call away</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                <div className="bg-white rounded-lg p-4 border-2 border-red-300">
                  <h4 className="font-bold text-gray-800 mb-2">❌ Non-Member</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>2am Emergency:</strong> Not available until 7am</li>
                    <li><strong>Cost:</strong> $500-800 per emergency call</li>
                    <li><strong>Annual:</strong> $1,000-1,600 (just emergencies)</li>
                    <li><strong>Peace of Mind:</strong> 😰 Hope nothing breaks</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border-2 border-green-500">
                  <h4 className="font-bold text-green-800 mb-2">✅ Property Care Member</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>2am Emergency:</strong> We're on our way (2-4 hours)</li>
                    <li><strong>Cost:</strong> $0 extra (included in plan)</li>
                    <li><strong>Annual:</strong> $1,188-3,588 + inspections + free unclogs</li>
                    <li><strong>Peace of Mind:</strong> 😴 Sleep soundly</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-lg font-bold text-gray-800 mb-2">
                  One late-night emergency could cost what you'd pay for 3-6 months of membership!
                </p>
                <p className="text-gray-700">
                  Plus members prevent most emergencies with regular inspections.
                </p>
              </div>
            </div>

            {/* Pricing Notes */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-3 text-center text-lg">Plan Details & Policies</h3>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700">
                <p>• Monthly plans bill month-to-month with 3-month minimum</p>
                <p>• Annual plans require upfront payment (save one month!)</p>
                <p>• Unused monthly unclogs DO NOT roll over to next month</p>
                <p>• Emergency service available 24/7 for all members</p>
                <p>• Repair discounts apply to labor and materials</p>
                <p>• Inspection reports delivered within 24 hours</p>
                <p>• Cancel with 30-day notice after minimum period</p>
                <p>• Property must be within 15km of Cabo San Lucas</p>
                <p>• Multiple properties qualify for portfolio discounts</p>
                <p>• Annual plan refunds prorated if cancelled early</p>
              </div>
            </div>

          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Cabo Property Owners Trust Cabos Handyman</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-lg border-2 border-teal-300">
                <div className="text-4xl mb-4 text-center">🏖️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Local Cabo Experts</h3>
                <p className="text-gray-700 text-center">
                  Not outsiders—we're a local Los Cabos team with 20+ years serving the community. We understand coastal property challenges and vacation rental standards.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-300">
                <div className="text-4xl mb-4 text-center">🗣️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Bilingual Service</h3>
                <p className="text-gray-700 text-center">
                  Fluent English and Spanish communication. Perfect for expats, US/Canadian property owners, and local property managers working with international clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-300">
                <div className="text-4xl mb-4 text-center">⭐</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Vacation Rental Specialists</h3>
                <p className="text-gray-700 text-center">
                  We know Airbnb and VRBO standards inside-out. Scheduled around guest check-ins/check-outs to protect your 5-star rating and booking income.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-300">
                <div className="text-4xl mb-4 text-center">🛡️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Licensed & Insured</h3>
                <p className="text-gray-700 text-center">
                  Fully licensed and insured in Baja California Sur. Professional service you can trust with your valuable Cabo San Lucas property investment.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border-2 border-orange-300">
                <div className="text-4xl mb-4 text-center">📱</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Remote Owner-Friendly</h3>
                <p className="text-gray-700 text-center">
                  Detailed photo/video reports keep you informed from anywhere in the world. Email, WhatsApp, and phone support in your preferred language and timezone.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-lg border-2 border-yellow-300">
                <div className="text-4xl mb-4 text-center">🔧</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Full-Service Capabilities</h3>
                <p className="text-gray-700 text-center">
                  From preventive maintenance to major repairs, we handle it all. Plumbing, electrical, carpentry, painting—one trusted team for everything.
                </p>
              </div>
            </div>
          </div>

          {/* Property Management Crosslink */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-[#4AC1C3] mb-3">Also Available</p>
              <h2 className="text-3xl font-bold mb-3">Need Full Property Management?</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                A Care Plan covers recurring maintenance — but if you're an absentee owner or vacation rental host, you may need more. Our Property Management service handles inspections, vendor coordination, emergency response, and key holding so your property runs itself while you're away.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  '24/7 emergency response',
                  'Monthly inspections with photo reports',
                  'Vendor & contractor management',
                  'Key holding and access control',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-200">
                    <CheckCircle2 size={15} className="text-[#4AC1C3] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/property-management-cabo-san-lucas"
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Learn About Property Management <ArrowRight size={18} />
              </a>
            </div>
            <div className="md:w-56 shrink-0 text-center bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="text-4xl mb-3">🏢</p>
              <p className="font-bold text-lg mb-1">Property Management</p>
              <p className="text-sm text-gray-400 mb-4">Full-scope oversight for Cabo properties</p>
              <a
                href="tel:+526121698328"
                className="block text-[#4AC1C3] font-semibold text-sm hover:underline"
              >
                +52 612 169 8328
              </a>
              <p className="text-gray-500 text-xs mt-1">Free quote · No long-term contract</p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
