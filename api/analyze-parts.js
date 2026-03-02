// api/analyze-parts.js - ULTRA-INTELLIGENT MULTI-TASK IMAGE ANALYSIS v4
// Full parity with feedback-chat.js + Enhanced image detection + Smart bundling
// FIXED: Description is now primary source of truth for task count
// FIXED: Follow-up requests now properly bundle with previous tasks
// FIXED: AI labor estimation now references actual service menu durations
// FIXED: Quick tasks correctly identified (doorknobs, switches = 0.5-1hr, not 2hr)

import { checkOrigin, rateLimit, getClientIp, validateHistory, MAX_MESSAGE_LENGTH, MAX_IMAGE_COUNT } from './_security.js';

export const config = {
  maxDuration: 60,
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

// ============================================================
// SERVICE MENU REFERENCE DATA - SOURCE OF TRUTH FOR LABOR TIMES
// ============================================================
// Extracted from ServiceMenuPopup.tsx - our actual service menu

const serviceMenuDurations = {
  // PLUMBING - Kitchen
  'sink installation': '2-4 hours',
  'sink replacement': '2-4 hours',
  'faucet installation': '1-2 hours',
  'faucet replacement': '1-2 hours',
  'garbage disposal': '2-3 hours',
  'dishwasher installation': '3-4 hours',
  'kitchen drain': '2-3 hours',
  'shut-off valve': '1-2 hours',
  'sink unclogging': '30min-1hr',

  // PLUMBING - Bathroom
  'toilet installation': '2-3 hours',
  'toilet replacement': '2-3 hours',
  'vanity installation': '3-4 hours',
  'shower installation': '1-2 days',
  'toilet unclogging': '30min-1hr', // SIMPLE CLOG - $60 service call covers this
  'toilet clog': '30min-1hr', // SIMPLE CLOG - $60 service call
  'tub unclogging': '30min-1hr', // SIMPLE CLOG - $60 service call
  'shower clog': '30min-1hr', // SIMPLE CLOG - $60 service call
  'bathroom faucet': '1-2 hours',
  'shower head': '30min-1hr',

  // DRAIN SERVICES - Critical distinction
  'simple clog': '30min-1hr', // $60 service call - plunger/hand snake
  'drain cleaning': '2-4 hours', // PROFESSIONAL - $150-400 - main line/hydro-jetting
  'hydro jetting': '2-4 hours', // PROFESSIONAL - $200-500
  'hydro-jetting': '2-4 hours', // PROFESSIONAL - $200-500
  'main sewer line': '2-4 hours', // PROFESSIONAL - $150-400
  'sewer line cleaning': '2-4 hours', // PROFESSIONAL - $150-400

  // ELECTRICAL - Kitchen
  'ceiling light': '1-2 hours',
  'ceiling fan': '2-3 hours',
  'outlet installation': '1 hour',
  'outlet replacement': '1 hour',
  'under-cabinet lighting': '2-3 hours',
  'smoke detector': '30min-1hr',

  // ELECTRICAL - Bathroom
  'bathroom lighting': '1-2 hours',
  'exhaust fan': '2-3 hours',
  'gfci outlet': '1-2 hours',
  'heated towel rack': '2-3 hours',

  // INSTALLATION & CARPENTRY
  'cabinet installation': '4-8 hours',
  'countertop installation': '4-6 hours',
  'backsplash': '3-5 hours',
  'kitchen hardware': '1-2 hours',
  'pantry shelving': '2-4 hours',
  'furniture assembly': '1-3 hours',

  // BATHROOM ACCESSORIES
  'tile installation': '1-3 days',
  'grout repair': '1-2 days',
  'bathroom flooring': '1-2 days',
  'towel rack': '30min-1hr',
  'mirror hanging': '1 hour',
  'bathroom shelving': '1-2 hours',

  // HOME BASICS
  'tv mounting': '1-2 hours',
  'picture hanging': '30min-1hr',
  'starlink installation': '1-2 hours',
  'shelf installation': '1-2 hours',
  'curtain rod': '30min-1hr',
  'door handle': '1 hour',
  'door lock': '1 hour',
  'doorknob': '30min-1hr',
  'lock installation': '1 hour',

  // OFFICE & COMMERCIAL
  'office lighting': '2-3 hours',
  'data cable': '1-2 hours',
  'panel upgrade': '4-6 hours',
  'partition wall': '1-2 days',
  'office door': '2-4 hours',

  // COMMERCIAL KITCHEN
  'commercial sink': '4-6 hours',
  'grease trap': '6-8 hours',
  'exhaust hood': '1 day',
  'gas line': '3-4 hours',

  // MAINTENANCE
  'pool pump': '3-4 hours',
  'pool equipment': '1-2 hours',
  'window repair': '1-3 hours',
  'paint touch-up': '2-4 hours',
  'fire extinguisher': '30min-1hr',
};

// Convert duration string to hours (average)
function parseDuration(durationStr) {
  if (!durationStr) return 1.0;

  // Handle ranges like "2-4 hours" → average 3
  const rangeMatch = durationStr.match(/(\d+)-(\d+)\s*hours?/);
  if (rangeMatch) {
    const low = parseInt(rangeMatch[1]);
    const high = parseInt(rangeMatch[2]);
    return (low + high) / 2;
  }

  // Handle "30min-1hr" → 0.75 hours
  const minHrMatch = durationStr.match(/(\d+)min-(\d+)h?r?/);
  if (minHrMatch) {
    const mins = parseInt(minHrMatch[1]);
    const hrs = parseInt(minHrMatch[2]);
    return (mins / 60 + hrs) / 2;
  }

  // Handle "1 hour" → 1.0
  const singleMatch = durationStr.match(/(\d+)\s*hours?/);
  if (singleMatch) {
    return parseInt(singleMatch[1]);
  }

  // Handle days "1-2 days" → 12 hours (average)
  const daysMatch = durationStr.match(/(\d+)-(\d+)\s*days?/);
  if (daysMatch) {
    const low = parseInt(daysMatch[1]);
    const high = parseInt(daysMatch[2]);
    return ((low + high) / 2) * 8; // 8 hours per day
  }

  // Handle single day "1 day" → 8 hours
  const singleDayMatch = durationStr.match(/(\d+)\s*days?/);
  if (singleDayMatch) {
    return parseInt(singleDayMatch[1]) * 8;
  }

  return 1.0; // Default fallback
}

// Lookup service in menu
function lookupServiceDuration(description) {
  const lower = description.toLowerCase();

  // Check for exact matches first
  for (const [service, duration] of Object.entries(serviceMenuDurations)) {
    if (lower.includes(service)) {
      const hours = parseDuration(duration);
      console.log(`✓ SERVICE MENU MATCH: "${service}" = ${duration} (${hours} hrs average)`);
      return {
        found: true,
        service: service,
        duration: duration,
        hours: hours
      };
    }
  }

  console.log(`✗ Not found in service menu: "${description}"`);
  return { found: false, hours: 1.0 };
}

// ========================================
// LANGUAGE DETECTION
// ========================================

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

// ========================================
// SERVICE AREA ENFORCEMENT
// ========================================

function checkServiceArea(text) {
  const lower = text.toLowerCase();

  // San José del Cabo variants
  const sanJosePatterns = [
    /san jos[eé]( del cabo)?/i,
    /san jose/i,
    /sjd/i
  ];

  // East Cape / Corridor / Other areas
  const outsideAreas = [
    /east cape/i,
    /los barriles/i,
    /cabo pulmo/i,
    /la ribera/i,
    /corridor/i,
    /tourist corridor/i,
    /los cabos corridor/i,
    /between cabo/i,
    /halfway between/i
  ];

  const mentionsSanJose = sanJosePatterns.some(pattern => pattern.test(lower));
  const mentionsOutsideArea = outsideAreas.some(pattern => pattern.test(lower));

  return {
    isOutsideServiceArea: mentionsSanJose || mentionsOutsideArea,
    location: mentionsSanJose ? 'San José del Cabo' : mentionsOutsideArea ? 'outside Cabo San Lucas' : null
  };
}

// ========================================
// EMERGENCY DETECTION
// ========================================

function detectEmergency(text) {
  const lower = text.toLowerCase();

  const emergencyKeywords = [
    // English
    'emergency', 'urgent', 'right now', 'immediately', 'asap', 'as soon as possible',
    'overflowing', 'flooding', 'flood', 'burst', 'water everywhere', 'sparking',
    'gas leak', 'smell gas', 'no water', 'burst pipe', 'broken pipe',
    'electrical fire', 'smoke', 'burning smell', 'water damage',
    // Spanish
    'emergencia', 'urgente', 'ahora mismo', 'inmediatamente',
    'desbordando', 'inundación', 'inundando', 'tubería rota', 'fuga de gas',
    'chispas', 'sin agua', 'fuego', 'humo'
  ];

  return emergencyKeywords.some(keyword => lower.includes(keyword));
}

// ========================================
// QUICK TASK DETECTION - $60 SERVICE CALL (200+ TASKS)
// ========================================

const quickTaskKeywords = [
  // PLUMBING QUICK FIXES (under 1 hour)
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
  
  // DOORS & HARDWARE (under 1 hour)
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
  
  // ELECTRICAL QUICK FIXES (under 1 hour)
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
  
  // WINDOW TREATMENTS & COVERINGS (under 1 hour)
  'curtain rod', 'drapery rod', 'shower curtain rod', 'tension rod', 'cafe rod',
  'curtain bracket', 'rod bracket', 'rod end', 'finial', 'curtain ring', 'clip ring',
  'blind', 'shade', 'roller shade', 'cellular shade', 'honeycomb shade', 'roman shade',
  'venetian blind', 'mini blind', 'aluminum blind', 'vinyl blind', 'wood blind',
  'vertical blind', 'vertical vane', 'plantation shutter', 'shutter panel',
  'window screen', 'screen frame', 'screen mesh', 'screen spline', 'screen door',
  'window lock', 'sash lock', 'window latch', 'window crank', 'casement crank',
  'blind cord', 'lift cord', 'tilt wand', 'cordless blind', 'valance clip',
  
  // WALLS & HANGING (under 1 hour)
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
  
  // KITCHEN & BATH ACCESSORIES (under 1 hour)
  'shower caddy', 'corner caddy', 'hanging caddy', 'suction caddy', 'tension caddy',
  'shower curtain', 'curtain liner', 'curtain hooks', 'shower rings',
  'grab bar', 'safety bar', 'balance bar', 'towel warmer', 'heated towel rack',
  'paper towel holder', 'under cabinet holder', 'wall mount holder', 'standing holder',
  'spice rack', 'spice shelf', 'spice organizer', 'pot rack', 'pan organizer',
  'utensil holder', 'utensil crock', 'knife block', 'knife holder', 'magnetic strip',
  'cutting board rack', 'dish rack', 'drying rack', 'cup holder', 'mug hook',
  'sink grid', 'sink mat', 'drain board', 'dish drainer', 'silverware tray',
  
  // HVAC & VENTILATION (under 1 hour)
  'air vent cover', 'vent cover', 'register cover', 'floor register', 'wall register',
  'ceiling register', 'grille cover', 'return air cover', 'return vent', 'air grille',
  'hvac filter', 'air filter', 'furnace filter', 'ac filter', 'pleated filter',
  'range hood filter', 'grease filter', 'charcoal filter', 'exhaust filter',
  'bathroom fan cover', 'exhaust fan cover', 'fan grille', 'dryer vent cover',
  'vent flap', 'damper', 'vent cap', 'soffit vent', 'gable vent',
  
  // SMALL APPLIANCE FIXES (under 1 hour)
  'garbage disposal reset', 'disposal wrench', 'dishwasher filter', 'dishwasher basket',
  'refrigerator filter', 'water filter', 'ice maker filter', 'fridge light',
  'microwave turntable', 'turntable roller', 'microwave light', 'oven light',
  'range hood light', 'hood bulb', 'dryer lint trap',
  'washer hose', 'washer filter', 'appliance foot', 'appliance leveling leg',
  
  // OUTDOOR & EXTERIOR (under 1 hour)
  'porch light', 'outdoor light', 'exterior light', 'wall lantern', 'wall sconce',
  'motion light', 'motion sensor light', 'security light', 'flood light bulb',
  'landscape light', 'path light', 'solar light', 'stake light', 'garden light',
  'hose holder', 'hose reel', 'hose hanger', 'hose guide', 'hose pot',
  'garden hook', 'plant hook', 'hanging basket', 'shepherd hook', 'planter hook',
  'flag holder', 'flag bracket', 'welcome mat', 'door mat', 'boot tray',
  'gutter guard', 'downspout extension', 'splash block', 'window well cover',
  
  // SAFETY & SECURITY (under 1 hour)
  'door chain', 'security chain', 'chain guard', 'door guard', 'barrel bolt',
  'slide bolt', 'surface bolt', 'cabinet lock', 'child lock', 'safety latch',
  'baby gate', 'pressure gate', 'hardware mount gate', 'gate extension',
  'sliding door lock', 'patio door lock', 'pin lock',
  'security bar', 'window bar', 'door brace', 'security wedge',
  
  // MISCELLANEOUS QUICK TASKS (under 1 hour)
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

function isQuickTask(description, issueType) {
  const lower = description.toLowerCase();
  const issueTypeLower = (issueType || '').toLowerCase();
  
  const hasQuickTaskKeyword = quickTaskKeywords.some(keyword => 
    lower.includes(keyword) || issueTypeLower.includes(keyword)
  );
  
  const isComplex = /multiple|several|many|complex|major|install new|replace entire|demo|demolition|renovation/i.test(lower);
  const isInstallation = /install\s+(?:new|a)\s+(?:toilet|sink|faucet|outlet|switch)/i.test(lower);
  
  return hasQuickTaskKeyword && !isComplex && !isInstallation;
}

// ========================================
// CHAT HISTORY ANALYSIS FOR FOLLOW-UP DETECTION
// ========================================

function extractPreviousTaskInfo(chatHistory) {
  if (!chatHistory || chatHistory.length === 0) return null;
  
  // Look for the most recent AI response containing cost estimate
  let previousTaskCount = 0;
  let previousTaskDescriptions = [];
  
  for (let i = chatHistory.length - 1; i >= 0; i--) {
    const msg = chatHistory[i];
    if (msg.role === 'assistant' && msg.content) {
      const content = msg.content.toLowerCase();
      
      // Look for task count indicators
      const taskCountMatch = content.match(/(\d+)\s+(?:quick\s+)?tasks?|both.*?tasks?|all\s+(\d+)/i);
      if (taskCountMatch) {
        previousTaskCount = parseInt(taskCountMatch[1] || taskCountMatch[2]) || 1;
      }
      
      // Look for quick task keywords mentioned
      previousTaskDescriptions = quickTaskKeywords.filter(kw => content.includes(kw));
      
      if (previousTaskCount > 0 || previousTaskDescriptions.length > 0) {
        break;
      }
    }
  }
  
  return {
    taskCount: previousTaskCount,
    taskDescriptions: previousTaskDescriptions,
    hasEstimate: previousTaskCount > 0 || previousTaskDescriptions.length > 0
  };
}

function isFollowUpRequest(description) {
  return /can i add|add to|also|do you|can you|bundle|same visit|together|while you|at the same time/i.test(description);
}

// ========================================
// ENHANCED MULTI-TASK DETECTION WITH IMAGE ANALYSIS
// ========================================

function analyzeMultipleTasks(description, detectedItems = [], previousTaskInfo = null) {
  const desc = description.toLowerCase();
  
  // Detect multiple indicators in description
  const multipleIndicators = [
    /and|&|plus|\+/i,
    /also|as well/i,
    /both|couple|few|several/i,
    /\d+\s+(things|tasks|items|repairs|issues)/i,
    /can i add|add to|include|while (you|they)|at (the )?same time|bundle|combine/i
  ];
  
  const hasMultipleInDescription = multipleIndicators.some(pattern => pattern.test(desc));
  
  // Count quick tasks in description (PRIMARY SOURCE)
  const mentionedQuickTasks = quickTaskKeywords.filter(keyword => desc.includes(keyword));
  
  // Count quick tasks in detected items from images (SUPPLEMENTARY ONLY)
  const quickTasksInImages = detectedItems.filter(item => {
    const itemLower = item.toLowerCase();
    return quickTaskKeywords.some(keyword => itemLower.includes(keyword));
  });
  
  // FIXED: Description is primary source of truth
  // Only use image detection if description doesn't specify tasks
  let totalQuickTasks;
  
  if (mentionedQuickTasks.length > 0) {
    // Use description count if it has specific keywords
    totalQuickTasks = mentionedQuickTasks.length;
  } else if (hasMultipleInDescription && quickTasksInImages.length > 0) {
    // If description says "multiple" but no specific keywords, and images show quick tasks
    totalQuickTasks = quickTasksInImages.length;
  } else {
    // Default to 1 task from description
    totalQuickTasks = 1;
  }
  
  // If description has multiple indicators but we only found one task, boost to 2
  if (hasMultipleInDescription && totalQuickTasks === 1 && mentionedQuickTasks.length > 0) {
    totalQuickTasks = 2;
  }
  
  // FOLLOW-UP LOGIC: If this is a follow-up request, add to previous task count
  const isFollowUp = isFollowUpRequest(description);
  let finalTaskCount = totalQuickTasks;
  let isBundledFollowUp = false;
  
  if (isFollowUp && previousTaskInfo && previousTaskInfo.hasEstimate) {
    finalTaskCount = previousTaskInfo.taskCount + totalQuickTasks;
    isBundledFollowUp = true;
  }
  
  const estimatedMinutes = finalTaskCount * 12; // 12 min average per task
  
  const isMultiple = finalTaskCount > 1 || hasMultipleInDescription;
  
  return {
    isMultiple: isMultiple,
    taskCount: Math.max(finalTaskCount, isMultiple ? 2 : 1),
    fitsInServiceCall: estimatedMinutes <= 30,
    estimatedMinutes: estimatedMinutes,
    tasks: [...new Set([...mentionedQuickTasks, ...quickTasksInImages])],
    hasFollowUpIntent: isFollowUp,
    isBundledFollowUp: isBundledFollowUp,
    previousTaskInfo: previousTaskInfo
  };
}

// ========================================
// VAGUENESS DETECTION
// ========================================

function isDescriptionVague(description, imageCount) {
  const desc = description.toLowerCase().trim();
  
  const ultraVaguePatterns = [
    /^help$/i, /^fix$/i, /^broken$/i, /^repair$/i
  ];

  if (ultraVaguePatterns.some(pattern => pattern.test(desc)) && imageCount === 0) {
    return {
      isVague: true,
      reason: 'ultra_vague',
      message: 'Please provide more details'
    };
  }

  if (desc.split(' ').length >= 2 || imageCount > 0) {
    return { isVague: false };
  }

  return {
    isVague: true,
    reason: 'too_short',
    message: 'Please provide more details'
  };
}

function generateSmartQuestions(description, detectedItems, vaguenessReason, serviceContext) {
  const questions = [
    "What specific issue or project do you need help with?",
    "Where is this located? (e.g., kitchen, bathroom, outdoor)",
    "Is this urgent or can it wait a few days?"
  ];
  
  if (detectedItems.length > 0) {
    questions.unshift(`I can see ${detectedItems.slice(0,2).join(', ')} in your photo - which one needs work?`);
  }
  
  return questions.slice(0, 3);
}

// ========================================
// GROQ ANALYSIS WITH ENHANCED MULTI-TASK INTELLIGENCE
// ========================================

async function analyzeWithGroq(description, visionAnnotationsArray = [], serviceContext = null, chatHistory = null) {
  try {
    const allDetectedItems = [];
    
    if (visionAnnotationsArray && visionAnnotationsArray.length > 0) {
      visionAnnotationsArray.forEach((annotations, imageIndex) => {
        if (!annotations || typeof annotations !== 'object') return;
        
        const objects = annotations.localizedObjectAnnotations || [];
        const labels = annotations.labelAnnotations || [];
        
        const imageItems = [
          ...objects.map(obj => obj.name),
          ...labels.map(label => label.description)
        ].filter(Boolean);

        allDetectedItems.push(...imageItems);
      });
    }

    const vaguenessCheck = isDescriptionVague(description, visionAnnotationsArray.length);
    
    if (vaguenessCheck.isVague && allDetectedItems.length === 0) {
      console.log(`Very vague description: ${vaguenessCheck.reason}`);
      
      const clarificationQuestions = generateSmartQuestions(
        description, 
        allDetectedItems, 
        vaguenessCheck.reason,
        serviceContext
      );
      
      const fallbackEstimate = createSmartFallback(description, serviceContext);
      
      return {
        needs_clarification: true,
        clarification_questions: clarificationQuestions,
        ...fallbackEstimate
      };
    }

    // Extract previous task info for follow-up detection
    const previousTaskInfo = extractPreviousTaskInfo(chatHistory);
    
    // ENHANCED: Multi-task analysis with image detection and follow-up bundling
    const multiTaskAnalysis = analyzeMultipleTasks(description, allDetectedItems, previousTaskInfo);
    
    console.log('Multi-task analysis:', {
      isMultiple: multiTaskAnalysis.isMultiple,
      taskCount: multiTaskAnalysis.taskCount,
      fitsInServiceCall: multiTaskAnalysis.fitsInServiceCall,
      estimatedMinutes: multiTaskAnalysis.estimatedMinutes,
      hasFollowUpIntent: multiTaskAnalysis.hasFollowUpIntent,
      isBundledFollowUp: multiTaskAnalysis.isBundledFollowUp,
      detectedItems: allDetectedItems.length
    });

    let chatContext = '';
    if (chatHistory && chatHistory.length > 0) {
      chatContext = '\n\nPREVIOUS CONVERSATION:\n' + chatHistory.map(msg => 
        `${msg.role === 'user' ? 'Customer' : 'AI'}: ${msg.content}`
      ).join('\n');
    }

    const detectedItemsText = allDetectedItems.length > 0 
      ? `DETECTED FROM IMAGES: ${allDetectedItems.slice(0, 15).join(', ')}`
      : `No items detected from images. Base estimate on customer description.`;

    const multiTaskContext = multiTaskAnalysis.isMultiple
      ? `\n\nMULTI-TASK SCENARIO DETECTED:
- ${multiTaskAnalysis.taskCount} quick tasks identified
- Estimated time: ${multiTaskAnalysis.estimatedMinutes} minutes total
- ${multiTaskAnalysis.fitsInServiceCall ? 'ALL FIT IN ONE $60 SERVICE CALL! Bundle pricing applies.' : 'Exceeds 1 hour - may need extended time or multiple visits.'}
- ${multiTaskAnalysis.isBundledFollowUp ? 'FOLLOW-UP REQUEST: Customer is adding tasks to existing work order.' : multiTaskAnalysis.hasFollowUpIntent ? 'Customer is adding tasks to existing quote.' : ''}`
      : '';

    // Lookup service in menu BEFORE building prompt
    const menuLookup = lookupServiceDuration(description);

    const prompt = `You are an expert contractor cost estimator for Cabos Handyman in Cabo San Lucas, Mexico. Analyze this project and provide realistic 2024-2025 pricing in USD.

${isSpanish ? '**IMPORTANTE: El cliente está escribiendo en ESPAÑOL. Debes responder en español en el campo "description".**' : ''}

DESCRIPTION: "${description}"
${detectedItemsText}
${serviceContext ? `SERVICE CONTEXT: ${serviceContext.title}` : ''}
${multiTaskContext}
${chatContext}

=== CRITICAL PRICING RULES - FOLLOW THESE FIRST! ===

**YOUR #1 JOB:** Correctly identify quick tasks vs. standard jobs!

=== CLOG vs DRAIN CLEANING - CRITICAL DISTINCTION ===

**SIMPLE CLOGS (90-95% of cases) - $60 SERVICE CALL ONLY:**

Customer says:
- "My toilet is clogged" / "Toilet backup" / "Toilet won't flush"
- "Sink won't drain" / "Sink clogged"
- "Slow drain" / "Shower drain slow"
- "Tub won't drain"

Response:
- Price: $60 service call covers most clogs
- Time: 30min-1 hour (labor_hours: 0.5-1.0)
- is_quick_task: true
- Tools: Standard plunger, hand snake, basic equipment
- Success rate: 90%+ resolved in first visit

**DO NOT mention "drain cleaning" or "$150-400" for simple clogs!**

Example description for simple clog:
"Most toilet/sink clogs are resolved quickly with our $60 service call, which includes diagnosis and up to 1 hour of work. Our technician will use a plunger or hand snake to clear the blockage. If it's a simple clog (which 90% are), you're all set for just $60 + any parts if needed."

---

**PROFESSIONAL DRAIN CLEANING (5-10% of cases) - $150-400:**

Customer specifically says:
- "Need hydro-jetting" / "Need drain cleaning"
- "Tree roots in pipes" / "Roots blocking sewer"
- "Main sewer line blocked" / "Main line issue"
- "All drains backing up" (multiple drains = main line)
- "Grease buildup in line"
- "Professional drain cleaning service"

OR after simple unclogging fails:
"If the clog is in the main sewer line or requires specialized equipment like hydro-jetting, that would be $150-400 depending on severity. But let's start with the $60 service call - we'll only recommend drain cleaning if absolutely necessary."

---

**DECISION RULES:**

1. "Toilet clogged" → Simple clog → $60 service call (labor_hours: 0.5)
2. "Need drain cleaning" → Professional → $150-400 (labor_hours: 2-4)
3. "Slow drains throughout house" → Might be main line → Start with $60 diagnosis
4. "Toilet clogged for 3rd time" → Recurring → Start with $60, may need inspection

**DEFAULT:** Unless customer specifically asks about drain cleaning, jetting, or main line service, OR multiple drains are backing up simultaneously, assume it's a simple clog covered by $60 service call.

---

**SERVICE MENU REFERENCE FOR THIS REQUEST:**
${menuLookup.found
  ? `✓ FOUND IN OUR SERVICE MENU: "${menuLookup.service}" takes ${menuLookup.duration}
   → Use ${menuLookup.hours} hours as your labor_hours estimate
   → This is our advertised pricing - USE THIS DURATION!`
  : `✗ Not found in service menu - estimate based on similar tasks below`
}

**QUICK TASKS (0.5-1 hour max):**
Examples: Door knobs, door locks, light switches, outlet covers, smoke detectors, picture hanging,
towel bars, toilet seats, cabinet hardware, shower heads, drain unclogging, curtain rods

- These take 15-60 minutes maximum
- Set labor_hours to 0.5, 0.75, or 1.0 (never more!)
- Set is_quick_task to true
- These fall under the $60 service call ONLY
- NO additional labor charges

**STANDARD JOBS (1-4 hours):**
Examples: Faucets, toilets, ceiling fans, vanities, small tile work
- Set labor_hours to realistic estimate (1.5, 2, 2.5, 3, etc.)
- Set is_quick_task to false
- Calculate labor normally using formula below

**REFERENCE OUR SERVICE MENU DURATIONS:**
When estimating, check if the task matches our standard services (menu lookup shown above).
If found in menu, USE THAT DURATION - it's our advertised pricing!

Common menu services:
- Doorknob/door lock: 30min-1hr (0.75hrs)
- Picture hanging: 30min-1hr (0.75hrs)
- Smoke detector: 30min-1hr (0.75hrs)
- Outlet installation: 1 hour
- Toilet/sink/shower clog: 30min-1hr (0.75hrs) ← SIMPLE CLOG = $60!
- Faucet installation: 1-2 hours (1.5hrs)
- Toilet installation: 2-3 hours (2.5hrs)
- Ceiling fan: 2-3 hours (2.5hrs)
- Cabinet installation: 4-8 hours (6hrs)
- Professional drain cleaning: 2-4 hours (3hrs) ← ONLY if customer asks!

---

**TRAINING EXAMPLES - CLOG SCENARIOS:**

Example 1: "My toilet is clogged, help!"
✓ CORRECT Response:
- issue_type: "Toilet Unclogging"
- severity: "High" (emergency)
- labor_hours: 0.5
- is_quick_task: true
- cost_breakdown: { parts_min: 0, parts_max: 0, base_labor_cost: 0 }
- description: "Most toilet clogs are resolved with our $60 service call (includes diagnosis + up to 1 hour). We'll use a plunger or hand snake to clear it. 90% success rate on first visit!"
- DO NOT mention "drain cleaning" or "$150-400"

Example 2: "Kitchen sink won't drain"
✓ CORRECT Response:
- issue_type: "Sink Unclogging"
- labor_hours: 0.75
- is_quick_task: true
- description: "$60 service call covers most sink clogs. Quick fix with standard tools."
- DO NOT mention "drain cleaning"

Example 3: "Need hydro-jetting for my drains"
✓ CORRECT Response:
- issue_type: "Professional Drain Cleaning"
- labor_hours: 3
- is_quick_task: false
- cost_breakdown: { parts_min: 150, parts_max: 400, base_labor_cost: 240 }
- description: "Professional drain cleaning with hydro-jetting runs $150-400 depending on severity and length of line."
- NOW you can mention drain cleaning (they specifically asked!)

Example 4: "All drains in house backing up"
✓ CORRECT Response:
- issue_type: "Main Sewer Line Issue"
- labor_hours: 0.5 (for diagnosis first)
- description: "This sounds like a main sewer line issue. Let's start with our $60 service call to diagnose. If it requires professional drain cleaning, that would be $150-400 additional. We'll know more after inspection."
- Mention both options, but START with $60 diagnosis

Example 5: "Shower drain is slow"
✓ CORRECT Response:
- issue_type: "Drain Unclogging"
- labor_hours: 0.5
- is_quick_task: true
- description: "$60 service call to clear your shower drain. Usually resolved quickly with hand snake."
- DO NOT mention "drain cleaning"

=== NOW APPLY DETAILED PRICING STRUCTURE BELOW ===

**BASE RATE: $60 per hour PER PERSON**
**Service Call: $60 (includes diagnosis + first hour of labor)**

**CALCULATION FORMULA:**
Total Labor = $60 service call + [(Total Hours - 1) × Number of People × $60/hour]

**CREW SIZE BY COMPLEXITY:**

1 PERSON (Quick & Simple - 0.5-3 hours):
- Doorknob/lock replacement (0.75hrs = $60 service call ONLY) ← QUICK!
- Light switch/outlet (1hr = $60 service call ONLY) ← QUICK!
- Picture hanging (0.75hrs = $60 service call ONLY) ← QUICK!
- Drain unclogging (0.75hrs = $60 service call ONLY) ← QUICK!
- Faucet installation (1.5hrs = $90 labor)
- Toilet installation (2.5hrs = $150 labor)
- Small repairs (varies)

1-2 PEOPLE (Medium tasks - 2-6 hours):
- Cabinet installation (6hrs, 2 people = $660 labor)
- Vanity installation (4hrs, 1 person = $240 labor)
- Ceiling fan installation (2hrs, 1 person = $120 labor)
- Small tile work (4hrs, 1 person = $240 labor)
- Painting single room
- Appliance installation

2-3 PEOPLE (Complex tasks - 4+ hours or heavy):
- Full kitchen remodel (20hrs, 2 people = $2,340 labor)
- Full bathroom remodel (16hrs, 2 people = $1,860 labor)
- Large tile jobs (12hrs, 2 people = $1,380 labor)
- Deck construction
- Major renovations

**EXAMPLES:**
- Toilet replacement (2 hours, 1 person): $60 + (1 × 1 × $60) = $120 labor
- Cabinet install (6 hours, 2 people): $60 + (5 × 2 × $60) = $660 labor
- Ceiling fan (2 hours, 1 person): $60 + (1 × 1 × $60) = $120 labor
- 1-hour faucet install (1 person): $60 service call only (first hour included)

=== MATERIALS PRICING REFERENCE ===
Use these approximate prices to calculate total costs (labor + materials):

PLUMBING MATERIALS:
Toilets: Basic $150-250 | Mid-range $250-400 | Premium $400-700 | + Install $200
Kitchen Sinks: Stainless $150-300 | Double $250-450 | Farmhouse $400-800 | + Install $180
Faucets: Basic $80-150 | Mid-range $150-300 | Pull-down $200-400 | + Install $120
Disposals: 1/3 HP $120-180 | 1/2 HP $180-280 | 3/4 HP $280-450 | + Install $200
Vanities: 24" $300-500 | 36" $500-900 | 48" $800-1,500 | + Install $280
Water Heaters: 40-gal $400-600 | 50-gal gas $500-800 | Tankless $800-2,500 | + Install $500

ELECTRICAL MATERIALS:
Ceiling Fans: Basic $100-200 | With light $200-400 | Premium $400-700 | + Install $180
Light Fixtures: Basic $50-120 | Pendants $150-400 | Chandelier $200-1,000 | + Install $120
Outlets: Standard $3-8 | GFCI $15-30 | USB $20-40 | + Install $90

KITCHEN/BATHROOM:
Cabinets: Stock $100-200/lf | Semi-custom $200-400/lf | Custom $400-800/lf | + Install $300
Countertops: Laminate $20-40/sqft | Granite $50-100/sqft | Quartz $70-150/sqft | + Install $400
Tile: Ceramic $3-8/sqft | Porcelain $5-12/sqft | Stone $10-25/sqft | + Install $12/sqft

ALWAYS include materials in cost_breakdown when applicable!

=== CUSTOMER REVIEWS (Use for trust building) ===
When providing estimates, you can reference these verified reviews:

"Gabriela S. said: 'Unclogged our drain, fixed a leaky faucet, and installed a new toilet - all in one appointment. Super efficient!'"
"Tom & Jennifer K. from Palmilla: 'Honest pricing, no hidden fees. They told us exactly what needed to be done and what could wait.'"
"David W., California vacation home owner: 'They send photos of completed work and bills are always accurate.'"

Use these naturally in your description when relevant (e.g., "Many customers like Gabriela have appreciated our efficiency with multi-service appointments").

CRITICAL PRICING RULES:

1. **QUICK TASKS (under 1 hour):** Door knobs, toilet seats, light switches, cabinet hardware, smoke detector batteries, etc.
   - Set labor_hours to 1.0 and base_labor_cost to 0
   - These fall under the $60 service call

2. **MULTIPLE QUICK TASKS:** If ${multiTaskAnalysis.taskCount} quick tasks are detected and fit in 1 hour total:
   - They ALL fall under ONE $60 service call
   - Only materials are additional
   - Set is_multi_task to true
   - Emphasize VALUE of bundling vs separate visits

3. **FOLLOW-UP BUNDLING:** If this is a follow-up request adding tasks to an existing work order:
   - ALL tasks still fit under the SAME $60 service call
   - Do NOT charge an additional $60 service call fee
   - Only charge for new materials
   - Emphasize convenience and savings of bundling

4. **BIGGER JOBS (over 1 hour):** Calculate normal labor at $60/hour PER PERSON + $60 service call overhead
   - Formula: Labor = (Hours - 1) × People × $60/hour + $60 service call
   - Example: 2 hours, 1 person = (2 - 1) × 1 × $60 + $60 = $60 + $60 = $120 total labor

5. **PRIORITY:** Customer description is PRIMARY. Image detection is supplementary.

Respond ONLY with valid JSON (no markdown):
{
  "issue_type": "specific category",
  "severity": "High/Medium/Low",
  "description": "detailed analysis mentioning if multiple tasks detected",
  "required_parts": [{"name": "part name", "quantity": 1, "estimated_cost": 100}],
  "difficulty_level": "Professional/Expert Required/Skilled Handyperson",
  "crew_size": 1,
  "crew_justification": "why this crew size",
  "labor_hours": 2,
  "is_quick_task": false,
  "is_multi_task": false,
  "task_count": 1,
  "cost_breakdown": {
    "parts_min": 50,
    "parts_max": 200,
    "base_labor_cost": 150
  }
}`;

    console.log('Calling Groq API...');

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are an expert contractor cost estimator. TOP PRIORITIES: (1) CRITICAL: Differentiate simple clogs ($60 service call) from professional drain cleaning ($150-400). Simple clogs = toilet clogs, sink clogs, shower drains - these are $60 with labor_hours=0.5-1.0. Only mention drain cleaning if customer asks about jetting, main line, tree roots, or ALL drains backing up. (2) Correctly identify quick tasks like doorknobs, switches, picture hanging - labor_hours=0.5-1.0 and is_quick_task=true. Reference service menu durations. Most clogs = $60, NOT drain cleaning! Respond with ONLY valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1500,
        response_format: { type: "json_object" }
      })
    });

    if (!groqResponse.ok) {
      console.error('Groq API Error:', groqResponse.status);
      throw new Error(`Groq API failed: ${groqResponse.status}`);
    }

    const groqData = await groqResponse.json();
    const groqContent = groqData.choices[0]?.message?.content;

    if (!groqContent) {
      throw new Error('No content from Groq API');
    }

    let groqAnalysis;
    try {
      const cleanedContent = groqContent.replace(/```json\n?|\n?```/g, '').trim();
      groqAnalysis = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      throw new Error('Invalid JSON from Groq');
    }

    // ========================================
    // INTELLIGENT COST CALCULATION WITH MULTI-TASK LOGIC + SERVICE MENU REFERENCE
    // ========================================

    const issueType = groqAnalysis.issue_type || 'Maintenance Issue';
    const crewSize = Math.max(1, groqAnalysis.crew_size || 1);

    // FIX #2: Changed default from 2 to 1 hour, and prioritize menu lookup
    const laborHours = groqAnalysis.labor_hours || menuLookup.hours || 1;

    // FIX #5: Prioritize local detection and menu lookup over AI
    const localQuickDetection = isQuickTask(description, issueType);
    const isMenuQuick = menuLookup.found && menuLookup.hours <= 1;

    const isQuick = localQuickDetection || isMenuQuick || groqAnalysis.is_quick_task || multiTaskAnalysis.fitsInServiceCall;
    const isMulti = (groqAnalysis.is_multi_task || multiTaskAnalysis.isMultiple) && multiTaskAnalysis.fitsInServiceCall;
    const taskCount = isMulti ? multiTaskAnalysis.taskCount : (groqAnalysis.task_count || 1);

    console.log('Labor calculation:', {
      description: description.substring(0, 50),
      menuFound: menuLookup.found,
      menuHours: menuLookup.hours,
      groqHours: groqAnalysis.labor_hours,
      finalHours: laborHours,
      localQuickDetect: localQuickDetection,
      isMenuQuick: isMenuQuick,
      finalIsQuick: isQuick
    });
    
    let costEstimate;
    
    if (isQuick || isMulti) {
      // QUICK TASK(S) - Falls under $60 service call
      const partsMin = groqAnalysis.cost_breakdown?.parts_min || (taskCount * 10);
      const partsMax = groqAnalysis.cost_breakdown?.parts_max || (taskCount * 60);

      let pricingNote;

      if (multiTaskAnalysis.isBundledFollowUp) {
        // Follow-up request bundling
        pricingNote = `Perfect! Adding ${groqAnalysis.description || 'this task'} to your existing work order. Since all ${taskCount} tasks fit in one visit and take about ${multiTaskAnalysis.estimatedMinutes} minutes total, you still only pay the $60 service call + materials. No additional service fee!`;
      } else if (isMulti) {
        pricingNote = multiTaskAnalysis.hasFollowUpIntent
          ? `Perfect! Both/All ${taskCount} of these tasks fit into ONE $60 service call (includes diagnosis + first full hour of work). Since they take about ${multiTaskAnalysis.estimatedMinutes} minutes combined, you'll only pay the $60 service call + materials. Adding tasks to the same visit saves you money!`
          : `Excellent news! All ${taskCount} of these are quick tasks that fit into our $60 service call (includes diagnosis + first full hour of work). Since they take about ${multiTaskAnalysis.estimatedMinutes} minutes combined, you'll only pay the $60 service call + materials. This is MUCH better value than doing them separately!`;
      } else {
        pricingNote = `Great news! This is a quick task that falls under our $60 service call, which includes diagnosis and the first full hour of work. Only materials are additional.`;
      }

      costEstimate = {
        service_call_fee: 60,
        parts_cost: {
          min: partsMin,
          max: partsMax
        },
        labor_hours: 1.0,
        crew_size: 1,
        crew_justification: isMulti
          ? `Multiple quick tasks - 1 person can handle all ${taskCount} efficiently`
          : 'Quick task - 1 person can handle',
        disposal_cost: 0,
        total_cost: {
          min: 60 + partsMin,
          max: 60 + partsMax
        },
        pricing_note: pricingNote,
        is_multi_task: isMulti,
        task_count: taskCount,
        is_bundled_followup: multiTaskAnalysis.isBundledFollowUp,
        value_message: isMulti && !multiTaskAnalysis.isBundledFollowUp ? `You save $${(taskCount - 1) * 60} by bundling vs ${taskCount} separate $60 service calls!` : null
      };
    } else {
      
      // BIGGER JOB - Standard pricing
      const baseLaborCost = groqAnalysis.cost_breakdown?.base_labor_cost || 150;
      const laborRate = 60; // $60 per hour per person (CORRECT RATE)
      const serviceCallFee = 60; // Includes first full hour

      // CRITICAL: Subtract first full hour (included in service call) before calculating additional labor
      const additionalHours = Math.max(0, laborHours - 1);
      const calculatedLabor = serviceCallFee + (additionalHours * laborRate * crewSize);
      const totalLaborWithOverhead = Math.max(baseLaborCost * crewSize, calculatedLabor);

      let disposalCost = 0;
      if (issueType.includes('Demolition')) disposalCost = 350;
      else if (issueType.includes('Water Damage')) disposalCost = 180;
      else if (issueType.includes('Kitchen') || issueType.includes('Bathroom')) disposalCost = 120;

      const partsMin = groqAnalysis.cost_breakdown?.parts_min || 50;
      const partsMax = groqAnalysis.cost_breakdown?.parts_max || 200;

      costEstimate = {
        service_call_fee: serviceCallFee,
        parts_cost: {
          min: partsMin,
          max: partsMax
        },
        labor_cost: totalLaborWithOverhead,
        labor_hours: laborHours,
        crew_size: crewSize,
        crew_justification: groqAnalysis.crew_justification || `${crewSize} person job`,
        disposal_cost: disposalCost,
        total_cost: {
          min: partsMin + totalLaborWithOverhead + disposalCost,
          max: partsMax + totalLaborWithOverhead + disposalCost
        },
        pricing_note: `$60 service call includes diagnosis + first full hour of work. If you approve, it applies to your total. You only pay for actual hours worked - finish early and you save!`,
        is_multi_task: false,
        task_count: 1,
        value_message: null
      };
    }

    console.log('Analysis complete:', {
      type: isQuick || isMulti ? `Quick Task${isMulti ? 's' : ''}` : 'Standard Job',
      taskCount: taskCount,
      isBundledFollowUp: multiTaskAnalysis.isBundledFollowUp,
      total: `$${costEstimate.total_cost.min}-$${costEstimate.total_cost.max}`
    });

    return {
      needs_clarification: false,
      analysis: {
        issue_type: issueType,
        severity: groqAnalysis.severity || 'Medium',
        description: groqAnalysis.description || description,
        required_parts: groqAnalysis.required_parts || [],
        difficulty_level: groqAnalysis.difficulty_level || 'Professional',
        crew_size: crewSize,
        crew_justification: groqAnalysis.crew_justification || `${crewSize} person job`,
        is_quick_task: isQuick || isMulti,
        is_multi_task: isMulti,
        task_count: taskCount,
        is_bundled_followup: multiTaskAnalysis.isBundledFollowUp,
        detected_items: allDetectedItems.length > 0 ? allDetectedItems.slice(0, 10) : []
      },
      cost_estimate: costEstimate,
      pricing: [],
      stores: getDefaultStores()
    };

  } catch (error) {
    console.error('Groq error:', error.message);
    return createSmartFallback(description, serviceContext);
  }
}

