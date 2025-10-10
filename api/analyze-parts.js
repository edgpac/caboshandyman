// api/analyze-parts.js - COMPLETE VERSION
// ✅ Working image sizes + Enhanced intelligence

export const config = {
  maxDuration: 60,
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

// 🧠 BRAIN: Vagueness detection
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

  // ✅ RELAXED: Accept anything with 2+ words or any images
  if (desc.split(' ').length >= 2 || imageCount > 0) {
    return { isVague: false };
  }

  return {
    isVague: true,
    reason: 'too_short',
    message: 'Please provide more details'
  };
}

// 🧠 BRAIN: Smart clarification questions
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
  }

  if (serviceContext?.title === 'Emergency Services') {
    questions.unshift("Is this an active emergency right now? (flooding, sparking, gas smell, etc.)");
  }

  return questions.slice(0, 4);
}

// 🧠 BRAIN: Off-topic detection
function checkOffTopic(visionAnnotationsArray, description) {
  const offTopicKeywords = {
    vehicles: ['car', 'automobile', 'vehicle', 'motorcycle', 'bike', 'sedan', 'suv', 'wheel', 'tire'],
    people: ['person', 'face', 'man', 'woman', 'child', 'people', 'selfie', 'portrait'],
    animals: ['dog', 'cat', 'pet', 'animal', 'bird', 'horse', 'fish'],
    electronics: ['phone', 'laptop', 'computer', 'television', 'tv', 'monitor', 'tablet'],
    food: ['food', 'meal', 'restaurant', 'pizza', 'burger', 'dessert'],
    clothing: ['clothing', 'shirt', 'dress', 'shoes', 'fashion']
  };

  const validContextKeywords = [
    'building', 'house', 'home', 'property', 'construction', 'renovation',
    'repair', 'maintenance', 'damage', 'broken', 'leak', 'crack', 'wall',
    'ceiling', 'floor', 'roof', 'door', 'window', 'pipe', 'plumbing',
    'electrical', 'hvac', 'appliance', 'kitchen', 'bathroom', 'toilet',
    'sink', 'faucet', 'valve', 'water heater', 'fixture', 'cabinet'
  ];

  for (const annotations of visionAnnotationsArray) {
    const objects = annotations.localizedObjectAnnotations || [];
    const labels = annotations.labelAnnotations || [];
    
    const allLabelsLower = [...objects.map(o => o.name), ...labels.map(l => l.description)]
      .join(' ').toLowerCase();
    
    const descriptionLower = description.toLowerCase();
    const combinedText = `${allLabelsLower} ${descriptionLower}`;

    const hasValidContext = validContextKeywords.some(keyword => combinedText.includes(keyword));

    if (!hasValidContext) {
      for (const [category, keywords] of Object.entries(offTopicKeywords)) {
        const matchedKeywords = keywords.filter(keyword => allLabelsLower.includes(keyword));
        
        if (matchedKeywords.length >= 2) {
          return {
            isOffTopic: true,
            category,
            message: getOffTopicMessage(category)
          };
        }
      }
    }
  }

  return { isOffTopic: false };
}

function getOffTopicMessage(category) {
  const messages = {
    vehicles: "🚗 I noticed you uploaded an image of a vehicle. I specialize in home and property maintenance!",
    people: "👋 I see there are people in your photo! I focus on property maintenance and construction issues.",
    animals: "🐾 Cute! But I specialize in property maintenance, not pet care.",
    electronics: "📱 I noticed electronics in your image. I handle property maintenance and construction projects.",
    food: "🍕 That looks delicious! But I specialize in kitchen renovations and property maintenance.",
    clothing: "👕 I see clothing/fashion items. I focus on home maintenance and construction."
  };
  return messages[category] || "I specialize in home and property maintenance.";
}

