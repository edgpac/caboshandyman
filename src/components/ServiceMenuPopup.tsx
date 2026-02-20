import React from 'react';
import { X, Wrench, DollarSign, Clock, Home, Star, Droplet, ArrowRight } from 'lucide-react';

interface ServiceItem {
  name: string;
  startingPrice: string;
  duration: string;
  description?: string;
}

interface ServiceCategory {
  title: string;
  services: ServiceItem[];
}

interface ServiceMenuPopupProps {
  isOpen: boolean;
  onClose: () => void;
  projectType: string;
  onGetEstimate?: () => void;
  onScheduleConsultation?: () => void;
}

const serviceMenus: Record<string, ServiceCategory[]> = {
  "Modern Kitchen": [
    {
      title: "Plumbing Services",
      services: [
        { name: "Sink Installation/Replacement", startingPrice: "$180", duration: "2-4 hours" },
        { name: "Faucet Installation Cabo San Lucas", startingPrice: "$120", duration: "1-2 hours" },
        { name: "Garbage Disposal Installation Cabo", startingPrice: "$200", duration: "2-3 hours" },
        { name: "Dishwasher Installation", startingPrice: "$250", duration: "3-4 hours" },
        { name: "Kitchen Drain Plumbing", startingPrice: "$150", duration: "2-3 hours" },
        { name: "Shut-off Valve Replacement", startingPrice: "$100", duration: "1-2 hours" },
        { name: "Sink Unclogging Cabo San Lucas", startingPrice: "$60", duration: "30min-1hr" }
      ]
    },
    {
      title: "Electrical Services",
      services: [
        { name: "Ceiling Light Installation", startingPrice: "$120", duration: "1-2 hours" },
        { name: "Ceiling Fan Installation Cabo San Lucas", startingPrice: "$125", duration: "2-3 hours" },
        { name: "Outlet Installation/Replacement", startingPrice: "$90", duration: "1 hour" },
        { name: "Under-Cabinet Lighting", startingPrice: "$160", duration: "2-3 hours" },
        { name: "Kitchen Island Electrical", startingPrice: "$220", duration: "3-4 hours" },
        { name: "Smoke Detector Replacement", startingPrice: "$80", duration: "30min-1hr" }
      ]
    },
    {
      title: "Installation & Carpentry",
      services: [
        { name: "Cabinet Installation", startingPrice: "$300", duration: "4-8 hours" },
        { name: "Countertop Installation", startingPrice: "$400", duration: "4-6 hours" },
        { name: "Backsplash Installation", startingPrice: "$250", duration: "3-5 hours" },
        { name: "Kitchen Hardware Installation", startingPrice: "$80", duration: "1-2 hours" },
        { name: "Pantry Shelving", startingPrice: "$200", duration: "2-4 hours" },
        { name: "Wall Panels", startingPrice: "$150", duration: "2-4 hours" },
        { name: "Furniture Assembly", startingPrice: "$65", duration: "1-2 hours" }
      ]
    }
  ],
  "Luxury Bathroom": [
    {
      title: "Plumbing Services",
      services: [
        { name: "Toilet Installation Cabo San Lucas", startingPrice: "$200", duration: "2-3 hours" },
        { name: "Vanity Installation Cabo San Lucas", startingPrice: "$280", duration: "3-4 hours" },
        { name: "Shower Installation Cabo San Lucas", startingPrice: "$600", duration: "1-2 days" },
        { name: "Toilet & Tub Unclogging Cabo San Lucas", startingPrice: "$60", duration: "30min-1 hour" },
        { name: "Bathroom Faucet Installation", startingPrice: "$120", duration: "1-2 hours" },
        { name: "Shower Head Replacement", startingPrice: "$80", duration: "30min-1hr" }
      ]
    },
    {
      title: "Electrical & Ventilation",
      services: [
        { name: "Bathroom Lighting", startingPrice: "$100", duration: "1-2 hours" },
        { name: "Exhaust Fan Installation", startingPrice: "$180", duration: "2-3 hours" },
        { name: "GFCI Outlet Installation", startingPrice: "$120", duration: "1-2 hours" },
        { name: "Heated Towel Rack", startingPrice: "$220", duration: "2-3 hours" },
        { name: "Electrical Mirrors", startingPrice: "$125", duration: "1-2 hours" }
      ]
    },
    {
      title: "Installation & Accessories",
      services: [
        { name: "Tile Installation", startingPrice: "$12/sq ft", duration: "1-3 days" },
        { name: "Grout Repair/Replacement", startingPrice: "$8/sq ft", duration: "1-2 days" },
        { name: "Bathroom Flooring", startingPrice: "$15/sq ft", duration: "1-2 days" },
        { name: "Shower Waterproofing", startingPrice: "$300", duration: "1 day" },
        { name: "Towel Rack/Holder Installation", startingPrice: "$60", duration: "30min-1hr" },
        { name: "Mirror Hanging/Installation", startingPrice: "$80", duration: "1 hour" },
        { name: "Bathroom Shelving", startingPrice: "$120", duration: "1-2 hours" }
      ]
    }
  ],
  "Commercial Office": [
    {
      title: "Electrical Systems",
      services: [
        { name: "Office Lighting Installation", startingPrice: "$150", duration: "2-3 hours" },
        { name: "Outlet Installation", startingPrice: "$100", duration: "1-2 hours" },
        { name: "Data Cable Installation", startingPrice: "$80", duration: "1-2 hours" },
        { name: "Panel Upgrade", startingPrice: "$600", duration: "4-6 hours" }
      ]
    },
    {
      title: "Office Buildout",
      services: [
        { name: "Partition Wall Installation", startingPrice: "$25/sq ft", duration: "1-2 days" },
        { name: "Office Door Installation", startingPrice: "$300", duration: "2-4 hours" },
        { name: "Drop Ceiling Installation", startingPrice: "$8/sq ft", duration: "1-2 days" },
        { name: "Flooring Installation", startingPrice: "$12/sq ft", duration: "1-3 days" }
      ]
    },
    {
      title: "HVAC & Climate",
      services: [
        { name: "Mini-Split Installation", startingPrice: "$800", duration: "4-6 hours" },
        { name: "Ductwork Installation", startingPrice: "$20/linear ft", duration: "1-2 days" },
        { name: "Ventilation Fan Installation", startingPrice: "$200", duration: "2-3 hours" }
      ]
    }
  ],
  "Community Center": [
    {
      title: "Maintenance Services",
      services: [
        { name: "Trash Removal Service", startingPrice: "$150", duration: "2-4 hours" },
        { name: "Pool Pump Replacement", startingPrice: "$400", duration: "3-4 hours" },
        { name: "Pool Equipment Maintenance", startingPrice: "$120", duration: "1-2 hours" },
        { name: "Landscape Maintenance", startingPrice: "$200", duration: "4-6 hours" }
      ]
    },
    {
      title: "Facility Repairs",
      services: [
        { name: "Common Area Lighting", startingPrice: "$180", duration: "2-3 hours" },
        { name: "Door Lock Replacement", startingPrice: "$150", duration: "1-2 hours" },
        { name: "Window Repair", startingPrice: "$120", duration: "1-3 hours" },
        { name: "Paint Touch-ups", startingPrice: "$8/sq ft", duration: "2-4 hours" }
      ]
    },
    {
      title: "Safety & Security",
      services: [
        { name: "Emergency Exit Lighting", startingPrice: "$200", duration: "2-3 hours" },
        { name: "Fire Extinguisher Installation", startingPrice: "$80", duration: "30min-1hr" },
        { name: "Security Camera Installation", startingPrice: "$250", duration: "2-4 hours" }
      ]
    }
  ],
  "Restaurant Buildout": [
    {
      title: "Kitchen Equipment",
      services: [
        { name: "Commercial Sink Installation", startingPrice: "$400", duration: "4-6 hours" },
        { name: "Grease Trap Installation", startingPrice: "$600", duration: "6-8 hours" },
        { name: "Exhaust Hood Installation", startingPrice: "$800", duration: "1 day" },
        { name: "Gas Line Installation", startingPrice: "$300", duration: "3-4 hours" },
        { name: "Hot Water Heater Installation", startingPrice: "$500", duration: "4-6 hours" },
        { name: "Water Leak Detector Installation", startingPrice: "$150", duration: "1-2 hours" }
      ]
    },
    {
      title: "Dining Area",
      services: [
        { name: "Booth Installation", startingPrice: "$400", duration: "4-6 hours" },
        { name: "Bar Installation", startingPrice: "$600", duration: "1-2 days" },
        { name: "Decorative Lighting", startingPrice: "$200", duration: "2-4 hours" },
        { name: "Sound System Installation", startingPrice: "$500", duration: "4-6 hours" }
      ]
    },
    {
      title: "Compliance & Safety",
      services: [
        { name: "ADA Compliance Modifications", startingPrice: "$300", duration: "4-8 hours" },
        { name: "Fire Suppression System", startingPrice: "$1200", duration: "1-2 days" },
        { name: "Emergency Lighting", startingPrice: "$250", duration: "2-3 hours" }
      ]
    }
  ],
  "Home Addition": [
    {
      title: "Structural Work",
      services: [
        { name: "Foundation Work", startingPrice: "$50/sq ft", duration: "3-5 days" },
        { name: "Framing", startingPrice: "$15/sq ft", duration: "2-4 days" },
        { name: "Roofing", startingPrice: "$12/sq ft", duration: "1-3 days" },
        { name: "Siding Installation", startingPrice: "$10/sq ft", duration: "2-3 days" }
      ]
    },
    {
      title: "Interior Finishing",
      services: [
        { name: "Drywall Installation", startingPrice: "$3/sq ft", duration: "2-3 days" },
        { name: "Interior Painting", startingPrice: "$2/sq ft", duration: "2-3 days" },
        { name: "Wall Panels", startingPrice: "$4/sq ft", duration: "2-3 days" },
        { name: "Flooring Installation", startingPrice: "$12/sq ft", duration: "2-4 days" },
        { name: "Trim Work", startingPrice: "$8/linear ft", duration: "1-2 days" }
      ]
    },
    {
      title: "Emergency Plumbing Services",
      services: [
        { name: "Toilet Unclogging Cabo San Lucas", startingPrice: "$60", duration: "30min-1 hour" },
        { name: "Tub & Shower Drain Cleaning", startingPrice: "$60", duration: "30min-1 hour" },
        { name: "Kitchen Sink Drain Cleaning", startingPrice: "$60", duration: "30min-1 hour" },
        { name: "Main Sewer Line Cleaning", startingPrice: "$150", duration: "2-4 hours" }
      ]
    },
    {
      title: "Home Improvement Basics",
      services: [
        { name: "TV Mounting Cabo San Lucas", startingPrice: "$125", duration: "1-2 hours" },
        { name: "Artwork, Small Mirrors & Decorative Pieces", startingPrice: "$40", duration: "30min-1hr" },
        { name: "Starlink installation", startingPrice: "$80", duration: "1hr-2hr" },
        { name: "Shelf Installation", startingPrice: "$80", duration: "1-2 hours" },
        { name: "Curtain Rod Installation", startingPrice: "$60", duration: "30min-1hr" },
        { name: "Furniture Assembly", startingPrice: "$100", duration: "1-3 hours" },
        { name: "Door Handle/Lock Installation", startingPrice: "$80", duration: "1 hour" }
      ]
    },
    {
      title: "Systems Integration",
      services: [
        { name: "Electrical Rough-in", startingPrice: "$8/sq ft", duration: "1-2 days" },
        { name: "Plumbing Rough-in", startingPrice: "$12/sq ft", duration: "2-3 days" },
        { name: "HVAC Extension", startingPrice: "$25/sq ft", duration: "1-2 days" }
      ]
    }
  ]
};

