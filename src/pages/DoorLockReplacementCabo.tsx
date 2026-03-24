import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Shield, Phone, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function DoorLockReplacementCabo() {
  return (
    <>
      <SEO
        title="Door Lock Replacement Cabo San Lucas | Cabos Handyman"
        description="Professional door lock replacement and installation in Cabo San Lucas. Deadbolts, locksets, smart locks, and security upgrades. Fast service for homes and vacation rentals in Los Cabos."
        canonicalUrl="/door-lock-replacement-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-gray-700 to-slate-800 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Shield size={18} />
            <span className="text-sm font-medium">Security & Hardware · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Door Lock Replacement<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Deadbolts, locksets, smart locks, and security hardware — installed and replaced fast for homes and vacation rentals throughout Los Cabos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-gray-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-slate-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-900 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Door Lock Services</h2>
              <p className="text-gray-600 mb-6">
                Security starts at the door. Whether you need a simple lockset replacement, a deadbolt upgrade, or a smart lock for your vacation rental, we install and program door locks quickly and correctly in Cabo San Lucas.
              </p>
              <ul className="space-y-3">
                {[
                  'Deadbolt installation and replacement',
                  'Door lockset replacement',
                  'Smart lock installation (keypad and app-controlled)',
                  'Vacation rental door lock upgrades',
                  'Door handle and latch replacement',
                  'Lock re-keying',
                  'Security door hardware installation',
                  'Gate lock installation',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-gray-500 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-100 border border-gray-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-gray-600" size={22} /> Why Cabos Handyman?
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
                      <CheckCircle2 className="text-gray-500 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">Can you install smart locks for my vacation rental?</p>
                    <p>Yes — smart locks with keypad codes are very popular for Airbnb and VRBO properties in Cabo San Lucas. We install and program them.</p>
                  </div>
                  <div>
                    <p className="font-semibold">How long does a lock replacement take?</p>
                    <p>Most lock replacements take 30 minutes to 1 hour per door.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can you replace locks on metal doors common in Mexico?</p>
                    <p>Yes — we work with all door types common in Los Cabos including metal, wood, and PVC doors.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Upgrade Your Home Security Today</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on door lock installation or replacement anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/door-lock-replacement-cabo-san-lucas" />
      <Footer />
    </>
  );
}