// 🧠 BRAIN: Enhanced Groq analysis
async function analyzeWithGroq(description, visionAnnotationsArray = [], serviceContext = null, chatHistory = null) {
  try {
    const allDetectedItems = [];
    
    // Extract detected items from all images
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

    // 🧠 Check if off-topic
    const offTopicCheck = checkOffTopic(visionAnnotationsArray, description);
    if (offTopicCheck.isOffTopic) {
      console.log(`🚫 Off-topic detected: ${offTopicCheck.category}`);
      return {
        is_off_topic: true,
        off_topic_category: offTopicCheck.category,
        message: offTopicCheck.message,
        analysis: {
          issue_type: 'Off-Topic Request',
          severity: 'N/A',
          description: offTopicCheck.message
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

    // 🧠 Check vagueness (RELAXED)
    const vaguenessCheck = isDescriptionVague(description, visionAnnotationsArray.length);
    
    if (vaguenessCheck.isVague && allDetectedItems.length === 0) {
      console.log(`❓ Vague description: ${vaguenessCheck.reason}`);
      
      const clarificationQuestions = generateSmartQuestions(
        description, 
        allDetectedItems, 
        vaguenessCheck.reason,
        serviceContext
      );
      
      // Still provide basic estimate
      const fallbackEstimate = createSmartFallback(description, serviceContext);
      
      return {
        needs_clarification: true,
        clarification_questions: clarificationQuestions,
        ...fallbackEstimate
      };
    }

    // Build context for Groq
    let chatContext = '';
    if (chatHistory && chatHistory.length > 0) {
      chatContext = '\n\nPREVIOUS CONVERSATION:\n' + chatHistory.map(msg => 
        `${msg.role === 'user' ? 'Customer' : 'AI'}: ${msg.content}`
      ).join('\n');
    }

    const detectedItemsText = allDetectedItems.length > 0 
      ? `DETECTED FROM IMAGES: ${allDetectedItems.slice(0, 10).join(', ')}`
      : `No items detected from images. Base estimate on customer description.`;

    const prompt = `You are an expert contractor cost estimator for Cabo San Lucas, Mexico. Analyze this project and provide realistic 2024-2025 pricing in USD.

DESCRIPTION: "${description}"
${detectedItemsText}
${serviceContext ? `SERVICE CONTEXT: ${serviceContext.title}` : ''}
${chatContext}

IMPORTANT: The customer description is PRIMARY. Image detection is supplementary.

Respond ONLY with valid JSON (no markdown):
{
  "issue_type": "specific category",
  "severity": "High/Medium/Low",
  "description": "detailed analysis",
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

    console.log('🤖 Calling Groq API...');
    
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
            content: 'You are an expert contractor cost estimator. Respond with ONLY valid JSON. Trust customer descriptions.'
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

    // Calculate costs
    const crewSize = Math.max(1, groqAnalysis.crew_size || 1);
    const laborHours = groqAnalysis.labor_hours || 2;
    const baseLaborCost = groqAnalysis.cost_breakdown?.base_labor_cost || 150;
    const laborRate = 80;
    
    const finalLaborCost = Math.max(baseLaborCost * crewSize, laborHours * laborRate * crewSize);
    const travelOverhead = 100;
    const totalLaborWithOverhead = finalLaborCost + travelOverhead;

    // Calculate disposal
    let disposalCost = 0;
    const issueType = groqAnalysis.issue_type || 'Maintenance Issue';
    if (issueType.includes('Demolition')) disposalCost = 350;
    else if (issueType.includes('Water Damage')) disposalCost = 180;
    else if (issueType.includes('Kitchen') || issueType.includes('Bathroom')) disposalCost = 120;

    console.log('✅ Analysis complete');

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
    console.error('❌ Groq error:', error.message);
    return createSmartFallback(description, serviceContext);
  }
}

// Smart fallback for when AI fails
function createSmartFallback(description, serviceContext) {
  const desc = description.toLowerCase();
  let issueType = 'General Maintenance';
  let severity = 'Medium';
  let partsMin = 100;
  let partsMax = 300;
  let laborHours = 2;
  let crewSize = 1;
  let disposalCost = 0;

  if (desc.includes('toilet') && (desc.includes('flush') || desc.includes('valve'))) {
    issueType = 'Toilet Flush Valve Replacement';
    partsMin = 30;
    partsMax = 80;
    laborHours = 1;
    severity = 'Low';
  } 
  else if (desc.includes('toilet')) {
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

  const laborCost = (laborHours * 80 * crewSize) + 100;
  
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
      crew_justification: 'Standard repair'
    },
    cost_estimate: {
      parts_cost: { min: partsMin, max: partsMax },
      labor_cost: laborCost,
      labor_hours: laborHours,
      crew_size: crewSize,
      crew_justification: 'Standard repair',
      disposal_cost: disposalCost,
      total_cost: { 
        min: partsMin + laborCost + disposalCost, 
        max: partsMax + laborCost + disposalCost 
      }
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

// ✅ MAIN HANDLER - Preserves exact working image flow
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

    // Validate inputs
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

    // ✅ WORKING IMAGE VALIDATION (from document 4)
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

    console.log('🔄 Processing:', {
      images: images.length,
      description: description.substring(0, 50),
      imageSizes: images.map(img => `${Math.round(img.length * 0.75 / 1024)}KB`)
    });

    // ✅ WORKING IMAGE PROCESSING (from document 4)
    const visionAnnotations = [];
    let visionErrors = 0;
    
    for (let i = 0; i < images.length; i++) {
      try {
        // Extract clean base64 (Vision API doesn't want the data URI prefix)
        let imageBase64 = images[i];
        
        // Remove data URI prefix if present
        if (imageBase64.includes('base64,')) {
          imageBase64 = imageBase64.split('base64,')[1];
        } else if (imageBase64.startsWith('data:')) {
          console.error(`Image ${i + 1}: Invalid data URI format`);
          visionErrors++;
          continue;
        }
        
        // Validate base64
        if (!imageBase64 || imageBase64.length < 100) {
          console.error(`Image ${i + 1}: Base64 string too short or empty`);
          visionErrors++;
          continue;
        }
        
        console.log(`📸 Processing image ${i + 1}/${images.length} (${Math.round(imageBase64.length * 0.75 / 1024)}KB)...`);
        
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
              console.error(`⚠️ Vision API error for image ${i + 1}:`, visionData.responses[0].error);
              visionErrors++;
            } else {
              visionAnnotations.push(visionData.responses[0]);
              console.log(`✅ Image ${i + 1} processed successfully`);
            }
          }
        } else {
          const errorText = await visionResponse.text().catch(() => 'Unknown error');
          console.error(`⚠️ Vision API HTTP ${visionResponse.status} for image ${i + 1}:`, errorText);
          visionErrors++;
        }
      } catch (visionError) {
        console.error(`❌ Error processing image ${i + 1}:`, visionError.message);
        visionErrors++;
      }
    }

    console.log(`Vision: ${visionAnnotations.length} success, ${visionErrors} errors`);

    // ALWAYS attempt Groq analysis with 🧠 BRAIN
    const analysis = await analyzeWithGroq(
      description,
      visionAnnotations,
      service_context,
      chat_history
    );

    const processingTime = Date.now() - startTime;
    console.log(`⏱️ Total: ${processingTime}ms`);

    return res.status(200).json({
      success: true,
      processing_time_ms: processingTime,
      vision_success_count: visionAnnotations.length,
      vision_error_count: visionErrors,
      vision_note: visionAnnotations.length === 0 ? 'Estimate based on description only' : null,
      ...analysis
    });

  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('❌ Handler error:', error.message);

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