// api/analyze-parts.js
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { images, description, location, service_context } = req.body;

    // Validate required fields - now expecting images array
    if (!images || !Array.isArray(images) || images.length === 0 || !description) {
      return res.status(400).json({ 
        error: 'Missing required fields: images (array) and description' 
      });
    }

    // Check payload size
    const payloadSize = JSON.stringify(req.body).length;
    console.log('Payload size:', payloadSize);
    
    if (payloadSize > 4000000) {
      console.log('Payload too large, processing with description only');
      const analysis = await analyzeWithGroq(description, [], service_context);
      return res.status(200).json({
        success: true,
        ...analysis,
        debug_info: { 
          message: "Images too large, analysis based on description only",
          payload_size: payloadSize 
        }
      });
    }

    // Process all images with Vision API
    const visionPromises = images.map(async (imageBase64, index) => {
      let visionData = null;
      let visionError = null;

      // Try Google Cloud Vision API for each image
      try {
        const visionResponse = await fetch(
          `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_CLOUD_VISION_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              requests: [
                {
                  image: {
                    content: imageBase64
                  },
                  features: [
                    { type: 'OBJECT_LOCALIZATION', maxResults: 10 },
                    { type: 'TEXT_DETECTION', maxResults: 5 },
                    { type: 'LABEL_DETECTION', maxResults: 10 }
                  ]
                }
              ]
            })
          }
        );

        if (visionResponse.ok) {
          visionData = await visionResponse.json();
          console.log(`Vision API success for image ${index + 1}`);
        } else {
          visionError = `Vision API error for image ${index + 1}: ${visionResponse.status}`;
          console.error(visionError);
        }
      } catch (error) {
        visionError = `Vision API request failed for image ${index + 1}: ${error.message}`;
        console.error(visionError);
      }

      return {
        index,
        data: visionData?.responses?.[0] || {},
        error: visionError
      };
    });

    const visionResults = await Promise.all(visionPromises);

    // Combine all vision annotations
    const combinedAnnotations = visionResults.map(result => result.data);

    // Process with Groq (enhanced analysis with all images)
    const analysis = await analyzeWithGroq(description, combinedAnnotations, service_context);

    return res.status(200).json({
      success: true,
      ...analysis,
      debug_info: {
        images_processed: images.length,
        vision_results: visionResults.map(r => r.error ? { error: r.error } : { success: true })
      }
    });

  } catch (error) {
    console.error('Analysis error:', error);
    
    // Fallback to basic analysis
    try {
      const fallbackAnalysis = await analyzeWithGroq(req.body.description, [], req.body.service_context);
      return res.status(200).json({
        success: false,
        ...fallbackAnalysis,
        error_message: "Analysis completed with basic processing"
      });
    } catch (fallbackError) {
      // Final fallback to rule-based analysis
      const basicAnalysis = processMaintencanceIssue({}, req.body.description, req.body.service_context);
      return res.status(200).json({
        success: false,
        analysis: basicAnalysis.analysis,
        cost_estimate: basicAnalysis.cost_estimate,
        pricing: [],
        stores: getDefaultStores(),
        error_message: "Analysis completed with basic rules"
      });
    }
  }
}

// Web search function for current pricing using SerpAPI
async function searchCurrentPricing(query, location = "Cabo San Lucas, Mexico") {
  try {
    // Use SerpAPI (easier setup than Bing)
    const searchQuery = `${query} cost price 2024 ${location} installation contractor`;
    const response = await fetch(`https://serpapi.com/search.json?q=${encodeURIComponent(searchQuery)}&api_key=${process.env.SERPAPI_KEY}&num=5`);
    
    if (!response.ok) {
      console.log('SerpAPI search failed, using fallback');
      return { min: null, max: null, source: 'fallback' };
    }
    
    const data = await response.json();
    const searchResults = data.organic_results || [];
    
    // Extract pricing data from search results
    const priceRegex = /\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g;
    const foundPrices = [];
    
    searchResults.forEach(result => {
      const text = `${result.title} ${result.snippet}`.toLowerCase();
      const matches = text.match(priceRegex);
      if (matches) {
        matches.forEach(price => {
          const numPrice = parseInt(price.replace(/[$,]/g, ''));
          // Filter for reasonable construction prices
          if (numPrice >= 100 && numPrice <= 50000) {
            foundPrices.push(numPrice);
          }
        });
      }
    });
    
    if (foundPrices.length > 0) {
      foundPrices.sort((a, b) => a - b);
      // Remove extreme outliers
      const filtered = foundPrices.slice(
        Math.floor(foundPrices.length * 0.1), 
        Math.ceil(foundPrices.length * 0.9)
      );
      
      return {
        min: Math.min(...filtered),
        max: Math.max(...filtered),
        source: 'web_search',
        sample_count: filtered.length
      };
    }
    
    return { min: null, max: null, source: 'no_results' };
    
  } catch (error) {
    console.error('Web search failed:', error);
    return { min: null, max: null, source: 'error' };
  }
}

// Enhanced analysis using Groq with crew size detection and multiple images
async function analyzeWithGroq(description, visionAnnotationsArray = [], serviceContext = null) {
  try {
    // Combine all detected items from all images
    const allDetectedItems = [];
    
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
    });

    // Create comprehensive prompt for Groq with intelligent pricing for Cabo San Lucas
    const prompt = `You are an expert contractor cost estimator for Cabo San Lucas, Mexico. Analyze this maintenance/construction project and provide realistic 2024-2025 pricing in USD.

IMAGES ANALYZED: ${visionAnnotationsArray.length} professional photos were analyzed using computer vision
DESCRIPTION: ${description}
${allDetectedItems.length > 0 ? `DETECTED ITEMS FROM ${visionAnnotationsArray.length} IMAGES: ${allDetectedItems.join(', ')}` : 'Images were uploaded but computer vision did not detect specific items. Base analysis on description.'}
${serviceContext ? `SERVICE CONTEXT: ${serviceContext.title}` : ''}

Analyze and respond with a JSON object containing:
{
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
- Language/communication premium (bilingual contractors charge 10-15% more)

Base your estimates on REAL MARKET CONDITIONS for Cabo San Lucas, Mexico in 2024-2025. Consider the complexity, materials needed, current construction costs, and ALL images provided.`;

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
            content: `You are an expert maintenance and construction cost estimator for Cabo San Lucas, Mexico. You are analyzing ${visionAnnotationsArray.length} images that have been processed by computer vision. Provide accurate, professional analysis in valid JSON format only. Always include crew_size based on job requirements. Base your analysis on the detected items from the images and the user's description. No additional text outside the JSON.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
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

    // Calculate crew-based costs with $100 minimum
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
      disposalCost = 350; // High disposal cost for demolition in Cabo
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
        labor_cost: totalLaborWithOverhead, // Includes $100 overhead
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