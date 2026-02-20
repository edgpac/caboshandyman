import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { Phone, Mail, MapPin, ArrowRight, MessageCircle, Shield, Menu, ChevronDown } from 'lucide-react';
import Footer from './Footer';
import SEO from './SEO';
import SecureAIAssistant from './SecureAIAssistant';
import ServiceMenuPopup from './ServiceMenuPopup';
import ReviewsCarousel from './ReviewsCarousel';
import BrandCarousel from './BrandCarousel';
import GradientText from './GradientText';
import kitchenImage from '../assets/modern-kitchen-remodel.jpeg';
import bathroomImage from '../assets/luxury-bathroom.jpeg';
import officeImage from '../assets/commercial-office.jpeg';
import communityImage from '../assets/community-center.jpeg';
import restaurantImage from '../assets/restaurant-buildout.jpeg';
import homeImage from '../assets/home-addition.jpeg';

export default function CabosHandymanHomepage() {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [aiAssistantMode, setAiAssistantMode] = useState('services');
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);

  const animateCounter = (element: HTMLElement, endValue: number, prefix = '', suffix = '') => {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: endValue,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (element) {
          element.textContent = prefix + Math.round(obj.value).toLocaleString() + suffix;
        }
      },
    });
  };

  useEffect(() => {
    if (statsRefs.current[0]) animateCounter(statsRefs.current[0], 20, '', '+');
    if (statsRefs.current[1]) animateCounter(statsRefs.current[1], 600, '', '+');
    if (statsRefs.current[2]) animateCounter(statsRefs.current[2], 24, '', '/7*');
    if (statsRefs.current[3]) animateCounter(statsRefs.current[3], 100, '', '%');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projects = [
    {
      name: "Modern Kitchen",
      category: "Residential",
      image: kitchenImage,
      alt: "Modern kitchen remodeling project in Cabo San Lucas featuring custom cabinets, granite countertops, and stainless steel appliances by Cabos Handyman",
      imagePosition: "center 30%"
    },
    {
      name: "Luxury Bathroom",
      category: "Residential",
      image: bathroomImage,
      alt: "Luxury bathroom renovation in Cabo San Lucas with custom tile work, modern fixtures, and elegant design by Cabos Handyman",
      imagePosition: "center 35%"
    },
    {
      name: "Commercial Office",
      category: "Commercial",
      image: officeImage,
      alt: "Commercial office construction and renovation project in Cabo San Lucas with professional workspace design by Cabos Handyman",
      imagePosition: "center 30%"
    },
    {
      name: "Community Center",
      category: "HOA",
      image: communityImage,
      alt: "Community center construction and maintenance project in Cabo San Lucas for HOA and residential communities by Cabos Handyman",
      imagePosition: "center 25%"
    },
    {
      name: "Restaurant Buildout",
      category: "Commercial",
      image: restaurantImage,
      alt: "Restaurant construction and commercial buildout project in Cabo San Lucas with custom design and professional finishing by Cabos Handyman",
      imagePosition: "center 35%"
    },
    {
      name: "Home Addition",
      category: "Residential",
      image: homeImage,
      alt: "Home addition and expansion project in Cabo San Lucas featuring new construction, structural work, and seamless integration by Cabos Handyman",
      imagePosition: "center 35%"
    }
  ];

  const openAIAssistant = (mode = 'services') => {
    setAiAssistantMode(mode);
    setIsAIAssistantOpen(true);
  };

  const openServiceMenu = (projectName) => {
    setSelectedProject(projectName);
    setServiceMenuOpen(true);
  };

  const homepageSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Cabos Handyman",
    "image": "https://www.caboshandyman.com/CHLOGO.png",
    "telephone": "+526121698328",
    "url": "https://www.caboshandyman.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cabo San Lucas",
      "addressRegion": "BCS",
      "addressCountry": "MX"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.8905327,
      "longitude": -109.9167371
    },
    "priceRange": "$$",
    "openingHours": ["Mo-Fr 07:00-18:00", "Sa 08:00-14:00"],
    "areaServed": [
      {
        "@type": "City",
        "name": "Cabo San Lucas"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Los Cabos"
      }
    ],
    "sameAs": [
      "https://maps.app.goo.gl/hJRcahhtYjF5tkv4A",
      "https://www.facebook.com/share/19wvxoz8Cy/",
      "https://www.instagram.com/caboshandyman"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    },
    "description": "Professional handyman and construction services in Cabo San Lucas. 20+ years experience, 600+ projects completed. Licensed, insured, and bonded.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Handyman Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Plumbing Services" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Electrical Services" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Kitchen Remodeling" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bathroom Remodeling" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "TV Mounting" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ceiling Fan Installation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Furniture Assembly" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Property Care Plans" } }
      ]
    }
  };

  return (
    <>
      <SEO
        title="Handyman Cabo San Lucas | 20+ Years Experience | Cabos Handyman"
        description="Need a handyman in Cabo San Lucas? 600+ projects completed, $60 service calls, 24/7 emergency service. Kitchen remodels, plumbing, electrical & more. Call +52 612 169 8328 for a free estimate."
        canonicalUrl="/"
        schemaMarkup={homepageSchema}
      />
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="bg-dark-surface text-white py-4 sticky top-0 z-40 shadow-lg">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center">
              {/* Left: Logo + Phone */}
              <div className="flex flex-col items-center">
                <div className="flex items-center space-x-3">
                  <img
                    src="/CHLOGO.png"
                    alt="Cabos Handyman Logo"
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-xl font-bold text-primary">CABOS HANDYMAN</span>
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

        {/* Hero Section */}
        <section className="relative bg-white py-20 min-h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-65"
            >
              <source src="/videos/hero-construction-bg.mp4" type="video/mp4" />
            </video>
            {/* Light overlay so video shows through, text stays readable */}
            <div className="absolute inset-0 bg-white/35"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">

              {/* Business Name */}
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold md:font-bold mb-4 text-center leading-tight">
                <GradientText className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold md:font-bold leading-tight">
                  CABOS HANDYMAN
                </GradientText>
                <span className="block text-base sm:text-lg md:text-2xl lg:text-3xl font-semibold mt-2 text-gray-900">
                  Professional Handyman<br className="lg:hidden" /> Services in Cabo San Lucas
                </span>
              </h1>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <a
                  href="tel:+526121698328"
                  className="bg-gradient-to-r from-[#2dd4bf] via-[#049d8e] to-[#06756b] hover:opacity-90 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all flex items-center justify-center shadow-lg shadow-teal-500/30"
                >
                  <Phone className="mr-2" size={20} />
                  Call for Free Estimate
                </a>
                <button
                  onClick={() => openAIAssistant('booking')}
                  className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-[#049d8e] px-8 py-4 rounded-lg text-lg font-bold transition-colors flex items-center justify-center shadow-sm"
                >
                  Schedule Service
                  <ArrowRight className="ml-2 text-[#049d8e]" size={20} />
                </button>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-gray-800 mt-5">
                *Handyman services for vacation rentals and homes. Service calls starting at $60 for most repairs.
              </p>

            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
              <div className="transform hover:scale-105 transition-transform">
                <div
                  ref={el => { statsRefs.current[0] = el; }}
                  className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#5eead4] via-[#049d8e] to-[#06756b] bg-clip-text text-transparent"
                >0</div>
                <div className="text-gray-900 font-semibold">Years Experience</div>
              </div>
              <div className="transform hover:scale-105 transition-transform">
                <div
                  ref={el => { statsRefs.current[1] = el; }}
                  className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#5eead4] via-[#049d8e] to-[#06756b] bg-clip-text text-transparent"
                >0</div>
                <div className="text-gray-900 font-semibold">Projects Completed</div>
              </div>
              <div className="transform hover:scale-105 transition-transform">
                <div
                  ref={el => { statsRefs.current[2] = el; }}
                  className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#5eead4] via-[#049d8e] to-[#06756b] bg-clip-text text-transparent"
                >0</div>
                <div className="text-gray-900 font-semibold text-sm">Emergency Service</div>
                <div className="text-xs text-gray-700 mt-1">*For members</div>
              </div>
              <div className="transform hover:scale-105 transition-transform">
                <div
                  ref={el => { statsRefs.current[3] = el; }}
                  className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#5eead4] via-[#049d8e] to-[#06756b] bg-clip-text text-transparent"
                >0</div>
                <div className="text-gray-900 font-semibold">Satisfaction Rate</div>
              </div>
            </div>
            <div className="text-center mt-8">
              <a href="/about" className="text-primary hover:underline font-medium text-sm">
                Learn more about our team &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">We Build Projects That Last</h2>
              <p className="text-xl text-gray-900 max-w-2xl mx-auto">
                As the leading handyman service in Cabo San Lucas, explore our completed residential and commercial projects.<br />Click on any project to see our service menu and pricing.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => openServiceMenu(project.name)}
                >
                  <div className="h-64 bg-muted overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{ objectPosition: project.imagePosition }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-primary font-semibold mb-2">{project.category}</div>
                    <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <button className="mt-4 text-primary font-semibold text-sm hover:text-primary-hover transition-colors">
                      View Services & Pricing →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Carousel - REPLACES Partners Section */}
        <ReviewsCarousel />

        {/* CTA Section - Care Plans Focus */}
        <section className="py-16 bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">

              {/* Updated Title - Subscription Focus */}
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Smart Property Owners Choose Prevention
              </h2>

              {/* Updated Subtitle */}
              <p className="text-xl mb-8 text-white/90">
                Get preventive maintenance with a <strong>FREE monthly unclog</strong> for just $99/month.
                <br />Or save even more with annual plans - <strong>pay for 11 months, get 1 month FREE!</strong>
              </p>

              {/* Annual Savings Highlight */}
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 mb-8">
                <div className="text-sm font-semibold mb-1">💰 ANNUAL PARTNER SAVINGS</div>
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  <div>
                    <strong>Basic:</strong> Save $99/year
                  </div>
                  <div>
                    <strong>Premium:</strong> Save $199/year
                  </div>
                  <div>
                    <strong>Elite:</strong> Save $299/year
                  </div>
                </div>
              </div>

              {/* Two Buttons Side by Side */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

                {/* Button 1: View Property Care Plans (Primary) */}
                <a
                  href="/property-care-plans"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#02b19f] font-bold text-lg rounded-lg hover:bg-gray-100 transition shadow-lg min-w-[250px]"
                >
                  <span className="mr-2">🛡️</span>
                  View Property Care Plans
                </a>

                {/* Button 2: Scheduling Assistant (Existing - Secondary) */}
                <button
                  onClick={() => openAIAssistant('services')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#049d8e] to-[#06756b] text-white font-bold text-lg rounded-lg hover:opacity-90 transition border-2 border-white min-w-[250px]"
                >
                  <span className="mr-2">💬</span>
                  Scheduling Assistant
                </button>
              </div>

              {/* Desktop Note */}
              <p className="text-sm text-white/70 mt-6">
                Handyman service calls starting at $60 for most repairs.
              </p>

            </div>
          </div>
        </section>

        {/* FLOATING BUTTONS - Bottom Right */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-3">
          {/* WhatsApp Button */}
           <a
           href="https://wa.me/526121698328?text=Hi!%20I%27m%20interested%20in%20your%20handyman%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
            style={{
              width: '64px',
              height: '64px',
              boxShadow: '0 8px 24px rgba(34, 197, 94, 0.4), 0 4px 12px rgba(0,0,0,0.2)'
            }}
            aria-label="WhatsApp"
          >
            <svg 
              viewBox="0 0 24 24" 
              width="28" 
              height="28" 
              className="group-hover:scale-110 transition-transform"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>

          {/* AI Chat Button */}
          <button
            onClick={() => openAIAssistant('chat')}
            className="bg-primary hover:bg-primary-hover text-primary-foreground rounded-full p-4 shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
            style={{
              width: '64px',
              height: '64px',
              boxShadow: '0 8px 24px rgba(2, 175, 159, 0.4), 0 4px 12px rgba(0,0,0,0.2)'
            }}
            aria-label="Open chat assistant"
          >
            <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* SecureAIAssistant */}
        <SecureAIAssistant 
          isOpen={isAIAssistantOpen}
          onClose={() => setIsAIAssistantOpen(false)}
          initialMode={aiAssistantMode}
        />

        {/* Service Menu Popup */}
        <ServiceMenuPopup 
          isOpen={serviceMenuOpen}
          onClose={() => setServiceMenuOpen(false)}
          projectType={selectedProject}
          onGetEstimate={() => openAIAssistant('analysis')}
          onScheduleConsultation={() => openAIAssistant('booking')}
        />

        {/* Brand Partner Carousel */}
        <BrandCarousel />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}