// ========================================
// SMART FALLBACK ESTIMATOR
// ========================================

function createSmartFallback(description, serviceContext) {
  const desc = description.toLowerCase();

  // Check service menu first
  const menuLookup = lookupServiceDuration(description);

  let issueType = 'General Maintenance';
  let severity = 'Medium';
  let partsMin = 100;
  let partsMax = 300;
  let laborHours = menuLookup.hours || 1; // FIX #2: Changed default from 2 to 1, prioritize menu
  let crewSize = 1;
  let disposalCost = 0;
  let isQuick = menuLookup.found && menuLookup.hours <= 1;

  // Quick tasks
  if (desc.includes('door knob') || desc.includes('door handle')) {
    issueType = 'Door Hardware Replacement';
    partsMin = 20;
    partsMax = 80;
    laborHours = 1.0;
    severity = 'Low';
    isQuick = true;
  }
  else if (desc.includes('toilet seat')) {
    issueType = 'Toilet Seat Replacement';
    partsMin = 25;
    partsMax = 60;
    laborHours = 1.0;
    severity = 'Low';
    isQuick = true;
  }
  else if (desc.includes('flush') || desc.includes('flapper')) {
    issueType = 'Toilet Flush Valve/Flapper Replacement';
    partsMin = 15;
    partsMax = 50;
    laborHours = 1.0;
    severity = 'Low';
    isQuick = true;
  }
  else if (desc.includes('light switch') || desc.includes('outlet cover')) {
    issueType = 'Switch/Outlet Cover Replacement';
    partsMin = 5;
    partsMax = 25;
    laborHours = 1.0;
    severity = 'Low';
    isQuick = true;
  }
  else if (desc.includes('smoke detector') && desc.includes('battery')) {
    issueType = 'Smoke Detector Battery Replacement';
    partsMin = 5;
    partsMax = 15;
    laborHours = 1.0;
    severity = 'Low';
    isQuick = true;
  }
  // Standard jobs
  else if (desc.includes('toilet') && !isQuick) {
    issueType = 'Toilet Repair';
    partsMin = 50;
    partsMax = 150;
    laborHours = 1.5;
  }
  else if (desc.includes('pipe') || desc.includes('plumb') || desc.includes('leak')) {
    issueType = 'Plumbing Repair';
    partsMin = 80;
    partsMax = 250;
    laborHours = 2;
    severity = 'High';
  }
  else if (desc.includes('electrical') || desc.includes('outlet') || desc.includes('switch')) {
    issueType = 'Electrical Repair';
    partsMin = 40;
    partsMax = 150;
    laborHours = 1.5;
    severity = 'High';
  }
  else if (desc.includes('faucet') || desc.includes('tap')) {
    issueType = 'Faucet Repair';
    partsMin = 60;
    partsMax = 180;
    laborHours = 1.5;
  }

  let costEstimate;
  
  if (isQuick) {
    costEstimate = {
      service_call_fee: 60,
      parts_cost: { min: partsMin, max: partsMax },
      labor_cost: 0,
      labor_hours: 1.0,
      crew_size: 1,
      crew_justification: 'Quick task - 1 person',
      disposal_cost: 0,
      total_cost: {
        min: 60 + partsMin,
        max: 60 + partsMax
      },
      pricing_note: `Great news! This is a quick task that falls under our $60 service call (includes diagnosis + first full hour). Only materials are additional!`
    };
  } else {
    // CRITICAL: Subtract first full hour (included in $60 service call) before calculating additional labor
    const additionalHours = Math.max(0, laborHours - 1);
    const laborCost = 60 + (additionalHours * 60 * crewSize); // $60 service call + additional hours
    costEstimate = {
      service_call_fee: 60,
      parts_cost: { min: partsMin, max: partsMax },
      labor_cost: laborCost,
      labor_hours: laborHours,
      crew_size: crewSize,
      crew_justification: 'Standard repair',
      disposal_cost: disposalCost,
      total_cost: {
        min: partsMin + laborCost + disposalCost,
        max: partsMax + laborCost + disposalCost
      },
      pricing_note: `$60 service call includes diagnosis + first full hour. You pay actual hours only - finish early and save!`
    };
  }
  
  return {
    needs_clarification: false,
    analysis: {
      issue_type: issueType,
      severity: severity,
      description: `Based on: "${description}". Professional assessment recommended.`,
      required_parts: [
        { name: `${issueType} materials`, quantity: 1, estimated_cost: (partsMin + partsMax) / 2 }
      ],
      difficulty_level: severity === 'High' ? 'Expert Required' : 'Professional',
      crew_size: crewSize,
      crew_justification: 'Standard repair',
      is_quick_task: isQuick
    },
    cost_estimate: costEstimate,
    pricing: [],
    stores: getDefaultStores()
  };
}

