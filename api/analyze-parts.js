import React, { useState, useEffect } from 'react';
import { Camera, Send, Bot, Wrench, AlertCircle, Loader, Home, Zap, Building, Users, MessageCircle } from 'lucide-react';

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
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
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
        setBookingData(prev => ({...prev, serviceType: 'General Consultation'}));
      }
    }
  }, [initialMode, assistantIsOpen]);

  const handleClose = () => {
    if (onClose) onClose();
    else setIsOpen(false);
    resetAssistant();
  };

  const services = [
    {
      title: "Residential Maintenance",
      description: "Kitchen, bathroom, and home renovations with premium finishes.",
      icon: Home,
      details: "Complete home renovations including kitchens, bathrooms, flooring, painting, and custom installations.",
      calendlyUrl: "https://cal.com/maintenancemaster/residential-consultation"
    },
    {
      title: "Emergency Services", 
      description: "24/7 response for water damage, electrical issues, and urgent repairs.",
      icon: Zap,
      details: "Immediate emergency response for water damage, electrical issues, structural problems, and urgent repairs.",
      calendlyUrl: "https://cal.com/maintenancemaster/emergency-service-assessment"
    },
    {
      title: "Commercial Projects",
      description: "Office buildouts, retail spaces, and commercial maintenance.",
      icon: Building,
      details: "Professional commercial services including office buildouts, retail renovations, and ongoing maintenance.",
      calendlyUrl: "https://cal.com/maintenancemaster/commercial-project-consultation"
    },
    {
      title: "HOA & Property Maintenance",
      description: "Comprehensive maintenance solutions for communities.",
      icon: Users,
      details: "Complete property management services for HOAs and multi-unit properties.",
      calendlyUrl: "https://cal.com/maintenancemaster/hoa-property-assessment"
    }
  ];

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: isMobile ? 1280 : 1920 },
          height: { ideal: isMobile ? 720 : 1080 }
        }
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
    } catch (error) {
      console.error('Camera access failed:', error);
      setError('Camera access denied. Please check permissions.');
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
      setError(`Maximum ${maxImages} image${maxImages > 1 ? 's' : ''} allowed ${isMobile ? 'on mobile' : ''}`);
      return;
    }

    const video = document.getElementById('cameraVideo');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      const file = new File([blob], `maintenance-${Date.now()}.jpg`, { type: 'image/jpeg' });
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImages(prev => [...prev, { url: e.target.result, file }]);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }, 'image/jpeg', 0.85);
  };

  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [stream]);

  useEffect(() => {
    if (!assistantIsOpen && stream) stopCamera();
  }, [assistantIsOpen, stream]);

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        let { width, height } = img;
        const maxDimension = isMobile ? 1024 : 1600;
        
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
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const sizeKB = blob.size / 1024;
            console.log(`Compressed to ${Math.round(sizeKB)}KB`);
            
            if (sizeKB > 500) {
              canvas.toBlob((smallerBlob) => {
                resolve(smallerBlob || blob);
              }, 'image/jpeg', 0.65);
            } else {
              resolve(blob);
            }
          } else {
            reject(new Error('Compression failed'));
          }
        }, 'image/jpeg', isMobile ? 0.75 : 0.85);
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;
      img.onload = () => URL.revokeObjectURL(objectUrl);
    });
  };

  const imageToBase64 = async (file) => {
    try {
      console.log(`Processing: ${file.name}, ${Math.round(file.size / 1024)}KB`);
      const compressedBlob = await compressImage(file);
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result.split(',')[1];
          const sizeKB = (base64.length * 3) / 4 / 1024;
          console.log(`Final size: ${Math.round(sizeKB)}KB`);
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(compressedBlob);
      });
    } catch (error) {
      console.error('Compression failed:', error);
      setError('Failed to process image. Try a different photo.');
      throw error;
    }
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', content: chatInput };
    const newChatHistory = [...chatHistory, userMessage];
    setChatHistory(newChatHistory);
    setChatInput('');
    setIsAnalyzing(true);

    try {
      const imagePromises = selectedImages.map(img => imageToBase64(img.file));
      const imagesBase64 = await Promise.all(imagePromises);

      const response = await fetch('/api/analyze-parts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          images: imagesBase64,
          description: chatInput,
          location: location || 'Cabo San Lucas, Mexico',
          service_context: selectedService ? {
            title: selectedService.title,
            category: selectedService.title.toLowerCase().replace(' ', '_')
          } : null,
          chat_history: newChatHistory,
          device_type: isMobile ? 'mobile' : 'desktop'
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
      setError('Unable to process message. Try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeIssue = async () => {
    // Validate description length
    if (description.trim().length < 10) {
      setError('Please provide a more detailed description (at least 10 characters)');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      console.log(`Starting analysis: ${selectedImages.length} images, ${isMobile ? 'mobile' : 'desktop'}`);
      
      const timeoutMs = isMobile ? 25000 : 50000;
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Analysis timeout. Try fewer/smaller images.')), timeoutMs)
      );
      
      const analysisPromise = (async () => {
        const imagePromises = selectedImages.map(img => imageToBase64(img.file));
        const imagesBase64 = await Promise.all(imagePromises);
        
        const payloadSize = imagesBase64.reduce((sum, img) => sum + img.length, 0);
        const payloadMB = (payloadSize * 0.75) / (1024 * 1024);
        console.log(`Payload: ${payloadMB.toFixed(2)}MB`);
        
        if (payloadMB > 4) {
          throw new Error('Images too large (>4MB). Use fewer or smaller images.');
        }
        
        const analysisDescription = selectedService 
          ? `${description} (Service: ${selectedService.title})`
          : description;

        const response = await fetch('/api/analyze-parts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            images: imagesBase64,
            description: analysisDescription,
            location: location || 'Cabo San Lucas, Mexico',
            service_context: selectedService ? {
              title: selectedService.title,
              category: selectedService.title.toLowerCase().replace(' ', '_')
            } : null,
            device_type: isMobile ? 'mobile' : 'desktop',
            platform: 'vercel'
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          if (response.status === 413) throw new Error('Images too large. Use smaller photos.');
          if (response.status === 504) throw new Error('Server timeout. Try 1-2 images.');
          throw new Error(errorData.error || `Server error (${response.status})`);
        }

        return await response.json();
      })();
      
      const result = await Promise.race([analysisPromise, timeoutPromise]);

      if (result.is_off_topic) {
        setError(result.message);
        setAnalysis(null);
        return;
      }

      if (result.needs_clarification) {
        setChatMode(true);
        setClarificationNeeded(result);
        setChatHistory([{
          role: 'assistant',
          content: `I need more details to provide an accurate estimate:\n\n• ${result.clarification_questions.join('\n• ')}`
        }]);
        return;
      }

      if (result.success) {
        setAnalysis(result);
      } else {
        setAnalysis({
          success: true,
          analysis: result.fallback || result.analysis,
          pricing: [],
          stores: [],
          cost_estimate: result.cost_estimate || { total_cost: { min: 200, max: 400 } }
        });
      }
    } catch (err) {
      console.error('Analysis error:', err);
      
      let errorMessage = err.message;
      if (err.message.includes('timeout')) {
        errorMessage = 'Analysis timed out. Try with just 1 clearer image.';
      } else if (err.message.includes('too large')) {
        errorMessage = 'Images too large. Use smaller photos or reduce to 1 image.';
      } else if (err.message.includes('Failed to fetch')) {
        errorMessage = 'Connection failed. Check internet and try again.';
      }
      
      setError(errorMessage);
      setAnalysis({
        success: false,
        analysis: {
          issue_type: 'Analysis Unavailable',
          severity: 'Unknown',
          description: 'Contact us directly or try with different images.',
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
    const maxImages = isMobile ? 1 : 3;
    
    if (selectedImages.length + imageFiles.length > maxImages) {
      setError(`Maximum ${maxImages} image${maxImages > 1 ? 's' : ''} allowed ${isMobile ? 'on mobile' : ''}`);
      return;
    }

    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImages(prev => [...prev, { url: e.target.result, file }]);
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
    const maxImages = isMobile ? 1 : 3;
    
    if (selectedImages.length + imageFiles.length > maxImages) {
      setError(`Maximum ${maxImages} image${maxImages > 1 ? 's' : ''} allowed ${isMobile ? 'on mobile' : ''}`);
      return;
    }

    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImages(prev => [...prev, { url: e.target.result, file }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const resetAssistant = () => {
    if (stream) stopCamera();
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
    setBookingData({ name: '', phone: '', serviceType: '', projectDetails: '', urgency: 'normal' });
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
    if (externalIsOpen !== undefined) return null;
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 ${isMobile ? 'p-3' : 'p-4'}`}
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
        <button onClick={handleClose} className="text-white hover:text-gray-200 text-xl leading-none">×</button>
      </div>

      <div className={`p-4 overflow-y-auto flex-1 ${isMobile ? 'pb-safe' : ''}`}>
        {currentView === 'services' && !analysis && !isAnalyzing && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">How can we help?</h3>
              <p className="text-sm text-gray-600">Choose a service or analyze an issue</p>
            </div>

            <div className="space-y-3">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div 
                    key={index}
                    className={`border border-gray-200 rounded-lg p-3 hover:border-blue-600 hover:bg-gray-50 cursor-pointer transition-colors ${isMobile ? 'active:bg-blue-50' : ''}`}
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
          </div>
        )}

        {currentView === 'booking' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Get Estimate</h3>
              <button onClick={() => setCurrentView('services')} className="text-sm text-blue-600 hover:text-blue-800">
                ← Back
              </button>
            </div>

            {selectedService && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-1">
                  <selectedService.icon size={16} className="text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">{selectedService.title}</span>
                </div>
                <p className="text-xs text-blue-700">{selectedService.details}</p>
              </div>
            )}
            
            <p className="text-gray-600 text-sm">
              Upload {isMobile ? '1 photo' : 'up to 3 photos'} for AI analysis and cost estimates.
              {isMobile && <span className="block mt-1 text-xs text-blue-600">💡 Mobile: 1 image for faster results</span>}
            </p>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
                {error}
              </div>
            )}
            
            <div 
              className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                isDragging ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-blue-600'
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
                      if (video && stream) video.srcObject = stream;
                    }}
                    className={`w-full bg-black rounded object-cover ${isMobile ? 'h-64' : 'h-48'}`}
                  />
                  <div className={`flex justify-center ${isMobile ? 'flex-col space-y-2' : 'space-x-2'}`}>
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
                  <div className={`grid gap-2 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={image.url} 
                          alt={`Issue ${index + 1}`}
                          className="w-full h-32 object-cover rounded border border-gray-200"
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
                  
                  {selectedImages.length < (isMobile ? 1 : 3) && (
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
                          multiple={!isMobile}
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <span>📁</span>
                        <span>Upload</span>
                      </label>
                    </div>
                  )}
                  
                  <div className="text-xs text-center text-gray-500">
                    {selectedImages.length}/{isMobile ? 1 : 3} images
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col items-center space-y-2">
                    <Camera size={32} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {isDragging ? 'Drop images here' : `Upload photo${isMobile ? '' : 's (max 3)'}`}
                    </span>
                    {isMobile && (
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        📱 Mobile: 1 photo for fastest results
                      </span>
                    )}
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
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageCircle size={16} className="text-blue-600" />
                    <span className="text-sm font-semibold text-blue-800">More details needed</span>
                  </div>
                  <p className="text-xs text-blue-700">Help me understand your issue better for an accurate estimate.</p>
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
                      <div className="bg-white border border-gray-200 p-3 rounded-lg">
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
                    className={`flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none ${isMobile ? 'text-base' : ''}`}
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
              <>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue in detail (e.g., 'Toilet flush valve leaking, needs replacement', 'Kitchen faucet dripping from base')"
                  className={`w-full p-3 border border-gray-300 rounded-lg resize-none text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none ${isMobile ? 'text-base' : ''}`}
                  rows={isMobile ? 4 : 5}
                />
                <div className="text-xs text-gray-500 -mt-2">
                  ⚠️ Be specific! Include what needs fixing and where it's located.
                </div>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location (optional, e.g., Cabo San Lucas)"
                  className={`w-full p-3 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none ${isMobile ? 'text-base' : ''}`}
                />

                <button
                  onClick={analyzeIssue}
                  disabled={selectedImages.length === 0 || !description || description.trim().length < 10}
                  className={`w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${isMobile ? 'py-4' : ''}`}
                >
                  <Send size={16} />
                  <span>Get AI Estimate</span>
                </button>
                {(!description || description.trim().length < 10) && (
                  <p className="text-xs text-orange-600 text-center -mt-2">
                    Please provide at least 10 characters of description
                  </p>
                )}
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
              <p>💡 Identifying parts</p>
              <p>💰 Calculating costs</p>
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
              <div className={`flex items-center justify-between mt-2 text-xs ${isMobile ? 'flex-col items-start space-y-1' : ''}`}>
                <span>Severity: {analysis.analysis?.severity || 'Unknown'}</span>
                <span>Difficulty: {analysis.analysis?.difficulty_level || 'Professional'}</span>
              </div>
            </div>

            {analysis.cost_estimate && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Cost Estimate</h4>
                
                <div className="bg-blue-100 border border-blue-300 rounded p-2 mb-3 text-xs text-blue-700">
                  <strong>⚠️ Preliminary:</strong> Costs may vary based on actual conditions found during inspection.
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
                </div>
                <div className="mt-2 pt-2 border-t border-blue-200">
                  <span className="text-blue-600">Estimated Total:</span>
                  <div className="font-bold text-lg text-blue-800">
                    ${analysis.cost_estimate.total_cost.min} - ${analysis.cost_estimate.total_cost.max}
                  </div>
                  <div className="text-xs text-blue-600 mt-2 italic">
                    Final pricing confirmed after on-site inspection
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <button 
                onClick={() => window.open(selectedService?.calendlyUrl || 'https://cal.com/maintenancemaster/residential-consultation', '_blank')}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold text-sm ${isMobile ? 'py-3' : ''}`}
              >
                Schedule Service
              </button>
              <button 
                onClick={resetAssistant}
                className={`w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-semibold text-sm ${isMobile ? 'py-3' : ''}`}
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