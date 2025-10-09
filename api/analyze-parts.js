// api/analyze-parts.js - FIXED VERSION
// Restores reliable estimation while keeping improvements

export const config = {
  maxDuration: 60,
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

// RELAXED vagueness detection - only catch extreme cases
function isDescriptionVague(description, imageCount) {
  const desc = description.toLowerCase().trim();
  
  // Only reject if EXTREMELY vague (single word with no context)
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

  // Accept anything with 2+ words or any images
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
    questions.unshift(`I can see ${detectedItems.slice(0,2).join(', ')} - which needs work?`);
  }
  
  return questions.slice(0, 3);
}

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

    // RELAXED vagueness check
    const vaguenessCheck = isDescriptionVague(description, visionAnnotationsArray.length);
    
    // Only ask for clarification in extreme cases
    if (vaguenessCheck.isVague && allDetectedItems.length === 0) {
      console.log(`Very vague description: ${vaguenessCheck.reason}`);
      
      const clarificationQuestions = generateSmartQuestions(
        description, 
        allDetectedItems, 
        vaguenessCheck.reason,
        serviceContext
      );
      
      // Still provide a basic estimate
      const fallbackEstimate = createSmartFallback(description, serviceContext);
      
      return {
        needs_clarification: true,
        clarification_questions: clarificationQuestions,
        ...fallbackEstimate // Include estimate even when asking questions
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
      : `No items detected from images. Using customer description.`;

    const prompt = `You are an expert contractor cost estimator for Cabo San Lucas, Mexico. Analyze this project and provide realistic 2024-2025 pricing in USD.

DESCRIPTION: "${description}"
${detectedItemsText}
${serviceContext ? `SERVICE CONTEXT: ${serviceContext.title}` : ''}
${chatContext}

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
    
    // ALWAYS provide fallback estimate
    return createSmartFallback(description, serviceContext);
  }
}

function createSmartFallback(description, serviceContext) {
  const desc = description.toLowerCase();
  let issueType = 'General Maintenance';
  let severity = 'Medium';
  let partsMin = 100;
  let partsMax = 300;
  let laborHours = 2;
  let crewSize = 1;
  let disposalCost = 0;

  // Toilet-specific
  if (desc.includes('toilet') && (desc.includes('flush') || desc.includes('valve'))) {
    issueType = 'Toilet Flush Valve Replacement';
    partsMin = 30;
    partsMax = 80;
    laborHours = 1;
    severity = 'Low';
  } 
  // General toilet
  else if (desc.includes('toilet')) {
    issueType = 'Toilet Repair';
    partsMin = 50;
    partsMax = 150;
    laborHours = 1.5;
  }
  // Plumbing
  else if (desc.includes('pipe') || desc.includes('plumb') || desc.includes('leak')) {
    issueType = 'Plumbing Repair';
    partsMin = 80;
    partsMax = 250;
    laborHours = 2;
    severity = 'High';
  }
  // Electrical
  else if (desc.includes('electrical') || desc.includes('outlet') || desc.includes('switch')) {
    issueType = 'Electrical Repair';
    partsMin = 40;
    partsMax = 150;
    laborHours = 1.5;
    severity = 'High';
  }
  // Faucet
  else if (desc.includes('faucet') || desc.includes('tap')) {
    issueType = 'Faucet Repair';
    partsMin = 60;
    partsMax = 180;
    laborHours = 1.5;
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

    console.log('🔄 Processing:', {
      images: images.length,
      description: description.substring(0, 50)
    });

    // REMOVED STRICT FORMAT VALIDATION - Process all images
    const visionAnnotations = [];
    let visionErrors = 0;
    
    for (let i = 0; i < images.length; i++) {
      try {
        const imageBase64 = images[i].replace(/^data:image\/\w+;base64,/, '');
        
        console.log(`📸 Processing image ${i + 1}/${images.length}...`);
        
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
            // Add timeout
            signal: AbortSignal.timeout(10000)
          }
        );

        if (visionResponse.ok) {
          const visionData = await visionResponse.json();
          
          if (visionData.responses && visionData.responses[0]) {
            if (!visionData.responses[0].error) {
              visionAnnotations.push(visionData.responses[0]);
              console.log(`✅ Image ${i + 1} processed`);
            } else {
              console.warn(`⚠️ Vision API error for image ${i + 1}`);
              visionErrors++;
            }
          }
        } else {
          console.warn(`⚠️ Vision API failed for image ${i + 1}: ${visionResponse.status}`);
          visionErrors++;
        }
      } catch (visionError) {
        console.error(`❌ Error processing image ${i + 1}:`, visionError.message);
        visionErrors++;
        // Continue processing - don't fail entire request
      }
    }

    console.log(`Vision: ${visionAnnotations.length} success, ${visionErrors} errors`);

    // ALWAYS attempt Groq analysis - even with 0 vision results
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
      ...analysis
    });

  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('❌ Handler error:', error.message);

    // ALWAYS return a usable estimate, even on error
    const emergencyFallback = createSmartFallback(
      req.body.description || 'Maintenance issue',
      req.body.service_context
    );

    return res.status(200).json({ // Return 200, not 500
      success: false,
      error: 'Analysis completed with limited information',
      processing_time_ms: processingTime,
      ...emergencyFallback
    });
  }
}