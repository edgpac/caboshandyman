import React, { useState } from 'react';
import { Clock, Award } from 'lucide-react';

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

const serviceMenus: Record<string, ServiceCategory[]> = {
  "Modern Kitchen": [
    {
      title: "Plumbing Services",
      services: [
        { name: "Sink Installation/Replacement", startingPrice: "$180", duration: "2-4 hours" },
        { name: "Faucet Installation/Replacement", startingPrice: "$120", duration: "1-2 hours" },
        { name: "Garbage Disposal Installation", startingPrice: "$200", duration: "2-3 hours" },
        { name: "Dishwasher Installation", startingPrice: "$250", duration: "3-4 hours" },
        { name: "Kitchen Drain Plumbing", startingPrice: "$150", duration: "2-3 hours" },
        { name: "Shut-off Valve Replacement", startingPrice: "$100", duration: "1-2 hours" },
        { name: "Sink Unclogging", startingPrice: "$80", duration: "30min-1hr" }
      ]
    },
    {
      title: "Electrical Services",
      services: [
        { name: "Ceiling Light Installation", startingPrice: "$120", duration: "1-2 hours" },
        { name: "Ceiling Fan Installation", startingPrice: "$125", duration: "2-3 hours" },
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
        { name: "Toilet Installation/Replacement", startingPrice: "$200", duration: "2-3 hours" },
        { name: "Vanity Installation", startingPrice: "$280", duration: "3-4 hours" },
        { name: "Shower Installation", startingPrice: "$600", duration: "1-2 days" },
        { name: "Toilet/Tub Unclogging", startingPrice: "$80", duration: "1-3 hours" },
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
      title: "Home Improvement Basics",
      services: [
        { name: "TV Mounting/Installation", startingPrice: "$125", duration: "1-2 hours" },
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

export default function VisualServiceMenu() {
  const projectTypes = Object.keys(serviceMenus);
  const [activeProject, setActiveProject] = useState(projectTypes[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-12 px-4">
      <div className="w-full max-w-6xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        {/* Menu Header - Elegant Restaurant Style */}
        <div className="bg-gradient-to-r from-teal-800 to-teal-700 text-white py-8 px-8">
          <div className="text-center border-b border-teal-500 pb-6 mb-6">
            <h1 className="text-5xl font-serif font-bold tracking-wide mb-2">
              Cabo's Handyman Service Menu
            </h1>
            <div className="flex items-center justify-center gap-2 text-teal-200">
              <Award className="h-4 w-4" />
              <p className="text-sm uppercase tracking-widest">Licensed & Insured in Cabo San Lucas</p>
            </div>
          </div>
          
          {/* Project Type Selector - Like Menu Sections */}
          <div className="flex flex-wrap justify-center gap-3">
            {projectTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveProject(type)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                  activeProject === type
                    ? "bg-white text-teal-800 shadow-lg scale-105"
                    : "bg-teal-700 text-teal-100 hover:bg-teal-600 border border-teal-600"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Content - Two Column Restaurant Layout */}
        <div className="bg-gradient-to-b from-amber-50 to-white p-10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-1">
              {activeProject}
            </h2>
            <p className="text-sm text-gray-500 italic">Starting prices · Materials additional</p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {serviceMenus[activeProject]?.map((category, idx) => (
              <div key={idx}>
                {/* Category Title with Decorative Line */}
                <div className="mb-6">
                  <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2 text-center">
                    {category.title}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent w-full"></div>
                  </div>
                </div>

                {/* Service Items */}
                <div className="space-y-4">
                  {category.services.map((service: ServiceItem, sidx: number) => (
                    <div key={sidx} className="group">
                      {/* Service Name and Price Line */}
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <span className="font-medium text-gray-800 leading-tight flex-grow">
                          {service.name}
                        </span>
                        <span className="font-semibold text-teal-700 whitespace-nowrap text-lg">
                          {service.startingPrice}
                        </span>
                      </div>
                      
                      {/* Dotted Line - Classic Menu Style */}
                      <div className="border-b border-dotted border-gray-300 mb-1"></div>
                      
                      {/* Duration */}
                      <div className="flex items-center text-xs text-gray-500 italic">
                        <Clock className="h-3 w-3 mr-1.5" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Menu Footer Notes */}
          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
              <h4 className="font-serif font-semibold text-gray-900 mb-3 text-center text-lg">
                Important Notes
              </h4>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700">
                <p>• Prices are starting estimates based on standard installations</p>
                <p>• Material costs additional unless specified</p>
                <p>• Emergency services available 24/7 with premium rates</p>
                <p>• All work includes 1-year workmanship warranty</p>
                <p>• Custom projects welcome - contact for pricing</p>
                <p>• Free estimates and consultations available</p>
              </div>
            </div>
          </div>

          {/* Bottom Tagline */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 italic font-serif">
              "Beyond what's on the menu - We bring your vision to life"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
