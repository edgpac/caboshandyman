// api/feedback-chat.js - SMART AI with Groq + Supabase lookup

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

    // STEP 1: Check if asking about work order status
    const woMatch = question.match(/WO-(\d+)|order\s*#?(\d{10,})|work\s*order/i);
    const nameMatch = question.match(/(?:name\s+is\s+|last\s*name\s+|i'm\s+|i\s+am\s+)([a-z]+)/i);
    
    const workOrderNum = woMatch ? (woMatch[1] || woMatch[2]) : null;
    const clientName = nameMatch ? nameMatch[1] : null;

    // STEP 2: If we have work order info, look it up
    if (workOrderNum && clientName) {
      console.log('🔍 Looking up work order:', { workOrderNum, clientName });
      
      const { data } = await supabase
        .from('pending')
        .select('*')
        .eq('work_order_number', `WO-${workOrderNum}`)
        .single();

      if (data && data.client_name.toLowerCase().includes(clientName.toLowerCase())) {
        const total = data.items?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;
        
        let schedText = 'not yet scheduled';
        if (data.scheduled_date) {
          const d = new Date(data.scheduled_date);
          schedText = `${d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}${data.scheduled_time ? ` at ${data.scheduled_time}` : ''}`;
        }

        return res.status(200).json({
          success: true,
          response: `✅ Work Order ${data.work_order_number}\n\n**Status:** ${data.status || 'Pending'}\n**Scheduled:** ${schedText}\n${data.assigned_crew ? `**Crew:** ${data.assigned_crew}\n` : ''}**Total:** $${total.toFixed(2)}\n\nAnything else I can help with?`
        });
      }
    }

    // STEP 3: Use Groq AI for intelligent responses
    const chatHistory = history || [];
    
    const systemPrompt = `You are a helpful, friendly handyman service assistant for Cabos Handyman in Cabo San Lucas, Mexico.

**SERVICES WE OFFER:**
- Residential Maintenance (kitchens, bathrooms, home renovations)
- Emergency Services (24/7 for water damage, electrical, structural issues)
- Commercial Projects (office buildouts, retail spaces)
- HOA & Property Maintenance

**PRICING GUIDANCE:**
- $100 service call fee (includes diagnosis + first 30 minutes)
- Leak repairs: typically $200-$600 depending on complexity
- Electrical work: $150-$500 for outlet/switch repairs
- Plumbing: $200-$800 for most residential jobs
- Emergency service: +50% premium for after-hours
- We provide FREE estimates via our quote tool

**IMPORTANT:**
- If asked about work order status without a work order number AND last name, ask for both
- Always be helpful, clear, and actionable
- Suggest using our instant quote tool for specific estimates
- We provide facturas (Mexican tax receipts) upon request
- Labor estimates are maximums - if we finish early, customer pays actual hours only

Be conversational, friendly, and helpful. Keep responses 2-4 sentences unless more detail is needed.`;

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
          ...chatHistory.slice(-6), // Last 3 exchanges
          { role: 'user', content: question }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    if (!groqResponse.ok) {
      throw new Error('Groq API failed');
    }

    const groqData = await groqResponse.json();
    const aiResponse = groqData.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    console.log('✅ AI Response generated');

    return res.status(200).json({
      success: true,
      response: aiResponse
    });

  } catch (error) {
    console.error('❌ Chat error:', error.message);

    return res.status(200).json({
      success: true,
      response: 'I\'m here to help! You can ask me about our services, get pricing estimates, or check your work order status. What would you like to know?'
    });
  }
}