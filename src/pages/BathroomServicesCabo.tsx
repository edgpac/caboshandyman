import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, DollarSign, Clock, ArrowRight, Droplet, Zap, Wind } from 'lucide-react';

const Footer = lazy(() => import('@/components/Footer'));
import RelatedServices from '../components/RelatedServices';

export default function BathroomServicesCabo() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Bathroom Remodeling and Repair Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Cabos Handyman - Bathroom Services",
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

  const services = [
    { name: "Toilet Installation", price: "$200", duration: "2-3 hours", category: "plumbing" },
    { name: "Vanity Installation", price: "$280", duration: "3-4 hours", category: "plumbing" },
    { name: "Shower Installation", price: "$600+", duration: "1-2 days", category: "plumbing" },
    { name: "Toilet & Tub Unclogging", price: "$60", duration: "30min-1hr", category: "plumbing" },
    { name: "Bathroom Faucet Installation", price: "$120", duration: "1-2 hours", category: "plumbing" },
    { name: "Shower Head Replacement", price: "$80", duration: "30min-1hr", category: "plumbing" },
    { name: "Bathroom Lighting", price: "$100", duration: "1-2 hours", category: "electrical" },
    { name: "Exhaust Fan Installation", price: "$180", duration: "2-3 hours", category: "electrical" },
    { name: "GFCI Outlet Installation", price: "$120", duration: "1-2 hours", category: "electrical" },
    { name: "Heated Towel Rack Installation", price: "$220", duration: "2-3 hours", category: "electrical" },
    { name: "Electrical Mirrors", price: "$125", duration: "1-2 hours", category: "electrical" },
    { name: "Tile Installation", price: "$12/sq ft", duration: "1-3 days", category: "installation" },
    { name: "Grout Repair/Replacement", price: "$8/sq ft", duration: "1-2 days", category: "installation" },
    { name: "Bathroom Flooring", price: "$15/sq ft", duration: "1-2 days", category: "installation" },
    { name: "Shower Waterproofing", price: "$300", duration: "1 day", category: "installation" },
    { name: "Mirror Hanging/Installation", price: "$80", duration: "1 hour", category: "installation" }
  ];

  return (
    <>
      <SEO
        title="Bathroom Remodeling Cabo San Lucas & Los Cabos | Cabos Handyman"
        description="Bathroom remodeling contractors in Los Cabos & Cabo San Lucas. Toilet installation, vanity, shower, tile work, and unclogging. 20+ years experience. From $60 service call."
        canonicalUrl="/bathroom-services-cabo"
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
              <span className="text-sm font-medium">Complete Bathroom Services</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Bathroom Remodeling & Repair in Cabo San Lucas
              <span className="block text-2xl md:text-3xl font-normal mt-2 text-white/90">Serving All of Los Cabos</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              From simple repairs to complete bathroom renovations. Expert plumbing, electrical, tile work, and installation services. 20+ years experience in Los Cabos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                Get Free Quote <ArrowRight size={20} />
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
              Bathrooms in Cabo San Lucas face constant challenges from high humidity, hard water, and salt air exposure. Whether it's a clogged toilet before guests arrive at your vacation rental, a leaky shower causing water damage, or an outdated bathroom needing a complete renovation, professional bathroom services are essential for maintaining functionality and property value. With over 20 years serving Los Cabos, Cabos Handyman provides comprehensive bathroom solutions that combine expert plumbing, electrical work, and tile installation.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              The coastal environment requires special attention—moisture control is critical to prevent mold, proper ventilation prevents humidity damage, and waterproofing must be done correctly to avoid expensive structural issues. Our bilingual team (English/Spanish) understands these local challenges and uses appropriate materials and techniques designed for Cabo's climate. From emergency unclogging services to complete luxury bathroom remodels, we handle every project with professional craftsmanship and attention to detail.
            </p>
          </div>

          {/* Why Cabo Bathrooms Need Professional Service */}
          <div className="mb-12 bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-600 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Cabo Bathrooms Require Expert Service</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">High Humidity & Moisture</h3>
                <p className="text-gray-700 mb-3">
                  Cabo's coastal humidity promotes mold growth and damages fixtures faster than dry climates. Proper ventilation, waterproofing, and moisture-resistant materials are essential for longevity.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Hard Water Damage</h3>
                <p className="text-gray-700 mb-3">
                  Extremely hard water in Los Cabos clogs shower heads, damages toilet fill valves, and leaves mineral buildup on fixtures. Professional installation with appropriate hardware prevents constant repairs.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Vacation Rental Critical</h3>
                <p className="text-gray-700 mb-3">
                  A clogged toilet or non-functional shower destroys guest experience and your 5-star rating instantly. Professional maintenance and emergency response keep bathrooms guest-ready 24/7.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Waterproofing Requirements</h3>
                <p className="text-gray-700 mb-3">
                  Improper waterproofing in showers and around tubs leads to devastating water damage, mold, and structural problems. Code-compliant professional installation protects your investment.
                </p>
              </div>
            </div>
          </div>

          {/* Complete Service Pricing Table */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Complete Bathroom Services & Pricing</h2>
            <p className="text-center text-gray-600 mb-8 text-lg">
              Transparent pricing for all bathroom services. $60 service call includes first hour of labor.
            </p>

            {/* Plumbing Services */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-cyan-500 w-12 h-12 rounded-full flex items-center justify-center">
                  <Droplet className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Bathroom Plumbing Services</h3>
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

            {/* Electrical & Ventilation Services */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center">
                  <Zap className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Electrical & Ventilation Services</h3>
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

            {/* Tile & Installation Services */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center">
                  <Wrench className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Tile & Installation Services</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {services.filter(s => s.category === 'installation').map((service, idx) => (
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

          {/* Bathroom Remodeling Packages */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Bathroom Remodeling Packages</h2>
            <p className="text-center text-gray-600 mb-8">
              Complete bathroom renovations with transparent package pricing based on scope and materials.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-colors">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Basic Update</h3>
                <div className="text-4xl font-bold text-blue-600 mb-4 text-center">$2,500-$6,000</div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Toilet replacement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Vanity & faucet upgrade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>New lighting & mirror</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Paint & accessories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Exhaust fan installation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-cyan-700 border-2 border-blue-600 rounded-xl p-6 text-white transform scale-105 shadow-xl">
                <div className="bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                  MOST POPULAR
                </div>
                <h3 className="text-2xl font-bold mb-2 text-center">Standard Remodel</h3>
                <div className="text-4xl font-bold mb-4 text-center">$6,000-$15,000</div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>All Basic Update items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>Tile shower surround</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>New flooring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>Custom vanity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                    <span>Upgraded fixtures</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-colors">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Luxury Renovation</h3>
                <div className="text-4xl font-bold text-blue-600 mb-4 text-center">$15,000+</div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>All Standard Remodel items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Walk-in shower or soaking tub</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Premium tile & stone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>Custom double vanity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>High-end fixtures & finishes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Choose Cabos Handyman for Bathroom Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplet className="text-blue-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Waterproofing Experts</h3>
                <p className="text-gray-600 text-sm">Proper waterproofing techniques prevent mold and water damage</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wind className="text-blue-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Moisture Control</h3>
                <p className="text-gray-600 text-sm">Ventilation solutions designed for Cabo's humid coastal climate</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-blue-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Licensed & Insured</h3>
                <p className="text-gray-600 text-sm">Fully licensed for plumbing, electrical, and tile work in Mexico</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-blue-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">24/7 Emergency Service</h3>
                <p className="text-gray-600 text-sm">Available for urgent bathroom plumbing emergencies</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Cabo Bathroom?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              From emergency repairs to complete luxury renovations. Get your free quote today for professional bathroom services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Request Free Quote <ArrowRight size={20} />
              </a>
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 transition-colors"
              >
                Call: +52 612 169 8328
              </a>
            </div>
            <p className="text-blue-100 mt-6 text-sm">
              Serving All of Los Cabos • 20+ Years Experience • Bilingual Team • Licensed & Insured
            </p>
          </div>

        </div>
      </section>

      <RelatedServices currentPath="/bathroom-services-cabo" />
      <Footer />
    </>
  );
}
