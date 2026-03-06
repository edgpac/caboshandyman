import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function BoothInstallationCabo() {
  return (
    <>
      <SEO
        title="Booth Installation Cabo San Lucas | Restaurant Booth Seating | Cabos Handyman"
        description="Professional booth installation in Cabo San Lucas. Restaurant booth seating, banquette seating, and custom dining area furniture installation. Commercial services in Los Cabos."
        canonicalUrl="/booth-installation-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-amber-600 to-orange-600 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Commercial Installation · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Booth Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Restaurant booth seating, banquette seating, and custom dining area installation — assembled and anchored securely to concrete floors throughout Los Cabos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-orange-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-900 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Booth Installation Services</h2>
              <p className="text-gray-600 mb-6">
                Whether you're opening a new restaurant in Cabo San Lucas or renovating your dining space, we handle the complete installation of booth seating — from assembly to final anchoring in concrete floors.
              </p>
              <ul className="space-y-3">
                {[
                  'Restaurant booth seating installation',
                  'Banquette seating installation',
                  'Custom booth assembly and anchoring',
                  'Back-to-back booth installation',
                  'L-shaped and corner booth installation',
                  'Booth upholstery coordination',
                  'Wall mounting and securing',
                  'Booth base anchoring to concrete floors',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-amber-500 mt-0.5 shrink-0" size={20} />
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
                    <p className="font-semibold">Do you install booths in concrete floors?</p>
                    <p>Yes — most commercial floors in Cabo San Lucas are concrete. We anchor booth bases securely using the correct fasteners.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can you assemble and install custom booths?</p>
                    <p>Yes — we work with delivered flat-pack or pre-built booth units and handle assembly, placement, and anchoring.</p>
                  </div>
                  <div>
                    <p className="font-semibold">How long does booth installation take?</p>
                    <p>A set of 4–6 booths typically takes 4–8 hours depending on complexity and anchoring requirements.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Set Up Your Dining Space?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate on booth installation anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/booth-installation-cabo-san-lucas" />
      <Footer />
    </>
  );
}
