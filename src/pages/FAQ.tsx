import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

export default function FAQ() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>FAQ - Cabos Handyman | Cabo San Lucas Handyman Services</title>
        <meta name="description" content="Get answers to common questions about Cabos Handyman services in Cabo San Lucas. Free estimates, emergency services, bilingual team, licensed and insured." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What areas do you serve in Los Cabos?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We provide professional handyman and construction services throughout Cabo San Lucas and the entire Los Cabos area, including San José del Cabo, the Cabo Corridor, Pacific-side communities, and downtown areas. We're available 24/7 for emergency repairs. We serve both residential and commercial properties, including vacation rentals and property management companies."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer free estimates?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! We provide completely free estimates for all remodeling projects including kitchen and bathroom renovations, painting, tile work, and carpentry. For quick repairs and small jobs, there's a $60 USD service call fee, which is fully credited toward your project if you decide to proceed."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer emergency handyman services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! We offer 24/7 emergency handyman services for urgent repairs in Cabo San Lucas and Los Cabos. Emergency services include plumbing leaks, burst pipes, electrical issues, power outages, lock-outs, broken doors or windows, water damage, storm damage, and any urgent fixes that can't wait."
                }
              },
              {
                "@type": "Question",
                "name": "What are your most popular services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our most popular handyman services in Cabo San Lucas include: Kitchen Remodeling (custom cabinets, countertops, backsplash), Bathroom Remodeling (complete renovations, tile work), TV Mounting & Installation (all sizes, wall mounting), Ceiling Fan Installation (standard and high-end fans), Plumbing Repairs (leak repairs, faucet installation), Electrical Work (outlet installation, light fixtures), Painting Services (interior/exterior), Drywall Repair (holes, cracks, water damage), Tile Work (floor and wall tile), and Carpentry (custom shelving, door installation)."
                }
              },
              {
                "@type": "Question",
                "name": "Do you speak English? What payment methods do you accept?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! We are fully bilingual and speak both English and Spanish fluently. Our entire team is comfortable communicating in English. Payment Methods: Cash (USD or MXN), Credit Cards (Visa, Mastercard, Amex), Debit Cards, Bank Transfers, and invoicing for property management companies."
                }
              },
              {
                "@type": "Question",
                "name": "What is your service call fee and what does it include?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our service call fee is $60 USD and includes: Professional on-site diagnosis of your issue, first 30 minutes of labor, written estimate for additional work needed, and expert recommendations. This service call fee is fully credited toward your project if you proceed with the work. For large remodeling projects over $1,000, we waive the service call fee entirely and provide free consultations."
                }
              },
              {
                "@type": "Question",
                "name": "How quickly can you respond to service requests?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer same-day service for urgent repairs when you call before noon, and we typically respond to all service requests within 24 hours during business hours. For emergencies, we're available 24/7 with immediate response. For scheduled projects like remodeling work, we can typically start within 3-5 business days depending on project scope and our current workload."
                }
              },
              {
                "@type": "Question",
                "name": "Are you licensed and insured?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Cabos Handyman is fully licensed, insured, and bonded to operate in Cabo San Lucas and throughout Baja California Sur. We carry comprehensive liability insurance to protect both our clients and our team members. With over 20 years of experience in the Los Cabos area and more than 600 completed projects, we maintain the highest standards of professionalism and quality workmanship."
                }
              },
              {
                "@type": "Question",
                "name": "Do you work with property managers and vacation rental owners?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! A significant portion of our business comes from property managers and vacation rental owners throughout Los Cabos. We understand the unique needs of property management - fast turnaround times, flexible scheduling between guest check-outs, detailed invoicing, and reliable communication. We offer same-day emergency repairs, flexible scheduling around guest bookings, detailed photo documentation, net-30 payment terms for established companies, and priority scheduling for property management clients."
                }
              },
              {
                "@type": "Question",
                "name": "What makes Cabos Handyman different from other handymen in Los Cabos?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We stand out through our 20+ years of experience in Los Cabos, fully bilingual team (English and Spanish), 24/7 emergency availability, licensed and insured operations, 600+ completed projects, property management expertise, comprehensive services (from small repairs to full remodels), same-day service availability, and transparent pricing with no hidden fees. We serve both the expat community and local residents with equal dedication to quality and professionalism."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white py-16 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Everything you need to know about <br /> Cabos Handyman services in Cabo San Lucas
          </p>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
          
          {/* FAQ 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              What areas do you serve in Los Cabos?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We provide professional handyman and construction services throughout <strong>Cabo San Lucas</strong> and the entire <strong>Los Cabos area</strong>, including San José del Cabo, the Cabo Corridor, Pacific-side communities, and downtown areas. We're available 24/7 for emergency repairs. Call <a href="tel:+526121698328" className="text-teal-600 font-semibold hover:text-teal-700">+52 612 169 8328</a> to confirm we service your area!
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Do you offer free estimates?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>Yes!</strong> We provide completely free estimates for all remodeling projects including kitchen and bathroom renovations, painting, tile work, and carpentry. For quick repairs and small jobs, there's a <strong>$60 USD service call fee</strong>, which is fully credited toward your project if you decide to proceed. Call <a href="tel:+526121698328" className="text-teal-600 font-semibold hover:text-teal-700">+52 612 169 8328</a> for your free estimate today!
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Do you offer emergency handyman services?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>Absolutely!</strong> We offer <strong>24/7 emergency handyman services</strong> for urgent repairs in Cabo San Lucas and Los Cabos. Emergency services include plumbing leaks, burst pipes, electrical issues, power outages, lock-outs, broken doors or windows, water damage, storm damage, and any urgent fixes that can't wait. Call <a href="tel:+526121698328" className="text-teal-600 font-semibold hover:text-teal-700">+52 612 169 8328</a> anytime, day or night!
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              What are your most popular services?
            </h2>
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
              <li><strong>Tile Work</strong> - Floor and wall tile, grout repair</li>
              <li><strong>Carpentry</strong> - Custom shelving, door installation, trim work</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              With over 20 years of experience and 600+ completed projects, we can handle any home improvement need. Call <a href="tel:+526121698328" className="text-teal-600 font-semibold hover:text-teal-700">+52 612 169 8328</a> to discuss your project!
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Do you speak English? What payment methods do you accept?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>Yes!</strong> We are fully bilingual and speak both <strong>English and Spanish fluently</strong>. Our entire team is comfortable communicating in English, which is especially appreciated by expats, American and Canadian homeowners, vacation rental owners, and international property managers throughout Los Cabos.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Payment Methods:</strong> Cash (USD or MXN), Credit Cards (Visa, Zelle, Mastercard, Amex), Debit Cards, Bank Transfers (both Mexican and international), and invoicing for property management companies.
            </p>
          </div>

          {/* FAQ 6 - NEW */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              What is your service call fee and what does it include?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Our service call fee is <strong>$60 USD</strong> and includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Professional on-site diagnosis of your issue</li>
              <li>First 30 minutes of labor</li>
              <li>Written estimate for additional work needed</li>
              <li>Expert recommendations</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              This service call fee is <strong>fully credited toward your project</strong> if you proceed with the work. For example, if we quote $400 for a repair and you approve the work, you only pay $300 more. For large remodeling projects over $1,000, we waive the service call fee entirely and provide free consultations.
            </p>
          </div>

          {/* FAQ 7 - NEW */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              How quickly can you respond to service requests?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We offer <strong>same day service for urgent repairs</strong> when you call before noon, and we typically respond to all service requests within 24 hours during business hours (Monday-Friday, 7:00 AM - 5:00 PM). For emergencies, we're available <strong>24/7 with immediate response</strong> - call <a href="tel:+526121698328" className="text-teal-600 font-semibold hover:text-teal-700">+52 612 169 8328</a> anytime. For scheduled projects like remodeling work, we can typically start within 3-5 business days depending on project scope and our current workload. We understand that many of our clients are vacation rental owners or property managers who need fast turnaround times, and we prioritize efficient scheduling to minimize downtime for your properties.
            </p>
          </div>

          {/* FAQ 8 - NEW */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Are you licensed and insured?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Yes, Cabos Handyman is <strong>fully licensed, insured, and bonded</strong> to operate in Cabo San Lucas and throughout Baja California Sur. We carry comprehensive liability insurance to protect both our clients and our team members. With over 20 years of experience in the Los Cabos area and more than 600 completed projects, we maintain the highest standards of professionalism and quality workmanship. We comply with all local building codes and regulations.
            </p>
          </div>

          {/* FAQ 9 - NEW */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Do you work with property managers and vacation rental owners?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>Yes!</strong> A significant portion of our business comes from property managers and vacation rental owners throughout Los Cabos. We understand the unique needs of property management - fast turnaround times, flexible scheduling between guest check-outs, detailed invoicing for property owners, and reliable communication.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>We offer:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Same-day emergency repairs to avoid cancellations</li>
              <li>Flexible scheduling around guest bookings</li>
              <li>Detailed photo documentation of all work completed</li>
              <li>Net 30 payment terms for established property management companies</li>
              <li>Direct billing to property owners when needed</li>
              <li>Priority scheduling for our property management clients</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Many property managers keep us on speed dial for their entire portfolio of properties. We're experienced with vacation rental maintenance including beach house repairs, condo maintenance, and villa upkeep. Call <a href="tel:+526121698328" className="text-teal-600 font-semibold hover:text-teal-700">+52 612 169 8328</a> to set up a property management account!
            </p>
          </div>

          {/* FAQ 10 - NEW */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              What makes Cabos Handyman different from other handymen in Los Cabos?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We stand out in several key ways:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>20+ years of experience</strong> specifically in the Los Cabos area</li>
              <li><strong>Fully bilingual team</strong> - English and Spanish fluency</li>
              <li><strong>24/7 emergency availability</strong> - we answer the phone anytime</li>
              <li><strong>Licensed, insured, and bonded</strong> - full legal compliance</li>
              <li><strong>600+ completed projects</strong> - proven track record</li>
              <li><strong>Property management expertise</strong> - we understand rental business needs</li>
              <li><strong>Comprehensive services</strong> - from small repairs to full remodels</li>
              <li><strong>Same day service</strong> - when you need us urgently</li>
              <li><strong>Transparent pricing</strong> - no hidden fees, clear estimates</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              We serve both the expat community and local residents with equal dedication to quality and professionalism. <a href="/contact" className="text-teal-600 font-semibold hover:text-teal-700">Contact us today</a> to experience the difference!
            </p>
          </div>

          {/* CTA */}
          <div className="bg-teal-500 text-white rounded-lg p-8 text-center mt-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-6">Call us now for immediate assistance or visit our contact page</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+526121698328"
                className="inline-block bg-white text-teal-600 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition-colors"
              >
                Call +52 612 169 8328
              </a>
              <a 
                href="/contact"
                className="inline-block bg-teal-600 text-white border-2 border-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-teal-700 transition-colors"
              >
                Contact Page
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}