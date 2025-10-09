// /api/analyze-parts.js - Fixed Version (Removed duplicate supportedFormats declaration)

export const config = {
  maxDuration: 60,
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

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

async function analyzeWithGroq(description, visionAnnotationsArray = [], serviceContext = null, chatHistory = null) {
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
      'fixture', 'cabinet', 'countertop', 'tile', 'paint', 'drywall', 'toilet',
      'sink', 'faucet', 'valve', 'water heater', 'furnace'
    ];
    
    if (visionAnnotationsArray && visionAnnotationsArray.length > 0) {
      visionAnnotationsArray.forEach((annotations, imageIndex) => {
        if (!annotations || typeof annotations !== 'object') return;
        
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
              console.log(`Off-topic detected: ${category}`);
              break;
            }
          }
        }
      });
    }

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

    const vaguenessCheck = isDescriptionVague(description, visionAnnotationsArray.length);
    
    if (vaguenessCheck.isVague) {
      console.log(`Vague description: ${vaguenessCheck.reason}`);
      
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

    let chatContext = '';
    if (chatHistory && chatHistory.length > 0) {
      chatContext = '\n\nPREVIOUS CONVERSATION:\n' + chatHistory.map(msg => 
        `${msg.role === 'user' ? 'Customer' : 'AI'}: ${msg.content}`
      ).join('\n');
    }

    const detectedItemsText = allDetectedItems.length > 0 
      ? `DETECTED FROM IMAGES: ${allDetectedItems.join(', ')}`
      : `NOTE: Images analyzed but no specific items detected. Relying on customer description.`;

    const prompt = `You are an expert contractor cost estimator for Cabo San Lucas, Mexico. Analyze this maintenance/construction project and provide realistic 2024-2025 pricing in USD.

DESCRIPTION: "${description}"
${detectedItemsText}
${serviceContext ? `SERVICE CONTEXT: ${serviceContext.title}` : ''}
${chatContext}

CRITICAL: The customer provided a specific description: "${description}". Even if computer vision didn't detect items, trust the customer's description and provide a complete analysis.

Respond ONLY with valid JSON (no markdown, no code blocks):
{
  "needs_clarification": false,
  "issue_type": "specific category",
  "severity": "High/Medium/Low",
  "description": "detailed analysis of the issue",
  "required_parts": [{"name": "part name", "quantity": 1, "estimated_cost": 100}],
  "difficulty_level": "Professional/Expert Required/Skilled Handyperson",
  "crew_size": 1,
  "crew_justification": "why this crew size",
  "labor_hours": 2,
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
            content: 'You are an expert maintenance and construction cost estimator for Cabo San Lucas, Mexico. Always respond with ONLY valid JSON. Never use markdown code blocks. Trust the customer description even if computer vision failed.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1200,
        response_format: { type: "json_object" }
      })
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error('Groq API Error:', groqResponse.status, errorText);
      throw new Error(`Groq API failed: ${groqResponse.status}`);
    }

    const groqData = await groqResponse.json();
    const groqContent = groqData.choices[0]?.message?.content;

    if (!groqContent) {
      throw new Error('No content from Groq API');
    }

    console.log('Groq response received, parsing...');

    let groqAnalysis;
    try {
      const cleanedContent = groqContent.replace(/```json\n?|\n?```/g, '').trim();
      groqAnalysis = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Content:', groqContent.substring(0, 200));
      throw new Error('Invalid JSON from Groq');
    }

    if (groqAnalysis.needs_clarification === true) {
      return {
        needs_clarification: true,
        clarification_questions: groqAnalysis.clarification_questions || [
          "Can you provide more details about the scope of work?"
        ],
        preliminary_info: groqAnalysis.preliminary_info || {},
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

    console.log('Analysis complete successfully');

    return {
      needs_clarification: false,
      analysis: {
        issue_type: groqAnalysis.issue_type || 'Maintenance Issue',
        severity: groqAnalysis.severity || 'Medium',
        description: groqAnalysis.description || description,
        required_parts: groqAnalysis.required_parts || [],
        difficulty_level: groqAnalysis.difficulty_level || 'Professional',
        crew_size: crewSize,
        crew_justification: groqAnalysis.crew_justification || `${crewSize} person job`
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
    console.error('❌ Groq analysis error:', error.message);
    
    const fallback = createSmartFallback(description, serviceContext);
    return fallback;
  }
}

function createSmartFallback(description, serviceContext) {
  const desc = description.toLowerCase();
  let issueType = 'General Maintenance';
  let severity = 'Medium';
  let partsMin = 100;
  let partsMax = 300;
  let laborHours = 2;
  let requiredParts = [];

  if (desc.includes('toilet') && desc.includes('flush')) {
    issueType = 'Toilet Flush Valve Replacement';
    partsMin = 30;
    partsMax = 80;
    laborHours = 1;
    severity = 'Low';
    requiredParts = [
      { name: 'Toilet flush valve kit', quantity: 1, estimated_cost: 50 }
    ];
  } else if (desc.includes('toilet')) {
    issueType = 'Toilet Repair';
    partsMin = 50;
    partsMax = 150;
    laborHours = 1.5;
  } else if (desc.includes('faucet') || desc.includes('tap')) {
    issueType = 'Faucet Repair/Replacement';
    partsMin = 60;
    partsMax = 180;
    laborHours = 1.5;
  } else if (desc.includes('pipe') || desc.includes('plumbing')) {
    issueType = 'Plumbing Repair';
    partsMin = 80;
    partsMax = 250;
    laborHours = 2;
    severity = 'High';
  } else if (desc.includes('electrical') || desc.includes('outlet') || desc.includes('switch')) {
    issueType = 'Electrical Repair';
    partsMin = 40;
    partsMax = 150;
    laborHours = 1.5;
    severity = 'High';
  } else if (desc.includes('leak')) {
    issueType = 'Leak Repair';
    partsMin = 70;
    partsMax = 200;
    laborHours = 2;
    severity = 'High';
  }

  const laborCost = (laborHours * 80) + 100;
  
  return {
    needs_clarification: false,
    analysis: {
      issue_type: issueType,
      severity: severity,
      description: `Based on your description: "${description}". Professional assessment recommended for accurate diagnosis.`,
      required_parts: requiredParts,
      difficulty_level: 'Professional',
      crew_size: 1,
      crew_justification: 'Standard single-person repair'
    },
    cost_estimate: {
      parts_cost: { min: partsMin, max: partsMax },
      labor_cost: laborCost,
      labor_hours: laborHours,
      crew_size: 1,
      crew_justification: 'Standard single-person repair',
      disposal_cost: 0,
      total_cost: { min: partsMin + laborCost, max: partsMax + laborCost }
    },
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
    const { images, description, location, service_context, chat_history, device_type, platform } = req.body;

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

    // Validate image formats (SINGLE DECLARATION)
    const supportedFormats = ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'tif', 'ico'];
    const unsupportedImages = [];
    
    images.forEach((img, idx) => {
      const formatMatch = img.match(/^data:image\/(\w+);base64,/);
      const format = formatMatch ? formatMatch[1].toLowerCase() : 'unknown';
      if (!supportedFormats.includes(format)) {
        unsupportedImages.push({ index: idx + 1, format });
      }
    });
    
    if (unsupportedImages.length === images.length) {
      return res.status(400).json({
        success: false,
        error: `Unsupported image format(s). Please use: JPEG, PNG, GIF, BMP, WEBP, or TIFF.`,
        unsupported_formats: unsupportedImages,
        supported_formats: supportedFormats,
        hint: 'If using iPhone, convert HEIC images to JPEG before uploading.'
      });
    }

    console.log('🔄 Request:', {
      images: images.length,
      description: description.substring(0, 50),
      device: device_type || 'unknown'
    });

    const visionAnnotations = [];
    let visionErrors = 0;
    
    // Process each image with Vision API
    for (let i = 0; i < images.length; i++) {
      try {
        // Extract format from data URI
        const formatMatch = images[i].match(/^data:image\/(\w+);base64,/);
        const imageFormat = formatMatch ? formatMatch[1].toLowerCase() : null;
        
        // Check if format is supported
        if (!imageFormat || !supportedFormats.includes(imageFormat)) {
          console.warn(`⚠️ Image ${i + 1} format "${imageFormat}" not supported by Vision API. Supported: ${supportedFormats.join(', ')}`);
          visionErrors++;
          continue;
        }
        
        const imageBase64 = images[i].replace(/^data:image\/\w+;base64,/, '');
        
        // Check base64 size (approximate MB = base64.length * 0.75 / 1024 / 1024)
        const estimatedSizeMB = (imageBase64.length * 0.75) / (1024 * 1024);
        if (estimatedSizeMB > 10) {
          console.warn(`⚠️ Image ${i + 1} too large: ~${estimatedSizeMB.toFixed(1)}MB. Vision API recommends <10MB for base64.`);
          visionErrors++;
          continue;
        }
        
        console.log(`📸 Processing image ${i + 1}/${images.length} (${imageFormat}, ~${estimatedSizeMB.toFixed(1)}MB)...`);
        
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
          console.error(`❌ Vision API failed for image ${i + 1}:`, visionResponse.status);
          visionErrors++;
          continue;
        }

        const visionData = await visionResponse.json();
        
        if (visionData.responses && visionData.responses[0]) {
          if (visionData.responses[0].error) {
            console.error(`❌ Vision API error for image ${i + 1}:`, visionData.responses[0].error);
            visionErrors++;
            continue;
          }
          visionAnnotations.push(visionData.responses[0]);
          console.log(`✅ Image ${i + 1} processed`);
        } else {
          console.warn(`⚠️ No response for image ${i + 1}`);
          visionErrors++;
        }
      } catch (visionError) {
        console.error(`❌ Error processing image ${i + 1}:`, visionError.message);
        visionErrors++;
      }
    }

    console.log(`Vision API: ${visionAnnotations.length}/${images.length} successful, ${visionErrors} errors`);

    const analysis = await analyzeWithGroq(
      description,
      visionAnnotations,
      service_context,
      chat_history
    );

    const processingTime = Date.now() - startTime;
    console.log(`⏱️ Total time: ${processingTime}ms`);

    return res.status(200).json({
      success: true,
      processing_time_ms: processingTime,
      vision_success_count: visionAnnotations.length,
      vision_error_count: visionErrors,
      ...analysis
    });

  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('❌ Handler error:', error.message);
    console.error('Stack:', error.stack);

    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
      processing_time_ms: processingTime,
      analysis: {
        issue_type: 'System Error',
        severity: 'Unknown',
        description: 'Unable to process your request. Please try again or contact support.'
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
      stores: getDefaultStores()
    });
  }
}