import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, Star, Droplet, Wrench, ArrowRight, Shield, Zap, Bath, Fan, Tv, Armchair } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const WORK_IMAGES: { file: string; alt: string }[] = [
  { file: 'image1.jpeg',  alt: 'Bathroom vanity with vessel sink, faucet, and LED mirror installed in Cabo San Lucas' },
  { file: 'image2.jpeg',  alt: 'Bar stool furniture assembly in progress in Cabo San Lucas' },
  { file: 'image3.png',   alt: 'Bedroom property setup with ceiling fan, bed frame, and mini-split AC in Cabo San Lucas' },
  { file: 'image4.jpeg',  alt: 'Rattan cabinet with interior shelving assembled in Cabo San Lucas home' },
  { file: 'image5.jpeg',  alt: 'Three-door rattan sideboard cabinet assembled in Cabo San Lucas property' },
  { file: 'image6.jpeg',  alt: 'Bed frame and nightstand furniture assembly in Cabo San Lucas bedroom' },
  { file: 'image7.png',   alt: 'Cabos Handyman technician installing kitchen cabinet drawer in Cabo San Lucas' },
  { file: 'image8.jpeg',  alt: 'TV mounted on wood slat accent wall with ceiling fan installed in Cabo San Lucas condo' },
  { file: 'image9.jpeg',  alt: 'TV wall mount and floating media shelf on wood slat accent wall in Cabo San Lucas' },
  { file: 'image10.jpeg', alt: 'Cabos Handyman technician on ladder installing wood slat wall panels in Cabo San Lucas' },
  { file: 'image11.jpeg', alt: 'Wood slat wall paneling materials staged for installation in Cabo San Lucas' },
  { file: 'image12.jpeg', alt: 'Cabos Handyman electrician working on electrical panel with laser level in Cabo San Lucas' },
  { file: 'image13.png',  alt: 'Before and after kitchen renovation completed by Cabos Handyman in Cabo San Lucas' },
  { file: 'image14.png',  alt: 'Modern open-plan kitchen and living room with island and TV wall completed in Cabo San Lucas' },
  { file: 'image15.jpeg', alt: 'Cabos Handyman technician arriving at job site carrying tools in Cabo San Lucas' },
  { file: 'image16.jpeg', alt: 'TV bracket and floating media shelf installed ready for TV mounting in Cabo San Lucas' },
  { file: 'image17.jpeg', alt: 'Cabos Handyman team installing pendant ceiling light fixture in Cabo San Lucas' },
  { file: 'image18.jpeg', alt: 'Glass globe pendant light installed on ceiling in Cabo San Lucas property' },
  { file: 'image19.jpeg', alt: 'Wall panel materials staged at Cabo San Lucas condo with ocean view before installation' },
  { file: 'image20.jpeg', alt: 'Cabos Handyman team assembling ceiling fan components on floor in Cabo San Lucas' },
  { file: 'image21.jpeg', alt: 'TV wall mount bracket installed during property setup in Cabo San Lucas' },
  { file: 'image22.jpeg', alt: 'Cabos Handyman team leveling and securing TV wall bracket in Cabo San Lucas' },
  { file: 'image23.jpeg', alt: 'Cabos Handyman technician installing ceiling fan on ladder in Cabo San Lucas' },
  { file: 'image24.jpeg', alt: 'Kitchen cabinet, backsplash tile, and sink installation project by Cabos Handyman in Cabo San Lucas' },
  { file: 'image25.jpeg', alt: 'Cabos Handyman technician carrying large wall panel during property setup in Cabo San Lucas' },
  { file: 'image26.jpeg', alt: 'Cabos Handyman plumber repairing under-sink garbage disposal in Cabo San Lucas' },
  { file: 'image27.jpeg', alt: 'Cabos Handyman technician taking outdoor measurements at Cabo San Lucas property' },
  { file: 'image28.jpeg', alt: 'Under-sink drain P-trap and plumbing connections installed in Cabo San Lucas' },
  { file: 'image29.jpeg', alt: 'Cabos Handyman plumber clearing toilet clog with auger in Cabo San Lucas' },
  { file: 'image30.jpeg', alt: 'Cabos Handyman team sourcing materials at local hardware store in Cabo San Lucas' },
];

type CardProps = {
  to: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  accent: string;
};

