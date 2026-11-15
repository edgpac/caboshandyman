import { lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '@/components/SEO';
import { CheckCircle2, Hammer, Phone, ArrowRight, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Footer = lazy(() => import('@/components/Footer'));

const SITE_URL = 'https://www.caboshandyman.com';

// Spanish counterpart of /carpentry-cabo-san-lucas — same confirmed services
// (owner + Business Profile list), same FAQ, translated for the local market.
const SERVICE_GROUPS = [
  {
    title: 'Carpintería a medida y muebles empotrados',
    intro:
      'Trabajos en madera diseñados y fabricados a la medida de su espacio — no piezas de catálogo forzadas en una casa de Cabo.',
    items: [
      'Gabinetes de cocina a medida',
      'Gabinetes para cuarto de lavado',
      'Clósets y muebles empotrados',
      'Almacenamiento bajo la escalera',
      'Repisas a medida, repisas flotantes y sistemas para clóset',
      'Puertas a medida, incluidas puertas tipo granero y puertas mosquiteras',
    ],
  },
  {
    title: 'Reparación y restauración de carpintería',
    intro:
      'No todo hay que reemplazarlo. Reparamos y restauramos la carpintería existente, y la reemplazamos cuando la reparación ya no conviene.',
    items: [
      'Reparación de puertas, gabinetes y marcos hinchados o dañados',
      'Reparación, reemplazo y fabricación de puertas y ventanas',
      'Reparación de rieles de puertas corredizas',
      'Sellado de puertas y ventanas contra la intemperie',
      'Restauración de gabinetes y carpintería existente',
    ],
  },
  {
    title: 'Carpintería exterior: pérgolas, palapas y sombra',
    intro:
      'La vida al aire libre es parte de una casa en Cabo, y las estructuras exteriores deben hacerse para resistir sol, viento y aire salino.',
    items: [
      'Diseño e instalación de pérgolas a medida',
      'Reparación y construcción de palapas',
      'Velarias (toldos de vela)',
      'Estructuras para patios techados',
    ],
  },
  {
    title: 'Preparación para huracanes y tormentas',
    intro: 'Proteja sus ventanas antes de la temporada de tormentas, no a última hora.',
    items: ['Contraventanas para tormenta hechas a la medida'],
  },
];

const FAQS = [
  {
    q: '¿Hacen gabinetes a medida en Cabo San Lucas?',
    a: 'Sí. Fabricamos gabinetes de cocina a medida, gabinetes para cuarto de lavado, clósets, muebles empotrados y almacenamiento bajo la escalera, diseñados y hechos a la medida de su espacio.',
  },
  {
    q: '¿Pueden reparar puertas y gabinetes hinchados o dañados?',
    a: 'Sí. Reparamos, restauramos o reemplazamos puertas, gabinetes y marcos hinchados o dañados, y también reparamos rieles de puertas corredizas y sellamos puertas y ventanas contra la intemperie.',
  },
  {
    q: '¿Construyen pérgolas y palapas?',
    a: 'Sí. Diseñamos e instalamos pérgolas a medida, reparamos y construimos palapas, e instalamos velarias y estructuras para patios techados.',
  },
  {
    q: '¿Hacen contraventanas para tormentas?',
    a: 'Sí. Como parte de la preparación para huracanes y tormentas, fabricamos contraventanas para tormenta a la medida.',
  },
  {
    q: '¿En qué zonas trabajan?',
    a: 'En Cabo San Lucas — incluidas la Marina, Pedregal, El Tezal, El Médano y el Centro. No atendemos regularmente San José del Cabo ni el Corredor Turístico.',
  },
  {
    q: '¿Puedo explicar el proyecto en español?',
    a: 'Sí. Nuestro equipo es bilingüe, así que puede explicarnos el proyecto en español o en inglés.',
  },
  {
    q: '¿Cómo obtengo un precio para un trabajo de carpintería?',
    a: 'Llame al +52 612 169 8328 o solicite un presupuesto gratis en nuestra página de contacto. Fotos y medidas aproximadas del espacio nos ayudan a cotizar más rápido.',
  },
  {
    q: '¿Cuál es su horario?',
    a: 'De lunes a sábado, de 8am a 6pm. Los domingos cerramos.',
  },
];

export default function CarpinteroCaboSanLucas() {
  return (
    <>
      <SEO
        title="Carpintero en Cabo San Lucas, Los Cabos | Carpintería | Cabos Handyman"
        description="Carpintero en Cabo San Lucas, Los Cabos: gabinetes a medida, clósets, puertas, pérgolas y palapas, reparación y restauración. Equipo bilingüe. Presupuesto gratis."
        canonicalUrl="/carpintero-cabo-san-lucas"
        geoRegion="MX-BCS"
        geoPlacename="Cabo San Lucas"
        geoPosition="22.8866974;-109.9139710"
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              serviceType: 'Carpintería',
              name: 'Carpintero en Cabo San Lucas',
              inLanguage: 'es',
              areaServed: ['Cabo San Lucas'],
              provider: {
                '@type': 'LocalBusiness',
                name: 'Cabos Handyman Services',
                alternateName: 'Cabos Handyman',
                telephone: '+52 612 169 8328',
                url: SITE_URL,
              },
            },
            {
              '@type': 'FAQPage',
              inLanguage: 'es',
              mainEntity: FAQS.map(faq => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: { '@type': 'Answer', text: faq.a },
              })),
            },
          ],
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
            <span className="text-sm font-medium">A medida · Reparación · Restauración</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Carpintero en<br />Cabo San Lucas
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            ¿Busca un carpintero en Cabo San Lucas? Cabos Handyman fabrica, repara y restaura carpintería para casas, rentas vacacionales y negocios en Cabo San Lucas, Los Cabos — gabinetes a medida, clósets, puertas, pérgolas y palapas, con un equipo bilingüe, con licencia y asegurado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <Phone size={20} /> Llamar al +52 612 169 8328
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-yellow-900/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-900 transition-colors">
              Presupuesto gratis <ArrowRight size={20} />
            </a>
          </div>
          <p className="mt-6 text-white/90">
            Prefer English? <a href="/carpentry-cabo-san-lucas" hrefLang="en" className="underline font-semibold">Carpenter in Cabo San Lucas</a>
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Carpintería en Cabo San Lucas: a medida, reparación y restauración</h2>
          <p className="text-gray-700 mb-4">
            La carpintería en Cabo San Lucas se divide en tres tipos de trabajo: fabricar algo nuevo a la medida del espacio, reparar madera dañada y restaurar lo que ya existe para que se vea y funcione como nuevo. Hacemos los tres, así que no necesita una empresa para los gabinetes a medida y otra para la puerta que se atora.
          </p>
          <p className="text-gray-700 mb-10">
            Como somos un equipo de mantenimiento y remodelación, los proyectos de carpintería que también requieren plomería, electricidad o pintura — un cuarto de lavado con gabinetes nuevos y tarja, o un clóset con iluminación — los resuelve un solo equipo, de principio a fin.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {SERVICE_GROUPS.map(group => (
              <div key={group.title} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{group.title}</h3>
                <p className="text-gray-700 mb-4">{group.intro}</p>
                <ul className="space-y-2">
                  {group.items.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="text-amber-600 mt-0.5 shrink-0" size={20} />
                      <span className="text-gray-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cómo funciona un proyecto de carpintería</h2>
            <ol className="space-y-4 text-gray-800">
              <li><strong>1. Cuéntenos qué necesita.</strong> Llame, o envíe fotos y medidas aproximadas desde nuestra página de contacto. Puede explicarlo en español o en inglés.</li>
              <li><strong>2. Presupuesto gratis.</strong> Revisamos el espacio y el alcance del trabajo y le damos una cotización clara.</li>
              <li><strong>3. Fabricación e instalación.</strong> Las piezas a medida se fabrican y se instalan; las reparaciones y restauraciones se hacen en sitio.</li>
              <li><strong>4. Un solo equipo para todo.</strong> La plomería, electricidad o pintura que requiera el trabajo la coordina el mismo equipo.</li>
            </ol>
            <p className="text-gray-700 mt-6">
              Los propietarios que no están en Cabo pueden recibir fotos del avance del trabajo.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-amber-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="text-amber-600" size={22} /> ¿Por qué Cabos Handyman?
              </h3>
              <ul className="space-y-2 text-gray-800">
                {[
                  'Más de 20 años de experiencia en Los Cabos',
                  'Con licencia y asegurados',
                  'Servicio bilingüe (español e inglés)',
                  'Garantía de 1 año en mano de obra',
                  'Servicio el mismo día disponible',
                  'Atendemos Cabo San Lucas, Los Cabos',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="text-amber-500 shrink-0" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dónde trabajamos</h3>
              <p className="text-gray-800">
                Solo en Cabo San Lucas — incluidas la Marina, Pedregal, El Tezal, El Médano y el Centro. Horario: de lunes a sábado, de 8am a 6pm.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Preguntas frecuentes sobre carpintería</h2>
          <div className="space-y-6">
            {FAQS.map(faq => (
              <div key={faq.q} className="border-b border-gray-200 pb-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Servicios relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: '/kitchen-services-cabo', label: 'Remodelación de cocinas' },
              { href: '/window-repair-cabo-san-lucas', label: 'Reparación de ventanas' },
              { href: '/pantry-shelving-cabo-san-lucas', label: 'Repisas para alacena' },
              { href: '/bar-installation-cabo-san-lucas', label: 'Instalación de barras' },
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
          <h2 className="text-3xl font-bold mb-4">¿Necesita un carpintero en Cabo San Lucas?</h2>
          <p className="text-white/90 mb-6">Llame para un presupuesto gratis de carpintería en cualquier parte de Cabo San Lucas, Los Cabos.</p>
          <a href="tel:+526121698328" className="inline-flex items-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone size={22} /> +52 612 169 8328
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
