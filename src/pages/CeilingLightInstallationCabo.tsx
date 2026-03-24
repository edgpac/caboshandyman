import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Zap, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function CeilingLightInstallationCabo() {
  return (
    <>
      <SEO
        title="Ceiling Light Installation Cabo San Lucas | Cabos Handyman"
        description="Professional ceiling light installation in Cabo San Lucas. Recessed lighting, pendant lights, chandeliers, and LED fixture installation. Licensed electricians in Los Cabos."
        canonicalUrl="/ceiling-light-installation-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Zap size={18} />
            <span className="text-sm font-medium">Licensed Electricians · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Ceiling Light Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Recessed lighting, pendant lights, chandeliers, and LED fixtures — professionally installed by licensed electricians in Cabo San Lucas.
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Lighting Services We Offer</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Good lighting transforms any space. Our licensed electricians in Cabo San Lucas install all types of ceiling and overhead lighting — from simple fixture swaps to full recessed lighting layouts for kitchens, living rooms, and outdoor areas.
              </p>
              <ul className="space-y-3">
                {[
                  'Ceiling light fixture installation and replacement',
                  'Recessed (can) lighting installation',
                  'Pendant light installation',
                  'Chandelier installation',
                  'LED retrofit and upgrade',
                  'Under-cabinet lighting installation',
                  'Outdoor ceiling light installation',
                  'Dimmer switch installation',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-yellow-500 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-yellow-600" size={22} /> Why Cabos Handyman?
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {[
                    '20+ years experience in Los Cabos',
                    'Licensed & insured electricians',
                    'Safe wiring and code-compliant work',
                    'Bilingual service (English & Spanish)',
                    '1-year workmanship warranty',
                    'Serving Cabo, San José, and the corridor',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="text-yellow-500 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">Can you install a light where there isn't a junction box?</p>
                    <p>Yes — we can add new wiring and junction boxes to install lighting in new locations.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you install heavy chandeliers?</p>
                    <p>Yes — we properly brace and support heavy fixtures for safe installation in any ceiling type.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can I supply my own light fixture?</p>
                    <p>Absolutely — bring your own fixture and we'll install it, or let us source one locally.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Lighting?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on light installation anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/ceiling-light-installation-cabo-san-lucas" />
      <Footer />
    </>
  );
}