function ServiceCard({ to, icon, title, desc, accent }: CardProps) {
  return (
    <Link to={to} className={`bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 ${accent} transition-all group`}>
      <div className="mb-2">{icon}</div>
      <h3 className="font-bold text-gray-900 group-hover:text-inherit transition-colors text-sm leading-snug">{title}</h3>
      <p className="text-gray-500 text-xs mt-1">{desc}</p>
      <span className="text-xs font-semibold mt-2 flex items-center gap-1 text-gray-400 group-hover:text-inherit transition-colors">
        Learn More <ArrowRight size={11} />
      </span>
    </Link>
  );
}

type SectionProps = {
  title: string;
  intro: string;
  children: React.ReactNode;
};

function ServiceSection({ title, intro, children }: SectionProps) {
  return (
    <div className="mb-14">
      <div className="mb-5 border-b border-gray-200 pb-3">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-500 text-sm mt-1">{intro}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
}

const TOP_IMAGES = WORK_IMAGES.slice(0, 15);
const BOT_IMAGES = WORK_IMAGES.slice(15);

function MarqueeRow({ images, direction }: { images: typeof WORK_IMAGES; direction: 'left' | 'right' }) {
  const doubled = [...images, ...images];
  return (
    <div className="overflow-hidden">
      <div className={`flex ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}>
        {doubled.map((img, i) => (
          <div key={`${img.file}-${i}`} className="flex-none w-40 h-40 mr-1.5 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={`/service-sections/${img.file}`}
              alt={img.alt}
              className="w-full h-full object-cover"
              loading={i < 6 ? 'eager' : 'lazy'}
              decoding="async"
              width="160"
              height="160"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkGallery() {
  return (
    <div className="mb-14">
      <div className="mb-4 border-b border-gray-200 pb-3">
        <h2 className="text-2xl font-bold text-gray-900">Our Work</h2>
        <p className="text-gray-500 text-sm mt-1">Real projects completed across Los Cabos — not limited to what you see here, just give us a call.</p>
      </div>
      <div className="space-y-1.5">
        <MarqueeRow images={TOP_IMAGES} direction="left" />
        <MarqueeRow images={BOT_IMAGES} direction="right" />
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Handyman Services & Pricing Cabo San Lucas | Cabos Handyman</title>
        <meta
          name="description"
          content="Complete handyman service menu with transparent pricing in Cabo San Lucas. Kitchen, bathroom, electrical, plumbing, painting, drain cleaning, toilet & tub unclogging. $60 service call. 20+ years experience. Licensed & insured."
        />
        <meta
          name="keywords"
          content="handyman cabo san lucas, plumbing cabo, electrical cabo, kitchen remodel cabo, bathroom renovation cabo, toilet unclogging cabo, drain cleaning cabo san lucas, handyman pricing, emergency plumbing cabo"
        />
        <link rel="canonical" href="https://www.caboshandyman.com/services" />
        <meta property="og:title" content="Handyman Services & Pricing - Cabo San Lucas" />
        <meta property="og:description" content="70+ handyman services with transparent pricing. Kitchen, bathroom, electrical, plumbing. $60 service call. 24/7 emergency service." />
        <meta property="og:url" content="https://www.caboshandyman.com/services" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Cabos Handyman",
            "telephone": "+52-612-169-8328",
            "email": "loscabohandyman@gmail.com",
            "url": "https://www.caboshandyman.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Cabo San Lucas",
              "addressRegion": "Baja California Sur",
              "addressCountry": "MX"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": "22.8866974", "longitude": "-109.9139710" },
            "priceRange": "$60-$1200",
            "openingHours": "Mo-Su 00:00-23:59",
            "areaServed": [
              { "@type": "City", "name": "Cabo San Lucas" },
              { "@type": "AdministrativeArea", "name": "Los Cabos" }
            ],
            "sameAs": [
              "https://maps.app.goo.gl/hJRcahhtYjF5tkv4A",
              "https://www.facebook.com/share/19wvxoz8Cy/",
              "https://www.instagram.com/caboshandyman"
            ]
          })}
        </script>
      </Helmet>

      <Navigation />

      <div className="min-h-screen bg-gray-50">
        {/* Hidden SEO H1 */}
        <div className="sr-only">
          <h1>Handyman Cabo San Lucas - Professional Home Repair & Maintenance Services</h1>
          <p>Licensed handyman in Cabo San Lucas with 70+ services including plumbing, electrical, painting, kitchen & bathroom remodeling, toilet unclogging, drain cleaning, and emergency repairs.</p>
        </div>

        {/* Header Banner */}
        <div className="bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white py-16 px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Service Menu & Pricing</h2>
          <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 mt-4 sm:mt-6">
            <p className="text-xl sm:text-2xl text-white font-semibold mb-3 sm:mb-4">Pricing Reference Guide</p>
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                Browse our most common services and starting prices below.
              </p>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                <a href="tel:+526121698328" className="text-white font-bold hover:underline transition-all">Call us</a>
                {' '}for a personalized quote based on your project or issue.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 sm:px-6 sm:py-4 border border-white/20 mb-3 sm:mb-4">
              <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                Handyman service calls starting at $60 for most repairs.<br className="hidden sm:inline" />
                <span className="block sm:inline"> (free estimate:{' '}
                  <a href="tel:+526121698328" className="font-semibold hover:underline transition-all">+52 612 169 8328</a>)
                </span>
              </p>
            </div>
            <p className="text-sm sm:text-base text-white/80 font-medium">
              Services not limited to this list — call us with your specific need
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">

          {/* Featured Cards */}
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Featured Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
              <Link to="/property-setup-cabo" className="bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-500 rounded-lg p-6 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] w-12 h-12 rounded-full flex items-center justify-center">
                    <Home className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-teal-600 transition-colors">Property Setup</h3>
                </div>
                <p className="text-gray-600 mb-3">Complete move-in ready service. Furniture assembly, TV mounting, ceiling fans.</p>
                <p className="text-teal-600 font-semibold text-sm">Packages from $500</p>
                <div className="flex items-center gap-1 text-teal-600 font-semibold text-sm mt-3"><span>Learn More</span><ArrowRight size={14} /></div>
              </Link>

              <Link to="/vacation-rental-setup-cabo" className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 rounded-lg p-6 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center">
                    <Star className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">Rental Service</h3>
                </div>
                <p className="text-gray-600 mb-3">Airbnb & VRBO maintenance contracts. Protect your 5-star rating.</p>
                <p className="text-blue-600 font-semibold text-sm">From $250/month</p>
                <div className="flex items-center gap-1 text-blue-600 font-semibold text-sm mt-3"><span>Learn More</span><ArrowRight size={14} /></div>
              </Link>

              <Link to="/plumber-cabo-san-lucas" className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-500 rounded-lg p-6 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-cyan-500 w-12 h-12 rounded-full flex items-center justify-center">
                    <Droplet className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-cyan-600 transition-colors">Plumber 24/7</h3>
                </div>
                <p className="text-gray-600 mb-3">Emergency plumbing service. 30-minute response time for urgent situations.</p>
                <p className="text-cyan-600 font-semibold text-sm">Starting at $60</p>
                <div className="flex items-center gap-1 text-cyan-600 font-semibold text-sm mt-3"><span>Learn More</span><ArrowRight size={14} /></div>
              </Link>

              <Link to="/property-care-plans" className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-500 rounded-lg p-6 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center">
                    <Shield className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-purple-600 transition-colors">Property Care</h3>
                </div>
                <p className="text-gray-600 mb-3">Preventive maintenance plans. FREE monthly unclog included!</p>
                <p className="text-purple-600 font-semibold text-sm">From $99/month</p>
                <div className="flex items-center gap-1 text-purple-600 font-semibold text-sm mt-3"><span>View Plans</span><ArrowRight size={14} /></div>
              </Link>

              <Link to="/handyman-cabo-san-lucas" className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-400 rounded-lg p-6 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gray-600 w-12 h-12 rounded-full flex items-center justify-center">
                    <Wrench className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-gray-700 transition-colors">All Services</h3>
                </div>
                <p className="text-gray-600 mb-3">Complete handyman services. 20+ years experience, 600+ projects completed.</p>
                <p className="text-gray-700 font-semibold text-sm">View All Services</p>
                <div className="flex items-center gap-1 text-gray-700 font-semibold text-sm mt-3"><span>Learn More</span><ArrowRight size={14} /></div>
              </Link>
            </div>
          </div>

          {/* ── PLUMBING ── */}
          <ServiceSection
            title="Plumbing"
            intro="Emergency or routine — our licensed plumbers handle it all. Not limited to the list below, call us with your specific issue."
          >
            <ServiceCard to="/plumber-cabo-san-lucas" icon={<Droplet className="text-cyan-500" size={28} />} title="Plumber 24/7" desc="Emergency plumbing, repairs, installations" accent="hover:border-cyan-300" />
            <ServiceCard to="/toilet-tub-unclogging-cabo" icon={<Droplet className="text-teal-500" size={28} />} title="Drain Cleaning" desc="Toilet & tub unclogging, drain clearing" accent="hover:border-teal-300" />
            <ServiceCard to="/toilet-installation-cabo-san-lucas" icon={<Droplet className="text-cyan-400" size={28} />} title="Toilet Installation" desc="New install, replacement, running toilet" accent="hover:border-cyan-300" />
            <ServiceCard to="/toilet-leak-repair-cabo-san-lucas" icon={<Droplet className="text-cyan-500" size={28} />} title="Toilet Leak Repair" desc="Running toilet, base leaks, tank repair" accent="hover:border-cyan-300" />
            <ServiceCard to="/faucet-installation-cabo-san-lucas" icon={<Droplet className="text-teal-400" size={28} />} title="Faucet Installation" desc="Kitchen, bathroom, and utility faucets" accent="hover:border-teal-300" />
            <ServiceCard to="/sink-installation-cabo-san-lucas" icon={<Droplet className="text-cyan-600" size={28} />} title="Kitchen Sink Install" desc="Undermount, drop-in, farmhouse sinks" accent="hover:border-cyan-300" />
            <ServiceCard to="/bathroom-sink-installation-cabo-san-lucas" icon={<Droplet className="text-blue-500" size={28} />} title="Bathroom Sink Install" desc="Vessel, undermount, pedestal, vanity basin" accent="hover:border-blue-400" />
            <ServiceCard to="/water-heater-cabo-san-lucas" icon={<Wrench className="text-orange-500" size={28} />} title="Water Heater" desc="Installation, replacement, no-hot-water repair" accent="hover:border-orange-300" />
            <ServiceCard to="/garbage-disposal-cabo-san-lucas" icon={<Wrench className="text-gray-500" size={28} />} title="Garbage Disposal" desc="Installation, replacement, repair" accent="hover:border-gray-400" />
            <ServiceCard to="/water-leak-detector-cabo-san-lucas" icon={<Droplet className="text-cyan-600" size={28} />} title="Water Leak Detector" desc="Smart sensor installation, leak detection" accent="hover:border-cyan-400" />
            <ServiceCard to="/commercial-sink-installation-cabo-san-lucas" icon={<Droplet className="text-teal-600" size={28} />} title="Commercial Sink" desc="Restaurant, bar, 3-compartment, prep sinks" accent="hover:border-teal-400" />
          </ServiceSection>

          {/* ── ELECTRICAL ── */}
          <ServiceSection
            title="Electrical"
            intro="Licensed electrical work for homes, offices, and commercial spaces — from a single outlet to full lighting upgrades."
          >
            <ServiceCard to="/electrical-services-cabo" icon={<Zap className="text-yellow-500" size={28} />} title="Electrical Services" desc="Wiring, outlets, panels, lighting" accent="hover:border-yellow-300" />
            <ServiceCard to="/ceiling-fan-installation-cabo" icon={<Fan className="text-indigo-500" size={28} />} title="Ceiling Fan Install" desc="Installation, replacement, wiring" accent="hover:border-indigo-300" />
            <ServiceCard to="/ceiling-light-installation-cabo-san-lucas" icon={<Zap className="text-yellow-400" size={28} />} title="Ceiling Light Install" desc="Recessed, pendant, chandeliers, LED" accent="hover:border-yellow-400" />
            <ServiceCard to="/outlet-installation-cabo-san-lucas" icon={<Zap className="text-yellow-500" size={28} />} title="Outlet Installation" desc="GFCI, USB, 220V, new outlets" accent="hover:border-yellow-300" />
            <ServiceCard to="/generator-hookup-cabo-san-lucas" icon={<Zap className="text-orange-600" size={28} />} title="Generator Hookup" desc="220V inlet, transfer switch for CFE outages" accent="hover:border-orange-400" />
            <ServiceCard to="/bathroom-lighting-cabo-san-lucas" icon={<Zap className="text-yellow-500" size={28} />} title="Bathroom Lighting" desc="Vanity lights, sconces, exhaust fan lights" accent="hover:border-yellow-300" />
            <ServiceCard to="/office-lighting-cabo-san-lucas" icon={<Zap className="text-yellow-600" size={28} />} title="Office Lighting" desc="LED panels, task lighting, smart fixtures" accent="hover:border-yellow-400" />
            <ServiceCard to="/common-area-lighting-cabo-san-lucas" icon={<Zap className="text-yellow-400" size={28} />} title="Common Area Lighting" desc="Hallways, lobbies, parking, exterior" accent="hover:border-yellow-300" />
            <ServiceCard to="/decorative-lighting-cabo-san-lucas" icon={<Zap className="text-amber-500" size={28} />} title="Decorative Lighting" desc="String lights, accent, LED strips, landscape" accent="hover:border-amber-400" />
          </ServiceSection>

          {/* ── KITCHEN ── */}
          <ServiceSection
            title="Kitchen"
            intro="From a single hardware swap to a complete kitchen renovation — one crew, one call, one less thing to worry about."
          >
            <ServiceCard to="/kitchen-services-cabo" icon={<Wrench className="text-orange-500" size={28} />} title="Kitchen Remodeling" desc="Cabinets, countertops, plumbing, tile" accent="hover:border-orange-300" />
            <ServiceCard to="/cabinet-installation-cabo-san-lucas" icon={<Home className="text-green-600" size={28} />} title="Cabinet Installation" desc="Kitchen, bathroom, built-in storage" accent="hover:border-green-300" />
            <ServiceCard to="/countertop-installation-cabo-san-lucas" icon={<Wrench className="text-stone-600" size={28} />} title="Countertop Installation" desc="Granite, quartz, marble, tile, laminate" accent="hover:border-stone-400" />
            <ServiceCard to="/backsplash-installation-cabo-san-lucas" icon={<Wrench className="text-emerald-600" size={28} />} title="Backsplash Installation" desc="Subway, mosaic, talavera, stone tile" accent="hover:border-emerald-300" />
            <ServiceCard to="/tile-installation-cabo-san-lucas" icon={<Wrench className="text-amber-600" size={28} />} title="Tile Installation" desc="Floor, wall, backsplash, shower tile" accent="hover:border-amber-300" />
            <ServiceCard to="/kitchen-hardware-installation-cabo-san-lucas" icon={<Wrench className="text-slate-500" size={28} />} title="Kitchen Hardware" desc="Cabinet handles, pulls, hinges, knobs" accent="hover:border-slate-400" />
            <ServiceCard to="/pantry-shelving-cabo-san-lucas" icon={<Home className="text-amber-600" size={28} />} title="Pantry Shelving" desc="Pantry, closet, wall, and built-in shelving" accent="hover:border-amber-400" />
          </ServiceSection>

          {/* ── BATHROOM ── */}
          <ServiceSection
            title="Bathroom"
            intro="Every fixture, fitting, and finish your bathroom needs — not limited to the list below, just give us a call."
          >
            <ServiceCard to="/bathroom-services-cabo" icon={<Bath className="text-blue-500" size={28} />} title="Bathroom Services" desc="Tile, fixtures, toilet, shower install" accent="hover:border-blue-300" />
            <ServiceCard to="/shower-installation-cabo-san-lucas" icon={<Bath className="text-blue-400" size={28} />} title="Shower Installation" desc="Walk-in shower, tub conversion, tile" accent="hover:border-blue-300" />
            <ServiceCard to="/shower-head-replacement-cabo-san-lucas" icon={<Droplet className="text-blue-400" size={28} />} title="Shower Head Replacement" desc="Install, upgrade, rain head, handheld" accent="hover:border-blue-300" />
            <ServiceCard to="/towel-rack-installation-cabo-san-lucas" icon={<Wrench className="text-gray-500" size={28} />} title="Towel Rack Installation" desc="Towel bars, hooks, rings, heated bars" accent="hover:border-gray-400" />
            <ServiceCard to="/mirror-installation-cabo-san-lucas" icon={<Wrench className="text-slate-500" size={28} />} title="Mirror Installation" desc="Bathroom mirrors, framed, frameless, large" accent="hover:border-slate-400" />
            <ServiceCard to="/bathroom-shelving-cabo-san-lucas" icon={<Home className="text-blue-500" size={28} />} title="Bathroom Shelving" desc="Wall shelves, over-toilet storage, floating" accent="hover:border-blue-300" />
          </ServiceSection>

          {/* ── HANDYMAN & GENERAL ── */}
          <ServiceSection
            title="Handyman & General Repairs"
            intro="Quick fixes to bigger projects — if something needs doing around the house, we'll handle it. Call with any issue."
          >
            <ServiceCard to="/handyman-cabo-san-lucas" icon={<Wrench className="text-gray-600" size={28} />} title="Handyman Services" desc="General repairs, maintenance, 70+ services" accent="hover:border-gray-400" />
            <ServiceCard to="/furniture-assembly-cabo" icon={<Armchair className="text-amber-500" size={28} />} title="Furniture Assembly" desc="IKEA, flatpack, office furniture" accent="hover:border-amber-300" />
            <ServiceCard to="/tv-mounting-cabo" icon={<Tv className="text-slate-600" size={28} />} title="TV Mounting" desc="Wall mount, cable management, setup" accent="hover:border-slate-400" />
            <ServiceCard to="/door-lock-replacement-cabo-san-lucas" icon={<Wrench className="text-gray-600" size={28} />} title="Door Lock Replacement" desc="Deadbolt, smart lock, knob, lever sets" accent="hover:border-gray-400" />
            <ServiceCard to="/window-repair-cabo-san-lucas" icon={<Wrench className="text-sky-500" size={28} />} title="Window Repair" desc="Seals, screens, hardware, sliding windows" accent="hover:border-sky-300" />
            <ServiceCard to="/painting-cabo-san-lucas" icon={<Wrench className="text-rose-500" size={28} />} title="Paint Touch-ups" desc="Interior & exterior, accent walls, full rooms" accent="hover:border-rose-300" />
            <ServiceCard to="/landscape-maintenance-cabo-san-lucas" icon={<Wrench className="text-green-600" size={28} />} title="Landscape Maintenance" desc="Palm tree pruning, irrigation, yard cleanup" accent="hover:border-green-400" />
          </ServiceSection>

          {/* ── COMMERCIAL & HOSPITALITY ── */}
          <ServiceSection
            title="Commercial & Hospitality"
            intro="We work with restaurants, bars, hotels, and HOAs across Los Cabos — not limited to residential projects."
          >
            <ServiceCard to="/booth-installation-cabo-san-lucas" icon={<Armchair className="text-indigo-500" size={28} />} title="Booth Installation" desc="Restaurant & dining area booth seating" accent="hover:border-indigo-300" />
            <ServiceCard to="/bar-installation-cabo-san-lucas" icon={<Wrench className="text-amber-700" size={28} />} title="Bar Installation" desc="Custom bar tops, cabinetry, under-bar setup" accent="hover:border-amber-500" />
            <ServiceCard to="/commercial-sink-installation-cabo-san-lucas" icon={<Droplet className="text-teal-600" size={28} />} title="Commercial Sink" desc="Restaurant, bar, 3-compartment, prep sinks" accent="hover:border-teal-400" />
            <ServiceCard to="/common-area-lighting-cabo-san-lucas" icon={<Zap className="text-yellow-400" size={28} />} title="Common Area Lighting" desc="Hallways, lobbies, parking, exterior lighting" accent="hover:border-yellow-300" />
          </ServiceSection>

          {/* ── PROPERTY & RENTAL ── */}
          <ServiceSection
            title="Property & Rental Management"
            intro="Whether you're here or abroad, we keep your property in top shape — from day-one setup to monthly care plans."
          >
            <ServiceCard to="/property-setup-cabo" icon={<Home className="text-teal-600" size={28} />} title="Property Setup" desc="Move-in ready: fans, furniture, TV, more" accent="hover:border-teal-400" />
            <ServiceCard to="/vacation-rental-setup-cabo" icon={<Star className="text-blue-500" size={28} />} title="Vacation Rental" desc="Airbnb & VRBO maintenance contracts" accent="hover:border-blue-400" />
            <ServiceCard to="/property-care-plans" icon={<Shield className="text-purple-500" size={28} />} title="Property Care Plans" desc="Monthly maintenance + free drain unclog" accent="hover:border-purple-400" />
          </ServiceSection>

          <WorkGallery />
        </div>
      </div>

      <Footer />
    </>
  );
}
