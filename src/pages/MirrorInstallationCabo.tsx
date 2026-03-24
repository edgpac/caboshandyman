import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function MirrorInstallationCabo() {
  return (
    <>
      <SEO
        title="Mirror Installation Cabo San Lucas | Cabos Handyman"
        description="Professional mirror installation and hanging in Cabo San Lucas. Bathroom mirrors, decorative mirrors, framed mirrors, and large wall mirrors. Secure mounting in tile and concrete walls."
        canonicalUrl="/mirror-installation-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-slate-500 to-gray-600 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Home Improvement · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Mirror Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Bathroom mirrors, large decorative mirrors, framed mirrors, and medicine cabinets — hung level and secure in tile, concrete, and stucco walls.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-gray-800/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Mirror Installation Services</h2>
              <p className="text-gray-600 mb-6">
                A mirror that falls off the wall is a safety hazard. We use the right hardware for every wall type — concrete, tile, or drywall — so your mirror stays level and secure for years.
              </p>
              <ul className="space-y-3">
                {[
                  'Bathroom mirror installation and hanging',
                  'Large decorative mirror mounting',
                  'Framed mirror installation',
                  'Medicine cabinet installation',
                  'Vanity mirror installation',
                  'TV mirror (smart mirror) installation',
                  'Mirror removal and replacement',
                  'Secure concrete and tile wall mounting',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-slate-500 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-slate-600" size={22} /> Why Cabos Handyman?
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
                      <CheckCircle2 className="text-slate-500 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">Can you hang a large heavy mirror?</p>
                    <p>Yes — we use proper wall anchors and French cleats for large heavy mirrors, ensuring a secure and level mount.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can mirrors be mounted in concrete walls?</p>
                    <p>Absolutely — most walls in Cabo San Lucas are concrete block, and we use the right anchors for a permanent hold.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you handle mirrors over 6 feet?</p>
                    <p>Yes — we have experience with oversized mirrors and bring a second person when needed for safe installation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Need a Mirror Installed?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on mirror installation anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/mirror-installation-cabo-san-lucas" />
      <Footer />
    </>
  );
}
