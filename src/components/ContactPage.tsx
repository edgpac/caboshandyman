import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Wrench, AlertCircle } from 'lucide-react';
import Footer from './Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    urgency: 'normal',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    
    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          urgency: formData.urgency,
          message: formData.message,
          timestamp: new Date().toISOString()
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          urgency: 'normal',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <Wrench className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get In Touch
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-teal-50">
            Licensed, insured, and ready to help with your home improvement project in Cabo San Lucas
          </p>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-4 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <p className="font-semibold">
              EMERGENCY? Call or WhatsApp +52 612 169 8328 for 24/7 immediate service
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-teal-100 p-3 rounded-xl flex-shrink-0">
                      <Phone className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-900">Phone</h3>
                      <a href="tel:+526121698328" className="text-lg text-gray-700 hover:text-teal-600 transition-colors">
                        +52 612 169 8328
                      </a>
                      <p className="text-sm text-gray-600 mt-1">Available 7 AM - 5 PM</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-900">Email</h3>
                      <a href="mailto:loscabohandyman@gmail.com" className="text-lg text-gray-700 hover:text-blue-600 transition-colors">
                        loscabohandyman@gmail.com
                      </a>
                      <p className="text-sm text-gray-600 mt-1">We reply within 24 hours</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-xl flex-shrink-0">
                      <MessageCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-900">WhatsApp</h3>
                      <a href="https://wa.me/526121698328" target="_blank" rel="noopener noreferrer" className="text-lg text-gray-700 hover:text-green-600 transition-colors">
                        +52 612 169 8328
                      </a>
                      <p className="text-sm text-gray-600 mt-1">Fastest response</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-xl flex-shrink-0">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-900">Service Area</h3>
                      <p className="text-gray-700">
                        Cabo San Lucas<br />
                        San José del Cabo<br />
                        All of Los Cabos, BCS
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-xl flex-shrink-0">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-900">Business Hours</h3>
                      <div className="text-gray-700">
                        <p>Mon-Fri: 7:00 AM - 5:00 PM</p>
                        <p>Sat: 9:00 AM - 2:00 PM</p>
                        <p>Sun: Closed</p>
                        <p className="text-sm mt-2 text-red-600 font-semibold">🚨 24/7 Emergency</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white p-8 rounded-xl shadow-2xl">
                <h2 className="text-3xl font-bold mb-2 text-gray-900">Send Us a Message</h2>
                <p className="text-gray-600 mb-6">For non-urgent requests</p>
                
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    ✓ Message sent! We'll respond within 24 hours.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    ✗ Failed to send. Please call or WhatsApp us.
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                      <input
                        required
                        type="tel"
                        placeholder="+52 612 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Service Needed</label>
                    <select 
                      value={formData.service} 
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      <option value="kitchen">Kitchen Remodeling</option>
                      <option value="bathroom">Bathroom Renovation</option>
                      <option value="plumbing">Plumbing Repairs</option>
                      <option value="electrical">Electrical Services</option>
                      <option value="painting">Painting & Drywall</option>
                      <option value="carpentry">Carpentry</option>
                      <option value="commercial">Commercial</option>
                      <option value="hoa">HOA Maintenance</option>
                      <option value="emergency">Emergency</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Urgency</label>
                    <select 
                      value={formData.urgency} 
                      onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="normal">Normal</option>
                      <option value="soon">Within 2-3 days</option>
                      <option value="urgent">Within 24 hours</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                    <textarea
                      required
                      placeholder="Describe your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={6}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="h-5 w-5" />
                  </button>

                  <p className="text-sm text-center text-gray-600">
                    We respond within 24 hours
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;