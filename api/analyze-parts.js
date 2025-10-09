// /api/analyze-parts.js - Mobile-Optimized Version

// ✅ ADD: Request size validator
function validateRequestSize(images) {
  const totalSize = JSON.stringify(images).length;
  const sizeMB = (totalSize / (1024 * 1024)).toFixed(2);
  
  console.log(`📦 Request payload size: ${sizeMB}MB`);
  
  if (totalSize > 10 * 1024 * 1024) { // 10MB limit
    throw new Error(`Request too large: ${sizeMB}MB. Please use fewer or smaller images.`);
  }
  
  return sizeMB;
}

// ✅ IMPROVED: Parallel Vision API calls with timeout
async function processImagesWithTimeout(images, timeoutMs = 30000) {
  const visionAnnotations = [];
  
  // Process images in parallel with timeout
  const imagePromises = images.map(async (imageData, index) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    try {
      const imageBase64 = imageData.replace(/^data:image\/\w+;base64,/, '');
      
      console.log(`🔍 Processing image ${index + 1}/${images.length}...`);
      
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
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);

      if (!visionResponse.ok) {
        console.error(`❌ Vision API failed for image ${index + 1}:`, visionResponse.status);
        return null;
      }

      const visionData = await visionResponse.json();
      console.log(`✅ Image ${index + 1} processed successfully`);
      return visionData.responses?.[0] || null;
      
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        console.error(`⏱️ Vision API timeout for image ${index + 1}`);
      } else {
        console.error(`❌ Error processing image ${index + 1}:`, error.message);
      }
      return null;
    }
  });

  // Wait for all images to process (or fail)
  const results = await Promise.all(imagePromises);
  
  // Filter out failed images
  results.forEach(result => {
    if (result) visionAnnotations.push(result);
  });
  
  if (visionAnnotations.length === 0) {
    throw new Error('All images failed to process. Please try again with different images.');
  }
  
  console.log(`✅ Successfully processed ${visionAnnotations.length}/${images.length} images`);
  return visionAnnotations;
}

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

// Generate smart clarification questions
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

