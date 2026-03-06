import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Zap, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function OfficeLightingCabo() {
  return (
    <>
      <SEO
        title="Office Lighting Installation Cabo San Lucas | Commercial Lighting | Cabos Handyman"
        description="Professional office and commercial lighting installation in Cabo San Lucas. LED panel lights, track lighting, task lighting, and office lighting upgrades. Licensed electricians in Los Cabos."
        canonicalUrl="/office-lighting-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Zap size={18} />
            <span className="text-sm font-medium">Licensed Electricians · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Office Lighting Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            LED panels, track lighting, task lighting, and full office lighting upgrades — installed by licensed electricians serving businesses throughout Los Cabos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-orange-800/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-800 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Office Lighting Services</h2>
              <p className="text-gray-600 mb-6">
                Good lighting improves productivity and creates a professional environment. We handle complete office lighting installations for businesses of all sizes in Cabo San Lucas, from small offices to large commercial spaces.
              </p>
              <ul className="space-y-3">
                {[
                  'LED panel light installation',
                  'Track lighting installation',
                  'Task lighting installation',
                  'Conference room lighting',
                  'Fluorescent to LED conversion',
                  'Office reception area lighting',
                  'Commercial lighting layout and design',
                  'Dimmer and smart switch installation',
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
                    'Licensed & insured',
                    'Bilingual service (English & Spanish)',
                    '1-year workmanship warranty',
                    'Same-day service available',
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
                    <p className="font-semibold">Can you do a full office lighting installation?</p>
                    <p>Yes — we handle complete office lighting from layout planning to final installation, including LED fixtures and wiring.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you convert fluorescent to LED?</p>
                    <p>Yes — LED conversions save energy and improve light quality. We handle the full retrofit including fixture and ballast removal.</p>
                  </div>
                  <div>
                    <p className="font-semibold">How long does office lighting installation take?</p>
                    <p>A small office takes 1 day. Larger commercial spaces may take 2–3 days depending on the number of fixtures.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Office Lighting?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on office and commercial lighting installation in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/office-lighting-cabo-san-lucas" />
      <Footer />
    </>
  );
}
