import { lazy, useState } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, DollarSign, Clock, ArrowRight, Droplet, Zap, ChevronDown, Shield } from 'lucide-react';

const Footer = lazy(() => import('@/components/Footer'));
import RelatedServices from '../components/RelatedServices';

export default function KitchenServicesCabo() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

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
        "latitude": "22.8866974",
        "longitude": "-109.9139710"
      },
      "telephone": "+52-612-169-8328",
      "priceRange": "$60+",
      "openingHours": "Mo-Su 00:00-23:59",
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
    ]
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
    { name: "Ceiling Fan Installation", price: "$125", duration: "2-3 hours", category: "electrical" },
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
        title="Kitchen Remodeling Cabo San Lucas & Los Cabos | Cabos Handyman"
        description="Kitchen remodeling contractors in Los Cabos & Cabo San Lucas. Cabinet installation, plumbing, electrical, countertops, and backsplash. 20+ years experience. From $60 service call."
        canonicalUrl="/kitchen-services-cabo"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
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
              Kitchen Remodeling & Repair in Cabo San Lucas
              <span className="block text-2xl md:text-3xl font-normal mt-2 text-white/90">Serving All of Los Cabos</span>
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

          {/* FAQ Section */}
          <div className="mb-12">
            <button
              onClick={() => setIsFaqOpen(!isFaqOpen)}
              className="w-full flex items-center justify-between mb-6 hover:opacity-80 transition-opacity"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                Frequently Asked Questions About Kitchen Services in Cabo
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
                    How much does a kitchen remodel cost in Cabo San Lucas?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-orange-600 transition-transform ${openQuestion === 'faq1' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq1' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Kitchen remodel costs in Cabo San Lucas vary widely based on scope, materials, and finishes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mb-3 ml-4">
                      <li><strong>Basic Refresh ($3,000-$8,000):</strong> New countertops, backsplash, sink/faucet, updated lighting, and cabinet hardware upgrades</li>
                      <li><strong>Standard Remodel ($8,000-$20,000):</strong> Cabinet refacing/replacement, appliance installation, new flooring, electrical upgrades, plus all Basic Refresh items</li>
                      <li><strong>Complete Renovation ($20,000+):</strong> Custom cabinetry, layout modifications, high-end finishes, complete electrical/plumbing overhaul</li>
                    </ul>
                    <p className="mb-3">
                      For smaller repairs and installations:
                    </p>
                    <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                      <li>Faucet installation: $120</li>
                      <li>Garbage disposal installation: $200</li>
                      <li>Dishwasher installation: $250</li>
                      <li>Under-cabinet lighting: $160</li>
                    </ul>
                    <p>
                      All estimates include labor and basic materials. Call <a href="tel:+526121698328" className="text-orange-600 hover:underline font-medium">+52 612 169 8328</a> for a free detailed quote based on your specific project.
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
                    Why does Cabo's coastal climate affect kitchen materials?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-orange-600 transition-transform ${openQuestion === 'faq2' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq2' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      <strong>Cabo's coastal environment creates unique challenges for kitchen materials and fixtures:</strong>
                    </p>
                    <p className="mb-3">
                      <strong>Salt Air Corrosion:</strong> Ocean salt accelerates corrosion on faucets, cabinet hardware, hinges, and appliance connections. Within 2-3 years, standard hardware can corrode and fail. We use marine-grade stainless steel and corrosion-resistant finishes specifically rated for coastal environments.
                    </p>
                    <p className="mb-3">
                      <strong>Hard Water Damage:</strong> Los Cabos has extremely hard water (400+ ppm mineral content) that clogs aerators, damages garbage disposals, leaves white buildup on fixtures, and shortens appliance lifespan. We recommend and install fixtures designed for hard water conditions and can add water softener hookups.
                    </p>
                    <p className="mb-3">
                      <strong>High Humidity:</strong> Coastal humidity causes wooden cabinets to swell, warp, and delaminate faster than inland areas. We recommend marine-grade cabinet finishes and proper ventilation to extend cabinet life.
                    </p>
                    <p>
                      Our 20+ years in Cabo means we know which materials last and which fail quickly. This experience saves you money on premature replacements and ensures your kitchen investment endures the coastal climate.
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
                    Can you install appliances I purchased elsewhere?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-orange-600 transition-transform ${openQuestion === 'faq3' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq3' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      <strong>Absolutely! We install appliances purchased from any retailer.</strong> Many Cabo homeowners buy appliances in the US (Home Depot, Lowry's, Costco) and bring them to Mexico, or purchase from local Cabo retailers like Home Depot Cabo, Liverpool, or Coppel.
                    </p>
                    <p className="mb-3">
                      <strong>Appliance Installation Services:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-2 mb-3 ml-4">
                      <li><strong>Dishwasher installation:</strong> $250 (includes water hookup, drain connection, electrical, securing to cabinets)</li>
                      <li><strong>Garbage disposal:</strong> $200 (includes plumbing connections and electrical wiring)</li>
                      <li><strong>Range/oven installation:</strong> $180-300 (depending on gas vs electric, complexity)</li>
                      <li><strong>Range hood installation:</strong> $200-350 (includes ducting and electrical)</li>
                      <li><strong>Built-in microwave:</strong> $180 (includes electrical and cabinet mounting)</li>
                      <li><strong>Refrigerator water line:</strong> $150 (for ice makers and water dispensers)</li>
                    </ul>
                    <p className="mb-3">
                      <strong>Important Note:</strong> Many US appliances are designed for 60Hz electrical systems. Mexico uses 60Hz as well, so most US appliances work fine in Cabo. However, always verify voltage compatibility before purchasing.
                    </p>
                    <p>
                      We can also advise on which appliances work best in Cabo's hard water and coastal environment before you purchase. Call <a href="tel:+526121698328" className="text-orange-600 hover:underline font-medium">+52 612 169 8328</a> with your model numbers for compatibility check.
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
                    How long does a typical kitchen remodel take in Cabo?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-orange-600 transition-transform ${openQuestion === 'faq4' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq4' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Kitchen remodel timelines depend on project scope:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mb-3 ml-4">
                      <li><strong>Basic Refresh (1-3 days):</strong> Countertop, backsplash, sink/faucet, and lighting updates can typically be completed in 1-3 days of work, spread over 1-2 weeks for material delivery and curing time</li>
                      <li><strong>Standard Remodel (1-3 weeks):</strong> Cabinet installation, flooring, electrical upgrades, and appliances require 5-15 working days, spread over 2-4 weeks for deliveries and inspections</li>
                      <li><strong>Complete Renovation (4-8 weeks):</strong> Custom cabinetry, layout changes, and complete electrical/plumbing overhauls take 15-30 working days, spread over 1-2 months for material sourcing, permits, and inspections</li>
                    </ul>
                    <p className="mb-3">
                      <strong>Cabo-Specific Delays:</strong> Material availability can be less predictable in Los Cabos than in major US cities. We maintain relationships with local suppliers and can source from the US when needed to minimize delays. Custom items (special-order cabinets, imported countertops) may add 2-4 weeks to the timeline.
                    </p>
                    <p className="mb-3">
                      <strong>For Vacation Rentals:</strong> We can work around your booking calendar, doing work in phases between guest stays if needed. Premium Property Care members receive priority scheduling to minimize rental income disruption.
                    </p>
                    <p>
                      We provide realistic timelines during the estimate phase and keep you updated throughout the project. Most small repairs and installations (faucets, disposals, lighting) can be completed same-day or next-day.
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
                    Do I need permits for kitchen work in Cabo San Lucas?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-orange-600 transition-transform ${openQuestion === 'faq5' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq5' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Permit requirements in Los Cabos depend on the scope of work:
                    </p>
                    <p className="mb-3">
                      <strong>Usually NO permits needed for:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                      <li>Faucet, sink, or garbage disposal replacement</li>
                      <li>Light fixture or outlet installation (no new circuits)</li>
                      <li>Cabinet hardware, backsplash, or countertop replacement</li>
                      <li>Appliance installation using existing hookups</li>
                    </ul>
                    <p className="mb-3">
                      <strong>Permits REQUIRED for:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                      <li>New electrical circuits or panel upgrades</li>
                      <li>Moving or adding plumbing lines (sinks, gas lines)</li>
                      <li>Structural changes (removing walls, moving appliances to new locations)</li>
                      <li>Complete kitchen renovations exceeding certain costs</li>
                    </ul>
                    <p className="mb-3">
                      <strong>Our Permit Services:</strong> We handle all permit applications for you when required. Costs typically range from $100-500 depending on scope. Permit processing usually takes 1-2 weeks in Los Cabos. We're familiar with local building codes and inspection requirements to ensure everything passes on the first try.
                    </p>
                    <p>
                      <strong>Important:</strong> Working without required permits can cause issues when selling your property or making insurance claims. We'll advise you honestly about what's required and handle all paperwork professionally.
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
                    What's the best time of year to remodel a kitchen in Cabo?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-orange-600 transition-transform ${openQuestion === 'faq6' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq6' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      <strong>The "shoulder seasons" (May-June and September-October) are ideal for kitchen remodels in Cabo:</strong>
                    </p>
                    <p className="mb-3">
                      <strong>May-June (After Spring Break, Before Summer Rush):</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                      <li>Lower vacation rental occupancy means less lost income</li>
                      <li>Contractors have more availability (not peak construction season)</li>
                      <li>Weather is stable (no hurricane risk, moderate heat)</li>
                      <li>Materials dry/cure properly in ideal humidity conditions</li>
                    </ul>
                    <p className="mb-3">
                      <strong>September-October (After Hurricane Season Peak, Before Winter Rush):</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                      <li>Hurricane season winding down (most storms are July-September)</li>
                      <li>Cooler temperatures make working conditions better</li>
                      <li>Projects completed before Thanksgiving/Christmas rental peak</li>
                      <li>Contractors have good availability</li>
                    </ul>
                    <p className="mb-3">
                      <strong>Avoid if Possible:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                      <li><strong>December-March:</strong> Peak vacation rental season (highest opportunity cost for lost rental income)</li>
                      <li><strong>August-early September:</strong> Peak hurricane season (material deliveries can be delayed, outdoor work interrupted)</li>
                    </ul>
                    <p>
                      <strong>That said, we work year-round and can accommodate your schedule.</strong> Property Care members receive priority scheduling regardless of season. Call <a href="tel:+526121698328" className="text-orange-600 hover:underline font-medium">+52 612 169 8328</a> to discuss the best timing for your specific situation.
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
                  <span className="text-purple-900 font-semibold text-sm">PROTECT YOUR KITCHEN INVESTMENT</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Property Care Plans: Keep Your Kitchen in Perfect Condition
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed">
                  After investing thousands in your Cabo kitchen, protect it with regular maintenance. Property Care members get priority service, free monthly drain cleaning, and catch small issues before they become expensive emergencies.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">

                {/* Basic Care - $99/mo */}
                <div className="bg-white rounded-xl p-6 border-2 border-orange-300 shadow-lg">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-orange-600 mb-1">$99/mo</div>
                    <div className="text-sm text-gray-600">Basic Care</div>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>1 FREE kitchen drain unclog/month</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>Monthly inspection</strong> of plumbing, electrical, fixtures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>15% discount</strong> on all kitchen repairs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>Priority 4-hour emergency response</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-xs text-gray-500 italic">Perfect for homeowners and single properties</p>
                </div>

                {/* Premium Care - $199/mo - HIGHLIGHTED */}
                <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-xl p-6 shadow-xl transform scale-105 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </div>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-white mb-1">$199/mo</div>
                    <div className="text-sm text-cyan-100">Premium Care</div>
                  </div>
                  <ul className="space-y-3 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>2 FREE drain unclogs/month</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>Bi-monthly inspections</strong> (every 2 weeks)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>20% discount on repairs</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span>24/7 emergency service (2-hour response)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span>Photo documentation of all work</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-xs text-cyan-100 italic">Best for vacation rentals and remote owners</p>
                </div>

                {/* Elite Care - $299/mo */}
                <div className="bg-white rounded-xl p-6 border-2 border-purple-300 shadow-lg">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-purple-600 mb-1">$299/mo</div>
                    <div className="text-sm text-gray-600">Elite Care</div>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>UNLIMITED drain unclogs</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>Weekly inspections</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>25% discount on repairs</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>VIP 1-hour emergency response</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>$100/month FREE minor repairs included</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-xs text-gray-500 italic">Ideal for luxury properties and portfolios</p>
                </div>

              </div>

              {/* ROI Example for Kitchen */}
              <div className="bg-white rounded-lg p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3 text-center">Why Kitchen Maintenance Pays for Itself</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">Common Kitchen Repairs (Pay-Per-Call):</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Clogged disposal repair: $150-250</li>
                      <li>• Leaking faucet emergency: $200-300</li>
                      <li>• Under-sink leak damage: $500-2,000</li>
                      <li>• <strong>Total: $850-2,550+/year</strong></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">With Premium Property Care:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• <strong>$199/month</strong> = $2,388/year</li>
                      <li>• 24 FREE drain unclogs: $1,440 value</li>
                      <li>• Catch leaks early = prevent $2,000 damage</li>
                      <li>• <strong>Saves hundreds + prevents disasters</strong></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <a
                  href="/property-care-plans"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-xl"
                >
                  <Shield size={20} />
                  View All Property Care Plans & Pricing
                  <ArrowRight size={20} />
                </a>
                <p className="mt-4 text-sm text-gray-600">
                  Questions? Call <a href="tel:+526121698328" className="text-purple-600 hover:underline font-medium">+52 612 169 8328</a> to discuss which plan is right for your property.
                </p>
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

      <RelatedServices currentPath="/kitchen-services-cabo" />
      <Footer />
    </>
  );
}
