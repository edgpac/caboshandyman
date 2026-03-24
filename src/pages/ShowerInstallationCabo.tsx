import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function ShowerInstallationCabo() {
  return (
    <>
      <SEO
        title="Shower Installation Cabo San Lucas | Cabos Handyman"
        description="Professional shower installation and replacement in Cabo San Lucas. Walk-in showers, shower tile, shower valves, and shower heads. Licensed plumbers serving Los Cabos."
        canonicalUrl="/shower-installation-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Licensed Plumbers · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Shower Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Walk-in showers, shower tile, plumbing, and fixtures — professional shower installation and replacement throughout Los Cabos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-blue-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-900 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Shower Services We Offer</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                From a simple shower head replacement to a full walk-in shower buildout, our licensed plumbers and tile installers in Cabo San Lucas handle every aspect of shower installation. We include proper waterproofing on all shower work.
              </p>
              <ul className="space-y-3">
                {[
                  'Walk-in shower installation',
                  'Shower tile installation with waterproofing',
                  'Shower valve and faucet replacement',
                  'Rain shower head installation',
                  'Shower drain installation and clearing',
                  'Shower door and enclosure installation',
                  'Tub-to-shower conversion',
                  'Shower leak repair and resealing',
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
                    'Licensed plumbers and tile installers',
                    'Waterproofing included on all shower work',
                    'Bilingual service (English & Spanish)',
                    '1-year workmanship warranty',
                    'Vacation rental and residential experts',
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
                    <p className="font-semibold">How long does shower installation take?</p>
                    <p>A full walk-in shower buildout including plumbing, tile, and fixtures typically takes 3–5 days. Shower head or valve replacements take 1–2 hours.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Is waterproofing included?</p>
                    <p>Yes — all shower tile work includes proper waterproof membrane installation to prevent leaks and water damage.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can you convert a tub to a walk-in shower?</p>
                    <p>Yes — tub-to-shower conversions are one of our most popular bathroom upgrades in Cabo San Lucas.</p>
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
          <p className="text-white/90 mb-6">Call for a free estimate on shower installation anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/shower-installation-cabo-san-lucas" />
      <Footer />
    </>
  );
}
