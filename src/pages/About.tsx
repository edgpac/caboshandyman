import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, ArrowRight, Phone, Mail, Shield, Users, Clock, Wrench } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Footer = lazy(() => import('@/components/Footer'));

export default function About() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Cabos Handyman",
    "image": "https://www.caboshandyman.com/CHLOGO.png",
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
    "url": "https://www.caboshandyman.com",
    "openingHours": "Mo-Su 07:00-18:00",
    "foundingDate": "2019",
    "description": "Meet the Cabos Handyman team — a bilingual, licensed, and insured crew serving Cabo San Lucas since 2019 with 20+ years of hands-on experience.",
    "sameAs": [
      "https://maps.app.goo.gl/hJRcahhtYjF5tkv4A",
      "https://www.facebook.com/share/19wvxoz8Cy/",
      "https://www.instagram.com/caboshandyman"
    ]
  };

  return (
    <>
      <SEO
        title="About Us | Meet the Cabos Handyman Team in Cabo San Lucas"
        description="Meet the team behind Cabos Handyman. Founded in 2019, our bilingual crew brings 20+ years of hands-on experience to Cabo San Lucas. Licensed, insured, bonded. Professional employees, not subcontractors."
        canonicalUrl="/about"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
        schemaMarkup={schemaMarkup}
      />

      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Wrench size={20} />
              <span className="text-sm font-medium">About Our Company</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Cabos Handyman
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              The most trusted handyman in Cabo San Lucas — 20+ years of expertise, trust, and a commitment to quality construction and repair services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-colors shadow-xl"
              >
                Get a Free Estimate <ArrowRight size={20} />
              </a>
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors"
              >
                <Phone size={20} />
                Call: +52 612 169 8328
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">

          {/* Company Story */}
          <div className="prose prose-lg max-w-none mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Cabos Handyman was founded in 2019 to bring reliable, professional handyman and construction services to Cabo San Lucas and the surrounding Los Cabos area. While the company is young, the experience behind it is anything but. With over 20 years of hands-on construction expertise, our founder saw a gap in the market: property owners in Cabo needed a trustworthy, bilingual service provider who could handle everything from a simple repair to a full remodeling project.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Since opening our doors, we've completed over 600 projects for homeowners, vacation rental managers, commercial property owners, and expats throughout Baja California Sur. Our growth has been built entirely on word-of-mouth referrals and repeat customers, which tells us we're doing something right.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We're not a franchise or a faceless corporation. We're a local Cabo team that takes pride in every job, no matter how big or small. When you call Cabos Handyman, you're getting a team that knows your community, understands the unique challenges of coastal properties, and genuinely cares about the quality of work we deliver.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="bg-gradient-to-r from-[#2dd4bf] via-[#049d8e] to-[#06756b] rounded-2xl p-8 mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">20+</div>
                <div className="text-teal-100 font-medium">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">600+</div>
                <div className="text-teal-100 font-medium">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
                <div className="text-teal-100 font-medium">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                <div className="text-teal-100 font-medium text-sm">Emergency Service*</div>
                <div className="text-xs text-teal-200 mt-1">*For members</div>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Sets Us Apart</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-lg border-2 border-teal-200">
                <div className="bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Employees</h3>
                <p className="text-gray-700">
                  Our team consists of trained, professional employees — not subcontractors. This means consistent quality, accountability, and a team that knows your property inside and out.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Shield className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Licensed, Insured & Bonded</h3>
                <p className="text-gray-700">
                  Fully licensed and insured in Baja California Sur. Your property is protected, and you can trust that every job meets professional standards and local regulations.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Bilingual Team</h3>
                <p className="text-gray-700">
                  Fluent in both English and Spanish, making communication seamless for expats, US and Canadian property owners, and local Mexican homeowners alike.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
                <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Wrench className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Full-Service Capabilities</h3>
                <p className="text-gray-700">
                  From plumbing and electrical to full remodeling and commercial buildouts — one trusted team for everything. No need to coordinate multiple contractors.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border-2 border-orange-200">
                <div className="bg-orange-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Clock className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Emergency Response</h3>
                <p className="text-gray-700">
                  Property Care Plan members get 24/7 emergency service with guaranteed response times. Because plumbing emergencies and AC failures don't wait for business hours.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-lg border-2 border-yellow-200">
                <div className="bg-yellow-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Mail className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Transparent Pricing</h3>
                <p className="text-gray-700">
                  No surprise bills or hidden fees. We provide clear estimates upfront and communicate openly about costs throughout every project. Service calls start at $60.
                </p>
              </div>
            </div>
          </div>

          {/* Who We Serve */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Who We Serve</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Vacation Rental Owners</h3>
                <p className="text-gray-600">
                  Protect your 5-star rating with preventive maintenance, turnover inspections, and emergency repairs. We coordinate around guest schedules and keep your properties in top condition year-round.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Full-Time Residents</h3>
                <p className="text-gray-600">
                  From routine home repairs to major renovations, we're your go-to team. Predictable pricing with Property Care Plans gives you peace of mind and priority service when you need it.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Expats & Remote Owners</h3>
                <p className="text-gray-600">
                  Trust a local Cabo team to protect your investment while you're away. Detailed photo and video reports keep you informed, and our bilingual service bridges any communication gap.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Commercial Properties</h3>
                <p className="text-gray-600">
                  Restaurants, offices, retail spaces, and HOA facilities. We handle commercial buildouts, ongoing maintenance, and emergency repairs to keep your business running smoothly.
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Whether it's a quick repair or a full renovation, we'd love to hear about your project. Call us for a free estimate or reach out online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+526121698328"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-colors"
              >
                <Phone size={20} />
                +52 612 169 8328
              </a>
              <a
                href="mailto:loscabohandyman@gmail.com"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors"
              >
                <Mail size={20} />
                loscabohandyman@gmail.com
              </a>
            </div>
            <p className="text-gray-400 mt-6 text-sm">
              Licensed & Insured • Bilingual Team • 20+ Years Experience • Cabo San Lucas, BCS
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
