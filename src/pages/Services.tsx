import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, Star, Droplet, Wrench, ArrowRight, Shield, Zap, Bath, Fan, Tv, Armchair } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function ServicesPage() {

  return (
    <>
      <Helmet>
        <title>Handyman Services & Pricing Cabo San Lucas | Cabos Handyman</title>
        <meta
          name="description"
          content="Complete handyman service menu with transparent pricing in Cabo San Lucas. Kitchen, bathroom, electrical, plumbing, painting, drain cleaning, toilet & tub unclogging. $60 service call. 20+ years experience. Licensed & insured."
        />
        <meta
          name="keywords"
          content="handyman cabo san lucas, plumbing cabo, electrical cabo, kitchen remodel cabo, bathroom renovation cabo, toilet unclogging cabo, drain cleaning cabo san lucas, handyman pricing, emergency plumbing cabo"
        />
        <link rel="canonical" href="https://www.caboshandyman.com/services" />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Handyman Services & Pricing - Cabo San Lucas" />
        <meta property="og:description" content="70+ handyman services with transparent pricing. Kitchen, bathroom, electrical, plumbing. $60 service call. 24/7 emergency service." />
        <meta property="og:url" content="https://www.caboshandyman.com/services" />
        <meta property="og:type" content="website" />

        {/* Schema.org Service Catalog Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Cabos Handyman",
            "image": "https://www.caboshandyman.com/logo.png",
            "telephone": "+52-612-169-8328",
            "email": "loscabohandyman@gmail.com",
            "url": "https://www.caboshandyman.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Cabo San Lucas",
              "addressRegion": "Baja California Sur",
              "addressCountry": "MX"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "22.8866974",
              "longitude": "-109.9139710"
            },
            "priceRange": "$60-$1200",
            "openingHours": "Mo-Su 00:00-23:59",
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
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Handyman Services Cabo San Lucas",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Toilet Installation Cabo San Lucas",
                    "description": "Professional toilet installation and replacement service in Cabo San Lucas",
                    "provider": {
                      "@type": "LocalBusiness",
                      "name": "Cabos Handyman"
                    }
                  },
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": "200",
                    "priceCurrency": "USD"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Toilet Unclogging Cabo San Lucas",
                    "description": "Emergency drain cleaning and unclogging service in Cabo San Lucas. Available 24/7. $60 service call covers most clogs.",
                    "provider": {
                      "@type": "LocalBusiness",
                      "name": "Cabos Handyman"
                    }
                  },
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": "60",
                    "priceCurrency": "USD"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Ceiling Fan Installation Cabo San Lucas",
                    "description": "Professional ceiling fan installation service in Cabo San Lucas",
                    "provider": {
                      "@type": "LocalBusiness",
                      "name": "Cabos Handyman"
                    }
                  },
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": "180",
                    "priceCurrency": "USD"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Kitchen Remodeling Cabo San Lucas",
                    "description": "Complete kitchen remodeling service including cabinets, countertops, plumbing, and electrical",
                    "provider": {
                      "@type": "LocalBusiness",
                      "name": "Cabos Handyman"
                    }
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <Navigation />

      <div className="min-h-screen bg-gray-50">
        {/* SEO Header - Hidden but crawlable */}
        <div className="sr-only">
          <h1>Handyman Cabo San Lucas - Professional Home Repair & Maintenance Services</h1>
          <p>Licensed handyman in Cabo San Lucas with 70+ services including plumbing, electrical, painting, kitchen & bathroom remodeling, toilet unclogging, drain cleaning, and emergency repairs. Cabos Handyman offers transparent pricing starting at $60 for handyman services in Cabo San Lucas. Available 24/7.</p>
        </div>

        {/* Visible Header */}
        <div className="bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white py-16 px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Service Menu & Pricing</h2>
          <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 mt-4 sm:mt-6">
            {/* Main Subtitle */}
            <p className="text-xl sm:text-2xl text-white font-semibold mb-3 sm:mb-4">
              Pricing Reference Guide
            </p>

            {/* Description Lines */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                Browse our most common services and starting prices below.
              </p>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                <a
                  href="tel:+526121698328"
                  className="text-white font-bold hover:underline transition-all"
                >
                  Call us
                </a>
                {' '}for a personalized quote based on your project or issue.
              </p>
            </div>

            {/* Service Call Pricing - Highlighted */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 sm:px-6 sm:py-4 border border-white/20 mb-3 sm:mb-4">
              <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                Handyman service calls starting at $60 for most repairs.<br className="hidden sm:inline" />
                <span className="block sm:inline"> (free estimate: <a
                  href="tel:+526121698328"
                  className="font-semibold hover:underline transition-all cursor-pointer"
                >
                  +52 612 169 8328
                </a>)</span>
              </p>
            </div>

            {/* Services Not Limited Note */}
            <p className="text-sm sm:text-base text-white/80 font-medium">
              Services not limited to this list
            </p>
          </div>
        </div>

        {/* Service Categories */}
        <div className="container mx-auto px-4 py-12">
          {/* Featured Service Cards */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Featured Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
              <Link
                to="/property-setup-cabo"
                className="bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-500 rounded-lg p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] w-12 h-12 rounded-full flex items-center justify-center">
                    <Home className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-teal-600 transition-colors">Property Setup</h3>
                </div>
                <p className="text-gray-600 mb-3">Complete move-in ready service. Furniture assembly, TV mounting, ceiling fans.</p>
                <p className="text-teal-600 font-semibold text-sm">Packages from $500</p>
                <div className="flex items-center gap-1 text-teal-600 font-semibold text-sm mt-3">
                  <span>Learn More</span>
                  <ArrowRight size={14} />
                </div>
              </Link>

              <Link
                to="/vacation-rental-setup-cabo"
                className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 rounded-lg p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center">
                    <Star className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">Rental Service</h3>
                </div>
                <p className="text-gray-600 mb-3">Airbnb & VRBO maintenance contracts. Protect your 5-star rating.</p>
                <p className="text-blue-600 font-semibold text-sm">From $250/month</p>
                <div className="flex items-center gap-1 text-blue-600 font-semibold text-sm mt-3">
                  <span>Learn More</span>
                  <ArrowRight size={14} />
                </div>
              </Link>

              <Link
                to="/plumber-cabo-san-lucas"
                className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-500 rounded-lg p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-cyan-500 w-12 h-12 rounded-full flex items-center justify-center">
                    <Droplet className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-cyan-600 transition-colors">Plumber 24/7</h3>
                </div>
                <p className="text-gray-600 mb-3">Emergency plumbing service. 30-minute response time for urgent situations.</p>
                <p className="text-cyan-600 font-semibold text-sm">Starting at $60</p>
                <div className="flex items-center gap-1 text-cyan-600 font-semibold text-sm mt-3">
                  <span>Learn More</span>
                  <ArrowRight size={14} />
                </div>
              </Link>

              <Link
                to="/property-care-plans"
                className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-500 rounded-lg p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center">
                    <Shield className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-purple-600 transition-colors">Property Care</h3>
                </div>
                <p className="text-gray-600 mb-3">Preventive maintenance plans. FREE monthly unclog included!</p>
                <p className="text-purple-600 font-semibold text-sm">From $99/month</p>
                <div className="flex items-center gap-1 text-purple-600 font-semibold text-sm mt-3">
                  <span>View Plans</span>
                  <ArrowRight size={14} />
                </div>
              </Link>

              <Link
                to="/handyman-cabo-san-lucas"
                className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-400 rounded-lg p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gray-600 w-12 h-12 rounded-full flex items-center justify-center">
                    <Wrench className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-gray-700 transition-colors">All Services</h3>
                </div>
                <p className="text-gray-600 mb-3">Complete handyman services. 20+ years experience, 600+ projects completed.</p>
                <p className="text-gray-700 font-semibold text-sm">View All Services</p>
                <div className="flex items-center gap-1 text-gray-700 font-semibold text-sm mt-3">
                  <span>Learn More</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            </div>
          </div>

          {/* All Individual Services */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">All Services</h2>
            <p className="text-gray-600 text-center mb-6">Click any service for details, pricing, and availability</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link to="/plumber-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-cyan-300 transition-all group">
                <Droplet className="text-cyan-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">Plumber 24/7</h3>
                <p className="text-gray-500 text-xs mt-1">Emergency plumbing, repairs, installations</p>
                <span className="text-cyan-600 text-xs font-semibold mt-2 flex items-center gap-1">From $60 <ArrowRight size={12} /></span>
              </Link>

              <Link to="/electrical-services-cabo" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-yellow-300 transition-all group">
                <Zap className="text-yellow-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">Electrical Services</h3>
                <p className="text-gray-500 text-xs mt-1">Wiring, outlets, panels, lighting</p>
                <span className="text-yellow-600 text-xs font-semibold mt-2 flex items-center gap-1">From $80 <ArrowRight size={12} /></span>
              </Link>

              <Link to="/kitchen-services-cabo" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-orange-300 transition-all group">
                <Wrench className="text-orange-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Kitchen Remodeling</h3>
                <p className="text-gray-500 text-xs mt-1">Cabinets, countertops, plumbing, tile</p>
                <span className="text-orange-600 text-xs font-semibold mt-2 flex items-center gap-1">From $500 <ArrowRight size={12} /></span>
              </Link>

              <Link to="/bathroom-services-cabo" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-300 transition-all group">
                <Bath className="text-blue-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Bathroom Services</h3>
                <p className="text-gray-500 text-xs mt-1">Tile, fixtures, toilet, shower install</p>
                <span className="text-blue-600 text-xs font-semibold mt-2 flex items-center gap-1">From $200 <ArrowRight size={12} /></span>
              </Link>

              <Link to="/handyman-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-gray-400 transition-all group">
                <Wrench className="text-gray-600 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-gray-700 transition-colors">Handyman Services</h3>
                <p className="text-gray-500 text-xs mt-1">General repairs, maintenance, 70+ services</p>
                <span className="text-gray-700 text-xs font-semibold mt-2 flex items-center gap-1">From $60 <ArrowRight size={12} /></span>
              </Link>

              <Link to="/toilet-tub-unclogging-cabo" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-teal-300 transition-all group">
                <Droplet className="text-teal-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-teal-600 transition-colors">Drain Cleaning</h3>
                <p className="text-gray-500 text-xs mt-1">Toilet & tub unclogging, drain clearing</p>
                <span className="text-teal-600 text-xs font-semibold mt-2 flex items-center gap-1">From $60 <ArrowRight size={12} /></span>
              </Link>

              <Link to="/ceiling-fan-installation-cabo" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-indigo-300 transition-all group">
                <Fan className="text-indigo-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">Ceiling Fan Install</h3>
                <p className="text-gray-500 text-xs mt-1">Installation, replacement, wiring</p>
                <span className="text-indigo-600 text-xs font-semibold mt-2 flex items-center gap-1">From $180 <ArrowRight size={12} /></span>
              </Link>

              <Link to="/furniture-assembly-cabo" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-amber-300 transition-all group">
                <Armchair className="text-amber-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors">Furniture Assembly</h3>
                <p className="text-gray-500 text-xs mt-1">IKEA, flatpack, office furniture</p>
                <span className="text-amber-600 text-xs font-semibold mt-2 flex items-center gap-1">From $60 <ArrowRight size={12} /></span>
              </Link>

              <Link to="/tv-mounting-cabo" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-slate-400 transition-all group">
                <Tv className="text-slate-600 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-slate-700 transition-colors">TV Mounting</h3>
                <p className="text-gray-500 text-xs mt-1">Wall mount, cable management, setup</p>
                <span className="text-slate-700 text-xs font-semibold mt-2 flex items-center gap-1">From $80 <ArrowRight size={12} /></span>
              </Link>

              <Link to="/property-setup-cabo" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-teal-400 transition-all group">
                <Home className="text-teal-600 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors">Property Setup</h3>
                <p className="text-gray-500 text-xs mt-1">Move-in ready: fans, furniture, TV, more</p>
                <span className="text-teal-700 text-xs font-semibold mt-2 flex items-center gap-1">Packages from $500 <ArrowRight size={12} /></span>
              </Link>

              <Link to="/vacation-rental-setup-cabo" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-400 transition-all group">
                <Star className="text-blue-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Vacation Rental</h3>
                <p className="text-gray-500 text-xs mt-1">Airbnb & VRBO maintenance contracts</p>
                <span className="text-blue-600 text-xs font-semibold mt-2 flex items-center gap-1">From $250/mo <ArrowRight size={12} /></span>
              </Link>

              <Link to="/property-care-plans" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-purple-400 transition-all group">
                <Shield className="text-purple-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">Property Care Plans</h3>
                <p className="text-gray-500 text-xs mt-1">Monthly maintenance + free unclog</p>
                <span className="text-purple-600 text-xs font-semibold mt-2 flex items-center gap-1">From $99/mo <ArrowRight size={12} /></span>
              </Link>

              <Link to="/toilet-installation-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-cyan-300 transition-all group">
                <Droplet className="text-cyan-400 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">Toilet Installation</h3>
                <p className="text-gray-500 text-xs mt-1">New install, replacement, running toilet</p>
                <span className="text-cyan-600 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/water-heater-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-orange-300 transition-all group">
                <Wrench className="text-orange-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Water Heater</h3>
                <p className="text-gray-500 text-xs mt-1">Installation, replacement, no-hot-water repair</p>
                <span className="text-orange-600 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/faucet-installation-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-teal-300 transition-all group">
                <Droplet className="text-teal-400 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-teal-600 transition-colors">Faucet Installation</h3>
                <p className="text-gray-500 text-xs mt-1">Kitchen, bathroom, shower head</p>
                <span className="text-teal-600 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/shower-installation-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-300 transition-all group">
                <Bath className="text-blue-400 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Shower Installation</h3>
                <p className="text-gray-500 text-xs mt-1">Walk-in shower, tub conversion, tile</p>
                <span className="text-blue-600 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/tile-installation-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-amber-300 transition-all group">
                <Wrench className="text-amber-600 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-amber-700 transition-colors">Tile Installation</h3>
                <p className="text-gray-500 text-xs mt-1">Floor, wall, backsplash, shower tile</p>
                <span className="text-amber-700 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/cabinet-installation-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-green-300 transition-all group">
                <Home className="text-green-600 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">Cabinet Installation</h3>
                <p className="text-gray-500 text-xs mt-1">Kitchen, bathroom, built-in storage</p>
                <span className="text-green-700 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/outlet-installation-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-yellow-300 transition-all group">
                <Zap className="text-yellow-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">Outlet Installation</h3>
                <p className="text-gray-500 text-xs mt-1">GFCI, USB, 220V, new outlets</p>
                <span className="text-yellow-600 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/ceiling-light-installation-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-yellow-400 transition-all group">
                <Zap className="text-yellow-400 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">Ceiling Light Install</h3>
                <p className="text-gray-500 text-xs mt-1">Recessed, pendant, chandeliers, LED</p>
                <span className="text-yellow-600 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/garbage-disposal-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-gray-400 transition-all group">
                <Wrench className="text-gray-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-gray-700 transition-colors">Garbage Disposal</h3>
                <p className="text-gray-500 text-xs mt-1">Installation, replacement, repair</p>
                <span className="text-gray-700 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/sink-installation-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-cyan-300 transition-all group">
                <Droplet className="text-cyan-600 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-cyan-700 transition-colors">Sink Installation</h3>
                <p className="text-gray-500 text-xs mt-1">Kitchen & bathroom sinks, undermount, drop-in</p>
                <span className="text-cyan-700 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/countertop-installation-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-stone-400 transition-all group">
                <Wrench className="text-stone-600 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-stone-700 transition-colors">Countertop Installation</h3>
                <p className="text-gray-500 text-xs mt-1">Granite, quartz, marble, tile, laminate</p>
                <span className="text-stone-700 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/backsplash-installation-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-emerald-300 transition-all group">
                <Wrench className="text-emerald-600 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">Backsplash Installation</h3>
                <p className="text-gray-500 text-xs mt-1">Subway, mosaic, talavera, stone tile</p>
                <span className="text-emerald-700 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/kitchen-hardware-installation-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-slate-400 transition-all group">
                <Wrench className="text-slate-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-slate-700 transition-colors">Kitchen Hardware</h3>
                <p className="text-gray-500 text-xs mt-1">Cabinet handles, pulls, hinges, knobs</p>
                <span className="text-slate-700 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/pantry-shelving-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-amber-400 transition-all group">
                <Home className="text-amber-600 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-amber-700 transition-colors">Pantry Shelving</h3>
                <p className="text-gray-500 text-xs mt-1">Pantry, closet, wall, and built-in shelving</p>
                <span className="text-amber-700 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/bathroom-lighting-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-yellow-300 transition-all group">
                <Zap className="text-yellow-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">Bathroom Lighting</h3>
                <p className="text-gray-500 text-xs mt-1">Vanity lights, sconces, exhaust fan lights</p>
                <span className="text-yellow-600 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/shower-head-replacement-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-300 transition-all group">
                <Droplet className="text-blue-400 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Shower Head Replacement</h3>
                <p className="text-gray-500 text-xs mt-1">Install, upgrade, rain head, handheld</p>
                <span className="text-blue-600 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/toilet-leak-repair-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-cyan-300 transition-all group">
                <Droplet className="text-cyan-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">Toilet Leak Repair</h3>
                <p className="text-gray-500 text-xs mt-1">Running toilet, base leaks, tank repair</p>
                <span className="text-cyan-600 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/towel-rack-installation-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-gray-400 transition-all group">
                <Wrench className="text-gray-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-gray-700 transition-colors">Towel Rack Installation</h3>
                <p className="text-gray-500 text-xs mt-1">Towel bars, hooks, rings, heated bars</p>
                <span className="text-gray-700 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/mirror-installation-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-slate-400 transition-all group">
                <Wrench className="text-slate-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-slate-700 transition-colors">Mirror Installation</h3>
                <p className="text-gray-500 text-xs mt-1">Bathroom mirrors, framed, frameless, large</p>
                <span className="text-slate-700 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/bathroom-shelving-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-300 transition-all group">
                <Home className="text-blue-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Bathroom Shelving</h3>
                <p className="text-gray-500 text-xs mt-1">Wall shelves, over-toilet storage, floating</p>
                <span className="text-blue-600 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/bathroom-sink-installation-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-400 transition-all group">
                <Droplet className="text-blue-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Bathroom Sink Install</h3>
                <p className="text-gray-500 text-xs mt-1">Vessel, undermount, pedestal, vanity basin</p>
                <span className="text-blue-600 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/office-lighting-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-yellow-400 transition-all group">
                <Zap className="text-yellow-600 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-yellow-700 transition-colors">Office Lighting</h3>
                <p className="text-gray-500 text-xs mt-1">LED panels, task lighting, smart fixtures</p>
                <span className="text-yellow-700 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/generator-hookup-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-orange-400 transition-all group">
                <Zap className="text-orange-600 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-orange-700 transition-colors">Generator Hookup</h3>
                <p className="text-gray-500 text-xs mt-1">220V inlet, transfer switch for CFE outages</p>
                <span className="text-orange-700 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/common-area-lighting-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-yellow-300 transition-all group">
                <Zap className="text-yellow-400 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">Common Area Lighting</h3>
                <p className="text-gray-500 text-xs mt-1">Hallways, lobbies, parking, exterior</p>
                <span className="text-yellow-600 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/decorative-lighting-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-amber-400 transition-all group">
                <Zap className="text-amber-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors">Decorative Lighting</h3>
                <p className="text-gray-500 text-xs mt-1">String lights, accent, LED strips, landscape</p>
                <span className="text-amber-600 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/door-lock-replacement-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-gray-400 transition-all group">
                <Wrench className="text-gray-600 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-gray-700 transition-colors">Door Lock Replacement</h3>
                <p className="text-gray-500 text-xs mt-1">Deadbolt, smart lock, knob, lever sets</p>
                <span className="text-gray-700 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/window-repair-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-sky-300 transition-all group">
                <Wrench className="text-sky-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-sky-600 transition-colors">Window Repair</h3>
                <p className="text-gray-500 text-xs mt-1">Seals, screens, hardware, sliding windows</p>
                <span className="text-sky-600 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/painting-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-rose-300 transition-all group">
                <Wrench className="text-rose-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-rose-600 transition-colors">Paint Touch-ups</h3>
                <p className="text-gray-500 text-xs mt-1">Interior & exterior, accent walls, full rooms</p>
                <span className="text-rose-600 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/water-leak-detector-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-cyan-400 transition-all group">
                <Droplet className="text-cyan-600 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-cyan-700 transition-colors">Water Leak Detector</h3>
                <p className="text-gray-500 text-xs mt-1">Smart sensor installation, leak detection</p>
                <span className="text-cyan-700 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/landscape-maintenance-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-green-400 transition-all group">
                <Wrench className="text-green-600 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">Landscape Maintenance</h3>
                <p className="text-gray-500 text-xs mt-1">Palm tree pruning, irrigation, yard cleanup</p>
                <span className="text-green-700 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/commercial-sink-installation-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-teal-400 transition-all group">
                <Droplet className="text-teal-600 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors">Commercial Sink</h3>
                <p className="text-gray-500 text-xs mt-1">Restaurant, bar, 3-compartment, prep sinks</p>
                <span className="text-teal-700 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/booth-installation-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-indigo-300 transition-all group">
                <Armchair className="text-indigo-500 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">Booth Installation</h3>
                <p className="text-gray-500 text-xs mt-1">Restaurant & dining area booth seating</p>
                <span className="text-indigo-600 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>

              <Link to="/bar-installation-cabo-san-lucas" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-amber-500 transition-all group">
                <Wrench className="text-amber-700 mb-2" size={28} />
                <h3 className="font-bold text-gray-900 group-hover:text-amber-800 transition-colors">Bar Installation</h3>
                <p className="text-gray-500 text-xs mt-1">Custom bar tops, cabinetry, under-bar setup</p>
                <span className="text-amber-800 text-xs font-semibold mt-2 flex items-center gap-1">Learn More <ArrowRight size={12} /></span>
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white rounded-xl p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">Need a Custom Quote?</h3>
            <p className="text-lg mb-6">Call us for a free estimate on your project or issue</p>
            <a
              href="tel:+526121698328"
              className="inline-block bg-white text-teal-600 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition-colors"
            >
              Call +52 612 169 8328
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
