import LogoLoop from './LogoLoop';

const brandLogos = [
  // Mexican brands (priority - show first)
  { src: '/logos/Truper.png',     alt: 'Truper',      href: 'https://truper.com' },
  { src: '/logos/Comex.png',      alt: 'Comex',       href: 'https://comex.com.mx' },
  { src: '/logos/cemex.png',      alt: 'Cemex',       href: 'https://cemex.com' },
  { src: '/logos/berel.png',      alt: 'Berel',       href: 'https://berel.com.mx' },
  { src: '/logos/helvex.png',     alt: 'Helvex',      href: 'https://helvex.com' },
  { src: '/logos/lamosa.png',     alt: 'Lamosa',      href: 'https://lamosa.com' },
  { src: '/logos/Holcim.png',     alt: 'Holcim',      href: 'https://holcim.com' },
  { src: '/logos/Rotoplas.svg',   alt: 'Rotoplas',    href: 'https://rotoplas.com' },

  // International brands
  { src: '/logos/GE.svg',         alt: 'GE' },
  { src: '/logos/Siemens.svg',    alt: 'Siemens' },
  { src: '/logos/KleinTools.png', alt: 'Klein Tools' },
  { src: '/logos/Skil.png',       alt: 'Skil' },
];

export default function BrandCarousel() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Trusted Brands We Work With
        </h2>
        <LogoLoop
          logos={brandLogos}
          speed={60}
          direction="left"
          logoHeight={32}
          gap={40}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="#f9fafb"
          ariaLabel="Trusted construction brands"
        />
      </div>
    </section>
  );
}
