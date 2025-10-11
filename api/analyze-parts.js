// api/analyze-parts.js - COMPLETE VERSION WITH $100 SERVICE CALL LOGIC
// Robust image processing with Vision API error handling + Smart pricing for quick tasks

export const config = {
  maxDuration: 60,
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

// ========================================
// QUICK TASK DETECTION - $100 SERVICE CALL
// ========================================

const quickTaskKeywords = [
  // Plumbing quick fixes (under 30 min)
  'flush valve', 'flapper', 'toilet seat', 'toilet paper holder', 'towel bar',
  'showerhead', 'handheld sprayer', 'faucet aerator', 'leaky washer',
  'door knob', 'door handle', 'cabinet knob', 'drawer pull',
  
  // Electrical quick fixes (under 30 min)
  'light switch', 'outlet cover', 'smoke detector battery', 'co alarm battery',
  'light fixture', 'ceiling light', 'thermostat cover', 'doorbell button',
  
  // Hardware quick fixes (under 30 min)
  'door stopper', 'hinge pin', 'weatherstripping', 'window screen',
  'curtain rod', 'blind', 'shade', 'picture frame', 'mirror', 'coat rack',
  
  // Small maintenance (under 30 min)
  'air vent cover', 'hvac filter', 'range hood filter', 'door sweep',
  'mailbox', 'house numbers', 'shelf', 'hook'
];

function isQuickTask(description, issueType) {
  const lower = description.toLowerCase();
  const issueTypeLower = (issueType || '').toLowerCase();
  
  // Check if any quick task keywords match
  const hasQuickTaskKeyword = quickTaskKeywords.some(keyword => 
    lower.includes(keyword) || issueTypeLower.includes(keyword)
  );
  
  // Exclude if it's complex/major work
  const isComplex = /multiple|several|many|complex|major|install new|replace entire|demo|demolition|renovation/i.test(lower);
  
  // Exclude plumbing/electrical if it mentions "install" (vs "replace")
  const isInstallation = /install\s+(?:new|a)\s+(?:toilet|sink|faucet|outlet|switch)/i.test(lower);
  
  return hasQuickTaskKeyword && !isComplex && !isInstallation;
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
    questions.unshift(`I can see ${detectedItems.slice(0,2).join(', ')} - which needs work?`);
  }
  
  return questions.slice(0, 3);
}

// ========================================
// GROQ ANALYSIS WITH QUICK TASK DETECTION
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

    // Build context
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

IMPORTANT PRICING RULES:
1. If this is a QUICK TASK (under 30 minutes) like replacing a door knob, toilet seat, light switch, cabinet hardware, etc., set labor_hours to 0.5 and base_labor_cost to 0 (it falls under the $100 service call).
2. For BIGGER JOBS (over 30 minutes), calculate normal labor at $80/hour + $100 service call overhead.
3. The customer description is the PRIMARY source. Image detection is supplementary.

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
  "is_quick_task": false,
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
            content: 'You are an expert contractor cost estimator. Respond with ONLY valid JSON. Detect quick tasks (under 30 min) accurately.'
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

    // ========================================
    // SMART COST CALCULATION WITH QUICK TASK LOGIC
    // ========================================
    
    const issueType = groqAnalysis.issue_type || 'Maintenance Issue';
    const crewSize = Math.max(1, groqAnalysis.crew_size || 1);
    const laborHours = groqAnalysis.labor_hours || 2;
    
    // Check if this is a quick task (either from Groq or our own detection)
    const isQuick = groqAnalysis.is_quick_task || isQuickTask(description, issueType);
    
    let costEstimate;
    
    if (isQuick) {
      // ✅ QUICK TASK - Falls under $100 service call
      const partsMin = groqAnalysis.cost_breakdown?.parts_min || 10;
      const partsMax = groqAnalysis.cost_breakdown?.parts_max || 50;
      
      costEstimate = {
        service_call_fee: 100,
        parts_cost: {
          min: partsMin,
          max: partsMax
        },
        labor_hours: 0.5,
        crew_size: 1,
        crew_justification: 'Quick task - 1 person can handle',
        disposal_cost: 0,
        total_cost: {
          min: 100 + partsMin,
          max: 100 + partsMax
        },
        pricing_note: `✨ Great news! This is a quick task that falls under our $100 service call, which includes diagnosis and the first 30 minutes of work. Only materials are additional.`
      };
    } else {
      // 🔧 BIGGER JOB - Standard pricing
      const baseLaborCost = groqAnalysis.cost_breakdown?.base_labor_cost || 150;
      const laborRate = 80;
      
      const finalLaborCost = Math.max(baseLaborCost * crewSize, laborHours * laborRate * crewSize);
      const serviceCallFee = 100; // Drive time + overhead
      const totalLaborWithOverhead = finalLaborCost + serviceCallFee;

      // Calculate disposal
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
        pricing_note: `$100 service call includes diagnosis + first 30 minutes of work. If you approve, it applies to your total. You only pay for actual hours worked - finish early and you save!`
      };
    }

    console.log('✅ Analysis complete', isQuick ? '(Quick Task)' : '(Standard Job)');

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
        is_quick_task: isQuick
      },
      cost_estimate: costEstimate,
      pricing: [],
      stores: getDefaultStores()
    };

  } catch (error) {
    console.error('❌ Groq error:', error.message);
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
      service_call_fee: 100,
      parts_cost: { min: partsMin, max: partsMax },
      labor_cost: 0,
      labor_hours: 0.5,
      crew_size: 1,
      crew_justification: 'Quick task - 1 person',
      disposal_cost: 0,
      total_cost: { 
        min: 100 + partsMin, 
        max: 100 + partsMax 
      },
      pricing_note: `✨ Great news! This is a quick task that falls under our $100 service call (includes diagnosis + first 30 min). Only materials are additional!`
    };
  } else {
    const laborCost = (laborHours * 80 * crewSize) + 100;
    costEstimate = {
      service_call_fee: 100,
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
      pricing_note: `$100 service call includes diagnosis + first 30 min. You pay actual hours only - finish early and save!`
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

    console.log('🔄 Processing:', {
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
      vision_note: visionAnnotations.length === 0 ? 'Estimate based on description only - image analysis unavailable' : null,
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