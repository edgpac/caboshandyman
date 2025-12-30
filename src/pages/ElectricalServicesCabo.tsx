import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Zap, DollarSign, Clock, ArrowRight, Shield, AlertCircle } from 'lucide-react';

const Footer = lazy(() => import('@/components/Footer'));

export default function ElectricalServicesCabo() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Electrician",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Cabos Handyman - Electrical Services",
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

  const services = [
    { name: "Outlet Installation/Replacement", price: "$90", duration: "1 hour", category: "basic" },
    { name: "Light Switch Installation", price: "$80", duration: "1 hour", category: "basic" },
    { name: "GFCI Outlet Installation", price: "$120", duration: "1-2 hours", category: "basic" },
    { name: "USB Outlet Installation", price: "$100", duration: "1 hour", category: "basic" },
    { name: "Ceiling Light Installation", price: "$120", duration: "1-2 hours", category: "lighting" },
    { name: "Ceiling Fan Installation", price: "$180", duration: "2-3 hours", category: "lighting" },
    { name: "Under-Cabinet Lighting", price: "$160", duration: "2-3 hours", category: "lighting" },
    { name: "Outdoor Lighting Installation", price: "$150", duration: "2-3 hours", category: "lighting" },
    { name: "Recessed Lighting Installation", price: "$200", duration: "3-4 hours", category: "lighting" },
    { name: "Smoke Detector Installation", price: "$80", duration: "30min-1hr", category: "safety" },
    { name: "CO Detector Installation", price: "$90", duration: "1 hour", category: "safety" },
    { name: "Emergency Exit Lighting", price: "$200", duration: "2-3 hours", category: "safety" },
    { name: "Circuit Breaker Replacement", price: "$150", duration: "1-2 hours", category: "advanced" },
    { name: "Electrical Panel Upgrade", price: "$600+", duration: "4-6 hours", category: "advanced" },
    { name: "Whole-Home Surge Protection", price: "$400", duration: "2-3 hours", category: "advanced" }
  ];

  return (
    <>
      <SEO
        title="Electrical Services Cabo San Lucas | Licensed Electrician | Cabos Handyman"
        description="Professional electrical services in Cabo San Lucas. Outlets, lighting, ceiling fans, panel upgrades. Licensed electricians available 24/7. Starting at $60 service call."
        canonicalUrl="/electrical-services-cabo"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8905;-109.9167"
        schemaMarkup={schemaMarkup}
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-yellow-500 to-orange-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Zap size={20} />
              <span className="text-sm font-medium">Licensed Electrical Services</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Professional Electrical Services in Cabo San Lucas
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Safe, code-compliant electrical work for homes and businesses. From simple outlet installation to complete panel upgrades. Licensed electricians with 20+ years experience in Los Cabos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-yellow-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                Get Free Quote <ArrowRight size={20} />
              </a>
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-colors"
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
              Electrical work isn't a DIY project—it requires professional expertise, proper tools, and knowledge of local building codes to ensure safety and compliance. Whether you need a simple outlet installation, complete lighting upgrades for your vacation rental, or emergency electrical repairs, Cabos Handyman provides licensed electrical services throughout Los Cabos. With over 20 years of experience, our team handles residential and commercial electrical projects with the precision and safety that electrical work demands.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Cabo San Lucas properties face unique electrical challenges—salt air accelerates corrosion on outdoor fixtures, power fluctuations can damage sensitive electronics, and high humidity affects electrical components. Our bilingual team (English/Spanish) understands these local conditions and uses corrosion-resistant materials, proper grounding techniques, and surge protection to ensure reliable, safe electrical systems. From basic repairs to comprehensive upgrades, we prioritize safety and code compliance on every project.
            </p>
          </div>

          {/* Safety Warning */}
          <div className="mb-12 bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-600 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <AlertCircle className="text-red-600" size={28} />
              Why DIY Electrical Work is Dangerous
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Safety Risks</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">⚠️</span>
                    <span><strong>Electrocution:</strong> Live wires can cause severe injury or death</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">⚠️</span>
                    <span><strong>Fire Hazard:</strong> Improper wiring causes thousands of electrical fires annually</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">⚠️</span>
                    <span><strong>Code Violations:</strong> Can fail inspections and void insurance</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Professional Standards</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                    <span>Licensed electricians with 20+ years experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                    <span>Code-compliant installation methods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                    <span>Proper grounding and safety protocols</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 font-semibold mt-4">
              <strong>Important:</strong> Complex electrical work (panel upgrades, main line wiring, extensive rewiring) may require certified electrician referral. We'll assess your project and provide appropriate recommendations.
            </p>
          </div>

          {/* Complete Service Pricing Table */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Complete Electrical Services & Pricing</h2>
            <p className="text-center text-gray-600 mb-8 text-lg">
              Transparent pricing for all electrical services. $60 service call includes first hour of labor.
            </p>

            {/* Basic Electrical Services */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center">
                  <Zap className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Basic Electrical Services</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {services.filter(s => s.category === 'basic').map((service, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-green-600">
                        <DollarSign size={18} />
                        <span className="font-bold text-lg">{service.price}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock size={16} className="mr-1" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lighting Services */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center">
                  <Zap className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Lighting Installation Services</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {services.filter(s => s.category === 'lighting').map((service, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-green-600">
                        <DollarSign size={18} />
                        <span className="font-bold text-lg">{service.price}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock size={16} className="mr-1" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Systems */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center">
                  <Shield className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Safety Systems</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {services.filter(s => s.category === 'safety').map((service, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-green-600">
                        <DollarSign size={18} />
                        <span className="font-bold text-lg">{service.price}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock size={16} className="mr-1" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Electrical Services */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-600 w-12 h-12 rounded-full flex items-center justify-center">
                  <Zap className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Advanced Electrical Services</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {services.filter(s => s.category === 'advanced').map((service, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-green-600">
                        <DollarSign size={18} />
                        <span className="font-bold text-lg">{service.price}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock size={16} className="mr-1" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Cabo Needs Expert Electrical Service */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Cabo Properties Need Professional Electrical Service</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Salt Air Corrosion</h3>
                <p className="text-gray-600">
                  Coastal salt air accelerates corrosion on outdoor electrical fixtures, outlets, and wiring. Professional installation with corrosion-resistant materials and proper weatherproofing prevents premature failure.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Power Fluctuations</h3>
                <p className="text-gray-600">
                  Mexico's electrical grid can experience voltage fluctuations that damage sensitive electronics. Surge protection and proper grounding protect expensive appliances and equipment.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Building Code Compliance</h3>
                <p className="text-gray-600">
                  Mexican electrical codes have specific requirements for residential and commercial properties. Non-compliant work can fail inspections, void insurance, and create safety hazards.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Vacation Rental Standards</h3>
                <p className="text-gray-600">
                  Guests expect reliable electrical systems—working outlets, proper lighting, and functioning ceiling fans. Electrical issues frustrate guests and damage your rating.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Choose Cabos Handyman for Electrical Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-yellow-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Licensed Electricians</h3>
                <p className="text-gray-600 text-sm">Professional electricians licensed for work in Mexico with 20+ years experience</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-yellow-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Code Compliant</h3>
                <p className="text-gray-600 text-sm">All work meets Mexican electrical codes and safety standards</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-yellow-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Safety First</h3>
                <p className="text-gray-600 text-sm">Proper grounding, surge protection, and safety protocols on every job</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-yellow-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">24/7 Emergency Service</h3>
                <p className="text-gray-600 text-sm">Available for urgent electrical emergencies</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Professional Electrical Services in Cabo?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Safe, code-compliant electrical work from licensed professionals. Get your free quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-yellow-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Request Free Quote <ArrowRight size={20} />
              </a>
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-colors"
              >
                Call: +52 612 169 8328
              </a>
            </div>
            <p className="text-yellow-100 mt-6 text-sm">
              Serving All of Los Cabos • Licensed Electricians • 20+ Years Experience • 24/7 Emergency Service
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
