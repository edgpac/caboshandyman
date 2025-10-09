// Add these helper functions BEFORE analyzeWithGroq

// Check if description is too vague to provide accurate estimate
function isDescriptionVague(description, imageCount) {
  const desc = description.toLowerCase().trim();
  
  // Ultra-vague phrases that ALWAYS need clarification
  const ultraVaguePatterns = [
    /^help$/i,
    /^i need help$/i,
    /^fix this$/i,
    /^fix it$/i,
    /^broken$/i,
    /^repair$/i,
    /^fix$/i,
    /^this$/i,
    /^look$/i,
    /^check$/i,
    /^what about this$/i,
    /^can you help$/i,
    /^need help$/i,
    /^please help$/i
  ];

  // Check ultra-vague patterns first
  if (ultraVaguePatterns.some(pattern => pattern.test(desc))) {
    return {
      isVague: true,
      reason: 'ultra_vague',
      message: 'The description is too brief to provide an accurate estimate'
    };
  }

  // Vague single-word descriptions
  const vagueSingleWords = [
    'leaking', 'leak', 'damaged', 'damage', 'issue', 'problem', 
    'question', 'estimate', 'quote', 'price', 'cost', 'install',
    'replace', 'renovation', 'remodel', 'upgrade'
  ];

  if (desc.split(' ').length <= 2 && vagueSingleWords.includes(desc)) {
    return {
      isVague: true,
      reason: 'single_word',
      message: 'Single-word description needs more context'
    };
  }

  // Short descriptions without specifics (less than 15 characters or 3 words)
  if (desc.length < 15 || desc.split(' ').length < 3) {
    return {
      isVague: true,
      reason: 'too_short',
      message: 'Description is too short to determine scope of work'
    };
  }

  // Missing critical location details
  const hasLocationWords = ['in', 'under', 'behind', 'above', 'near', 'at', 'on'];
  const hasRoomWords = ['kitchen', 'bathroom', 'bedroom', 'garage', 'outdoor', 'living room', 'basement'];
  const mentionsLocation = hasLocationWords.some(word => desc.includes(word)) || 
                          hasRoomWords.some(word => desc.includes(word));

  // Generic descriptions without location
  const genericPhrases = [
    'broken pipe', 'leaking pipe', 'water leak', 'electrical issue',
    'not working', 'need repair', 'need fix', 'needs work'
  ];

  if (genericPhrases.some(phrase => desc.includes(phrase)) && !mentionsLocation) {
    return {
      isVague: true,
      reason: 'missing_location',
      message: 'Generic issue mentioned without specific location'
    };
  }

  // No specific measurements, quantities, or details for installation requests
  if (desc.includes('install') || desc.includes('replace')) {
    const hasSpecifics = /\d+/.test(desc) || // has numbers
                         desc.includes('gallon') ||
                         desc.includes('foot') || desc.includes('feet') ||
                         desc.includes('inch') || desc.includes('meter') ||
                         desc.includes('square') ||
                         desc.includes('gas') || desc.includes('electric') ||
                         desc.includes('indoor') || desc.includes('outdoor');
    
    if (!hasSpecifics && desc.split(' ').length < 8) {
      return {
        isVague: true,
        reason: 'missing_specs',
        message: 'Installation/replacement needs specific details (size, type, location)'
      };
    }
  }

  // If we have images but very vague text, still flag it
  if (imageCount > 0 && desc.length < 20 && desc.split(' ').length < 4) {
    return {
      isVague: true,
      reason: 'vague_with_images',
      message: 'Images provided but description is too vague to identify specific issue'
    };
  }

  return { isVague: false };
}

