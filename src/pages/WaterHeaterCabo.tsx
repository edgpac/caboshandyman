import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function WaterHeaterCabo() {
  return (
    <>
      <SEO
        title="Water Heater Installation Cabo San Lucas | Hot Water Heater Repair | Cabos Handyman"
        description="Water heater installation and repair in Cabo San Lucas. Tankless, electric, and gas water heaters. Fast response for no-hot-water emergencies in Los Cabos. Call for same-day service."
        canonicalUrl="/water-heater-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Licensed Plumbers · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Water Heater Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Fast water heater installation, replacement, and repair throughout Los Cabos. No hot water? Our plumbers respond quickly for emergency service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-orange-800/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-800 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Water Heater Services</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                From standard tank water heaters to modern tankless systems, our licensed plumbers handle all hot water heater work in Cabo San Lucas and the surrounding Los Cabos area. We service electric and gas units and can source replacement units locally.
              </p>
              <ul className="space-y-3">
                {[
                  'New water heater installation',
                  'Old water heater removal and replacement',
                  'Tankless water heater installation',
                  'Gas and electric water heater service',
                  'No hot water emergency repair',
                  'Leaking water heater repair',
                  'Pressure relief valve replacement',
                  'Sediment flush and maintenance',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-orange-500 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-orange-600" size={22} /> Why Cabos Handyman?
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {[
                    '20+ years experience in Los Cabos',
                    'Licensed & insured plumbers',
                    'Bilingual service (English & Spanish)',
                    'Same-day service available',
                    '1-year workmanship warranty',
                    'Property Care members: 24/7 priority',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="text-orange-500 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">How long does a water heater replacement take?</p>
                    <p>Most replacements take 3–5 hours including removal of the old unit and full installation of the new one.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can you source the new water heater?</p>
                    <p>Yes — we can supply and install the unit, or install one you've already purchased.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you work on vacation rentals?</p>
                    <p>Yes. We understand the urgency for Airbnb and VRBO properties — no hot water directly impacts guest reviews.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">No Hot Water? We Can Help.</h2>
          <p className="text-white/90 mb-6">Call for fast water heater service anywhere in Los Cabos — Cabo San Lucas, San José del Cabo, and the corridor.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/water-heater-cabo-san-lucas" />
      <Footer />
    </>
  );
}
