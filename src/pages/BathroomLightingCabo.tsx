import { lazy } from 'react';
import SEO from '@/components/SEO';
import { CheckCircle2, Zap, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';
const Footer = lazy(() => import('@/components/Footer'));

export default function BathroomLightingCabo() {
  return (
    <>
      <SEO title="Bathroom Lighting Installation Cabo San Lucas | Vanity Lights | Cabos Handyman" description="Professional bathroom lighting installation in Cabo San Lucas. Vanity lights, exhaust fan lights, recessed bathroom lighting, and GFCI-protected fixtures. Licensed electricians in Los Cabos." canonicalUrl="/bathroom-lighting-cabo-san-lucas" geoRegion="MX-BCS" geoPlacename="Cabo San Lucas" geoPosition="22.8866974;-109.9139710" />
      <Navigation />
      <section className="py-20 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6"><Zap size={18} /><span className="text-sm font-medium">Licensed Electricians · Cabo San Lucas</span></div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Bathroom Lighting Installation<br />Cabo San Lucas</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Vanity lights, recessed bathroom lighting, exhaust fan lights, and GFCI-protected fixtures installed by licensed electricians in Los Cabos.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"><Phone size={20} /> Call +52 612 169 8328</a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-blue-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-900 transition-colors">Schedule Service <ArrowRight size={20} /></a>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Bathroom Lighting Services</h2>
              <p className="text-gray-600 mb-6">Good bathroom lighting is essential for safety and comfort. Our licensed electricians install all types of bathroom lighting safely and to code in Cabo San Lucas.</p>
              <ul className="space-y-3">{['Vanity light bar installation','Mirror light installation','Recessed shower lighting','Exhaust fan with light installation','GFCI-protected fixture installation','Sconce installation','Dimmer switch for bathroom lighting','Old fixture replacement'].map(item => (<li key={item} className="flex items-start gap-3"><CheckCircle2 className="text-blue-500 mt-0.5 shrink-0" size={20} /><span className="text-gray-700">{item}</span></li>))}</ul>
            </div>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2"><Shield className="text-blue-600" size={22} /> Why Cabos Handyman?</h3>
                <ul className="space-y-2 text-gray-700">{['20+ years experience in Los Cabos','Licensed & insured electricians','GFCI-safe bathroom wiring','Bilingual service (English & Spanish)','1-year workmanship warranty','Same-day service available'].map(item => (<li key={item} className="flex items-center gap-2"><CheckCircle2 className="text-blue-500 shrink-0" size={16} />{item}</li>))}</ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div><p className="font-semibold">Is GFCI protection required in bathrooms?</p><p>Yes — all bathroom fixtures near water require GFCI protection. We install and test GFCI circuits on every bathroom job.</p></div>
                  <div><p className="font-semibold">Can you install a light over the mirror?</p><p>Yes — vanity lights and mirror lights are among our most common bathroom electrical installs in Cabo San Lucas.</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Need Bathroom Lighting Installed?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"><Phone size={22} /> +52 612 169 8328</a>
        </div>
      </section>
      <RelatedServices current="/bathroom-lighting-cabo-san-lucas" />
      <Footer />
    </>
  );
}
