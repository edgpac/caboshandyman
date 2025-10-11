// api/feedback-chat.js - SMART AI with Groq + Supabase + Context Memory

import { createClient } from '@supabase/supabase-js';

export const config = {
  maxDuration: 30
};

const supabase = createClient(
  'https://okwcasooleetwvfuwtuz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rd2Nhc29vbGVldHd2ZnV3dHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNjUwMzEsImV4cCI6MjA3NDk0MTAzMX0.942cbD0ITALrlHoI0A5o8kGx3h-XQ1k4DPSxrXoIcXc'
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { question, history } = req.body;
    if (!question) return res.status(400).json({ error: 'Question required' });

    console.log('💬 Question:', question.substring(0, 100));

    const chatHistory = history || [];
    
    // Extract work order and name from CURRENT question
    const woMatch = question.match(/WO-(\d+)|#(\d{10,})|order\s*#?(\d{10,})/i);
    const nameMatch = question.match(/(?:name\s+(?:is\s+)?|last\s*name\s+|i'm\s+|i\s+am\s+|my\s+name\s*(?:is)?\s+|mr\.?\s+|mrs\.?\s+|ms\.?\s+)([a-z]+)/i);
    
    let workOrderNum = woMatch ? (woMatch[1] || woMatch[2] || woMatch[3]) : null;
    let clientName = nameMatch ? nameMatch[1] : null;

    // SMART CONTEXT: Check previous messages for missing info
    if (!workOrderNum || !clientName) {
      for (let i = chatHistory.length - 1; i >= Math.max(0, chatHistory.length - 4); i--) {
        const msg = chatHistory[i];
        if (msg.role === 'user') {
          if (!workOrderNum) {
            const prevWO = msg.content.match(/WO-(\d+)|#(\d{10,})/i);
            if (prevWO) workOrderNum = prevWO[1] || prevWO[2];
          }
          if (!clientName) {
            const prevName = msg.content.match(/(?:name\s+(?:is\s+)?|last\s*name\s+|i'm\s+|i\s+am\s+|my\s+name\s*(?:is)?\s+|mr\.?\s+|mrs\.?\s+|ms\.?\s+)([a-z]+)/i);
            if (prevName) clientName = prevName[1];
          }
        }
      }
    }

    console.log('🔍 Extracted:', { workOrderNum, clientName, fromContext: !woMatch || !nameMatch });

    // Check if this is a CANCELLATION request
    const isCancellation = /cancel|cancellation|cancel\s*my|delete|remove|stop/i.test(question);

    // ========================================
    // CANCELLATION FLOW
    // ========================================
    if (isCancellation) {
      if (!workOrderNum || !clientName) {
        return res.status(200).json({
          success: true,
          response: `To cancel a work order, I need both your work order number (like WO-1234567) and your last name. ${!workOrderNum ? 'What\'s your work order number?' : 'What\'s your last name?'}`
        });
      }

      console.log('🚫 Cancellation request:', { workOrderNum, clientName });
      
      const { data } = await supabase
        .from('pending')
        .select('*')
        .eq('work_order_number', `WO-${workOrderNum}`)
        .single();

      if (!data) {
        return res.status(200).json({
          success: true,
          response: `I couldn't find work order WO-${workOrderNum} in our system. Please verify the number or call us at +52 612 169 8328.`
        });
      }

      if (!data.client_name.toLowerCase().includes(clientName.toLowerCase())) {
        return res.status(200).json({
          success: true,
          response: `The name doesn't match our records for work order WO-${workOrderNum}. For security, please call us at +52 612 169 8328 to cancel.`
        });
      }

      if (data.status === 'Completed') {
        return res.status(200).json({
          success: true,
          response: `Work order ${data.work_order_number} is already completed and can't be cancelled. If you have concerns, please call us at +52 612 169 8328.`
        });
      }

      // Update status
      await supabase
        .from('pending')
        .update({ status: 'Cancellation Requested' })
        .eq('id', data.id);

      // Send notification
      try {
        const totalCost = data.items?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;
        await fetch('https://caboshandyman.com/api/send-whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: `🚫 CANCELLATION REQUEST\n\nWO: ${data.work_order_number}\nClient: ${data.client_name}\nScheduled: ${data.scheduled_date || 'TBD'}\nTotal: $${totalCost.toFixed(2)}`,
            phone: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP_NUMBER
          })
        });
      } catch (err) {
        console.error('Notification failed:', err);
      }

      return res.status(200).json({
        success: true,
        response: `✅ Cancellation request submitted for ${data.work_order_number}. Our team will contact you within 1 hour to confirm. Call +52 612 169 8328 for immediate assistance.`
      });
    }

    // ========================================
    // WORK ORDER STATUS LOOKUP
    // ========================================
    const isStatusQuery = /status|check|scheduled|when|what\s+date|appointment|time/i.test(question);
    
    if (workOrderNum && isStatusQuery) {
      if (!clientName) {
        return res.status(200).json({
          success: true,
          response: `I found work order WO-${workOrderNum}. To show you the details, please provide your last name.`
        });
      }

      console.log('🔍 Looking up:', { workOrderNum, clientName });
      
      const { data } = await supabase
        .from('pending')
        .select('*')
        .eq('work_order_number', `WO-${workOrderNum}`)
        .single();

      if (!data) {
        return res.status(200).json({
          success: true,
          response: `I couldn't find work order WO-${workOrderNum}. Please verify the number or call us at +52 612 169 8328.`
        });
      }

      if (!data.client_name.toLowerCase().includes(clientName.toLowerCase())) {
        return res.status(200).json({
          success: true,
          response: `The name doesn't match our records for WO-${workOrderNum}. Please verify or call +52 612 169 8328.`
        });
      }

      // SUCCESS - Return full details
      const total = data.items?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;
      
      let schedText = 'not yet scheduled';
      if (data.scheduled_date) {
        const d = new Date(data.scheduled_date);
        schedText = `${d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`;
        if (data.scheduled_time) {
          schedText += ` at ${data.scheduled_time}`;
        }
      }

      return res.status(200).json({
        success: true,
        response: `✅ **Work Order ${data.work_order_number}**

**Status:** ${data.status || 'Pending'}
**Scheduled:** ${schedText}
${data.assigned_crew ? `**Crew:** ${data.assigned_crew}\n` : ''}**Total:** $${total.toFixed(2)}

Need to make changes? Just ask!`
      });
    }

    // ========================================
    // GROQ AI - SMART FALLBACK
    // ========================================
    const systemPrompt = `You are a helpful AI assistant for Cabos Handyman in Cabo San Lucas, Mexico.

**YOUR CAPABILITIES:**
- Answer questions about services, pricing, and policies
- Help customers check work order status (you need WO# + last name)
- Process cancellation requests (you need WO# + last name)

**SERVICES & PRICING:**
- Residential: kitchens, bathrooms, renovations
- Emergency: 24/7 water/electrical/structural ($100 service call + work)
- Commercial: office buildouts, retail
- HOA/Property maintenance
- Leak repairs: $200-$600 | Electrical: $150-$500 | Plumbing: $200-$800

**IMPORTANT RULES:**
1. If customer asks about work order status but you don't have BOTH work order # AND last name, ask for what's missing ONCE. Don't loop.
2. If they keep asking vague questions like "status" without providing info, say: "I need your work order number and last name to look up your status."
3. If you genuinely don't know something, say so and suggest calling +52 612 169 8328
4. Don't make up information or hallucinate dates/details
5. Keep responses 2-3 sentences max unless giving work order details

**CONTACT:** +52 612 169 8328`;

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...chatHistory.slice(-6),
          { role: 'user', content: question }
        ],
        temperature: 0.7,
        max_tokens: 250
      })
    });

    if (!groqResponse.ok) {
      throw new Error('Groq API failed');
    }

    const groqData = await groqResponse.json();
    const aiResponse = groqData.choices[0]?.message?.content;

    console.log('✅ AI Response');

    return res.status(200).json({
      success: true,
      response: aiResponse || 'I\'m here to help! Ask about services, pricing, or provide your work order number and last name to check status.'
    });

  } catch (error) {
    console.error('❌ Error:', error.message);

    return res.status(200).json({
      success: true,
      response: 'Sorry, I had a technical issue. Please call us at +52 612 169 8328 for immediate assistance.'
    });
  }
}