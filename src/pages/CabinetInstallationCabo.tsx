import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function CabinetInstallationCabo() {
  return (
    <>
      <SEO
        title="Cabinet Installation Cabo San Lucas | Cabos Handyman"
        description="Professional cabinet installation in Cabo San Lucas. Kitchen cabinets, bathroom vanities, built-in storage, and shelving. Licensed carpenters serving Los Cabos."
        canonicalUrl="/cabinet-installation-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
        noindex={true}
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-green-700 to-teal-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Carpentry & Installation · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Cabinet Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Kitchen cabinets, bathroom vanities, built-in shelving, and custom storage solutions installed by experienced carpenters in Cabo San Lucas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-green-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-900 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cabinet Services We Offer</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                New kitchen or bathroom? Upgrading your storage? Our experienced carpenters install wall cabinets, base cabinets, vanities, and built-in shelving throughout Cabo San Lucas. We work with flat-pack, custom, and pre-assembled cabinets.
              </p>
              <ul className="space-y-3">
                {[
                  'Kitchen cabinet installation (wall and base)',
                  'Bathroom vanity installation',
                  'Laundry room cabinet installation',
                  'Built-in shelving and storage',
                  'Cabinet hardware installation (handles, hinges)',
                  'IKEA and flat-pack cabinet assembly',
                  'Old cabinet removal and disposal',
                  'Cabinet door and drawer repair',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-600 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-green-700" size={22} /> Why Cabos Handyman?
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {[
                    '20+ years experience in Los Cabos',
                    'Experienced carpenters on every job',
                    'Flat-pack, custom, and pre-built cabinets',
                    'Bilingual service (English & Spanish)',
                    '1-year workmanship warranty',
                    'Vacation rental and condo specialists',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-600 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">Do you install IKEA cabinets?</p>
                    <p>Yes — we're experienced with IKEA and other flat-pack cabinet systems, including SEKTION and PAX series.</p>
                  </div>
                  <div>
                    <p className="font-semibold">How long does kitchen cabinet installation take?</p>
                    <p>A typical kitchen cabinet installation takes 1–2 days depending on the number of cabinets and complexity.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can you remove and dispose of old cabinets?</p>
                    <p>Yes — we handle old cabinet removal and disposal before installing the new ones.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Install New Cabinets?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on cabinet installation in Cabo San Lucas or anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/cabinet-installation-cabo-san-lucas" />
      <Footer />
    </>
  );
}
