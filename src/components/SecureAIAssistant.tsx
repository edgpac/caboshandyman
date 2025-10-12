// Force rebuild - mobile compression fix v3 - WITH FEEDBACK CHAT + CHAT-ONLY MODE
import React, { useState, useEffect } from 'react';
import { Camera, Send, Bot, Wrench, AlertCircle, MapPin, DollarSign, Clock, ExternalLink, Loader, Home, Zap, Building, Users, Calendar, MessageCircle, Phone, Paperclip, ChevronDown, X } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

export default function SecureAIAssistant({ isOpen: externalIsOpen, onClose, initialMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
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
  const [isDragging, setIsDragging] = useState(false);
  
  const [chatMode, setChatMode] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [clarificationNeeded, setClarificationNeeded] = useState(null);
  
  // POST-ESTIMATE FEEDBACK CHAT
  const [feedbackMode, setFeedbackMode] = useState(false);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [feedbackHistory, setFeedbackHistory] = useState([]);

  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    serviceType: '',
    projectDetails: '',
    urgency: 'normal'
  });

  const isMobile = useIsMobile();

  const assistantIsOpen = externalIsOpen !== undefined ? externalIsOpen : isOpen;

  useEffect(() => {
    if (initialMode && assistantIsOpen) {
      if (initialMode === 'chat') {
        // Chat-only mode - skip everything, go straight to feedback chat
        setFeedbackMode(true);
        setCurrentView('chat-only');
      } else {
        setCurrentView(initialMode);
      }
      
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
      description: "Intelligent response for water damage, structural issues, and urgent repairs. 30-minute response time.",
      icon: Zap,
      details: "24/7 emergency response for water damage, electrical issues, structural problems, and urgent repairs. Our system helps prioritize and dispatch the right team immediately.",
      calendlyUrl: "https://cal.com/maintenancemaster/emergency-service-assessment"
    },
    {
      title: "Commercial Projects",
      description: "Office buildouts, retail spaces, and commercial maintenance for Cabo San Lucas businesses.",
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
    const maxImages = isMobile ? 1 : 3;
    if (selectedImages.length >= maxImages) {
      setError(isMobile ? 'Maximum 1 image allowed on mobile' : 'Maximum 3 images allowed');
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

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        
        let { width, height } = img;
        
        const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                       window.innerWidth <= 1024 || 
                       ('ontouchstart' in window);
        const maxDimension = isMobileDevice ? 1024 : 1920;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        
        width = width - (width % 2);
        height = height - (height % 2);
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        
        const targetQuality = isMobileDevice ? 0.75 : 0.85;
        
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas toBlob failed'));
            return;
          }
          
          const sizeKB = blob.size / 1024;
          console.log(`✓ Compressed: ${width}x${height}, ${Math.round(sizeKB)}KB, quality: ${targetQuality}, mobile: ${isMobileDevice}`);
          
          if (sizeKB > 500) {
            console.log('⚠️ Large image, recompressing...');
            canvas.toBlob((smallerBlob) => {
              if (smallerBlob) {
                const finalSize = Math.round(smallerBlob.size / 1024);
                console.log(`✓ Recompressed: ${finalSize}KB`);
                
                if (finalSize > 800) {
                  reject(new Error('Image too large. Please try taking a new photo or use a smaller image.'));
                  return;
                }
                
                resolve(smallerBlob);
              } else {
                resolve(blob);
              }
            }, 'image/jpeg', 0.6);
          } else {
            resolve(blob);
          }
        }, 'image/jpeg', targetQuality);
      };
      
      img.onerror = (error) => {
        URL.revokeObjectURL(img.src);
        console.error('Image load error:', error);
        reject(new Error('Failed to load image for compression'));
      };
      
      try {
        const objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;
      } catch (error) {
        reject(new Error('Failed to create image URL'));
      }
    });
  };

  const imageToBase64 = async (file) => {
    try {
      const compressedBlob = await compressImage(file);
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          
          if (!result || typeof result !== 'string' || !result.startsWith('data:image/')) {
            console.error('Invalid data URI generated');
            reject(new Error('Invalid image format'));
            return;
          }
          
          const sizeKB = (result.length * 3) / 4 / 1024;
          console.log(`✓ Image ready: ${Math.round(sizeKB)}KB, format: ${result.substring(5, result.indexOf(';'))}`);
          
          resolve(result);
        };
        reader.onerror = (error) => {
          console.error('FileReader error:', error);
          reject(error);
        };
        reader.readAsDataURL(compressedBlob);
      });
    } catch (error) {
      console.error('Image compression failed:', error);
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (!result || !result.startsWith('data:image/')) {
            reject(new Error('Invalid image format'));
            return;
          }
          console.warn('⚠ Using uncompressed image');
          resolve(result);
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
      loadingToast.className = 'fixed top-4 right-4 bg-teal-400 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      document.body.appendChild(loadingToast);

      let imagesToSend = null;
      if (selectedImages.length > 0) {
        const compressedPromises = selectedImages.map(img => imageToBase64(img.file));
        const compressedBase64Array = await Promise.all(compressedPromises);
        imagesToSend = compressedBase64Array;
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
      const imagePromises = selectedImages.map(img => imageToBase64(img.file));
      const imagesDataURIs = await Promise.all(imagePromises);

      const response = await fetch('/api/analyze-parts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          images: imagesDataURIs,
          description: chatInput,
          location: 'Cabo San Lucas, Mexico',
          service_context: selectedService ? {
            title: selectedService.title,
            category: selectedService.title.toLowerCase().replace(' ', '_')
          } : null,
          chat_history: newChatHistory
        })
      });

      const result = await response.json();

      if (result.needs_clarification) {
        const aiMessage = {
          role: 'assistant',
          content: result.clarification_questions.join('\n• ')
        };
        setChatHistory([...newChatHistory, aiMessage]);
      } else {
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
      const imagesDataURIs = await Promise.all(imagePromises);
      
      const validatedImages = imagesDataURIs.map(dataUri => {
        if (!dataUri.startsWith('data:image/')) {
          return `data:image/jpeg;base64,${dataUri}`;
        }
        return dataUri;
      });
      
      console.log('Images compressed successfully:', validatedImages.map(img => `${Math.round(img.length / 1024)}KB`));
      
      const analysisDescription = selectedService 
        ? `${description} (Service context: ${selectedService.title} - ${selectedService.description})`
        : description;

      const response = await fetch('/api/analyze-parts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          images: validatedImages,
          description: analysisDescription,
          location: 'Cabo San Lucas, Mexico',
          service_context: selectedService ? {
            title: selectedService.title,
            category: selectedService.title.toLowerCase().replace(' ', '_')
          } : null
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', {
          status: response.status,
          error: errorData,
          imageCount: validatedImages.length,
          imageSizes: validatedImages.map(img => `${Math.round(img.length / 1024)}KB`)
        });
        throw new Error(errorData.error || `Server error (${response.status})`);
      }

      const result = await response.json();
      console.log('Analysis result:', {
        success: result.success,
        hasAnalysis: !!result.analysis,
        needsClarification: result.needs_clarification,
        visionSuccess: result.vision_success_count,
        visionErrors: result.vision_error_count
      });

      if (result.is_off_topic) {
        setError(result.message);
        setAnalysis(null);
        setIsAnalyzing(false);
        return;
      }

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
        
        if (result.vision_success_count === 0 && result.vision_error_count > 0) {
          const infoToast = document.createElement('div');
          infoToast.textContent = 'ℹ️ Estimate based on description (image analysis unavailable)';
          infoToast.className = 'fixed top-4 right-4 bg-teal-400 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm';
          document.body.appendChild(infoToast);
          setTimeout(() => {
            if (document.body.contains(infoToast)) {
              document.body.removeChild(infoToast);
            }
          }, 5000);
        }
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

  const handleFeedbackChat = async () => {
    if (!feedbackInput.trim()) return;

    const userMessage = {
      role: 'user',
      content: feedbackInput
    };

    const newFeedbackHistory = [...feedbackHistory, userMessage];
    setFeedbackHistory(newFeedbackHistory);
    setFeedbackInput('');
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/feedback-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: feedbackInput,
          analysis: analysis,
          history: newFeedbackHistory,
          service_context: selectedService
        })
      });

      if (!response.ok) {
        throw new Error('Feedback chat failed');
      }

      const result = await response.json();

      const aiMessage = {
        role: 'assistant',
        content: result.response
      };

      setFeedbackHistory([...newFeedbackHistory, aiMessage]);

    } catch (error) {
      console.error('Feedback chat error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I had trouble processing that. Could you rephrase your question?'
      };
      setFeedbackHistory([...newFeedbackHistory, errorMessage]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    
    const heicFiles = files.filter(file => 
      file.type === 'image/heic' || 
      file.type === 'image/heif' || 
      file.name.toLowerCase().endsWith('.heic') ||
      file.name.toLowerCase().endsWith('.heif')
    );
    
    if (heicFiles.length > 0) {
      setError('HEIC format not supported. Please use your camera to take a photo, or convert HEIC images to JPEG in your Photos app before uploading.');
      return;
    }
    
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    const maxImages = isMobile ? 1 : 3;
    if (selectedImages.length + imageFiles.length > maxImages) {
      setError(isMobile ? 'Maximum 1 image allowed on mobile' : 'Maximum 3 images allowed');
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
    
    const heicFiles = files.filter(file => 
      file.type === 'image/heic' || 
      file.type === 'image/heif' || 
      file.name.toLowerCase().endsWith('.heic') ||
      file.name.toLowerCase().endsWith('.heif')
    );
    
    if (heicFiles.length > 0) {
      setError('HEIC format not supported. Please use your camera to take a photo, or convert HEIC images to JPEG in your Photos app before uploading.');
      return;
    }
    
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    const maxImages = isMobile ? 1 : 3;
    if (selectedImages.length + imageFiles.length > maxImages) {
      setError(isMobile ? 'Maximum 1 image allowed on mobile' : 'Maximum 3 images allowed');
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
    setChatMode(false);
    setChatHistory([]);
    setChatInput('');
    setClarificationNeeded(null);
    setCurrentView('services');
    setSelectedService(null);
    setBookingData({
      name: '',
      phone: '',
      serviceType: '',
      projectDetails: '',
      urgency: 'normal'
    });
    setFeedbackMode(false);
    setFeedbackInput('');
    setFeedbackHistory([]);
    setIsMinimized(false);
  };

  const getSeverityColor = (severity) => {
    switch(severity?.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => ({
      url: URL.createObjectURL(file),
      file: file
    }));
    setSelectedImages([...selectedImages, ...imageUrls]);
  };

  if (!assistantIsOpen) {
    if (externalIsOpen !== undefined) {
      return null;
    }
    
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-teal-400 hover:bg-teal-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 ${
          isMobile ? 'p-3' : 'p-4'
        }`}
        aria-label="Open Assistant"
      >
        <MessageCircle size={isMobile ? 20 : 24} />
      </button>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-teal-400 hover:bg-teal-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-2 transition-all duration-300"
        >
          <Wrench size={20} />
          <span className="font-semibold">Live Support</span>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </button>
      </div>
    );
  }

  const containerClasses = isMobile 
    ? "fixed inset-0 bg-white z-50 flex flex-col"
    : "fixed bottom-6 right-6 w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-[80vh] flex flex-col";

  const maxImages = isMobile ? 1 : 3;
  
  return (
    <div className={containerClasses}>
      {/* UPDATED HEADER WITH MINIMIZE/CLOSE */}
      <div className={`bg-gradient-to-r from-teal-400 to-teal-500 text-white p-4 ${isMobile ? '' : 'rounded-t-2xl'} flex items-center justify-between`}>
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-full">
            <Wrench size={20} className="text-teal-500" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Live Support</h3>
            <p className="text-xs opacity-90">How can we help you?</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isMobile && (
            <button
              onClick={() => setIsMinimized(true)}
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
              aria-label="Minimize"
            >
              <ChevronDown size={20} />
            </button>
          )}
          <button 
            onClick={handleClose}
            className="hover:bg-white/20 p-2 rounded-full transition-colors"
            aria-label="Close assistant"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className={`p-4 overflow-y-auto flex-1 ${isMobile ? 'pb-safe' : ''}`}>
        {/* UPDATED CHAT-ONLY MODE - REDBUBBLE STYLE! */}
        {currentView === 'chat-only' && (
          <div className="space-y-4">
            <div className="flex justify-start mb-4">
              <div className="bg-white p-2 rounded-full mr-2 h-10 w-10 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Wrench size={16} className="text-teal-500" />
              </div>
              <div className="max-w-[85%]">
                <div className="text-xs text-gray-500 mb-1 ml-1">Cabos Handyman</div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none shadow-sm p-3">
                  <p className="text-sm">Hey there 👋 I'm the Cabo Handyman bot.</p>
                  <p className="text-sm mt-1">What can we help you with?</p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-3 bg-gray-50 max-h-96 overflow-y-auto space-y-3">
              {feedbackHistory.length === 0 && (
                <div className="text-center text-gray-500 text-sm py-8">
                  <MessageCircle size={32} className="mx-auto mb-2 text-gray-400" />
                  <p>Start a conversation...</p>
                </div>
              )}
              
              {feedbackHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="bg-white p-2 rounded-full mr-2 h-8 w-8 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Wrench size={14} className="text-teal-500" />
                    </div>
                  )}
                  <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-1' : 'order-2'}`}>
                    {msg.role === 'assistant' && (
                      <div className="text-xs text-gray-500 mb-1 ml-1">Cabos Handyman</div>
                    )}
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-teal-400 text-white rounded-br-none shadow-sm' 
                        : 'bg-white border border-gray-200 rounded-bl-none shadow-sm'
                    }`}>
                      <div className="whitespace-pre-line">{msg.content}</div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isAnalyzing && (
                <div className="flex justify-start">
                  <div className="bg-white p-2 rounded-full mr-2 h-8 w-8 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Wrench size={14} className="text-teal-500" />
                  </div>
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
                    <Loader className="animate-spin w-4 h-4 text-teal-500" />
                  </div>
                </div>
              )}
            </div>

            {/* Image Preview */}
            {selectedImages.length > 0 && (
              <div className="border rounded-lg p-2 bg-white">
                <div className="flex space-x-2 overflow-x-auto">
                  {selectedImages.map((img, idx) => (
                    <div key={idx} className="relative flex-shrink-0">
                      <img src={img.url} alt="" className="w-16 h-16 object-cover rounded-lg border-2 border-teal-400" />
                      <button
                        onClick={() => setSelectedImages(selectedImages.filter((_, i) => i !== idx))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Input with Paperclip */}
            <div className="flex space-x-2">
              <label className="cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors flex-shrink-0">
                <input
                  type="file"
                  accept="image/*"
                  multiple={!isMobile}
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <Paperclip size={20} className="text-gray-500" />
              </label>
              <input
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isAnalyzing && handleFeedbackChat()}
                placeholder="Type a message"
                className={`flex-1 p-3 border-2 border-gray-200 focus:border-teal-400 rounded-full text-sm outline-none transition-colors ${
                  isMobile ? 'text-base' : ''
                }`}
                disabled={isAnalyzing}
                autoFocus
              />
              <button 
                onClick={handleFeedbackChat}
                disabled={!feedbackInput.trim() || isAnalyzing}
                className="bg-teal-400 hover:bg-teal-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 rounded-full transition-colors flex-shrink-0"
              >
                <Send size={18} />
              </button>
            </div>

            {/* Quick Action Button - Only Work Order Status */}
            <div className="pt-2 border-t">
              <button
                onClick={() => {
                  setFeedbackInput("What's my work order status?");
                }}
                className="w-full text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-full border border-gray-200 transition-colors text-left flex items-center space-x-2"
              >
                <span>📋</span>
                <span>Check work order status</span>
              </button>
            </div>
          </div>
        )}

        {/* REST OF THE VIEWS REMAIN UNCHANGED */}
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
                    className={`border border-gray-200 rounded-lg p-3 hover:border-teal-400 hover:bg-gray-50 cursor-pointer transition-colors ${
                      isMobile ? 'active:bg-teal-50' : ''
                    }`}
                    onClick={() => {
                      setSelectedService(service);
                      setBookingData(prev => ({...prev, serviceType: service.title}));
                      setCurrentView('booking');
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <IconComponent size={20} className="text-teal-500 mt-1 flex-shrink-0" />
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
                className="w-full bg-teal-400 hover:bg-teal-500 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
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
                  <p className="text-sm text-teal-500 font-medium">
                    {selectedService.title}
                  </p>
                )}
              </div>
              <button 
                onClick={() => {
                  setCurrentView('services');
                  setSelectedService(null);
                }}
                className="text-sm text-teal-500 hover:text-teal-700"
              >
                ← Back
              </button>
            </div>

            {selectedService && (
              <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                <div className="flex items-center space-x-2 mb-2">
                  <selectedService.icon size={16} className="text-teal-500" />
                  <span className="text-sm font-semibold text-teal-700">{selectedService.title}</span>
                </div>
                <p className="text-xs text-teal-600">{selectedService.details}</p>
              </div>
            )}
            
            <p className="text-gray-600 text-sm">
              Upload {isMobile ? '1 photo' : 'up to 3 photos'} of your maintenance issue for instant analysis and cost estimates.
            </p>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
                {error}
              </div>
            )}
            
            <div 
              className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                isDragging 
                  ? 'border-teal-400 bg-teal-50' 
                  : 'border-gray-300 hover:border-teal-400'
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
                      className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center space-x-2"
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
                  
                  {selectedImages.length < maxImages && (
                    <div className={`grid gap-2 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                      <button
                        onClick={startCamera}
                        className="bg-teal-100 hover:bg-teal-200 text-teal-700 px-3 py-2 rounded text-sm font-semibold flex items-center justify-center space-x-1"
                      >
                        <Camera size={14} />
                        <span>Add Photo</span>
                      </button>
                      <label className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded text-sm font-semibold cursor-pointer flex items-center justify-center space-x-1">
                        <input 
                          type="file" 
                          accept="image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/webp"
                          multiple={!isMobile}
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <span>📁</span>
                        <span>Add More</span>
                      </label>
                    </div>
                  )}
                  
                  <div className="text-xs text-center text-gray-500">
                    {selectedImages.length}/{maxImages} {isMobile ? 'image' : 'images'} uploaded
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col items-center space-y-2">
                    <Camera size={32} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {isDragging ? 'Drop images here' : isMobile ? 'Capture or upload 1 photo' : 'Drag & drop, capture, or upload photos (max 3)'}
                    </span>
                  </div>
                  <div className={`grid gap-2 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    <button
                      onClick={startCamera}
                      className="bg-teal-400 hover:bg-teal-500 text-white px-3 py-2 rounded text-sm font-semibold flex items-center justify-center space-x-1"
                    >
                      <Camera size={14} />
                      <span>Take Photo</span>
                    </button>
                    <label className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded text-sm font-semibold cursor-pointer flex items-center justify-center space-x-1">
                      <input 
                        type="file" 
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/webp"
                        multiple={!isMobile}
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

            {chatMode ? (
              <div className="space-y-3">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageCircle size={16} className="text-teal-500" />
                    <span className="text-sm font-semibold text-teal-700">Let's get more details</span>
                  </div>
                  <p className="text-xs text-teal-600">I need a bit more information to provide an accurate estimate.</p>
                </div>

                <div className="border rounded-lg p-3 bg-gray-50 max-h-64 overflow-y-auto space-y-3">
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        msg.role === 'user' 
                          ? 'bg-teal-400 text-white rounded-br-none' 
                          : 'bg-white border border-gray-200 rounded-bl-none'
                      }`}>
                        <div className="whitespace-pre-line">{msg.content}</div>
                      </div>
                    </div>
                  ))}
                  {isAnalyzing && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 p-3 rounded-lg text-sm">
                        <Loader className="animate-spin w-4 h-4 text-teal-500" />
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
                    className={`flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:border-teal-400 focus:ring-1 focus:ring-teal-400 outline-none ${
                      isMobile ? 'text-base' : ''
                    }`}
                    disabled={isAnalyzing}
                  />
                  <button 
                    onClick={handleChatSend}
                    disabled={!chatInput.trim() || isAnalyzing}
                    className="bg-teal-400 hover:bg-teal-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 rounded-lg"
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
              <>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue in detail (e.g., 'Water leaking from pipe joint under kitchen sink', 'Electrical outlet not working in bedroom')"
                  className={`w-full p-3 border border-gray-300 rounded-lg resize-none text-sm focus:border-teal-400 focus:ring-1 focus:ring-teal-400 outline-none ${
                    isMobile ? 'text-base' : ''
                  }`}
                  rows={isMobile ? 3 : 4}
                />

                <button
                  onClick={analyzeIssue}
                  disabled={selectedImages.length === 0 || !description}
                  className={`w-full bg-teal-400 hover:bg-teal-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
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
            <Loader className="animate-spin mx-auto w-8 h-8 text-teal-500" />
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
              <div className="bg-teal-50 p-3 rounded-lg">
                <h4 className="font-semibold text-teal-700 mb-2">Cost Estimate</h4>
                
                <div className="bg-teal-100 border border-teal-300 rounded p-2 mb-3 text-xs text-teal-600">
                  <strong>⚠️ Preliminary Estimate:</strong> Labor costs and hours are approximate and may vary based on project complexity, site conditions, and unforeseen circumstances discovered during work.
                </div>
                 
                {analysis.cost_estimate.pricing_note && (
                  <div className="bg-green-50 border border-green-200 rounded p-3 mb-3 text-xs text-green-700">
                    {analysis.cost_estimate.pricing_note}
                  </div>
                )}

                {analysis.cost_estimate.service_call_fee && (
                  <div className="bg-teal-50 border border-teal-200 rounded p-3 mb-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-teal-500 font-semibold">Service Call Fee:</span>
                      <span className="text-teal-700 font-bold">${analysis.cost_estimate.service_call_fee}</span>
                    </div>
                    <div className="text-xs text-teal-500 mt-1">
                      Includes diagnosis + first 30 minutes of work
                    </div>
                  </div>
                )}

                <div className={`grid gap-2 text-sm ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {analysis.cost_estimate.parts_cost && (
                    <div>
                      <span className="text-teal-500">Materials:</span>
                      <div className="font-semibold">
                        ${analysis.cost_estimate.parts_cost.min} - ${analysis.cost_estimate.parts_cost.max}
                      </div>
                    </div>
                  )}

                  {analysis.cost_estimate.labor_cost && (
                    <div>
                      <span className="text-teal-500">Labor (Est.):</span>
                      <div className="font-semibold">
                        ${analysis.cost_estimate.labor_cost}
                        {analysis.cost_estimate.labor_hours && (
                          <div className="text-xs text-blue-500">
                            (~{analysis.cost_estimate.labor_hours} hours)
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-green-600 mt-1">
                        ⏱️ You pay actual hours only. Finish early = you save!
                      </div>
                    </div>
                  )}
                  {analysis.cost_estimate.disposal_cost > 0 && (
                    <div>
                      <span className="text-teal-500">Disposal:</span>
                      <div className="font-semibold">${analysis.cost_estimate.disposal_cost}</div>
                    </div>
                  )}
                  {analysis.cost_estimate.permits_misc > 0 && (
                    <div>
                      <span className="text-teal-500">Permits/Misc:</span>
                      <div className="font-semibold">${analysis.cost_estimate.permits_misc}</div>
                    </div>
                  )}
                </div>
                <div className="mt-2 pt-2 border-t border-teal-200">
                  <span className="text-teal-500">Estimated Total Range:</span>
                  <div className="font-bold text-lg text-teal-700">
                    ${analysis.cost_estimate.total_cost.min} - ${analysis.cost_estimate.total_cost.max}
                  </div>
                  {analysis.analysis?.time_estimate && analysis.analysis.time_estimate !== 'TBD' && (
                    <div className="text-xs text-teal-500 mt-1">
                      Estimated time: {analysis.analysis.time_estimate}
                    </div>
                  )}
                  <div className="text-xs text-teal-500 mt-2 italic">
                    Final pricing confirmed after on-site inspection
                  </div>
                </div>
              </div>
            )}

            {feedbackMode ? (
              <div className="border-t pt-4 space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageCircle size={16} className="text-green-600" />
                    <span className="text-sm font-semibold text-green-800">Questions about this estimate?</span>
                  </div>
                  <p className="text-xs text-green-700">Ask me anything about costs, materials, timeline, or DIY options.</p>
                </div>

                <div className="border rounded-lg p-3 bg-gray-50 max-h-48 overflow-y-auto space-y-3">
                  {feedbackHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-2 rounded-lg text-sm ${
                        msg.role === 'user' 
                          ? 'bg-teal-400 text-white rounded-br-none' 
                          : 'bg-white border border-gray-200 rounded-bl-none'
                      }`}>
                        <div className="whitespace-pre-line">{msg.content}</div>
                      </div>
                    </div>
                  ))}
                  {isAnalyzing && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 p-2 rounded-lg">
                        <Loader className="animate-spin w-4 h-4 text-teal-500" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <input
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isAnalyzing && handleFeedbackChat()}
                    placeholder="Ask about materials, timeline, DIY..."
                    className={`flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:border-teal-400 focus:ring-1 focus:ring-teal-400 outline-none ${
                      isMobile ? 'text-base' : ''
                    }`}
                    disabled={isAnalyzing}
                  />
                  <button 
                    onClick={handleFeedbackChat}
                    disabled={!feedbackInput.trim() || isAnalyzing}
                    className="bg-teal-400 hover:bg-teal-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 rounded-lg"
                  >
                    <Send size={16} />
                  </button>
                </div>

                <button
                  onClick={() => setFeedbackMode(false)}
                  className="w-full text-xs text-gray-600 hover:text-gray-800 underline"
                >
                  Hide Chat
                </button>
              </div>
            ) : (
              <button
                onClick={() => setFeedbackMode(true)}
                className="w-full bg-green-50 hover:bg-green-100 text-green-800 py-2 px-4 rounded-lg font-semibold text-sm border border-green-200 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle size={16} />
                <span>Ask Questions About This Estimate</span>
              </button>
            )}

            <div className="space-y-2">
              <button 
                onClick={() => handleScheduleAppointment(analysis)}
                className={`w-full bg-teal-400 hover:bg-teal-500 text-white py-2 px-4 rounded-lg font-semibold text-sm ${
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

      {isMobile && <div className="h-4"></div>}
    </div>
  );
}