import React from 'react';
import { X, Wrench, DollarSign, Clock } from 'lucide-react';

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
        { name: "Ceiling Fan Installation", startingPrice: "$180", duration: "2-3 hours" },
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
        { name: "Pantry Shelving", startingPrice: "$200", duration: "2-4 hours" }
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
        { name: "Bathtub Installation", startingPrice: "$800", duration: "1-2 days" },
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
        { name: "Heated Towel Rack", startingPrice: "$220", duration: "2-3 hours" }
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
        { name: "Flooring Installation", startingPrice: "$12/sq ft", duration: "2-4 days" },
        { name: "Trim Work", startingPrice: "$8/linear ft", duration: "1-2 days" }
      ]
    },
    {
      title: "Home Improvement Basics",
      services: [
        { name: "TV Mounting/Installation", startingPrice: "$120", duration: "1-2 hours" },
        { name: "Picture Hanging", startingPrice: "$40", duration: "30min-1hr" },
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

export default function ServiceMenuPopup({ isOpen, onClose, projectType, onGetEstimate, onScheduleConsultation }: ServiceMenuPopupProps) {
  if (!isOpen) return null;

  const categories = serviceMenus[projectType] || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-teal-500 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{projectType} Services</h2>
            <p className="text-teal-100 mt-1">Starting prices - Final cost may vary based on complexity</p>
            <p className="text-teal-100 text-sm mt-1">We go beyond what's on the menu - use our estimate feature or contact us for custom pricing</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-teal-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Wrench className="h-5 w-5 text-teal-500 mr-2" />
                  {category.title}
                </h3>
                <div className="space-y-3">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="bg-white rounded-lg p-3 border border-gray-200">
                      <h4 className="font-medium text-gray-900 text-sm mb-2">{service.name}</h4>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center text-green-600">
                          <DollarSign className="h-3 w-3 mr-1" />
                          <span className="font-semibold">{service.startingPrice}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                      {service.description && (
                        <p className="text-xs text-gray-600 mt-2">{service.description}</p>
                      )}
                    </div>
                  ))}
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
              className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
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