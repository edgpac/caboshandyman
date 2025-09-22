import React, { useState } from 'react';
import { Phone, Mail, MapPin, Calendar, ArrowRight, MessageCircle } from 'lucide-react';
import SecureAIAssistant from './SecureAIAssistant';
import partnersImage from '../assets/partners-section.png';
import kitchenImage from '../assets/modern-kitchen-remodel.jpeg';
import bathroomImage from '../assets/luxury-bathroom.jpeg';
import officeImage from '../assets/commercial-office.jpeg';
import communityImage from '../assets/community-center.jpeg';
import restaurantImage from '../assets/restaurant-buildout.jpeg';
import homeImage from '../assets/home-addition.jpeg';

export default function CabosHandymanHomepage() {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [aiAssistantMode, setAiAssistantMode] = useState('services'); // 'services', 'booking', 'estimate'

  const projects = [
    { 
      name: "Modern Kitchen Remodel", 
      category: "Residential", 
      image: kitchenImage
    },
    { 
      name: "Luxury Bathroom", 
      category: "Residential", 
      image: bathroomImage
    },
    { 
      name: "Commercial Office", 
      category: "Commercial", 
      image: officeImage
    },
    { 
      name: "Community Center", 
      category: "HOA", 
      image: communityImage
    },
    { 
      name: "Restaurant Buildout", 
      category: "Commercial", 
      image: restaurantImage
    },
    { 
      name: "Home Addition", 
      category: "Residential", 
      image: homeImage
    }
  ];

  const openAIAssistant = (mode = 'services') => {
    setAiAssistantMode(mode);
    setIsAIAssistantOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-dark-surface text-white py-4 sticky top-0 z-40">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">CH</span>
            </div>
            <span className="text-xl font-bold text-primary">CABOS HANDYMAN</span>
          </div>
          <div className="hidden md:flex space-x-8">
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-dark-surface text-white py-20 min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <video 
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-30"
          >
            <source src="/videos/hero-construction-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-surface via-dark-surface-elevated to-dark-surface opacity-80"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🏗️ Cabo San Lucas' Premier Handyman Service
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-primary">
                BUILDING VISIONS,<br />
                SHAPING THE FUTURE.
            </h1>
            <p className="text-xl md:text-2xl text-primary mb-8 max-w-3xl mx-auto">
              20 years of construction expertise, serving Cabo San Lucas since 2019 with quality craftsmanship and reliable service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => openAIAssistant('booking')}
                className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 rounded-lg text-lg font-bold transition-colors flex items-center justify-center"
              >
                Get Free Estimate
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
            <div className="text-center mt-2">
              <p className="text-xs text-gray-400">
                Full scheduling and analysis features work best on desktop/laptop computers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">6+</div>
              <div className="text-muted-foreground font-semibold">Years Experience</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">300+</div>
              <div className="text-muted-foreground font-semibold">Projects Completed</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground font-semibold">Customer Service</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground font-semibold">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">We Build Projects That Last</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our portfolio of completed projects across residential, commercial, and community spaces
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-64 bg-muted overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary font-semibold mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <button className="mt-4 text-primary font-semibold text-sm hover:text-primary-hover transition-colors">
                    View Project Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <img 
              src={partnersImage} 
              alt="Our Partners - Opendoor, Invitation Homes, Concord Consulting, Quanta Finance, London Management, PMP Management, Community Memorial Healthcare, and CPM"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{backgroundColor: '#02af9f'}}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Chat with our assistant to explore our services, get instant estimates, schedule emergency service, or book your free consultation.
          </p>
          <button 
            onClick={() => openAIAssistant('services')}
            className="px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center bg-white text-black shadow-lg hover:shadow-2xl"
            style={{
              boxShadow: '0 8px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
              transform: 'translateY(0)',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px) scale(1.05)';
              e.target.style.boxShadow = '0 12px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.9)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)';
            }}
          >
            Start with our Assistant
            <MessageCircle className="ml-2" size={20} />
          </button>
          <div className="text-center mt-2">
            <p className="text-xs text-white/70">
              Full scheduling and analysis features work best on desktop/laptop computers
            </p>
          </div>
        </div>
      </section>

      {/* SecureAIAssistant */}
      <SecureAIAssistant 
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        initialMode={aiAssistantMode}
      />
    </div>
  );
}