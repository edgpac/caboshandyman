import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function ToiletInstallationCabo() {
  return (
    <>
      <SEO
        title="Toilet Installation Cabo San Lucas | Cabos Handyman"
        description="Professional toilet installation and replacement in Cabo San Lucas. Licensed plumbers for new toilet installs, toilet replacements, and running toilet repairs. Call for same-day service."
        canonicalUrl="/toilet-installation-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-cyan-600 to-blue-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Licensed Plumbers · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Toilet Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Professional toilet installation, replacement, and repair throughout Los Cabos. We handle everything from standard swaps to complete bathroom plumbing upgrades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center justify-center gap-2 bg-white text-cyan-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-cyan-800/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cyan-800 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Toilet Services We Offer</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Whether you need a brand-new toilet installed, an old unit replaced, or a running toilet repaired, our licensed plumbers in Cabo San Lucas get the job done right. We work with all major toilet brands and can source parts locally.
              </p>
              <ul className="space-y-3">
                {[
                  'New toilet installation (any model or brand)',
                  'Old toilet removal and replacement',
                  'Running toilet repair (flapper, fill valve, flush valve)',
                  'Toilet rocking / loose toilet repair',
                  'Toilet unclogging and drain clearing',
                  'Wax ring and seal replacement',
                  'Water supply line replacement',
                  'Dual-flush and low-flow toilet upgrades',
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
                    'Licensed & insured plumbers',
                    'Bilingual service (English & Spanish)',
                    'Same-day service available',
                    '1-year workmanship warranty',
                    'Serving Cabo, San José, CSL corridor',
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
                    <p className="font-semibold">How long does toilet installation take?</p>
                    <p>Most standard toilet replacements take 1–2 hours. We handle removal, disposal of the old unit, and full installation.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can you source the toilet for me?</p>
                    <p>Yes — we can supply and install, or you can provide the toilet and we'll install it. Either way works.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you serve vacation rentals?</p>
                    <p>Absolutely. We serve Airbnb, VRBO, and long-term rental properties throughout Los Cabos.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Need a Toilet Installed or Replaced?</h2>
          <p className="text-white/90 mb-6">Call us for a free estimate or to schedule service anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/toilet-installation-cabo-san-lucas" />
      <Footer />
    </>
  );
}
