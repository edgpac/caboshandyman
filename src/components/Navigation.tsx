import { useState } from 'react';
import { Phone, Mail, Shield, Menu, ChevronDown, Wrench, Home } from 'lucide-react';
import GradientText from './GradientText';

const SERVICE_LINKS = [
  { href: '/plumber-cabo-san-lucas', label: 'Plumber 24/7' },
  { href: '/toilet-installation-cabo-san-lucas', label: '↳ Toilet Installation' },
  { href: '/toilet-leak-repair-cabo-san-lucas', label: '↳ Toilet Leak Repair' },
  { href: '/faucet-installation-cabo-san-lucas', label: '↳ Faucet Installation' },
  { href: '/sink-installation-cabo-san-lucas', label: '↳ Kitchen Sink Install' },
  { href: '/bathroom-sink-installation-cabo-san-lucas', label: '↳ Bathroom Sink Install' },
  { href: '/water-heater-cabo-san-lucas', label: '↳ Water Heater' },
  { href: '/garbage-disposal-cabo-san-lucas', label: '↳ Garbage Disposal' },
  { href: '/toilet-tub-unclogging-cabo', label: '↳ Drain Cleaning' },
  { href: '/water-leak-detector-cabo-san-lucas', label: '↳ Water Leak Detector' },
  { href: '/commercial-sink-installation-cabo-san-lucas', label: '↳ Commercial Sink' },
  { href: '/electrical-services-cabo', label: 'Electrical Services' },
  { href: '/ceiling-fan-installation-cabo', label: '↳ Ceiling Fan Install' },
  { href: '/ceiling-light-installation-cabo-san-lucas', label: '↳ Ceiling Light Install' },
  { href: '/outlet-installation-cabo-san-lucas', label: '↳ Outlet Installation' },
  { href: '/generator-hookup-cabo-san-lucas', label: '↳ Generator Hookup' },
  { href: '/bathroom-lighting-cabo-san-lucas', label: '↳ Bathroom Lighting' },
  { href: '/office-lighting-cabo-san-lucas', label: '↳ Office Lighting' },
  { href: '/common-area-lighting-cabo-san-lucas', label: '↳ Common Area Lighting' },
  { href: '/decorative-lighting-cabo-san-lucas', label: '↳ Decorative Lighting' },
  { href: '/ac-installation-cabo-san-lucas', label: '↳ AC Installation & Repair' },
  { href: '/kitchen-services-cabo', label: 'Kitchen Remodeling' },
  { href: '/cabinet-installation-cabo-san-lucas', label: '↳ Cabinet Installation' },
  { href: '/countertop-installation-cabo-san-lucas', label: '↳ Countertop Installation' },
  { href: '/backsplash-installation-cabo-san-lucas', label: '↳ Backsplash Installation' },
  { href: '/tile-installation-cabo-san-lucas', label: '↳ Tile Installation' },
  { href: '/kitchen-hardware-installation-cabo-san-lucas', label: '↳ Kitchen Hardware' },
  { href: '/pantry-shelving-cabo-san-lucas', label: '↳ Pantry Shelving' },
  { href: '/bathroom-services-cabo', label: 'Bathroom Services' },
  { href: '/shower-installation-cabo-san-lucas', label: '↳ Shower Installation' },
  { href: '/shower-head-replacement-cabo-san-lucas', label: '↳ Shower Head Replacement' },
  { href: '/towel-rack-installation-cabo-san-lucas', label: '↳ Towel Rack Installation' },
  { href: '/mirror-installation-cabo-san-lucas', label: '↳ Mirror Installation' },
  { href: '/bathroom-shelving-cabo-san-lucas', label: '↳ Bathroom Shelving' },
  { href: '/handyman-cabo-san-lucas', label: 'Handyman Services' },
  { href: '/furniture-assembly-cabo', label: '↳ Furniture Assembly' },
  { href: '/tv-mounting-cabo', label: '↳ TV Mounting' },
  { href: '/door-lock-replacement-cabo-san-lucas', label: '↳ Door Lock Replacement' },
  { href: '/window-repair-cabo-san-lucas', label: '↳ Window Repair' },
  { href: '/painting-cabo-san-lucas', label: '↳ Paint Touch-ups' },
  { href: '/landscape-maintenance-cabo-san-lucas', label: '↳ Landscape Maintenance' },
  { href: '/booth-installation-cabo-san-lucas', label: '↳ Booth Installation' },
  { href: '/bar-installation-cabo-san-lucas', label: '↳ Bar Installation' },
  { href: '/property-setup-cabo', label: 'Property Setup' },
  { href: '/vacation-rental-setup-cabo', label: 'Vacation Rental Service' },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isPropertyCareOpen, setIsPropertyCareOpen] = useState(false);
  const [isMobilePropertyCareOpen, setIsMobilePropertyCareOpen] = useState(false);

  return (
    <nav className="bg-dark-surface text-white py-4 sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Left: Logo + Phone */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-3">
              <a href="/" className="flex items-center space-x-3">
                <img
                  src="/CHLOGO.png"
                  alt="Cabos Handyman Logo"
                  className="w-12 h-12 object-contain"
                  width="48"
                  height="48"
                  fetchPriority="high"
                />
                <GradientText className="text-xl font-bold">CABOS HANDYMAN</GradientText>
              </a>
            </div>
            <a
              href="tel:+526121698328"
              className="flex items-center gap-1 text-sm mt-1"
            >
              <Phone size={14} className="text-[#049d8e]" />
              <GradientText className="text-sm">612 169 8328</GradientText>
            </a>
          </div>

          {/* Right: Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <a
                href="/services"
                className="flex items-center gap-1 text-primary hover:text-primary-hover transition-colors font-semibold"
              >
                Services & Pricing
                <ChevronDown
                  size={16}
                  className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                />
              </a>
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-dark-surface-elevated rounded-lg shadow-xl border border-primary/20 py-1 z-50">
                  {SERVICE_LINKS.map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-dark-surface hover:text-primary transition-colors"
                    >
                      <Wrench size={12} className="text-primary/60" />
                      {link.label}
                    </a>
                  ))}
                  <div className="border-t border-primary/20 mt-1 pt-1">
                    <a
                      href="/services"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary hover:bg-dark-surface transition-colors"
                    >
                      View All Services & Pricing →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Property Care Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsPropertyCareOpen(true)}
              onMouseLeave={() => setIsPropertyCareOpen(false)}
            >
              <button
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold hover:from-purple-600 hover:to-indigo-600 transition shadow-lg"
              >
                <Shield size={18} />
                Property Care
                <ChevronDown
                  size={15}
                  className={`transition-transform ${isPropertyCareOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isPropertyCareOpen && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-dark-surface-elevated rounded-lg shadow-xl border border-primary/20 py-1 z-50">
                  <a
                    href="/property-care-plans"
                    className="flex items-center gap-2 px-4 py-3 text-sm text-white hover:bg-dark-surface hover:text-primary transition-colors"
                  >
                    <Shield size={14} className="text-purple-400" />
                    Property Care Plans
                  </a>
                </div>
              )}
            </div>
            <a
              href="/contact"
              className="flex items-center gap-2 bg-gradient-to-r from-[#2dd4bf] via-[#049d8e] to-[#06756b] hover:opacity-90 text-white px-4 py-2 rounded-lg transition-all font-semibold shadow-md shadow-[#049d8e]/30"
            >
              <Mail size={18} />
              Contact Us
            </a>
          </div>

          {/* Mobile: Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#2dd4bf] via-[#049d8e] to-[#06756b] hover:opacity-90 text-white font-semibold transition-all shadow-md shadow-[#049d8e]/30"
            aria-label="Toggle mobile menu"
          >
            <Menu size={20} />
            <span className="text-sm">Menu</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 bg-dark-surface-elevated rounded-lg p-4 shadow-xl border border-primary/20">
            {/* Mobile Services Accordion */}
            <button
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className="w-full flex items-center justify-between text-primary hover:text-primary-hover transition-colors font-semibold py-3 px-4 rounded-lg hover:bg-dark-surface"
            >
              <span>Services & Pricing</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isMobileServicesOpen && (
              <div className="pl-4 space-y-1 pb-2">
                {SERVICE_LINKS.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-2 px-4 text-sm text-white hover:text-primary transition-colors rounded-lg hover:bg-dark-surface"
                  >
                    <Wrench size={12} className="text-primary/60" />
                    {link.label}
                  </a>
                ))}
                <a
                  href="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 px-4 text-sm font-semibold text-primary hover:bg-dark-surface rounded-lg"
                >
                  View All Services & Pricing →
                </a>
              </div>
            )}

            {/* Mobile Property Care Accordion */}
            <button
              onClick={() => setIsMobilePropertyCareOpen(!isMobilePropertyCareOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold transition shadow-lg"
            >
              <span className="flex items-center gap-2"><Shield size={18} /> Property Care</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${isMobilePropertyCareOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isMobilePropertyCareOpen && (
              <div className="pl-4 space-y-1 pb-1">
                <a
                  href="/property-care-plans"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 px-4 text-sm text-white hover:text-primary transition-colors rounded-lg hover:bg-dark-surface"
                >
                  <Shield size={14} className="text-purple-400" /> Property Care Plans
                </a>
              </div>
            )}
            <a
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#2dd4bf] via-[#049d8e] to-[#06756b] hover:opacity-90 text-white px-4 py-3 rounded-lg transition-all font-semibold shadow-md shadow-[#049d8e]/30"
            >
              <Mail size={18} />
              Contact Us
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
