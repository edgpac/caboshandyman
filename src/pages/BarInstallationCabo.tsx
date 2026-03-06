import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function BarInstallationCabo() {
  return (
    <>
      <SEO
        title="Bar Installation Cabo San Lucas | Home Bar & Restaurant Bar | Cabos Handyman"
        description="Professional bar installation in Cabo San Lucas. Home bars, restaurant bars, outdoor palapa bars, and bar counter installation. Custom bar buildouts serving Los Cabos."
        canonicalUrl="/bar-installation-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-amber-700 to-yellow-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Custom Installation · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Bar Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Home bars, restaurant bars, outdoor palapa bars, and bar counters — custom bar buildouts combining carpentry, plumbing, and electrical in Los Cabos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-yellow-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-900 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Bar Installation Services</h2>
              <p className="text-gray-600 mb-6">
                From indoor home bars to outdoor palapa bars on the beach, we handle all aspects of bar installation in Cabo San Lucas — countertop work, cabinetry, sink plumbing, and bar lighting in one coordinated project.
              </p>
              <ul className="space-y-3">
                {[
                  'Restaurant bar counter installation',
                  'Home bar installation',
                  'Outdoor bar and palapa bar installation',
                  'Bar cabinet and shelving installation',
                  'Bar sink and plumbing connection',
                  'Bar lighting installation',
                  'Back bar display and shelf installation',
                  'Bar stool mounting and installation',
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
                    'Licensed & insured',
                    'Bilingual service (English & Spanish)',
                    '1-year workmanship warranty',
                    'Same-day service available',
                    'Serving all of Los Cabos',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="text-amber-500 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">Can you build a bar from scratch?</p>
                    <p>We handle bar assembly and installation — combining carpentry, plumbing, and electrical. We work with your design or help develop one.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you install outdoor bars in Cabo?</p>
                    <p>Yes — outdoor palapa bars are very popular in Los Cabos and we specialize in outdoor installations that withstand the coastal climate.</p>
                  </div>
                  <div>
                    <p className="font-semibold">How long does bar installation take?</p>
                    <p>A typical bar installation takes 1–2 days depending on complexity, plumbing requirements, and whether electrical is involved.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Bar?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on bar installation anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/bar-installation-cabo-san-lucas" />
      <Footer />
    </>
  );
}
