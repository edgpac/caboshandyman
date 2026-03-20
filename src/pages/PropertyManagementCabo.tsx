import { lazy, useState } from 'react';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import { CheckCircle2, ArrowRight, Shield, Clock, Home, Wrench, Phone, Star, DollarSign, Calendar, ChevronDown } from 'lucide-react';

const Footer = lazy(() => import('@/components/Footer'));

const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.caboshandyman.com/property-management-cabo-san-lucas#service",
      "name": "Property Management Services Cabo San Lucas",
      "description": "Full-service property management for absentee owners, vacation rentals, and investment properties in Cabo San Lucas and Los Cabos, México. Maintenance coordination, inspections, vendor management, and 24/7 emergency response.",
      "serviceType": "Property Management",
      "provider": {
        "@type": "LocalBusiness",
        "@id": "https://www.caboshandyman.com/#business",
        "name": "Cabos Handyman",
        "image": "https://www.caboshandyman.com/CHLOGO.png",
        "url": "https://www.caboshandyman.com",
        "telephone": "+52-612-169-8328",
        "email": "loscabohandyman@gmail.com",
        "priceRange": "$$",
        "openingHours": "Mo-Su 00:00-23:59",
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
        "sameAs": [
          "https://maps.app.goo.gl/hJRcahhtYjF5tkv4A",
          "https://www.facebook.com/share/19wvxoz8Cy/",
          "https://www.instagram.com/caboshandyman"
        ]
      },
      "areaServed": [
        { "@type": "City", "name": "Cabo San Lucas" },
        { "@type": "City", "name": "San José del Cabo" },
        { "@type": "AdministrativeArea", "name": "Los Cabos" }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.caboshandyman.com/property-management-cabo-san-lucas#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What does property management in Cabo San Lucas include?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Property management in Cabo San Lucas typically includes routine maintenance coordination, vendor and contractor management, regular property inspections, key holding, emergency response, utility oversight, and communication with the property owner. Cabos Handyman handles all of these so you don't have to be on-site."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need property management if I own a vacation rental in Los Cabos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — most Cabo vacation rental owners are not local. Without a trusted local contact, small issues (a broken AC, a leak, a faulty lock) can escalate quickly and lead to bad reviews or property damage. A property manager acts as your eyes and hands on the ground."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between property management and a maintenance plan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A maintenance plan (like our Property Care Plans) covers scheduled, recurring maintenance tasks on a monthly basis. Property management is broader — it covers coordination of all service vendors, inspections, emergency response, key management, and owner communication. Both can be combined."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly do you respond to emergencies at managed properties?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cabos Handyman provides 24/7 emergency response for managed properties in Cabo San Lucas and Los Cabos. For critical issues like leaks, electrical failures, or security concerns, we aim to be on-site within 2–4 hours."
          }
        },
        {
          "@type": "Question",
          "name": "Can you manage my property if I live outside of Mexico?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — this is the most common scenario. We act as your local point of contact, handle all on-site coordination, send you photo reports after inspections, and communicate via WhatsApp, email, or video call. You stay informed without needing to travel."
          }
        },
        {
          "@type": "Question",
          "name": "How much does property management cost in Cabo San Lucas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Property management costs in Cabo San Lucas vary based on property size, services needed, and how often inspections are required. Cabos Handyman offers flexible scopes — from basic oversight to full-service management. Contact us for a no-obligation quote tailored to your property."
          }
        }
      ]
    }
  ]
};

const services = [
  {
    icon: <Home size={22} />,
    title: "Regular Property Inspections",
    desc: "Scheduled walk-throughs with photo reports sent directly to you. We check every system — plumbing, electrical, AC, pool, exterior — and flag anything before it becomes a costly problem."
  },
  {
    icon: <Wrench size={22} />,
    title: "Maintenance Coordination",
    desc: "We schedule and supervise all routine and corrective maintenance. One call to us, and we handle the rest — no more juggling multiple vendors in a different timezone."
  },
  {
    icon: <Shield size={22} />,
    title: "Vendor & Contractor Management",
    desc: "We have a vetted network of plumbers, electricians, AC technicians, painters, and more. We get competitive quotes, supervise the work, and verify quality before final payment."
  },
  {
    icon: <Clock size={22} />,
    title: "24/7 Emergency Response",
    desc: "Burst pipe at 2am? AC failure before guest check-in? We're available around the clock for managed properties. Critical issues get a 2–4 hour on-site response."
  },
  {
    icon: <Calendar size={22} />,
    title: "Key Holding & Access Management",
    desc: "Secure key holding and access coordination for guests, cleaning crews, and contractors. We ensure the right people get in — and no one else does."
  },
  {
    icon: <DollarSign size={22} />,
    title: "Utility & Bill Oversight",
    desc: "We monitor utility accounts, flag abnormal usage (a sign of leaks or equipment failure), and can coordinate payments with your preferred method."
  }
];

