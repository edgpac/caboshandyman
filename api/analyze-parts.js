// /api/analyze-parts.js - Complete Fixed Version with Loop Prevention

// Check if description is too vague to provide accurate estimate
function isDescriptionVague(description, imageCount) {
  const desc = description.toLowerCase().trim();
  
  const ultraVaguePatterns = [
    /^help$/i, /^i need help$/i, /^fix this$/i, /^fix it$/i,
    /^broken$/i, /^repair$/i, /^fix$/i, /^this$/i, /^look$/i,
    /^check$/i, /^what about this$/i, /^can you help$/i,
    /^need help$/i, /^please help$/i
  ];

  if (ultraVaguePatterns.some(pattern => pattern.test(desc))) {
    return {
      isVague: true,
      reason: 'ultra_vague',
      message: 'The description is too brief to provide an accurate estimate'
    };
  }

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

  if (desc.length < 15 || desc.split(' ').length < 3) {
    return {
      isVague: true,
      reason: 'too_short',
      message: 'Description is too short to determine scope of work'
    };
  }

  const hasLocationWords = ['in', 'under', 'behind', 'above', 'near', 'at', 'on'];
  const hasRoomWords = ['kitchen', 'bathroom', 'bedroom', 'garage', 'outdoor', 'living room', 'basement'];
  const mentionsLocation = hasLocationWords.some(word => desc.includes(word)) || 
                          hasRoomWords.some(word => desc.includes(word));

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

  if (desc.includes('install') || desc.includes('replace')) {
    const hasSpecifics = /\d+/.test(desc) ||
                         desc.includes('gallon') || desc.includes('foot') || desc.includes('feet') ||
                         desc.includes('inch') || desc.includes('meter') || desc.includes('square') ||
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

  if (serviceContext?.title === 'Emergency Services') {
    questions.unshift("Is this an active emergency right now? (flooding, sparking, gas smell, etc.)");
  }

  return questions.slice(0, 4);
}

// Enhanced analysis using Groq
async function analyzeWithGroq(description, visionAnnotationsArray = [], serviceContext = null, chatHistory = null, forceAnalysis = false) {
  try {
    const allDetectedItems = [];
    let offTopicDetected = false;
    let offTopicReason = '';
    
    const offTopicKeywords = {
      vehicles: ['car', 'automobile', 'vehicle', 'motorcycle', 'bike', 'sedan', 'suv', 'sports car', 'wheel', 'tire', 'bumper', 'headlight'],
      people: ['person', 'face', 'man', 'woman', 'child', 'people', 'crowd', 'selfie', 'portrait'],
      animals: ['dog', 'cat', 'pet', 'animal', 'bird', 'horse', 'fish'],
      electronics: ['phone', 'laptop', 'computer', 'television', 'tv', 'monitor', 'tablet', 'gaming', 'xbox', 'playstation'],
      food: ['food', 'meal', 'restaurant', 'pizza', 'burger', 'dessert', 'drink', 'beverage'],
      clothing: ['clothing', 'shirt', 'dress', 'shoes', 'fashion', 'outfit'],
      entertainment: ['toy', 'game', 'doll', 'action figure', 'video game']
    };

    const validContextKeywords = [
      'building', 'house', 'home', 'property', 'construction', 'renovation',
      'repair', 'maintenance', 'damage', 'broken', 'leak', 'crack', 'wall',
      'ceiling', 'floor', 'roof', 'door', 'window', 'pipe', 'plumbing',
      'electrical', 'hvac', 'appliance', 'kitchen', 'bathroom', 'garage',
      'deck', 'fence', 'outdoor', 'installation', 'demolition', 'contractor',
      'fixture', 'cabinet', 'countertop', 'tile', 'paint', 'drywall', 'faucet',
      'sink', 'toilet', 'shower', 'tub', 'water heater', 'air conditioning'
    ];
    
    visionAnnotationsArray.forEach((annotations, imageIndex) => {
      const objects = annotations.localizedObjectAnnotations || [];
      const labels = annotations.labelAnnotations || [];
      const texts = annotations.textAnnotations || [];

      const imageItems = [
        ...objects.map(obj => `Image ${imageIndex + 1}: ${obj.name}`),
        ...labels.map(label => `Image ${imageIndex + 1}: ${label.description}`),
        ...texts.slice(0, 3).map(text => `Image ${imageIndex + 1}: ${text.description.substring(0, 50)}`)
      ].filter(Boolean);

      allDetectedItems.push(...imageItems);

      const allLabelsLower = [...objects.map(o => o.name), ...labels.map(l => l.description)].join(' ').toLowerCase();
      const descriptionLower = description.toLowerCase();
      const combinedText = `${allLabelsLower} ${descriptionLower}`;

      const hasValidContext = validContextKeywords.some(keyword => combinedText.includes(keyword));

      if (!hasValidContext && !offTopicDetected) {
        for (const [category, keywords] of Object.entries(offTopicKeywords)) {
          const matchedKeywords = keywords.filter(keyword => allLabelsLower.includes(keyword));
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

    if (offTopicDetected) {
      return {
        is_off_topic: true,
        off_topic_category: offTopicReason,
        message: getOffTopicMessage(offTopicReason),
        analysis: {
          issue_type: 'Off-Topic Request',
          severity: 'N/A',
          description: getOffTopicMessage(offTopicReason)
        },
        cost_estimate: {
          parts_cost: { min: 0, max: 0 },
          labor_cost: 0,
          labor_hours: 0,
          crew_size: 1,
          disposal_cost: 0,
          total_cost: { min: 0, max: 0 }
        },
        pricing: [],
        stores: []
      };
    }

    // 🔥 CRITICAL FIX: Skip vagueness check if force_analysis is true
    if (!forceAnalysis) {
      const vaguenessCheck = isDescriptionVague(description, visionAnnotationsArray.length);
      
      if (vaguenessCheck.isVague) {
        console.log(`Vague description detected: ${vaguenessCheck.reason} - "${description.substring(0, 100)}"`);
        
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
          },
          cost_estimate: {
            parts_cost: { min: 0, max: 0 },
            labor_cost: 0,
            labor_hours: 0,
            crew_size: 1,
            disposal_cost: 0,
            total_cost: { min: 0, max: 0 }
          },
          pricing: [],
          stores: []
        };
      }
    } else {
      console.log('Force analysis mode - skipping vagueness check');
    }

    let chatContext = '';
    if (chatHistory && chatHistory.length > 0) {
      chatContext = '\n\nPREVIOUS CONVERSATION:\n' + chatHistory.map(msg => 
        `${msg.role === 'user' ? 'Customer' : 'AI'}: ${msg.content}`
      ).join('\n');
    }

    const prompt = `You are an expert contractor cost estimator for Cabo San Lucas, Mexico. Analyze this maintenance/construction project and provide realistic 2024-2025 pricing in USD.

IMAGES ANALYZED: ${visionAnnotationsArray.length} professional photos were analyzed using computer vision
DESCRIPTION: ${description}
${allDetectedItems.length > 0 ? `DETECTED ITEMS FROM ${visionAnnotationsArray.length} IMAGES: ${allDetectedItems.join(', ')}` : 'Images were uploaded but computer vision did not detect specific items. Base analysis on description.'}
${serviceContext ? `SERVICE CONTEXT: ${serviceContext.title}` : ''}
${chatContext}

${forceAnalysis ? 'IMPORTANT: User has provided all available information. Provide best estimate based on current data without asking for more clarification.' : ''}

Respond with full analysis in JSON format:
{
  "needs_clarification": false,
  "issue_type": "specific category",
  "severity": "High/Medium/Low",
  "description": "detailed analysis",
  "required_parts": [{"name": "part name", "quantity": 1, "estimated_cost": 100}],
  "difficulty_level": "Professional/Expert Required/Skilled Handyperson",
  "crew_size": 1,
  "crew_justification": "explanation",
  "labor_hours": 4,
  "cost_breakdown": {
    "parts_min": 200,
    "parts_max": 800,
    "base_labor_cost": 300
  }
}`;

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
            content: `You are an expert maintenance and construction cost estimator for Cabo San Lucas, Mexico. Always respond in valid JSON format only. ${forceAnalysis ? 'When force_analysis is true, never return needs_clarification: true.' : ''}`
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
      throw new Error(`Groq API failed: ${groqResponse.status}`);
    }

    const groqData = await groqResponse.json();
    const groqContent = groqData.choices[0]?.message?.content;

    if (!groqContent) {
      throw new Error('No content from Groq');
    }

    let groqAnalysis;
    try {
      const cleanedContent = groqContent.replace(/```json\n?|\n?```/g, '').trim();
      groqAnalysis = JSON.parse(cleanedContent);
    } catch (parseError) {
      throw new Error('Invalid JSON from Groq');
    }

    // 🔥 CRITICAL FIX: Override needs_clarification if forceAnalysis is true
    if (forceAnalysis && groqAnalysis.needs_clarification === true) {
      console.log('Force analysis - overriding AI clarification request');
      groqAnalysis.needs_clarification = false;
      
      // Ensure we have minimal data for estimate
      if (!groqAnalysis.issue_type) {
        groqAnalysis.issue_type = serviceContext?.title || 'Maintenance Service';
      }
      if (!groqAnalysis.description) {
        groqAnalysis.description = 'On-site assessment recommended for detailed quote.';
      }
      if (!groqAnalysis.cost_breakdown) {
        groqAnalysis.cost_breakdown = {
          parts_min: 100,
          parts_max: 400,
          base_labor_cost: 250
        };
      }
    }

    if (groqAnalysis.needs_clarification === true && !forceAnalysis) {
      return {
        needs_clarification: true,
        clarification_questions: groqAnalysis.clarification_questions || [
          "Can you provide more details about the scope of work?"
        ],
        preliminary_info: groqAnalysis.preliminary_info || {},
        analysis: {
          issue_type: 'Information Needed',
          severity: 'Unknown',
          description: 'I need a bit more information to provide an accurate estimate.'
        },
        cost_estimate: {
          parts_cost: { min: 0, max: 0 },
          labor_cost: 0,
          labor_hours: 0,
          crew_size: 1,
          disposal_cost: 0,
          total_cost: { min: 0, max: 0 }
        },
        pricing: [],
        stores: []
      };
    }

    const crewSize = Math.max(1, groqAnalysis.crew_size || 1);
    const laborHours = groqAnalysis.labor_hours || 2;
    const baseLaborCost = groqAnalysis.cost_breakdown?.base_labor_cost || 150;
    const laborRate = 80;
    
    const finalLaborCost = Math.max(baseLaborCost * crewSize, laborHours * laborRate * crewSize);
    const travelOverhead = 100;
    const totalLaborWithOverhead = finalLaborCost + travelOverhead;

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

    return {
      needs_clarification: false,
      analysis: {
        issue_type: groqAnalysis.issue_type || 'Maintenance Issue',
        severity: groqAnalysis.severity || 'Medium',
        description: groqAnalysis.description || description,
        required_parts: groqAnalysis.required_parts || [],
        difficulty_level: groqAnalysis.difficulty_level || 'Professional',
        crew_size: crewSize,
        crew_justification: groqAnalysis.crew_justification || `${crewSize} person${crewSize > 1 ? 's' : ''} required`
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

function processMaintencanceIssue(annotations, description, service_context) {
  return {
    analysis: {
      issue_type: service_context?.title || 'General Maintenance',
      severity: 'Medium',
      description: description || 'On-site assessment recommended for accurate quote.',
      required_parts: [],
      difficulty_level: 'Professional',
      crew_size: 1,
      crew_justification: 'Standard single-person job'
    },
    cost_estimate: {
      parts_cost: { min: 100, max: 300 },
      labor_cost: 250,
      labor_hours: 2,
      crew_size: 1,
      crew_justification: 'Standard single-person job',
      disposal_cost: 0,
      total_cost: { min: 350, max: 550 }
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
    }
  ];
}

function getOffTopicMessage(category) {
  const messages = {
    vehicles: "🚗 I noticed you uploaded an image of a vehicle. I specialize in home and property maintenance!",
    people: "👋 I see there are people in your photo! I focus on analyzing property maintenance and construction issues.",
    animals: "🐾 Cute! But I specialize in property maintenance, not pet care.",
    electronics: "📱 I noticed electronics in your image. I handle property maintenance and construction projects.",
    food: "🍕 That looks delicious! But I specialize in kitchen renovations and property maintenance.",
    clothing: "👕 I see clothing/fashion items. I focus on home maintenance and construction.",
    entertainment: "🎮 I noticed toys or games. I'm designed for property maintenance and construction estimates."
  };
  return messages[category] || "I specialize in home and property maintenance.";
}

// 🔥 MAIN HANDLER - WITH LOOP PREVENTION
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { images, description, location, service_context, chat_history, force_analysis, skip_clarification } = req.body;

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

    // 🔥 CRITICAL FIX: Count user responses to prevent loops
    const userResponseCount = (chat_history || []).filter(m => m.role === 'user').length;
    const shouldForceAnalysis = force_analysis === true || skip_clarification === true || userResponseCount >= 2;

    console.log('Processing request:', {
      imageCount: images.length,
      descriptionLength: description.length,
      hasServiceContext: !!service_context,
      hasChatHistory: !!chat_history,
      userResponseCount: userResponseCount,
      forceAnalysis: shouldForceAnalysis
    });

    if (shouldForceAnalysis) {
      console.log('🔥 FORCING ANALYSIS - User has provided enough information or reached max clarifications');
    }

    const visionAnnotations = [];
    
    for (let i = 0; i < images.length; i++) {
      try {
        const imageBase64 = images[i].replace(/^data:image\/\w+;base64,/, '');
        
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
            })
          }
        );

        if (!visionResponse.ok) {
          console.error(`Vision API failed for image ${i + 1}:`, visionResponse.status);
          continue;
        }

        const visionData = await visionResponse.json();
        if (visionData.responses && visionData.responses[0]) {
          visionAnnotations.push(visionData.responses[0]);
        }
      } catch (visionError) {
        console.error(`Error processing image ${i + 1}:`, visionError);
        continue;
      }
    }

    console.log(`Processed ${visionAnnotations.length} images successfully`);

    // 🔥 Pass shouldForceAnalysis to Groq function
    const analysis = await analyzeWithGroq(
      description,
      visionAnnotations,
      service_context,
      chat_history,
      shouldForceAnalysis
    );

    // 🔥 FINAL SAFEGUARD: If still needs clarification after 2 rounds, force estimate
    if (analysis.needs_clarification && userResponseCount >= 2) {
      console.log('🔥 EMERGENCY OVERRIDE - Forcing estimate after max clarifications');
      
      return res.status(200).json({
        success: true,
        needs_clarification: false,
        analysis: {
          issue_type: service_context?.title || 'Maintenance Service',
          severity: 'Medium',
          description: `Based on the information provided: ${description.substring(0, 200)}... We recommend scheduling an on-site consultation for a detailed assessment.`,
          required_parts: [],
          difficulty_level: 'Professional',
          crew_size: 1,
          crew_justification: 'Assessment required'
        },
        cost_estimate: {
          parts_cost: { min: 100, max: 400 },
          labor_cost: 300,
          labor_hours: 2,
          crew_size: 1,
          disposal_cost: 0,
          total_cost: { min: 400, max: 700 }
        },
        pricing: [],
        stores: getDefaultStores()
      });
    }

    return res.status(200).json({
      success: true,
      ...analysis
    });

  } catch (error) {
    console.error('API Error:', error);
    console.error('Error stack:', error.stack);

    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
      analysis: {
        issue_type: 'System Error',
        severity: 'Unknown',
        description: 'An error occurred while analyzing your request. Please try again or contact us directly for assistance.'
      },
      cost_estimate: {
        parts_cost: { min: 0, max: 0 },
        labor_cost: 0,
        labor_hours: 0,
        crew_size: 1,
        disposal_cost: 0,
        total_cost: { min: 0, max: 0 }
      },
      pricing: [],
      stores: []
    });
  }
}