// api/feedback-chat.js - TRULY INTELLIGENT CONVERSATIONAL AI v7
// Built for exceptional customer experience with 200+ quick task detection + Multi-task intelligence + Follow-up detection

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

// Language detection
function detectSpanish(text) {
  const spanishIndicators = [
    /\b(hola|buenos días|buenas tardes|gracias|por favor|necesito|tengo|estoy|puede|cuánto|dónde|cuál)\b/i,
    /\b(servicio|precio|costo|ayuda|problema|roto|reparar|instalar)\b/i,
    /¿|¡/,
    /ción\b/i,
    /ñ/i
  ];
  return spanishIndicators.some(pattern => pattern.test(text));
}

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
  const greetings = ['hello', 'hi', 'hey', 'hola', 'good', 'morning', 'afternoon', 'evening', 'thanks', 'thank', 'please', 'yes', 'yeah', 'ok', 'okay'];
  const lowerText = text.toLowerCase().trim();
  
  const patterns = [
    /(?:name\s+(?:is\s+)?|last\s*name\s*(?:is)?\s*|i'm\s+|i\s+am\s+|my\s+name\s*(?:is)?\s*|mr\.?\s+|mrs\.?\s+|ms\.?\s+)([a-z]{2,})/i,
    /^([a-z]{3,})$/i,
    /\b([a-z]{4,})\s*$/i,
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const name = match[1].toLowerCase();
      if (greetings.includes(name)) continue;
      return match[1];
    }
  }
  return null;
}

// ========================================
// QUICK TASK DETECTION - $60 SERVICE CALL (200+ TASKS)
// ========================================

const quickTaskKeywords = [
  'flush valve', 'flapper', 'fill valve', 'toilet seat', 'toilet handle', 'toilet chain',
  'toilet lever', 'toilet paper holder', 'towel bar', 'towel rack', 'towel ring', 
  'robe hook', 'toilet brush holder', 'soap dish', 'toothbrush holder',
  'showerhead', 'shower head', 'handheld sprayer', 'shower hose', 'faucet aerator', 
  'sink stopper', 'drain stopper', 'pop-up drain', 'basket strainer', 'sink strainer',
  'p-trap', 'leaky washer', 'faucet cartridge', 'shower cartridge', 'toilet wax ring', 
  'toilet bolts', 'toilet tank bolts', 'supply line', 'water supply line', 'braided line',
  'angle stop', 'shutoff valve', 'quarter turn valve', 'hose bib', 'outdoor spigot', 
  'frost-free spigot', 'garden hose connector', 'hose adapter', 'vacuum breaker',
  'shower arm', 'tub spout', 'diverter', 'diverter valve', 'aerator screen', 
  'sprayer hose', 'kitchen sprayer', 'side sprayer', 'soap dispenser', 'lotion dispenser',
  'shower drain cover', 'tub drain cover', 'sink drain', 'shower basket', 'hair catcher',
  'faucet handle', 'single handle', 'two handle', 'widespread faucet part',
  'door knob', 'door handle', 'doorknob', 'door lever', 'passage knob', 'privacy knob',
  'deadbolt', 'door lock', 'keyed lock', 'thumbturn', 'door latch', 'spring latch',
  'cabinet knob', 'cabinet handle', 'cabinet pull', 'drawer pull', 'drawer knob', 
  'drawer slide', 'soft-close hinge', 'door hinge', 'cabinet hinge', 'euro hinge',
  'door closer', 'hydraulic closer', 'door stopper', 'door stop', 'floor stop', 
  'wall stop', 'hinge stop', 'hinge pin', 'strike plate', 'latch plate', 'catch plate',
  'door sweep', 'door bottom seal', 'weatherstrip', 'weatherstripping', 'door seal', 
  'threshold', 'door threshold', 'saddle', 'transition strip',
  'peephole', 'door viewer', 'security viewer', 'house numbers', 'address numbers',
  'mailbox', 'mail slot', 'door knocker', 'door escutcheon', 'keyhole cover',
  'door bumper', 'door silencer', 'magnetic catch', 'roller catch', 'ball catch',
  'coat hook', 'door hook', 'over-the-door hook', 'closet rod bracket', 'shelf pin',
  'light switch', 'toggle switch', 'rocker switch', 'dimmer switch', 'fan switch',
  '3-way switch', 'outlet cover', 'switch plate', 'wall plate', 'cover plate',
  'decorator plate', 'outlet', 'receptacle', 'duplex outlet', 'gfci outlet', 
  'gfi outlet', 'ground fault outlet', 'usb outlet', 'usb charger outlet',
  'smoke detector', 'smoke alarm', 'co detector', 'co alarm', 'carbon monoxide detector', 
  'alarm battery', '9v battery', 'detector battery', 'backup battery',
  'light bulb', 'led bulb', 'cfl bulb', 'incandescent bulb', 'halogen bulb',
  'ceiling light', 'ceiling fixture', 'light fixture', 'vanity light', 'bath bar light',
  'door chime', 'doorbell', 'doorbell button', 'doorbell cover', 'chime cover',
  'thermostat', 'thermostat cover', 'thermostat battery', 'programmable thermostat',
  'motion sensor', 'motion detector', 'occupancy sensor', 'night light', 'plug-in light',
  'ceiling fan pull chain', 'fan chain', 'light chain', 'pull switch', 'canopy cover',
  'outlet tester', 'surge protector', 'power strip', 'extension cord holder',
  'curtain rod', 'drapery rod', 'shower curtain rod', 'tension rod', 'cafe rod',
  'curtain bracket', 'rod bracket', 'rod end', 'finial', 'curtain ring', 'clip ring',
  'blind', 'shade', 'roller shade', 'cellular shade', 'honeycomb shade', 'roman shade',
  'venetian blind', 'mini blind', 'aluminum blind', 'vinyl blind', 'wood blind',
  'vertical blind', 'vertical vane', 'plantation shutter', 'shutter panel',
  'window screen', 'screen frame', 'screen mesh', 'screen spline', 'screen door',
  'window lock', 'sash lock', 'window latch', 'window crank', 'casement crank',
  'blind cord', 'lift cord', 'tilt wand', 'cordless blind', 'valance clip',
  'picture frame', 'photo frame', 'wall art', 'canvas', 'poster frame',
  'mirror', 'wall mirror', 'bathroom mirror', 'decorative mirror', 'accent mirror',
  'coat rack', 'wall coat rack', 'coat hook', 'wall hook', 'utility hook',
  'adhesive hook', 'command hook', 'heavy duty hook', 'j-hook', 's-hook',
  'shelf bracket', 'l-bracket', 'floating shelf', 'floating shelf bracket',
  'small shelf', 'decorative shelf', 'corner shelf', 'towel shelf', 'shower shelf',
  'closet rod', 'clothing rod', 'wardrobe rod', 'closet shelf', 'wire shelf',
  'wall anchor', 'drywall anchor', 'toggle bolt', 'molly bolt', 'plastic anchor',
  'picture hook', 'picture hanger', 'sawtooth hanger', 'd-ring hanger', 'wire hanger',
  'key holder', 'key rack', 'mail organizer', 'wall organizer', 'magazine rack',
  'shower caddy', 'corner caddy', 'hanging caddy', 'suction caddy', 'tension caddy',
  'shower curtain', 'curtain liner', 'curtain hooks', 'shower rings',
  'grab bar', 'safety bar', 'balance bar', 'towel warmer', 'heated towel rack',
  'paper towel holder', 'under cabinet holder', 'wall mount holder', 'standing holder',
  'spice rack', 'spice shelf', 'spice organizer', 'pot rack', 'pan organizer',
  'utensil holder', 'utensil crock', 'knife block', 'knife holder', 'magnetic strip',
  'cutting board rack', 'dish rack', 'drying rack', 'cup holder', 'mug hook',
  'sink grid', 'sink mat', 'drain board', 'dish drainer', 'silverware tray',
  'air vent cover', 'vent cover', 'register cover', 'floor register', 'wall register',
  'ceiling register', 'grille cover', 'return air cover', 'return vent', 'air grille',
  'hvac filter', 'air filter', 'furnace filter', 'ac filter', 'pleated filter',
  'range hood filter', 'grease filter', 'charcoal filter', 'exhaust filter',
  'bathroom fan cover', 'exhaust fan cover', 'fan grille', 'dryer vent cover',
  'vent flap', 'damper', 'vent cap', 'soffit vent', 'gable vent',
  'garbage disposal reset', 'disposal wrench', 'dishwasher filter', 'dishwasher basket',
  'refrigerator filter', 'water filter', 'ice maker filter', 'fridge light',
  'microwave turntable', 'turntable roller', 'microwave light', 'oven light',
  'range hood light', 'hood bulb', 'dryer lint trap',
  'washer hose', 'washer filter', 'appliance foot', 'appliance leveling leg',
  'porch light', 'outdoor light', 'exterior light', 'wall lantern', 'wall sconce',
  'motion light', 'motion sensor light', 'security light', 'flood light bulb',
  'landscape light', 'path light', 'solar light', 'stake light', 'garden light',
  'hose holder', 'hose reel', 'hose hanger', 'hose guide', 'hose pot',
  'garden hook', 'plant hook', 'hanging basket', 'shepherd hook', 'planter hook',
  'flag holder', 'flag bracket', 'welcome mat', 'door mat', 'boot tray',
  'gutter guard', 'downspout extension', 'splash block', 'window well cover',
  'door chain', 'security chain', 'chain guard', 'door guard', 'barrel bolt',
  'slide bolt', 'surface bolt', 'cabinet lock', 'child lock', 'safety latch',
  'baby gate', 'pressure gate', 'hardware mount gate', 'gate extension',
  'sliding door lock', 'patio door lock', 'pin lock',
  'security bar', 'window bar', 'door brace', 'security wedge',
  'caulk', 'caulking', 're-caulk', 'silicone caulk', 'tub caulk', 'grout caulk',
  'grout touch-up', 'grout pen', 'tile touch-up', 'small patch', 'drywall patch',
  'spackle', 'hole patch', 'nail hole', 'screw hole', 'wall repair',
  'loose screw', 'tighten screws', 'tighten bolt', 'adjust door', 'adjust hinge',
  'align door', 'reset gfci', 'reset breaker', 'flip breaker', 'replace gasket',
  'seal gap', 'fill gap', 'foam gap', 'silicone seal', 'weather seal',
  'touch-up paint', 'paint chip', 'scratch repair', 'replace battery', 'install battery',
  'lubricate hinge', 'oil hinge', 'grease hinge', 'wd-40', 'adjust closer',
  'stop squeak', 'fix squeak', 'squeaky hinge', 'squeaky door', 'tighten handle',
  'replace knob', 'replace handle', 'furniture leg', 'furniture glide', 'felt pad',
  'bumper pad', 'drawer liner', 'shelf liner', 'contact paper', 'adhesive paper',
  'cord cover', 'cable management', 'wire cover', 'cord organizer', 'cable clip'
];

