import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Zap, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function CommonAreaLightingCabo() {
  return (
    <>
      <SEO
        title="Common Area Lighting Cabo San Lucas | Cabos Handyman"
        description="Professional common area lighting installation and repair in Cabo San Lucas. Condo hallways, parking lots, pool areas, and community lighting. Licensed electricians in Los Cabos."
        canonicalUrl="/common-area-lighting-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-violet-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Zap size={18} />
            <span className="text-sm font-medium">Licensed Electricians · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Common Area Lighting<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Hallways, parking lots, pool areas, walkways, and community entrances — professional lighting installation and repair for condos and HOAs in Los Cabos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-violet-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-purple-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-900 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Area Lighting Services</h2>
              <p className="text-gray-600 mb-6">
                We work with HOAs, condo associations, and property management companies throughout Los Cabos to install, repair, and maintain lighting in common areas — keeping communities safe, well-lit, and attractive.
              </p>
              <ul className="space-y-3">
                {[
                  'Hallway and corridor lighting',
                  'Parking lot lighting installation',
                  'Pool area lighting',
                  'Exterior walkway lighting',
                  'Emergency exit lighting',
                  'Community entrance lighting',
                  'Motion sensor light installation',
                  'Burned out fixture replacement for condos and HOAs',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-violet-500 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-violet-50 border border-violet-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-violet-600" size={22} /> Why Cabos Handyman?
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {[
                    '20+ years experience in Los Cabos',
                    'Licensed & insured',
                    'Bilingual service (English & Spanish)',
                    '1-year workmanship warranty',
                    'Same-day service available',
                    'Serving all of Los Cabos',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="text-violet-500 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">Do you work with HOAs and condo associations?</p>
                    <p>Yes — we regularly work with HOAs, condo associations, and property management companies in Los Cabos for common area maintenance.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can you handle lighting for an entire condo complex?</p>
                    <p>Yes — we scale to the project size. Give us a call and we'll assess the scope and provide a quote.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you offer maintenance contracts for common areas?</p>
                    <p>Yes — ask about our commercial maintenance plans for ongoing common area lighting upkeep.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Need Common Area Lighting?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on HOA and condo lighting installation or repair in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/common-area-lighting-cabo-san-lucas" />
      <Footer />
    </>
  );
}
