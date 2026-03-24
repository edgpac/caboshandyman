import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function TileInstallationCabo() {
  return (
    <>
      <SEO
        title="Tile Installation Cabo San Lucas | Floor, Wall & Backsplash | Cabos Handyman"
        description="Professional tile installation in Cabo San Lucas. Bathroom tile, kitchen backsplash, floor tile, shower tile, and grout repair. Licensed tile installers in Los Cabos."
        canonicalUrl="/tile-installation-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-stone-600 to-amber-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Professional Tile Installers · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Tile Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Bathroom tile, kitchen backsplash, floor tile, shower tile, and grout repair — professional installation throughout Los Cabos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center justify-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-amber-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-900 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tile Work We Do</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Quality tile work transforms a bathroom, kitchen, or outdoor space. Our experienced tile installers in Cabo San Lucas work with ceramic, porcelain, travertine, talavera, and natural stone — providing precision installation that lasts.
              </p>
              <ul className="space-y-3">
                {[
                  'Bathroom floor and wall tile installation',
                  'Kitchen backsplash installation',
                  'Shower tile installation and waterproofing',
                  'Outdoor terrace and patio tile',
                  'Floor tile installation (any room)',
                  'Grout repair and replacement',
                  'Cracked tile replacement',
                  'Talavera and decorative tile work',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-amber-600 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-amber-600" size={22} /> Why Cabos Handyman?
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {[
                    '20+ years experience in Los Cabos',
                    'Works with all tile types and materials',
                    'Proper substrate prep and waterproofing',
                    'Bilingual service (English & Spanish)',
                    '1-year workmanship warranty',
                    'Vacation rental and residential specialists',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="text-amber-600 shrink-0" size={16} />
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
                    <p>Yes — we install tile you provide, or we can help source materials from local suppliers in Cabo.</p>
                  </div>
                  <div>
                    <p className="font-semibold">How long does tile installation take?</p>
                    <p>It depends on the area size. A bathroom backsplash is typically 1 day; full bathroom floors and walls may take 2–4 days including setting and grouting time.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you handle shower waterproofing?</p>
                    <p>Yes — proper waterproofing is included in all shower tile work to prevent leaks and water damage.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Tile Your Space?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on tile installation anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/tile-installation-cabo-san-lucas" />
      <Footer />
    </>
  );
}
