import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function FaucetInstallationCabo() {
  return (
    <>
      <SEO
        title="Faucet Installation Cabo San Lucas | Faucet Replacement & Repair | Cabos Handyman"
        description="Professional faucet installation and replacement in Cabo San Lucas. Kitchen faucets, bathroom faucets, shower heads, and outdoor faucets. Licensed plumbers in Los Cabos."
        canonicalUrl="/faucet-installation-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-cyan-500 to-teal-600 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Licensed Plumbers · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Faucet Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Kitchen faucets, bathroom faucets, outdoor spigots, and shower heads — installed or replaced by licensed plumbers in Cabo San Lucas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center justify-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-teal-800/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-800 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Faucet Services We Offer</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                A dripping faucet wastes water and money. Whether you're upgrading a kitchen faucet, replacing a bathroom fixture, or dealing with low water pressure, our licensed plumbers handle all faucet work quickly and correctly in Cabo San Lucas.
              </p>
              <ul className="space-y-3">
                {[
                  'Kitchen faucet installation and replacement',
                  'Bathroom faucet installation',
                  'Shower head and valve replacement',
                  'Outdoor spigot installation',
                  'Dripping faucet repair',
                  'Low water pressure diagnosis and fix',
                  'Faucet handle and cartridge replacement',
                  'Pull-down and pull-out faucet installation',
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
                    'Same-day appointments available',
                    '1-year workmanship warranty',
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
                    <p className="font-semibold">Can I supply my own faucet?</p>
                    <p>Yes — we'll install any faucet you provide, or we can source one for you from local suppliers.</p>
                  </div>
                  <div>
                    <p className="font-semibold">How long does faucet installation take?</p>
                    <p>Most faucet replacements take 1–2 hours. Complex setups with new supply lines may take a bit longer.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you fix dripping faucets?</p>
                    <p>Yes — we repair or replace leaky faucets and diagnose the cause to prevent it from happening again.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Faucet?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on faucet installation anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/faucet-installation-cabo-san-lucas" />
      <Footer />
    </>
  );
}
