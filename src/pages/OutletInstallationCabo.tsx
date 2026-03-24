import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Zap, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function OutletInstallationCabo() {
  return (
    <>
      <SEO
        title="Outlet Installation Cabo San Lucas | Cabos Handyman"
        description="Licensed electricians for outlet installation in Cabo San Lucas. GFCI outlets, USB outlets, 220V outlets, and outlet replacement. Safe and code-compliant electrical work in Los Cabos."
        canonicalUrl="/outlet-installation-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-yellow-500 to-amber-600 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Zap size={18} />
            <span className="text-sm font-medium">Licensed Electricians · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Outlet Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            GFCI outlets, standard outlets, USB outlets, 220V appliance outlets — installed safely by licensed electricians in Cabo San Lucas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center justify-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-amber-800/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-800 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Outlet Services We Offer</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Whether you need a new outlet added, an old one replaced, or GFCI protection installed in your kitchen or bathroom, our licensed electricians in Cabo San Lucas handle all electrical outlet work safely and to code.
              </p>
              <ul className="space-y-3">
                {[
                  'New electrical outlet installation',
                  'GFCI outlet installation (kitchen, bathroom, outdoor)',
                  'USB outlet installation',
                  '220V / 240V appliance outlet installation',
                  'Dead outlet diagnosis and repair',
                  'Outlet replacement (worn or damaged)',
                  'Outdoor weatherproof outlet installation',
                  'Outlet cover plate replacement',
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
                    'Code-compliant electrical work',
                    'Bilingual service (English & Spanish)',
                    '1-year workmanship warranty',
                    'Serving all of Los Cabos',
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
                    <p className="font-semibold">Do I need GFCI outlets in my bathroom or kitchen?</p>
                    <p>Yes — GFCI protection is required near water sources. We install and test GFCI outlets to keep your home safe.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can you add a new outlet where there isn't one?</p>
                    <p>Yes — we can run new wiring to install an outlet in any location, pulling from your existing panel.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Is electrical work safe in Mexico?</p>
                    <p>We are licensed and familiar with local electrical codes in Baja California Sur, ensuring all work is safe and compliant.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Need an Outlet Installed?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on outlet installation anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/outlet-installation-cabo-san-lucas" />
      <Footer />
    </>
  );
}
