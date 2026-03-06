import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function ToiletLeakRepairCabo() {
  return (
    <>
      <SEO
        title="Toilet Leak Repair Cabo San Lucas | Running Toilet Fix | Cabos Handyman"
        description="Professional toilet leak repair in Cabo San Lucas. Fix running toilets, leaking base, tank leaks, and supply line leaks. Licensed plumbers with fast response in Los Cabos."
        canonicalUrl="/toilet-leak-repair-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-cyan-600 to-teal-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Licensed Plumbers · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Toilet Leak Repair<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Running toilets, leaking bases, tank leaks, and supply line issues — diagnosed and fixed by licensed plumbers with fast response in Los Cabos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-cyan-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-teal-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-900 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Toilet Leak Repair Services</h2>
              <p className="text-gray-600 mb-6">
                A leaking or running toilet can waste hundreds of gallons of water per day and cause costly floor damage. Our licensed plumbers in Cabo San Lucas diagnose the problem and fix it in a single visit.
              </p>
              <ul className="space-y-3">
                {[
                  'Running toilet repair (flapper, fill valve)',
                  'Toilet base leak repair (wax ring replacement)',
                  'Tank-to-bowl gasket repair',
                  'Supply line leak repair',
                  'Toilet handle and flush mechanism repair',
                  'Phantom flushing diagnosis and fix',
                  'Cracked tank or bowl replacement',
                  'Water damage assessment',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-cyan-600 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-cyan-600" size={22} /> Why Cabos Handyman?
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
                      <CheckCircle2 className="text-cyan-500 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">What causes a toilet to run constantly?</p>
                    <p>The most common causes are a worn flapper, faulty fill valve, or float adjustment issues. We diagnose and fix it in one visit.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Is a leaking toilet base an emergency?</p>
                    <p>Yes — a leaking toilet base can cause floor damage and mold. We respond quickly to base leaks in Cabo San Lucas.</p>
                  </div>
                  <div>
                    <p className="font-semibold">How long does toilet leak repair take?</p>
                    <p>Most toilet repairs take 1–2 hours. Wax ring replacements require removing the toilet and may take 2–3 hours.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Toilet Leaking? Call Now.</h2>
          <p className="text-white/90 mb-6">Don't let a leaking toilet cause water damage. We respond fast anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/toilet-leak-repair-cabo-san-lucas" />
      <Footer />
    </>
  );
}
