import { lazy } from 'react';
import SEO from '@/components/SEO';
import { Shield, Droplet, Clock, CheckCircle2, AlertCircle, Home, ArrowRight, ArrowLeft, Calendar, DollarSign } from 'lucide-react';

const Footer = lazy(() => import('@/components/Footer'));

export default function PropertyCarePlans() {
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
        "latitude": "22.8905",
        "longitude": "-109.9167"
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
        description="Preventive property maintenance plans in Cabo San Lucas. Monthly inspections, free unclog service, priority emergency response. Save thousands on water damage. Perfect for vacation rentals and remote property owners. Plans from $99/month."
        canonicalUrl="/property-care-plans"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8905;-109.9167"
        schemaMarkup={schemaMarkup}
      />

      {/* Back to Home Button */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-semibold transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </a>
        </div>
      </div>

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
              Property Care Plans in Cabo San Lucas
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Choose Your Property Care Plan</h2>

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
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>15% discount</strong> on all repair services</span>
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
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>20% discount</strong> on all repair services</span>
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
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>25% discount</strong> on all repair services</span>
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
