// api/feedback-chat.js - TRULY INTELLIGENT CONVERSATIONAL AI
// Built to understand human conversation patterns, not rigid rules

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
  // Try multiple name patterns
  const patterns = [
    /(?:name\s+(?:is\s+)?|last\s*name\s*(?:is)?\s*|i'm\s+|i\s+am\s+|my\s+name\s*(?:is)?\s*|mr\.?\s+|mrs\.?\s+|ms\.?\s+)([a-z]{2,})/i,
    /^([a-z]{3,})$/i,  // Just a name by itself (3+ letters)
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function analyzeIntent(text, history) {
  const lower = text.toLowerCase();
  
  // Status/lookup intent
  const statusKeywords = ['status', 'check', 'scheduled', 'when', 'date', 'appointment', 
                          'service', 'order', 'my', 'look up', 'find', 'what time', 
                          'confirm', 'verify', 'schedule'];
  const hasStatusIntent = statusKeywords.some(kw => lower.includes(kw));
  
  // Cancellation intent
  const cancelKeywords = ['cancel', 'cancellation', 'delete', 'remove', 'stop'];
  const hasCancelIntent = cancelKeywords.some(kw => lower.includes(kw));
  
  // General service questions
  const serviceKeywords = ['how much', 'cost', 'price', 'estimate', 'quote', 
                           'service', 'repair', 'fix', 'install'];
  const hasServiceIntent = serviceKeywords.some(kw => lower.includes(kw));
  
  return {
    wantsStatus: hasStatusIntent,
    wantsCancel: hasCancelIntent,
    wantsServiceInfo: hasServiceIntent,
    isFollowUp: text.length < 50 && !hasStatusIntent && !hasCancelIntent && !hasServiceIntent
  };
}

function buildContextFromHistory(history) {
  let context = {
    workOrderNum: null,
    clientName: null,
    lastAskedFor: null,
    conversationTopic: null
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
      } else if (/status|scheduled|appointment/i.test(msg.content)) {
        context.conversationTopic = 'status';
      }
    }
  }
  
  return context;
}

// ========================================
// DATABASE LOOKUP FUNCTION
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
      message: `I couldn't find work order WO-${workOrderNum} in our system. Please verify the number or call +52 612 169 8328.`
    };
  }

  if (!data.client_name.toLowerCase().includes(clientName.toLowerCase())) {
    return {
      success: false,
      error: 'name_mismatch',
      message: `The name doesn't match our records for WO-${workOrderNum}. For security, please call +52 612 169 8328.`
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

  return {
    success: true,
    data: data,
    message: `✅ **Work Order ${data.work_order_number}**

**Status:** ${data.status || 'Pending'}
**Scheduled:** ${schedText}
${data.assigned_crew ? `**Crew:** ${data.assigned_crew}\n` : ''}**Total:** $${total.toFixed(2)}
${data.notes ? `\n**Notes:** ${data.notes}\n` : ''}
Need anything else?`
  };
}

// ========================================
// CANCELLATION FUNCTION
// ========================================

async function processCancellation(workOrderNum, clientName) {
  const lookup = await lookupWorkOrder(workOrderNum, clientName);
  
  if (!lookup.success) {
    return lookup.message;
  }

  const data = lookup.data;

  if (data.status === 'Completed') {
    return `Work order ${data.work_order_number} is already completed and can't be cancelled. If you have concerns, please call +52 612 169 8328.`;
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
        message: `🚫 CANCELLATION REQUEST\n\nWO: ${data.work_order_number}\nClient: ${data.client_name}\nScheduled: ${data.scheduled_date || 'TBD'}\nTotal: $${total.toFixed(2)}`,
        phone: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP_NUMBER
      })
    });
  } catch (err) {
    console.error('Notification failed');
  }

  return `✅ Cancellation request submitted for ${data.work_order_number}. Our team will contact you within 1 hour to confirm. Call +52 612 169 8328 for immediate assistance.`;
}

// ========================================
// GROQ AI FALLBACK
// ========================================

async function getGroqResponse(question, history) {
  const systemPrompt = `You are a helpful AI assistant for Cabos Handyman in Cabo San Lucas, Mexico.

**YOUR ROLE:**
Answer general questions about services, pricing, hours, and policies. Be friendly and concise (2-3 sentences).

**SERVICES:**
- Residential (kitchens, bathrooms, renovations)
- Emergency 24/7 (water/electrical/structural)
- Commercial (offices, retail)
- HOA/Property maintenance

**PRICING EXAMPLES:**
- Service call: $100 (includes diagnosis + 30 min)
- Leak repairs: $200-$600
- Electrical work: $150-$500
- Plumbing: $200-$800
- Emergency: +50% after hours

**IMPORTANT:**
- Don't ask for work order numbers or customer details - the system handles that
- If you don't know something specific, suggest calling +52 612 169 8328
- Mention our free instant quote tool for detailed estimates

Be warm, helpful, and brief.`;

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
    return 'I\'m having trouble right now. Please call +52 612 169 8328 for immediate assistance.';
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

    // SCENARIO 1: User wants to cancel
    if (intent.wantsCancel || context.conversationTopic === 'cancellation') {
      if (!workOrderNum) {
        return res.status(200).json({
          success: true,
          response: "I can help cancel your work order. What's your work order number?"
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

    // SCENARIO 2: User wants status/appointment info
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

    // SCENARIO 3: Follow-up response (they just answered our question)
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

    // SCENARIO 4: General service questions
    const aiResponse = await getGroqResponse(question, history);
    return res.status(200).json({ success: true, response: aiResponse });

  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(200).json({
      success: true,
      response: 'Sorry, I had a technical issue. Please call +52 612 169 8328.'
    });
  }
}