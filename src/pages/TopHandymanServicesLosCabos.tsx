import { lazy, useState } from 'react';
import SEO from '@/components/SEO';
import {
  CheckCircle2, Wrench, Zap, Droplet, Fan, Clock, Star,
  Shield, ArrowRight, ChevronDown, Phone, MessageCircle
} from 'lucide-react';
import Navigation from '@/components/Navigation';

const Footer = lazy(() => import('@/components/Footer'));

export default function TopHandymanServicesLosCabos() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Cabos Handyman",
    "image": "https://www.caboshandyman.com/CHLOGO.png",
    "description": "Top handyman services in Los Cabos — plumbing repairs, electrical work, AC service, painting, and 70+ more. 20+ years experience, 600+ projects completed.",
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
      { "@type": "City", "name": "Cabo San Lucas" },
      { "@type": "City", "name": "San José del Cabo" },
      { "@type": "AdministrativeArea", "name": "Los Cabos" }
    ],
    "sameAs": [
      "https://maps.app.goo.gl/hJRcahhtYjF5tkv4A",
      "https://www.facebook.com/share/19wvxoz8Cy/",
      "https://www.instagram.com/caboshandyman"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Handyman Services Los Cabos",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Plumbing Repairs Los Cabos",
            "description": "Leak detection, pipe repair, drain cleaning, toilet installation, water heater service"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Electrical Repairs Los Cabos",
            "description": "Outlet installation, ceiling fan wiring, panel work, lighting installation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AC Service Los Cabos",
            "description": "Mini-split cleaning, condensation line clearing, filter replacement"
          }
        }
      ]
    }
  };

  const services = [
    {
      icon: <Droplet className="w-7 h-7 text-teal-500" />,
      title: "Plumbing Repairs",
      items: [
        "Leak detection & pipe repair",
        "Drain cleaning & unclogging",
        "Toilet installation & repair",
        "Water heater installation",
        "Faucet & sink replacement",
        "Cistern & float valve service",
        "Emergency burst pipe response"
      ],
      link: "/plumber-cabo-san-lucas"
    },
    {
      icon: <Zap className="w-7 h-7 text-yellow-500" />,
      title: "Electrical Repairs",
      items: [
        "Outlet & switch installation",
        "Ceiling fan wiring & mounting",
        "Ceiling light installation",
        "Electrical panel work",
        "Generator hookup",
        "Bathroom & kitchen lighting",
        "Office & common-area lighting"
      ],
      link: "/electrical-services-cabo"
    },
    {
      icon: <Fan className="w-7 h-7 text-blue-500" />,
      title: "AC & HVAC Service",
      items: [
        "Mini-split filter cleaning",
        "Condensation line clearing",
        "AC drip leak diagnosis",
        "Unit deep-clean service",
        "Pre-summer system check",
        "Ductless system maintenance"
      ],
      link: "/services"
    },
    {
      icon: <Wrench className="w-7 h-7 text-orange-500" />,
      title: "General Repairs & More",
      items: [
        "Interior & exterior painting",
        "Tile & backsplash installation",
        "Door lock replacement",
        "Window repair & sealing",
        "TV mounting & cabinet install",
        "Furniture assembly",
        "Landscape maintenance"
      ],
      link: "/services"
    }
  ];

  const faqs = [
    {
      q: "What areas in Los Cabos do you serve?",
      a: "We serve all of Los Cabos — Cabo San Lucas, San José del Cabo, Todos Santos, East Cape, Palmilla, and all communities in between."
    },
    {
      q: "How much does a service call cost?",
      a: "A diagnostic visit is $60 USD — this covers diagnosis and the first hour of labor. Most small plumbing and electrical fixes are resolved in that first visit."
    },
    {
      q: "Do you handle plumbing and electrical on the same visit?",
      a: "Yes. Our technicians are trained across multiple trades, so we can address both plumbing and electrical issues in a single trip."
    },
    {
      q: "What are your hours?",
      a: "We operate 7am–6pm daily. Property Care Plan members get 24/7 emergency coverage for urgent situations outside those hours."
    },
    {
      q: "Can you compete with caboestatemgmt.com or other property management sites for handyman work?",
      a: "Absolutely — we're a dedicated handyman company with 20+ years in Los Cabos, 600+ completed projects, and a 5-star rating. We focus entirely on repairs and installations, not real estate."
    },
    {
      q: "Do you work on vacation rentals and HOA properties?",
      a: "Yes. We work with vacation rental owners, property managers, HOAs, and commercial businesses throughout Los Cabos."
    }
  ];

  return (
    <>
      <SEO
        title="Top Handyman Services in Los Cabos | Plumbing, Electrical Repairs & More"
        description="Need a top handyman in Los Cabos? Cabos Handyman offers plumbing repairs, electrical work, AC service, painting & 70+ services. 20+ yrs · 600+ projects · 7am–6pm daily."
        canonicalUrl="/top-handyman-services-in-los-cabos-plumbing-electrical-repairs-more"
        ogImage="/images/cabos-handyman-og.jpg"
        geoRegion="MX-BCS"
        geoPlacename="Los Cabos, Baja California Sur"
        geoPosition="22.8866974;-109.9139710"
        schemaMarkup={schemaMarkup}
      />

      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 rounded-full px-4 py-1.5 text-sm text-teal-300 mb-6">
            <Star className="w-4 h-4 fill-teal-400 text-teal-400" />
            <span>5.0 Rating · 600+ Completed Projects · 20+ Years in Los Cabos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
            Top Handyman Services in Los Cabos
            <span className="block text-teal-400 mt-2">Plumbing, Electrical Repairs & More</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Cabos Handyman is Los Cabos' most experienced dedicated repair company — plumbing leaks, electrical work, AC service, painting, and 70+ other services. One call, all trades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+526121698328"
              className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Now: +52 612 169 8328
            </a>
            <a
              href="https://wa.me/526121698328"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-teal-600 text-white py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-sm font-medium">
          {[
            "✓ 20+ Years Experience",
            "✓ 600+ Projects Completed",
            "✓ Licensed & Insured",
            "✓ 7am–6pm Daily",
            "✓ Plumbing · Electrical · AC · Painting"
          ].map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-3">
            Our Top Handyman Services in Los Cabos
          </h2>
          <p className="text-center text-slate-500 mb-10 max-w-2xl mx-auto">
            Every repair handled by experienced, multi-trade technicians who know Los Cabos' coastal climate — salt air, humidity, and all.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.title} className="border border-slate-200 rounded-2xl p-6 hover:border-teal-400 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-slate-100 rounded-xl p-2">{service.icon}</div>
                  <h3 className="text-xl font-bold text-slate-800">{service.title}</h3>
                </div>
                <ul className="space-y-2 mb-4">
                  {service.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href={service.link} className="inline-flex items-center gap-1 text-teal-600 font-medium text-sm hover:underline">
                  See full service list <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Section */}
      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-3">Real Work, Real Results</h2>
          <p className="text-center text-slate-500 mb-8">Photos from actual jobs completed across Los Cabos.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: "/service-sections/ch-plumbing.webp", alt: "Plumbing repair by Cabos Handyman in Los Cabos" },
              { src: "/service-sections/ch-electrical.webp", alt: "Electrical work by Cabos Handyman in Cabo San Lucas" },
              { src: "/service-sections/ch-painting.webp", alt: "Interior painting by Cabos Handyman Los Cabos" },
              { src: "/service-sections/ch-masonry.webp", alt: "Masonry and stucco repair by Cabos Handyman" },
              { src: "/service-sections/ch-drywall.webp", alt: "Drywall and ceiling work by Cabos Handyman" },
              { src: "/service-sections/ch-ceiling-repair.webp", alt: "Ceiling repair by Cabos Handyman Cabo San Lucas" }
            ].map(({ src, alt }) => (
              <div key={src} className="aspect-video rounded-xl overflow-hidden bg-slate-200">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-10">
            Why Cabos Handyman is the Top Choice in Los Cabos
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Clock className="w-8 h-8 text-teal-500" />,
                title: "Fast Response",
                desc: "7am–6pm daily, same-day service for most jobs. Property Care Plan members get 24/7 emergency coverage."
              },
              {
                icon: <Shield className="w-8 h-8 text-teal-500" />,
                title: "Licensed & Insured",
                desc: "Fully licensed for construction work in Mexico. Every job is insured for your protection — no surprises."
              },
              {
                icon: <Star className="w-8 h-8 text-teal-500" />,
                title: "20+ Years in Los Cabos",
                desc: "600+ completed projects. We know the climate, the codes, and the local suppliers — which saves you money."
              },
              {
                icon: <Wrench className="w-8 h-8 text-teal-500" />,
                title: "Multi-Trade Technicians",
                desc: "Plumbing AND electrical in one visit. No need to coordinate multiple contractors for a single job."
              },
              {
                icon: <CheckCircle2 className="w-8 h-8 text-teal-500" />,
                title: "Transparent Pricing",
                desc: "$60 USD diagnostic visit covers diagnosis + first hour. Written quotes on all larger projects. Zero hidden fees."
              },
              {
                icon: <MessageCircle className="w-8 h-8 text-teal-500" />,
                title: "Easy Communication",
                desc: "Call, WhatsApp, or email. We respond fast and keep you updated throughout the job — in English and Spanish."
              }
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-start gap-3 p-5 rounded-2xl border border-slate-100 hover:border-teal-200 hover:shadow-sm transition-all">
                <div className="bg-teal-50 rounded-xl p-2">{icon}</div>
                <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep-Dive Content for SEO */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto prose prose-slate prose-headings:font-bold prose-a:text-teal-600">
          <h2>Top Handyman Services in Los Cabos: What You Need to Know</h2>
          <p>
            Los Cabos' coastal environment is hard on properties. Salt air corrodes fixtures, intense UV fades paint, and the summer humidity puts AC systems under constant stress. Finding a <strong>top handyman in Los Cabos</strong> who understands these specific conditions — not just a general contractor — makes a real difference in the quality and longevity of repairs.
          </p>
          <p>
            Cabos Handyman has been operating in the region for over 20 years, completing more than 600 residential, commercial, and HOA projects across Cabo San Lucas, San José del Cabo, and the surrounding corridor.
          </p>

          <h2>Plumbing Services in Los Cabos</h2>
          <p>
            Plumbing problems are the number-one emergency call we receive. From burst pipes in vacant vacation rentals to clogged drains in high-turnover units, our technicians diagnose and fix fast.
          </p>
          <p>Common plumbing jobs we handle every week:</p>
          <ul>
            <li>Water leak detection and pipe repair — including hidden slab leaks</li>
            <li>Drain cleaning and unclogging (kitchen, bathroom, patio)</li>
            <li><a href="/toilet-installation-cabo-san-lucas">Toilet installation</a> and running toilet repair</li>
            <li>Cistern float valve replacement — a common issue in Cabo's municipal water system</li>
            <li><a href="/water-heater-cabo-san-lucas">Water heater installation and repair</a></li>
            <li><a href="/faucet-installation-cabo-san-lucas">Faucet and sink replacement</a></li>
            <li>Shower head and valve replacement</li>
          </ul>
          <p>
            Emergency plumbing available 7am–6pm daily. For 24/7 coverage, see our <a href="/property-care-plans">Property Care Plans</a>.
          </p>

          <h2>Electrical Repairs in Los Cabos</h2>
          <p>
            Electrical issues in Cabo homes range from tripped breakers in older construction to complete rewiring for modern appliances. Our technicians are trained for residential and commercial electrical work and know the local code requirements.
          </p>
          <ul>
            <li><a href="/outlet-installation-cabo-san-lucas">Outlet and switch installation</a></li>
            <li><a href="/ceiling-fan-installation-cabo">Ceiling fan installation and wiring</a></li>
            <li>Ceiling light and recessed lighting install</li>
            <li>Bathroom, kitchen, and outdoor lighting upgrades</li>
            <li><a href="/generator-hookup-cabo-san-lucas">Generator hookup and transfer switch</a></li>
            <li>Panel inspection and breaker replacement</li>
          </ul>

          <h2>AC Service in Los Cabos</h2>
          <p>
            Mini-split AC units are the standard in Los Cabos, and they need regular maintenance to handle the humidity and salt air. The most common issue we see is clogged condensation drain lines — which cause water to drip from the unit inside the room.
          </p>
          <p>
            Our AC service includes clearing the condensation line, cleaning filters, inspecting the drain pan, and testing the unit's airflow. A typical service takes under two hours and costs significantly less than the damage a dripping AC causes to ceilings and walls.
          </p>

          <h2>Additional Handyman Services</h2>
          <p>
            Beyond plumbing, electrical, and AC, we handle the full scope of residential and commercial maintenance:
          </p>
          <ul>
            <li><a href="/painting-cabo-san-lucas">Interior and exterior painting</a> — including pool deck and cement finishes</li>
            <li><a href="/tile-installation-cabo-san-lucas">Tile and backsplash installation</a></li>
            <li><a href="/tv-mounting-cabo">TV mounting and media setups</a></li>
            <li>Door lock and deadbolt replacement</li>
            <li>Window repair and weather sealing</li>
            <li>Furniture assembly</li>
            <li>Landscape maintenance</li>
          </ul>
          <p>
            Browse our complete <a href="/services">service menu with pricing</a> — 70+ services, all with transparent rates.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.q} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === faq.q ? null : faq.q)}
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-teal-500 transition-transform shrink-0 ml-3 ${openFaq === faq.q ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === faq.q && (
                  <div className="px-5 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to Book the Top Handyman in Los Cabos?</h2>
          <p className="text-teal-100 mb-8 text-lg">
            $60 diagnostic visit · Same-day service · Plumbing, electrical, AC & more
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+526121698328"
              className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 font-bold px-8 py-4 rounded-xl hover:bg-teal-50 transition-colors text-lg"
            >
              <Phone className="w-5 h-5" />
              +52 612 169 8328
            </a>
            <a
              href="https://wa.me/526121698328"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-teal-500 border border-teal-400 text-white font-bold px-8 py-4 rounded-xl hover:bg-teal-400 transition-colors text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
          <p className="text-teal-200 text-sm mt-5">
            Or email us at <a href="mailto:loscabohandyman@gmail.com" className="underline">loscabohandyman@gmail.com</a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
