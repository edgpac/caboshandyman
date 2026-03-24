import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function BathroomShelvingCabo() {
  return (
    <>
      <SEO
        title="Bathroom Shelving Installation Cabo San Lucas | Cabos Handyman"
        description="Professional bathroom shelving installation in Cabo San Lucas. Floating shelves, shower shelves, over-toilet storage, and bathroom storage units. Handyman in Los Cabos."
        canonicalUrl="/bathroom-shelving-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Home Improvement · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Bathroom Shelving<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Floating shelves, over-toilet storage, shower niches, and bathroom cabinets — installed securely in tile and concrete walls throughout Los Cabos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-indigo-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-900 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Bathroom Shelving Services</h2>
              <p className="text-gray-600 mb-6">
                Maximize bathroom storage with properly installed shelving. We work with all wall types common in Cabo San Lucas — tile, concrete block, and stucco — using anchors rated for the load.
              </p>
              <ul className="space-y-3">
                {[
                  'Floating bathroom shelf installation',
                  'Over-toilet storage installation',
                  'Shower niche and shelf installation',
                  'Wall-mounted bathroom cabinet installation',
                  'Linen closet shelving',
                  'Towel and accessory shelf installation',
                  'Bathroom storage unit assembly',
                  'Concrete and tile wall anchoring',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-indigo-500 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-indigo-600" size={22} /> Why Cabos Handyman?
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
                      <CheckCircle2 className="text-indigo-500 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">Can shelves be mounted in my bathroom tile walls?</p>
                    <p>Yes — we drill carefully into tile and use proper waterproof anchors for bathrooms.</p>
                  </div>
                  <div>
                    <p className="font-semibold">How long does bathroom shelf installation take?</p>
                    <p>A single shelf takes 30–60 minutes. Multiple shelves or a full bathroom storage solution typically takes 2–3 hours.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can you install shelving in a small bathroom?</p>
                    <p>Yes — we work in all bathroom sizes and can maximize storage in small spaces.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Need More Bathroom Storage?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on bathroom shelving installation anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/bathroom-shelving-cabo-san-lucas" />
      <Footer />
    </>
  );
}
