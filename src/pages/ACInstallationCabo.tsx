import { lazy, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import SEO from '@/components/SEO';
import { CheckCircle2, Wind, Phone, ArrowRight, Shield, X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RelatedServices from '../components/RelatedServices';

const Footer = lazy(() => import('@/components/Footer'));

type WorkPhoto = {
  file: string;
  alt: string;
  caption: string;
  tag: 'Diagnosis' | 'Installation' | 'Maintenance' | 'Finished';
};

const WORK_PHOTOS: WorkPhoto[] = [
  {
    file: 'ac-01-gauge-check.webp',
    alt: 'Cabos Handyman technicians checking refrigerant pressure with a gauge manifold on an outdoor Carrier condenser in Cabo San Lucas',
    caption: 'Checking refrigerant charge with a gauge manifold',
    tag: 'Diagnosis',
  },
  {
    file: 'ac-02-charging-lines.webp',
    alt: 'Two Cabos Handyman technicians charging refrigerant lines on a Carrier outdoor AC condenser unit in Cabo San Lucas',
    caption: 'Charging the refrigerant lines',
    tag: 'Installation',
  },
  {
    file: 'ac-03-electrical-check.webp',
    alt: 'Cabos Handyman technician checking the electrical control panel of an outdoor AC condenser unit in Cabo San Lucas',
    caption: 'Checking the electrical control panel',
    tag: 'Maintenance',
  },
  {
    file: 'ac-04-rooftop-dual-units.webp',
    alt: 'Cabos Handyman technician servicing two Carrier outdoor condenser units on a rooftop in Cabo San Lucas with ocean view',
    caption: 'Dual condenser setup on a rooftop install',
    tag: 'Installation',
  },
  {
    file: 'ac-05-lg-unit-mounting.webp',
    alt: 'Cabos Handyman technician mounting an LG outdoor AC condenser unit on a patio in Cabo San Lucas',
    caption: 'Mounting an LG condenser unit',
    tag: 'Installation',
  },
  {
    file: 'ac-06-indoor-unit-carry.webp',
    alt: 'Two Cabos Handyman technicians positioning an indoor mini-split AC unit onto its wall bracket in Cabo San Lucas',
    caption: 'Positioning the indoor unit onto the wall bracket',
    tag: 'Installation',
  },
  {
    file: 'ac-07-indoor-wiring.webp',
    alt: 'Cabos Handyman technician wiring an indoor mini-split AC unit on a ladder in Cabo San Lucas',
    caption: 'Wiring the indoor unit',
    tag: 'Installation',
  },
  {
    file: 'ac-08-indoor-finishing.webp',
    alt: 'Cabos Handyman technician finishing an indoor mini-split AC installation in a newly constructed Cabo San Lucas home',
    caption: 'Final fit on a new-construction install',
    tag: 'Installation',
  },
];

const tagColor: Record<WorkPhoto['tag'], string> = {
  Diagnosis: 'bg-amber-100 text-amber-800',
  Installation: 'bg-teal-100 text-teal-800',
  Maintenance: 'bg-blue-100 text-blue-800',
  Finished: 'bg-emerald-100 text-emerald-800',
};

function WorkGalleryLightbox() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? WORK_PHOTOS[openIndex] : null;

  return (
    <Dialog.Root open={openIndex !== null} onOpenChange={(open) => !open && setOpenIndex(null)}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {WORK_PHOTOS.map((photo, i) => (
          <button
            key={photo.file}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-square rounded-lg overflow-hidden bg-muted focus:outline-none focus:ring-2 focus:ring-[#06756b]"
          >
            <img
              src={`/work-photos/ac-installation-cabo/${photo.file}`}
              alt={photo.alt}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className={`absolute top-2 left-2 text-[11px] font-semibold px-2 py-0.5 rounded-full ${tagColor[photo.tag]}`}>
              {photo.tag}
            </span>
          </button>
        ))}
      </div>

      {active && (
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50" />
          <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
            <Dialog.Title className="sr-only">{active.caption}</Dialog.Title>
            <Dialog.Description className="sr-only">{active.alt}</Dialog.Description>
            <div className="relative max-w-3xl w-full">
              <img
                src={`/work-photos/ac-installation-cabo/${active.file}`}
                alt={active.alt}
                className="w-full max-h-[75vh] object-contain rounded-lg"
              />
              <div className="mt-3 flex items-center justify-between text-white">
                <div>
                  <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full mb-1 ${tagColor[active.tag]}`}>
                    {active.tag}
                  </span>
                  <p className="text-sm text-white/90">{active.caption}</p>
                </div>
                <span className="text-xs text-white/60">
                  {(openIndex ?? 0) + 1} / {WORK_PHOTOS.length}
                </span>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close"
                  className="absolute -top-10 right-0 md:top-0 md:-right-10 text-white/80 hover:text-white"
                >
                  <X size={28} />
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
}

export default function ACInstallationCabo() {
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Mini-Split AC Installation and Repair',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Cabos Handyman',
      telephone: '+52-612-169-8328',
      url: 'https://www.caboshandyman.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cabo San Lucas',
        addressRegion: 'Baja California Sur',
        addressCountry: 'MX',
      },
    },
    areaServed: [
      { '@type': 'City', name: 'Cabo San Lucas' },
      { '@type': 'AdministrativeArea', name: 'Los Cabos' },
    ],
    image: WORK_PHOTOS.map(p => `https://www.caboshandyman.com/work-photos/ac-installation-cabo/${p.file}`),
  };

  return (
    <>
      <SEO
        title="AC Installation & Repair Cabo San Lucas | Mini-Split Specialists | Cabos Handyman"
        description="Mini-split AC installation, repair, and filter maintenance in Cabo San Lucas. Real job photos documenting every install. Licensed technicians, same-day service available."
        canonicalUrl="/ac-installation-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
        schemaMarkup={schemaMarkup}
      />
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-gray-700 to-slate-800 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Wind size={18} />
            <span className="text-sm font-medium">Mini-Split Specialists · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            AC Installation & Repair<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Mini-split installation, filter maintenance, and repair for homes and vacation rentals in Cabo San Lucas — every job documented with real before, during, and after photos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Call +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-slate-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-900 transition-colors">
              Schedule Service <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">AC Services</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We install and service mini-split AC units across Cabo San Lucas — new construction, replacements, and the routine filter maintenance that keeps a unit running efficiently through the season.
              </p>
              <ul className="space-y-3">
                {[
                  'New mini-split AC installation',
                  'Old unit removal and replacement',
                  'Wall bracket mounting and line connection',
                  'Filter and vent grille cleaning',
                  'Diagnosis of units not cooling',
                  'Vacation rental AC turnover service',
                  'Multi-unit property installs',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-gray-600 mt-0.5 shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-100 border border-gray-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="text-gray-700" size={22} /> Why Cabos Handyman?
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {[
                    '20+ years experience in Los Cabos',
                    'Every visit documented with before/after photos',
                    'Bilingual service (English & Spanish)',
                    '1-year workmanship warranty',
                    'Same-day service available',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="text-gray-600 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Common Questions</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">How long does a mini-split install take?</p>
                    <p>Most single-unit installs take 2–3 hours including old unit removal, mounting, and line connection.</p>
                  </div>
                  <div>
                    <p className="font-semibold">My AC isn't cooling — what's wrong?</p>
                    <p>Usually a dirty filter, low refrigerant, or a wiring issue. We diagnose on-site and quote before any work starts.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Do you service vacation rentals?</p>
                    <p>Yes — we handle AC turnover and maintenance for property managers and owners not based in Cabo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Real AC Jobs in Cabo San Lucas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Not stock photos — this is our own documentation from real installs and maintenance visits. Click any photo to see it full-size.
            </p>
          </div>
          <WorkGalleryLightbox />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Need AC Installed or Repaired?</h2>
          <p className="text-white/90 mb-6">Call for a free estimate anywhere in Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <RelatedServices currentPath="/ac-installation-cabo-san-lucas" />
      <Footer />
    </>
  );
}
