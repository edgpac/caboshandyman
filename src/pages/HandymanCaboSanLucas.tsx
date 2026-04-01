import { lazy, useState } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Home, Zap, Droplet, Fan, Package, Monitor, Users, Clock, Star, Shield, ArrowRight, ChevronDown } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Footer = lazy(() => import('@/components/Footer'));

export default function HandymanCaboSanLucas() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Cabos Handyman",
    "image": "https://www.caboshandyman.com/CHLOGO.png",
    "description": "Professional handyman services in Cabo San Lucas. 20+ years experience with 600+ completed projects. Residential, commercial, and vacation rental services.",
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
    "email": "loscabohandyman@gmail.com",
    "priceRange": "$60+",
    "openingHours": "Mo-Su 07:00-18:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "600"
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
    ],
    "sameAs": [
      "https://maps.app.goo.gl/hJRcahhtYjF5tkv4A",
      "https://www.facebook.com/share/19wvxoz8Cy/",
      "https://www.instagram.com/caboshandyman"
    ]
  };

  return (
    <>
      <SEO
        title="Handyman Services Cabo San Lucas | 70+ Services | Cabos Handyman"
        description="Need a handyman in Cabo San Lucas? 70+ services: plumbing, electrical, TV mounting, furniture assembly, painting & more. Same-day from $60. Bilingual team. Call: +52 612 169 8328"
        canonicalUrl="/handyman-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
        schemaMarkup={schemaMarkup}
      />

      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white overflow-hidden">
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
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-colors"
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
                  <p className="text-gray-600">$60 diagnostic visit includes first hour of labor for most repairs. No hidden fees. Written quotes for larger projects. You know exactly what you're paying.</p>
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
                <p className="text-gray-600 mb-3">Maintenance contracts for Airbnb/VRBO properties. Protect your 5-star rating. From $250/month.</p>
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

              <a href="/services" className="bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] border-2 border-teal-600 rounded-lg p-6 hover:shadow-lg transition-all group text-white">
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
                <p className="text-gray-600">Diagnostic visit includes diagnosis and first hour of labor for most repairs</p>
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

          {/* FAQ Section */}
          <div className="mb-12">
            <button
              onClick={() => setIsFaqOpen(!isFaqOpen)}
              className="w-full flex items-center justify-between mb-6 hover:opacity-80 transition-opacity"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                Frequently Asked Questions About Handyman Services in Cabo
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
                    How much does a handyman cost in Cabo San Lucas?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-teal-600 transition-transform ${openQuestion === 'faq1' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq1' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Our standard diagnostic visit is <strong>$60, which includes the first hour of labor and diagnosis</strong>. For most repairs, this covers the entire job. This transparent pricing means you know exactly what you're paying before we even arrive.
                    </p>
                    <p className="mb-3">
                      For larger projects, we provide free written estimates with detailed scope of work. Package pricing is available when you bundle multiple services (furniture assembly + TV mounting + ceiling fan installation, for example).
                    </p>
                    <p>
                      <strong>Property Care Plan members</strong> receive discounted rates and priority scheduling. Call <a href="tel:+526121698328" className="text-teal-600 hover:underline font-medium">+52 612 169 8328</a> for a free quote on your specific project.
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
                    What areas do you serve in Los Cabos?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-teal-600 transition-transform ${openQuestion === 'faq2' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq2' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      We serve <strong>all of Los Cabos</strong>, including Cabo San Lucas, San José del Cabo, the Tourist Corridor, and surrounding areas like El Tezal, Pedregal, Palmilla, and Puerto Los Cabos.
                    </p>
                    <p className="mb-3">
                      With 20+ years as a local handyman, we know every neighborhood in Los Cabos and can navigate quickly to your property. We regularly service vacation rentals in Médano Beach, luxury homes in Pedregal, and commercial properties throughout the corridor.
                    </p>
                    <p>
                      Service area extends approximately 30km from Cabo San Lucas. For locations outside this range, please call <a href="tel:+526121698328" className="text-teal-600 hover:underline font-medium">+52 612 169 8328</a> to confirm availability.
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
                    Do you service vacation rentals and Airbnb properties?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-teal-600 transition-transform ${openQuestion === 'faq3' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq3' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      <strong>Absolutely! Vacation rental service is one of our specialties.</strong> We understand that when you have guests arriving in 24 hours, repairs need to happen NOW—not "sometime this week."
                    </p>
                    <p className="mb-3">
                      We offer:
                    </p>
                    <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                      <li>Same-day emergency response for rental turnovers</li>
                      <li>Between-guest maintenance visits</li>
                      <li>Monthly Property Care Plans starting at $99/month</li>
                      <li>Bilingual communication with property managers and guests</li>
                      <li>Understanding of Airbnb/VRBO standards for 5-star ratings</li>
                    </ul>
                    <p>
                      We currently maintain 50+ vacation rental properties throughout Los Cabos. Call <a href="tel:+526121698328" className="text-teal-600 hover:underline font-medium">+52 612 169 8328</a> to discuss a maintenance plan for your rental.
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
                    Are you licensed and insured to work in Mexico?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-teal-600 transition-transform ${openQuestion === 'faq4' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq4' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Yes. We are <strong>fully licensed for construction and handyman work in Mexico</strong>, carry comprehensive liability insurance to protect your property, and comply with all local building codes and regulations in Baja California Sur.
                    </p>
                    <p className="mb-3">
                      Our team includes:
                    </p>
                    <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                      <li>Licensed electricians for all electrical work</li>
                      <li>Licensed plumbers for plumbing installations</li>
                      <li>Certified AC technicians for HVAC service</li>
                      <li>20+ years experience with local building standards</li>
                    </ul>
                    <p>
                      We provide a <strong>90-day warranty on all workmanship</strong>. If you're not completely satisfied, we make it right at no additional charge.
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
                    How quickly can you respond to urgent repair requests?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-teal-600 transition-transform ${openQuestion === 'faq5' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq5' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      Response times depend on your Property Care Plan status:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mb-3 ml-4">
                      <li><strong>Property Care Members:</strong> 24/7 emergency service with 30-minute response time for critical situations (flooding, electrical hazards, AC failure in summer)</li>
                      <li><strong>Non-Members:</strong> Same-day or next-day service during business hours (7am-6pm), with emergency service available for urgent situations at premium rates</li>
                    </ul>
                    <p className="mb-3">
                      Most routine repairs (fixing a door, installing a ceiling fan, minor plumbing) can be scheduled within 24-48 hours depending on our current workload.
                    </p>
                    <p>
                      For immediate service needs, call <a href="tel:+526121698328" className="text-teal-600 hover:underline font-medium">+52 612 169 8328</a> and we'll prioritize your request.
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
                    Can you handle large renovation projects or just small repairs?
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 text-teal-600 transition-transform ${openQuestion === 'faq6' ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openQuestion === 'faq6' && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      <strong>We handle everything from hanging a picture to complete home renovations.</strong> With 20+ years of experience and 600+ completed projects, no job is too big or too small.
                    </p>
                    <p className="mb-3">
                      Recent projects include:
                    </p>
                    <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                      <li>Complete kitchen and bathroom remodels ($5,000-30,000)</li>
                      <li>Vacation rental property setup packages ($500-2,000)</li>
                      <li>Commercial space build-outs for restaurants and offices</li>
                      <li>Hurricane damage repairs and restoration</li>
                      <li>Simple jobs like TV mounting, furniture assembly, and minor repairs ($60-200)</li>
                    </ul>
                    <p>
                      We provide free detailed estimates for all projects over $500. Contact us at <a href="tel:+526121698328" className="text-teal-600 hover:underline font-medium">+52 612 169 8328</a> to discuss your project scope.
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
                  <span className="text-purple-900 font-semibold text-sm">STRESS-FREE PROPERTY OWNERSHIP</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Property Care Plans:<br />Your On-Call Handyman Team
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Stop scrambling to find a handyman every time something breaks.<br />Property Care Plans can be tailored to your property’s needs.
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
                      <span><strong>Priority scheduling</strong> (within 24-48 hours)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>10% discount</strong> on all labor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>1 FREE diagnostic visit/month</strong> ($60 value)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>1 FREE drain unclog</strong> per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>AC filter cleaning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>Smoke detector battery checks & replacement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>Light bulb replacement (up to 5 bulbs/month)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>Door & cabinet hardware tightening</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>Window screen mesh repair (up to 2 screens/month)</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-xs text-gray-500 italic">Perfect for homeowners and single vacation rentals</p>
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
                      <span><strong>24/7 emergency service included</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>20% discount</strong> on all labor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>2 FREE diagnostic visits/month</strong> ($120 value)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>2 FREE drain unclogs</strong> per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span>Shower cartridge replacement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span>Monthly faucet leak checks & cartridge service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span>Window screen replacement (up to 4 screens/month)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span>Toilet flapper/fill valve replacement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span>Door lock lubrication & adjustment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span>Ceiling fan switch & motor replacement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-yellow-300 flex-shrink-0 mt-0.5" size={16} />
                      <span>Same-day service guarantee</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-xs text-cyan-100 italic">Best for vacation rentals and property managers</p>
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
                      <span><strong>Everything in Premium, PLUS:</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>3 FREE diagnostic visits/month</strong> ($180 value)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>25% discount</strong> on all labor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>Unlimited drain unclogs</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>Shower cartridge replacement (all bathrooms)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>Monthly toilet valve & flapper inspection/replacement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>Window screen replacement (unlimited)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>Pool skimmer basket cleaning (weekly)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>Exterior door weatherstripping replacement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>Smoke & CO detector full replacement (annually)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>Light fixture cleaning & bulb replacement (unlimited)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>Cabinet & drawer adjustment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span><strong>30-minute emergency response</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                      <span>Priority parts ordering</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-xs text-gray-500 italic">Ideal for luxury properties and multi-unit managers</p>
                </div>

              </div>

              {/* ROI Comparison */}
              <div className="bg-white rounded-lg p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3 text-center">Why Property Care Plans Save You Money</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">Without Property Care (Typical Year):</p>
                    <ul className="space-y-1 ml-4">
                      <li>• 6 drain unclogs @ $60 each: <strong>$360</strong></li>
                      <li>• 2 shower cartridge replacements: <strong>$240</strong></li>
                      <li>• 4 window screen repairs: <strong>$200</strong></li>
                      <li>• 15 hours labor @ $80/hr: <strong>$1,200</strong></li>
                      <li>• 1 emergency call premium: <strong>$500</strong></li>
                      <li className="pt-2 border-t border-gray-300"><strong>Total: $2,500+/year</strong></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">With Premium Property Care:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Monthly plan: <strong>$199/month</strong> = $2,388/year</li>
                      <li>• 24 FREE diagnostic visits: <strong>$1,440 value</strong></li>
                      <li>• 24 FREE drain unclogs: <strong>$1,440 value</strong></li>
                      <li>• Cartridge & screen repairs: <strong>Included</strong></li>
                      <li>• 20% labor discount: <strong>~$240 savings</strong></li>
                      <li>• No emergency premiums: <strong>$500+ saved</strong></li>
                      <li className="pt-2 border-t border-gray-300 text-green-700"><strong>Saves $1,500+/year + peace of mind</strong></li>
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
          <div className="bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] rounded-2xl p-8 md:p-12 text-center text-white">
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
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-colors"
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
