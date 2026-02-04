import { lazy, useState } from 'react';
import SEO from '@/components/SEO';
import { Shield, Droplet, Clock, CheckCircle2, AlertCircle, Home, ArrowRight, Calendar, DollarSign, ChevronDown, Info } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Footer = lazy(() => import('@/components/Footer'));

export default function PropertyCarePlans() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Property Maintenance and Care Plans",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Cabos Handyman - Property Care Plans",
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
      "priceRange": "$99-$299",
      "openingHours": "Mo-Su 00:00-23:59"
    },
    "areaServed": {
      "@type": "City",
      "name": "Cabo San Lucas"
    },
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
        title="Property Care Plans Cabo San Lucas | Preventive Maintenance | Cabos Handyman"
        description="Preventive property maintenance plans in Cabo San Lucas. Monthly inspections, free unclog service, 24/7 emergency response. Save thousands on water damage. Perfect for vacation rentals. Plans from $99/month. Call +52 612 169 8328"
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

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">
              Preventive maintenance is the smartest investment you can make in your Cabo San Lucas property. Most water damage starts small and completely preventable—a dripping faucet, slow drain, or corroded pipe fitting that goes unnoticed until it's a $5,000 emergency. Regular inspections catch these issues when they're $50 fixes, not thousand-dollar disasters.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our Property Care Plans are perfect for vacation rentals, homeowners, and investment properties throughout Los Cabos. With over 20 years of experience in Baja California Sur, our bilingual team (English/Spanish) understands the unique challenges of coastal properties—from salt air corrosion to hard water buildup to the wear and tear of high-turnover vacation rentals.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Every plan includes regular professional inspections, priority emergency response, discounted repair rates, and peace of mind while you're away. For property managers, we provide detailed reporting to keep owners informed and properties protected.
            </p>
          </div>

          {/* The Problem */}
          <div className="mb-16 bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-600 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertCircle className="text-red-600" size={32} />
              The Hidden Cost of Reactive Maintenance
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Common Property Threats in Cabo</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span><strong>Salt Air Corrosion:</strong> Accelerates deterioration of fixtures, pipes, and hardware</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span><strong>Hard Water Buildup:</strong> Causes clogs, damages appliances, reduces water flow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span><strong>Vacation Rental Wear:</strong> High guest turnover means more frequent plumbing issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span><strong>Undetected Leaks:</strong> Small drips become major water damage and mold growth</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">The True Cost of Neglect</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Emergency repairs cost <strong>3-5x more</strong> than preventive maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Water damage repairs average <strong>$2,500-$7,500</strong> per incident</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Plumbing emergencies hurt vacation rental reviews and bookings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Property damage reduces resale value and rental income potential</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* The Solution */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How Property Care Plans Protect Your Investment</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-200">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Regular Inspections</h3>
                <p className="text-gray-700">
                  Professional monthly, bi-monthly, or weekly property checks catch problems when they're small. We inspect plumbing, electrical, fixtures, and high-risk areas before issues escalate.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Droplet className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">FREE Monthly Unclog</h3>
                <p className="text-gray-700">
                  Every plan includes one FREE drain unclog per month (toilet, tub, OR sink). That's a $60 value included in your plan. Use it preventively or when needed—no extra charge.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
                <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Clock className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Priority Emergency Service</h3>
                <p className="text-gray-700">
                  When emergencies happen, members get priority response within 2 hours. Skip the wait list and get immediate help when you need it most.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border-2 border-gray-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Member Benefits</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700"><strong>Discounted Repair Rates:</strong> 15% off all repair services and materials</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700"><strong>Property Manager Reporting:</strong> Detailed inspection reports for remote owners</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700"><strong>Trusted Relationship:</strong> Same team knows your property and its quirks</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700"><strong>Predictable Costs:</strong> No surprise bills, budget-friendly monthly pricing</span>
                </div>
              </div>
            </div>
          </div>

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

          {/* Perfect For */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Perfect For</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-200 hover:shadow-lg transition-all">
                <div className="text-4xl mb-4 text-center">🏖️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Vacation Rental Owners</h3>
                <p className="text-gray-700 text-center">
                  Prevent bad reviews from plumbing emergencies. Regular maintenance keeps guests happy and protects your 5-star rating and booking income.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-200 hover:shadow-lg transition-all">
                <div className="text-4xl mb-4 text-center">🏡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Full-Time Residents</h3>
                <p className="text-gray-700 text-center">
                  Peace of mind with predictable costs and priority service. Know your property is being professionally monitored and maintained year-round.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-purple-200 hover:shadow-lg transition-all">
                <div className="text-4xl mb-4 text-center">✈️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Expats Living Abroad</h3>
                <p className="text-gray-700 text-center">
                  Remote property care with detailed reporting. Trust a local Cabo team to protect your investment while you're away for months at a time.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-yellow-200 hover:shadow-lg transition-all">
                <div className="text-4xl mb-4 text-center">📊</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Investment Properties</h3>
                <p className="text-gray-700 text-center">
                  Protect your asset value with professional preventive maintenance. Regular care maintains property condition and maximizes rental income potential.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-red-200 hover:shadow-lg transition-all">
                <div className="text-4xl mb-4 text-center">🔑</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Property Managers</h3>
                <p className="text-gray-700 text-center">
                  Portfolio care with consistent service across multiple properties. Detailed reporting keeps owners informed and demonstrates proactive management.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-cyan-200 hover:shadow-lg transition-all">
                <div className="text-4xl mb-4 text-center">🏢</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Commercial Properties</h3>
                <p className="text-gray-700 text-center">
                  Preventive maintenance prevents business disruptions. Regular inspections keep facilities running smoothly and avoid costly emergency shutdowns.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Choose Your Property Care Plan<br />They can be tailored to your property’s needs with predictable pricing.</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Basic Care - ORANGE for action/conversion */}
              <div className="bg-white rounded-lg shadow-xl border-2 border-orange-400 overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">Basic Care</h3>
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
                  <a
                    href="/contact"
                    className="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center py-3 rounded-lg font-semibold transition-colors shadow-lg"
                  >
                    Choose Basic Care
                  </a>
                </div>
              </div>

              {/* Premium Care - Highlighted */}
              <div className="bg-white rounded-lg shadow-xl border-4 border-blue-500 overflow-hidden hover:shadow-2xl transition-all transform scale-105">
                <div className="bg-blue-600 text-white text-center py-2 text-sm font-bold">
                  ⭐ MOST POPULAR
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-cyan-700 text-white p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">Premium Care</h3>
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
                  <a
                    href="/contact"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                  >
                    Choose Premium Care
                  </a>
                </div>
              </div>

              {/* Elite Care */}
              <div className="bg-white rounded-lg shadow-xl border-2 border-purple-300 overflow-hidden hover:shadow-2xl transition-all">
                <div className="bg-gradient-to-br from-purple-600 to-pink-700 text-white p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">Elite Care</h3>
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
                  <a
                    href="/contact"
                    className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                  >
                    Choose Elite Care
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

            {/* AC Filter Cleaning Clarification */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mt-8 mb-8">
              <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-center gap-2">
                <Info className="h-6 w-6 text-blue-600" />
                How Many AC Filters Get Cleaned?
              </h3>

              <div className="grid md:grid-cols-3 gap-6 mb-4">
                {/* Basic Plan Example */}
                <div className="bg-white rounded-lg p-4 border-2 border-orange-200">
                  <div className="font-bold text-orange-600 mb-2">Basic Plan ($99/mo)</div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">1 Filter</div>
                  <p className="text-sm text-gray-600">
                    We clean 1 AC filter during your monthly visit.
                    Perfect for: Studio apartments, small condos
                  </p>
                </div>

                {/* Premium Plan Example */}
                <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                  <div className="font-bold text-blue-600 mb-2">Premium Plan ($199/mo)</div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">3 Filters</div>
                  <p className="text-sm text-gray-600">
                    We clean up to 3 AC filters during your monthly visit.
                    Perfect for: 2-3 bedroom homes, small vacation rentals
                  </p>
                </div>

                {/* Elite Plan Example */}
                <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                  <div className="font-bold text-purple-600 mb-2">Elite Plan ($299/mo)</div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">Unlimited</div>
                  <p className="text-sm text-gray-600">
                    We clean ALL your AC filters during your monthly visit.
                    Perfect for: Large homes, vacation rentals, multi-unit properties
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <p className="text-sm text-gray-800">
                  <strong>Important:</strong> All filter cleanings happen during ONE scheduled visit per month.
                  For example, Premium Plan customers don't get 3 separate visits — they get 3 filters cleaned in one visit.
                  Unused filters don't carry over to the next month.
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

            {/* Annual Pricing FAQ */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">💰 Annual Plan Benefits</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    What's the difference between monthly and annual plans?
                  </h4>
                  <p className="text-gray-700">
                    Monthly plans bill month-to-month with no long-term contract (3-month minimum). Annual plans require upfront payment for 11 months of service—<strong>you get the 12th month FREE</strong>, saving you 8.3%. Annual plans are perfect for committed Care Partners who want maximum savings and don't require monthly flexibility.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    Can I switch from monthly to annual?
                  </h4>
                  <p className="text-gray-700">
                    Yes! You can upgrade to an annual plan at any time. We'll credit your current month and apply it toward your annual payment. Contact us to upgrade and start saving immediately.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    What if I need to cancel my annual plan early?
                  </h4>
                  <p className="text-gray-700">
                    Annual plans are refundable on a prorated basis after the 3-month minimum period. For example, if you paid for an annual Basic Care plan ($1,089) and cancel after 6 months, you'll receive a refund for the remaining 6 months ($544.50).
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    What are your emergency service hours?
                  </h4>
                  <p className="text-gray-700 mb-2">
                    For <strong>Property Care members</strong>, we offer 24/7 emergency service including after midnight. Response times are 2-4 hours depending on your plan.
                  </p>
                  <p className="text-gray-700">
                    For <strong>non-members</strong>, emergency service is available 7am-6pm for safety reasons. After 6pm emergencies are available to members only. This policy ensures we can safely respond to established customers we already know. Non-members can schedule priority service starting at 7am, or join Property Care for 24/7 access.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    What if I'm not a member and have a flooding emergency at midnight?
                  </h4>
                  <p className="text-gray-700 mb-2">
                    We can schedule you as our first appointment at 7am (priority scheduling), and we'll provide free phone guidance to shut off your water immediately to minimize damage.
                  </p>
                  <p className="text-gray-700">
                    For extreme flooding emergencies after hours, there is a $300 emergency callout fee plus 2x standard service rates for non-members. Most customers find it more cost-effective to join Property Care for 24/7 included access.
                  </p>
                </div>
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

          {/* FAQ Section */}
          <div className="mb-16">
            <button
              onClick={() => setIsFaqOpen(!isFaqOpen)}
              className="w-full flex items-center justify-between mb-6 hover:opacity-80 transition-opacity"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                Frequently Asked Questions About Property Care Plans
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
                    What exactly is included in the monthly inspection?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-blue-600 transition-transform ${openQuestion === 'faq1' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq1' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Our comprehensive property inspections include:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mb-3 ml-4">
                      <li><strong>Plumbing system check:</strong> Faucets, toilets, showers, water heater, visible pipes, and leak detection</li>
                      <li><strong>Drain testing:</strong> All sinks, tubs, and showers checked for slow drainage or clogs</li>
                      <li><strong>Electrical inspection:</strong> Outlets, switches, circuit breaker, visible wiring</li>
                      <li><strong>Fixtures & hardware:</strong> Doors, windows, locks, ceiling fans, light fixtures</li>
                      <li><strong>Water damage screening:</strong> Check under sinks, around toilets, near water heater for moisture</li>
                      <li><strong>HVAC check:</strong> AC unit operation, filter condition, thermostat function</li>
                      <li><strong>Exterior assessment:</strong> Roof condition, gutters, visible corrosion from salt air</li>
                    </ul>
                    <p>
                      Premium and Elite members receive more frequent inspections with detailed photo documentation. All inspections include a written report delivered within 24 hours. Call <a href="tel:+526121698328" className="text-blue-600 hover:underline font-medium">+52 612 169 8328</a> to learn more.
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
                    How does the FREE monthly unclog service work?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-blue-600 transition-transform ${openQuestion === 'faq2' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq2' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Every Property Care Plan includes <strong>at least one FREE drain unclog per month</strong> (Basic: 1/month, Premium: 2/month, Elite: unlimited). This covers:
                    </p>
                    <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                      <li>Toilet clogs (standard unclog, not major blockages)</li>
                      <li>Tub or shower drain clogs</li>
                      <li>Kitchen or bathroom sink clogs</li>
                      <li>Preventive drain cleaning to avoid future clogs</li>
                    </ul>
                    <p className="mb-3">
                      <strong>How it works:</strong> Simply call or text when you need drain service. We'll schedule it during your next inspection or send someone same-day if urgent. There's no extra charge—it's included in your monthly plan. This alone is a <strong>$60-120 value per month</strong> depending on your plan tier.
                    </p>
                    <p className="mb-3">
                      <strong>Important:</strong> Unused monthly unclogs do NOT roll over to the next month. However, many members use them preventively—requesting drain cleaning on drains that are draining slowly before they become full clogs.
                    </p>
                    <p>
                      For severe blockages requiring hydro-jetting or sewer line work, members receive 15-25% discount on those services.
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
                    Is Property Care worth it for vacation rentals?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-blue-600 transition-transform ${openQuestion === 'faq3' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq3' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      <strong>Absolutely—vacation rentals benefit the MOST from Property Care Plans.</strong> Here's why:
                    </p>
                    <p className="mb-3">
                      <strong>Protect Your Reviews & Revenue:</strong> One plumbing emergency during a guest stay can destroy your 5-star rating and cost you thousands in lost bookings. Property Care members get priority same-day service to fix problems before guests even notice.
                    </p>
                    <p className="mb-3">
                      <strong>High Guest Turnover = More Wear:</strong> Vacation rentals experience 10-50x more drain usage than regular homes. Guests flush things they shouldn't, overload garbage disposals, and use excessive hot water. Regular inspections catch these issues immediately.
                    </p>
                    <p className="mb-3">
                      <strong>Remote Owner Peace of Mind:</strong> Most Cabo vacation rental owners live in the US or Canada. Premium/Elite plans include detailed photo reports showing exactly what was checked and any issues found. You can show these reports to prospective guests as proof of professional maintenance.
                    </p>
                    <p className="mb-3">
                      <strong>ROI Example:</strong> Premium Care at $199/month includes:
                    </p>
                    <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                      <li>24 FREE drain unclogs/year ($1,440 value)</li>
                      <li>24 bi-monthly inspections catching problems early</li>
                      <li>24/7 emergency service (no guest inconvenience)</li>
                      <li>20% discount on all repairs</li>
                    </ul>
                    <p>
                      <strong>One bad review from a plumbing emergency could cost you $5,000+ in lost bookings.</strong> Property Care pays for itself many times over. Call <a href="tel:+526121698328" className="text-blue-600 hover:underline font-medium">+52 612 169 8328</a> to discuss your rental property needs.
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
                    Can I cancel my Property Care Plan if I sell my property?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-blue-600 transition-transform ${openQuestion === 'faq4' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq4' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Yes. All Property Care Plans have a <strong>3-month minimum commitment</strong>, after which you can cancel with 30-day notice. This policy protects both you and us—we invest in understanding your property's unique needs, and you get consistent service from a team that knows your property.
                    </p>
                    <p className="mb-3">
                      <strong>For monthly plans:</strong> After 3 months, cancel anytime with 30-day written notice. You'll receive service through the end of your final paid month.
                    </p>
                    <p className="mb-3">
                      <strong>For annual plans:</strong> If you prepaid annually and need to cancel after 3 months (due to property sale, relocation, etc.), we'll refund the remaining months on a prorated basis. For example, if you paid $1,089 for Basic Care annually and cancel after 6 months, you receive a refund of $544.50 for the unused 6 months.
                    </p>
                    <p className="mb-3">
                      <strong>Transferable to new owner:</strong> Many sellers transfer their Property Care Plan to the new property owner as a selling point ("property comes with established maintenance plan"). This adds value to your sale and ensures continuity of care. We'll coordinate the transfer at no charge.
                    </p>
                    <p>
                      We're flexible and fair. If your situation changes, we'll work with you to find a solution.
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
                    What's the difference between Basic, Premium, and Elite plans?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-blue-600 transition-transform ${openQuestion === 'faq5' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq5' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      The main differences are <strong>inspection frequency, number of free unclogs, and emergency response time:</strong>
                    </p>

                    <div className="mb-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="font-bold text-gray-900 mb-2">💼 Basic Care ($99/month):</p>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Monthly inspections (12/year)</li>
                        <li>• 1 FREE unclog/month (12/year)</li>
                        <li>• 15% repair discount</li>
                        <li>• 4-hour emergency response</li>
                        <li>• Perfect for: Single homes, part-time residents</li>
                      </ul>
                    </div>

                    <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="font-bold text-gray-900 mb-2">⭐ Premium Care ($199/month) - MOST POPULAR:</p>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Bi-monthly inspections (24/year - every 2 weeks)</li>
                        <li>• 2 FREE unclogs/month (24/year)</li>
                        <li>• 20% repair discount</li>
                        <li>• 2-hour emergency response</li>
                        <li>• Photo reports + quarterly air filter replacement</li>
                        <li>• Perfect for: Vacation rentals, high-value properties, remote owners</li>
                      </ul>
                    </div>

                    <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="font-bold text-gray-900 mb-2">👑 Elite Care ($299/month):</p>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Weekly inspections (48+/year)</li>
                        <li>• UNLIMITED unclogs</li>
                        <li>• 25% repair discount</li>
                        <li>• 1-hour VIP emergency response</li>
                        <li>• Video reports + $100/month free minor repairs</li>
                        <li>• Dedicated technician + concierge coordination</li>
                        <li>• Perfect for: Luxury rentals, property portfolios, commercial properties</li>
                      </ul>
                    </div>

                    <p>
                      <strong>Not sure which plan is right for you?</strong> Call <a href="tel:+526121698328" className="text-blue-600 hover:underline font-medium">+52 612 169 8328</a> and we'll help you choose based on your property type, usage, and budget. You can also upgrade or downgrade plans anytime after your first 3 months.
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
                    Do you offer discounts for multiple properties?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-blue-600 transition-transform ${openQuestion === 'faq6' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq6' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      <strong>Yes! We offer portfolio pricing for property managers and owners with multiple properties.</strong>
                    </p>
                    <p className="mb-3">
                      <strong>Portfolio Discounts:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-2 mb-3 ml-4">
                      <li><strong>2-3 properties:</strong> 10% discount on all plans</li>
                      <li><strong>4-6 properties:</strong> 15% discount on all plans</li>
                      <li><strong>7-10 properties:</strong> 20% discount on all plans</li>
                      <li><strong>11+ properties:</strong> Custom portfolio pricing (call for quote)</li>
                    </ul>
                    <p className="mb-3">
                      <strong>Example Portfolio Savings:</strong> A property manager with 5 vacation rentals on Premium Care would normally pay $995/month ($199 x 5). With 15% portfolio discount, they pay only <strong>$846/month—saving $1,788/year</strong>.
                    </p>
                    <p className="mb-3">
                      <strong>Additional Portfolio Benefits:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                      <li>Single consolidated monthly invoice for all properties</li>
                      <li>Dedicated portfolio manager as your single point of contact</li>
                      <li>Coordinated scheduling across all properties</li>
                      <li>Bulk pricing on repairs and materials across portfolio</li>
                      <li>Monthly portfolio summary reports for property owners</li>
                    </ul>
                    <p>
                      Call <a href="tel:+526121698328" className="text-blue-600 hover:underline font-medium">+52 612 169 8328</a> to discuss portfolio pricing for your properties. We currently manage 50+ vacation rental properties throughout Los Cabos.
                    </p>
                  </div>
                )}
              </div>

            </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-700 text-white rounded-xl p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Protect Your Cabo Property Investment
            </h2>
            <p className="text-xl mb-4">
              Start preventive maintenance today and avoid tomorrow's expensive emergencies
            </p>
            <p className="text-lg text-blue-100 mb-8">
              Call now to discuss which Property Care Plan is right for your property
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                <DollarSign size={20} />
                Call: +52 612 169 8328
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 transition-colors border-2 border-white"
              >
                Request Quote Online <ArrowRight size={20} />
              </a>
            </div>
            <p className="mt-6 text-blue-100 text-sm">
              Serving Cabo San Lucas and the nearby Tourist Corridor
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