// Generate smart clarification questions based on context
function generateSmartQuestions(description, detectedItems, vaguenessReason, serviceContext) {
  const desc = description.toLowerCase();
  const questions = [];

  // Smart questions based on context
  if (vaguenessReason === 'ultra_vague' || vaguenessReason === 'too_short') {
    questions.push("What specific issue or project do you need help with?");
    
    if (detectedItems.length > 0) {
      const itemsList = detectedItems.slice(0, 3).map(item => item.split(': ')[1] || item).join(', ');
      questions.push(`I can see ${itemsList} in the images - which one needs work?`);
    }
    
    questions.push("Is this for repair, installation, or renovation?");
    questions.push("How urgent is this - do you need it done today, this week, or is it flexible?");
  }
  else if (vaguenessReason === 'missing_location') {
    questions.push("Where exactly is this located? (e.g., under kitchen sink, bedroom wall, outdoor patio)");
    
    if (desc.includes('leak')) {
      questions.push("Is it currently leaking actively, or is this preventive maintenance?");
      questions.push("How severe is the leak - dripping slowly or flowing steadily?");
    }
    
    questions.push("Is this area easily accessible or will special equipment be needed?");
  }
  else if (vaguenessReason === 'missing_specs') {
    if (desc.includes('water heater')) {
      questions.push("What size water heater do you need? (30, 40, 50 gallon, or tankless?)");
      questions.push("Is it gas or electric powered?");
      questions.push("Where will it be installed? (indoor closet, outdoor, garage?)");
    }
    else if (desc.includes('install') || desc.includes('replace')) {
      questions.push("What specific item or fixture are you looking to install/replace?");
      questions.push("What size or capacity do you need?");
      questions.push("Where will this be located?");
    }
    else {
      questions.push("Can you provide the size or dimensions of the area/item?");
      questions.push("What type or model are you considering?");
      questions.push("Any specific requirements or preferences?");
    }
  }
  else if (vaguenessReason === 'vague_with_images') {
    questions.push("Looking at your images, what specific part or area needs attention?");
    questions.push("What problem are you experiencing with this?");
    questions.push("Have you noticed this getting worse over time, or is it a new issue?");
  }

  // Add service-specific questions
  if (serviceContext?.title === 'Emergency Services') {
    questions.unshift("Is this an active emergency right now? (flooding, sparking, gas smell, etc.)");
  }

  // Limit to 4 questions max
  return questions.slice(0, 4);
}

