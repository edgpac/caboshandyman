import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Wrench, DollarSign, RefreshCw, Facebook, Calendar, HelpCircle } from 'lucide-react';

export default function Footer() {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [usdAmount, setUsdAmount] = useState('100');
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchExchangeRate = async () => {
    setLoading(true);
    try {
      // Using a free API - you can replace with your preferred service
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      setExchangeRate(data.rates.MXN);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      // Fallback rate if API fails
      setExchangeRate(18.5);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExchangeRate();
    // Update every 30 minutes
    const interval = setInterval(fetchExchangeRate, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const convertedAmount = exchangeRate ? (parseFloat(usdAmount) * exchangeRate).toFixed(2) : '0.00';

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
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-4 w-4 text-teal-400" />
                <a href="tel:+526121698328" className="hover:text-teal-500 transition-colors">
                  +52 612 169 8328
                </a>
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="h-4 w-4 text-teal-400" />
                  <span className="text-sm">Emergency Service:</span>
                </div>
                <div className="ml-6 text-xs text-gray-500">
                  7am-6pm daily<br/>
                  <a href="/property-care-plans" className="text-teal-600 hover:underline">
                    Members: 24/7 access
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Facebook className="h-4 w-4 text-teal-400" />
                <a href="https://www.facebook.com/share/19wvxoz8Cy/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-500 transition-colors">
                  Follow us on Facebook
                </a>
              </div>
              {/* Schedule Service Button */}
              <div className="pt-2">
                <a
                  href="https://cal.com/maintenancemaster/residential-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Schedule Service</span>
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section - REPLACES Services */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-900">Have Questions?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get instant answers to common questions about our services, pricing, and areas we serve.
            </p>
            <a
              href="/faq"
              className="inline-flex items-center space-x-2 bg-white border-2 border-teal-400 text-teal-600 hover:bg-teal-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
              <HelpCircle className="h-4 w-4" />
              <span>View FAQ</span>
            </a>
          </div>

          {/* Currency Converter */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <DollarSign className="h-4 w-4 text-teal-400" />
              <h3 className="font-semibold text-gray-900">USD to Pesos</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={usdAmount}
                  onChange={(e) => setUsdAmount(e.target.value)}
                  className="w-full sm:w-20 px-4 py-3 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="100"
                />
                <span className="text-sm text-gray-600">USD</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-teal-600">
                  ${convertedAmount} MXN
                </span>
                <button
                  onClick={fetchExchangeRate}
                  disabled={loading}
                  className="p-3 text-gray-400 hover:text-teal-500 transition-colors disabled:opacity-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  title="Refresh rate"
                  aria-label="Refresh exchange rate"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
              
              {exchangeRate && (
                <div className="text-xs text-gray-500">
                  Rate: 1 USD = {exchangeRate.toFixed(2)} MXN
                </div>
              )}
              
              {lastUpdated && (
                <div className="text-xs text-gray-400">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Legal - Full Width Bottom Row */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs">
            <div className="flex flex-col items-start md:items-center space-y-1">
              <div className="flex items-center space-x-4">
                <span className="text-teal-500 font-medium">Licensed • Insured • Bonded</span>
                <span className="text-gray-600">&copy; 2026 Cabos Handyman. All rights reserved.</span>
              </div>
              <div className="text-[10px] text-gray-400">
                To hire the architect of this website call +52 612 169 8328
              </div>
            </div>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="/privacy" className="text-gray-600 hover:text-teal-500 transition-colors">Privacy</a>
              <a href="/terms" className="text-gray-600 hover:text-teal-500 transition-colors">Terms</a>
              <a href="/faq" className="text-gray-600 hover:text-teal-500 transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}