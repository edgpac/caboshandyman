// api/analyze-parts.js - ULTRA-INTELLIGENT MULTI-TASK IMAGE ANALYSIS v3
// Full parity with feedback-chat.js + Enhanced image detection + Smart bundling
// FIXED: Description is now primary source of truth for task count
// FIXED: Follow-up requests now properly bundle with previous tasks

export const config = {
  maxDuration: 60,
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

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
  'range hood light', 'hood bulb', 'dryer lint trap',
  'washer hose', 'washer filter', 'appliance foot', 'appliance leveling leg',
  
  // OUTDOOR & EXTERIOR (under 30 min)
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
  'sliding door lock', 'patio door lock', 'pin lock',
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
- ${multiTaskAnalysis.fitsInServiceCall ? 'ALL FIT IN ONE $60 SERVICE CALL! Bundle pricing applies.' : 'Exceeds 30 min - may need extended time or multiple visits.'}
- ${multiTaskAnalysis.isBundledFollowUp ? 'FOLLOW-UP REQUEST: Customer is adding tasks to existing work order.' : multiTaskAnalysis.hasFollowUpIntent ? 'Customer is adding tasks to existing quote.' : ''}`
      : '';

    const prompt = `You are an expert contractor cost estimator for Cabos Handyman in Cabo San Lucas, Mexico. Analyze this project and provide realistic 2024-2025 pricing in USD.

${isSpanish ? '**IMPORTANTE: El cliente está escribiendo en ESPAÑOL. Debes responder en español en el campo "description".**' : ''}

DESCRIPTION: "${description}"
${detectedItemsText}
${serviceContext ? `SERVICE CONTEXT: ${serviceContext.title}` : ''}
${multiTaskContext}
${chatContext}

=== LABOR PRICING STRUCTURE ===
**BASE RATE: $60 per hour PER PERSON**

SERVICE CALL: $60 (includes first 30 minutes + diagnosis)
ADDITIONAL LABOR: $60/hour per person for time beyond 30 minutes

**CALCULATION FORMULA:**
Total Labor = $60 service call + [(Total Hours - 0.5) × Number of People × $60/hour]

**CREW SIZE BY COMPLEXITY:**

1 PERSON (Simple tasks - 30min to 3 hours):
- Toilet repair/replacement (2hrs = $150 labor)
- Faucet installation (1.5hrs = $120 labor)
- Light fixture installation (1hr = $90 labor)
- Outlet/switch work (1hr = $90 labor)
- Picture hanging, small repairs
- Drain cleaning

1-2 PEOPLE (Medium tasks - 2-6 hours):
- Cabinet installation (6hrs, 2 people = $720 labor)
- Vanity installation (4hrs, 1 person = $270 labor)
- Ceiling fan installation (2hrs, 1 person = $150 labor)
- Small tile work (4hrs, 1 person = $270 labor)
- Painting single room
- Appliance installation

2-3 PEOPLE (Complex tasks - 4+ hours or heavy):
- Full kitchen remodel (20hrs, 2 people = $2,460 labor)
- Full bathroom remodel (16hrs, 2 people = $1,920 labor)
- Large tile jobs (12hrs, 2 people = $1,440 labor)
- Deck construction
- Major renovations

**EXAMPLES:**
- Toilet replacement (2 hours, 1 person): $60 + (1.5 × 1 × $60) = $150 labor
- Cabinet install (6 hours, 2 people): $60 + (5.5 × 2 × $60) = $720 labor
- Ceiling fan (2 hours, 1 person): $60 + (1.5 × 1 × $60) = $150 labor
- Quick faucet (30 min, 1 person): $60 service call only (no additional labor)

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

1. **QUICK TASKS (under 30 min):** Door knobs, toilet seats, light switches, cabinet hardware, smoke detector batteries, etc.
   - Set labor_hours to 0.5 and base_labor_cost to 0
   - These fall under the $60 service call

2. **MULTIPLE QUICK TASKS:** If ${multiTaskAnalysis.taskCount} quick tasks are detected and fit in 30 minutes total:
   - They ALL fall under ONE $60 service call
   - Only materials are additional
   - Set is_multi_task to true
   - Emphasize VALUE of bundling vs separate visits

3. **FOLLOW-UP BUNDLING:** If this is a follow-up request adding tasks to an existing work order:
   - ALL tasks still fit under the SAME $60 service call
   - Do NOT charge an additional $60 service call fee
   - Only charge for new materials
   - Emphasize convenience and savings of bundling

4. **BIGGER JOBS (over 30 minutes):** Calculate normal labor at $60/hour PER PERSON + $60 service call overhead
   - Formula: Labor = (Hours - 0.5) × People × $60/hour + $60 service call
   - Example: 2 hours, 1 person = (2 - 0.5) × 1 × $60 + $60 = $90 + $60 = $150 total labor

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
            content: 'You are an expert contractor cost estimator. Respond with ONLY valid JSON. Detect quick tasks (under 30 min) and multi-task scenarios accurately. Multiple quick tasks under 30 min total = ONE $60 service call + materials only. Follow-up requests that add tasks to existing work orders still use the same $60 service call - do not charge twice.'
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
    // INTELLIGENT COST CALCULATION WITH MULTI-TASK LOGIC
    // ========================================
    
    const issueType = groqAnalysis.issue_type || 'Maintenance Issue';
    const crewSize = Math.max(1, groqAnalysis.crew_size || 1);
    const laborHours = groqAnalysis.labor_hours || 2;
    
    // Check if quick task (from Groq, our detection, OR multi-task analysis)
    const isQuick = groqAnalysis.is_quick_task || isQuickTask(description, issueType) || multiTaskAnalysis.fitsInServiceCall;
    const isMulti = (groqAnalysis.is_multi_task || multiTaskAnalysis.isMultiple) && multiTaskAnalysis.fitsInServiceCall;
    const taskCount = isMulti ? multiTaskAnalysis.taskCount : (groqAnalysis.task_count || 1);
    
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
          ? `Perfect! Both/All ${taskCount} of these tasks fit into ONE $60 service call (includes diagnosis + first 30 minutes of work). Since they take about ${multiTaskAnalysis.estimatedMinutes} minutes combined, you'll only pay the $60 service call + materials. Adding tasks to the same visit saves you money!`
          : `Excellent news! All ${taskCount} of these are quick tasks that fit into our $60 service call (includes diagnosis + first 30 minutes of work). Since they take about ${multiTaskAnalysis.estimatedMinutes} minutes combined, you'll only pay the $60 service call + materials. This is MUCH better value than doing them separately!`;
      } else {
        pricingNote = `Great news! This is a quick task that falls under our $60 service call, which includes diagnosis and the first 30 minutes of work. Only materials are additional.`;
      }

      costEstimate = {
        service_call_fee: 60,
        parts_cost: {
          min: partsMin,
          max: partsMax
        },
        labor_hours: 0.5,
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

      const finalLaborCost = Math.max(baseLaborCost * crewSize, laborHours * laborRate * crewSize);
      const serviceCallFee = 60;
      const totalLaborWithOverhead = finalLaborCost + serviceCallFee;

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
        pricing_note: `$60 service call includes diagnosis + first 30 minutes of work. If you approve, it applies to your total. You only pay for actual hours worked - finish early and you save!`,
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
  let issueType = 'General Maintenance';
  let severity = 'Medium';
  let partsMin = 100;
  let partsMax = 300;
  let laborHours = 2;
  let crewSize = 1;
  let disposalCost = 0;
  let isQuick = false;

  // Quick tasks
  if (desc.includes('door knob') || desc.includes('door handle')) {
    issueType = 'Door Hardware Replacement';
    partsMin = 20;
    partsMax = 80;
    laborHours = 0.5;
    severity = 'Low';
    isQuick = true;
  }
  else if (desc.includes('toilet seat')) {
    issueType = 'Toilet Seat Replacement';
    partsMin = 25;
    partsMax = 60;
    laborHours = 0.5;
    severity = 'Low';
    isQuick = true;
  }
  else if (desc.includes('flush') || desc.includes('flapper')) {
    issueType = 'Toilet Flush Valve/Flapper Replacement';
    partsMin = 15;
    partsMax = 50;
    laborHours = 0.5;
    severity = 'Low';
    isQuick = true;
  }
  else if (desc.includes('light switch') || desc.includes('outlet cover')) {
    issueType = 'Switch/Outlet Cover Replacement';
    partsMin = 5;
    partsMax = 25;
    laborHours = 0.5;
    severity = 'Low';
    isQuick = true;
  }
  else if (desc.includes('smoke detector') && desc.includes('battery')) {
    issueType = 'Smoke Detector Battery Replacement';
    partsMin = 5;
    partsMax = 15;
    laborHours = 0.5;
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
      labor_hours: 0.5,
      crew_size: 1,
      crew_justification: 'Quick task - 1 person',
      disposal_cost: 0,
      total_cost: {
        min: 60 + partsMin,
        max: 60 + partsMax
      },
      pricing_note: `Great news! This is a quick task that falls under our $60 service call (includes diagnosis + first 30 min). Only materials are additional!`
    };
  } else {
    const laborCost = (laborHours * 60 * crewSize) + 60; // $60/hour per person (CORRECT RATE)
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
      pricing_note: `$60 service call includes diagnosis + first 30 min. You pay actual hours only - finish early and save!`
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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const startTime = Date.now();

  try {
    const { images, description, location, service_context, chat_history } = req.body;

    if (!images || images.length === 0) {
      return res.status(400).json({ 
        error: 'At least one image is required',
        success: false 
      });
    }

    if (!description || description.trim().length === 0) {
      return res.status(400).json({
        error: 'Description is required',
        success: false
      });
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