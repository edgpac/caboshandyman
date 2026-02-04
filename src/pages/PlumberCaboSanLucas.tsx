import { lazy, useState } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Droplet, Wrench, Clock, Shield, Zap, ArrowRight, AlertCircle, ChevronDown } from 'lucide-react';

const Footer = lazy(() => import('@/components/Footer'));

export default function PlumberCaboSanLucas() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Plumbing Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Cabos Handyman - Plumbing Services",
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
        title="Plumber Cabo San Lucas | 24/7 Emergency Plumbing for Members | Cabos Handyman"
        description="Professional plumber in Cabo San Lucas with 24/7 emergency service for Property Care members. Licensed plumbers for repairs, installations, water heaters, and drain cleaning. 2-4 hour response time."
        canonicalUrl="/plumber-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
        schemaMarkup={schemaMarkup}
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-cyan-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Droplet size={20} />
              <span className="text-sm font-medium">Licensed Professional Plumbers</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Professional Plumber in Cabo San Lucas
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Licensed plumbers for emergency repairs, installations, and maintenance. 24/7 service for Property Care members. Emergency service 7am-6pm for non-members. Serving all of Los Cabos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors shadow-xl animate-pulse"
              >
                <AlertCircle size={20} />
                Emergency? Call Now!
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-cyan-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Schedule Service <ArrowRight size={20} />
              </a>
            </div>
            <p className="mt-6 text-white/80 text-lg">
              <Clock className="inline mr-2" size={20} />
              <strong>2-4 Hour Emergency Response</strong> • 24/7 for Property Care Members
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">
              Plumbing emergencies don't wait for business hours. A burst pipe at 2 AM, a clogged toilet before guests arrive, or a failed water heater in the middle of summer demands immediate professional help. With over 20 years serving Cabo San Lucas, our licensed plumbers provide 24/7 emergency service for Property Care members with a 2-4 hour response time for critical situations.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From simple repairs to complete system installations, our bilingual team (English/Spanish) handles all plumbing needs for residential, commercial, and vacation rental properties throughout Los Cabos. We combine local expertise with professional-grade equipment to solve plumbing problems quickly and correctly the first time.
            </p>
          </div>

          {/* Emergency Service Hours */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-lg p-6 md:p-8 mb-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center">
              <Clock className="mr-3 text-yellow-600" size={32} />
              🚨 Emergency Service Hours
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Property Care Members */}
              <div className="bg-white rounded-lg p-6 border-2 border-green-500 shadow-md">
                <div className="flex items-center mb-3">
                  <Shield className="text-green-500 mr-3" size={28} />
                  <h3 className="text-xl font-bold text-gray-800">Property Care Members</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-green-600 font-bold text-lg mb-2">
                    <CheckCircle2 className="mr-2" size={20} />
                    24/7 Emergency Service
                  </div>
                  <p className="text-gray-700">
                    Members get priority emergency response ANY TIME - even after midnight:
                  </p>
                  <ul className="text-gray-700 space-y-1 ml-6">
                    <li>• <strong>Elite:</strong> 2-hour response</li>
                    <li>• <strong>Premium:</strong> 4-hour response</li>
                    <li>• <strong>Basic:</strong> 4-hour response</li>
                  </ul>
                  <p className="text-sm text-green-600 font-semibold mt-3">
                    No extra fees for after-hours emergencies!
                  </p>
                </div>
              </div>

              {/* Non-Members */}
              <div className="bg-white rounded-lg p-6 border-2 border-gray-300 shadow-md">
                <div className="flex items-center mb-3">
                  <Clock className="text-gray-500 mr-3" size={28} />
                  <h3 className="text-xl font-bold text-gray-800">Non-Members</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700 font-bold text-lg mb-2">
                    <Clock className="mr-2" size={20} />
                    Emergency Service: 7am - 6pm
                  </div>
                  <p className="text-gray-700">
                    Same-day emergency service available between 7am-6pm.
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>After 6pm:</strong> Emergency service available to Property Care members only for safety reasons.
                  </p>
                  <div className="bg-yellow-50 rounded p-3 mt-3 text-sm">
                    <p className="text-gray-700 mb-2">
                      <strong>Extreme flooding emergency after hours?</strong>
                    </p>
                    <p className="text-gray-600">
                      • $300 emergency callout fee<br/>
                      • Plus 2x standard service rates<br/>
                      • Payment required upfront
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="mt-6 text-center bg-white rounded-lg p-4">
              <p className="text-gray-800 font-bold mb-2">
                Need 24/7 emergency access? Property Care members save hundreds on emergencies.
              </p>
              <a
                href="/property-care-plans"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-indigo-600 transition shadow-lg"
              >
                <Shield className="mr-2" size={20} />
                View Property Care Plans
              </a>
            </div>
          </div>

          {/* Emergency Banner */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-600 p-8 rounded-lg mb-12 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <AlertCircle className="text-red-600" size={28} />
              Plumbing Emergency? Call Now!
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-gray-900 mb-2">Call Immediately If You Have:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">🚨</span>
                    <span>Burst pipes or major water leaks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">🚨</span>
                    <span>Sewage backup or overflow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">🚨</span>
                    <span>No water in entire property</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">🚨</span>
                    <span>Gas leak (shut off main valve immediately)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">🚨</span>
                    <span>Flooding from plumbing failure</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-2">Our Emergency Response:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                    <span><strong>30-minute arrival</strong> for emergencies in Los Cabos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                    <span><strong>Fully stocked trucks</strong> with common parts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                    <span><strong>Licensed plumbers</strong> with 20+ years experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                    <span><strong>Transparent pricing</strong> even for emergencies</span>
                  </li>
                </ul>
                <a href="tel:+526121698328" className="mt-4 inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors w-full">
                  <AlertCircle size={20} />
                  Call Emergency Line: +52 612 169 8328
                </a>
              </div>
            </div>
          </div>

          {/* Complete Plumbing Services */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Plumbing Services</h2>
            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Droplet className="text-cyan-600" size={24} />
                  Leak Detection & Repair
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Electronic leak detection (non-invasive)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Hidden pipe leak location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Slab leak detection and repair</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Faucet and fixture leak repairs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Pipe joint and connection repairs</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Wrench className="text-cyan-600" size={24} />
                  Drain Cleaning & Unclogging
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Professional drain snaking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Hydro-jetting for stubborn clogs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Kitchen sink drain cleaning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Bathroom drain service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Main sewer line cleaning</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="text-cyan-600" size={24} />
                  Water Heater Service
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Tankless water heater installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Traditional tank water heaters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Water heater repairs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Maintenance and flushing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Emergency water heater replacement</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-cyan-600" size={24} />
                  Fixture Installation & Repair
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Faucet installation and replacement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Toilet installation, repair, and replacement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Shower and tub installations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Sink installations (kitchen, bathroom, utility)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Garbage disposal installation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Wrench className="text-cyan-600" size={24} />
                  Pipe Repair & Replacement
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Burst pipe emergency repairs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Pipe replacement (copper, PEX, PVC)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Sewer line repair and replacement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Re-piping for old properties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Corrosion prevention (critical in Cabo)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Droplet className="text-cyan-600" size={24} />
                  Specialized Services
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Bathroom and kitchen remodeling plumbing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Water filtration system installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Pressure regulator installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Pool and spa plumbing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={18} />
                    <span>Outdoor shower and hose bib installation</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Why Cabo Needs Expert Plumbers */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Cabo San Lucas Properties Need Expert Plumbers</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Salt Air Corrosion</h3>
                <p className="text-gray-600">
                  Cabo's coastal environment accelerates corrosion on pipes, fixtures, and connections. Our plumbers understand which materials resist corrosion and how to properly protect plumbing systems in salt air conditions.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Hard Water Issues</h3>
                <p className="text-gray-600">
                  Los Cabos has extremely hard water that causes mineral buildup in pipes, water heaters, and fixtures. Regular maintenance and proper equipment selection are essential to prevent premature failure.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">High Water Pressure</h3>
                <p className="text-gray-600">
                  Many Cabo properties have excessively high water pressure that damages fixtures and causes leaks. We install pressure regulators to protect your plumbing system and extend its lifespan.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Vacation Rental Demands</h3>
                <p className="text-gray-600">
                  High guest turnover in vacation rentals stresses plumbing systems. Quick repairs are essential—a clogged toilet or broken shower can destroy your 5-star rating and cost thousands in lost bookings.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Transparent Plumbing Pricing</h2>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-8 max-w-2xl mx-auto border border-cyan-200">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-cyan-600 mb-2">$60</div>
                <p className="text-gray-600">Service call includes diagnosis and first hour of work</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Simple clogs & drain cleaning: $60-120</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Faucet or fixture replacement: $80-200</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Toilet repair or replacement: $120-350</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Water heater repair: $150-400</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Water heater replacement: $800-2,500</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Emergency service: Standard pricing (no gouging)</span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm text-center italic">
                Prices include labor. Parts billed at cost. Free estimates for larger projects.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <button
              onClick={() => setIsFaqOpen(!isFaqOpen)}
              className="w-full flex items-center justify-between mb-6 hover:opacity-80 transition-opacity"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                Frequently Asked Questions About Plumbing in Cabo
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
                    Do you offer 24/7 emergency plumbing service in Cabo San Lucas?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-cyan-600 transition-transform ${openQuestion === 'faq1' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq1' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Yes! Property Care members receive true 24/7 emergency plumbing service, including after midnight. We provide 2-4 hour response times depending on your plan level (Elite: 2 hours, Premium/Basic: 4 hours).
                    </p>
                    <p className="mb-3">
                      For non-members, emergency service is available 7am-6pm for safety reasons. After 6pm, emergency service is available to Property Care members only. For extreme flooding emergencies after hours, non-members can request service for a $300 callout fee plus 2x standard rates.
                    </p>
                    <p>
                      <strong>Call +52 612 169 8328</strong> for immediate emergency assistance or to join Property Care for 24/7 access.
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
                    How much does a plumber cost in Cabo San Lucas?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-cyan-600 transition-transform ${openQuestion === 'faq2' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq2' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Our plumbing service starts at <strong>$60</strong>, which includes the service call, diagnosis, and the first hour of labor. This transparent pricing ensures you know what you're paying upfront with no hidden fees.
                    </p>
                    <p className="mb-3">
                      <strong>Common plumbing costs in Cabo:</strong>
                    </p>
                    <ul className="list-disc ml-6 mb-3 space-y-1">
                      <li>Simple drain clogs: $60-120</li>
                      <li>Faucet replacement: $80-200</li>
                      <li>Toilet repair/replacement: $120-350</li>
                      <li>Water heater repair: $150-400</li>
                      <li>Water heater replacement: $800-2,500</li>
                    </ul>
                    <p>
                      Parts are billed at cost. Property Care members receive 15-25% discounts on all services. Emergency calls do NOT have inflated pricing—we charge standard rates even at 2am.
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
                    Why do pipes corrode faster in Cabo San Lucas?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-cyan-600 transition-transform ${openQuestion === 'faq3' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq3' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Cabo's coastal environment creates the perfect storm for plumbing corrosion:
                    </p>
                    <ul className="list-disc ml-6 mb-3 space-y-2">
                      <li><strong>Salt air:</strong> Ocean salt accelerates corrosion on exposed pipes, fittings, and fixtures</li>
                      <li><strong>Hard water:</strong> Extremely high mineral content causes scale buildup that restricts flow and damages equipment</li>
                      <li><strong>High humidity:</strong> Promotes rust and corrosion on metal components</li>
                      <li><strong>UV exposure:</strong> Harsh sun degrades plastic pipes and fittings faster</li>
                    </ul>
                    <p>
                      Our plumbers understand these challenges and use corrosion-resistant materials (PEX, marine-grade fixtures) and proper sealing techniques. Regular inspections through Property Care Plans catch corrosion early before it causes expensive failures.
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
                    Can you fix plumbing problems same-day in Cabo?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-cyan-600 transition-transform ${openQuestion === 'faq4' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq4' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Yes! Most plumbing repairs can be completed the same day, and emergencies typically get 30-minute response times. Our service trucks are fully stocked with common parts (faucets, valves, toilet components, pipes, fittings, etc.) so we can complete repairs on the first visit.
                    </p>
                    <p className="mb-3">
                      <strong>Same-day repair examples:</strong>
                    </p>
                    <ul className="list-disc ml-6 mb-3 space-y-1">
                      <li>Leak repairs (faucets, pipes, toilets)</li>
                      <li>Drain clogs and cleaning</li>
                      <li>Toilet repairs and replacements</li>
                      <li>Faucet installations</li>
                      <li>Water heater repairs (most issues)</li>
                      <li>Burst pipe emergency repairs</li>
                    </ul>
                    <p>
                      For larger projects (water heater replacements, re-piping, bathroom remodels), we'll provide a detailed estimate and schedule the work at your convenience. Call <strong>+52 612 169 8328</strong> to schedule same-day service.
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
                    Do you service vacation rentals in Cabo San Lucas?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-cyan-600 transition-transform ${openQuestion === 'faq5' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq5' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Absolutely! Vacation rental plumbing is one of our specialties. We understand the urgency—a clogged toilet or broken shower between guest turnovers can cost you thousands in lost bookings and damage your 5-star rating.
                    </p>
                    <p className="mb-3">
                      <strong>Vacation rental services:</strong>
                    </p>
                    <ul className="list-disc ml-6 mb-3 space-y-1">
                      <li>Emergency same-day repairs between guest checkouts</li>
                      <li>Preventive maintenance through Property Care Plans</li>
                      <li>Monthly inspections to catch issues before guests arrive</li>
                      <li>Direct billing to property managers</li>
                      <li>Coordination with cleaning crews and property managers</li>
                    </ul>
                    <p>
                      Many Cabo vacation rental owners choose our Premium Property Care Plan ($199/month) for bi-monthly inspections, 2 free drain cleanings per month, and 2-hour emergency response. This prevents costly guest complaints and maintains your property's reputation.
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
                    Are your plumbers licensed and insured?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-cyan-600 transition-transform ${openQuestion === 'faq6' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq6' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Yes! All our plumbers are licensed professionals with 15-20+ years of experience. We are fully insured and bonded, protecting both you and our team during every job.
                    </p>
                    <p className="mb-3">
                      <strong>Our credentials:</strong>
                    </p>
                    <ul className="list-disc ml-6 mb-3 space-y-1">
                      <li>Licensed plumbers (not unlicensed handymen)</li>
                      <li>Comprehensive liability insurance</li>
                      <li>Workers' compensation for all employees</li>
                      <li>Background-checked and uniformed staff</li>
                      <li>Ongoing training on latest plumbing techniques</li>
                      <li>20+ years serving Los Cabos</li>
                    </ul>
                    <p>
                      We guarantee our work with a 90-day labor warranty. If a repair fails due to our workmanship within 90 days, we'll fix it free. Call <strong>+52 612 169 8328</strong> to work with Cabo's most trusted licensed plumbers.
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
                  <span className="text-purple-900 font-semibold text-sm">PREVENT PLUMBING EMERGENCIES</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Property Care Plans: Never Pay Emergency Fees Again
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed">
                  One plumbing emergency can cost $500-800. Property Care members get 24/7 emergency service included, FREE monthly drain cleaning, and 15-25% off all repairs for just $99-299/month.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Basic Care */}
                <div className="bg-white rounded-xl p-6 border-2 border-orange-300 shadow-lg">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-orange-600 mb-1">$99/mo</div>
                    <div className="text-sm text-gray-600">Basic Care</div>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>1 FREE unclog/month</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>24/7 emergency access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>4-hour emergency response</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>15% off all repairs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>Monthly inspection</span>
                    </li>
                  </ul>
                </div>

                {/* Premium Care - Highlighted */}
                <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-xl p-6 shadow-xl transform scale-105 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </div>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-white mb-1">$199/mo</div>
                    <div className="text-sm text-blue-100">Premium Care</div>
                  </div>
                  <ul className="space-y-3 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-white flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>2 FREE unclogs/month</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-white flex-shrink-0 mt-0.5" size={16} />
                      <span>24/7 emergency access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-white flex-shrink-0 mt-0.5" size={16} />
                      <span>2-hour emergency response</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-white flex-shrink-0 mt-0.5" size={16} />
                      <span>20% off all repairs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-white flex-shrink-0 mt-0.5" size={16} />
                      <span>Bi-monthly inspections</span>
                    </li>
                  </ul>
                </div>

                {/* Elite Care */}
                <div className="bg-white rounded-xl p-6 border-2 border-purple-300 shadow-lg">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-purple-600 mb-1">$299/mo</div>
                    <div className="text-sm text-gray-600">Elite Care</div>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>UNLIMITED unclogs</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>24/7 VIP emergency access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>1-hour emergency response</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>25% off all repairs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>Weekly inspections</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3 text-center">💰 Why Property Care Pays for Itself</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">Without Property Care (Pay-Per-Call):</p>
                    <ul className="space-y-1 ml-4">
                      <li>• 1 emergency call: $500-800</li>
                      <li>• 2 drain clogs: $120-240</li>
                      <li>• No preventive inspections</li>
                      <li>• <strong>Total: $620-1,040+/year</strong></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">With Basic Property Care:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• <strong>$99/month</strong> = $1,188/year</li>
                      <li>• Unlimited emergencies: $0</li>
                      <li>• 12 FREE drain clogs: $720 value</li>
                      <li>• Monthly inspections prevent issues</li>
                      <li>• <strong>Save $500+ on first emergency</strong></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="/property-care-plans"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-xl"
                >
                  <Shield size={20} />
                  View All Property Care Plans & Pricing
                  <ArrowRight size={20} />
                </a>
                <p className="text-sm text-gray-600 mt-4">
                  Join 200+ Cabo property owners who never worry about plumbing emergencies
                </p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a Plumber in Cabo San Lucas?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              24/7 emergency service with 30-minute response time. Licensed, experienced plumbers ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors shadow-xl"
              >
                <AlertCircle size={20} />
                Emergency: +52 612 169 8328
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-cyan-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Schedule Service <ArrowRight size={20} />
              </a>
            </div>
            <p className="text-cyan-100 mt-6 text-sm">
              24/7 Emergency Service • 30-Minute Response • Licensed Plumbers • 20+ Years Experience
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
