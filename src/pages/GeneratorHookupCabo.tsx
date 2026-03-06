import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Zap, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function GeneratorHookupCabo() {
  return (
    <>
      <SEO
        title="Generator Hookup Cabo San Lucas | Generator Transfer Switch | Cabos Handyman"
        description="Generator hookup and transfer switch installation in Cabo San Lucas. Connect your portable generator to your electrical panel when CFE power goes out. Licensed electricians in Los Cabos."
        canonicalUrl="/generator-hookup-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Zap size={18} />
            <span className="text-sm font-medium">Licensed Electricians · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Generator Hookup<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Connect your portable generator to your electrical panel safely with a transfer switch or interlock kit — installed by licensed electricians in Los Cabos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-orange-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-red-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-900 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Generator Hookup Services</h2>
              <p className="text-gray-600 mb-6">
                CFE power outages are common in Los Cabos, especially during hurricane season. A proper generator hookup lets you power your home safely through any outage — without the danger of back-feed or illegal connections.
              </p>
              <ul className="space-y-3">
                {[
                  'Generator inlet box installation (220V exterior plug)',
                  'Manual transfer switch installation',
                  'Interlock kit installation on electrical panel',
                  'Portable generator connection setup',
                  'Whole-house generator hookup assessment',
                  'Generator wiring and circuit configuration',
                  'Generator to panel cable and cord setup',
                  'CFE outage preparedness consultation',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-orange-500 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-orange-600" size={22} /> Why Cabos Handyman?
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
                      <CheckCircle2 className="text-orange-500 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">What is a generator hookup in Mexico?</p>
                    <p>It's a 220V inlet installed on the outside of your home connected to your panel with a transfer switch or interlock. When CFE goes out, you plug in your portable generator and power your home safely.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Is it safe to connect a generator to my panel?</p>
                    <p>Only when done correctly with a transfer switch or interlock kit — this prevents back-feed that could injure CFE workers. We install it properly and safely.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can I power my whole house with a generator hookup?</p>
                    <p>Depends on your generator's capacity. We assess your panel and help you prioritize essential circuits like water pump, refrigerator, and AC.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Stop Worrying About CFE Outages?</h2>
          <p className="text-white/90 mb-6">Install a generator hookup so you're always ready when CFE power goes out. Call for a free estimate.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/generator-hookup-cabo-san-lucas" />
      <Footer />
    </>
  );
}
