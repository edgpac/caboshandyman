import React from 'react';

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Everything you need to know about Cabos Handyman services in Cabo San Lucas
        </p>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        
        {/* FAQ 1 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            What areas do you serve in Los Cabos?
          </h3>
          <p className="text-gray-700 leading-relaxed">
            We provide professional handyman and construction services throughout <strong>Cabo San Lucas</strong> and the entire <strong>Los Cabos area</strong>, including San José del Cabo, the Cabo Corridor, Pacific-side communities, and downtown areas. We're available 24/7 for emergency repairs. Call <a href="tel:+526121698328" className="text-teal-600 font-semibold">+52 612 169 8328</a> to confirm we service your area!
          </p>
        </div>

        {/* FAQ 2 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Do you offer free estimates?
          </h3>
          <p className="text-gray-700 leading-relaxed">
            <strong>Yes!</strong> We provide completely free estimates for all remodeling projects including kitchen and bathroom renovations, painting, tile work, and carpentry. For quick repairs and small jobs, there's a <strong>$100 USD service call fee</strong>, which is fully credited toward your project if you decide to proceed. Call <a href="tel:+526121698328" className="text-teal-600 font-semibold">+52 612 169 8328</a> for your free estimate today!
          </p>
        </div>

        {/* FAQ 3 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Do you offer emergency handyman services?
          </h3>
          <p className="text-gray-700 leading-relaxed">
            <strong>Absolutely!</strong> We offer <strong>24/7 emergency handyman services</strong> for urgent repairs in Cabo San Lucas and Los Cabos. Emergency services include plumbing leaks, burst pipes, electrical issues, power outages, lock-outs, broken doors or windows, water damage, storm damage, and any urgent fixes that can't wait. Call <a href="tel:+526121698328" className="text-teal-600 font-semibold">+52 612 169 8328</a> anytime, day or night!
          </p>
        </div>

        {/* FAQ 4 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            What are your most popular services?
          </h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            Our most popular handyman services in Cabo San Lucas include:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li><strong>Kitchen Remodeling</strong> - Custom cabinets, countertops, backsplash</li>
            <li><strong>Bathroom Remodeling</strong> - Complete renovations, tile work</li>
            <li><strong>TV Mounting & Installation</strong> - All sizes, wall mounting, cable management</li>
            <li><strong>Ceiling Fan Installation</strong> - Standard and high-end fans</li>
            <li><strong>Plumbing Repairs</strong> - Leak repairs, faucet installation</li>
            <li><strong>Electrical Work</strong> - Outlet installation, light fixtures</li>
            <li><strong>Painting Services</strong> - Interior/exterior, residential/commercial</li>
            <li><strong>Drywall Repair</strong> - Holes, cracks, water damage</li>
          </ul>
        </div>

        {/* FAQ 5 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Do you speak English? What payment methods do you accept?
          </h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            <strong>Yes!</strong> We are fully bilingual and speak both <strong>English and Spanish fluently</strong>. Our entire team is comfortable communicating in English.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Payment Methods:</strong> Cash (USD or MXN), Credit Cards (Visa, Mastercard, Amex), Debit Cards, Bank Transfers, and invoicing for property management companies.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-teal-500 text-white rounded-lg p-8 text-center mt-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6">Call us now for immediate assistance</p>
          <a 
            href="tel:+526121698328"
            className="inline-block bg-white text-teal-600 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition-colors"
          >
            Call +52 612 169 8328
          </a>
        </div>

      </div>
    </div>
  );
}
