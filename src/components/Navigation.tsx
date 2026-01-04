import { useState } from 'react';
import { Phone, Mail, Shield, Menu, ChevronDown } from 'lucide-react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                />
                <span className="text-xl font-bold text-primary">CABOS HANDYMAN</span>
              </a>
            </div>
            <a
              href="tel:+526121698328"
              className="flex items-center gap-1 text-primary hover:text-primary-hover transition-colors text-sm mt-1"
            >
              <Phone size={14} />
              <span>612 169 8328</span>
            </a>
          </div>

          {/* Right: Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/services"
              className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors font-semibold"
            >
              Services & Pricing
            </a>
            <a
              href="/property-care-plans"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold hover:from-purple-600 hover:to-indigo-600 transition shadow-lg"
            >
              <Shield size={18} />
              Property Care
            </a>
            <a
              href="/contact"
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground px-4 py-2 rounded-lg transition-colors font-semibold"
            >
              <Mail size={18} />
              Contact Us
            </a>
          </div>

          {/* Mobile: Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-primary-foreground font-semibold transition-colors"
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
            <a
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors font-semibold py-3 px-4 rounded-lg hover:bg-dark-surface"
            >
              Services & Pricing
            </a>
            <a
              href="/property-care-plans"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold hover:from-purple-600 hover:to-indigo-600 transition shadow-lg"
            >
              <Shield size={18} />
              Property Care
            </a>
            <a
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground px-4 py-3 rounded-lg transition-colors font-semibold"
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