const included = [
  "Monthly inspection with photo report",
  "Dedicated WhatsApp line with your property manager",
  "Emergency response 24/7",
  "Vendor coordination and supervision",
  "Key holding and access management",
  "Utility monitoring and alerts",
  "Pre-arrival and post-departure checks (vacation rentals)",
  "Seasonal maintenance scheduling",
  "Documentation of all work performed",
  "Transparent invoicing — no hidden markups"
];

const whoItsFor = [
  {
    label: "Foreign property owners",
    detail: "You bought a condo or villa in Cabo but live in the US, Canada, or Europe. You need trusted local representation."
  },
  {
    label: "Vacation rental hosts",
    detail: "You list on Airbnb or VRBO and need someone to handle turnovers, maintenance, and guest issues on the ground."
  },
  {
    label: "Investment property owners",
    detail: "You own property as an asset. Protecting its value means proactive upkeep — not reactive repairs after damage accumulates."
  },
  {
    label: "Part-time residents",
    detail: "You visit Cabo a few months a year. Your property shouldn't sit unsupervised the rest of the time."
  }
];

const faqs = [
  {
    q: "What does property management in Cabo San Lucas include?",
    a: "It includes routine maintenance coordination, vendor management, regular property inspections with photo reports, key holding, emergency response, utility oversight, and direct communication with you as the owner. Cabos Handyman handles all of this so you don't have to be on-site."
  },
  {
    q: "Do I need property management if I own a vacation rental in Los Cabos?",
    a: "Yes — most Cabo vacation rental owners are not local. Without a trusted local contact, small issues like a broken AC, a leak, or a faulty lock can escalate quickly and lead to bad reviews or property damage. A property manager acts as your eyes and hands on the ground."
  },
  {
    q: "What is the difference between property management and a maintenance plan?",
    a: "A maintenance plan covers scheduled recurring tasks on a monthly basis (like our Property Care Plans). Property management is broader — it includes vendor coordination, inspections, emergency response, key management, and owner communication. Both can be combined for complete coverage."
  },
  {
    q: "How quickly do you respond to emergencies at managed properties?",
    a: "We provide 24/7 emergency response for managed properties in Cabo San Lucas and Los Cabos. For critical issues like leaks, electrical failures, or security concerns, we aim to be on-site within 2–4 hours."
  },
  {
    q: "Can you manage my property if I live outside of Mexico?",
    a: "Yes — this is the most common scenario. We act as your local point of contact, handle all on-site coordination, send you photo reports after inspections, and communicate via WhatsApp, email, or video call. You stay informed without needing to travel."
  },
  {
    q: "How much does property management cost in Cabo San Lucas?",
    a: "Costs vary based on property size, services needed, and inspection frequency. We offer flexible scopes — from basic oversight to full-service management. Contact us for a no-obligation quote tailored to your property."
  }
];

