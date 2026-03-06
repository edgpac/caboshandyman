import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function SinkInstallationCabo() {
  return (
    <>
      <SEO
        title="Sink Installation Cabo San Lucas | Kitchen & Bathroom Sink Replacement | Cabos Handyman"
        description="Professional sink installation and replacement in Cabo San Lucas. Kitchen sinks, bathroom sinks, undermount, drop-in, and vessel sinks. Licensed plumbers in Los Cabos."
        canonicalUrl="/sink-installation-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-cyan-600 to-teal-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Licensed Plumbers · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Sink Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Kitchen sink and bathroom sink installation, replacement, and repair throughout Los Cabos — undermount, drop-in, farmhouse, and vessel sinks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center justify-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-teal-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-900 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sink Services We Offer</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Whether you're upgrading a kitchen sink, replacing a cracked bathroom basin, or installing a new vessel sink, our licensed plumbers in Cabo San Lucas handle the full installation — plumbing connections, drain assembly, and cleanup included.
              </p>
              <ul className="space-y-3">
                {[
                  'Kitchen sink installation and replacement',
                  'Bathroom sink and basin installation',
                  'Undermount sink installation',
                  'Drop-in sink installation',
                  'Farmhouse / apron-front sink installation',
                  'Vessel sink installation',
                  'Sink drain and P-trap assembly',
                  'Sink unclogging and drain repair',
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
                    'All sink types and materials',
                    'Bilingual service (English & Spanish)',
                    '1-year workmanship warranty',
                    'Same-day service available',
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
                    <p className="font-semibold">How long does sink installation take?</p>
                    <p>Most sink replacements take 2–4 hours. Undermount installations that require countertop cuts may take longer.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can I supply my own sink?</p>
                    <p>Yes — we'll install a sink you provide, or help you source one from local suppliers in Cabo San Lucas.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you connect the plumbing too?</p>
                    <p>Yes — installation includes all drain, supply line, and P-trap connections. Full plumbing hookup included.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Need a Sink Installed or Replaced?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/sink-installation-cabo-san-lucas" />
      <Footer />
    </>
  );
}
