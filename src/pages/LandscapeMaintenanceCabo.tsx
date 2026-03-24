import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function LandscapeMaintenanceCabo() {
  return (
    <>
      <SEO
        title="Landscape Maintenance Cabo San Lucas | Cabos Handyman"
        description="Professional landscape maintenance in Cabo San Lucas. Palm tree pruning, yard cleanup, irrigation system check, and property maintenance. Serving all of Los Cabos."
        canonicalUrl="/landscape-maintenance-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Property Maintenance · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Landscape Maintenance<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Palm tree pruning, yard cleanup, irrigation repair, and property landscape maintenance — serving homes and vacation rentals throughout Los Cabos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-green-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-900 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Landscape Maintenance Services</h2>
              <p className="text-gray-600 mb-6">
                The desert climate of Cabo San Lucas requires landscape maintenance adapted to local conditions. We keep palm trees trimmed, irrigation systems running, and properties looking their best year-round.
              </p>
              <ul className="space-y-3">
                {[
                  'Palm tree pruning and trimming',
                  'Dead palm frond removal',
                  'Yard and garden cleanup',
                  'Irrigation system inspection and repair',
                  'Lawn and ground cover maintenance',
                  'Tree and shrub trimming',
                  'Common area landscaping maintenance',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-600 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-green-600" size={22} /> Why Cabos Handyman?
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
                      <CheckCircle2 className="text-green-500 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">How often should palm trees be pruned in Cabo?</p>
                    <p>Palm trees in Cabo San Lucas typically need pruning 1–2 times per year to remove dead fronds and reduce hurricane wind resistance.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you handle large palm trees?</p>
                    <p>Yes — we have equipment for tall palms. Height and access may affect the scope of work, which we assess during the estimate.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you do regular maintenance contracts?</p>
                    <p>Yes — many of our Property Care plan clients include landscape maintenance. Ask about bundling landscape service with your plan.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Keep Your Property Looking Great</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on landscape maintenance anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/landscape-maintenance-cabo-san-lucas" />
      <Footer />
    </>
  );
}
