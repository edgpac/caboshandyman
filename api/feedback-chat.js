// api/feedback-chat.js - POST-ESTIMATE FEEDBACK CHAT WITH WORK ORDER LOOKUP

export const config = {
  maxDuration: 30,
  api: {
    bodyParser: {
      sizeLimit: '1mb'
    }
  }
};

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

  try {
    const { question, analysis, history, service_context } = req.body;

    if (!question) {
      return res.status(400).json({ 
        error: 'Question is required' 
      });
    }

    // Check if question is about work order status
    const workOrderKeywords = /work\s*order|order\s*status|order\s*#|pending|scheduled|my\s*order|check\s*status/i;
    const isWorkOrderQuery = workOrderKeywords.test(question);

    // Extract work order number if present
    const workOrderMatch = question.match(/#?(\d{3,6})/);
    const workOrderNumber = workOrderMatch ? workOrderMatch[1] : null;

    // Extract potential name
    const nameMatch = question.match(/(?:name\s+is\s+|i'm\s+|i\s+am\s+)([a-z]+(?:\s+[a-z]+)?)/i);
    const clientName = nameMatch ? nameMatch[1] : null;

    // If it's a work order query, try to look it up
    if (isWorkOrderQuery && (workOrderNumber || clientName)) {
      console.log('🔍 Detected work order query:', { workOrderNumber, clientName });

      try {
        // Determine search type
        let searchType = 'unknown';
        let lookupParams = {};

        if (workOrderNumber && clientName) {
          searchType = 'verify';
          lookupParams = { 
            work_order_number: workOrderNumber, 
            client_name: clientName,
            search_type: 'verify'
          };
        } else if (workOrderNumber) {
          searchType = 'by_number';
          lookupParams = { 
            work_order_number: workOrderNumber,
            search_type: 'by_number'
          };
        } else if (clientName) {
          searchType = 'by_name';
          lookupParams = { 
            client_name: clientName,
            search_type: 'by_name'
          };
        }

        // Call work order lookup API
        const lookupResponse = await fetch(`${req.headers.origin || 'https://caboshandyman.vercel.app'}/api/work-order-status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lookupParams)
        });

        const lookupResult = await lookupResponse.json();

        // Handle lookup results
        if (lookupResult.verified) {
          // VERIFIED - Show full details
          const wo = lookupResult.work_order;
          const itemsList = wo.items?.map(item => `• ${item.name}: $${item.price}`).join('\n') || '';
          
          return res.status(200).json({
            success: true,
            response: `✅ Work Order #${wo.id} - ${wo.client_name}

${wo.description ? `**Issue:** ${wo.description}\n` : ''}
**Status:** Pending (awaiting scheduling)

**Services Requested:**
${itemsList}

**Estimated Total:** $${wo.total_cost}

We'll contact you within 24-48 hours to schedule. For urgent requests, call us at (624) 123-4567.

Any other questions about this order?`
          });
        }

        if (lookupResult.needs_verification) {
          // Found work order, need name to verify
          return res.status(200).json({
            success: true,
            response: `I found work order #${lookupResult.preview.id}! To show you the details, please confirm the last name on this order for security.`
          });
        }

        if (lookupResult.multiple) {
          // Multiple work orders found
          const ordersList = lookupResult.work_orders
            .map(wo => `• Work Order #${wo.id} - ${wo.description}`)
            .join('\n');
          
          return res.status(200).json({
            success: true,
            response: `I found ${lookupResult.count} work orders under that name:\n\n${ordersList}\n\nWhich work order number would you like to check?`
          });
        }

        if (!lookupResult.found) {
          // Not found
          return res.status(200).json({
            success: true,
            response: `I don't see that work order in our system. A few possibilities:

- The work order might still be processing (takes 24 hours)
- The number might be incorrect
- It might be under a different name

Would you like to:
1. Submit a new service request
2. Call us at (624) 123-4567 to verify

I'm happy to help with a new estimate if needed!`
          });
        }

        if (!lookupResult.verified && lookupResult.verified === false) {
          // Name didn't match
          return res.status(200).json({
            success: true,
            response: `The name doesn't match our records for that work order. For security, please call us at (624) 123-4567 to verify your identity. We're here to help!`
          });
        }

      } catch (lookupError) {
        console.error('Work order lookup failed:', lookupError);
        // Fall through to normal Groq response
      }
    }

    // NOT a work order query OR lookup failed - use Groq for general questions

    // Build context from the estimate (if provided)
    let estimateContext = '';
    if (analysis) {
      estimateContext = `
ORIGINAL ESTIMATE FOR: ${analysis.analysis?.issue_type || 'Maintenance Issue'}

DESCRIPTION: ${analysis.analysis?.description || 'N/A'}
SEVERITY: ${analysis.analysis?.severity || 'Unknown'}
DIFFICULTY: ${analysis.analysis?.difficulty_level || 'Professional'}

COST BREAKDOWN:
- Materials: $${analysis.cost_estimate?.parts_cost?.min || 0} - $${analysis.cost_estimate?.parts_cost?.max || 0}
- Labor: $${analysis.cost_estimate?.labor_cost || 0}${analysis.cost_estimate?.labor_hours ? ` (${analysis.cost_estimate.labor_hours} hours)` : ''}
- Total Range: $${analysis.cost_estimate?.total_cost?.min || 0} - $${analysis.cost_estimate?.total_cost?.max || 0}

${service_context ? `SERVICE: ${service_context.title}` : ''}
`.trim();
    }

    // Build chat history context
    let chatContext = '';
    if (history && history.length > 1) {
      chatContext = '\n\nPREVIOUS CONVERSATION:\n' + history.slice(0, -1).map(msg => 
        `${msg.role === 'user' ? 'Customer' : 'Assistant'}: ${msg.content}`
      ).join('\n');
    }

    const prompt = `You are a helpful contractor assistant for a handyman service in Cabo San Lucas, Mexico.

${estimateContext ? estimateContext : 'Customer is asking a general question (no estimate provided yet).'}
${chatContext}

CUSTOMER QUESTION: "${question}"

Provide a helpful, conversational response (2-4 sentences). You can:
- Explain cost breakdowns and why things cost what they do (NOTE: Labor estimates are maximums - if we finish early, customer only pays for actual hours worked)
- Suggest cheaper or premium alternatives
- Clarify timeline and process
- Explain DIY vs professional trade-offs
- Answer specific technical questions
- Recommend materials or approaches
- Explain that we provide facturas (official Mexican tax receipts) upon request for all completed services
- If asked about hourly rates: explain that our rates vary by project complexity, crew size, and skill level - we don't have a single fixed hourly rate
- If asked about work order status and you don't have the info: politely ask for their work order number AND last name so you can look it up

IMPORTANT PRICING CONTEXT:
- $100 service call fee applies to all jobs (includes diagnosis + first 30 minutes of work)
- Repair labor is quoted separately based on scope
- We do NOT have a fixed hourly rate beyond the service call
- Rates depend on: complexity, materials needed, crew size, skill level, urgency
- Simple repairs might be completed within the service call
- For large projects (remodels, commercial), we provide comprehensive quotes

WORK ORDER STATUS QUERIES:
- If customer asks about work order status but doesn't provide number + name, politely ask: "I can check that! Please provide your work order number and last name for verification."
- Never make up work order information
- Always require both work order number AND last name to verify

Be friendly, clear, and actionable. Keep prices in USD. If suggesting DIY, mention skill level and time needed.`;

    console.log('💬 Feedback question:', question.substring(0, 50));

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
            content: 'You are a knowledgeable, friendly contractor assistant. Be conversational and helpful. Always emphasize that pricing varies by job complexity. If asked about work order status without sufficient info, politely ask for work order number + name.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    if (!groqResponse.ok) {
      console.error('Groq API Error:', groqResponse.status);
      throw new Error(`Groq API failed: ${groqResponse.status}`);
    }

    const groqData = await groqResponse.json();
    const responseText = groqData.choices[0]?.message?.content;

    if (!responseText) {
      throw new Error('No response from Groq API');
    }

    console.log('✅ Feedback response generated');

    return res.status(200).json({
      success: true,
      response: responseText
    });

  } catch (error) {
    console.error('❌ Feedback chat error:', error.message);

    return res.status(500).json({
      success: false,
      error: 'Unable to process question',
      response: 'Sorry, I had trouble processing that. Could you try rephrasing your question?'
    });
  }
}