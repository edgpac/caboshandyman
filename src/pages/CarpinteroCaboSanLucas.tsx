import { lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '@/components/SEO';
import { CheckCircle2, Hammer, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Footer = lazy(() => import('@/components/Footer'));

const SITE_URL = 'https://www.caboshandyman.com';

// Spanish counterpart of /carpentry-cabo-san-lucas — "carpintero en cabo" and
// "carpintería en los cabos" searches had no Spanish page to land on.
export default function CarpinteroCaboSanLucas() {
  return (
    <>
      <SEO
        title="Carpintero en Cabo San Lucas, Los Cabos | Carpintería | Cabos Handyman"
        description="Carpintería en Cabo San Lucas, Los Cabos: gabinetes, repisas, molduras, puertas y barras o booths a medida. Equipo bilingüe, con licencia y seguro. Presupuesto gratis."
        canonicalUrl="/carpintero-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Carpintería',
          name: 'Carpintero en Cabo San Lucas',
          inLanguage: 'es',
          areaServed: ['Cabo San Lucas'],
          provider: {
            '@type': 'LocalBusiness',
            name: 'Cabos Handyman',
            telephone: '+52 612 169 8328',
            url: SITE_URL,
          },
        }}
      />
      <Helmet htmlAttributes={{ lang: 'es' }}>
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/carpentry-cabo-san-lucas`} />
        <link rel="alternate" hrefLang="es" href={`${SITE_URL}/carpintero-cabo-san-lucas`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/carpentry-cabo-san-lucas`} />
      </Helmet>
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-amber-700 to-yellow-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Hammer size={18} />
            <span className="text-sm font-medium">Carpintería · Cabo San Lucas</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Carpintero en<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Gabinetes, repisas, molduras y carpintería a medida para casas, rentas vacacionales y negocios en Los Cabos — con un equipo bilingüe, con licencia y asegurado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Llamar al +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-yellow-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-900 transition-colors">
              Solicitar presupuesto <ArrowRight size={20} />
            </a>
          </div>
          <p className="mt-6 text-white/90">
            Prefer English? <a href="/carpentry-cabo-san-lucas" hrefLang="en" className="underline font-semibold">Carpentry services in Cabo San Lucas</a>
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Trabajos de carpintería</h2>
              <p className="text-gray-700 mb-6">
                Desde un gabinete nuevo o repisas para la alacena hasta una barra o booth completo, hacemos proyectos de carpintería en todo Cabo San Lucas, Los Cabos — y coordinamos la plomería o electricidad que el trabajo necesite, para que trate con un solo equipo.
              </p>
              <ul className="space-y-3">
                {[
                  'Instalación, ajuste y reparación de gabinetes',
                  'Repisas a medida para alacenas, clósets y baños',
                  'Instalación de molduras y zoclos',
                  'Ajuste de puertas, bisagras y herrajes',
                  'Barras y booths a medida para casas y restaurantes',
                  'Armado de muebles',
                  'Instalación de herrajes de cocina',
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
                  <Shield className="text-amber-600" size={22} /> ¿Por qué Cabos Handyman?
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {[
                    'Más de 20 años de experiencia en Los Cabos',
                    'Con licencia y asegurados',
                    'Servicio bilingüe (español e inglés)',
                    'Garantía de 1 año en mano de obra',
                    'Servicio el mismo día disponible',
                    'Atendemos todo Cabo San Lucas, Los Cabos',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="text-amber-500 shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Preguntas frecuentes</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">¿Trabajan con mi diseño?</p>
                    <p>Sí — trabajamos con su diseño, o le ayudamos a desarrollarlo, y nos encargamos de la construcción e instalación.</p>
                  </div>
                  <div>
                    <p className="font-semibold">¿Puedo explicar el trabajo en español?</p>
                    <p>Sí. Nuestro equipo es bilingüe, así que puede explicarnos el proyecto en español o en inglés.</p>
                  </div>
                  <div>
                    <p className="font-semibold">¿Cómo obtengo un precio?</p>
                    <p>Llame al +52 612 169 8328 o solicite un presupuesto gratis en nuestra página de contacto. Fotos del espacio nos ayudan a cotizar más rápido.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Servicios de carpintería relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: '/cabinet-installation-cabo-san-lucas', label: 'Instalación de gabinetes' },
              { href: '/pantry-shelving-cabo-san-lucas', label: 'Repisas para alacena' },
              { href: '/bar-installation-cabo-san-lucas', label: 'Instalación de barras' },
              { href: '/booth-installation-cabo-san-lucas', label: 'Instalación de booths' },
            ].map(link => (
              <a key={link.href} href={link.href} className="bg-white border border-gray-200 rounded-lg p-4 text-center font-semibold text-gray-900 hover:border-amber-500 hover:shadow transition-all">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">¿Necesita un carpintero en Cabo?</h2>
          <p className="text-white/90 mb-6">Llame para un presupuesto gratis de carpintería en cualquier parte de Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
