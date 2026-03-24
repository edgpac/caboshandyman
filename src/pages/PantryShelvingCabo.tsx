import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function PantryShelvingCabo() {
  return (
    <>
      <SEO
        title="Pantry Shelving Installation Cabo San Lucas | Cabos Handyman"
        description="Professional pantry and shelving installation in Cabo San Lucas. Custom pantry shelves, closet shelving, wall shelves, and built-in storage. Licensed handymen in Los Cabos."
        canonicalUrl="/pantry-shelving-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-amber-700 to-orange-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Home Improvement · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Pantry Shelving Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Custom pantry shelves, closet shelving, wall shelves, and built-in storage solutions installed throughout Cabo San Lucas and Los Cabos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center justify-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-amber-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-900 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Shelving Services We Offer</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                From a simple pantry shelf to a full walk-in closet system, our handymen in Cabo San Lucas install all types of shelving — anchored properly into concrete, drywall, or wood stud walls common in Los Cabos construction.
              </p>
              <ul className="space-y-3">
                {[
                  'Pantry shelf installation',
                  'Walk-in closet shelving system',
                  'Wall shelf installation (single and multiple)',
                  'Floating shelf installation',
                  'Wire shelving installation',
                  'Laundry room shelving',
                  'Garage and utility shelving',
                  'Built-in storage and niche shelves',
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
                    'Proper anchoring in concrete and drywall',
                    'Level, secure installation every time',
                    'Bilingual service (English & Spanish)',
                    '1-year workmanship warranty',
                    'Same-day and next-day appointments',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="text-amber-600 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">Can shelves be mounted in concrete walls?</p>
                    <p>Yes — most walls in Cabo San Lucas are concrete block. We use proper anchors and drill bits for secure installation.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can I supply my own shelving?</p>
                    <p>Yes — we install IKEA, custom-cut wood, wire, or any shelving system you provide.</p>
                  </div>
                  <div>
                    <p className="font-semibold">How long does pantry shelving take?</p>
                    <p>A typical pantry shelving install takes 1–3 hours depending on the number of shelves and wall type.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Need Shelving Installed?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on pantry or shelving installation anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/pantry-shelving-cabo-san-lucas" />
      <Footer />
    </>
  );
}
