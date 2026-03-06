import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function CommercialSinkCabo() {
  return (
    <>
      <SEO
        title="Commercial Sink Installation Cabo San Lucas | Restaurant & Office Sinks | Cabos Handyman"
        description="Professional commercial sink installation in Cabo San Lucas. Restaurant kitchen sinks, three-compartment sinks, hand wash stations, and commercial plumbing. Licensed plumbers in Los Cabos."
        canonicalUrl="/commercial-sink-installation-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-zinc-600 to-gray-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Commercial Plumbing · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Commercial Sink Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Three-compartment sinks, hand wash stations, restaurant kitchen sinks, and commercial plumbing — installed by licensed plumbers serving businesses in Los Cabos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-zinc-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-gray-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-900 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Commercial Sink Services</h2>
              <p className="text-gray-600 mb-6">
                Commercial kitchens, restaurants, and food service operations in Cabo San Lucas require properly installed sinks that meet health code requirements. Our licensed plumbers handle commercial sink installation from connection to inspection.
              </p>
              <ul className="space-y-3">
                {[
                  'Three-compartment restaurant sink installation',
                  'Hand wash station installation',
                  'Commercial kitchen sink installation',
                  'Prep sink installation',
                  'Bar sink and drain installation',
                  'Utility sink installation',
                  'Commercial faucet and pre-rinse sprayer installation',
                  'Grease trap connection',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-zinc-500 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-zinc-600" size={22} /> Why Cabos Handyman?
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
                      <CheckCircle2 className="text-zinc-500 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">Do you install three-compartment sinks for restaurants?</p>
                    <p>Yes — three-compartment sinks are required by health code in food service operations. We install and connect them to drain and supply lines.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can you source commercial sink equipment?</p>
                    <p>We can help source commercial plumbing equipment from suppliers in Los Cabos, or install equipment you've already purchased.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you do commercial plumbing work?</p>
                    <p>Yes — in addition to residential work, we handle commercial plumbing for restaurants, offices, and retail spaces in Cabo San Lucas.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Need Commercial Sinks Installed?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on commercial sink installation anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/commercial-sink-installation-cabo-san-lucas" />
      <Footer />
    </>
  );
}
