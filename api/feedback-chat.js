// api/feedback-chat.js - POST-ESTIMATE FEEDBACK CHAT WITH DIRECT SUPABASE LOOKUP

const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
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

  // Initialize Supabase
  const supabase = createClient(
    process.env.SUPABASE_URL || 'https://okwcasooleetwvfuwtuz.supabase.co',
    process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rd2Nhc29vbGVldHd2ZnV3dHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNjUwMzEsImV4cCI6MjA3NDk0MTAzMX0.942cbD0ITALrlHoI0A5o8kGx3h-XQ1k4DPSxrXoIcXc'
  );

  try {
    const { question, analysis, history, service_context } = req.body;

    if (!question) {
      return res.status(400).json({ 
        error: 'Question is required' 
      });
    }

    // Check if question is about work order status
    const workOrderKeywords = /work\s*order|order\s*status|order\s*#|WO-|pending|scheduled|my\s*order|check\s*status/i;
    const isWorkOrderQuery = workOrderKeywords.test(question);

    // Extract work order number if present
    const workOrderMatch = question.match(/WO-(\d+)|#?(\d{3,})/i);
    const workOrderNumber = workOrderMatch ? (workOrderMatch[1] || workOrderMatch[2]) : null;

    // Extract potential name
    const nameMatch = question.match(/(?:name\s+is\s+|i'm\s+|i\s+am\s+|last\s*name\s+)([a-z]+)/i);
    const clientName = nameMatch ? nameMatch[1] : null;

    // If it's a work order query with both number and name, look it up directly
    if (isWorkOrderQuery && workOrderNumber && clientName) {
      console.log('🔍 Direct Supabase lookup:', { workOrderNumber, clientName });

      try {
        // Search by work_order_number field first
        let { data, error } = await supabase
          .from('pending')
          .select('*')
          .eq('work_order_number', `WO-${workOrderNumber}`)
          .single();

        // If not found, try by numeric ID
        if (error || !data) {
          const result = await supabase
            .from('pending')
            .select('*')
            .eq('id', parseInt(workOrderNumber))
            .single();
          data = result.data;
          error = result.error;
        }

        if (data) {
          // Verify name matches
          const nameMatch = data.client_name.toLowerCase().includes(clientName.toLowerCase());

          if (nameMatch) {
            // VERIFIED - Build response with real data
            const totalCost = data.items?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;
            
            let scheduledText = 'not yet scheduled';
            if (data.scheduled_date) {
              const date = new Date(data.scheduled_date);
              const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
              const fullDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
              scheduledText = `${dayName}, ${fullDate}${data.scheduled_time ? ` at ${data.scheduled_time}` : ''}`;
            }

            const crewText = data.assigned_crew ? ` Crew member ${data.assigned_crew} will be handling your job.` : '';
            const statusText = data.status || 'Pending';

            const itemsList = data.items?.map(item => `${item.name}: $${item.price}`).join(', ') || '';

            return res.status(200).json({
              success: true,
              response: `✅ Work Order ${data.work_order_number || `#${data.id}`} - ${data.client_name}

**Status:** ${statusText}
**Scheduled:** ${scheduledText}${crewText}

**Services:** ${itemsList}

**Total:** $${totalCost.toFixed(2)}

${data.status === 'Scheduled' ? 'We\'ll send you a reminder 24 hours before your appointment.' : 'We\'ll contact you within 24-48 hours to schedule.'}

Any other questions?`
            });
          }
        }
      } catch (lookupError) {
        console.error('Supabase lookup failed:', lookupError);
        // Fall through to Groq response
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
};