import React, { useState, useEffect } from 'react';
import { Camera, Send, Bot, Wrench, AlertCircle, MapPin, DollarSign, Clock, ExternalLink, Loader, Home, Zap, Building, Users, Calendar, MessageCircle, Phone } from 'lucide-react';

export default function MobileEnhancedAIAssistant({ isOpen: externalIsOpen, onClose, initialMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState('services');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // 🆕 NEW: Chat mode states
  const [chatMode, setChatMode] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [clarificationNeeded, setClarificationNeeded] = useState(null);
  
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    serviceType: '',
    projectDetails: '',
    urgency: 'normal'
  });

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
    if (selectedImages.length >= 3) {
      setError('Maximum 3 images allowed');
      return;
    }

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
        setSelectedImages(prev => [...prev, {
          url: e.target.result,
          file: file
        }]);
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

      await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          phone: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP_NUMBER 
        })
      });

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

  const compressImage = (file, maxWidth = isMobile ? 800 : 1200, quality = 0.85) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        let { width, height } = img;
        
        // Much more aggressive compression for mobile to prevent timeouts
        const maxDimension = isMobile ? 800 : 1600;
        
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          } else {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Use better quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        
        // Lower quality for mobile to reduce payload size
        canvas.toBlob((blob) => {
          if (blob) {
            // Double-check blob size (aim for <300KB per image on mobile)
            const sizeMB = blob.size / 1024 / 1024;
            console.log(`Compressed to ${Math.round(sizeMB * 1024)}KB`);
            
            if (isMobile && sizeMB > 0.5) {
              // Re-compress with lower quality if still too large
              canvas.toBlob((smallerBlob) => {
                resolve(smallerBlob || blob);
              }, 'image/jpeg', 0.6);
            } else {
              resolve(blob);
            }
          } else {
            reject(new Error('Image compression failed'));
          }
        }, 'image/jpeg', isMobile ? 0.65 : 0.85);
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const imageToBase64 = async (file) => {
    try {
      const compressedBlob = await compressImage(file);
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result.split(',')[1];
          
          // Check base64 size (approximate KB)
          const sizeKB = (base64.length * 3) / 4 / 1024;
          console.log(`Compressed image size: ${Math.round(sizeKB)} KB`);
          
          if (sizeKB > 1500) {
            console.warn('Image still large after compression:', Math.round(sizeKB), 'KB');
          }
          
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(compressedBlob);
      });
    } catch (error) {
      console.error('Image compression failed:', error);
      
      // Fallback: try original file with lower quality
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

  const handleScheduleAppointment = async (analysisData) => {
    try {
      const loadingToast = document.createElement('div');
      loadingToast.textContent = 'Preparing appointment request...';
      loadingToast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      document.body.appendChild(loadingToast);

      let imagesToSend = null;
      if (selectedImages.length > 0) {
        const compressedPromises = selectedImages.map(img => imageToBase64(img.file));
        const compressedBase64Array = await Promise.all(compressedPromises);
        imagesToSend = compressedBase64Array.map(base64 => `data:image/jpeg;base64,${base64}`);
      }

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
          imageData: imagesToSend,
          timestamp: new Date().toISOString()
        })
      });

      document.body.removeChild(loadingToast);

      if (emailResponse.ok) {
        const successToast = document.createElement('div');
        successToast.textContent = 'Request sent! Redirecting to booking...';
        successToast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        document.body.appendChild(successToast);

        setTimeout(() => {
          document.body.removeChild(successToast);
        }, 3000);
      }

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
      
      setBookingData(analysisBookingData);
      
      const params = new URLSearchParams({
        name: analysisBookingData.name,
        phone: analysisBookingData.phone,
        details: analysisBookingData.projectDetails,
        urgency: analysisBookingData.urgency
      });
      
      const serviceUrl = selectedService?.calendlyUrl || 'https://cal.com/maintenancemaster/residential-consultation';
      
      setTimeout(() => {
        window.open(`${serviceUrl}?${params.toString()}`, '_blank');
      }, 1000);
      
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

  // 🆕 NEW: Handle chat messages
  const handleChatSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      role: 'user',
      content: chatInput
    };

    const newChatHistory = [...chatHistory, userMessage];
    setChatHistory(newChatHistory);
    setChatInput('');
    setIsAnalyzing(true);

    try {
      // Re-analyze with chat history
      const imagePromises = selectedImages.map(img => imageToBase64(img.file));
      const imagesBase64 = await Promise.all(imagePromises);

      const response = await fetch('/api/analyze-parts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          images: imagesBase64,
          description: chatInput,
          location: location || 'Cabo San Lucas, Mexico',
          service_context: selectedService ? {
            title: selectedService.title,
            category: selectedService.title.toLowerCase().replace(' ', '_')
          } : null,
          chat_history: newChatHistory
        })
      });

      const result = await response.json();

      if (result.needs_clarification) {
        // Continue chat mode
        const aiMessage = {
          role: 'assistant',
          content: result.clarification_questions.join('\n• ')
        };
        setChatHistory([...newChatHistory, aiMessage]);
      } else {
        // Got final analysis - exit chat mode
        setChatMode(false);
        setAnalysis(result);
      }

    } catch (error) {
      console.error('Chat error:', error);
      setError('Unable to process your message. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeIssue = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      console.log('Starting analysis with', selectedImages.length, 'images');
      
      const imagePromises = selectedImages.map(img => imageToBase64(img.file));
      const imagesBase64 = await Promise.all(imagePromises);
      
      console.log('Images compressed successfully');
      
      const analysisDescription = selectedService 
        ? `${description} (Service context: ${selectedService.title} - ${selectedService.description})`
        : description;

      const response = await fetch('/api/analyze-parts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          images: imagesBase64,
          description: analysisDescription,
          location: location || 'Cabo San Lucas, Mexico',
          service_context: selectedService ? {
            title: selectedService.title,
            category: selectedService.title.toLowerCase().replace(' ', '_')
          } : null
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', errorData);
        throw new Error(errorData.error || `Server error (${response.status})`);
      }

      const result = await response.json();

      // 🆕 NEW: Check for off-topic content
      if (result.is_off_topic) {
        setError(result.message);
        setAnalysis(null);
        setIsAnalyzing(false);
        return;
      }

      // 🆕 NEW: Check if clarification needed
      if (result.needs_clarification) {
        setChatMode(true);
        setClarificationNeeded(result);
        setChatHistory([
          {
            role: 'assistant',
            content: `I need a bit more information to give you an accurate estimate:\n\n• ${result.clarification_questions.join('\n• ')}`
          }
        ]);
        setIsAnalyzing(false);
        return;
      }

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
      setError(`Unable to analyze: ${err.message || 'Please try again'}`);
      
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
    const files = Array.from(event.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (selectedImages.length + imageFiles.length > 3) {
      setError('Maximum 3 images allowed');
      return;
    }

    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImages(prev => [...prev, {
          url: e.target.result,
          file: file
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (selectedImages.length + imageFiles.length > 3) {
      setError('Maximum 3 images allowed');
      return;
    }

    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImages(prev => [...prev, {
          url: e.target.result,
          file: file
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const resetAssistant = () => {
    if (stream) {
      stopCamera();
    }
    setSelectedImages([]);
    setIsCameraOpen(false);
    setDescription('');
    setLocation('');
    setAnalysis(null);
    setError(null);
    setIsAnalyzing(false);
    setChatMode(false); // 🆕 NEW
    setChatHistory([]); // 🆕 NEW
    setChatInput(''); // 🆕 NEW
    setClarificationNeeded(null); // 🆕 NEW
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

  const containerClasses = isMobile 
    ? "fixed inset-0 bg-white z-50 flex flex-col"
    : "fixed bottom-6 right-6 w-[420px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-[80vh] flex flex-col";

  return (
    <div className={containerClasses}>
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
                onClick={() => setCurrentView('booking')}
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
            
            <p className="text-gray-600 text-sm">
              Upload up to 3 photos of your maintenance issue for instant AI analysis and cost estimates.
            </p>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
                {error}
              </div>
            )}
            
            <div 
              className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                isDragging 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-300 hover:border-blue-600'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
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
              ) : selectedImages.length > 0 ? (
                <div className="space-y-3">
                  <div className={`grid gap-2 ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={image.url} 
                          alt={`Issue ${index + 1}`}
                          className="w-full h-24 object-cover rounded border border-gray-200"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {selectedImages.length < 3 && (
                    <div className={`grid gap-2 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                      <button
                        onClick={startCamera}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded text-sm font-semibold flex items-center justify-center space-x-1"
                      >
                        <Camera size={14} />
                        <span>Add Photo</span>
                      </button>
                      <label className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded text-sm font-semibold cursor-pointer flex items-center justify-center space-x-1">
                        <input 
                          type="file" 
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <span>📁</span>
                        <span>Add More</span>
                      </label>
                    </div>
                  )}
                  
                  <div className="text-xs text-center text-gray-500">
                    {selectedImages.length}/3 images uploaded
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col items-center space-y-2">
                    <Camera size={32} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {isDragging ? 'Drop images here' : 'Drag & drop, capture, or upload photos (max 3)'}
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
                        multiple
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

            {/* 🆕 NEW: Chat mode interface */}
            {chatMode ? (
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageCircle size={16} className="text-blue-600" />
                    <span className="text-sm font-semibold text-blue-800">Let's get more details</span>
                  </div>
                  <p className="text-xs text-blue-700">I need a bit more information to provide an accurate estimate.</p>
                </div>

                <div className="border rounded-lg p-3 bg-gray-50 max-h-64 overflow-y-auto space-y-3">
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : 'bg-white border border-gray-200 rounded-bl-none'
                      }`}>
                        <div className="whitespace-pre-line">{msg.content}</div>
                      </div>
                    </div>
                  ))}
                  {isAnalyzing && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 p-3 rounded-lg text-sm">
                        <Loader className="animate-spin w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isAnalyzing && handleChatSend()}
                    placeholder="Type your answer..."
                    className={`flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none ${
                      isMobile ? 'text-base' : ''
                    }`}
                    disabled={isAnalyzing}
                  />
                  <button 
                    onClick={handleChatSend}
                    disabled={!chatInput.trim() || isAnalyzing}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 rounded-lg"
                  >
                    <Send size={16} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setChatMode(false);
                    setChatHistory([]);
                    setClarificationNeeded(null);
                  }}
                  className="w-full text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Start Over
                </button>
              </div>
            ) : (
              // Normal description box when NOT in chat mode
              <>
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
                  disabled={selectedImages.length === 0 || !description}
                  className={`w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                    isMobile ? 'py-4' : ''
                  }`}
                >
                  <Send size={16} />
                  <span>Analyze with Intelligence</span>
                </button>
              </>
            )}
          </div>
        )}

        {isAnalyzing && !chatMode && (
          <div className="text-center space-y-4">
            <Loader className="animate-spin mx-auto w-8 h-8 text-blue-600" />
            <p className="text-gray-600">Analyzing your issue...</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>🔍 Processing images</p>
              <p>💡 Identifying parts needed</p>
              <p>💰 Calculating costs</p>
              <p>🏪 Finding local suppliers</p>
            </div>
          </div>
        )}

        {analysis && !chatMode && (
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
                
                {/* 🆕 Disclaimer */}
                <div className="bg-blue-100 border border-blue-300 rounded p-2 mb-3 text-xs text-blue-700">
                  <strong>⚠️ Preliminary Estimate:</strong> Labor costs and hours are approximate and may vary based on project complexity, site conditions, and unforeseen circumstances discovered during work.
                </div>

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
                      <span className="text-blue-600">Labor (Est.):</span>
                      <div className="font-semibold">
                        ${analysis.cost_estimate.labor_cost}
                        {analysis.cost_estimate.labor_hours && (
                          <div className="text-xs text-blue-500">
                            (~{analysis.cost_estimate.labor_hours} hours)
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
                  <span className="text-blue-600">Estimated Total Range:</span>
                  <div className="font-bold text-lg text-blue-800">
                    ${analysis.cost_estimate.total_cost.min} - ${analysis.cost_estimate.total_cost.max}
                  </div>
                  {analysis.analysis?.time_estimate && analysis.analysis.time_estimate !== 'TBD' && (
                    <div className="text-xs text-blue-600 mt-1">
                      Estimated time: {analysis.analysis.time_estimate}
                    </div>
                  )}
                  <div className="text-xs text-blue-600 mt-2 italic">
                    Final pricing confirmed after on-site inspection
                  </div>
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
  );
}
