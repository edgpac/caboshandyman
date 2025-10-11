// api/feedback-chat.js - TRULY INTELLIGENT CONVERSATIONAL AI v2
// Built to understand human conversation patterns with advanced error handling

import { createClient } from '@supabase/supabase-js';

export const config = {
  maxDuration: 30
};

const supabase = createClient(
  'https://okwcasooleetwvfuwtuz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rd2Nhc29vbGVldHd2ZnV3dHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNjUwMzEsImV4cCI6MjA3NDk0MTAzMX0.942cbD0ITALrlHoI0A5o8kGx3h-XQ1k4DPSxrXoIcXc'
);

// ========================================
// SMART EXTRACTION FUNCTIONS
// ========================================

function extractWorkOrderNumber(text) {
  // Try multiple patterns, prioritize explicit WO- format
  const patterns = [
    /WO-?(\d{10,})/i,           // WO-1234567890 or WO1234567890
    /#(\d{10,})/,                // #1234567890
    /order\s*#?\s*(\d{10,})/i,   // order 1234567890
    /(\d{13})/,                  // Standalone 13-digit timestamp
    /(\d{10,})/                  // Any 10+ digit number
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function extractName(text) {
  // Try multiple name patterns with better accuracy
  const patterns = [
    /(?:name\s+(?:is\s+)?|last\s*name\s*(?:is)?\s*|i'm\s+|i\s+am\s+|my\s+name\s*(?:is)?\s*|mr\.?\s+|mrs\.?\s+|ms\.?\s+)([a-z]{2,})/i,
    /^([a-z]{3,})$/i,  // Just a name by itself (3+ letters)
    /\b([a-z]{4,})\s*$/i, // Last word if 4+ letters (common pattern)
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function analyzeIntent(text, history) {
  const lower = text.toLowerCase();
  
  // Status/lookup intent - ONLY if explicit status keywords
  const statusKeywords = ['status', 'check my', 'my appointment', 'my order', 'when is', 
                          'what time', 'scheduled', 'confirm my', 'look up my'];
  const hasStatusIntent = statusKeywords.some(kw => lower.includes(kw));
  
  // Cancellation intent
  const cancelKeywords = ['cancel', 'cancellation', 'delete', 'remove', 'stop', 'abort'];
  const hasCancelIntent = cancelKeywords.some(kw => lower.includes(kw));
  
  // Reschedule intent
  const rescheduleKeywords = ['reschedule', 'change', 'move', 'different time', 'different day', 'postpone'];
  const hasRescheduleIntent = rescheduleKeywords.some(kw => lower.includes(kw));
  
  // General service questions - PRIORITIZE THIS
  const serviceKeywords = ['how much', 'cost', 'price', 'estimate', 'quote', 
                           'what does it cost', 'repair', 'install', 'emergency'];
  const hasServiceIntent = serviceKeywords.some(kw => lower.includes(kw));
  
  // Greeting detection
  const greetingKeywords = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'hola'];
  const isGreeting = greetingKeywords.some(kw => lower.startsWith(kw));
  
  return {
    wantsStatus: hasStatusIntent && !hasServiceIntent, // ← CHANGED: Don't override service questions
    wantsCancel: hasCancelIntent,
    wantsReschedule: hasRescheduleIntent,
    wantsServiceInfo: hasServiceIntent,
    isGreeting: isGreeting,
    isFollowUp: text.length < 50 && !hasStatusIntent && !hasCancelIntent && !hasServiceIntent && !isGreeting
  };
}

function buildContextFromHistory(history) {
  let context = {
    workOrderNum: null,
    clientName: null,
    lastAskedFor: null,
    conversationTopic: null,
    customerSeemsConfused: false
  };
  
  // Scan last 8 messages
  for (let i = Math.max(0, history.length - 8); i < history.length; i++) {
    const msg = history[i];
    
    if (msg.role === 'user') {
      // Extract any work order numbers mentioned
      if (!context.workOrderNum) {
        context.workOrderNum = extractWorkOrderNumber(msg.content);
      }
      
      // Extract any names mentioned
      if (!context.clientName) {
        context.clientName = extractName(msg.content);
      }
      
      // Detect confusion - NEW!
      const confusionWords = ['what', 'huh', 'confused', 'don\'t understand', 'help'];
      if (confusionWords.some(w => msg.content.toLowerCase().includes(w))) {
        context.customerSeemsConfused = true;
      }
    }
    
    if (msg.role === 'assistant') {
      // Track what we asked for
      if (/work order number/i.test(msg.content)) {
        context.lastAskedFor = 'workorder';
      }
      if (/last name|your name/i.test(msg.content)) {
        context.lastAskedFor = 'name';
      }
      
      // Detect conversation topic
      if (/cancel/i.test(msg.content)) {
        context.conversationTopic = 'cancellation';
      } else if (/reschedule|change/i.test(msg.content)) {
        context.conversationTopic = 'reschedule';
      } else if (/status|scheduled|appointment/i.test(msg.content)) {
        context.conversationTopic = 'status';
      }
    }
  }
  
  return context;
}

// ========================================
// DATABASE LOOKUP FUNCTION - IMPROVED
// ========================================

async function lookupWorkOrder(workOrderNum, clientName) {
  console.log('🔍 Database lookup:', { workOrderNum, clientName });
  
  const { data, error } = await supabase
    .from('pending')
    .select('*')
    .eq('work_order_number', `WO-${workOrderNum}`)
    .single();

  if (error || !data) {
    return {
      success: false,
      error: 'not_found',
      message: `I couldn't find work order WO-${workOrderNum} in our system. 

This could be a typo - please double-check your work order number. It should be 13 digits long (like WO-1234567890123).

You can also:
- Check your confirmation email for the correct number
- Call us at +52 612 169 8328 and we'll look it up by name

Need help with anything else?`
    };
  }

  if (!data.client_name.toLowerCase().includes(clientName.toLowerCase())) {
    return {
      success: false,
      error: 'name_mismatch',
      message: `Hmm, the last name "${clientName}" doesn't match our records for WO-${workOrderNum}.

This could be:
- A typo in the name (try just your last name)
- The work order is under a different name (spouse, business, etc.)
- A different work order number

For security, please call +52 612 169 8328 and we'll help verify your information.`
    };
  }

  // Build response
  const total = data.items?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;
  
  let schedText = 'not yet scheduled';
  if (data.scheduled_date) {
    const d = new Date(data.scheduled_date);
    schedText = d.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
    if (data.scheduled_time) {
      schedText += ` at ${data.scheduled_time}`;
    }
  }

  // Smart status messaging - NEW!
  let statusEmoji = '📋';
  let statusMessage = data.status || 'Pending';
  
  if (data.status === 'Scheduled') {
    statusEmoji = '✅';
  } else if (data.status === 'In Progress') {
    statusEmoji = '🔧';
    statusMessage = 'In Progress - Our crew is working on it!';
  } else if (data.status === 'Completed') {
    statusEmoji = '✔️';
  } else if (data.status === 'Pending') {
    statusEmoji = '⏳';
    statusMessage = 'Pending - We\'ll schedule you soon!';
  }

  return {
    success: true,
    data: data,
    message: `${statusEmoji} **Work Order ${data.work_order_number}**

**Status:** ${statusMessage}
**Scheduled:** ${schedText}
${data.assigned_crew ? `**Crew:** ${data.assigned_crew}\n` : ''}**Total:** $${total.toFixed(2)}
${data.notes ? `\n**Notes:** ${data.notes}\n` : ''}
Need to reschedule or cancel? Just ask!`
  };
}

// ========================================
// CANCELLATION FUNCTION - IMPROVED
// ========================================

async function processCancellation(workOrderNum, clientName) {
  const lookup = await lookupWorkOrder(workOrderNum, clientName);
  
  if (!lookup.success) {
    return lookup.message;
  }

  const data = lookup.data;

  if (data.status === 'Completed') {
    return `Work order ${data.work_order_number} is already completed and can't be cancelled. If you have concerns about the completed work, please call +52 612 169 8328 and we'll make it right!`;
  }

  if (data.status === 'Cancellation Requested') {
    return `Your cancellation request for ${data.work_order_number} is already being processed. We'll contact you shortly to confirm. Call +52 612 169 8328 if you need immediate assistance.`;
  }

  // Update to cancellation requested
  await supabase
    .from('pending')
    .update({ status: 'Cancellation Requested' })
    .eq('id', data.id);

  // Send notification
  try {
    const total = data.items?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;
    await fetch('https://caboshandyman.com/api/send-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `🚫 CANCELLATION REQUEST

WO: ${data.work_order_number}
Client: ${data.client_name}
Phone: ${data.client_phone || 'N/A'}
Scheduled: ${data.scheduled_date || 'TBD'}
Total: $${total.toFixed(2)}

Action Required: Contact customer to confirm cancellation.`,
        phone: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP_NUMBER
      })
    });
  } catch (err) {
    console.error('Notification failed');
  }

  return `✅ Cancellation request submitted for ${data.work_order_number}. 

Our team will contact you within 1 hour to confirm the cancellation. 

Need immediate assistance? Call +52 612 169 8328.`;
}

// ========================================
// RESCHEDULE HANDLER - NEW!
// ========================================

async function handleReschedule(workOrderNum, clientName) {
  const lookup = await lookupWorkOrder(workOrderNum, clientName);
  
  if (!lookup.success) {
    return lookup.message;
  }

  const data = lookup.data;

  if (data.status === 'Completed') {
    return `This work order is already completed. If you need additional service, please call +52 612 169 8328 or use our instant quote tool!`;
  }

  return `I can help you reschedule work order ${data.work_order_number}! 

**Current schedule:** ${data.scheduled_date ? new Date(data.scheduled_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Not yet scheduled'}

To reschedule, please call us at +52 612 169 8328 and we'll find a time that works better for you. Our team can usually accommodate changes with 24-hour notice.`;
}

// ========================================
// GROQ AI FALLBACK - IMPROVED
// ========================================

async function getGroqResponse(question, history, context) {
  const systemPrompt = `You are a helpful AI assistant for Cabos Handyman in Cabo San Lucas, Mexico.

**YOUR ROLE:**
Answer general questions about services, pricing, hours, and policies. Be friendly, warm, and concise (2-3 sentences max).

**SERVICES:**
- Residential Maintenance (kitchens, bathrooms, home renovations)
- Emergency Services 24/7 (water damage, electrical, structural issues)
- Commercial Projects (office buildouts, retail spaces)
- HOA & Property Maintenance

**PRICING EXAMPLES:**
- Service call: $100 (includes diagnosis + first 30 minutes)
- Leak repairs: $200-$600
- Electrical work: $150-$500
- Plumbing: $200-$800
- Emergency service: +50% after hours
- We provide FREE instant quotes via our photo analysis tool

**BUSINESS HOURS:**
- Monday-Saturday: 7:00 AM - 6:00 PM
- Emergency service: 24/7
- Located in Cabo San Lucas, Mexico
- Phone: +52 612 169 8328

**IMPORTANT RULES:**
- DON'T ask for work order numbers or customer info - the system handles that automatically
- If you don't know something specific, suggest calling +52 612 169 8328
- Mention our instant quote tool for detailed project estimates
- Be conversational and helpful, not robotic
- Keep responses SHORT (2-3 sentences)

Be warm, friendly, and genuinely helpful.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...history.slice(-6),
          { role: 'user', content: question }
        ],
        temperature: 0.7,
        max_tokens: 250
      })
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || 'I\'m here to help! What can I assist you with?';
  } catch (error) {
    console.error('Groq failed:', error);
    return 'I\'m having a technical issue right now. Please call +52 612 169 8328 for immediate assistance, or try asking again in a moment.';
  }
}

// ========================================
// MAIN HANDLER
// ========================================

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { question, history = [] } = req.body;
    if (!question) return res.status(400).json({ error: 'Question required' });

    console.log('💬 User:', question.substring(0, 100));

    // Build context from conversation
    const context = buildContextFromHistory(history);
    
    // Extract info from current message
    const currentWO = extractWorkOrderNumber(question);
    const currentName = extractName(question);
    
    // Merge with context
    const workOrderNum = currentWO || context.workOrderNum;
    const clientName = currentName || context.clientName;
    
    // Analyze what user wants
    const intent = analyzeIntent(question, history);
    
    console.log('🧠 Intelligence:', { 
      workOrderNum, 
      clientName, 
      intent: Object.keys(intent).filter(k => intent[k]),
      lastAskedFor: context.lastAskedFor,
      topic: context.conversationTopic
    });

    // ========================================
    // DECISION TREE - TRULY SMART
    // ========================================

    // SCENARIO 0: Friendly greeting - NEW!
    if (intent.isGreeting && !intent.wantsStatus && !intent.wantsCancel) {
      return res.status(200).json({
        success: true,
        response: "Hi there! 👋 I'm here to help you with:\n\n• Check your appointment status\n• Cancel or reschedule service\n• Answer questions about our services\n• Get instant quotes\n\nWhat can I help you with today?"
      });
    }

    // SCENARIO 1: User wants to cancel
    if (intent.wantsCancel || context.conversationTopic === 'cancellation') {
      if (!workOrderNum) {
        return res.status(200).json({
          success: true,
          response: "I can help cancel your work order. What's your work order number? (It's in your confirmation email)"
        });
      }
      
      if (!clientName) {
        return res.status(200).json({
          success: true,
          response: "And your last name for verification?"
        });
      }
      
      const result = await processCancellation(workOrderNum, clientName);
      return res.status(200).json({ success: true, response: result });
    }

    // SCENARIO 2: User wants to reschedule - NEW!
    if (intent.wantsReschedule || context.conversationTopic === 'reschedule') {
      if (!workOrderNum) {
        return res.status(200).json({
          success: true,
          response: "I can help you reschedule! What's your work order number?"
        });
      }
      
      if (!clientName) {
        return res.status(200).json({
          success: true,
          response: "And your last name?"
        });
      }
      
      const result = await handleReschedule(workOrderNum, clientName);
      return res.status(200).json({ success: true, response: result });
    }

    // SCENARIO 3: User wants status/appointment info
    if (intent.wantsStatus || context.conversationTopic === 'status' || (workOrderNum && !intent.wantsServiceInfo)) {
      if (!workOrderNum) {
        return res.status(200).json({
          success: true,
          response: "I'd be happy to check your appointment! What's your work order number?"
        });
      }
      
      if (!clientName) {
        return res.status(200).json({
          success: true,
          response: "And your last name for verification?"
        });
      }
      
      const result = await lookupWorkOrder(workOrderNum, clientName);
      return res.status(200).json({ success: true, response: result.message });
    }

    // SCENARIO 4: Follow-up response (they just answered our question)
    if (intent.isFollowUp && context.lastAskedFor) {
      // They just gave us a single piece of info
      if (context.lastAskedFor === 'workorder' && workOrderNum && !clientName) {
        return res.status(200).json({
          success: true,
          response: "Perfect! And your last name?"
        });
      }
      
      if (context.lastAskedFor === 'name' && clientName && workOrderNum) {
        // We have both - look it up!
        const result = await lookupWorkOrder(workOrderNum, clientName);
        return res.status(200).json({ success: true, response: result.message });
      }
    }

    // SCENARIO 5: General service questions
    const aiResponse = await getGroqResponse(question, history, context);
    return res.status(200).json({ success: true, response: aiResponse });

  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(200).json({
      success: true,
      response: 'Sorry, I had a technical issue. Please call +52 612 169 8328 and we\'ll help you right away!'
    });
  }
}