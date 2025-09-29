import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Wrench, DollarSign, RefreshCw, Facebook } from 'lucide-react';

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
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-3 w-3 text-teal-400" />
                <a href="tel:+526121698328" className="hover:text-teal-500 transition-colors">
                  +52 612 169 8328
                </a>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-3 w-3 text-teal-400" />
                <a href="tel:+526121698328" className="hover:text-teal-500 transition-colors">
                  24/7 Emergency Service
                </a>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Facebook className="h-3 w-3 text-teal-400" />
                <a href="https://www.facebook.com/share/19wvxoz8Cy/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-500 transition-colors">
                  Follow us on Facebook
                </a>
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
                  className="w-16 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-400"
                  placeholder="100"
                />
                <span className="text-xs text-gray-600">USD</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-teal-600">
                  ${convertedAmount} MXN
                </span>
                <button
                  onClick={fetchExchangeRate}
                  disabled={loading}
                  className="p-1 text-gray-400 hover:text-teal-500 transition-colors disabled:opacity-50"
                  title="Refresh rate"
                >
                  <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
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
            <div className="flex items-center space-x-4 mb-2 md:mb-0">
              <span className="text-teal-500 font-medium">Licensed • Insured • Bonded</span>
              <span className="text-gray-600">&copy; 2025 Cabos Handyman. All rights reserved.</span>
            </div>
            <div className="flex space-x-4">
              <a href="#privacy" className="text-gray-600 hover:text-teal-500 transition-colors">Privacy</a>
              <a href="#terms" className="text-gray-600 hover:text-teal-500 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}