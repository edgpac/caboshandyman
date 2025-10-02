import React, { useState } from 'react';
import { Phone, Mail, MapPin, Calendar, ArrowRight, MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  buttons?: Array<{ text: string; action: string }>;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Maintenance Master's AI assistant. We've been building visions and shaping the future since 1994. How can I help you today?",
      isUser: false,
      buttons: [
        { text: "Get Project Estimate", action: "estimate" },
        { text: "Emergency Service", action: "emergency" },
        { text: "View Portfolio", action: "portfolio" },
        { text: "Schedule Consultation", action: "consultation" }
      ]
    }
  ]);
  const [input, setInput] = useState('');

  const handleButtonClick = (action: string) => {
    let responseText = "";
    let responseButtons: Array<{ text: string; action: string }> = [];

    switch (action) {
      case 'emergency':
        responseText = "🚨 EMERGENCY SERVICE AVAILABLE 24/7 🚨\n\nFor water damage, fire restoration, or structural emergencies, we respond within 30 minutes. Call (805) 555-0123 now!";
        responseButtons = [
          { text: "Water Damage", action: "water_damage" },
          { text: "Call Now", action: "call_emergency" }
        ];
        break;
      case 'estimate':
        responseText = "I'd love to help estimate your project! What type of maintenance work are you considering?";
        responseButtons = [
          { text: "Kitchen Remodel", action: "kitchen" },
          { text: "Bathroom Renovation", action: "bathroom" },
          { text: "Commercial Project", action: "commercial" }
        ];
        break;
      default:
        responseText = "Let me connect you with our team for personalized assistance. What's the best way to reach you?";
        responseButtons = [
          { text: "Call Me", action: "request_call" },
          { text: "Send Email", action: "request_email" }
        ];
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: `Selected: ${action.replace(/_/g, ' ').toUpperCase()}`,
      isUser: true
    };

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      isUser: false,
      buttons: responseButtons
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true
    };

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "Thank you for your message! Our team will get back to you shortly. For immediate assistance, please call (805) 555-0123.",
      isUser: false
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-primary hover:bg-primary-hover text-primary-foreground rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-300 hover:scale-110"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-card border shadow-2xl rounded-lg flex flex-col z-40">
          <div className="bg-dark-surface p-4 rounded-t-lg text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">MM</span>
              </div>
              <div>
                <h3 className="font-bold">Maintenance Master</h3>
                <p className="text-sm opacity-90">Building Dreams Since 1994</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-muted/20">
            {messages.map((message) => (
              <div key={message.id}>
                <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-card text-card-foreground rounded-bl-sm border'
                  }`}>
                    <div className="whitespace-pre-line">{message.text}</div>
                  </div>
                </div>
                
                {message.buttons && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.buttons.map((button, index) => (
                      <button
                        key={index}
                        onClick={() => handleButtonClick(button.action)}
                        className="px-3 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-all"
                      >
                        {button.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t bg-card">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about our services..."
                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary-hover transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}