import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function ShowerHeadReplacementCabo() {
  return (
    <>
      <SEO
        title="Shower Head Replacement Cabo San Lucas | Shower Valve Repair | Cabos Handyman"
        description="Professional shower head replacement and shower valve repair in Cabo San Lucas. Rain shower heads, handheld showers, low pressure fixes. Licensed plumbers in Los Cabos."
        canonicalUrl="/shower-head-replacement-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Licensed Plumbers · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Shower Head Replacement<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Rain shower heads, handheld showers, valve replacements, and low pressure fixes — by licensed plumbers serving all of Los Cabos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-blue-800/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Shower Head & Valve Services</h2>
              <p className="text-gray-600 mb-6">
                Whether your shower head is dripping, clogged with mineral deposits, or you want to upgrade to a rain shower, our licensed plumbers in Cabo San Lucas handle all shower head and valve work quickly and correctly.
              </p>
              <ul className="space-y-3">
                {[
                  'Shower head replacement (all types)',
                  'Rain shower head installation',
                  'Handheld shower installation',
                  'Shower valve replacement',
                  'Low water pressure diagnosis and fix',
                  'Shower arm and flange replacement',
                  'Thermostatic shower valve installation',
                  'Dripping shower head repair',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-blue-500 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-blue-600" size={22} /> Why Cabos Handyman?
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
                      <CheckCircle2 className="text-blue-500 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">How long does shower head replacement take?</p>
                    <p>Most shower head replacements take 30 minutes to 1 hour. Shower valve replacements may take 2–3 hours.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can you fix low water pressure in my shower?</p>
                    <p>Yes — we diagnose and fix low pressure issues including clogged shower heads, faulty pressure regulators, and supply line issues.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can I supply my own shower head?</p>
                    <p>Yes — we install any shower head you provide.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Shower?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on shower head replacement anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/shower-head-replacement-cabo-san-lucas" />
      <Footer />
    </>
  );
}
