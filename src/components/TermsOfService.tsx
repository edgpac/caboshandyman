import React from 'react';
import { ArrowLeft, FileText, Phone, Mail, MapPin } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Site</span>
          </button>
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-teal-400" />
            <h1 className="text-3xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-gray-300 mt-2">Cabos Handyman - Effective Date: January 1, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 mb-4">
              By using our website, scheduling services, or engaging Cabos Handyman for any work, you agree to these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Services Offered</h2>
            <p className="text-gray-700 mb-4">Cabos Handyman provides:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Residential maintenance and repair services</li>
              <li>Commercial construction and renovation projects</li>
              <li>Emergency repair services</li>
              <li>HOA and property maintenance</li>
              <li>Kitchen and bathroom remodeling</li>
              <li>Electrical and plumbing services</li>
              <li>AI-powered maintenance issue analysis</li>
              <li>Free estimates and consultations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Scheduling and Estimates</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Appointments:</strong> All service appointments must be scheduled in advance through our website, phone, or AI assistant</li>
              <li><strong>Emergency Services:</strong> Available 24/7 with 30-minute response time goals, subject to weather and accessibility</li>
              <li><strong>Estimates:</strong> Free estimates are provided for informational purposes and may change based on actual conditions discovered during work</li>
              <li><strong>AI Analysis:</strong> Our AI tool provides preliminary assessments only and does not replace professional inspection</li>
              <li><strong>Cancellations:</strong> Service cancellations must be made at least 24 hours in advance to avoid cancellation fees</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Terms</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Payment Due:</strong> Payment is due upon completion of work unless other arrangements are made in writing</li>
              <li><strong>Accepted Methods:</strong> Cash, check, bank transfer, and major credit cards</li>
              <li><strong>Late Payments:</strong> Overdue accounts may be subject to 1.5% monthly service charges</li>
              <li><strong>Change Orders:</strong> Any changes to the original scope of work must be approved in writing and may affect pricing</li>
              <li><strong>Materials:</strong> Customer is responsible for material costs unless included in the quoted price</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Customer Responsibilities</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Property Access:</strong> Provide safe and reasonable access to work areas</li>
              <li><strong>Utilities:</strong> Ensure adequate electrical power and water access as needed</li>
              <li><strong>Permits:</strong> Obtain any required permits unless specifically included in our services</li>
              <li><strong>Property Protection:</strong> Remove or protect valuable items in work areas</li>
              <li><strong>Accurate Information:</strong> Provide complete and accurate information about the work needed</li>
              <li><strong>Safety:</strong> Maintain a safe work environment and remove pets from work areas</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Warranties and Guarantees</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Workmanship:</strong> We guarantee our workmanship for 1 year from completion date</li>
              <li><strong>Materials:</strong> Material warranties are provided by manufacturers; we will assist with warranty claims</li>
              <li><strong>Emergency Repairs:</strong> Temporary emergency repairs carry a 30-day guarantee</li>
              <li><strong>Exclusions:</strong> Normal wear and tear, damage from misuse, or modifications by others are not covered</li>
              <li><strong>Remedy:</strong> Our obligation is limited to correcting defective work at no charge</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Liability and Insurance</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Insurance:</strong> We maintain liability insurance and are fully licensed and bonded</li>
              <li><strong>Property Damage:</strong> We are responsible for damage directly caused by our negligence</li>
              <li><strong>Limitation:</strong> Our liability is limited to the value of services performed</li>
              <li><strong>Existing Conditions:</strong> We are not liable for pre-existing conditions or hidden defects</li>
              <li><strong>Force Majeure:</strong> We are not responsible for delays due to weather, natural disasters, or circumstances beyond our control</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Website and AI Tools</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>AI Analysis:</strong> Our AI tools provide estimates only and do not guarantee final pricing</li>
              <li><strong>Accuracy:</strong> While we strive for accuracy, AI assessments are preliminary and subject to professional verification</li>
              <li><strong>User Content:</strong> Photos and information you provide may be used to improve our services</li>
              <li><strong>Website Use:</strong> You agree not to misuse our website or attempt to interfere with its operation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibent text-gray-900 mb-4">Dispute Resolution</h2>
            <p className="text-gray-700 mb-4">
              We are committed to resolving any issues promptly and fairly:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Direct Communication:</strong> Contact us immediately if you have concerns about our work</li>
              <li><strong>Good Faith:</strong> We will work in good faith to resolve disputes quickly</li>
              <li><strong>Governing Law:</strong> These terms are governed by Mexican law and Baja California Sur jurisdiction</li>
              <li><strong>Arbitration:</strong> If resolution cannot be reached, disputes may be submitted to binding arbitration</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>All website content, designs, and AI tools are proprietary to Cabos Handyman</li>
              <li>You may not reproduce, distribute, or create derivative works without permission</li>
              <li>Work performed becomes part of your property upon full payment</li>
              <li>We retain the right to use photos of completed work for marketing purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-700 mb-4">
              Either party may terminate services with reasonable notice. In case of termination:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Payment is due for all work completed</li>
              <li>Materials purchased become property of the customer</li>
              <li>We will make reasonable efforts to leave work areas in safe condition</li>
              <li>Both parties are released from future obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For questions about these Terms of Service or our services:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-teal-500" />
                  <span className="text-gray-700">+52 612 169 8328</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-teal-500" />
                  <span className="text-gray-700">info@caboshandyman.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-teal-500" />
                  <span className="text-gray-700">Cabo San Lucas, Baja California Sur, Mexico</span>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700">
              We may update these Terms of Service periodically. Significant changes will be posted on our website 
              with a new effective date. Continued use of our services constitutes acceptance of updated terms.
            </p>
          </section>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <p className="text-sm text-gray-500 text-center">
              Last updated: January 1, 2025 | Cabos Handyman | Licensed • Insured • Bonded
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
