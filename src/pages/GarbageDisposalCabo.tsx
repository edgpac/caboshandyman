import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function GarbageDisposalCabo() {
  return (
    <>
      <SEO
        title="Garbage Disposal Installation Cabo San Lucas | Disposal Repair | Cabos Handyman"
        description="Professional garbage disposal installation and repair in Cabo San Lucas. All major brands installed, noisy or leaking disposal repaired. Licensed plumbers in Los Cabos."
        canonicalUrl="/garbage-disposal-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-gray-700 to-slate-800 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Licensed Plumbers · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Garbage Disposal Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            New garbage disposal installation, replacement, and repair in Cabo San Lucas. We install all major brands and fix jammed, leaking, or broken units.
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Garbage Disposal Services</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our licensed plumbers in Cabo San Lucas install, replace, and repair garbage disposals in residential kitchens, vacation rentals, and commercial properties. We handle the plumbing and electrical connection so the job is done safely.
              </p>
              <ul className="space-y-3">
                {[
                  'New garbage disposal installation',
                  'Old disposal removal and replacement',
                  'Jammed disposal repair and reset',
                  'Leaking disposal repair or replacement',
                  'Noisy disposal diagnosis and fix',
                  'Dishwasher drain connection to disposal',
                  'Electrical wiring for new disposal',
                  'InSinkErator, Moen, and major brand installs',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-gray-600 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-100 border border-gray-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-gray-700" size={22} /> Why Cabos Handyman?
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {[
                    '20+ years experience in Los Cabos',
                    'Licensed plumbers for safe installation',
                    'We handle plumbing and electrical',
                    'Bilingual service (English & Spanish)',
                    '1-year workmanship warranty',
                    'Same-day service available',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="text-gray-600 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">Can I get a garbage disposal in Mexico?</p>
                    <p>Yes — garbage disposals are available in Cabo San Lucas. We can source and install one for you.</p>
                  </div>
                  <div>
                    <p className="font-semibold">How long does installation take?</p>
                    <p>Most garbage disposal replacements take about 1–2 hours including removal of the old unit and full installation.</p>
                  </div>
                  <div>
                    <p className="font-semibold">My disposal is jammed — can you fix it?</p>
                    <p>Yes — we diagnose jammed, leaking, or dead disposals and either repair or replace as needed.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Need a Garbage Disposal Installed?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/garbage-disposal-cabo-san-lucas" />
      <Footer />
    </>
  );
}
