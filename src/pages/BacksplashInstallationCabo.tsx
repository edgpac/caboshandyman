import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function BacksplashInstallationCabo() {
  return (
    <>
      <SEO
        title="Backsplash Installation Cabo San Lucas | Kitchen Backsplash Tile | Cabos Handyman"
        description="Professional kitchen backsplash installation in Cabo San Lucas. Subway tile, mosaic, talavera, and stone backsplash. Licensed tile installers serving Los Cabos."
        canonicalUrl="/backsplash-installation-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Tile Installers · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Backsplash Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Kitchen backsplash installation using subway tile, mosaic, talavera, stone, and more. Professional tile work throughout Los Cabos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-emerald-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-900 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Backsplash Services We Offer</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                A backsplash protects your kitchen walls and defines the look of the entire space. Our tile installers in Cabo San Lucas work with all styles — from classic white subway tile to handmade Mexican talavera — including outlet cutouts, edge finishing, and grouting.
              </p>
              <ul className="space-y-3">
                {[
                  'Subway tile backsplash installation',
                  'Mosaic and glass tile backsplash',
                  'Mexican talavera backsplash',
                  'Natural stone backsplash',
                  'Peel-and-stick tile installation',
                  'Outlet and switch cutouts in tile',
                  'Old backsplash removal',
                  'Grout sealing and finishing',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-emerald-600 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-emerald-600" size={22} /> Why Cabos Handyman?
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {[
                    '20+ years experience in Los Cabos',
                    'Expert with talavera and local tile styles',
                    'Clean, precise cuts and grouting',
                    'Bilingual service (English & Spanish)',
                    '1-year workmanship warranty',
                    'Can source tile from local suppliers',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="text-emerald-600 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">Can I supply my own tile?</p>
                    <p>Yes — we install any tile you bring, or we can help source material from local tile shops in Cabo San Lucas.</p>
                  </div>
                  <div>
                    <p className="font-semibold">How long does backsplash installation take?</p>
                    <p>A typical kitchen backsplash takes 1–2 days — one day to set tile and one day to grout and seal after it cures.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you remove the old backsplash?</p>
                    <p>Yes — we handle old backsplash removal, wall prep, and installation of the new tile.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Install a Backsplash?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on backsplash installation anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/backsplash-installation-cabo-san-lucas" />
      <Footer />
    </>
  );
}
