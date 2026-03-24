import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function TowelRackInstallationCabo() {
  return (
    <>
      <SEO
        title="Towel Rack Installation Cabo San Lucas | Cabos Handyman"
        description="Professional towel rack and towel bar installation in Cabo San Lucas. Towel rings, toilet paper holders, robe hooks, and bathroom accessories mounted securely. Handyman in Los Cabos."
        canonicalUrl="/towel-rack-installation-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-teal-500 to-cyan-600 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Home Improvement · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Towel Rack Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Towel bars, towel rings, toilet paper holders, robe hooks, and full bathroom accessory sets — mounted securely in tile, concrete, and drywall.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-teal-800/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-800 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Towel Rack & Accessory Services</h2>
              <p className="text-gray-600 mb-6">
                Bathroom accessories that fall off the wall are frustrating and a sign of poor installation. We mount towel bars, hooks, and holders with the right anchors for tile and concrete walls common in Cabo San Lucas homes.
              </p>
              <ul className="space-y-3">
                {[
                  'Towel bar installation',
                  'Towel ring installation',
                  'Toilet paper holder installation',
                  'Robe hook installation',
                  'Double towel bar installation',
                  'Heated towel rack installation',
                  'Full bathroom accessories set installation',
                  'Old towel rack removal and replacement',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-500 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-teal-600" size={22} /> Why Cabos Handyman?
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
                      <CheckCircle2 className="text-teal-500 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">Can towel racks be mounted in tile walls?</p>
                    <p>Yes — we drill into tile and use proper anchors for a secure mount that won't pull out.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can you supply the towel rack?</p>
                    <p>We can install hardware you provide, or source from local suppliers in Cabo San Lucas.</p>
                  </div>
                  <div>
                    <p className="font-semibold">How many pieces can you install in one visit?</p>
                    <p>A full set of bathroom accessories (towel bar, TP holder, robe hooks) typically takes 1–2 hours.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Need Bathroom Accessories Installed?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on towel rack and bathroom accessory installation in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/towel-rack-installation-cabo-san-lucas" />
      <Footer />
    </>
  );
}
