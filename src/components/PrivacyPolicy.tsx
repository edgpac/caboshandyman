import React from 'react';
import { ArrowLeft, Shield, Phone, Mail, MapPin } from 'lucide-react';

export default function PrivacyPolicy() {
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
            <Shield className="h-8 w-8 text-teal-400" />
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-gray-300 mt-2">Cabos Handyman - Effective Date: January 1, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              When you use our services or contact us, we may collect the following information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Contact Information:</strong> Name, phone number, email address, and property address</li>
              <li><strong>Service Information:</strong> Details about your maintenance or construction needs</li>
              <li><strong>Photos:</strong> Images you provide of maintenance issues for our AI analysis tool</li>
              <li><strong>Communication Records:</strong> Messages, calls, and correspondence with our team</li>
              <li><strong>Website Usage:</strong> Basic analytics about how you use our website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide handyman and construction services</li>
              <li>Schedule appointments and consultations</li>
              <li>Analyze maintenance issues using our AI tools</li>
              <li>Send service confirmations and updates via SMS or email</li>
              <li>Provide customer support and emergency services</li>
              <li>Improve our services and website functionality</li>
              <li>Comply with legal requirements and business operations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell or rent your personal information. We may share information only in these circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Service Providers:</strong> With trusted partners who help us deliver services (payment processing, scheduling, communications)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfer:</strong> In connection with a merger, sale, or transfer of business assets</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate security measures to protect your information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Secure data transmission and storage</li>
              <li>Limited access to personal information on a need-to-know basis</li>
              <li>Regular security assessments and updates</li>
              <li>Secure disposal of information when no longer needed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Opt out of marketing communications</li>
              <li>Request information about how we use your data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              Our website may use cookies and similar technologies to improve your experience and analyze website usage. 
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              We use third-party services including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Twilio:</strong> For SMS notifications and communications</li>
              <li><strong>Cal.com:</strong> For appointment scheduling</li>
              <li><strong>Email Services:</strong> For business communications</li>
              <li><strong>AI Analysis Tools:</strong> For maintenance issue assessment</li>
            </ul>
            <p className="text-gray-700 mt-4">
              These services have their own privacy policies, and we encourage you to review them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-700">
              We retain your information for as long as necessary to provide services, comply with legal obligations, 
              and resolve disputes. Customer service records are typically retained for 3-7 years for business and legal purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this Privacy Policy or want to exercise your rights, contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-teal-500" />
                  <span className="text-gray-700">+52 612 169 8328</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-teal-500" />
                  <span className="text-gray-700">privacy@caboshandyman.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-teal-500" />
                  <span className="text-gray-700">Cabo San Lucas, Mexico</span>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Policy Updates</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy periodically. We will notify you of significant changes by posting 
              the updated policy on our website with a new effective date. Your continued use of our services 
              constitutes acceptance of the updated policy.
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
