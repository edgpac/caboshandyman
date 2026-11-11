import { lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '@/components/SEO';
import { CheckCircle2, Hammer, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

const SITE_URL = 'https://www.caboshandyman.com';

export default function CarpentryCaboSanLucas() {
  return (
    <>
      <SEO
        title="Carpenter in Cabo San Lucas | Carpentry Services | Cabos Handyman"
        description="Carpentry in Cabo San Lucas, Los Cabos: cabinets, shelving, trim, doors and custom bar & booth builds. Bilingual, licensed & insured. Free estimate."
        canonicalUrl="/carpentry-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Carpentry',
          name: 'Carpentry Services in Cabo San Lucas',
          areaServed: ['Cabo San Lucas'],
          provider: {
            '@type': 'LocalBusiness',
            name: 'Cabos Handyman',
            telephone: '+52 612 169 8328',
            url: SITE_URL,
          },
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
            <span className="text-sm font-medium">Carpentry · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Carpentry Services<br />in Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Cabinets, shelving, trim and custom woodwork for homes, vacation rentals and businesses across Cabo San Lucas, Los Cabos — done by a bilingual, licensed and insured crew.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-yellow-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-900 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
          <p className="mt-6 text-white/90">
            ¿Prefiere español? <a href="/carpintero-cabo-san-lucas" hrefLang="es" className="underline font-semibold">Carpintero en Cabo San Lucas</a>
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Carpentry Work We Do</h2>
              <p className="text-gray-700 mb-6">
                From a new cabinet or a run of pantry shelves to a full bar or booth build, we handle carpentry projects throughout Cabo San Lucas, Los Cabos — and coordinate any plumbing or electrical the job needs, so you deal with one crew.
              </p>
              <ul className="space-y-3">
                {[
                  'Cabinet installation, adjustment and repair',
                  'Custom shelving for pantries, closets and bathrooms',
                  'Trim, baseboard and molding installation',
                  'Door adjustment, hinges and hardware',
                  'Bar and booth builds for homes and restaurants',
                  'Furniture assembly',
                  'Kitchen hardware installation',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-amber-600 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-amber-600" size={22} /> Why Cabos Handyman?
                </h3>
                <ul className="space-y-2 text-gray-700">
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

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">Do you build to my design?</p>
                    <p>Yes — we work from your design, or help you develop one, and handle the build and installation.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can I explain the job in Spanish?</p>
                    <p>Yes. Our crew is bilingual, so you can talk through the project in English or Spanish.</p>
                  </div>
                  <div>
                    <p className="font-semibold">How do I get a price?</p>
                    <p>Call +52 612 169 8328 or request a free estimate on our contact page. Photos of the space help us quote faster.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Carpentry Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: '/cabinet-installation-cabo-san-lucas', label: 'Cabinet Installation' },
              { href: '/pantry-shelving-cabo-san-lucas', label: 'Pantry Shelving' },
              { href: '/bar-installation-cabo-san-lucas', label: 'Bar Installation' },
              { href: '/booth-installation-cabo-san-lucas', label: 'Booth Installation' },
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
          <h2 className="text-3xl font-bold mb-4">Need a Carpenter in Cabo?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on carpentry anywhere in Cabo San Lucas, Los Cabos.</p>
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