function isQuickTask(text) {
  const lower = text.toLowerCase();
  const hasQuickKeyword = quickTaskKeywords.some(keyword => lower.includes(keyword));
  const isComplex = /multiple|several|many|complex|major|install new|replace entire|demo|demolition|renovation|remodel|gut|remove wall|add wall/i.test(lower);
  return hasQuickKeyword && !isComplex;
}

// ========================================
// MULTI-TASK DETECTION
// ========================================

function analyzeMultipleTasks(text) {
  const lower = text.toLowerCase();
  
  const multipleIndicators = [
    /and|&|plus|\+/i,
    /also|as well/i,
    /both|couple|few/i,
    /\d+\s+(things|tasks|items|repairs)/i
  ];
  
  const hasMultiple = multipleIndicators.some(pattern => pattern.test(lower));
  
  if (!hasMultiple) return { isMultiple: false };
  
  const mentionedTasks = quickTaskKeywords.filter(keyword => lower.includes(keyword));
  const estimatedMinutes = mentionedTasks.length * 12;
  
  return {
    isMultiple: true,
    taskCount: mentionedTasks.length,
    fitsInServiceCall: estimatedMinutes <= 30,
    estimatedMinutes: estimatedMinutes,
    tasks: mentionedTasks
  };
}

function analyzeIntent(text, history) {
  const lower = text.toLowerCase();
  
  const hasPreviousServiceRef = /(?:you guys|you|your team) (?:came|fixed|did|installed|repaired|were here)|(?:last|a) (?:week|month) ago|recently (?:came|fixed|installed)/i.test(text) 
    && !/do you|can you|are you able|does your|will you/i.test(text);
  
  const hasWarrantyIntent = /warranty|guarantee|covered|still under|acting up again|broke again|still broken/i.test(text);
  
  const statusKeywords = ['status', 'check my', 'my appointment', 'my order', 'when is', 
                          'what time', 'scheduled', 'confirm my', 'look up my'];
  const hasStatusIntent = statusKeywords.some(kw => lower.includes(kw));
  
  const cancelKeywords = ['cancel', 'cancellation', 'delete', 'remove', 'stop', 'abort'];
  const hasCancelIntent = cancelKeywords.some(kw => lower.includes(kw));
  
  // FIXED: More specific reschedule detection
  const rescheduleKeywords = ['reschedule', 'change appointment', 'change my appointment', 'move appointment', 'move my appointment', 'different time', 'different day', 'postpone'];
  const hasRescheduleIntent = rescheduleKeywords.some(kw => lower.includes(kw)) && !/can i add|add to|include|also do|while you|at same time/i.test(lower);
  
  const pricingKeywords = ['how much', 'cost', 'price', 'estimate', 'quote', 'what does it cost', 'pricing'];
  const hasPricingIntent = pricingKeywords.some(kw => lower.includes(kw));
  
  const isQuickTaskQuestion = hasPricingIntent && isQuickTask(text);
  const multiTaskAnalysis = analyzeMultipleTasks(text);
  
  // NEW: Multi-task follow-up detection
  const multiTaskFollowUp = /can i add|add to|also do|include|while (you|they|he|she)|at (the )?same time|bundle|combine/i.test(text);
  
  const hasComparisonIntent = /another company|other quote|competitor|beat that price|better price/i.test(text);
  
  const isVagueRequest = /need help|something wrong|issue with|problem with|broken/i.test(text) && text.split(' ').length < 10;

  // Enhanced emergency keywords - English and Spanish
  const emergencyKeywords = [
    'emergency', 'urgent', 'right now', 'immediately', 'asap',
    'overflowing', 'flooding', 'burst', 'water everywhere', 'sparking',
    'gas leak', 'no water', 'burst pipe',
    // Spanish keywords
    'emergencia', 'urgente', 'ahora mismo', 'inmediatamente',
    'desbordando', 'inundación', 'tubería rota', 'fuga de gas',
    'chispas', 'sin agua'
  ];
  const isEmergency = emergencyKeywords.some(kw => lower.includes(kw));
  
  const greetingKeywords = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'hola'];
  const isGreeting = greetingKeywords.some(kw => lower.startsWith(kw));
  
  return {
    wantsStatus: hasStatusIntent && !hasPricingIntent,
    wantsCancel: hasCancelIntent,
    wantsReschedule: hasRescheduleIntent,
    wantsPricing: hasPricingIntent,
    isQuickTaskPricing: isQuickTaskQuestion,
    multiTask: multiTaskAnalysis,
    isMultiTaskFollowUp: multiTaskFollowUp,
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
    hasActiveEmergency: false,
    emergencyType: null,
    emergencyMentionedAt: null,
    mentionedIssues: []
  };
  
  for (let i = Math.max(0, history.length - 8); i < history.length; i++) {
    const msg = history[i];
    
    if (msg.role === 'user') {
      if (!context.workOrderNum) {
        context.workOrderNum = extractWorkOrderNumber(msg.content);
      }
      if (!context.clientName) {
        context.clientName = extractName(msg.content);
      }
      
      if (/overflowing|flooding|burst|emergency|urgent|right now|asap|sparking|water everywhere/i.test(msg.content)) {
        context.hasActiveEmergency = true;
        const match = msg.content.match(/overflowing|flooding|burst|sparking/i);
        context.emergencyType = match ? match[0] : 'emergency';
        context.emergencyMentionedAt = i;
      }
      
      const issueMatches = msg.content.match(/leak|overflow|outlet.*not working|fan|electrical|plumbing|toilet|sink|faucet/gi);
      if (issueMatches) {
        issueMatches.forEach(issue => {
          if (!context.mentionedIssues.includes(issue.toLowerCase())) {
            context.mentionedIssues.push(issue.toLowerCase());
          }
        });
      }
      
      const confusionWords = ['what', 'huh', 'confused', 'don\'t understand'];
      if (confusionWords.some(w => msg.content.toLowerCase().includes(w))) {
        context.customerSeemsConfused = true;
      }
      
      const userLower = msg.content.toLowerCase();
      
      if (/cancel|cancellation/i.test(userLower)) {
        context.conversationTopic = 'cancellation';
      } 
      else if (/reschedule|change.*appointment|move.*appointment|different.*time/i.test(userLower)) {
        context.conversationTopic = 'reschedule';
      } 
      else if (/status|check.*appointment|my.*order|when.*scheduled/i.test(userLower)) {
        context.conversationTopic = 'status';
      } 
      else if (/warranty|you guys.*came|you.*fixed.*last|acting up again/i.test(userLower)) {
        context.conversationTopic = 'warranty';
      }
    }
    
    if (msg.role === 'assistant') {
      if (/work order number/i.test(msg.content)) {
        context.lastAskedFor = 'workorder';
      }
      if (/last name|your name/i.test(msg.content)) {
        context.lastAskedFor = 'name';
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
// GROQ AI - ENHANCED WITH MULTI-TASK INTELLIGENCE
// ========================================

async function getGroqResponse(question, history, context, intent, isSpanish = false) {
  let systemPrompt = `You are the customer service assistant for Cabos Handyman, a professional handyman and construction service company in Cabo San Lucas, Mexico.

${isSpanish ? '**IMPORTANTE: El cliente está escribiendo en ESPAÑOL. Debes responder COMPLETAMENTE en español.**' : ''}


=== CRITICAL BUSINESS INFORMATION ===

COMPANY NAME: Cabos Handyman

CONTACT INFORMATION:
- Phone: +52 612 169 8328 (call or WhatsApp)
- Email: loscabohandyman@gmail.com
- Website: caboshandyman.com

SERVICE AREA (IMPORTANT - READ CAREFULLY):
- WE ONLY SERVICE: Cabo San Lucas and immediate surrounding areas
- WE DO NOT SERVICE: San José del Cabo, Los Cabos Corridor, or East Cape
- If asked about San José del Cabo or other areas, politely say: "We focus our services exclusively on Cabo San Lucas and the immediate surrounding areas. For the best service quality, we concentrate on this region."

PRICING:
- Service Call: $60 USD (includes professional diagnosis + first 30 minutes of labor)
- Service call fee is fully credited toward the project if customer proceeds
- Free estimates for large remodeling projects over $1,000
- TV Mounting: Starting at $125 per TV
- Ceiling Fan Installation: Starting at $125
- Drain Cleaning: $150-400 depending on severity
- All prices are starting estimates and may vary based on project complexity

HOURS & AVAILABILITY:
- 24/7 emergency service available
- 30-minute response time for emergencies
- Same rates day and night (NO after-hours premium)
- Available on weekends and holidays

CORE SERVICES OFFERED:
- Emergency plumbing & drain cleaning (toilet unclogging, burst pipes, leaks)
- Professional drain auger services (can pull toilets to remove toys/roots)
- Electrical work (ceiling fans, lighting, outlets, panels)
- Kitchen remodeling (cabinets, countertops, backsplash, tile)
- Bathroom renovation (vanities, showers, tile, fixtures)
- TV mounting and wall installations
- Painting (interior and exterior)
- Drywall repair and installation
- Carpentry and trim work
- Cabinet installation
- Tile work
- General handyman repairs

CREDENTIALS & EXPERIENCE:
- In the trade since 2006 (nearly 20 years of experience)
- Founded Cabos Handyman in 2019
- Started building custom homes in El Cardonal, East Cape
- Moved to focus on Cabo San Lucas handyman services in 2023
- 600+ completed projects
- Licensed, insured, and bonded
- 1-year warranty on all workmanship
- 100% satisfaction guarantee

EMERGENCY SERVICES:
- 24/7 availability for plumbing emergencies
- Burst pipes, overflowing toilets, backed-up sewage
- Gas leaks, no hot water, major leaks
- 30-minute response time
- Same $60 service call applies around the clock

WHAT MAKES US DIFFERENT:
- Nearly 20 years of hands-on experience
- Local, family-owned (not a franchise)
- Professional commercial-grade tools and equipment
- Transparent, upfront pricing with written quotes
- Same-day service available for many jobs
- Service call fee credited toward your project
- Coastal environment expertise (salt air, humidity, corrosion)

=== CONVERSATION GUIDELINES ===

TONE & PERSONALITY:
- Friendly, professional, and helpful
- Speak like a knowledgeable local expert
- Use "we" when referring to the company
- Be conversational but not overly casual
- Show genuine care for customer's problems

WHEN CUSTOMERS ASK ABOUT PRICING:
- Always mention the $60 service call first
- Explain what it includes (diagnosis + 30 min labor)
- Mention it's credited toward the work
- Provide starting prices when relevant
- Always say "starting at" for estimates
- Encourage them to call for detailed quotes

WHEN CUSTOMERS ASK ABOUT SERVICE AREA:
- CRITICAL: Say we ONLY service Cabo San Lucas and immediate surrounding areas
- DO NOT say we service San José del Cabo, Los Cabos, Corridor, or East Cape
- If they're outside Cabo San Lucas, politely decline: "We focus exclusively on Cabo San Lucas to ensure the highest quality service. I'd be happy to help if your project is in Cabo San Lucas."

WHEN CUSTOMERS NEED EMERGENCY SERVICE:
- Emphasize 24/7 availability
- Mention 30-minute response time
- Same rates day and night
- Encourage them to call immediately: +52 612 169 8328

COMMON QUESTIONS TO HANDLE:
Q: "How much does it cost?"
A: "Our service call is $60 USD, which includes professional diagnosis and the first 30 minutes of labor. This fee is fully credited toward your project if you decide to proceed. For larger remodeling projects over $1,000, we provide free estimates. What type of project are you considering?"

Q: "Do you serve [other location]?"
A: "We focus our services exclusively on Cabo San Lucas and the immediate surrounding areas. This allows us to provide the best possible service and fastest response times. Is your project located in Cabo San Lucas?"

Q: "Are you available now/tonight/this weekend?"
A: "Yes! We offer 24/7 emergency service with a 30-minute response time, and we're available on weekends and holidays. The best way to reach us immediately is to call +52 612 169 8328."

THINGS TO NEVER SAY:
- Do NOT say we service San José del Cabo or Los Cabos region
- Do NOT say service call is $100 (it's $60!)
- Do NOT say we're unavailable after hours (we're 24/7)
- Do NOT make up services we don't offer
- Do NOT quote exact prices for complex projects (say "starting at" or "call for estimate")

ALWAYS ENCOURAGE CONTACT:
- End most responses with a call-to-action
- "Call us at +52 612 169 8328 for a free estimate"
- "Visit caboshandyman.com to see our portfolio"
- "WhatsApp us at +52 612 169 8328 for quick questions"

=== SPECIAL SITUATIONS ===

IF CUSTOMER IS FRUSTRATED OR HAS EMERGENCY:
- Show empathy: "I understand how stressful that must be"
- Be direct: "Let me help you right away"
- Give clear action: "Call us now at +52 612 169 8328 for immediate assistance"

IF CUSTOMER ASKS ABOUT COMPETITORS OR PRICING:
- Don't criticize competitors
- Focus on your value: "We've been in the trade since 2006 with nearly 20 years of experience, and we stand behind our work with a 1-year warranty"

IF CUSTOMER IS OUTSIDE SERVICE AREA:
- Be polite but firm: "We focus exclusively on Cabo San Lucas to ensure we can provide the fastest response times and highest quality service"
- Don't make exceptions or suggest maybe

IF YOU DON'T KNOW THE ANSWER:
- Be honest: "That's a great question. The best way to get accurate information about [topic] is to call us directly at +52 612 169 8328"
- Never make up information

YOUR GOAL:
Your primary goal is to help customers understand our services, answer their questions accurately, and encourage them to contact us by phone (+52 612 169 8328) for estimates, scheduling, or immediate assistance.

Be helpful, accurate, and always prioritize getting emergency customers to call immediately.

=== ADVANCED ASSISTANT CAPABILITIES ===

BILINGUAL SUPPORT (CRITICAL):
- ALWAYS detect if customer writes in Spanish (look for Spanish words, grammar patterns)
- If customer uses Spanish, respond COMPLETELY in Spanish
- Auto-detect language from first message
- Key translations:
  * Service call = "Visita de servicio" ($60)
  * Emergency = "Emergencia"
  * Free estimate = "Cotización gratuita"
  * Available 24/7 = "Disponible 24/7"
  * Phone = "Teléfono: +52 612 169 8328"
  * "We only service Cabo San Lucas" = "Solo damos servicio en Cabo San Lucas"
- If language unclear, ask: "¿Prefieres español? / Do you prefer Spanish?"

EMERGENCY KEYWORDS (Priority Override):
If customer mentions ANY of these, immediately route to phone call:
- English: flooding, burst pipe, no water, gas leak, sparking, overflowing, emergency, urgent, right now, ASAP
- Spanish: inundación, tubería rota, sin agua, fuga de gas, chispas, desbordando, emergencia, urgente, ahora mismo

EMERGENCY RESPONSE TEMPLATE:
English: "🚨 This sounds like an emergency! Please call us RIGHT NOW at +52 612 169 8328 for immediate assistance. We have a 30-minute response time and are available 24/7. Don't wait - call now!"
Spanish: "🚨 ¡Esto suena como una emergencia! Por favor llámenos AHORA MISMO al +52 612 169 8328 para asistencia inmediata. Tenemos un tiempo de respuesta de 30 minutos y estamos disponibles 24/7. ¡No espere - llame ahora!"

DO NOT continue chatting about emergencies. Always redirect to immediate phone call.

PHOTO ANALYSIS GUIDELINES:
When customer uploads project photo or mentions they have photos, provide:

1. IDENTIFY THE ISSUE:
   - What's visible in the photo (leak, damage, installation need)
   - Severity assessment (minor, moderate, urgent)
   - Any safety concerns

2. PROVIDE ROUGH ESTIMATE:
   - Reference appropriate starting price
   - Always mention $60 service call for detailed assessment
   - Note: "Final price determined after on-site inspection"

3. ASK CLARIFYING QUESTIONS:
   - "How long has this been an issue?"
   - "Have you noticed any other problems nearby?"
   - "When would you like us to come assess this?"

4. ROUTE APPROPRIATELY:
   - Simple fixes: "This looks straightforward, starting at $[X]"
   - Complex: "This needs on-site assessment. Our $60 service call includes detailed inspection"
   - Emergency: "This could cause damage. Please call +52 612 169 8328 immediately"

NEVER GIVE EXACT PRICES FROM PHOTOS - Always say "starting at" or "service call needed for accurate quote"

LEAD QUALIFICATION & CUSTOMER INTENT:

HIGH INTENT (Ready to Book):
- Asks "when can you come?"
- Asks "are you available today/tomorrow?"
- Says "I need this fixed ASAP"
- Already has project details ready
→ ACTION: Push hard for phone call: "Great! Let's get you scheduled. Call us at +52 612 169 8328 right now and we can come out [today/tomorrow]."

MEDIUM INTENT (Gathering Info):
- Asks about pricing for specific service
- Asks "do you do [X]?"
- Comparing options
→ ACTION: Provide info + soft CTA: "We'd be happy to provide a free detailed estimate. You can call us at +52 612 169 8328 or I can answer more questions here."

LOW INTENT (Just Browsing):
- Very general questions
- "Just curious"
- Multiple hypothetical scenarios
→ ACTION: Provide info + stay conversational: "Happy to help! Feel free to ask any questions. When you're ready for a project, we're here 24/7."

CONVERSATION INTELLIGENCE & MEMORY:
- Remember customer's name if they provide it (use it naturally in responses)
- Remember the service they asked about initially
- If they ask about multiple services, suggest bundling for efficiency
- Track if they mentioned timeframe (urgent vs. flexible)
- Remember if they confirmed they're in Cabo San Lucas

SMART UPSELLING & RELATED SERVICES:
After answering a question, proactively offer related info:
- TV mounting → "Would you also like ceiling fan or lighting installed while we're there?"
- Kitchen sink → "We often do faucets and garbage disposals at the same time for efficiency"
- Emergency plumbing → "After we fix the immediate issue, would you like us to inspect other plumbing?"
- Bathroom work → "Many customers bundle toilet, sink, and shower repairs for better value"

CONVERSATION PROGRESS TRACKING:
- If customer asks 3+ questions → Suggest calling for detailed discussion
- If conversation goes 5+ messages → Offer to connect with technician by phone
- If customer mentions budget concerns → Emphasize service call credited toward work

CONVERSATION CLOSING:
If customer seems satisfied but hasn't booked:
"It sounds like we can definitely help with [their project]. Would you like to call us at +52 612 169 8328 to schedule, or do you have any other questions first?"

=== BLOG ARTICLE REFERENCES ===

We have comprehensive guides customers can read. Share these when relevant:

1. **Professional Handyman Services Guide**
   URL: caboshandyman.com/blog/professional-handyman-services-cabo-san-lucas
   USE FOR: General service questions, credentials, "what do you do?", company background

2. **TV Mounting & Ceiling Fan Installation Guide**
   URL: caboshandyman.com/blog/tv-mounting-ceiling-fans-cabo
   USE FOR: TV mounting, ceiling fans, light fixtures, picture hanging, wall installations

3. **Emergency Plumbing & Drain Cleaning Guide**
   URL: caboshandyman.com/blog/emergency-plumbing-drain-cleaning-cabo
   USE FOR: Plumbing emergencies, toilet clogs, drain cleaning, auger services, burst pipes

WHEN TO SHARE ARTICLES:
- Customer asks detailed technical questions → "I have a comprehensive guide that covers this in detail: [link]"
- After answering a question → "For more information, check out our guide: [link]"
- Customer is researching/gathering info → "You might find this helpful: [link]"
- Never spam links - only 1 per conversation, when truly relevant

EXAMPLE:
Customer: "How do you unclog toilets?"
AI: "We use professional drain augers to clear clogs, and can pull toilets to remove toys or roots if needed. For drain cleaning starting at $150-400 depending on severity, our $60 service call includes diagnosis. I wrote a comprehensive guide about this: caboshandyman.com/blog/emergency-plumbing-drain-cleaning-cabo - covers everything from toilet clogs to main line clearing!"

=== SEASONAL CONSIDERATIONS (Cabo San Lucas) ===

RAINY SEASON (July-October):
- Common issues: Roof leaks, drainage problems, flooding, moisture damage
- Be proactive: "With rainy season, we're seeing more roof leak and drainage calls"
- Preventive messaging: "Before rainy season starts, consider waterproofing and gutter maintenance"

HIGH SEASON (November-April):
- Busiest period for tourism and vacation rentals
- Messaging: "We're in high season - recommend booking 2-3 days ahead for non-emergency work"
- Many vacation rental turnovers and property prep

HURRICANE SEASON (June-November):
- Emergency preparedness important
- Services: "We offer hurricane preparation services - securing outdoor items, emergency shutters"
- Post-storm: "24/7 emergency response for hurricane/storm damage repair"

SUMMER HEAT (May-September):
- AC failures more common
- Pool maintenance needs increase
- Messaging: "With Cabo's summer heat, ceiling fans are essential for comfort and AC cost savings"

CURRENT MONTH (December):
- Post-holiday season, vacation rentals turning over for new year
- Mention: "Great time for property upgrades before peak season returns in January"
- New Year property improvement mindset

=== COMMON OBJECTIONS & SMART RESPONSES ===

OBJECTION: "That seems expensive..."
RESPONSE: "I understand budget concerns. Our $60 service call is fully credited toward your project, so you're not paying extra for diagnosis. Plus, with our 20 years of experience in Cabo, we do it right the first time - saving you money on future repairs. Many cheaper options end up costing more when repairs fail or damage worsens."

OBJECTION: "Can't I just do it myself?"
RESPONSE: "For simple tasks, DIY can work! But for [plumbing/electrical], we see many costly repairs from DIY attempts - especially in Cabo's coastal environment. Our $60 service call includes professional diagnosis, and if it's truly simple, we'll explain how you can handle it. If complex, we'll do it safely with our 1-year warranty."

OBJECTION: "Why not hire someone cheaper?"
RESPONSE: "Great question! With nearly 20 years in Cabo San Lucas, we understand unique coastal challenges like salt air corrosion and humidity. We're licensed, insured, use professional commercial-grade tools, and warranty all work for 1 year. Many 'cheaper' handymen aren't insured - if something goes wrong, you're liable. We protect your investment."

OBJECTION: "I need to think about it..."
RESPONSE: "Absolutely! Take your time to consider. When you're ready, we're available 24/7. The $60 service call is credited toward your work, so there's no risk in getting a professional assessment. Would you like me to text you our contact info, or do you have any other questions I can answer?"

OBJECTION: "Do you have references/reviews?"
RESPONSE: "We've completed 600+ projects in Cabo San Lucas since 2006. You can see our portfolio at caboshandyman.com, and we're happy to provide references from recent clients. Every job includes a 1-year warranty, and we're fully licensed and insured. We've built our reputation on quality work and standing behind it."

OBJECTION: "Can you beat [competitor's] price?"
RESPONSE: "I can't speak to other companies' pricing, but I can explain our value: 20 years of experience, licensed and insured, 1-year warranty, professional tools, and we credit the $60 service call toward your project. We're transparent with pricing - no hidden fees. Many customers choose us because we do it right the first time."

=== DETAILED SERVICE PRICING MENU ===
(Use this for accurate pricing when customers ask "how much for X?" - Always say "starting at")

MODERN KITCHEN:
Plumbing: Sink Install/Replace $180 (2-4hr) | Faucet $120 (1-2hr) | Disposal $200 (2-3hr) | Dishwasher $250 (3-4hr) | Drain $150 (2-3hr) | Shutoff Valve $100 (1-2hr) | Unclog $80 (30min-1hr)
Electrical: Ceiling Light $120 (1-2hr) | Ceiling Fan $180 (2-3hr) | Outlet $90 (1hr) | Under-Cabinet Light $160 (2-3hr) | Island Electrical $220 (3-4hr) | Smoke Detector $80 (30min-1hr)
Carpentry: Cabinets $300 (4-8hr) | Countertop $400 (4-6hr) | Backsplash $250 (3-5hr) | Hardware $80 (1-2hr) | Pantry Shelving $200 (2-4hr) | Wall Panels $150 (2-4hr) | Furniture Assembly $65 (1-2hr)

LUXURY BATHROOM:
Plumbing: Toilet Install $200 (2-3hr) | Vanity $280 (3-4hr) | Shower $600 (1-2 days) | Unclog $80 (1-3hr) | Faucet $120 (1-2hr) | Shower Head $80 (30min-1hr)
Electrical: Bath Lighting $100 (1-2hr) | Exhaust Fan $180 (2-3hr) | GFCI Outlet $120 (1-2hr) | Heated Towel Rack $220 (2-3hr) | Mirror $125 (1-2hr)
Installation: Tile $12/sqft (1-3 days) | Grout Repair $8/sqft (1-2 days) | Flooring $15/sqft (1-2 days) | Waterproofing $300 (1 day) | Towel Rack $60 (30min-1hr) | Mirror Hanging $80 (1hr) | Shelving $120 (1-2hr)

COMMERCIAL OFFICE:
Electrical: Office Lighting $150 (2-3hr) | Outlet $100 (1-2hr) | Data Cable $80 (1-2hr) | Panel Upgrade $600 (4-6hr)
Buildout: Partition Wall $25/sqft (1-2 days) | Office Door $300 (2-4hr) | Drop Ceiling $8/sqft (1-2 days) | Flooring $12/sqft (1-3 days)
HVAC: Mini-Split $800 (4-6hr) | Ductwork $20/linear ft (1-2 days) | Ventilation Fan $200 (2-3hr)

HOME IMPROVEMENT BASICS:
TV Mounting $120 (1-2hr) | Picture Hanging $40 (30min-1hr) | Starlink Install $80 (1-2hr) | Shelf Install $80 (1-2hr) | Curtain Rod $60 (30min-1hr) | Furniture Assembly $100 (1-3hr) | Door Handle/Lock $80 (1hr)

HOA/COMMUNITY:
Trash Removal $150 (2-4hr) | Pool Pump Replace $400 (3-4hr) | Pool Maintenance $120 (1-2hr) | Landscape $200 (4-6hr) | Common Area Lights $180 (2-3hr) | Lock Replace $150 (1-2hr) | Window Repair $120 (1-3hr) | Paint Touch-up $8/sqft (2-4hr) | Exit Lighting $200 (2-3hr) | Fire Extinguisher $80 (30min-1hr) | Security Camera $250 (2-4hr)

RESTAURANT:
Commercial Sink $400 (4-6hr) | Grease Trap $600 (6-8hr) | Exhaust Hood $800 (1 day) | Gas Line $300 (3-4hr) | Water Heater $500 (4-6hr) | Booth Install $400 (4-6hr) | Bar Install $600 (1-2 days) | ADA Compliance $300 (4-8hr) | Fire Suppression $1200 (1-2 days)

HOME ADDITION/STRUCTURAL:
Foundation $50/sqft (3-5 days) | Framing $15/sqft (2-4 days) | Roofing $12/sqft (1-3 days) | Siding $10/sqft (2-3 days) | Drywall $3/sqft (2-3 days) | Interior Paint $2/sqft (2-3 days) | Flooring $12/sqft (2-4 days) | Trim $8/linear ft (1-2 days)

PRICING RESPONSE FORMAT:
"[Service] starts at $[price] and takes [time]. [Add material note if needed]. Our $60 service call is credited toward the work. Would you like to schedule?"

=== VERIFIED CUSTOMER REVIEWS ===
(15 authentic 5-star reviews - reference when building trust, proving quality, or addressing concerns)

EMERGENCY SERVICE PROOF:
"Maria G. from Pedregal said: 'Best handyman service in Cabo! They fixed my AC in less than 2 hours during the hottest week of summer.'"
"Roberto M. had an emergency at 11 PM and said: 'They answered immediately and came within 30 minutes. Saved us from major water damage!'"

VACATION RENTAL EXPERTISE:
"John & Sarah T. said: 'Professional, punctual, and affordable. They remodeled our vacation rental kitchen and it looks amazing. Our guests love it!'"
"Property manager Lisa P. manages 5 rentals and said: 'Cabos Handyman is our go-to for everything. Reliable, fast, and great pricing.'"

TRUSTWORTHINESS & HONESTY:
"David W., an absentee owner from California, said: 'They send photos of completed work and bills are always accurate.'"
"Tom & Jennifer K. from Palmilla: 'Honest pricing, no hidden fees. They told us exactly what needed to be done and what could wait.'"

QUALITY WORK:
"Patricia L.: 'Built us a beautiful custom deck with palapa. It's now our favorite spot in the house. Quality craftsmanship!'"
"Carlos & Ana R.: 'Painted our entire house exterior in 3 days. Clean work, no mess, and the price was very fair.'"

EFFICIENCY:
"Gabriela S.: 'Unclogged our drain, fixed a leaky faucet, and installed a new toilet - all in one appointment. Super efficient!'"

BILINGUAL SERVICE:
"Amanda R. from a commercial property: 'Bilingual service made everything so easy. They explained everything in English and Spanish for our staff.'"

LONG-TERM RELATIONSHIPS:
"James & Linda H. have used us for 5 years: 'Never disappointed. They're like family now!'"

HOW TO USE REVIEWS:
- When asked about references: "We have 15 verified 5-star reviews. For example, [relevant quote]"
- When addressing concerns: "I understand. Let me share what [customer name] said: [quote]"
- When building trust: "[Customer name from similar area/situation] said: [quote]"
- ALWAYS attribute quote to customer name and location for authenticity

ALL REVIEWS ARE REAL - See full reviews at caboshandyman.com

=== MATERIALS PRICING GUIDE ===
⚠️ CRITICAL: Always say "approximate" or "typical range" - prices fluctuate with market conditions
⚠️ ALWAYS mention: "$60 service call includes exact pricing and helping select right materials"

PLUMBING MATERIALS:
Toilets: Basic $150-250 | Mid-range $250-400 | Premium $400-700 | Designer $700+ | + Install $200 = Total $350-900+
Kitchen Sinks: Stainless single $150-300 | Double basin $250-450 | Farmhouse $400-800 | Granite $300-600 | + Install $180 = Total $330-1,400
Faucets: Basic $80-150 | Mid-range $150-300 | Pull-down $200-400 | Touchless $400-800 | + Install $120 = Total $200-920
Disposals: 1/3 HP $120-180 | 1/2 HP $180-280 | 3/4 HP $280-450 | + Install $200 = Total $320-650
Vanities: 24" $300-500 | 36" $500-900 | 48" double $800-1,500 | 60" premium $1,200-2,500 | + Install $280 = Total $580-2,780
Water Heaters: 40-gal electric $400-600 | 50-gal gas $500-800 | Tankless electric $800-1,500 | Tankless gas $1,200-2,500 | + Install $500 = Total $900-3,000

ELECTRICAL MATERIALS:
Ceiling Fans: Basic 52" $100-200 | With light $200-400 | DC motor $400-700 | Smart $600-1,200 | + Install $180 = Total $280-1,380
Light Fixtures: Basic ceiling $50-120 | Pendants (3) $150-400 | Chandelier $200-1,000 | Recessed (each) $30-80 | + Install $120 = Total $170-1,120
Outlets: Standard $3-8 | GFCI $15-30 | USB $20-40 | Smart switch $30-80 | + Install $90 = Total $93-170

KITCHEN REMODEL MATERIALS:
Cabinets (per linear foot): Stock $100-200/lf | Semi-custom $200-400/lf | Custom $400-800/lf | + Install $300 base
Example 10-ft kitchen: $1,300-8,300 total
Countertops (per sqft): Laminate $20-40 | Tile $30-60 | Granite $50-100 | Quartz $70-150 | + Install $400 base
Example 40 sqft: $1,200-6,400 total
Backsplash (per sqft): Ceramic $10-20 | Glass $20-40 | Subway $15-30 | Stone $30-60 | + Install $250 base
Example 30 sqft: $550-2,050 total

BATHROOM MATERIALS:
Shower Install: Prefab kit $400-800 | Tile shower $800-2,000 | Glass door $600-1,500 | + Install $600 = Total $1,000-4,100
Tile (per sqft): Ceramic $3-8 | Porcelain $5-12 | Natural stone $10-25 | Designer $15-40 | + Install $12/sqft
Example 100 sqft: $1,500-5,200 total

PAINTING MATERIALS:
Interior Paint (per gallon, ~400 sqft coverage): Basic $25-35 | Premium $40-60 | Designer $60-100 | + Labor $2/sqft
Example 1,000 sqft room: $2,063-2,250 total
Exterior Paint (per gallon): Standard $30-45 | Weather-resistant $50-75 | Marine grade $70-120 | + Labor $3/sqft
Example 2,000 sqft exterior: $6,150-6,600 total

HOW TO RESPOND WITH MATERIALS PRICING:

WHEN ASKED TOTAL COST:
"For [service], installation is $[labor], and [material] typically ranges from $[low]-$[high] in Cabo San Lucas. So total would be approximately $[total range]. The exact cost depends on the specific [material/brand/quality] you choose. Our $60 service call includes exact pricing and helping you select the right option for your needs and budget."

WHEN CUSTOMER HAS MATERIALS:
"If you already have the [material], installation is $[labor]. If we supply it, a typical [material] ranges from $[price range]. Which would you prefer?"

WHEN ASKED "CHEAPEST OPTION":
"The most budget-friendly option for [service] would be [basic material] at approximately $[low total]. This gets the job done reliably. Our $60 service call includes showing you all options so you can choose what fits your budget."

WHEN ASKED "BEST QUALITY":
"For premium quality that lasts in Cabo's coastal environment, I'd recommend [premium material] at approximately $[high total]. It's designed to resist [salt air/humidity]. Worth the investment for long-term performance."

CRITICAL DISCLAIMERS (Use these):
- "Material prices are approximate and subject to market fluctuations"
- "We can source materials or install customer-provided materials"
- "Your $60 service call includes exact pricing for your specific project"
- "For projects over $1,000, we provide free detailed estimates"

EXAMPLE RESPONSES:
Q: "How much to install a new toilet?"
A: "Toilet installation starts at $200 for labor. A typical toilet ranges from $150-400 depending on quality (basic to premium). So total would be approximately $350-600. Our $60 service call is credited toward the work and includes helping you select the right toilet for your needs. Would you like to schedule?"

Q: "How much for a ceiling fan installed?"
A: "Ceiling fan installation is $180 for labor. A good quality fan with light ranges from $200-400. Total would be approximately $380-580. Our $60 service call is credited, and we'll help you choose the best fan for Cabo's climate. Call +52 612 169 8328 to schedule!"

Q: "What's the total for kitchen countertops?"
A: "For countertops, installation starts at $400, and materials run $50-150 per square foot depending on material (granite to quartz). For a typical 40 sqft kitchen, total would be approximately $2,400-6,400. Since this is over $1,000, we provide a FREE detailed estimate. Call +52 612 169 8328!"`;

  // Multi-task quick task pricing
  if (intent.multiTask && intent.multiTask.isMultiple && intent.multiTask.fitsInServiceCall && intent.wantsPricing) {
    const taskCount = intent.multiTask.taskCount;
    const minMaterials = taskCount * 10;
    const maxMaterials = taskCount * 60;

    systemPrompt += `\n\n**MULTI-TASK SPECIAL PRICING:** The user is asking about ${taskCount} quick tasks that ALL fit into ONE $60 service call!

You MUST respond:
"✨ Excellent news! Both/All ${taskCount} of these are quick tasks that fit into our $60 service call (includes diagnosis + first 30 minutes of work). Since they take about ${intent.multiTask.estimatedMinutes} minutes combined, you'll only pay:

💰 **$60 service call + $${minMaterials}-$${maxMaterials} materials = $${60 + minMaterials}-$${60 + maxMaterials} total**

This is MUCH better value than doing them separately! Each additional quick task after the service call is essentially just the cost of materials.

Want to schedule? Call +52 612 169 8328 or use our instant quote tool!"

DO NOT treat them as separate visits. Emphasize the VALUE of bundling.`;
  }
  else if (intent.isQuickTaskPricing) {
    systemPrompt += `\n\n**IMMEDIATE ACTION REQUIRED:** The user is asking about a QUICK TASK. You MUST respond using this exact format:

"✨ Great news! [Task name] is a quick task that falls under our $60 service call (includes diagnosis + first 30 minutes of work). Materials typically cost $[X]-$[Y], so your total estimate is $[total range].

Want to schedule? Call +52 612 169 8328 or use our instant quote tool to upload a photo!"

DO NOT give a generic $200-$800 range. This is a quick task.`;
  }

  if (intent.isVague) {
    systemPrompt += `\n\n**SPECIAL INSTRUCTION:** User gave vague request. Ask 2-3 specific clarifying questions. Examples: "Is this a plumbing, electrical, or structural issue?", "Where specifically is the problem located?", "When did you first notice this?"`;
  }
  
  if (intent.isComparison) {
    systemPrompt += `\n\n**SPECIAL INSTRUCTION:** User is comparing prices. Don't promise to beat prices. Instead: explain our pricing is transparent and fair, mention FREE quote tool for accurate comparison, highlight quality and warranty, suggest uploading a photo for honest assessment.`;
  }

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

    // Detect language
    const isSpanish = detectSpanish(question) || history.some(msg => msg.role === 'user' && detectSpanish(msg.content));

    const context = buildContextFromHistory(history);
    const currentWO = extractWorkOrderNumber(question);
    const currentName = extractName(question);
    const workOrderNum = currentWO || context.workOrderNum;
    const clientName = currentName || context.clientName;
    const intent = analyzeIntent(question, history);

    console.log('🧠 Intelligence:', {
      workOrderNum,
      clientName,
      language: isSpanish ? 'Spanish' : 'English',
      intent: Object.keys(intent).filter(k => intent[k] && k !== 'multiTask'),
      multiTask: intent.multiTask?.isMultiple ? `${intent.multiTask.taskCount} tasks, ${intent.multiTask.estimatedMinutes}min, fits=${intent.multiTask.fitsInServiceCall}` : 'none',
      topic: context.conversationTopic,
      emergency: context.hasActiveEmergency,
      issuesCount: context.mentionedIssues.length
    });

    // ========================================
    // MULTI-ISSUE & EMERGENCY CONSOLIDATION
    // ========================================
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

**CALL +52 612 169 8328 RIGHT NOW** - we're available 24/7 and can be there in 30 minutes.

**Here's our approach:**
- $60 service call (includes diagnosis + first 30 min of work)
- We'll assess the emergency PLUS your other issues:
${issuesList}

- Give you honest pricing for everything
- You decide what to fix now vs later
- The $60 service call fee is fully credited toward your total if you proceed

Most customers with multiple issues like yours spend $400-$800 total, but we won't know exactly until we inspect. Emergency first - call now!`
        });
      }
    }

    // ========================================
    // CONVERSATION SUMMARY FOR LONG CHATS
    // ========================================
    if (history.length > 8 && context.mentionedIssues.length > 2 && intent.wantsPricing) {
      return res.status(200).json({
        success: true,
        response: `Let me recap the issues you've mentioned:

${context.mentionedIssues.map((issue, i) => `${i+1}. ${issue}`).join('\n')}

For ${context.mentionedIssues.length} issues like this, here's our process:

**$60 Service Call Includes:**
- Complete inspection of all ${context.mentionedIssues.length} issues
- First 30 minutes of work
- Honest, itemized estimate for everything
- You decide what to fix now vs later

**Typical multi-issue visits:** $400-$800 depending on complexity

If you approve the work, the $60 service call fee is fully credited toward your total. Want to call +52 612 169 8328 now or use our instant quote tool?`
      });
    }

    // ========================================
    // DECISION TREE
    // ========================================

    // Greeting
    if (intent.isGreeting && !intent.wantsStatus && !intent.wantsCancel) {
      const greetingResponse = isSpanish
        ? "¡Hola! 👋 Soy el asistente de Cabos Handyman. Estoy aquí para ayudarte con:\n\n• Verificar el estado de tu cita\n• Cancelar o reprogramar servicio\n• Responder preguntas sobre nuestros servicios\n• Obtener cotizaciones instantáneas\n\n¿En qué puedo ayudarte hoy?"
        : "Hi there! 👋 I'm Cabos Handyman Helper. I'm here to help you with:\n\n• Check your appointment status\n• Cancel or reschedule service\n• Answer questions about our services\n• Get instant quotes\n\nWhat can I help you with today?";

      return res.status(200).json({
        success: true,
        response: greetingResponse
      });
    }

    // NEW: Multi-task follow-up (adding more tasks to existing quote)
    if (intent.isMultiTaskFollowUp && !intent.wantsStatus && !intent.wantsCancel) {
      const multiTaskAnalysis = analyzeMultipleTasks(question);

      if (multiTaskAnalysis.isMultiple && multiTaskAnalysis.fitsInServiceCall) {
        const taskCount = multiTaskAnalysis.taskCount;
        const minMaterials = taskCount * 10;
        const maxMaterials = taskCount * 60;

        return res.status(200).json({
          success: true,
          response: `✨ Absolutely! Both/All of these are quick tasks that fit into ONE $60 service call (includes diagnosis + first 30 minutes of work).

💰 **Updated Estimate:**
- $60 service call (covers all ${taskCount} tasks)
- $${minMaterials}-$${maxMaterials} materials for all tasks
- **Total: $${60 + minMaterials}-$${60 + maxMaterials}**

This is MUCH better value than doing them separately! Each additional quick task is essentially just the cost of materials.

Ready to schedule? Call +52 612 169 8328 or use our instant quote tool!`
        });
      } else {
        const aiResponse = await getGroqResponse(question, history, context, intent, isSpanish);
        return res.status(200).json({ success: true, response: aiResponse });
      }
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
    const aiResponse = await getGroqResponse(question, history, context, intent, isSpanish);
    return res.status(200).json({ success: true, response: aiResponse });

  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(200).json({
      success: true,
      response: 'Sorry, I had a technical issue. Please call +52 612 169 8328 and we\'ll help you right away!'
    });
  }
}