// ✅ IMPROVED: Reduced token usage for mobile
async function analyzeWithGroq(description, visionAnnotationsArray = [], serviceContext = null, chatHistory = null) {
  try {
    const allDetectedItems = [];
    let offTopicDetected = false;
    let offTopicReason = '';
    
    const offTopicKeywords = {
      vehicles: ['car', 'automobile', 'vehicle', 'motorcycle', 'wheel', 'tire'],
      people: ['person', 'face', 'selfie', 'portrait'],
      animals: ['dog', 'cat', 'pet', 'animal'],
      electronics: ['phone', 'laptop', 'computer', 'television', 'gaming'],
      food: ['food', 'meal', 'restaurant', 'pizza'],
    };

    const validContextKeywords = [
      'building', 'house', 'home', 'repair', 'maintenance', 'damage', 'leak',
      'wall', 'ceiling', 'floor', 'roof', 'door', 'window', 'pipe', 'plumbing',
      'electrical', 'kitchen', 'bathroom', 'installation'
    ];
    
    visionAnnotationsArray.forEach((annotations, imageIndex) => {
      const objects = annotations.localizedObjectAnnotations || [];
      const labels = annotations.labelAnnotations || [];

      // ✅ Only take top 3 items per image to reduce token usage
      const imageItems = [
        ...objects.slice(0, 2).map(obj => obj.name),
        ...labels.slice(0, 3).map(label => label.description)
      ].filter(Boolean);

      allDetectedItems.push(...imageItems);

      const allLabelsLower = imageItems.join(' ').toLowerCase();
      const descriptionLower = description.toLowerCase();
      const combinedText = `${allLabelsLower} ${descriptionLower}`;

      const hasValidContext = validContextKeywords.some(keyword => combinedText.includes(keyword));

      if (!hasValidContext && !offTopicDetected) {
        for (const [category, keywords] of Object.entries(offTopicKeywords)) {
          const matchedKeywords = keywords.filter(keyword => allLabelsLower.includes(keyword));
          
          if (matchedKeywords.length >= 2) {
            offTopicDetected = true;
            offTopicReason = category;
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
          total_cost: { min: 0, max: 0 }
        }
      };
    }

    const vaguenessCheck = isDescriptionVague(description, visionAnnotationsArray.length);
    
    if (vaguenessCheck.isVague) {
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
          vagueness_reason: vaguenessCheck.reason
        }
      };
    }

    // ✅ Simplified chat context for mobile
    let chatContext = '';
    if (chatHistory && chatHistory.length > 0) {
      const recentChats = chatHistory.slice(-4); // Only last 4 messages
      chatContext = '\n\nRecent conversation:\n' + recentChats.map(msg => 
        `${msg.role}: ${msg.content.substring(0, 150)}`
      ).join('\n');
    }

    // ✅ Shorter prompt for mobile
    const detectedSummary = allDetectedItems.length > 0 
      ? allDetectedItems.slice(0, 8).join(', ') 
      : 'No specific items detected';

    const prompt = `Analyze this maintenance project for Cabo San Lucas, Mexico (2024-2025 USD pricing):

DESCRIPTION: ${description}
DETECTED: ${detectedSummary}
${serviceContext ? `SERVICE: ${serviceContext.title}` : ''}${chatContext}

JSON response:
{
  "issue_type": "category",
  "severity": "High/Medium/Low",
  "description": "brief analysis",
  "required_parts": [{"name": "part", "quantity": 1, "estimated_cost": 100}],
  "difficulty_level": "Professional/Expert/Skilled",
  "crew_size": 1,
  "labor_hours": 4,
  "cost_breakdown": {
    "parts_min": 200,
    "parts_max": 800,
    "base_labor_cost": 300
  }
}`;

    console.log(`📤 Sending to Groq (prompt length: ${prompt.length} chars)`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s timeout

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
            content: `Expert maintenance estimator. Respond in valid JSON only.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error('❌ Groq error response:', errorText);
      throw new Error(`Groq API failed: ${groqResponse.status} - ${errorText.substring(0, 200)}`);
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
      console.error('JSON parse error:', parseError);
      throw new Error('Invalid JSON from Groq');
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
    }

    return {
      needs_clarification: false,
      analysis: {
        issue_type: groqAnalysis.issue_type || 'Maintenance Issue',
        severity: groqAnalysis.severity || 'Medium',
        description: groqAnalysis.description || description,
        required_parts: groqAnalysis.required_parts || [],
        difficulty_level: groqAnalysis.difficulty_level || 'Professional',
        crew_size: crewSize
      },
      cost_estimate: {
        parts_cost: {
          min: groqAnalysis.cost_breakdown?.parts_min || 50,
          max: groqAnalysis.cost_breakdown?.parts_max || 200
        },
        labor_cost: totalLaborWithOverhead,
        labor_hours: laborHours,
        crew_size: crewSize,
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
    console.error('❌ Groq analysis failed:', error);
    
    // Return fallback instead of throwing
    return {
      needs_clarification: false,
      analysis: {
        issue_type: 'Maintenance Issue Detected',
        severity: 'Medium',
        description: description || 'Please contact us for a detailed assessment',
        required_parts: [],
        difficulty_level: 'Professional',
        crew_size: 1
      },
      cost_estimate: {
        parts_cost: { min: 100, max: 300 },
        labor_cost: 280,
        labor_hours: 2,
        crew_size: 1,
        disposal_cost: 0,
        total_cost: { min: 380, max: 580 }
      },
      pricing: [],
      stores: getDefaultStores(),
      fallback_used: true
    };
  }
}

function getDefaultStores() {
  return [
    {
      name: "The Home Depot Cabo San Lucas",
      address: "Carr. Transpeninsular Km 4.5",
      rating: 4.3
    }
  ];
}

function getOffTopicMessage(category) {
  const messages = {
    vehicles: "🚗 I noticed a vehicle. I specialize in home maintenance!",
    people: "👋 I focus on property maintenance issues.",
    animals: "🐾 Cute! But I handle property maintenance.",
    electronics: "📱 I handle property maintenance projects.",
    food: "🍕 I specialize in kitchen renovations!"
  };
  return messages[category] || "I specialize in home maintenance.";
}

// 🆕 MAIN HANDLER
export default async function handler(req, res) {
  // ✅ CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ✅ CHECK ENVIRONMENT VARIABLES FIRST
  if (!process.env.GOOGLE_CLOUD_VISION_API_KEY) {
    console.error('❌ GOOGLE_CLOUD_VISION_API_KEY not configured');
    return res.status(500).json({
      success: false,
      error: 'Vision API not configured. Please contact support.',
      analysis: {
        issue_type: 'Configuration Error',
        severity: 'High',
        description: 'AI vision service is not properly configured.'
      },
      cost_estimate: {
        parts_cost: { min: 0, max: 0 },
        labor_cost: 0,
        total_cost: { min: 0, max: 0 }
      }
    });
  }

  if (!process.env.GROQ_API_KEY) {
    console.error('❌ GROQ_API_KEY not configured');
    return res.status(500).json({
      success: false,
      error: 'AI analysis service not configured. Please contact support.',
      analysis: {
        issue_type: 'Configuration Error',
        severity: 'High',
        description: 'AI analysis service is not properly configured.'
      },
      cost_estimate: {
        parts_cost: { min: 0, max: 0 },
        labor_cost: 0,
        total_cost: { min: 0, max: 0 }
      }
    });
  }

  const startTime = Date.now();

  try {
    const { images, description, location, service_context, chat_history } = req.body;

    console.log('📥 Request received:', {
      imageCount: images?.length || 0,
      descriptionLength: description?.length || 0,
      hasServiceContext: !!service_context,
      hasChatHistory: !!chat_history,
      timestamp: new Date().toISOString()
    });

    // ✅ Validation
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

    // ✅ Check request size
    const sizeMB = validateRequestSize(images);

    // ✅ Process images in parallel with timeout
    const visionAnnotations = await processImagesWithTimeout(images, 30000);

    console.log(`✅ Vision processing complete (${Date.now() - startTime}ms)`);

    // ✅ Analyze with Groq
    const analysis = await analyzeWithGroq(
      description,
      visionAnnotations,
      service_context,
      chat_history
    );

    const totalTime = Date.now() - startTime;
    console.log(`✅ Total processing time: ${totalTime}ms (${(totalTime/1000).toFixed(1)}s)`);

    return res.status(200).json({
      success: true,
      ...analysis,
      metadata: {
        processing_time_ms: totalTime,
        images_processed: visionAnnotations.length,
        request_size_mb: sizeMB
      }
    });

  } catch (error) {
    const totalTime = Date.now() - startTime;
    console.error('💥 API Error:', error.message);
    console.error('Error stack:', error.stack);

    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
      analysis: {
        issue_type: 'System Error',
        severity: 'Unknown',
        description: 'An error occurred. Please try again with fewer or smaller images.'
      },
      cost_estimate: {
        parts_cost: { min: 0, max: 0 },
        labor_cost: 0,
        total_cost: { min: 0, max: 0 }
      },
      metadata: {
        processing_time_ms: totalTime,
        failed: true
      }
    });
  }
}