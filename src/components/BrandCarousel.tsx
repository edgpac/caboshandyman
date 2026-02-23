import LogoLoop from './LogoLoop';

const brandLogos = [
  // Mexican brands (priority - show first)
  { src: '/logos/Truper.webp',     alt: 'Truper',      href: 'https://truper.com',      width: 120, height: 32 },
  { src: '/logos/Comex.webp',      alt: 'Comex',       href: 'https://comex.com.mx',    width: 120, height: 32 },
  { src: '/logos/cemex.png',       alt: 'Cemex',       href: 'https://cemex.com',       width: 120, height: 32 },
  { src: '/logos/berel.webp',      alt: 'Berel',       href: 'https://berel.com.mx',    width: 120, height: 32 },
  { src: '/logos/helvex.webp',     alt: 'Helvex',      href: 'https://helvex.com',      width: 120, height: 32 },
  { src: '/logos/lamosa.webp',     alt: 'Lamosa',      href: 'https://lamosa.com',      width: 120, height: 32 },
  { src: '/logos/Holcim.webp',     alt: 'Holcim',      href: 'https://holcim.com',      width: 120, height: 32 },
  { src: '/logos/Rotoplas.svg',    alt: 'Rotoplas',    href: 'https://rotoplas.com',    width: 120, height: 32 },

  // International brands
  { src: '/logos/GE.svg',          alt: 'GE',          width: 60,  height: 32 },
  { src: '/logos/Siemens.svg',     alt: 'Siemens',     width: 120, height: 32 },
  { src: '/logos/KleinTools.webp', alt: 'Klein Tools', width: 120, height: 32 },
  { node: <img src="/logos/milwaukee.webp" alt="Milwaukee Tool" width={156} height={52} style={{ height: '52px', width: 'auto', objectFit: 'contain' }} loading="lazy" draggable={false} />, ariaLabel: 'Milwaukee Tool', href: 'https://milwaukeetool.com' },
  { src: '/logos/Skil.webp',       alt: 'Skil',        width: 80,  height: 32 },
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
