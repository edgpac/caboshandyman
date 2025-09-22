import React, { useState, useEffect } from 'react';
import { Camera, Send, Bot, Wrench, AlertCircle, MapPin, DollarSign, Clock, ExternalLink, Loader, Home, Zap, Building, Users, Calendar, MessageCircle, Phone } from 'lucide-react';

export default function MobileEnhancedAIAssistant({ isOpen: externalIsOpen, onClose, initialMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState('services');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    serviceType: '',
    projectDetails: '',
    urgency: 'normal'
  });

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const assistantIsOpen = externalIsOpen !== undefined ? externalIsOpen : isOpen;

  useEffect(() => {
    if (initialMode && assistantIsOpen) {
      setCurrentView(initialMode);
      
      if (initialMode === 'booking') {
        setSelectedService(null);
        setBookingData(prev => ({
          ...prev,
          serviceType: 'General Consultation'
        }));
      }
    }
  }, [initialMode, assistantIsOpen]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setIsOpen(false);
    }
    resetAssistant();
  };

  const services = [
    {
      title: "Residential Maintenance",
      description: "Kitchen, bathroom, and home renovations with premium finishes and expert craftsmanship.",
      icon: Home,
      details: "Complete home renovations including kitchens, bathrooms, flooring, painting, and custom installations. We handle everything from minor repairs to major remodels.",
      calendlyUrl: "https://cal.com/maintenancemaster/residential-consultation"
    },
    {
      title: "Emergency Services", 
      description: "AI-powered response for water damage, structural issues, and urgent repairs. 30-minute response time.",
      icon: Zap,
      details: "24/7 emergency response for water damage, electrical issues, structural problems, and urgent repairs. Our AI system helps prioritize and dispatch the right team immediately.",
      calendlyUrl: "https://cal.com/maintenancemaster/emergency-service-assessment"
    },
    {
      title: "Commercial Projects",
      description: "Office buildouts, retail spaces, and commercial maintenance for Ventura County businesses.",
      icon: Building,
      details: "Professional commercial services including office buildouts, retail renovations, restaurant construction, and ongoing maintenance contracts for businesses.",
      calendlyUrl: "https://cal.com/maintenancemaster/commercial-project-consultation"
    },
    {
      title: "HOA & Property Maintenance",
      description: "Comprehensive maintenance solutions designed to enhance community value and resident satisfaction.",
      icon: Users,
      details: "Complete property management services for HOAs and multi-unit properties including landscaping, common area maintenance, and tenant improvement coordination.",
      calendlyUrl: "https://cal.com/maintenancemaster/hoa-property-assessment"
    }
  ];

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: isMobile ? 720 : 1920 },
          height: { ideal: isMobile ? 480 : 1080 }
        }
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
    } catch (error) {
      console.error('Camera access failed:', error);
      setError('Camera access denied. Please check permissions and try again.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    const video = document.getElementById('cameraVideo');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      const file = new File([blob], `maintenance-photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage({
          url: e.target.result,
          file: file
        });
        stopCamera();
      };
      reader.readAsDataURL(file);
    }, 'image/jpeg', 0.8);
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    if (!assistantIsOpen && stream) {
      stopCamera();
    }
  }, [assistantIsOpen, stream]);

  const sendWhatsAppNotification = async (appointmentData) => {
    try {
      const message = `New Appointment Scheduled:
Service: ${appointmentData.serviceType}
Client: ${appointmentData.name}
Phone: ${appointmentData.phone}
Details: ${appointmentData.projectDetails}
Urgency: ${appointmentData.urgency}
Time: ${new Date().toLocaleString()}`;

      // Send to business owner (you) - using environment variable
      await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          phone: process.env.BUSINESS_WHATSAPP_NUMBER
        })
      });

      // Send confirmation to customer
      if (appointmentData.phone) {
        const customerMessage = `Thank you ${appointmentData.name}! Your appointment request has been received for ${appointmentData.serviceType}. We'll contact you shortly to confirm details.`;
        
        await fetch('/api/send-whatsapp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: customerMessage,
            phone: appointmentData.phone
          })
        });
      }
    } catch (error) {
      console.error('WhatsApp notification failed:', error);
    }
  };

  const compressImage = (file, maxWidth = isMobile ? 600 : 800, quality = 0.7) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        let { width, height } = img;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const imageToBase64 = async (file) => {
    try {
      const compressedFile = await compressImage(file);
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(compressedFile);
      });
    } catch (error) {
      console.error('Image compression failed:', error);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  };

  // FIXED EMAIL NOTIFICATION FUNCTION
  const handleScheduleAppointment = async (analysisData) => {
    try {
      // Show loading state
      const loadingToast = document.createElement('div');
      loadingToast.textContent = 'Preparing appointment request...';
      loadingToast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      document.body.appendChild(loadingToast);

      // Use compressed image instead of raw selectedImage.url
      let imageToSend = null;
      if (selectedImage?.file) {
        const compressedBase64 = await imageToBase64(selectedImage.file);
        imageToSend = `data:image/jpeg;base64,${compressedBase64}`;
      }

      // Send email notification to your team
      const emailResponse = await fetch('/api/send-booking-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          analysisData,
          customerInfo: {
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
          },
          imageData: imageToSend, // Use compressed image
          timestamp: new Date().toISOString()
        })
      });

      // Remove loading toast
      document.body.removeChild(loadingToast);

      if (emailResponse.ok) {
        // Show success message
        const successToast = document.createElement('div');
        successToast.textContent = 'Request sent! Redirecting to booking...';
        successToast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        document.body.appendChild(successToast);

        setTimeout(() => {
          document.body.removeChild(successToast);
        }, 3000);
      }

      // Continue with existing booking logic
      const analysisBookingData = {
        name: bookingData.name || '',
        phone: bookingData.phone || '',
        serviceType: selectedService?.title || 'Issue Analysis Follow-up',
        projectDetails: `Issue: ${analysisData.analysis?.issue_type || 'Maintenance Issue'} - ${analysisData.analysis?.description || ''}
        
Estimated Cost: ${analysisData.cost_estimate?.total_cost?.min || 0} - ${analysisData.cost_estimate?.total_cost?.max || 0}
${analysisData.cost_estimate?.labor_hours ? `Estimated Time: ${analysisData.cost_estimate.labor_hours} hours` : ''}
${analysisData.analysis?.time_estimate && analysisData.analysis.time_estimate !== 'TBD' ? `Duration: ${analysisData.analysis.time_estimate}` : ''}`,
        urgency: analysisData.analysis?.severity === 'high' ? 'urgent' : 'normal'
      };
      
      // Update booking data
      setBookingData(analysisBookingData);
      
      // Open Cal.com with pre-filled data
      const params = new URLSearchParams({
        name: analysisBookingData.name,
        phone: analysisBookingData.phone,
        details: analysisBookingData.projectDetails,
        urgency: analysisBookingData.urgency
      });
      
      const serviceUrl = selectedService?.calendlyUrl || 'https://cal.com/maintenancemaster/residential-consultation';
      
      // Delay to let user see the success message
      setTimeout(() => {
        window.open(`${serviceUrl}?${params.toString()}`, '_blank');
      }, 1000);
      
      // Send WhatsApp notification
      setTimeout(() => {
        sendWhatsAppNotification(analysisBookingData);
      }, 2000);

    } catch (error) {
      console.error('Scheduling failed:', error);
      
      const errorToast = document.createElement('div');
      errorToast.textContent = 'Email failed, but proceeding to booking...';
      errorToast.className = 'fixed top-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      document.body.appendChild(errorToast);

      setTimeout(() => {
        document.body.removeChild(errorToast);
        // Still redirect to booking even if email fails
        const serviceUrl = selectedService?.calendlyUrl || 'https://cal.com/maintenancemaster/residential-consultation';
        window.open(serviceUrl, '_blank');
      }, 2000);
    }
  };

  const openCalendlyWidget = (serviceUrl) => {
    const params = new URLSearchParams({
      name: bookingData.name,
      phone: bookingData.phone,
      details: bookingData.projectDetails,
      urgency: bookingData.urgency
    });
    
    window.open(`${serviceUrl}?${params.toString()}`, '_blank');

    setTimeout(() => {
      sendWhatsAppNotification({
        ...bookingData,
        serviceType: selectedService?.title || 'General Consultation'
      });
    }, 2000);
  };

  const analyzeIssue = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const imageBase64 = await imageToBase64(selectedImage.file);
      
      const analysisDescription = selectedService 
        ? `${description} (Service context: ${selectedService.title} - ${selectedService.description})`
        : description;

      const response = await fetch('/api/analyze-parts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64,
          description: analysisDescription,
          location: location || 'Cabo San Lucas, Mexico',
          service_context: selectedService ? {
            title: selectedService.title,
            category: selectedService.title.toLowerCase().replace(' ', '_')
          } : null
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setAnalysis(result);
      } else {
        setAnalysis({
          success: true,
          analysis: result.fallback,
          pricing: [],
          stores: [],
          cost_estimate: result.fallback.cost_estimate || { total_cost: { min: 200, max: 400 } }
        });
      }

    } catch (err) {
      console.error('Analysis error:', err);
      setError('Unable to analyze image. Please try again.');
      
      setAnalysis({
        success: false,
        analysis: {
          issue_type: 'Analysis Unavailable',
          severity: 'Unknown',
          description: 'Please contact us directly for assistance.',
          required_parts: [],
          difficulty_level: 'Professional'
        },
        cost_estimate: { total_cost: { min: 100, max: 300 } }
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage({
          url: e.target.result,
          file: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const resetAssistant = () => {
    if (stream) {
      stopCamera();
    }
    setSelectedImage(null);
    setIsCameraOpen(false);
    setDescription('');
    setLocation('');
    setAnalysis(null);
    setError(null);
    setIsAnalyzing(false);
    setCurrentView('services');
    setSelectedService(null);
    setBookingData({
      name: '',
      phone: '',
      serviceType: '',
      projectDetails: '',
      urgency: 'normal'
    });
  };

  const getSeverityColor = (severity) => {
    switch(severity?.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (!assistantIsOpen) {
    if (externalIsOpen !== undefined) {
      return null;
    }
    
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 ${
          isMobile ? 'p-3' : 'p-4'
        }`}
        aria-label="Open AI Assistant"
      >
        <Bot size={isMobile ? 20 : 24} />
      </button>
    );
  }

  // Mobile-optimized container classes
  const containerClasses = isMobile 
    ? "fixed inset-0 bg-white z-50 flex flex-col"
    : "fixed bottom-6 right-6 w-[420px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-[80vh] flex flex-col";

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className={`bg-blue-600 text-white p-4 ${isMobile ? '' : 'rounded-t-lg'} flex items-center justify-between`}>
        <div className="flex items-center space-x-2">
          <Wrench size={20} />
          <span className="font-semibold">Quote Assistant</span>
        </div>
        <button 
          onClick={handleClose}
          className="text-white hover:text-gray-200 text-xl leading-none"
          aria-label="Close assistant"
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div className={`p-4 overflow-y-auto flex-1 ${isMobile ? 'pb-safe' : ''}`}>
        {currentView === 'services' && !analysis && !isAnalyzing && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">How can we help you today?</h3>
              <p className="text-sm text-gray-600">Choose a service or analyze a specific issue</p>
            </div>

            <div className="space-y-3">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div 
                    key={index}
                    className={`border border-gray-200 rounded-lg p-3 hover:border-blue-600 hover:bg-gray-50 cursor-pointer transition-colors ${
                      isMobile ? 'active:bg-blue-50' : ''
                    }`}
                    onClick={() => {
                      setSelectedService(service);
                      setBookingData(prev => ({...prev, serviceType: service.title}));
                      setCurrentView('booking');
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <IconComponent size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-800">{service.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{service.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t pt-4">
              <button
                onClick={() => setCurrentView('analysis')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Camera size={16} />
                <span>Analyze Specific Issue</span>
              </button>
            </div>

            <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-2'}`}>
              <button 
                onClick={() => setCurrentView('booking')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded text-sm font-semibold transition-colors"
              >
                Schedule Consultation
              </button>
              <button 
                onClick={() => {
                  setSelectedService(services[1]);
                  setBookingData(prev => ({...prev, serviceType: 'Emergency Service', urgency: 'urgent'}));
                  setCurrentView('booking');
                }}
                className="bg-red-100 hover:bg-red-200 text-red-800 py-2 px-3 rounded text-sm font-semibold transition-colors"
              >
                Emergency
              </button>
            </div>
          </div>
        )}

        {currentView === 'booking' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Schedule Appointment</h3>
                {selectedService && (
                  <p className="text-sm text-blue-600 font-medium">
                    {selectedService.title}
                  </p>
                )}
              </div>
              <button 
                onClick={() => {
                  setCurrentView('services');
                  setSelectedService(null);
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                ← Back
              </button>
            </div>

            {selectedService && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <selectedService.icon size={16} className="text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">{selectedService.title}</span>
                </div>
                <p className="text-xs text-blue-700">{selectedService.details}</p>
              </div>
            )}

            <div className="space-y-3">
              <input
                type="text"
                value={bookingData.name}
                onChange={(e) => setBookingData(prev => ({...prev, name: e.target.value}))}
                placeholder="Your Name"
                className={`w-full p-3 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none ${
                  isMobile ? 'text-base' : ''
                }`}
              />
              
              <input
                type="tel"
                value={bookingData.phone}
                onChange={(e) => setBookingData(prev => ({...prev, phone: e.target.value}))}
                placeholder="Phone Number"
                className={`w-full p-3 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none ${
                  isMobile ? 'text-base' : ''
                }`}
              />

              <textarea
                value={bookingData.projectDetails}
                onChange={(e) => setBookingData(prev => ({...prev, projectDetails: e.target.value}))}
                placeholder="Describe your project or issue in detail..."
                className={`w-full p-3 border border-gray-300 rounded-lg resize-none text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none ${
                  isMobile ? 'text-base' : ''
                }`}
                rows={isMobile ? 3 : 4}
              />

              <select
                value={bookingData.urgency}
                onChange={(e) => setBookingData(prev => ({...prev, urgency: e.target.value}))}
                className={`w-full p-3 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none ${
                  isMobile ? 'text-base' : ''
                }`}
              >
                <option value="normal">Normal Priority</option>
                <option value="urgent">Urgent (24-48 hours)</option>
                <option value="emergency">Emergency (Same day)</option>
              </select>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => openCalendlyWidget(selectedService?.calendlyUrl || 'https://cal.com/maintenancemaster/residential-consultation')}
                disabled={!bookingData.name || !bookingData.phone}
                className={`w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                  isMobile ? 'py-4' : ''
                }`}
              >
                <Calendar size={16} />
                <span>Schedule Appointment</span>
              </button>

              <button
                onClick={() => setCurrentView('analysis')}
                className={`w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                  isMobile ? 'py-4' : ''
                }`}
              >
                <Camera size={16} />
                <span>Get Instant Quote</span>
              </button>

              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <MessageCircle size={12} />
                <span>You'll receive WhatsApp confirmation after scheduling</span>
              </div>
            </div>

            <div className="border-t pt-3">
              <p className="text-xs text-gray-600 mb-2">Prefer to call directly?</p>
              <button 
                onClick={() => window.open('tel:+526121698328')}
                className="w-full bg-green-100 hover:bg-green-200 text-green-800 py-2 px-3 rounded text-sm font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Phone size={14} />
                <span>Call +526121698328</span>
              </button>
            </div>
          </div>
        )}

        {currentView === 'analysis' && !analysis && !isAnalyzing && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Issue Analysis</h3>
                {selectedService && (
                  <p className="text-sm text-blue-600 font-medium">
                    {selectedService.title} Analysis
                  </p>
                )}
              </div>
              <button 
                onClick={() => {
                  setCurrentView('services');
                  setSelectedService(null);
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                ← Back
              </button>
            </div>
            
            {selectedService && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <selectedService.icon size={16} className="text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">{selectedService.title}</span>
                </div>
                <p className="text-xs text-blue-700">{selectedService.details}</p>
              </div>
            )}
            
            <p className="text-gray-600 text-sm">
              Upload a photo of your maintenance issue for analysis and cost estimates.
            </p>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
                {error}
              </div>
            )}
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-600 transition-colors">
              {isCameraOpen ? (
                <div className="space-y-4">
                  <video
                    id="cameraVideo"
                    autoPlay
                    playsInline
                    muted
                    ref={(video) => {
                      if (video && stream) {
                        video.srcObject = stream;
                      }
                    }}
                    className={`w-full bg-black rounded object-cover ${
                      isMobile ? 'h-64' : 'h-48'
                    }`}
                  />
                  <div className={`flex space-x-2 justify-center ${
                    isMobile ? 'flex-col space-x-0 space-y-2' : ''
                  }`}>
                    <button
                      onClick={capturePhoto}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center space-x-2"
                    >
                      <Camera size={16} />
                      <span>Capture</span>
                    </button>
                    <button
                      onClick={stopCamera}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : selectedImage ? (
                <div className="space-y-2">
                  <img 
                    src={selectedImage.url} 
                    alt="Issue to analyze" 
                    className={`w-full object-cover rounded ${
                      isMobile ? 'h-48' : 'h-32'
                    }`}
                  />
                  <div className={`flex space-x-2 justify-center ${
                    isMobile ? 'flex-col space-x-0 space-y-2' : ''
                  }`}>
                    <button 
                      onClick={() => setSelectedImage(null)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove Image
                    </button>
                    <button 
                      onClick={startCamera}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Take New Photo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col items-center space-y-2">
                    <Camera size={32} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Capture or upload photo
                    </span>
                  </div>
                  <div className={`grid gap-2 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    <button
                      onClick={startCamera}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-semibold flex items-center justify-center space-x-1"
                    >
                      <Camera size={14} />
                      <span>Take Photo</span>
                    </button>
                    <label className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded text-sm font-semibold cursor-pointer flex items-center justify-center space-x-1">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <span>📁</span>
                      <span>Upload</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail (e.g., 'Water leaking from pipe joint under kitchen sink', 'Electrical outlet not working in bedroom')"
              className={`w-full p-3 border border-gray-300 rounded-lg resize-none text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none ${
                isMobile ? 'text-base' : ''
              }`}
              rows={isMobile ? 3 : 4}
            />

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Your location (optional - for local pricing)"
              className={`w-full p-3 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none ${
                isMobile ? 'text-base' : ''
              }`}
            />

            <button
              onClick={analyzeIssue}
              disabled={!selectedImage || !description}
              className={`w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                isMobile ? 'py-4' : ''
              }`}
            >
              <Send size={16} />
              <span>Analyze with Intelligence</span>
            </button>
          </div>
        )}

        {isAnalyzing && (
          <div className="text-center space-y-4">
            <Loader className="animate-spin mx-auto w-8 h-8 text-blue-600" />
            <p className="text-gray-600">Analyzing your issue...</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>🔍 Processing image</p>
              <p>💡 Identifying parts needed</p>
              <p>💰 Finding current prices</p>
              <p>🏪 Locating nearby stores</p>
            </div>
          </div>
        )}

        {analysis && (
          <div className="space-y-4">
            <div className={`border p-3 rounded-lg ${getSeverityColor(analysis.analysis?.severity)}`}>
              <h3 className="font-semibold">{analysis.analysis?.issue_type || 'Maintenance Issue'}</h3>
              {analysis.analysis?.description && (
                <p className="text-sm mt-1">{analysis.analysis.description}</p>
              )}
              <div className={`flex items-center justify-between mt-2 text-xs ${
                isMobile ? 'flex-col items-start space-y-1' : ''
              }`}>
                <span>Severity: {analysis.analysis?.severity || 'Unknown'}</span>
                <span>Difficulty: {analysis.analysis?.difficulty_level || 'Professional'}</span>
              </div>
            </div>

            {analysis.cost_estimate && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Cost Estimate</h4>
                <div className={`grid gap-2 text-sm ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {analysis.cost_estimate.parts_cost && (
                    <div>
                      <span className="text-blue-600">Materials:</span>
                      <div className="font-semibold">
                        ${analysis.cost_estimate.parts_cost.min} - ${analysis.cost_estimate.parts_cost.max}
                      </div>
                    </div>
                  )}
                  {analysis.cost_estimate.labor_cost && (
                    <div>
                      <span className="text-blue-600">Labor:</span>
                      <div className="font-semibold">
                        ${analysis.cost_estimate.labor_cost}
                        {analysis.cost_estimate.labor_hours && (
                          <div className="text-xs text-blue-500">
                            ({analysis.cost_estimate.labor_hours} hours)
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {analysis.cost_estimate.disposal_cost > 0 && (
                    <div>
                      <span className="text-blue-600">Disposal:</span>
                      <div className="font-semibold">${analysis.cost_estimate.disposal_cost}</div>
                    </div>
                  )}
                  {analysis.cost_estimate.permits_misc > 0 && (
                    <div>
                      <span className="text-blue-600">Permits/Misc:</span>
                      <div className="font-semibold">${analysis.cost_estimate.permits_misc}</div>
                    </div>
                  )}
                </div>
                <div className="mt-2 pt-2 border-t border-blue-200">
                  <span className="text-blue-600">Total Range:</span>
                  <div className="font-bold text-lg text-blue-800">
                    ${analysis.cost_estimate.total_cost.min} - ${analysis.cost_estimate.total_cost.max}
                  </div>
                  {analysis.analysis?.time_estimate && analysis.analysis.time_estimate !== 'TBD' && (
                    <div className="text-xs text-blue-600 mt-1">
                      Estimated time: {analysis.analysis.time_estimate}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <button 
                onClick={() => handleScheduleAppointment(analysis)}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold text-sm ${
                  isMobile ? 'py-3' : ''
                }`}
              >
                Schedule Professional Service
              </button>
              <button 
                onClick={resetAssistant}
                className={`w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-semibold text-sm ${
                  isMobile ? 'py-3' : ''
                }`}
              >
                New Analysis
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Safe Area Bottom Padding */}
      {isMobile && <div className="h-4"></div>}
    </div>
  };
