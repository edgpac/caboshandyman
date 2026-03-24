import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function WindowRepairCabo() {
  return (
    <>
      <SEO
        title="Window Repair Cabo San Lucas | Cabos Handyman"
        description="Professional window repair in Cabo San Lucas. Broken window screens, stuck windows, window frame repair, and window hardware replacement. Handyman serving all of Los Cabos."
        canonicalUrl="/window-repair-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-sky-500 to-blue-600 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Home Repair · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Window Repair<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Broken screens, stuck windows, frame repairs, and hardware replacement — professional window repair for all window types throughout Los Cabos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-sky-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-blue-800/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Window Repair Services</h2>
              <p className="text-gray-600 mb-6">
                Damaged windows let in insects, moisture, and heat — major issues in the Cabo San Lucas climate. We repair all window types common in Los Cabos, from jalousie to sliding windows, quickly and affordably.
              </p>
              <ul className="space-y-3">
                {[
                  'Window screen repair and replacement',
                  'Stuck or difficult window repair',
                  'Window latch and lock repair',
                  'Window frame repair and sealing',
                  'Sliding window track repair',
                  'Jalousie (louver) window repair',
                  'Window caulking and weatherstripping',
                  'Hurricane damage window assessment',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-sky-500 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-sky-600" size={22} /> Why Cabos Handyman?
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
                      <CheckCircle2 className="text-sky-500 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">Can you repair screens on all window types?</p>
                    <p>Yes — we repair and replace screens on sliding, casement, jalousie, and fixed windows common in Cabo San Lucas.</p>
                  </div>
                  <div>
                    <p className="font-semibold">How long does window repair take?</p>
                    <p>Screen replacement takes 30–60 minutes per window. Frame or hardware repairs take 1–3 hours depending on complexity.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you repair windows after hurricane damage?</p>
                    <p>Yes — post-storm window assessment and repair is one of our services in Cabo San Lucas.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Need a Window Repaired?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on window repair anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/window-repair-cabo-san-lucas" />
      <Footer />
    </>
  );
}
