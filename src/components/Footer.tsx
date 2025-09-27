import React from 'react';
import { Phone, Mail, MapPin, Clock, Wrench } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-sm">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Wrench className="h-6 w-6 text-teal-400" />
              <span className="font-bold text-gray-900">Cabos Handyman</span>
            </div>
            <p className="text-gray-600 text-xs">
              Building visions, shaping the future. Serving Cabo San Lucas.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-900">Contact</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-3 w-3 text-teal-400" />
                <a href="tel:+526121698328" className="hover:text-teal-500 transition-colors">
                  +52 612 169 8328
                </a>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-3 w-3 text-teal-400" />
                <span>24/7 Emergency Service</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-900">Services</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div>Residential Maintenance</div>
              <div>Emergency Services</div>
              <div>Commercial Projects</div>
              <div>HOA & Property Maintenance</div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-900">Legal</h3>
            <div className="flex flex-col space-y-2 text-xs">
              <span className="text-teal-500 font-medium">Licensed • Insured • Bonded</span>
              <span className="text-gray-600">&copy; 2025 Cabos Handyman. All rights reserved.</span>
              <div className="flex space-x-4">
                <a href="#privacy" className="text-gray-600 hover:text-teal-500 transition-colors">Privacy</a>
                <a href="#terms" className="text-gray-600 hover:text-teal-500 transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}