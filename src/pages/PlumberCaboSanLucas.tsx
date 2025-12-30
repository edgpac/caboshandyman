import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Droplet, Wrench, Clock, Shield, Zap, ArrowRight, AlertCircle } from 'lucide-react';

const Footer = lazy(() => import('@/components/Footer'));

export default function PlumberCaboSanLucas() {
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
        title="Plumber Cabo San Lucas | 24/7 Emergency Plumbing | Cabos Handyman"
        description="Professional plumber in Cabo San Lucas with 24/7 emergency service. Licensed plumbers for repairs, installations, water heaters, and drain cleaning. 30-minute response time."
        canonicalUrl="/plumber-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8905;-109.9167"
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
              24/7 Emergency Plumber in Cabo San Lucas
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Licensed plumbers available 24/7 for emergency repairs, installations, and maintenance. 30-minute response time for urgent situations. Serving all of Los Cabos.
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
              <strong>30-Minute Emergency Response</strong> • Available 24/7/365
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
              Plumbing emergencies don't wait for business hours. A burst pipe at 2 AM, a clogged toilet before guests arrive, or a failed water heater in the middle of summer demands immediate professional help. With over 20 years serving Cabo San Lucas, our licensed plumbers provide 24/7 emergency service with a 30-minute response time for critical situations.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From simple repairs to complete system installations, our bilingual team (English/Spanish) handles all plumbing needs for residential, commercial, and vacation rental properties throughout Los Cabos. We combine local expertise with professional-grade equipment to solve plumbing problems quickly and correctly the first time.
            </p>
          </div>

          {/* Emergency Banner */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-600 p-8 rounded-lg mb-12 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <AlertCircle className="text-red-600" size={28} />
              Plumbing Emergency? We're Here 24/7
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
