import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function KitchenHardwareCabo() {
  return (
    <>
      <SEO
        title="Kitchen Hardware Installation Cabo San Lucas | Cabos Handyman"
        description="Professional kitchen hardware installation in Cabo San Lucas. Cabinet handles, drawer pulls, hinges, knobs, and kitchen fixture upgrades. Quick service throughout Los Cabos."
        canonicalUrl="/kitchen-hardware-installation-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-slate-600 to-gray-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Home Improvement · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Kitchen Hardware Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Cabinet handles, drawer pulls, knobs, and hinges — new hardware installed throughout your kitchen or bathroom in Cabo San Lucas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-slate-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-900 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Hardware Services We Offer</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                New hardware is one of the easiest ways to refresh a kitchen or bathroom without a full remodel. Our handymen in Cabo San Lucas install and replace all types of cabinet and drawer hardware — quickly and with precision drilling for a clean, professional result.
              </p>
              <ul className="space-y-3">
                {[
                  'Cabinet handle and pull installation',
                  'Drawer pull installation',
                  'Cabinet knob installation',
                  'Soft-close hinge installation',
                  'Cabinet door hinge replacement',
                  'Bathroom vanity hardware installation',
                  'Full kitchen hardware upgrade (all cabinets)',
                  'Misaligned door and drawer adjustment',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-slate-600 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-slate-600" size={22} /> Why Cabos Handyman?
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {[
                    '20+ years experience in Los Cabos',
                    'Precise drilling — no crooked hardware',
                    'All cabinet brands and door styles',
                    'Bilingual service (English & Spanish)',
                    '1-year workmanship warranty',
                    'Can do full kitchen in a single visit',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="text-slate-600 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">Can you install hardware on all my cabinets in one visit?</p>
                    <p>Yes — a full kitchen hardware installation for 20–30 cabinet doors and drawers typically takes 1–2 hours.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can I supply my own hardware?</p>
                    <p>Yes — bring your own handles, pulls, or knobs and we'll install them. Or let us know what you need and we can source locally.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you fix cabinet doors that don't close properly?</p>
                    <p>Yes — hinge adjustment and alignment is included in cabinet hardware work.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Kitchen Hardware?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/kitchen-hardware-installation-cabo-san-lucas" />
      <Footer />
    </>
  );
}
