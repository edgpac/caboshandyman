import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function PaintingCabo() {
  return (
    <>
      <SEO
        title="Painting Cabo San Lucas | Interior & Exterior Paint Touch-Ups | Cabos Handyman"
        description="Professional painting and paint touch-ups in Cabo San Lucas. Interior and exterior painting, vacation rental refresh, wall repairs and repainting. Painters serving Los Cabos."
        canonicalUrl="/painting-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-rose-500 to-pink-600 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Painting & Finishing · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Painting Services<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Interior touch-ups, full room painting, exterior walls, vacation rental refreshes, and stucco surface painting — professional painters serving all of Los Cabos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-rose-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-pink-800/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-pink-800 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Painting Services We Offer</h2>
              <p className="text-gray-600 mb-6">
                The Cabo San Lucas climate is tough on paint — intense sun, salt air, and humidity cause faster fading and peeling. We use paints suited for the local climate and provide clean, professional finishes on every surface.
              </p>
              <ul className="space-y-3">
                {[
                  'Interior paint touch-ups',
                  'Full room interior painting',
                  'Exterior wall painting',
                  'Vacation rental refresh painting',
                  'Wall repair and repainting (cracks, holes)',
                  'Accent wall painting',
                  'Ceiling painting',
                  'Stucco and concrete surface painting',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-rose-500 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-rose-600" size={22} /> Why Cabos Handyman?
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
                      <CheckCircle2 className="text-rose-500 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">Do you do paint touch-ups for vacation rentals?</p>
                    <p>Yes — quick touch-ups between guest stays are one of our most popular services for Airbnb and VRBO owners in Cabo San Lucas.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you supply the paint?</p>
                    <p>We can match existing colors and supply paint, or you can provide paint. Either way works.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can you paint concrete and stucco walls?</p>
                    <p>Yes — most exterior walls in Los Cabos are concrete or stucco and we use the right primers and paints for the local climate.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Freshen Up Your Space?</h2>
          <p className="text-white/90 mb-6">Call for a free painting estimate anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices current="/painting-cabo-san-lucas" />
      <Footer />
    </>
  );
}
