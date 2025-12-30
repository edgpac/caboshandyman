import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, DollarSign, Clock, ArrowRight, Droplet, Zap } from 'lucide-react';

const Footer = lazy(() => import('@/components/Footer'));

export default function KitchenServicesCabo() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Kitchen Remodeling and Repair Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Cabos Handyman - Kitchen Services",
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
    { name: "Sink Installation/Replacement", price: "$180", duration: "2-4 hours", category: "plumbing" },
    { name: "Faucet Installation", price: "$120", duration: "1-2 hours", category: "plumbing" },
    { name: "Garbage Disposal Installation", price: "$200", duration: "2-3 hours", category: "plumbing" },
    { name: "Dishwasher Installation", price: "$250", duration: "3-4 hours", category: "plumbing" },
    { name: "Kitchen Drain Plumbing", price: "$150", duration: "2-3 hours", category: "plumbing" },
    { name: "Shut-off Valve Replacement", price: "$100", duration: "1-2 hours", category: "plumbing" },
    { name: "Sink Unclogging", price: "$60", duration: "30min-1hr", category: "plumbing" },
    { name: "Ceiling Light Installation", price: "$120", duration: "1-2 hours", category: "electrical" },
    { name: "Ceiling Fan Installation", price: "$180", duration: "2-3 hours", category: "electrical" },
    { name: "Outlet Installation/Replacement", price: "$90", duration: "1 hour", category: "electrical" },
    { name: "Under-Cabinet Lighting", price: "$160", duration: "2-3 hours", category: "electrical" },
    { name: "Kitchen Island Electrical", price: "$220", duration: "3-4 hours", category: "electrical" },
    { name: "Cabinet Installation", price: "$300+", duration: "4-8 hours", category: "carpentry" },
    { name: "Countertop Installation", price: "$400+", duration: "4-6 hours", category: "carpentry" },
    { name: "Backsplash Installation", price: "$250+", duration: "3-5 hours", category: "carpentry" },
    { name: "Kitchen Hardware Installation", price: "$80", duration: "1-2 hours", category: "carpentry" }
  ];

  return (
    <>
      <SEO
        title="Kitchen Services Cabo San Lucas | Remodeling & Repair | Cabos Handyman"
        description="Complete kitchen services in Cabo San Lucas. Cabinet installation, plumbing, electrical, countertops, and backsplash. Professional kitchen remodeling from $60 service call."
        canonicalUrl="/kitchen-services-cabo"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8905;-109.9167"
        schemaMarkup={schemaMarkup}
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-600 to-red-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Wrench size={20} />
              <span className="text-sm font-medium">Complete Kitchen Services</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Professional Kitchen Services in Cabo San Lucas
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              From simple repairs to complete kitchen remodels. Expert plumbing, electrical, cabinetry, and installation services. 20+ years experience in Los Cabos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                Get Free Quote <ArrowRight size={20} />
              </a>
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-400 transition-colors"
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
              Your kitchen is the heart of your Cabo home, whether it's a permanent residence or vacation rental. From outdated appliances and worn-out countertops to clogged sinks and malfunctioning lighting, kitchen issues demand professional expertise. With over 20 years serving Los Cabos, Cabos Handyman provides comprehensive kitchen services that combine skilled plumbing, electrical work, and carpentry to transform or repair your kitchen efficiently and affordably.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              The coastal climate of Cabo San Lucas creates unique challenges for kitchens—salt air accelerates corrosion on fixtures, hard water clogs faucets and disposal units, and high humidity affects cabinetry. Our bilingual team (English/Spanish) understands these local conditions and uses appropriate materials and techniques to ensure lasting results. Whether you need a simple faucet replacement, complete cabinet installation, or full kitchen renovation, we handle every aspect with professional craftsmanship.
            </p>
          </div>

          {/* Why Cabo Kitchens Need Professional Service */}
          <div className="mb-12 bg-gradient-to-br from-orange-50 to-red-50 border-l-4 border-orange-600 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Cabo Kitchens Require Expert Service</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Coastal Environment Challenges</h3>
                <p className="text-gray-700 mb-3">
                  Salt air corrodes faucets, cabinet hardware, and appliance connections faster than inland areas. Professional installation with corrosion-resistant materials prevents premature failure and expensive replacements.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Hard Water Issues</h3>
                <p className="text-gray-700 mb-3">
                  Los Cabos has extremely hard water that clogs aerators, damages garbage disposals, and leaves mineral buildup in pipes. Regular maintenance and proper fixture selection are essential for longevity.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Vacation Rental Standards</h3>
                <p className="text-gray-700 mb-3">
                  Vacation rental guests expect modern, functional kitchens. A broken disposal, leaky faucet, or outdated lighting can tank your 5-star rating. Professional service keeps kitchens guest-ready.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Building Code Compliance</h3>
                <p className="text-gray-700 mb-3">
                  Electrical and plumbing work must meet local building codes. DIY mistakes can create safety hazards, fail inspections, or cause insurance issues. Licensed professionals ensure code compliance.
                </p>
              </div>
            </div>
          </div>

          {/* Complete Service Pricing Table */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Complete Kitchen Services & Pricing</h2>
            <p className="text-center text-gray-600 mb-8 text-lg">
              Transparent pricing for all kitchen services. $60 service call includes first hour of labor.
            </p>

            {/* Plumbing Services */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-cyan-500 w-12 h-12 rounded-full flex items-center justify-center">
                  <Droplet className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Kitchen Plumbing Services</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {services.filter(s => s.category === 'plumbing').map((service, idx) => (
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

            {/* Electrical Services */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center">
                  <Zap className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Kitchen Electrical Services</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {services.filter(s => s.category === 'electrical').map((service, idx) => (
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

            {/* Carpentry & Installation */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center">
                  <Wrench className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Carpentry & Installation</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {services.filter(s => s.category === 'carpentry').map((service, idx) => (
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

          {/* Kitchen Remodeling Packages */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Kitchen Remodeling Packages</h2>
            <p className="text-center text-gray-600 mb-8">
              Complete kitchen renovations with transparent package pricing based on scope and materials.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-orange-500 transition-colors">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Basic Refresh</h3>
                <div className="text-4xl font-bold text-orange-600 mb-4 text-center">$3,000-$8,000</div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>New countertops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Backsplash installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>New sink & faucet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Updated lighting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Cabinet hardware upgrade</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-600 to-red-700 border-2 border-orange-600 rounded-xl p-6 text-white transform scale-105 shadow-xl">
                <div className="bg-yellow-400 text-orange-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                  MOST POPULAR
                </div>
                <h3 className="text-2xl font-bold mb-2 text-center">Standard Remodel</h3>
                <div className="text-4xl font-bold mb-4 text-center">$8,000-$20,000</div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>All Basic Refresh items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>Cabinet refacing or replacement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>Appliance installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>New flooring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>Electrical upgrades</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-orange-500 transition-colors">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Complete Renovation</h3>
                <div className="text-4xl font-bold text-orange-600 mb-4 text-center">$20,000+</div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>All Standard Remodel items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Custom cabinetry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Layout modifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>High-end finishes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-1" size={18} />
                    <span>Complete electrical/plumbing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Choose Cabos Handyman for Kitchen Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="text-orange-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">20+ Years Experience</h3>
                <p className="text-gray-600 text-sm">Extensive experience with Cabo's unique climate and building requirements</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-orange-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Licensed & Insured</h3>
                <p className="text-gray-600 text-sm">Fully licensed for plumbing, electrical, and construction work in Mexico</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="text-orange-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Transparent Pricing</h3>
                <p className="text-gray-600 text-sm">Written estimates, no hidden fees, $60 service call includes first hour</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-orange-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">24/7 Emergency Service</h3>
                <p className="text-gray-600 text-sm">Available for urgent kitchen plumbing and electrical emergencies</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Cabo Kitchen?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              From simple repairs to complete remodels. Get your free quote today for professional kitchen services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Request Free Quote <ArrowRight size={20} />
              </a>
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-400 transition-colors"
              >
                Call: +52 612 169 8328
              </a>
            </div>
            <p className="text-orange-100 mt-6 text-sm">
              Serving All of Los Cabos • 20+ Years Experience • Bilingual Team • Licensed & Insured
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