function getDefaultStores() {
  return [
    {
      name: "The Home Depot Cabo San Lucas",
      address: "Carr. Transpeninsular Km 4.5, Cabo San Lucas, B.C.S. 23410",
      rating: 4.3
    },
    {
      name: "Construrama Cabo",
      address: "Blvd. Lázaro Cárdenas, Cabo San Lucas, B.C.S.",
      rating: 4.1
    }
  ];
}

// ========================================
// MAIN HANDLER
// ========================================

export default async function handler(req, res) {
  if (!checkOrigin(req, res)) return;
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limit: 5 requests per hour per IP (each request = 2 paid API calls)
  const ip = getClientIp(req);
  if (!rateLimit(ip, 5, 60 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.', success: false });
  }

  const startTime = Date.now();

  try {
    const { images, description, location, service_context, chat_history } = req.body;

    if (!images || images.length === 0) {
      return res.status(400).json({ error: 'At least one image is required', success: false });
    }

    if (images.length > MAX_IMAGE_COUNT) {
      return res.status(400).json({ error: `Maximum ${MAX_IMAGE_COUNT} images allowed per request`, success: false });
    }

    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      return res.status(400).json({ error: 'Description is required', success: false });
    }

    if (description.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({ error: 'Description too long', success: false });
    }

    // ========================================
    // CRITICAL CHECKS: SERVICE AREA & EMERGENCY
    // ========================================

    // Detect language
    const isSpanish = detectSpanish(description);

    // Check service area (Cabo San Lucas only)
    const serviceAreaCheck = checkServiceArea(description);
    if (serviceAreaCheck.isOutsideServiceArea) {
      const message = isSpanish
        ? "Lo sentimos, solo damos servicio en Cabo San Lucas y áreas inmediatas circundantes. No prestamos servicios en San José del Cabo, Corredor, ni East Cape. Esto nos permite proporcionar el mejor servicio y los tiempos de respuesta más rápidos."
        : "We focus our services exclusively on Cabo San Lucas and immediate surrounding areas. We do not service San José del Cabo, Los Cabos Corridor, or East Cape. This allows us to provide the best possible service and fastest response times.";

      return res.status(200).json({
        success: true,
        needs_clarification: false,
        analysis: {
          issue_type: 'Service Area',
          severity: 'Info',
          description: message,
          required_parts: [],
          difficulty_level: 'N/A',
          crew_size: 0,
          is_quick_task: false
        },
        cost_estimate: null,
        pricing: [],
        stores: []
      });
    }

    // Check for emergency
    const isEmergency = detectEmergency(description);
    if (isEmergency) {
      const message = isSpanish
        ? "🚨 ¡Esto suena como una emergencia! Por favor llámenos AHORA MISMO al +52 612 169 8328 para asistencia inmediata. Tenemos un tiempo de respuesta de 30 minutos y estamos disponibles 24/7. ¡No espere - llame ahora!"
        : "🚨 This sounds like an emergency! Please call us RIGHT NOW at +52 612 169 8328 for immediate assistance. We have a 30-minute response time and are available 24/7. Don't wait - call now!";

      return res.status(200).json({
        success: true,
        needs_clarification: false,
        is_emergency: true,
        analysis: {
          issue_type: 'Emergency',
          severity: 'Critical',
          description: message,
          required_parts: [],
          difficulty_level: 'Professional',
          crew_size: 1,
          is_quick_task: false
        },
        cost_estimate: {
          service_call_fee: 60,
          emergency_note: isSpanish
            ? "Servicio de emergencia 24/7 disponible - misma tarifa día y noche"
            : "24/7 emergency service available - same rates day and night"
        },
        pricing: [],
        stores: []
      });
    }

    // Validate image format
    for (let i = 0; i < images.length; i++) {
      if (!images[i] || typeof images[i] !== 'string') {
        return res.status(400).json({
          error: `Invalid image ${i + 1}: not a string`,
          success: false
        });
      }
      
      if (!images[i].startsWith('data:image/')) {
        return res.status(400).json({
          error: `Invalid image ${i + 1}: missing data URI prefix`,
          success: false
        });
      }
      
      const formatMatch = images[i].match(/^data:image\/(\w+);base64,/);
      if (!formatMatch) {
        return res.status(400).json({
          error: `Invalid image ${i + 1}: malformed data URI`,
          success: false
        });
      }
      
      const format = formatMatch[1].toLowerCase();
      const supportedFormats = ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp'];
      if (!supportedFormats.includes(format)) {
        return res.status(400).json({
          error: `Invalid image ${i + 1}: unsupported format '${format}'. Use JPEG, PNG, GIF, BMP, or WEBP.`,
          success: false
        });
      }
    }

    console.log('Processing:', {
      images: images.length,
      description: description.substring(0, 50),
      imageSizes: images.map(img => `${Math.round(img.length * 0.75 / 1024)}KB`)
    });

    // Process images with error handling
    const visionAnnotations = [];
    let visionErrors = 0;
    
    for (let i = 0; i < images.length; i++) {
      try {
        let imageBase64 = images[i];
        
        if (imageBase64.includes('base64,')) {
          imageBase64 = imageBase64.split('base64,')[1];
        } else if (imageBase64.startsWith('data:')) {
          console.error(`Image ${i + 1}: Invalid data URI format`);
          visionErrors++;
          continue;
        }
        
        if (!imageBase64 || imageBase64.length < 100) {
          console.error(`Image ${i + 1}: Base64 string too short or empty`);
          visionErrors++;
          continue;
        }
        
        console.log(`Processing image ${i + 1}/${images.length} (${Math.round(imageBase64.length * 0.75 / 1024)}KB)...`);
        
        const visionResponse = await fetch(
          `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_CLOUD_VISION_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              requests: [{
                image: { content: imageBase64 },
                features: [
                  { type: 'LABEL_DETECTION', maxResults: 10 },
                  { type: 'OBJECT_LOCALIZATION', maxResults: 10 },
                  { type: 'TEXT_DETECTION', maxResults: 5 }
                ]
              }]
            }),
            signal: AbortSignal.timeout(15000)
          }
        );

        if (visionResponse.ok) {
          const visionData = await visionResponse.json();
          
          if (visionData.responses && visionData.responses[0]) {
            if (visionData.responses[0].error) {
              console.error(`Vision API error for image ${i + 1}:`, visionData.responses[0].error);
              visionErrors++;
            } else {
              visionAnnotations.push(visionData.responses[0]);
              console.log(`Image ${i + 1} processed successfully`);
            }
          }
        } else {
          const errorText = await visionResponse.text().catch(() => 'Unknown error');
          console.error(`Vision API HTTP ${visionResponse.status} for image ${i + 1}:`, errorText);
          visionErrors++;
        }
      } catch (visionError) {
        console.error(`Error processing image ${i + 1}:`, visionError.message);
        visionErrors++;
      }
    }

    console.log(`Vision: ${visionAnnotations.length} success, ${visionErrors} errors`);

    const analysis = await analyzeWithGroq(
      description,
      visionAnnotations,
      service_context,
      chat_history
    );

    const processingTime = Date.now() - startTime;
    console.log(`Total: ${processingTime}ms`);

    return res.status(200).json({
      success: true,
      processing_time_ms: processingTime,
      vision_success_count: visionAnnotations.length,
      vision_error_count: visionErrors,
      vision_note: visionAnnotations.length === 0 ? 'Estimate based on description only - image analysis unavailable' : null,
      ...analysis
    });

  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('Handler error:', error.message);

    const emergencyFallback = createSmartFallback(
      req.body.description || 'Maintenance issue',
      req.body.service_context
    );

    return res.status(200).json({
      success: false,
      error: 'Analysis completed with limited information',
      processing_time_ms: processingTime,
      ...emergencyFallback
    });
  }
}