// Enhanced analysis using Groq with crew size detection, multiple images, and clarification support
async function analyzeWithGroq(description, visionAnnotationsArray = [], serviceContext = null, chatHistory = null) {
  try {
    // Combine all detected items from all images and check for off-topic content
    const allDetectedItems = [];
    let imageQualityIssues = false;
    let offTopicDetected = false;
    let offTopicReason = '';
    
    // Define off-topic categories
    const offTopicKeywords = {
      vehicles: ['car', 'automobile', 'vehicle', 'motorcycle', 'bike', 'sedan', 'suv', 'sports car', 'wheel', 'tire', 'bumper', 'headlight'],
      people: ['person', 'face', 'man', 'woman', 'child', 'people', 'crowd', 'selfie', 'portrait'],
      animals: ['dog', 'cat', 'pet', 'animal', 'bird', 'horse', 'fish'],
      electronics: ['phone', 'laptop', 'computer', 'television', 'tv', 'monitor', 'tablet', 'gaming', 'xbox', 'playstation'],
      food: ['food', 'meal', 'restaurant', 'pizza', 'burger', 'dessert', 'drink', 'beverage'],
      clothing: ['clothing', 'shirt', 'dress', 'shoes', 'fashion', 'outfit'],
      entertainment: ['toy', 'game', 'doll', 'action figure', 'video game']
    };

    // Construction/maintenance context keywords (these OVERRIDE off-topic detection)
    const validContextKeywords = [
      'building', 'house', 'home', 'property', 'construction', 'renovation',
      'repair', 'maintenance', 'damage', 'broken', 'leak', 'crack', 'wall',
      'ceiling', 'floor', 'roof', 'door', 'window', 'pipe', 'plumbing',
      'electrical', 'hvac', 'appliance', 'kitchen', 'bathroom', 'garage',
      'deck', 'fence', 'outdoor', 'installation', 'demolition', 'contractor',
      'fixture', 'cabinet', 'countertop', 'tile', 'paint', 'drywall'
    ];
    
    visionAnnotationsArray.forEach((annotations, imageIndex) => {
      const objects = annotations.localizedObjectAnnotations || [];
      const labels = annotations.labelAnnotations || [];
      const texts = annotations.textAnnotations || [];

      // Check if image quality is poor (few detections)
      if (objects.length === 0 && labels.length < 3) {
        imageQualityIssues = true;
      }

      const imageItems = [
        ...objects.map(obj => `Image ${imageIndex + 1}: ${obj.name}`),
        ...labels.map(label => `Image ${imageIndex + 1}: ${label.description}`),
        ...texts.slice(0, 3).map(text => `Image ${imageIndex + 1}: ${text.description.substring(0, 50)}`)
      ].filter(Boolean);

      allDetectedItems.push(...imageItems);

      // Check for off-topic content
      const allLabelsLower = [...objects.map(o => o.name), ...labels.map(l => l.description)].join(' ').toLowerCase();
      const descriptionLower = description.toLowerCase();
      const combinedText = `${allLabelsLower} ${descriptionLower}`;

      // First check if there's valid construction context
      const hasValidContext = validContextKeywords.some(keyword => combinedText.includes(keyword));

      // Only flag as off-topic if NO valid context exists
      if (!hasValidContext && !offTopicDetected) {
        for (const [category, keywords] of Object.entries(offTopicKeywords)) {
          const matchedKeywords = keywords.filter(keyword => allLabelsLower.includes(keyword));
          
          // Need at least 2 matching keywords OR 1 very specific match to flag
          const specificMatches = ['car', 'automobile', 'motorcycle', 'selfie', 'portrait', 'pizza', 'gaming'];
          const hasSpecificMatch = specificMatches.some(keyword => allLabelsLower.includes(keyword));
          
          if (matchedKeywords.length >= 2 || (matchedKeywords.length >= 1 && hasSpecificMatch)) {
            offTopicDetected = true;
            offTopicReason = category;
            console.log(`Off-topic detected: ${category} - Keywords: ${matchedKeywords.join(', ')}`);
            break;
          }
        }
      }
    });

    // If off-topic content detected, return friendly rejection
    if (offTopicDetected) {
      return {
        is_off_topic: true,
        off_topic_category: offTopicReason,
        message: getOffTopicMessage(offTopicReason),
        analysis: {
          issue_type: 'Off-Topic Request',
          severity: 'N/A',
          description: getOffTopicMessage(offTopicReason)
        }
      };
    }

    // 🆕 NEW: Check if description is too vague BEFORE sending to AI
    const vaguenessCheck = isDescriptionVague(description, visionAnnotationsArray.length);
    
    if (vaguenessCheck.isVague) {
      console.log(`Vague description detected: ${vaguenessCheck.reason} - "${description}"`);
      
      const clarificationQuestions = generateSmartQuestions(
        description, 
        allDetectedItems, 
        vaguenessCheck.reason,
        serviceContext
      );
      
      return {
        needs_clarification: true,
        clarification_questions: clarificationQuestions,
        preliminary_info: {
          detected_items: allDetectedItems.slice(0, 5),
          vagueness_reason: vaguenessCheck.reason,
          confidence_level: 'very_low',
          message: vaguenessCheck.message
        },
        analysis: {
          issue_type: 'Information Needed',
          severity: 'Unknown',
          description: 'I need more information to provide an accurate estimate.'
        }
      };
    }

    // Build chat context if this is a follow-up
    let chatContext = '';
    if (chatHistory && chatHistory.length > 0) {
      chatContext = '\n\nPREVIOUS CONVERSATION:\n' + chatHistory.map(msg => 
        `${msg.role === 'user' ? 'Customer' : 'AI'}: ${msg.content}`
      ).join('\n');
    }

    // Create comprehensive prompt for Groq with intelligent pricing and clarification detection
    const prompt = `You are an expert contractor cost estimator for Cabo San Lucas, Mexico. Analyze this maintenance/construction project and provide realistic 2024-2025 pricing in USD.

IMAGES ANALYZED: ${visionAnnotationsArray.length} professional photos were analyzed using computer vision
DESCRIPTION: ${description}
${allDetectedItems.length > 0 ? `DETECTED ITEMS FROM ${visionAnnotationsArray.length} IMAGES: ${allDetectedItems.join(', ')}` : 'Images were uploaded but computer vision did not detect specific items. Base analysis on description.'}
${serviceContext ? `SERVICE CONTEXT: ${serviceContext.title}` : ''}
${chatContext}

CLARIFICATION PROTOCOL - READ CAREFULLY:
The system has already pre-filtered vague requests. You should now provide a FULL ESTIMATE based on the information available.

However, if during your analysis you discover critical missing information that would significantly affect the quote, you can still ask for clarification:

IF YOU NEED MORE INFORMATION (rare - only for complex multi-system projects), respond with:
{
  "needs_clarification": true,
  "clarification_questions": [
    "Do you need the electrical panel upgraded as part of this HVAC installation?",
    "Will structural modifications be required for this renovation?"
  ],
  "preliminary_info": {
    "detected_category": "complex_renovation",
    "confidence_level": "medium"
  }
}

OTHERWISE, respond with full analysis:
{
  "needs_clarification": false,
  "issue_type": "specific category (Water Heater Installation, Kitchen Island Demolition, HVAC Repair, etc.)",
  "severity": "High/Medium/Low based on urgency and safety",
  "description": "detailed analysis of the work required based on the ${visionAnnotationsArray.length} analyzed images and description provided",
  "required_parts": [{"name": "specific part/material name", "quantity": number, "estimated_cost": number}],
  "difficulty_level": "Professional/Expert Required/Skilled Handyperson",
  "crew_size": 1,
  "crew_justification": "Brief explanation why this crew size is needed",
  "labor_hours": 4,
  "cost_breakdown": {
    "parts_min": 200,
    "parts_max": 800,
    "base_labor_cost": 300,
    "total_min": 500,
    "total_max": 1100
  }
}

INTELLIGENT PRICING GUIDELINES FOR CABO SAN LUCAS:

WATER HEATER PROJECTS:
- Standard 40-50 gallon: Parts $900-1400, Labor 4-6 hours, 2 people
- Tankless unit: Parts $1400-2800, Labor 6-8 hours, 2 people  
- Gas line work adds: $350-700 to parts, +2 hours labor

KITCHEN PROJECTS:
- Island demolition: Parts $120-350, Labor 6-8 hours, 2 people, Disposal $350
- Cabinet installation: Parts $350-1700 per cabinet, Labor varies by complexity
- Countertop install: Parts $900-3500, Labor 4-6 hours, 2 people

PLUMBING PROJECTS:
- Pipe repair: Parts $60-240, Labor 2-4 hours, 1 person
- Fixture replacement: Parts $180-900, Labor 2-3 hours, 1 person
- Main line work: Parts $240-1200, Labor 4-8 hours, 2 people

ELECTRICAL PROJECTS:
- Outlet/switch: Parts $30-120, Labor 1-2 hours, 1 person
- Panel upgrade: Parts $900-2400, Labor 6-8 hours, 1 person (licensed)
- Wiring work: Parts $240-900, Labor varies, 1-2 people

HVAC PROJECTS:
- Unit replacement: Parts $3500-9000, Labor 8-12 hours, 2-3 people
- Duct work: Parts $600-2400, Labor 4-8 hours, 2 people
- Repair work: Parts $120-600, Labor 2-4 hours, 1-2 people

CREW SIZE LOGIC:
- 1 person: Simple repairs, electrical work, small plumbing, painting
- 2 people: Heavy appliances, HVAC, large plumbing, demolition, safety-critical work
- 3+ people: Major installations, structural work, complex commercial projects

PRICING FACTORS FOR CABO SAN LUCAS:
- Tourist area pricing (20-30% above mainland Mexico average)
- Import costs for specialty parts (add 15-25%)
- Permit requirements (add $120-600 for major work)
- Access difficulty (tight spaces, high locations add 20-30%)
- Emergency work (add 50-100% premium)
- Material quality (standard vs premium affects parts cost significantly)
- Language/communication premium (bilingual contractors charge 10-15% more)`;

    // Call Groq API
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
            content: `You are an expert maintenance and construction cost estimator for Cabo San Lucas, Mexico. You are analyzing ${visionAnnotationsArray.length} images that have been processed by computer vision. 

The system has already filtered out vague requests, so you should provide detailed estimates in most cases. Only ask for clarification if there are multiple complex systems involved that could significantly change the scope.

Always respond in valid JSON format only. No additional text outside the JSON.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1200
      })
    });

    if (!groqResponse.ok) {
      console.error('Groq API error:', groqResponse.status);
      throw new Error(`Groq API failed: ${groqResponse.status}`);
    }

    const groqData = await groqResponse.json();
    const groqContent = groqData.choices[0]?.message?.content;

    if (!groqContent) {
      throw new Error('No content from Groq');
    }

    // Parse Groq response
    let groqAnalysis;
    try {
      const cleanedContent = groqContent.replace(/```json\n?|\n?```/g, '').trim();
      groqAnalysis = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Groq JSON parse error:', parseError);
      throw new Error('Invalid JSON from Groq');
    }

    // Check if AI needs clarification (should be rare now)
    if (groqAnalysis.needs_clarification === true) {
      return {
        needs_clarification: true,
        clarification_questions: groqAnalysis.clarification_questions || [
          "Can you provide more details about the scope of work?",
          "Are there any additional systems involved?"
        ],
        preliminary_info: groqAnalysis.preliminary_info || {},
        analysis: {
          issue_type: 'Information Needed',
          severity: 'Unknown',
          description: 'I need a bit more information to provide an accurate estimate.'
        }
      };
    }

    // If we have full analysis, calculate costs
    const crewSize = Math.max(1, groqAnalysis.crew_size || 1);
    const laborHours = groqAnalysis.labor_hours || 2;
    const baseLaborCost = groqAnalysis.cost_breakdown?.base_labor_cost || 150;
    const laborRate = 80; // $80/hour per person in Cabo San Lucas
    
    // Calculate final labor cost with crew multiplier
    const finalLaborCost = Math.max(baseLaborCost * crewSize, laborHours * laborRate * crewSize);
    
    // Add $100 minimum travel/overhead (not mentioned in quote display)
    const travelOverhead = 100;
    const totalLaborWithOverhead = finalLaborCost + travelOverhead;

    // Calculate disposal costs based on job type (higher in Cabo)
    let disposalCost = 0;
    const issueType = groqAnalysis.issue_type || 'Maintenance Issue';
    if (issueType.includes('Demolition') || issueType.includes('Renovation')) {
      disposalCost = 350;
    } else if (issueType.includes('Water Damage')) {
      disposalCost = 180;
    } else if (issueType.includes('Kitchen') || issueType.includes('Bathroom')) {
      disposalCost = 120;
    } else if (issueType.includes('Flooring')) {
      disposalCost = 90;
    } else if (issueType.includes('HVAC')) {
      disposalCost = 60;
    }

    // Format response
    return {
      needs_clarification: false,
      analysis: {
        issue_type: groqAnalysis.issue_type || 'Maintenance Issue',
        severity: groqAnalysis.severity || 'Medium',
        description: groqAnalysis.description || description,
        required_parts: groqAnalysis.required_parts || [],
        difficulty_level: groqAnalysis.difficulty_level || 'Professional',
        crew_size: crewSize,
        crew_justification: groqAnalysis.crew_justification || `${crewSize} person${crewSize > 1 ? 's' : ''} required for this job`
      },
      cost_estimate: {
        parts_cost: {
          min: groqAnalysis.cost_breakdown?.parts_min || 50,
          max: groqAnalysis.cost_breakdown?.parts_max || 200
        },
        labor_cost: totalLaborWithOverhead,
        labor_hours: laborHours,
        crew_size: crewSize,
        crew_justification: groqAnalysis.crew_justification,
        disposal_cost: disposalCost,
        total_cost: {
          min: (groqAnalysis.cost_breakdown?.parts_min || 50) + totalLaborWithOverhead + disposalCost,
          max: (groqAnalysis.cost_breakdown?.parts_max || 200) + totalLaborWithOverhead + disposalCost
        }
      },
      pricing: [],
      stores: getDefaultStores()
    };

  } catch (error) {
    console.error('Groq analysis failed:', error);
    // Fallback to rule-based analysis
    const fallback = processMaintencanceIssue(visionAnnotationsArray[0] || {}, description, serviceContext);
    return {
      needs_clarification: false,
      analysis: fallback.analysis,
      cost_estimate: fallback.cost_estimate,
      pricing: [],
      stores: getDefaultStores()
    };
  }
}

// Enhanced fallback rule-based analysis with crew detection
function processMaintencanceIssue(annotations, description, service_context) {
  const objects = annotations.localizedObjectAnnotations || [];
  const labels = annotations.labelAnnotations || [];
  const texts = annotations.textAnnotations || [];

  const maintenanceKeywords = [
    'pipe', 'plumbing', 'electrical', 'outlet', 'switch', 'fixture',
    'faucet', 'toilet', 'sink', 'drain', 'water', 'leak', 'wire',
    'panel', 'breaker', 'hvac', 'vent', 'duct', 'furnace', 'ac',
    'roof', 'ceiling', 'floor', 'wall', 'door', 'window', 'paint',
    'tile', 'cabinet', 'countertop', 'garage', 'drywall'
  ];

  // Keywords that typically require 2+ people
  const multiPersonKeywords = [
    'dishwasher', 'refrigerator', 'appliance', 'heavy', 'large', 'kitchen island',
    'countertop', 'demolition', 'hvac unit', 'water heater', 'range', 'oven'
  ];

  const detectedItems = [];
  
  objects.forEach(obj => {
    if (maintenanceKeywords.some(keyword => 
      obj.name.toLowerCase().includes(keyword)
    )) {
      detectedItems.push(obj.name);
    }
  });

  labels.forEach(label => {
    if (maintenanceKeywords.some(keyword => 
      label.description.toLowerCase().includes(keyword)
    )) {
      detectedItems.push(label.description);
    }
  });

  const descriptionLower = description.toLowerCase();
  
  // Determine crew size based on keywords
  let crewSize = 1;
  let crewJustification = "Standard single-person job";
  
  if (multiPersonKeywords.some(keyword => descriptionLower.includes(keyword))) {
    crewSize = 2;
    crewJustification = "Heavy lifting or safety requires 2 people";
  }
  
  if (descriptionLower.includes('demolition') || descriptionLower.includes('structural')) {
    crewSize = 2;
    crewJustification = "Safety and coordination requires 2 people";
  }

  const urgentKeywords = [
    'leak', 'flooding', 'sparking', 'smoke', 'emergency', 'broken pipe',
    'electrical fire', 'no power', 'gas smell', 'structural damage'
  ];
  const mediumKeywords = [
    'not working', 'broken', 'damaged', 'cracked', 'loose', 'stuck',
    'slow drain', 'flickering', 'noisy', 'worn out'
  ];
  
  let severity = 'Low';
  if (urgentKeywords.some(keyword => descriptionLower.includes(keyword))) {
    severity = 'High';
  } else if (mediumKeywords.some(keyword => descriptionLower.includes(keyword))) {
    severity = 'Medium';
  }

  let issueType = 'General Maintenance';
  let categoryMultiplier = 1.0;

  if (descriptionLower.includes('plumb') || 
      detectedItems.some(item => ['pipe', 'faucet', 'toilet', 'sink', 'drain'].includes(item.toLowerCase())) ||
      ['water', 'leak', 'drain', 'faucet', 'toilet', 'pipe'].some(keyword => descriptionLower.includes(keyword))) {
    issueType = 'Plumbing Issue';
    categoryMultiplier = 1.4; // Higher in Cabo
  } else if (descriptionLower.includes('electric') || 
            detectedItems.some(item => ['outlet', 'switch', 'wire', 'electrical'].includes(item.toLowerCase())) ||
            ['outlet', 'switch', 'power', 'electric', 'wiring', 'breaker'].some(keyword => descriptionLower.includes(keyword))) {
    issueType = 'Electrical Issue';
    categoryMultiplier = 1.5; // Higher in Cabo
  } else if (['hvac', 'heating', 'cooling', 'ac', 'furnace', 'air conditioning'].some(keyword => descriptionLower.includes(keyword))) {
    issueType = 'HVAC Issue';
    categoryMultiplier = 1.6; // Higher in Cabo
    crewSize = 2; // HVAC typically requires 2 people
    crewJustification = "HVAC units are heavy and require 2 people";
  } else if (['roof', 'ceiling', 'leak', 'water damage'].some(keyword => descriptionLower.includes(keyword))) {
    issueType = 'Water Damage';
    categoryMultiplier = 1.7; // Higher in Cabo
  } else if (['paint', 'wall', 'drywall', 'ceiling', 'cosmetic'].some(keyword => descriptionLower.includes(keyword))) {
    issueType = 'Cosmetic/Painting';
    categoryMultiplier = 0.9; // Slightly higher in Cabo
  } else if (['floor', 'tile', 'carpet', 'hardwood'].some(keyword => descriptionLower.includes(keyword))) {
    issueType = 'Flooring Issue';
    categoryMultiplier = 1.3; // Higher in Cabo
    if (descriptionLower.includes('large') || descriptionLower.includes('kitchen') || descriptionLower.includes('bathroom')) {
      crewSize = 2;
      crewJustification = "Large flooring projects require 2 people for efficiency";
    }
  } else if (['kitchen', 'bathroom', 'cabinet', 'countertop'].some(keyword => descriptionLower.includes(keyword))) {
    issueType = 'Kitchen/Bathroom';
    categoryMultiplier = 1.4; // Higher in Cabo
    if (descriptionLower.includes('countertop') || descriptionLower.includes('island')) {
      crewSize = 2;
      crewJustification = "Heavy stone countertops require 2 people for safety";
    }
  } else if (['demolition', 'demo', 'remove', 'tear out'].some(keyword => descriptionLower.includes(keyword))) {
    issueType = 'Demolition/Renovation Issue';
    categoryMultiplier = 1.5; // Higher in Cabo
    crewSize = 2;
    crewJustification = "Safety and coordination requires 2 people";
  }

  // Base costs adjusted for Cabo San Lucas (20-30% higher)
  const baseCosts = {
    'Plumbing Issue': { parts: [90, 360], labor: 180, disposal: 0 },
    'Electrical Issue': { parts: [60, 300], labor: 240, disposal: 0 },
    'HVAC Issue': { parts: [120, 960], labor: 360, disposal: 60 },
    'Water Damage': { parts: [240, 1800], labor: 480, disposal: 180 },
    'Cosmetic/Painting': { parts: [30, 180], labor: 120, disposal: 30 },
    'Flooring Issue': { parts: [120, 960], labor: 240, disposal: 90 },
    'Kitchen/Bathroom': { parts: [180, 1200], labor: 300, disposal: 120 },
    'Demolition/Renovation Issue': { parts: [60, 240], labor: 240, disposal: 350 }, // Higher disposal cost
    'General Maintenance': { parts: [60, 240], labor: 150, disposal: 0 }
  };

  const costs = baseCosts[issueType] || baseCosts['General Maintenance'];
  const severityMultiplier = severity === 'High' ? 1.8 : severity === 'Medium' ? 1.3 : 1.0;
  const complexityMultiplier = description.length > 100 ? 1.2 : description.length > 50 ? 1.1 : 1.0;
  const serviceMultiplier = service_context?.title === 'Emergency Services' ? 1.5 : 1.0;
  const finalMultiplier = categoryMultiplier * severityMultiplier * complexityMultiplier * serviceMultiplier;

  const finalPartsCost = [
    Math.round(costs.parts[0] * finalMultiplier),
    Math.round(costs.parts[1] * finalMultiplier)
  ];
  
  // Apply crew multiplier to labor cost and add $100 overhead
  const baseLaborCost = Math.round(costs.labor * finalMultiplier);
  const crewLaborCost = baseLaborCost * crewSize;
  const travelOverhead = 100; // $100 minimum for travel/overhead
  const finalLaborCost = crewLaborCost + travelOverhead;
  
  // Calculate disposal cost
  const baseDisposalCost = costs.disposal || 0;
  const finalDisposalCost = Math.round(baseDisposalCost * finalMultiplier);

  return {
    analysis: {
      issue_type: issueType,
      severity: severity,
      description: `${detectedItems.length > 0 ? `Detected: ${detectedItems.slice(0, 3).join(', ')}. ` : ''}${description}`,
      required_parts: [
        { name: `${issueType} repair materials`, quantity: severity === 'High' ? 2 : 1 },
        { name: "Professional labor", quantity: Math.ceil(finalMultiplier) }
      ],
      difficulty_level: severity === 'High' ? 'Expert Required' : finalMultiplier > 1.5 ? 'Professional' : 'Skilled Handyperson',
      crew_size: crewSize,
      crew_justification: crewJustification
    },
    cost_estimate: {
      parts_cost: { 
        min: finalPartsCost[0],
        max: finalPartsCost[1]
      },
      labor_cost: finalLaborCost, // Includes crew multiplier + $100 overhead
      labor_hours: Math.ceil(baseLaborCost / 80), // Calculate hours at $80/hr for Cabo
      crew_size: crewSize,
      crew_justification: crewJustification,
      disposal_cost: finalDisposalCost,
      total_cost: { 
        min: finalPartsCost[0] + finalLaborCost + finalDisposalCost,
        max: finalPartsCost[1] + finalLaborCost + finalDisposalCost
      }
    }
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
    },
    {
      name: "Ferretería y Materiales Los Cabos",
      address: "Av. Constituyentes, Cabo San Lucas, B.C.S.",
      rating: 4.2
    }
  ];
}

// Generate friendly off-topic messages
function getOffTopicMessage(category) {
  const messages = {
    vehicles: "🚗 I noticed you uploaded an image of a vehicle. I specialize in home and property maintenance! If you need vehicle-related construction (like a garage, carport, or driveway repair), I'd be happy to help with that instead.",
    people: "👋 I see there are people in your photo! I focus on analyzing property maintenance and construction issues. Could you upload a clearer photo of the specific area or item that needs work?",
    animals: "🐾 Cute! But I specialize in property maintenance, not pet care. If you have a home improvement project (maybe a doghouse or fence repair?), I'm here to help!",
    electronics: "📱 I noticed electronics in your image. I handle property maintenance and construction projects. If you need to install mounting brackets, run electrical lines, or set up a home entertainment space, just let me know!",
    food: "🍕 That looks delicious! But I specialize in kitchen renovations and property maintenance. If you need to upgrade your kitchen, install appliances, or fix plumbing, I'm your AI assistant!",
    clothing: "👕 I see clothing/fashion items. I focus on home maintenance and construction. If you need closet installation, storage solutions, or any property improvements, I'd love to help!",
    entertainment: "🎮 I noticed toys or games. I'm designed for property maintenance and construction estimates. If you need a game room renovation, shelving installation, or home improvements, let's talk!"
  };

  return messages[category] || "I specialize in home and property maintenance. Could you please upload photos of the area or item that needs repair or installation?";
}