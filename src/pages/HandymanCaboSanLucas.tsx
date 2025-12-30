import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Home, Zap, Droplet, Fan, Package, Monitor, Users, Clock, Star, Shield, ArrowRight } from 'lucide-react';

const Footer = lazy(() => import('@/components/Footer'));

export default function HandymanCaboSanLucas() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Cabos Handyman",
    "image": "https://caboshandyman.com/CHLOGO.png",
    "description": "Professional handyman services in Cabo San Lucas. 20+ years experience with 600+ completed projects. Residential, commercial, and vacation rental services.",
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
    "email": "loscabohandyman@gmail.com",
    "priceRange": "$60+",
    "openingHours": "Mo-Su 00:00-23:59",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "600"
    },
    "areaServed": {
      "@type": "City",
      "name": "Cabo San Lucas"
    }
  };

  return (
    <>
      <SEO
        title="Handyman Cabo San Lucas | 20+ Years Experience | Cabos Handyman"
        description="Trusted handyman service in Cabo San Lucas with 20+ years experience and 600+ completed projects. Residential, commercial, and vacation rental services. 24/7 emergency service available."
        canonicalUrl="/handyman-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8905;-109.9167"
        schemaMarkup={schemaMarkup}
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-teal-600 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Wrench size={20} />
              <span className="text-sm font-medium">20+ Years Serving Los Cabos</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Professional Handyman Service in Cabo San Lucas
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Your trusted local handyman with 20+ years of experience and 600+ completed projects. Residential, commercial, and vacation rental services. Available 24/7 for emergencies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                Get Free Quote <ArrowRight size={20} />
              </a>
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-teal-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-400 transition-colors"
              >
                Call Now: +52 612 169 8328
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Star fill="currentColor" size={20} />
                <span className="font-semibold">5.0 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} />
                <span className="font-semibold">600+ Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span className="font-semibold">24/7 Emergency</span>
              </div>
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
              Finding a reliable handyman in Cabo San Lucas can be challenging, especially when you need someone who understands both the unique demands of coastal living and the expectations of the international community. Cabos Handyman has been the trusted choice for over 20 years, serving homeowners, vacation rental owners, property managers, and commercial clients throughout Los Cabos.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From simple repairs to complete property renovations, our bilingual team (English/Spanish) handles every job with the same commitment to quality, transparency, and customer satisfaction. With 600+ completed projects and a perfect satisfaction rating, we've built our reputation one satisfied customer at a time.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="mb-12 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-8 border border-teal-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Cabos Handyman is Different</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Users className="text-teal-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">20+ Years Local Experience</h3>
                  <p className="text-gray-600">Not just any handyman—we understand Cabo's unique challenges: salt air corrosion, coastal climate, local building practices, and expat/vacation rental needs.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Shield className="text-teal-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Licensed & Insured</h3>
                  <p className="text-gray-600">Fully licensed for construction work in Mexico, properly insured to protect your property, and compliant with all local regulations.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Clock className="text-teal-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">24/7 Emergency Service</h3>
                  <p className="text-gray-600">Emergencies don't wait for business hours. We offer 24/7 emergency response with 30-minute arrival time for critical situations.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Star className="text-teal-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">100% Satisfaction Rate</h3>
                  <p className="text-gray-600">600+ completed projects with perfect customer satisfaction. We don't consider the job done until you're completely happy.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Users className="text-teal-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Bilingual Team</h3>
                  <p className="text-gray-600">Fluent English and Spanish communication. Perfect for expats, vacation rental owners, and anyone who values clear communication.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-teal-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Transparent Pricing</h3>
                  <p className="text-gray-600">$60 service call includes first hour of labor. No hidden fees. Written quotes for larger projects. You know exactly what you're paying.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Services */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Featured Handyman Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              <a href="/property-setup-cabo" className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-teal-500 hover:shadow-lg transition-all group">
                <div className="bg-teal-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
                  <Home className="text-teal-600" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">Property Setup</h3>
                <p className="text-gray-600 mb-3">Complete move-in ready service. Furniture assembly, TV mounting, ceiling fans. Packages $500-2000.</p>
                <div className="flex items-center gap-2 text-teal-600 font-semibold">
                  <span>Learn More</span>
                  <ArrowRight size={18} />
                </div>
              </a>

              <a href="/vacation-rental-setup-cabo" className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all group">
                <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Star className="text-blue-600" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Vacation Rental Service</h3>
                <p className="text-gray-600 mb-3">Maintenance contracts for Airbnb/VRBO properties. Protect your 5-star rating. From $300/month.</p>
                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  <span>Learn More</span>
                  <ArrowRight size={18} />
                </div>
              </a>

              <a href="/plumber-cabo-san-lucas" className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-cyan-500 hover:shadow-lg transition-all group">
                <div className="bg-cyan-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:bg-cyan-200 transition-colors">
                  <Droplet className="text-cyan-600" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">Plumbing Services</h3>
                <p className="text-gray-600 mb-3">24/7 emergency plumbing. Repairs, installations, and water heater service. Licensed plumbers.</p>
                <div className="flex items-center gap-2 text-cyan-600 font-semibold">
                  <span>Learn More</span>
                  <ArrowRight size={18} />
                </div>
              </a>

              <a href="/services" className="bg-gradient-to-br from-teal-600 to-teal-700 border-2 border-teal-600 rounded-lg p-6 hover:shadow-lg transition-all group text-white">
                <div className="bg-white/20 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  <Wrench className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">All Services</h3>
                <p className="text-white/90 mb-3">Browse our complete service menu with 70+ handyman services and transparent pricing.</p>
                <div className="flex items-center gap-2 font-semibold">
                  <span>View All Services</span>
                  <ArrowRight size={18} />
                </div>
              </a>

            </div>
          </div>

          {/* Comprehensive Services List */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Complete Handyman Services in Cabo San Lucas</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Droplet className="text-teal-600" size={24} />
                  Plumbing Services
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Emergency plumbing (24/7)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Drain cleaning & unclogging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Leak detection & repair</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Water heater service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Fixture installation & replacement</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="text-teal-600" size={24} />
                  Electrical Services
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Outlet & switch installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Lighting fixture installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Ceiling fan installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Electrical troubleshooting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Smart home device wiring</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Home className="text-teal-600" size={24} />
                  Home Repairs
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Drywall repair & painting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Door & window installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Tile work & flooring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Cabinet installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>General home maintenance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Package className="text-teal-600" size={24} />
                  Assembly & Installation
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Furniture assembly (all brands)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>TV mounting & wiring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Shelving & storage systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Mirror & artwork hanging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Appliance installation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Fan className="text-teal-600" size={24} />
                  HVAC & Climate
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>AC repair & maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Ceiling fan installation & repair</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Ventilation improvements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Filter changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Thermostat installation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Monitor className="text-teal-600" size={24} />
                  Specialty Services
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Kitchen & bathroom remodels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Pool & spa equipment repair</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Outdoor living spaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Deck & patio construction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={16} />
                    <span>Storm damage repairs</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Who We Serve */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Who We Serve in Cabo San Lucas</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center bg-gray-50 rounded-lg p-6">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="text-teal-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Homeowners</h3>
                <p className="text-gray-600 text-sm">Repairs, renovations, and ongoing maintenance for full-time residents and vacation home owners</p>
              </div>
              <div className="text-center bg-gray-50 rounded-lg p-6">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-teal-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Vacation Rentals</h3>
                <p className="text-gray-600 text-sm">Airbnb and VRBO property maintenance, turnover service, and emergency response</p>
              </div>
              <div className="text-center bg-gray-50 rounded-lg p-6">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-teal-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Property Managers</h3>
                <p className="text-gray-600 text-sm">Multi-property maintenance contracts with volume pricing and dedicated support</p>
              </div>
              <div className="text-center bg-gray-50 rounded-lg p-6">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="text-teal-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Commercial</h3>
                <p className="text-gray-600 text-sm">Restaurants, offices, retail spaces, and HOA common area maintenance</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Transparent, Fair Pricing</h2>
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-8 max-w-2xl mx-auto border border-teal-200">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-teal-600 mb-2">$60</div>
                <p className="text-gray-600">Service call includes diagnosis and first hour of labor</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Additional hours charged at competitive hourly rate</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Free estimates for larger projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Written quotes with detailed scope of work</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">No hidden fees or surprise charges</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Package pricing available for multi-service jobs</span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm text-center italic">
                For complete service pricing, visit our <a href="/services" className="text-teal-600 hover:underline font-medium">service menu</a> with 70+ transparent prices.
              </p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work with Cabo's Most Trusted Handyman?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              20+ years of experience. 600+ completed projects. 100% satisfaction rate. Get your free quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Get Free Quote <ArrowRight size={20} />
              </a>
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-teal-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-400 transition-colors"
              >
                Call: +52 612 169 8328
              </a>
            </div>
            <div className="border-t border-white/20 pt-6">
              <p className="text-teal-100 text-sm mb-3">
                <strong>Contact Information:</strong>
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-white/90">
                <div>
                  <p className="font-semibold">Phone</p>
                  <p>+52 612 169 8328</p>
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p>loscabohandyman@gmail.com</p>
                </div>
                <div>
                  <p className="font-semibold">Service Area</p>
                  <p>All of Los Cabos</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
