import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Zap, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function DecorativeLightingCabo() {
  return (
    <>
      <SEO
        title="Decorative Lighting Cabo San Lucas | Cabos Handyman"
        description="Professional decorative lighting installation in Cabo San Lucas. String lights, bistro lights, LED strip lighting, accent lights, and outdoor decorative lighting. Licensed electricians in Los Cabos."
        canonicalUrl="/decorative-lighting-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-yellow-400 to-amber-500 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Zap size={18} />
            <span className="text-sm font-medium">Lighting Design & Install · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Decorative Lighting<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            String lights, bistro lights, LED strips, accent lighting, and outdoor patio lighting — installed by licensed electricians serving homes and businesses in Los Cabos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-amber-700/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Decorative Lighting Services</h2>
              <p className="text-gray-600 mb-6">
                The right lighting transforms a patio, restaurant, or vacation rental into an inviting space. We install all types of decorative lighting in Cabo San Lucas — from bistro string lights over outdoor patios to LED accent strips indoors.
              </p>
              <ul className="space-y-3">
                {[
                  'String light and bistro light installation',
                  'LED strip lighting installation',
                  'Accent and mood lighting',
                  'Outdoor patio and palapa lighting',
                  'Pool and landscape accent lighting',
                  'Holiday and event lighting installation',
                  'Smart RGB light installation',
                  'Pergola and beam light mounting',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-amber-500 mt-0.5 shrink-0" size={20} />
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
                    'Serving all of Los Cabos',
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
                    <p className="font-semibold">Can you hang string lights on my patio or palapa?</p>
                    <p>Yes — outdoor string and bistro lights are very popular in Cabo San Lucas for restaurants, vacation rentals, and homes. We mount them safely and wire to an outdoor outlet.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you install LED strip lighting?</p>
                    <p>Yes — under cabinet strips, stair lighting, ceiling cove lighting, and pool edge lighting are all services we offer.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can decorative lighting be connected to a smart switch or timer?</p>
                    <p>Yes — we can connect decorative lighting to dimmers, timers, or smart switches for easy control.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Transform Your Space with Decorative Lighting</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on decorative lighting installation anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/decorative-lighting-cabo-san-lucas" />
      <Footer />
    </>
  );
}
