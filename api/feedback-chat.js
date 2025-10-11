// api/feedback-chat.js - TRULY INTELLIGENT CONVERSATIONAL AI v4
// Built for exceptional customer experience with ALL bugs fixed

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
  const patterns = [
    /WO-?(\d{10,})/i,
    /#(\d{10,})/,
    /order\s*#?\s*(\d{10,})/i,
    /(\d{13})/,
    /(\d{10,})/
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function extractName(text) {
  const patterns = [
    /(?:name\s+(?:is\s+)?|last\s*name\s*(?:is)?\s*|i'm\s+|i\s+am\s+|my\s+name\s*(?:is)?\s*|mr\.?\s+|mrs\.?\s+|ms\.?\s+)([a-z]{2,})/i,
    /^([a-z]{3,})$/i,
    /\b([a-z]{4,})\s*$/i,
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function analyzeIntent(text, history) {
  const lower = text.toLowerCase();
  
  // BUG FIX #1 & #4: Improved previous service detection
  // Only matches PAST actions, not capability questions like "do you guys do X?"
  const hasPreviousServiceRef = /(?:you guys|you|your team) (?:came|fixed|did|installed|repaired|were here)|(?:last|a) (?:week|month) ago|recently (?:came|fixed|installed)/i.test(text) 
    && !/do you|can you|are you able|does your|will you/i.test(text);
  
  // Warranty/follow-up
  const hasWarrantyIntent = /warranty|guarantee|covered|still under|acting up again|broke again|still broken/i.test(text);
  
  // Status/lookup intent
  const statusKeywords = ['status', 'check my', 'my appointment', 'my order', 'when is', 
                          'what time', 'scheduled', 'confirm my', 'look up my'];
  const hasStatusIntent = statusKeywords.some(kw => lower.includes(kw));
  
  // Cancellation intent
  const cancelKeywords = ['cancel', 'cancellation', 'delete', 'remove', 'stop', 'abort'];
  const hasCancelIntent = cancelKeywords.some(kw => lower.includes(kw));
  
  // Reschedule intent
  const rescheduleKeywords = ['reschedule', 'change', 'move', 'different time', 'different day', 'postpone'];
  const hasRescheduleIntent = rescheduleKeywords.some(kw => lower.includes(kw));
  
  // Pricing/estimate questions
  const pricingKeywords = ['how much', 'cost', 'price', 'estimate', 'quote', 'what does it cost', 'pricing'];
  const hasPricingIntent = pricingKeywords.some(kw => lower.includes(kw));
  
  // Comparison shopping
  const hasComparisonIntent = /another company|other quote|competitor|beat that price|better price/i.test(text);
  
  // Vague help request
  const isVagueRequest = /need help|something wrong|issue with|problem with|broken/i.test(text) && text.split(' ').length < 10;
  
  // Emergency - BUG FIX: More keywords
  const emergencyKeywords = ['emergency', 'urgent', 'right now', 'immediately', 'asap', 'overflowing', 'flooding', 'burst', 'water everywhere', 'sparking'];
  const isEmergency = emergencyKeywords.some(kw => lower.includes(kw));
  
  // Greeting
  const greetingKeywords = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'hola'];
  const isGreeting = greetingKeywords.some(kw => lower.startsWith(kw));
  
  // BUG FIX #6: Intent priority - capability questions shouldn't trigger warranty
  return {
    wantsStatus: hasStatusIntent && !hasPricingIntent,
    wantsCancel: hasCancelIntent,
    wantsReschedule: hasRescheduleIntent,
    wantsPricing: hasPricingIntent,
    wantsWarrantyInfo: (hasWarrantyIntent || hasPreviousServiceRef) && !/do you|can you|does your/i.test(text),
    isComparison: hasComparisonIntent,
    isVague: isVagueRequest,
    isEmergency: isEmergency,
    isGreeting: isGreeting,
    isFollowUp: text.length < 50 && !hasStatusIntent && !hasCancelIntent && !hasPricingIntent && !isGreeting
  };
}

function buildContextFromHistory(history) {
  let context = {
    workOrderNum: null,
    clientName: null,
    lastAskedFor: null,
    conversationTopic: null,
    customerSeemsConfused: false,
    // BUG FIX #2: Emergency memory tracking
    hasActiveEmergency: false,
    emergencyType: null,
    emergencyMentionedAt: null,
    // BUG FIX #7: Issue tracking for summaries
    mentionedIssues: []
  };
  
  for (let i = Math.max(0, history.length - 8); i < history.length; i++) {
    const msg = history[i];
    
    if (msg.role === 'user') {
      // Extract work order and name
      if (!context.workOrderNum) {
        context.workOrderNum = extractWorkOrderNumber(msg.content);
      }
      if (!context.clientName) {
        context.clientName = extractName(msg.content);
      }
      
      // BUG FIX #2: Detect and remember emergencies
      if (/overflowing|flooding|burst|emergency|urgent|right now|asap|sparking|water everywhere/i.test(msg.content)) {
        context.hasActiveEmergency = true;
        const match = msg.content.match(/overflowing|flooding|burst|sparking/i);
        context.emergencyType = match ? match[0] : 'emergency';
        context.emergencyMentionedAt = i;
      }
      
      // BUG FIX #7: Track issues mentioned for summary
      const issueMatches = msg.content.match(/leak|overflow|outlet.*not working|fan|electrical|plumbing|toilet|sink|faucet/gi);
      if (issueMatches) {
        issueMatches.forEach(issue => {
          if (!context.mentionedIssues.includes(issue.toLowerCase())) {
            context.mentionedIssues.push(issue.toLowerCase());
          }
        });
      }
      
      // Confusion detection
      const confusionWords = ['what', 'huh', 'confused', 'don\'t understand'];
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
      } else if (/warranty|previous service/i.test(msg.content)) {
        context.conversationTopic = 'warranty';
      }
    }
  }
  
  return context;
}

// ========================================
// DATABASE LOOKUP
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

This could be a typo - please double-check your work order number. It should be 13 digits long (example format: WO-1234567890123).

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
// CANCELLATION
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

  await supabase
    .from('pending')
    .update({ status: 'Cancellation Requested' })
    .eq('id', data.id);

  try {
    const total = data.items?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;
    await fetch('https://caboshandyman.com/api/send-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `🚫 CANCELLATION REQUEST\n\nWO: ${data.work_order_number}\nClient: ${data.client_name}\nPhone: ${data.client_phone || 'N/A'}\nScheduled: ${data.scheduled_date || 'TBD'}\nTotal: $${total.toFixed(2)}\n\nAction: Contact customer to confirm.`,
        phone: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP_NUMBER
      })
    });
  } catch (err) {
    console.error('Notification failed');
  }

  return `✅ Cancellation request submitted for ${data.work_order_number}. 

Our team will contact you within 1 hour to confirm. 

Need immediate assistance? Call +52 612 169 8328.`;
}

