// api/feedback-chat.js - TRULY INTELLIGENT CONVERSATIONAL AI v5
// Built for exceptional customer experience with 200+ quick task detection

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
  // Ignore greetings and common words
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
      // Skip if it's a greeting or common word
      if (greetings.includes(name)) continue;
      return match[1];
    }
  }
  return null;
}

// ========================================
// QUICK TASK DETECTION - $100 SERVICE CALL (200+ TASKS)
// ========================================

const quickTaskKeywords = [
  // PLUMBING QUICK FIXES (under 30 min)
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
  
  // DOORS & HARDWARE (under 30 min)
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
  
  // ELECTRICAL QUICK FIXES (under 30 min)
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
  
  // WINDOW TREATMENTS & COVERINGS (under 30 min)
  'curtain rod', 'drapery rod', 'shower curtain rod', 'tension rod', 'cafe rod',
  'curtain bracket', 'rod bracket', 'rod end', 'finial', 'curtain ring', 'clip ring',
  'blind', 'shade', 'roller shade', 'cellular shade', 'honeycomb shade', 'roman shade',
  'venetian blind', 'mini blind', 'aluminum blind', 'vinyl blind', 'wood blind',
  'vertical blind', 'vertical vane', 'plantation shutter', 'shutter panel',
  'window screen', 'screen frame', 'screen mesh', 'screen spline', 'screen door',
  'window lock', 'sash lock', 'window latch', 'window crank', 'casement crank',
  'blind cord', 'lift cord', 'tilt wand', 'cordless blind', 'valance clip',
  
  // WALLS & HANGING (under 30 min)
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
  
  // KITCHEN & BATH ACCESSORIES (under 30 min)
  'soap dispenser', 'lotion dispenser', 'hand soap pump', 'dish soap dispenser',
  'shower caddy', 'corner caddy', 'hanging caddy', 'suction caddy', 'tension caddy',
  'shower curtain', 'curtain liner', 'curtain hooks', 'shower rings',
  'grab bar', 'safety bar', 'balance bar', 'towel warmer', 'heated towel rack',
  'paper towel holder', 'under cabinet holder', 'wall mount holder', 'standing holder',
  'spice rack', 'spice shelf', 'spice organizer', 'pot rack', 'pan organizer',
  'utensil holder', 'utensil crock', 'knife block', 'knife holder', 'magnetic strip',
  'cutting board rack', 'dish rack', 'drying rack', 'cup holder', 'mug hook',
  'sink grid', 'sink mat', 'drain board', 'dish drainer', 'silverware tray',
  
  // HVAC & VENTILATION (under 30 min)
  'air vent cover', 'vent cover', 'register cover', 'floor register', 'wall register',
  'ceiling register', 'grille cover', 'return air cover', 'return vent', 'air grille',
  'hvac filter', 'air filter', 'furnace filter', 'ac filter', 'pleated filter',
  'range hood filter', 'grease filter', 'charcoal filter', 'exhaust filter',
  'bathroom fan cover', 'exhaust fan cover', 'fan grille', 'dryer vent cover',
  'vent flap', 'damper', 'vent cap', 'soffit vent', 'gable vent',
  
  // SMALL APPLIANCE FIXES (under 30 min)
  'garbage disposal reset', 'disposal wrench', 'dishwasher filter', 'dishwasher basket',
  'refrigerator filter', 'water filter', 'ice maker filter', 'fridge light',
  'microwave turntable', 'turntable roller', 'microwave light', 'oven light',
  'range hood light', 'hood bulb', 'exhaust fan cover', 'dryer lint trap',
  'washer hose', 'washer filter', 'appliance foot', 'appliance leveling leg',
  
  // OUTDOOR & EXTERIOR (under 30 min)
  'house numbers', 'address numbers', 'address plaque', 'number plate',
  'mailbox post', 'mailbox flag', 'small mailbox', 'wall mailbox', 'mounted mailbox',
  'porch light', 'outdoor light', 'exterior light', 'wall lantern', 'wall sconce',
  'motion light', 'motion sensor light', 'security light', 'flood light bulb',
  'landscape light', 'path light', 'solar light', 'stake light', 'garden light',
  'hose holder', 'hose reel', 'hose hanger', 'hose guide', 'hose pot',
  'garden hook', 'plant hook', 'hanging basket', 'shepherd hook', 'planter hook',
  'flag holder', 'flag bracket', 'welcome mat', 'door mat', 'boot tray',
  'gutter guard', 'downspout extension', 'splash block', 'window well cover',
  
  // SAFETY & SECURITY (under 30 min)
  'door chain', 'security chain', 'chain guard', 'door guard', 'barrel bolt',
  'slide bolt', 'surface bolt', 'cabinet lock', 'child lock', 'safety latch',
  'baby gate', 'pressure gate', 'hardware mount gate', 'gate extension',
  'window lock', 'sash lock', 'sliding door lock', 'patio door lock', 'pin lock',
  'security bar', 'window bar', 'door brace', 'security wedge',
  
  // MISCELLANEOUS QUICK TASKS (under 30 min)
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
  
  // Exclude if it's complex/major work
  const isComplex = /multiple|several|many|complex|major|install new|replace entire|demo|demolition|renovation|remodel|gut|remove wall|add wall/i.test(lower);
  
  return hasQuickKeyword && !isComplex;
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
  
  // DETECT QUICK TASK PRICING QUESTIONS
  const isQuickTaskQuestion = hasPricingIntent && isQuickTask(text);
  
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
    isQuickTaskPricing: isQuickTaskQuestion,
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
    
    // ========================================
    // ONLY SCAN USER MESSAGES FOR CONTEXT
    // ========================================
    if (msg.role === 'user') {
      // Extract work order and name
      if (!context.workOrderNum) {
        context.workOrderNum = extractWorkOrderNumber(msg.content);
      }
      if (!context.clientName) {
        context.clientName = extractName(msg.content);
      }
      
      // Detect and remember emergencies
      if (/overflowing|flooding|burst|emergency|urgent|right now|asap|sparking|water everywhere/i.test(msg.content)) {
        context.hasActiveEmergency = true;
        const match = msg.content.match(/overflowing|flooding|burst|sparking/i);
        context.emergencyType = match ? match[0] : 'emergency';
        context.emergencyMentionedAt = i;
      }
      
      // Track issues mentioned for summary
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
      
      // ========================================
      // TOPIC DETECTION - USER INTENT ONLY
      // ========================================
      const userLower = msg.content.toLowerCase();
      
      // Only set topic if user EXPLICITLY mentions it
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
    
    // ========================================
    // SCAN ASSISTANT MESSAGES - ONLY FOR TRACKING QUESTIONS
    // ========================================
    if (msg.role === 'assistant') {
      // Track what we asked for (so we know what they're answering)
      if (/work order number/i.test(msg.content)) {
        context.lastAskedFor = 'workorder';
      }
      if (/last name|your name/i.test(msg.content)) {
        context.lastAskedFor = 'name';
      }
      
      // DON'T set conversationTopic from assistant messages!
      // This prevents AI from triggering itself
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
// GROQ AI - ENHANCED WITH QUICK TASK INTELLIGENCE
// ========================================

async function getGroqResponse(question, history, context, intent) {
  let systemPrompt = `You are a helpful AI assistant for Cabos Handyman in Cabo San Lucas, Mexico.

**SERVICES:**
- Residential (kitchens, bathrooms, renovations)
- Emergency 24/7 (water damage, electrical, structural)
- Commercial (offices, retail)
- HOA/Property maintenance

**PRICING STRUCTURE:**

**QUICK TASKS (under 30 minutes) - $100 SERVICE CALL:**
These tasks fall under our $100 service call which includes diagnosis + first 30 minutes of work:
- Toilet parts: flush valves, flappers, fill valves, toilet seats, handles, chains, wax rings ($5-$60 parts)
- Door hardware: knobs, handles, hinges, locks, deadbolts, closers, sweeps, thresholds ($15-$100 parts)
- Cabinet hardware: knobs, pulls, handles, hinges, catches, slides ($5-$80 parts)
- Electrical: switches, outlets, covers, plates, smoke detectors, doorbells, thermostats ($5-$60 parts)
- Plumbing fixtures: aerators, supply lines, angle stops, shower heads, towel bars, soap dishes ($10-$80 parts)
- Window treatments: curtain rods, blinds, shades, screens, locks ($15-$100 parts)
- Wall hanging: shelves, mirrors, pictures, hooks, coat racks, grab bars ($5-$80 parts)
- HVAC: filters, vent covers, registers, grilles ($10-$50 parts)
- Small fixes: caulking, weatherstripping, touch-ups, adjustments, lubrication ($5-$40 materials)

**QUICK TASK PRICING FORMAT:**
"✨ Great news! [Task name] is a quick task that falls under our $100 service call (includes diagnosis + first 30 minutes of work). Materials typically cost $[X]-$[Y], so your total estimate is $[100+X]-$[100+Y]."

**STANDARD JOBS (over 30 minutes):**
- $100 service call + $80/hour labor + materials
- Leak repairs: $300-$700 total
- Electrical repairs: $250-$600 total
- Plumbing repairs: $300-$900 total
- Emergency: +50% after hours

**HOURS:**
- Mon-Sat: 7 AM - 6 PM
- Emergency: 24/7
- Phone: +52 612 169 8328

**CRITICAL INSTRUCTIONS:**
1. ALWAYS check if the question is about a quick task FIRST before giving any price
2. If it's a quick task, use the exact format above with the ✨ emoji
3. Be warm, friendly, and concise (2-3 sentences)
4. DON'T ask for work order numbers - system handles that
5. Mention FREE instant quote tool for complex estimates
6. If you don't know, suggest calling`;

  // Special instruction for quick task pricing
  if (intent.isQuickTaskPricing) {
    systemPrompt += `\n\n**IMMEDIATE ACTION REQUIRED:** The user is asking about a QUICK TASK. You MUST respond using this exact format:

"✨ Great news! [Task name] is a quick task that falls under our $100 service call (includes diagnosis + first 30 minutes of work). Materials typically cost $[X]-$[Y], so your total estimate is $[total range].

Want to schedule? Call +52 612 169 8328 or use our instant quote tool to upload a photo!"

DO NOT give a generic $200-$800 range. This is a quick task under $200 total.`;
  }

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
      issuesCount: context.mentionedIssues.length,
      isQuickTask: intent.isQuickTaskPricing
    });

    // ========================================
    // BUG FIX #3: MULTI-ISSUE & EMERGENCY CONSOLIDATION
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