// Helper function to determine if a service should be clickable and get its link
function getServiceLink(serviceName: string): string | null {
  const linkMap: Record<string, string> = {
    // Category page links
    "Modern Kitchen": "/kitchen-services-cabo",
    "Luxury Bathroom": "/bathroom-services-cabo",
    "Electrical Services": "/electrical-services-cabo",
    // Individual service page links
    "Ceiling Fan Installation Cabo San Lucas": "/ceiling-fan-installation-cabo",
    "TV Mounting Cabo San Lucas": "/tv-mounting-cabo",
    "Furniture Assembly": "/furniture-assembly-cabo",
    "Toilet & Tub Unclogging Cabo San Lucas": "/toilet-tub-unclogging-cabo",
    "Toilet Unclogging Cabo San Lucas": "/toilet-tub-unclogging-cabo",
    "Sink Unclogging Cabo San Lucas": "/toilet-tub-unclogging-cabo",
    "Tub & Shower Drain Cleaning": "/toilet-tub-unclogging-cabo",
    "Kitchen Sink Drain Cleaning": "/toilet-tub-unclogging-cabo"
  };

  return linkMap[serviceName] || null;
}

export default function ServiceMenuPopup({ isOpen, onClose, projectType, onGetEstimate, onScheduleConsultation }: ServiceMenuPopupProps) {
  if (!isOpen) return null;

  const categories = serviceMenus[projectType] || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{projectType} Services</h2>
            <p className="text-teal-100 mt-1">Starting prices - Final cost may vary based on complexity</p>
            <p className="text-teal-100 text-sm mt-1">We go beyond what's on the menu - use our estimate feature or contact us for custom pricing</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-teal-200 transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Featured Service Cards */}
          <div className="mb-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/property-setup-cabo"
              className="bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-500 rounded-lg p-4 hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-br from-[#2dd4bf] to-[#06756b] w-10 h-10 rounded-full flex items-center justify-center">
                  <Home className="text-white" size={20} />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-teal-600 transition-colors">Property Setup</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Complete move-in packages</p>
              <div className="flex items-center gap-1 text-teal-600 font-semibold text-sm">
                <span>Learn More</span>
                <ArrowRight size={14} />
              </div>
            </a>

            <a
              href="/vacation-rental-setup-cabo"
              className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 rounded-lg p-4 hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
                  <Star className="text-white" size={20} />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Rental Service</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Airbnb/VRBO maintenance</p>
              <div className="flex items-center gap-1 text-blue-600 font-semibold text-sm">
                <span>Learn More</span>
                <ArrowRight size={14} />
              </div>
            </a>

            <a
              href="/plumber-cabo-san-lucas"
              className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-500 rounded-lg p-4 hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-cyan-500 w-10 h-10 rounded-full flex items-center justify-center">
                  <Droplet className="text-white" size={20} />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">Plumber 24/7</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Emergency plumbing service</p>
              <div className="flex items-center gap-1 text-cyan-600 font-semibold text-sm">
                <span>Learn More</span>
                <ArrowRight size={14} />
              </div>
            </a>

            <a
              href="/services"
              className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-400 rounded-lg p-4 hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center">
                  <Wrench className="text-white" size={20} />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-gray-700 transition-colors">All Services</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Browse 70+ services</p>
              <div className="flex items-center gap-1 text-gray-700 font-semibold text-sm">
                <span>View Menu</span>
                <ArrowRight size={14} />
              </div>
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Wrench className="h-5 w-5 text-teal-500 mr-2" />
                  {category.title}
                </h3>
                <div className="space-y-3">
                  {category.services.map((service, serviceIndex) => {
                    const serviceLink = getServiceLink(service.name);
                    const ServiceWrapper = serviceLink ? 'a' : 'div';
                    const wrapperProps = serviceLink
                      ? { href: serviceLink, className: "bg-white rounded-lg p-3 border border-gray-200 block hover:border-teal-500 hover:shadow-md transition-all cursor-pointer" }
                      : { className: "bg-white rounded-lg p-3 border border-gray-200" };

                    return (
                      <ServiceWrapper key={serviceIndex} {...wrapperProps}>
                        <h4 className="font-medium text-gray-900 text-base mb-2 flex items-center justify-between">
                          <span>{service.name}</span>
                          {serviceLink && <ArrowRight className="text-teal-500" size={16} />}
                        </h4>
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center text-green-600">
                            <DollarSign className="h-4 w-4 mr-1" />
                            <span className="font-semibold text-base">{service.startingPrice}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{service.duration}</span>
                          </div>
                        </div>
                        {service.description && (
                          <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                        )}
                      </ServiceWrapper>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Notes */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Important Notes:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Prices shown are starting estimates and may vary based on project complexity</li>
              <li>• Material costs are additional unless specified</li>
              <li>• Emergency services available 24/7 with premium rates</li>
              <li>• All work includes 1-year workmanship warranty</li>
              <li>• Licensed, insured, and bonded in Cabo San Lucas</li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => {
                onClose();
                if (onGetEstimate) {
                  onGetEstimate();
                }
              }}
              className="flex-1 bg-gradient-to-r from-[#2dd4bf] via-[#049d8e] to-[#06756b] hover:opacity-90 text-white py-3 px-6 rounded-lg font-semibold transition-all"
            >
              Get Free Estimate
            </button>
            <button 
              onClick={() => {
                onClose();
                if (onScheduleConsultation) {
                  onScheduleConsultation();
                }
              }}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}