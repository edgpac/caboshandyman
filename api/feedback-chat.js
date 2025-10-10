// api/feedback-chat.js - POST-ESTIMATE FEEDBACK CHAT

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

    if (!question || !analysis) {
      return res.status(400).json({ 
        error: 'Question and analysis are required' 
      });
    }

    // Build context from the estimate
    const estimateContext = `
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

    // Build chat history context
    let chatContext = '';
    if (history && history.length > 1) {
      chatContext = '\n\nPREVIOUS QUESTIONS:\n' + history.slice(0, -1).map(msg => 
        `${msg.role === 'user' ? 'Customer' : 'Assistant'}: ${msg.content}`
      ).join('\n');
    }

    const prompt = `You are a helpful contractor assistant explaining repair estimates to customers in Cabo San Lucas, Mexico.

${estimateContext}
${chatContext}

CUSTOMER QUESTION: "${question}"

Provide a helpful, conversational response (2-4 sentences). You can:
- Explain cost breakdowns and why things cost what they do (NOTE: Labor estimates are maximums - if we finish in 2 hours instead of the estimated 4 hours, you only pay for actual hours worked)
- Suggest cheaper or premium alternatives
- Clarify timeline and process
- Explain DIY vs professional trade-offs
- Answer specific technical questions
- Recommend materials or approaches
- Explain that we provide facturas (official Mexican tax receipts) upon request for all completed services
- If asked about hourly rates: explain that our rates vary by project complexity, crew size, and skill level required - we don't have a single fixed hourly rate, each job is priced based on its specific scope and requirements

IMPORTANT PRICING CONTEXT:
- We do NOT have a fixed hourly rate - every project is quoted individually
- Rates depend on: complexity, materials needed, crew size, skill level, urgency
- Simple repairs might be $50-80/hour equivalent, complex work $100-150/hour equivalent
- But we always quote by the job, not by the hour

Be friendly, clear, and actionable. Keep prices in USD. If suggesting DIY, mention skill level needed and time required.`;

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
            content: 'You are a knowledgeable, friendly contractor assistant helping customers understand repair estimates. Be conversational and helpful. Always emphasize that pricing varies by job complexity and we do not have a fixed hourly rate.'
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