export default function PropertyManagementCabo() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="Property Management Cabo San Lucas | Local Property Manager Los Cabos | Cabos Handyman"
        description="Trusted property management in Cabo San Lucas for foreign owners and vacation rentals. Inspections, maintenance coordination, 24/7 emergency response, and vendor management. You stay informed — we handle everything on the ground."
        canonicalUrl="/property-management-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
        schemaMarkup={schemaMarkup}
      />

      <Navigation />

      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full mb-6 text-sm font-medium">
              <Home size={18} />
              Property Management · Cabo San Lucas &amp; Los Cabos
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Property Management in<br className="hidden md:block" /> Cabo San Lucas
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Your trusted local presence in Los Cabos — inspections, maintenance, vendors, and emergency response, all handled while you're away.
            </p>
            <p className="text-sm text-gray-400 mb-10 max-w-xl mx-auto">
              Most Cabo property owners don't live in Mexico. We bridge that gap — acting as your eyes, hands, and point of contact on the ground.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get a Free Quote <ArrowRight size={18} />
              </a>
              <a
                href="https://wa.me/526121698328"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Phone size={18} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">Who This Service Is For</h2>
            <p className="text-gray-500 text-center mb-10">If your property spends any time without you in it, you need local representation.</p>
            <div className="grid md:grid-cols-2 gap-5">
              {whoItsFor.map((item) => (
                <div key={item.label} className="bg-white border border-gray-200 rounded-xl p-6 flex gap-4">
                  <CheckCircle2 size={22} className="text-[#06756b] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{item.label}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">What We Handle For You</h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              Full-scope property management — so you never have to coordinate a repair from 3,000 miles away again.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div key={s.title} className="border border-gray-200 rounded-xl p-6 hover:border-[#06756b] hover:shadow-sm transition-all">
                  <div className="text-[#06756b] mb-3">{s.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's included checklist */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-3 text-center">Everything Included</h2>
            <p className="text-gray-400 text-center mb-10">Every managed property gets the full set — no stripped-down tiers.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#4AC1C3] mt-0.5 shrink-0" />
                  <span className="text-gray-200 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* vs DIY comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">Managing It Yourself vs. Hiring Us</h2>
            <p className="text-gray-500 text-center mb-10">The true cost of an unmanaged property in Cabo is rarely visible — until something goes wrong.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-red-100 rounded-xl p-6 bg-red-50">
                <p className="font-bold text-red-700 mb-4 flex items-center gap-2">
                  <span className="text-xl">❌</span> Without a Property Manager
                </p>
                <ul className="space-y-3 text-sm text-gray-700">
                  {[
                    "Unreported leaks cause mold and structural damage",
                    "Vendors charge more when there's no local oversight",
                    "Breakdowns discovered only when guests complain",
                    "Emergency repairs done at crisis prices",
                    "No documentation of work or costs",
                    "Coordinating repairs from a different timezone",
                    "Risk of unauthorized access or theft"
                  ].map(t => (
                    <li key={t} className="flex gap-2"><span className="text-red-400 mt-0.5">✕</span>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="border-2 border-green-100 rounded-xl p-6 bg-green-50">
                <p className="font-bold text-[#06756b] mb-4 flex items-center gap-2">
                  <span className="text-xl">✅</span> With Cabos Handyman
                </p>
                <ul className="space-y-3 text-sm text-gray-700">
                  {[
                    "Issues caught early during monthly inspections",
                    "Vetted vendor network at fair, negotiated rates",
                    "Proactive maintenance prevents guest complaints",
                    "24/7 emergency response on standby",
                    "Photo reports and invoices for every job",
                    "One WhatsApp message handles everything",
                    "Secure key holding and access control"
                  ].map(t => (
                    <li key={t} className="flex gap-2"><CheckCircle2 size={15} className="text-[#06756b] mt-0.5 shrink-0" />{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — AEO structured Q&A with accordion */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-center mb-10">Common questions about property management in Cabo San Lucas.</p>
            <div className="space-y-3">
              {faqs.map(({ q, a }, i) => (
                <div key={i} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-start gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 leading-snug">{q}</h3>
                    <ChevronDown
                      size={20}
                      className={`text-[#06756b] shrink-0 mt-0.5 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 pt-0 border-t-2 border-gray-200">
                      <p className="text-gray-600 leading-relaxed text-sm pt-4">{a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: "24/7", label: "Emergency Response" },
              { stat: "2–4 hrs", label: "On-site Arrival" },
              { stat: "100%", label: "Photo Documented" },
              { stat: "Los Cabos", label: "Local Coverage" }
            ].map(({ stat, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-[#06756b] mb-1">{stat}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <Star size={32} className="text-[#4AC1C3] mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Let's Protect Your Property</h2>
            <p className="text-gray-300 mb-8">
              Tell us about your property in Los Cabos and we'll put together a management scope that fits your needs and budget. No long-term contracts required to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Request a Free Scope <ArrowRight size={18} />
              </a>
              <a
                href="https://wa.me/526121698328"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Phone size={18} /> +52 612 169 8328
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-6">
              Also see: <a href="/property-care-plans" className="underline hover:text-white">Property Care Plans</a> &nbsp;·&nbsp; <a href="/vacation-rental-setup-cabo" className="underline hover:text-white">Vacation Rental Setup</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
