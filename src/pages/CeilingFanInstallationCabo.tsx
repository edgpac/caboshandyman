import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Fan, Zap, Shield, Clock, ArrowRight, Wind } from 'lucide-react';

const Footer = lazy(() => import('@/components/Footer'));

export default function CeilingFanInstallationCabo() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Ceiling Fan Installation",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Cabos Handyman - Ceiling Fan Installation",
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
        title="Ceiling Fan Installation Cabo San Lucas | Expert Installation | Cabos Handyman"
        description="Professional ceiling fan installation in Cabo San Lucas. Expert installation, repair, and replacement for all ceiling fan types. Same-day service available. Starting at $60."
        canonicalUrl="/ceiling-fan-installation-cabo"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
        schemaMarkup={schemaMarkup}
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-600 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Fan size={20} />
              <span className="text-sm font-medium">Professional Installation & Repair</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Expert Ceiling Fan Installation in Cabo San Lucas
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Stay cool in Cabo's heat with professionally installed ceiling fans. Expert installation, repair, and replacement for all fan types. Same-day service available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                Schedule Installation <ArrowRight size={20} />
              </a>
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-400 transition-colors"
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
              Ceiling fans aren't a luxury in Cabo San Lucas—they're essential. With summer temperatures regularly exceeding 35°C (95°F) and high humidity, ceiling fans provide constant air circulation that makes indoor spaces comfortable while reducing AC costs. But improper installation can lead to dangerous wobbling, electrical failures, or fans that fall from the ceiling.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With over 20 years serving Los Cabos and thousands of ceiling fans installed, our licensed electricians ensure safe, secure installation with proper wiring and balanced operation. From bedrooms and living rooms to outdoor patios and vacation rentals, we handle all ceiling fan installation and repair needs. Same-day service available for most installations.
            </p>
          </div>

          {/* Why Professional Installation Matters */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-600 p-8 rounded-lg mb-12 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Shield className="text-red-600" size={28} />
              Why DIY Ceiling Fan Installation is Dangerous
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-gray-900 mb-2">Safety Risks:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">⚠️</span>
                    <span>Electrical shock from improper wiring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">⚠️</span>
                    <span>Fan falling from ceiling (poor mounting)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">⚠️</span>
                    <span>Fire hazard from incorrect electrical connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">⚠️</span>
                    <span>Ceiling damage from wrong mounting bracket</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-2">Common Problems:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">❌</span>
                    <span>Dangerous wobbling from improper balancing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">❌</span>
                    <span>Noisy operation from loose components</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">❌</span>
                    <span>Fan doesn't work or only works on some speeds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">❌</span>
                    <span>Remote control or wall switch not functioning</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 font-semibold mt-4">
              <strong>Professional Installation:</strong> We ensure safe electrical connections, proper structural mounting, precise balancing, and quiet operation. Installation typically takes 45-90 minutes per fan.
            </p>
          </div>

          {/* Services */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Ceiling Fan Services</h2>
            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Fan className="text-emerald-600" size={24} />
                  New Fan Installation
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Complete installation from start to finish</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Electrical box inspection & reinforcement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Proper wiring and grounding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Secure mounting bracket installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Fan balancing and testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Old fan removal and disposal included</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="text-emerald-600" size={24} />
                  Electrical Wiring
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>New ceiling box installation where needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Wall switch installation or conversion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Remote control installation and programming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Replacing light fixture with fan/light combo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Upgrading to smart fan controls</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Wind className="text-emerald-600" size={24} />
                  Fan Repair & Maintenance
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Wobbling and noise troubleshooting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Motor repair or replacement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Blade replacement and balancing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Light kit repair or replacement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Remote control troubleshooting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Annual preventive maintenance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-emerald-600" size={24} />
                  Specialty Installations
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Outdoor/patio ceiling fans (weather-resistant)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Large fans for high ceilings (cathedral, vaulted)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Hugger/low-profile fans for low ceilings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Commercial and industrial ceiling fans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>Multiple fan installations (vacation rentals)</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Why Ceiling Fans are Essential in Cabo */}
          <div className="mb-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Ceiling Fans are Essential in Cabo San Lucas</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Wind className="text-emerald-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Constant Air Circulation</h3>
                  <p className="text-gray-600">Cabo's heat and humidity make still air unbearable. Ceiling fans provide constant air movement that makes rooms feel 5-7°C cooler without AC.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Zap className="text-emerald-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Lower Electricity Bills</h3>
                  <p className="text-gray-600">Running a ceiling fan costs pennies per day vs. hundreds for AC. Use fans to reduce AC usage and save 30-40% on electric bills.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Fan className="text-emerald-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Vacation Rental Appeal</h3>
                  <p className="text-gray-600">Guests expect ceiling fans in every bedroom and living space. Missing fans hurt reviews and bookings. They're a rental necessity, not a luxury.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Transparent Installation Pricing</h2>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 max-w-2xl mx-auto border border-emerald-200">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-emerald-600 mb-2">$60</div>
                <p className="text-gray-600">Service call includes first hour of installation</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Standard ceiling fan installation: $80-150</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Outdoor/patio fan installation: $120-200</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">High ceiling/cathedral ceiling: add $50-100</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">New electrical box installation: add $60-120</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Wall switch installation: add $40-80</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Fan repair/troubleshooting: $60-150</span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm text-center italic">
                Fan not included in price. We can supply quality fans at competitive prices or install yours.
              </p>
            </div>
          </div>

          {/* Multi-Fan Discount */}
          <div className="mb-12 bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Multi-Fan Installation Discount</h2>
            <p className="text-center text-gray-600 mb-6">
              Setting up a vacation rental or whole home? We offer package pricing for multiple ceiling fan installations.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center bg-white rounded-lg p-6 border border-gray-200">
                <div className="text-3xl font-bold text-emerald-600 mb-2">3-4 Fans</div>
                <p className="text-gray-600">10% discount on labor</p>
              </div>
              <div className="text-center bg-white rounded-lg p-6 border-2 border-emerald-600">
                <div className="text-3xl font-bold text-emerald-600 mb-2">5-7 Fans</div>
                <p className="text-gray-600 font-semibold">15% discount on labor</p>
              </div>
              <div className="text-center bg-white rounded-lg p-6 border border-gray-200">
                <div className="text-3xl font-bold text-emerald-600 mb-2">8+ Fans</div>
                <p className="text-gray-600">20% discount on labor</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Stay Cool with Professional Ceiling Fans?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Same-day installation available. Safe, secure mounting with perfect balancing. Serving all of Cabo San Lucas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Schedule Installation <ArrowRight size={20} />
              </a>
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-400 transition-colors"
              >
                Call: +52 612 169 8328
              </a>
            </div>
            <p className="text-emerald-100 mt-6 text-sm">
              Same-Day Service • Licensed Electricians • Multi-Fan Discounts • 20+ Years Experience
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
