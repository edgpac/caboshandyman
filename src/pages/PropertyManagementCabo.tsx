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
    title: "Monthly Inspections",
    soYouCan: "so you can know your property is fine without flying down to check",
    desc: "We walk every room, every system — plumbing, electrical, AC, pool, exterior — and send you a photo report. Problems caught early cost a fraction of what they cost discovered late."
  },
  {
    icon: <Wrench size={22} />,
    title: "Maintenance Coordination",
    soYouCan: "so you can stop juggling vendors from a different timezone",
    desc: "One message to us and it's handled. We schedule, supervise, and sign off on every job — you never have to chase a contractor in a country you're not in."
  },
  {
    icon: <Shield size={22} />,
    title: "Vendor & Contractor Management",
    soYouCan: "so you can stop paying crisis prices for unknown contractors",
    desc: "We have a vetted local network and we get competitive quotes before any job starts. No markups, no surprises — just work that gets done right the first time."
  },
  {
    icon: <Clock size={22} />,
    title: "24/7 Emergency Response",
    soYouCan: "so you can sleep through the night",
    desc: "Burst pipe at 2am? AC failure before guest check-in? We get the call, not you. On-site within 2–4 hours — and you get a message when it's resolved."
  },
  {
    icon: <Calendar size={22} />,
    title: "Key Holding & Access",
    soYouCan: "so you can let the right people in without being there",
    desc: "Secure key holding and access coordination for guests, cleaning crews, and contractors. We make sure the right people get in — and no one else does."
  },
  {
    icon: <DollarSign size={22} />,
    title: "Utility Monitoring",
    soYouCan: "so you can catch a leak before it turns into a $10,000 repair",
    desc: "Abnormal water or electricity usage is almost always a sign of a problem. We monitor it, flag it, and act before it escalates — protecting your investment silently in the background."
  }
];

const included = [
  { feature: "Monthly photo inspection report", outcome: "See what's happening without visiting" },
  { feature: "Dedicated WhatsApp with your manager", outcome: "One message — everything handled" },
  { feature: "24/7 emergency response", outcome: "Sleep through the night" },
  { feature: "Vendor coordination & supervision", outcome: "No more finding plumbers in Mexico" },
  { feature: "Key holding & access management", outcome: "Let guests in from anywhere" },
  { feature: "Utility monitoring & alerts", outcome: "Catch problems before they grow" },
  { feature: "Pre-arrival & post-departure checks", outcome: "Guests arrive to a perfect property" },
  { feature: "Seasonal maintenance scheduling", outcome: "Nothing gets forgotten between visits" },
  { feature: "Full documentation of all work", outcome: "Always know what was done and what it cost" },
  { feature: "Transparent invoicing, no markups", outcome: "Pay fair prices, always" },
];

const scenarios = [
  {
    situation: "You wake up to a WhatsApp from a neighbor saying there's water under the door.",
    without: "You panic. You don't know any plumbers in Cabo. You start calling people in a timezone 3 hours ahead.",
    with: "We already got the call. A plumber is on-site. You get a message: \"Handled. Here are photos.\""
  },
  {
    situation: "A guest checks in and the AC isn't working. It's July. They're furious.",
    without: "You get a 1-star review before you can do anything. You scramble for a technician you've never used.",
    with: "We're on it within the hour. Guest gets a resolution. Your rating stays intact."
  },
  {
    situation: "You haven't visited your property in 6 months. You have no idea what condition it's in.",
    without: "You find out on your next trip — or when something expensive breaks.",
    with: "You've received 6 photo inspection reports. You know exactly what's happening and what was done."
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
      <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full mb-8 text-sm font-medium">
              <Home size={16} />
              Cabo San Lucas &amp; Los Cabos · Property Management
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Own property in Cabo.<br className="hidden md:block" /> Not the headaches.
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
              We handle every inspection, vendor, emergency, and key —<br /><span className="text-white font-semibold">so you can enjoy owning here without living here.</span>
            </p>
            <p className="text-sm text-gray-400 mb-10 max-w-xl mx-auto">
              Most Cabo property owners live in the US, Canada, or Europe.<br />We're the local team that makes distance irrelevant.
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

      {/* The real scenarios — "does this sound familiar?" */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">Does any of this sound familiar?</h2>
            <p className="text-gray-500 text-center mb-10">These are the moments that make owning property from a distance exhausting.</p>
            <div className="space-y-5">
              {scenarios.map((s, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <p className="font-semibold text-gray-800 text-sm">📍 {s.situation}</p>
                  </div>
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                    <div className="px-6 py-4">
                      <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">Without us</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{s.without}</p>
                    </div>
                    <div className="px-6 py-4 bg-green-50/50">
                      <p className="text-xs font-bold text-[#06756b] uppercase tracking-wider mb-2">With Cabos Handyman</p>
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">{s.with}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services — feature + so you can */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">What we do — and why it matters to you</h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              Every service exists for one reason: to remove something you shouldn't have to deal with from a distance.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div key={s.title} className="border border-gray-200 rounded-xl p-6 hover:border-[#06756b] hover:shadow-sm transition-all">
                  <div className="text-[#06756b] mb-3">{s.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-xs text-[#06756b] font-semibold mb-3 italic">— {s.soYouCan}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's included — feature + outcome */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-center">Everything included</h2>
            <p className="text-gray-400 text-center mb-10">What we do — and what that means for you.</p>
            <div className="space-y-3">
              {included.map((item) => (
                <div key={item.feature} className="flex items-start gap-4 bg-white/5 rounded-lg px-5 py-4">
                  <CheckCircle2 size={18} className="text-[#4AC1C3] mt-0.5 shrink-0" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-1">
                    <span className="text-gray-200 text-sm font-medium">{item.feature}</span>
                    <span className="text-[#4AC1C3] text-xs font-semibold sm:text-right shrink-0">→ {item.outcome}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: "24/7", label: "Emergency response" },
              { stat: "2–4 hrs", label: "On-site arrival" },
              { stat: "100%", label: "Photo documented" },
              { stat: "Los Cabos", label: "Local coverage" }
            ].map(({ stat, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-[#06756b] mb-1">{stat}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">Questions we hear often</h2>
            <p className="text-gray-500 text-center mb-10">Honest answers about how property management works in Cabo San Lucas.</p>
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

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <Star size={32} className="text-[#4AC1C3] mx-auto mb-5" />
            <h2 className="text-4xl font-bold mb-4">Stop managing your Cabo property from a distance.</h2>
            <p className="text-gray-300 mb-3 text-lg leading-relaxed">
              Tell us about your property —<br />we'll tell you exactly how we'd take it off your hands.
            </p>
            <p className="text-gray-400 text-sm mb-10">No long-term contract required to get started. No-obligation quote within 24 hours.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                Get My Free Quote <ArrowRight size={18} />
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
            <p className="text-gray-500 text-sm mt-8">
              Also see: <a href="/property-care-plans" className="underline hover:text-white">Property Care Plans</a> &nbsp;·&nbsp; <a href="/vacation-rental-setup-cabo" className="underline hover:text-white">Vacation Rental Setup</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