// ========================================
// RESCHEDULE
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
// GROQ AI - ENHANCED
// ========================================

async function getGroqResponse(question, history, context, intent) {
  let systemPrompt = `You are a helpful AI assistant for Cabos Handyman in Cabo San Lucas, Mexico.

**SERVICES:**
- Residential (kitchens, bathrooms, renovations)
- Emergency 24/7 (water damage, electrical, structural)
- Commercial (offices, retail)
- HOA/Property maintenance

**PRICING:**
- Service call: $100 (diagnosis + 30 min)
- Leak repairs: $200-$600
- Electrical: $150-$500
- Plumbing: $200-$800
- Emergency: +50% after hours

**HOURS:**
- Mon-Sat: 7 AM - 6 PM
- Emergency: 24/7
- Phone: +52 612 169 8328

**RULES:**
- Be warm, friendly, and concise (2-3 sentences)
- DON'T ask for work order numbers - system handles that
- Mention FREE instant quote tool for estimates
- If you don't know, suggest calling`;

  if (intent.isVague) {
    systemPrompt += `\n\n**SPECIAL INSTRUCTION:** User gave vague request. Ask 2-3 specific clarifying questions. Examples: "Is this a plumbing, electrical, or structural issue?", "Where specifically is the problem located?", "When did you first notice this?"`;
  }
  
  if (intent.isComparison) {
    systemPrompt += `\n\n**SPECIAL INSTRUCTION:** User is comparing prices. Don't promise to beat prices. Instead: explain our pricing is transparent and fair, mention FREE quote tool for accurate comparison, highlight quality and warranty, suggest uploading a photo for honest assessment.`;
  }

  // BUG FIX #5: More assertive emergency instructions
  if (intent.isEmergency || context.hasActiveEmergency) {
    systemPrompt += `\n\n**CRITICAL EMERGENCY INSTRUCTION:** 
This is a LIFE-SAFETY EMERGENCY requiring IMMEDIATE action.

YOU MUST:
1. Start response with 🚨 emoji
2. Use URGENT language: "CALL +52 612 169 8328 RIGHT NOW"
3. Explain consequences (water damage $10k+, electrical fire risk, etc.)
4. Be commanding and direct, not polite
5. Tell them to stop what they're doing and call IMMEDIATELY
6. Don't offer quote tool - this requires instant phone dispatch
7. Mention 24/7 availability and <1 hour response time

Example: "🚨 STOP! Your ${context.emergencyType || 'issue'} can cause THOUSANDS in damage or injury. CALL +52 612 169 8328 RIGHT NOW - we're standing by to dispatch a crew within 30 minutes. Don't wait - every minute counts!"`;
  }

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
        max_tokens: 300
      })
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || 'I\'m here to help! What can I assist you with?';
  } catch (error) {
    console.error('Groq failed:', error);
    return 'I\'m having a technical issue. Please call +52 612 169 8328 for immediate assistance.';
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

    const context = buildContextFromHistory(history);
    const currentWO = extractWorkOrderNumber(question);
    const currentName = extractName(question);
    const workOrderNum = currentWO || context.workOrderNum;
    const clientName = currentName || context.clientName;
    const intent = analyzeIntent(question, history);
    
    console.log('🧠 Intelligence:', { 
      workOrderNum, 
      clientName, 
      intent: Object.keys(intent).filter(k => intent[k]),
      topic: context.conversationTopic,
      emergency: context.hasActiveEmergency,
      issuesCount: context.mentionedIssues.length
    });

    // ========================================
    // BUG FIX #3: MULTI-ISSUE & EMERGENCY CONSOLIDATION
    // ========================================
    // BUG FIX #3: MULTI-ISSUE & EMERGENCY CONSOLIDATION
    if (context.hasActiveEmergency && history.length > 2) {
      const recentMessages = history.slice(-5);
      const hasMultipleIssues = recentMessages.filter(m => 
        m.role === 'user' && /also|and also|plus|additionally|another|what about/i.test(m.content)
      ).length > 0;
      
      if (hasMultipleIssues && !intent.wantsStatus && !intent.wantsCancel) {
        const issuesList = context.mentionedIssues.length > 0 
          ? context.mentionedIssues.map(issue => `• ${issue}`).join('\n')
          : '• Your reported issues';
        
        return res.status(200).json({
          success: true,
          response: `🚨 **EMERGENCY PRIORITY!** 

I see you have multiple issues, but your ${context.emergencyType} needs IMMEDIATE attention to prevent serious damage.

**CALL +52 612 169 8328 RIGHT NOW** - we're available 24/7 and can be there in 30-60 minutes.

**Here's our approach:**
- $100 service call (includes diagnosis + first 30 min of work)
- We'll assess the emergency PLUS your other issues:
${issuesList}

- Give you honest pricing for everything
- You decide what to fix now vs later
- If you approve work, the $100 applies to your total

Most customers with multiple issues like yours spend $400-$800 total, but we won't know exactly until we inspect. Emergency first - call now!`
        });
      }
    }

    // BUG FIX #7: CONVERSATION SUMMARY FOR LONG CHATS
    // CONVERSATION SUMMARY FOR LONG CHATS
    if (history.length > 8 && context.mentionedIssues.length > 2 && intent.wantsPricing) {
      return res.status(200).json({
        success: true,
        response: `Let me recap the issues you've mentioned:

${context.mentionedIssues.map((issue, i) => `${i+1}. ${issue}`).join('\n')}

For ${context.mentionedIssues.length} issues like this, here's our process:

**$100 Service Call Includes:**
- Complete inspection of all ${context.mentionedIssues.length} issues
- First 30 minutes of work
- Honest, itemized estimate for everything
- You decide what to fix now vs later

**Typical multi-issue visits:** $400-$800 depending on complexity

If you approve the work, the $100 service call applies to your total. Want to call +52 612 169 8328 now or use our instant quote tool?`
      });
    }

    // ========================================
    // DECISION TREE
    // ========================================

    // Greeting
    if (intent.isGreeting && !intent.wantsStatus && !intent.wantsCancel) {
      return res.status(200).json({
        success: true,
        response: "Hi there! 👋 I'm here to help you with:\n\n• Check your appointment status\n• Cancel or reschedule service\n• Answer questions about our services\n• Get instant quotes\n\nWhat can I help you with today?"
      });
    }

    // Warranty/Previous service follow-up
    if (intent.wantsWarrantyInfo || context.conversationTopic === 'warranty') {
      if (!workOrderNum) {
        return res.status(200).json({
          success: true,
          response: "I can look up your previous service! What's your work order number from the original visit? (Check your email or receipt)"
        });
      }
      
      if (!clientName) {
        return res.status(200).json({
          success: true,
          response: "And your last name?"
        });
      }
      
      const lookup = await lookupWorkOrder(workOrderNum, clientName);
      
      if (lookup.success) {
        return res.status(200).json({
          success: true,
          response: `I found your work order ${lookup.data.work_order_number} from ${lookup.data.scheduled_date ? new Date(lookup.data.scheduled_date).toLocaleDateString() : 'recently'}.

If this issue is related to that repair, we'll make it right at no charge. Please call +52 612 169 8328 and mention this work order number - we'll send someone out to check it.

If it's a new issue, we'll give you an honest assessment.`
        });
      }
      
      return res.status(200).json({ success: true, response: lookup.message });
    }

    // Cancellation
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

    // Reschedule
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

    // Status check
    if (intent.wantsStatus || context.conversationTopic === 'status' || (workOrderNum && !intent.wantsPricing)) {
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

    // Follow-up (they answered our question)
    if (intent.isFollowUp && context.lastAskedFor) {
      if (context.lastAskedFor === 'workorder' && workOrderNum && !clientName) {
        return res.status(200).json({
          success: true,
          response: "Perfect! And your last name?"
        });
      }
      
      if (context.lastAskedFor === 'name' && clientName && workOrderNum) {
        const result = await lookupWorkOrder(workOrderNum, clientName);
        return res.status(200).json({ success: true, response: result.message });
      }
    }

    // General questions (pricing, services, etc.)
    const aiResponse = await getGroqResponse(question, history, context, intent);
    return res.status(200).json({ success: true, response: aiResponse });

  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(200).json({
      success: true,
      response: 'Sorry, I had a technical issue. Please call +52 612 169 8328 and we\'ll help you right away!'
    });
  }
}