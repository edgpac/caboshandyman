import { lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '@/components/SEO';
import { CheckCircle2, Hammer, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

const SITE_URL = 'https://www.caboshandyman.com';

// Only services the business has confirmed (owner + Business Profile service
// list) — no wood-treatment product or furniture-restoration claims.
const SERVICE_GROUPS = [
  {
    title: 'Custom Carpentry & Built-Ins',
    intro:
      'Woodwork designed and built to fit your space — not off-the-shelf pieces forced into a Cabo home.',
    items: [
      'Custom kitchen cabinets',
      'Laundry room cabinets',
      'Closets and built-ins',
      'Under-stair storage',
      'Custom shelving, floating shelves and closet systems',
      'Custom doors, including barn doors and screen doors',
    ],
  },
  {
    title: 'Carpentry Repair & Refurbishing',
    intro:
      'Not everything needs replacing. We repair and refurbish existing woodwork, and replace it when repair no longer makes sense.',
    items: [
      'Repair of swollen or damaged doors, cabinets and frames',
      'Door and window repair, replacement and manufacturing',
      'Sliding door track repair',
      'Weatherproofing doors and windows',
      'Refurbishing existing cabinets and woodwork',
    ],
  },
  {
    title: 'Outdoor Carpentry: Pergolas, Palapas & Shade',
    intro:
      'Outdoor living is a big part of a Cabo home, and outdoor structures need to be built for sun, wind and salt air.',
    items: [
      'Custom pergola design and installation',
      'Palapa repair and construction',
      'Shade sails',
      'Covered patio structures',
    ],
  },
  {
    title: 'Hurricane & Storm Preparation',
    intro: 'Protect windows before storm season instead of scrambling when a storm is on the way.',
    items: ['Custom-made storm window shutters'],
  },
];

const FAQS = [
  {
    q: 'Do you build custom cabinets in Cabo San Lucas?',
    a: 'Yes. We build custom kitchen cabinets, laundry room cabinets, closets, built-ins and under-stair storage, designed and built to fit your space.',
  },
  {
    q: 'Can you repair doors and cabinets that are swollen or damaged?',
    a: 'Yes. We repair, refurbish or replace swollen or damaged doors, cabinets and frames, and we also repair sliding door tracks and weatherproof doors and windows.',
  },
  {
    q: 'Do you build pergolas and palapas?',
    a: 'Yes. We design and install custom pergolas, repair and build palapas, and install shade sails and covered patio structures.',
  },
  {
    q: 'Do you make storm shutters?',
    a: 'Yes. As part of hurricane and storm preparation, we make custom storm window shutters.',
  },
  {
    q: 'Which areas do you serve?',
    a: 'Cabo San Lucas — including the Marina, Pedregal, El Tezal, El Médano and Centro. We don’t regularly serve San José del Cabo or the Tourist Corridor.',
  },
  {
    q: 'Can I explain the project in Spanish?',
    a: 'Yes. Our crew is bilingual, so you can talk through the project in English or Spanish.',
  },
  {
    q: 'How do I get a price for carpentry work?',
    a: 'Call +52 612 169 8328 or request a free estimate on our contact page. Photos and rough measurements of the space help us quote faster.',
  },
  {
    q: 'What are your hours?',
    a: 'Monday to Saturday, 8am to 6pm. We’re closed on Sunday.',
  },
];

export default function CarpentryCaboSanLucas() {
  return (
    <>
      <SEO
        title="Carpenter in Cabo San Lucas | Carpentry in Los Cabos | Cabos Handyman"
        description="Carpenter in Cabo San Lucas, Los Cabos: custom cabinets, closets, doors, pergolas & palapas, repairs and refurbishing. Bilingual crew. Free estimate."
        canonicalUrl="/carpentry-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              serviceType: 'Carpentry',
              name: 'Carpentry Services in Cabo San Lucas',
              areaServed: ['Cabo San Lucas'],
              provider: {
                '@type': 'LocalBusiness',
                name: 'Cabos Handyman Services',
                alternateName: 'Cabos Handyman',
                telephone: '+52 612 169 8328',
                url: SITE_URL,
              },
            },
            {
              '@type': 'FAQPage',
              mainEntity: FAQS.map(faq => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: { '@type': 'Answer', text: faq.a },
              })),
            },
          ],
        }}
      />
      <Helmet>
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/carpentry-cabo-san-lucas`} />
        <link rel="alternate" hrefLang="es" href={`${SITE_URL}/carpintero-cabo-san-lucas`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/carpentry-cabo-san-lucas`} />
      </Helmet>
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-amber-700 to-yellow-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Hammer size={18} />
            <span className="text-sm font-medium">Custom · Repair · Refurbish</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Carpenter in<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Looking for a carpenter in Cabo San Lucas? Cabos Handyman builds, repairs and refurbishes woodwork for homes, vacation rentals and businesses in Cabo San Lucas, Los Cabos — custom cabinets, closets, doors, pergolas and palapas, done by a bilingual, licensed and insured crew.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-yellow-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-900 transition-colors">
              Free Estimate <ArrowRight size={20} />
            </a>
          </div>
          <p className="mt-6 text-white/90">
            ¿Prefiere español? <a href="/carpintero-cabo-san-lucas" hrefLang="es" className="underline font-semibold">Carpintero en Cabo San Lucas</a>
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Carpentry in Cabo San Lucas: Custom, Repair and Refurbishing</h2>
          <p className="text-gray-700 mb-4">
            Carpentry in Cabo San Lucas comes in three kinds of jobs: building something new that fits the space, repairing woodwork that has been damaged, and refurbishing what is already there so it looks and works like new. We do all three, so you don’t need one company for custom cabinets and another for a door that sticks.
          </p>
          <p className="text-gray-700 mb-10">
            Because we’re a handyman and remodeling crew, carpentry projects that also need plumbing, electrical or paint — a laundry room with new cabinets and a sink, or a closet with lighting — are handled by one team, coordinated from start to finish.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {SERVICE_GROUPS.map(group => (
              <div key={group.title} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{group.title}</h3>
                <p className="text-gray-700 mb-4">{group.intro}</p>
                <ul className="space-y-2">
                  {group.items.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="text-amber-600 mt-0.5 shrink-0" size={20} />
                      <span className="text-gray-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How a Carpentry Project Works</h2>
            <ol className="space-y-4 text-gray-800">
              <li><strong>1. Tell us what you need.</strong> Call, or send photos and rough measurements through our contact page. You can explain it in English or Spanish.</li>
              <li><strong>2. Free estimate.</strong> We look at the space and the scope and give you a clear quote.</li>
              <li><strong>3. Build and install.</strong> Custom pieces are built to fit, then installed; repairs and refurbishing are done on site.</li>
              <li><strong>4. One crew for the rest.</strong> Any plumbing, electrical or paint the job needs is coordinated by the same team.</li>
            </ol>
            <p className="text-gray-700 mt-6">
              Owners who aren’t in Cabo can get photo updates while the work is in progress.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-amber-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="text-amber-600" size={22} /> Why Cabos Handyman?
              </h3>
              <ul className="space-y-2 text-gray-800">
                {[
                  '20+ years experience in Los Cabos',
                  'Licensed & insured',
                  'Bilingual service (English & Spanish)',
                  '1-year workmanship warranty',
                  'Same-day service available',
                  'Serving Cabo San Lucas in Los Cabos',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="text-amber-500 shrink-0" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Where We Work</h3>
              <p className="text-gray-800">
                Cabo San Lucas only — including the Marina, Pedregal, El Tezal, El Médano and Centro. Hours: Monday to Saturday, 8am–6pm.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Carpentry Questions We Get Asked</h2>
          <div className="space-y-6">
            {FAQS.map(faq => (
              <div key={faq.q} className="border-b border-gray-200 pb-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: '/kitchen-services-cabo', label: 'Kitchen Remodeling' },
              { href: '/window-repair-cabo-san-lucas', label: 'Window Repair' },
              { href: '/pantry-shelving-cabo-san-lucas', label: 'Pantry Shelving' },
              { href: '/bar-installation-cabo-san-lucas', label: 'Bar Installation' },
            ].map(link => (
              <a key={link.href} href={link.href} className="bg-white border border-gray-200 rounded-lg p-4 text-center font-semibold text-gray-900 hover:border-amber-500 hover:shadow transition-all">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Need a Carpenter in Cabo San Lucas?</h2>
          <p className="text-white/90 mb-6">Call for a free carpentry estimate anywhere in Cabo San Lucas, Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices currentPath="/carpentry-cabo-san-lucas" />
      <Footer />
    </>
  );
}
