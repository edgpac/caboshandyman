// api/feedback-chat.js - CONVERSATIONAL AI with Smart Info Gathering

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
    
    // ========================================
    // EXTRACT INFO FROM CURRENT + PAST MESSAGES
    // ========================================
    
    // Check current message
    const woMatch = question.match(/WO-?(\d+)|#(\d{10,})|order\s*#?(\d{10,})/i);
    const nameMatch = question.match(/(?:name\s+(?:is\s+)?|last\s*name\s+|i'm\s+|i\s+am\s+|my\s+name\s*(?:is)?\s+|mr\.?\s+|mrs\.?\s+|ms\.?\s+)([a-z]+)|^([a-z]{3,})$/i);
    
    let workOrderNum = woMatch ? (woMatch[1] || woMatch[2] || woMatch[3]) : null;
    let clientName = nameMatch ? (nameMatch[1] || nameMatch[2]) : null;

    // Look back through conversation history for context
    let conversationContext = {
      hasAskedForWO: false,
      hasAskedForName: false,
      workOrderNum: workOrderNum,
      clientName: clientName
    };

    for (let i = chatHistory.length - 1; i >= Math.max(0, chatHistory.length - 6); i--) {
      const msg = chatHistory[i];
      
      if (msg.role === 'assistant') {
        if (/work order number/i.test(msg.content)) conversationContext.hasAskedForWO = true;
        if (/last name|your name/i.test(msg.content)) conversationContext.hasAskedForName = true;
      }
      
      if (msg.role === 'user' && !conversationContext.workOrderNum) {
        const prevWO = msg.content.match(/WO-?(\d+)|#(\d{10,})/i);
        if (prevWO) conversationContext.workOrderNum = prevWO[1] || prevWO[2];
      }
      
      if (msg.role === 'user' && !conversationContext.clientName) {
        const prevName = msg.content.match(/(?:name\s+(?:is\s+)?|i'm\s+|i\s+am\s+|my\s+name\s*(?:is)?\s+)([a-z]+)|^([a-z]{3,})$/i);
        if (prevName) conversationContext.clientName = prevName[1] || prevName[2];
      }
    }

    workOrderNum = conversationContext.workOrderNum;
    clientName = conversationContext.clientName;

    console.log('🧠 Context:', { workOrderNum, clientName, hasAskedForWO: conversationContext.hasAskedForWO, hasAskedForName: conversationContext.hasAskedForName });

    // ========================================
    // DETECT INTENT
    // ========================================
    
    const wantsStatus = /status|check|scheduled|when|what\s+date|appointment|service|my\s+order|look\s+up/i.test(question);
    const wantsCancel = /cancel|cancellation|cancel\s*my|delete|remove|stop/i.test(question);

    // ========================================
    // CANCELLATION FLOW
    // ========================================
    
    if (wantsCancel) {
      // Need both pieces of info
      if (!workOrderNum && !conversationContext.hasAskedForWO) {
        return res.status(200).json({
          success: true,
          response: "I can help you cancel. What's your work order number?"
        });
      }
      
      if (!clientName && !conversationContext.hasAskedForName) {
        return res.status(200).json({
          success: true,
          response: "And your last name for verification?"
        });
      }

      if (!workOrderNum || !clientName) {
        return res.status(200).json({
          success: true,
          response: "To cancel, I need both your work order number and last name. Can you provide them?"
        });
      }

      // Have both - process cancellation
      const { data } = await supabase
        .from('pending')
        .select('*')
        .eq('work_order_number', `WO-${workOrderNum}`)
        .single();

      if (!data) {
        return res.status(200).json({
          success: true,
          response: `I couldn't find work order WO-${workOrderNum}. Please verify the number or call +52 612 169 8328.`
        });
      }

      if (!data.client_name.toLowerCase().includes(clientName.toLowerCase())) {
        return res.status(200).json({
          success: true,
          response: `The name doesn't match our records. For security, please call +52 612 169 8328 to cancel.`
        });
      }

      if (data.status === 'Completed') {
        return res.status(200).json({
          success: true,
          response: `This work order is already completed and can't be cancelled. Call +52 612 169 8328 if you have concerns.`
        });
      }

      // Process cancellation
      await supabase
        .from('pending')
        .update({ status: 'Cancellation Requested' })
        .eq('id', data.id);

      try {
        const total = data.items?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;
        await fetch('https://caboshandyman.com/api/send-whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: `🚫 CANCELLATION REQUEST\n\nWO: ${data.work_order_number}\nClient: ${data.client_name}\nScheduled: ${data.scheduled_date || 'TBD'}\nTotal: $${total.toFixed(2)}`,
            phone: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP_NUMBER
          })
        });
      } catch (err) {
        console.error('Notification failed');
      }

      return res.status(200).json({
        success: true,
        response: `✅ Cancellation request submitted for WO-${workOrderNum}. We'll contact you within 1 hour to confirm. Call +52 612 169 8328 for immediate help.`
      });
    }

    // ========================================
    // STATUS LOOKUP FLOW
    // ========================================
    
    if (wantsStatus || (workOrderNum && !clientName)) {
      // Need work order number
      if (!workOrderNum && !conversationContext.hasAskedForWO) {
        return res.status(200).json({
          success: true,
          response: "I'd be happy to check! What's your work order number?"
        });
      }
      
      // Need last name
      if (!clientName && !conversationContext.hasAskedForName) {
        return res.status(200).json({
          success: true,
          response: "And your last name for verification?"
        });
      }

      // Still missing info after asking
      if (!workOrderNum || !clientName) {
        return res.status(200).json({
          success: true,
          response: "I need your work order number and last name to look up your status. Can you provide both?"
        });
      }

      // Have both - look it up!
      console.log('🔍 Database lookup:', { workOrderNum, clientName });
      
      const { data } = await supabase
        .from('pending')
        .select('*')
        .eq('work_order_number', `WO-${workOrderNum}`)
        .single();

      if (!data) {
        return res.status(200).json({
          success: true,
          response: `I couldn't find work order WO-${workOrderNum} in our system. Please verify the number or call +52 612 169 8328.`
        });
      }

      if (!data.client_name.toLowerCase().includes(clientName.toLowerCase())) {
        return res.status(200).json({
          success: true,
          response: `The name doesn't match our records for WO-${workOrderNum}. Please call +52 612 169 8328 to verify.`
        });
      }

      // SUCCESS! Return full details
      const total = data.items?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;
      
      let schedText = 'not yet scheduled';
      if (data.scheduled_date) {
        const d = new Date(data.scheduled_date);
        schedText = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
        if (data.scheduled_time) schedText += ` at ${data.scheduled_time}`;
      }

      return res.status(200).json({
        success: true,
        response: `✅ **Work Order ${data.work_order_number}**

**Status:** ${data.status || 'Pending'}
**Scheduled:** ${schedText}
${data.assigned_crew ? `**Crew:** ${data.assigned_crew}\n` : ''}**Total:** $${total.toFixed(2)}

Need anything else?`
      });
    }

    // ========================================
    // GROQ AI - GENERAL QUESTIONS
    // ========================================
    
    const systemPrompt = `You are a friendly AI assistant for Cabos Handyman in Cabo San Lucas, Mexico.

**SERVICES & PRICING:**
- Residential (kitchens, bathrooms, renovations)
- Emergency 24/7 (water/electrical/structural)
- Commercial (office buildouts, retail)
- HOA/Property maintenance
- Typical pricing: Leaks $200-$600 | Electrical $150-$500 | Plumbing $200-$800

**IMPORTANT:**
- If customer asks about their work order/appointment/status but hasn't provided work order # or name yet, DON'T ask for it here - let the system handle that
- Answer general service questions, pricing estimates, hours of operation
- Suggest our instant quote tool for specific estimates
- Keep responses brief (2-3 sentences)
- If you don't know something, suggest calling +52 612 169 8328

Be helpful, friendly, and concise.`;

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

    if (!groqResponse.ok) throw new Error('Groq failed');

    const groqData = await groqResponse.json();
    const aiResponse = groqData.choices[0]?.message?.content;

    return res.status(200).json({
      success: true,
      response: aiResponse || 'I\'m here to help! Ask about services, pricing, or your work order status.'
    });

  } catch (error) {
    console.error('❌ Error:', error.message);

    return res.status(200).json({
      success: true,
      response: 'Sorry, I had a technical issue. Please call +52 612 169 8328 for help.'
    });
  }
}