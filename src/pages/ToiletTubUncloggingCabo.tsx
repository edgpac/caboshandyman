import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Droplet, Clock, Shield, ArrowRight, AlertCircle } from 'lucide-react';

const Footer = lazy(() => import('@/components/Footer'));
import RelatedServices from '../components/RelatedServices';

export default function ToiletTubUncloggingCabo() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Drain Cleaning and Unclogging Service",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Cabos Handyman - Drain Cleaning",
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
    "areaServed": [
      {
        "@type": "City",
        "name": "Cabo San Lucas"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Los Cabos"
      }
    ]
  };

  return (
    <>
      <SEO
        title="Toilet & Drain Unclogging Cabo San Lucas | 24/7 Service | Cabos Handyman"
        description="Fast toilet and drain unclogging service in Cabo San Lucas. Professional drain cleaning for clogged toilets, sinks, tubs, and showers. Same-day service available. Starting at $60."
        canonicalUrl="/toilet-tub-unclogging-cabo"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
        schemaMarkup={schemaMarkup}
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-cyan-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Droplet size={20} />
              <span className="text-sm font-medium">Professional Drain Cleaning</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Fast Toilet & Drain Unclogging in Cabo San Lucas
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Clogged toilet, slow drain, or backed-up shower? Professional unclogging service available 24/7. Same-day service for most jobs. Starting at $60.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors shadow-xl"
              >
                <AlertCircle size={20} />
                Call Now for Fast Service
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Get Quote <ArrowRight size={20} />
              </a>
            </div>
            <p className="mt-6 text-white/80 text-lg">
              <Clock className="inline mr-2" size={20} />
              <strong>Same-Day Service Available</strong> • 24/7 Emergency Response
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
              A clogged toilet or slow drain isn't just inconvenient—it can be a disaster, especially if you have guests arriving at your vacation rental or family visiting your Cabo home. DIY methods like plungers and chemical drain cleaners rarely solve the problem completely, and often make it worse by damaging pipes or pushing clogs deeper into the system.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With over 20 years serving Los Cabos, our professional drain cleaning service uses proper tools and techniques to completely clear clogs without damaging your plumbing. From simple toilet clogs to stubborn shower drain blockages, we handle all drain cleaning needs quickly and affordably. Same-day service available for most situations.
            </p>
          </div>

          {/* Common Clog Situations */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-600 p-8 rounded-lg mb-12 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <AlertCircle className="text-blue-600" size={28} />
              Common Clog Emergencies We Solve
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-gray-900 mb-3">Toilet Clogs</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 flex-shrink-0">•</span>
                    <span>Toilet won't flush or drains very slowly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 flex-shrink-0">•</span>
                    <span>Toilet overflowing (shut off water valve immediately)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 flex-shrink-0">•</span>
                    <span>Multiple toilets clogged (main sewer line issue)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 flex-shrink-0">•</span>
                    <span>Recurring clogs that keep coming back</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-3">Drain Clogs</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 flex-shrink-0">•</span>
                    <span>Shower or tub draining slowly or backing up</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 flex-shrink-0">•</span>
                    <span>Kitchen sink clogged (grease, food buildup)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 flex-shrink-0">•</span>
                    <span>Bathroom sink draining slowly (hair, soap scum)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 flex-shrink-0">•</span>
                    <span>Floor drain backup</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 font-semibold mt-4">
              <strong>Our Response:</strong> Most simple clogs cleared in under an hour. We arrive with professional drain snakes, augers, and hydro-jetting equipment to handle any blockage.
            </p>
          </div>

          {/* Services */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Drain Cleaning Services</h2>
            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Droplet className="text-blue-600" size={24} />
                  Toilet Unclogging
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Professional toilet auger service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Safe for all toilet types</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Won't damage porcelain or seals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Inspection for root cause</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Prevention recommendations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Droplet className="text-blue-600" size={24} />
                  Shower & Tub Drains
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Hair and soap scum removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Professional drain snake service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Drain cover removal and cleaning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>P-trap cleaning when needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Drain strainer installation to prevent future clogs</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Droplet className="text-blue-600" size={24} />
                  Kitchen Sink Drains
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Grease and food particle removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Garbage disposal drain cleaning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Double-sink drain service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Trap cleaning and maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Preventive maintenance tips</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Droplet className="text-blue-600" size={24} />
                  Advanced Drain Cleaning
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Hydro-jetting for stubborn clogs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Main sewer line cleaning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Camera inspection to locate deep clogs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Root intrusion removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Preventive drain maintenance plans</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Why Chemical Cleaners Fail */}
          <div className="mb-12 bg-gray-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Chemical Drain Cleaners Are a Bad Idea</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-red-600">Pipe Damage</h3>
                <p className="text-gray-600">
                  Harsh chemicals corrode pipes, especially older plumbing. They can eat through metal pipes and damage PVC connections, creating expensive problems worse than the original clog.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-red-600">Rarely Work Completely</h3>
                <p className="text-gray-600">
                  Chemical cleaners might partially dissolve a clog, but they rarely clear it completely. The clog returns within days or weeks, and you're back to the same problem.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-red-600">Dangerous Fumes</h3>
                <p className="text-gray-600">
                  Chemical drain cleaners release toxic fumes that are hazardous to breathe. In enclosed bathrooms, they can cause respiratory irritation and chemical burns if splashed.
                </p>
              </div>
            </div>
            <p className="text-gray-700 font-semibold mt-6 text-center">
              <strong>Professional Solution:</strong> Mechanical cleaning (snakes, augers, hydro-jetting) completely removes clogs without damaging pipes or creating toxic fumes.
            </p>
          </div>

          {/* Pricing */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Affordable, Transparent Pricing</h2>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 max-w-2xl mx-auto border border-blue-200">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-blue-600 mb-2">$60</div>
                <p className="text-gray-600">Service call includes first hour of drain cleaning</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Simple toilet clogs: $60-90</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Shower/tub drain cleaning: $60-120</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Kitchen sink clogs: $70-140</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Main line cleaning: $150-350</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Hydro-jetting (severe clogs): $200-500</span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm text-center italic">
                Same-day service available. No hidden fees. Payment after job completion.
              </p>
            </div>
          </div>

          {/* Prevention Tips */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Prevent Future Clogs</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Toilet Maintenance</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Only flush toilet paper (no wipes, even "flushable" ones)</li>
                  <li>• Don't use toilet as trash can</li>
                  <li>• Use less toilet paper per flush</li>
                  <li>• Educate vacation rental guests on proper usage</li>
                  <li>• Schedule annual preventive inspection</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Drain Maintenance</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Use drain strainers to catch hair and debris</li>
                  <li>• Run hot water after each use (kitchen sinks)</li>
                  <li>• Never pour grease down drains</li>
                  <li>• Monthly preventive flushing with hot water</li>
                  <li>• Professional cleaning every 1-2 years for vacation rentals</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Clogged Drain? We'll Clear It Fast.</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Same-day service available for most toilet and drain clogs in Cabo San Lucas. Call now for fast, affordable service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors shadow-xl"
              >
                <AlertCircle size={20} />
                Call: +52 612 169 8328
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Get Quote <ArrowRight size={20} />
              </a>
            </div>
            <p className="text-blue-100 mt-6 text-sm">
              Same-Day Service • 24/7 Emergency Available • Professional Equipment • 20+ Years Experience
            </p>
          </div>

        </div>
      </section>

      <RelatedServices currentPath="/toilet-tub-unclogging-cabo" />
      <Footer />
    </>
  );
}
