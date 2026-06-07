import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Wrench, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

export default function FlooringCabo() {
  return (
    <>
      <SEO
        title="Flooring Installation Cabo San Lucas | Cabos Handyman"
        description="Professional flooring installation in Cabo San Lucas. Tile, ceramic, porcelain, vinyl, hardwood, and laminate flooring. Priced by square meter. Licensed flooring contractors serving all of Los Cabos."
        canonicalUrl="/flooring-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-amber-600 to-orange-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Flooring Installation · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Flooring Installation<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Tile, ceramic, porcelain, vinyl plank, and laminate flooring — installed by experienced craftsmen across all of Los Cabos. Priced by the square meter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-orange-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-900 transition-colors">
              Get a Free Quote <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Flooring Services We Offer</h2>
              <p className="text-gray-600 mb-6">
                From tile and porcelain to vinyl plank and laminate — we install all types of flooring in kitchens, bathrooms, bedrooms, terraces, and commercial spaces across Los Cabos.
              </p>
              <ul className="space-y-3">
                {[
                  'Ceramic and porcelain tile installation',
                  'Large-format tile (60×60, 80×80, 120×60)',
                  'Vinyl plank (LVP) and luxury vinyl tile',
                  'Laminate flooring installation',
                  'Terrace and outdoor tile installation',
                  'Bathroom and shower floor tile',
                  'Kitchen floor tile installation',
                  'Grout repair and re-grouting',
                  'Old flooring removal and disposal',
                  'Subfloor preparation and leveling',
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
                    'Material sourcing assistance',
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
                    <p className="font-semibold">Do you supply the tiles?</p>
                    <p>We can help you source materials locally or work with tiles you already have. We'll advise on quantity, quality, and what works best for the local climate.</p>
                  </div>
                  <div>
                    <p className="font-semibold">How long does flooring installation take?</p>
                    <p>A typical room (20–30 m²) takes 1–2 days including prep, setting, and grouting. Larger areas or complex patterns take longer.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can you remove existing flooring first?</p>
                    <p>Yes — we handle old tile or flooring removal, subfloor prep, and leveling before installing the new surface.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Flooring Pricing Guide</h2>
          <p className="text-gray-500 text-center mb-10">Labor rates per m² — material cost not included. Final price depends on pattern complexity, subfloor condition, and tile size.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Standard Tile", from: "$22", unit: "per m² labor", note: "Ceramic / porcelain up to 60×60", color: "border-amber-300" },
              { label: "Large Format Tile", from: "$30", unit: "per m² labor", note: "80×80, 120×60, rectified edges", color: "border-orange-300" },
              { label: "Vinyl Plank (LVP)", from: "$18", unit: "per m² labor", note: "Click-lock or glue-down install", color: "border-yellow-300" },
              { label: "Old Floor Removal", from: "$10", unit: "per m²", note: "Demo, haul-away, subfloor prep", color: "border-red-300" },
            ].map(({ label, from, unit, note, color }) => (
              <div key={label} className={`bg-white rounded-xl border-2 ${color} p-6 text-center shadow-sm`}>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{label}</p>
                <p className="text-4xl font-bold text-gray-900">{from}</p>
                <p className="text-sm text-gray-500 mb-3">{unit}</p>
                <p className="text-xs text-gray-400">{note}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">All prices in USD. Minimum job applies. <a href="/contact" className="text-amber-600 font-semibold hover:underline">Get a free estimate →</a></p>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Floors?</h2>
          <p className="text-white/90 mb-6">Call for a free flooring estimate anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices currentPath="/flooring-cabo-san-lucas" />
      <Footer />
    </>
  );
}
