// api/feedback-chat.js - SMART AI with Groq + Supabase lookup + CANCELLATIONS

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

    // Extract work order number and name
    const woMatch = question.match(/WO-(\d+)|order\s*#?(\d{10,})|work\s*order\s*#?(\d{10,})/i);
    const nameMatch = question.match(/(?:name\s+is\s+|last\s*name\s+|i'm\s+|i\s+am\s+|my\s+name\s+)([a-z]+)/i);
    
    const workOrderNum = woMatch ? (woMatch[1] || woMatch[2] || woMatch[3]) : null;
    const clientName = nameMatch ? nameMatch[1] : null;

    // Check if this is a CANCELLATION request
    const isCancellation = /cancel|cancellation|cancel\s*my|delete|remove|stop/i.test(question);

    // ========================================
    // CANCELLATION FLOW
    // ========================================
    if (isCancellation && workOrderNum && clientName) {
      console.log('🚫 Cancellation request:', { workOrderNum, clientName });
      
      const { data } = await supabase
        .from('pending')
        .select('*')
        .eq('work_order_number', `WO-${workOrderNum}`)
        .single();

      if (data && data.client_name.toLowerCase().includes(clientName.toLowerCase())) {
        // Check if already completed
        if (data.status === 'Completed') {
          return res.status(200).json({
            success: true,
            response: `I'm sorry, but work order ${data.work_order_number} has already been completed and cannot be cancelled. If you have concerns about the completed work, please call us at +52 624 123 4567.`
          });
        }

        // Update status to "Cancellation Requested"
        const { error: updateError } = await supabase
          .from('pending')
          .update({ 
            status: 'Cancellation Requested'
          })
          .eq('id', data.id);

        if (updateError) {
          console.error('Update failed:', updateError);
        }

        // Send notification to business
        try {
          const totalCost = data.items?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;
          
          await fetch('https://caboshandyman.com/api/send-whatsapp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: `🚫 CANCELLATION REQUEST

Work Order: ${data.work_order_number}
Client: ${data.client_name}
Scheduled: ${data.scheduled_date || 'Not scheduled'}
Total: $${totalCost.toFixed(2)}

Please contact customer to confirm cancellation.`,
              phone: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP_NUMBER
            })
          });
        } catch (notifError) {
          console.error('Notification failed:', notifError);
        }

        return res.status(200).json({
          success: true,
          response: `✅ I've submitted your cancellation request for work order ${data.work_order_number}.

Our team will contact you within 1 hour to confirm the cancellation. You'll receive a confirmation email once processed.

If you need immediate assistance, please call us at +52 612 169 8328.

Is there anything else I can help with?`
        });
      } else {
        return res.status(200).json({
          success: true,
          response: `I couldn't find a work order matching that information. Please verify your work order number and last name, or call us at +52 624 123 4567 for assistance with cancellations.`
        });
      }
    }

    // ========================================
    // WORK ORDER STATUS LOOKUP
    // ========================================
    if (workOrderNum && clientName && !isCancellation) {
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
          response: `✅ Work Order ${data.work_order_number}

**Status:** ${data.status || 'Pending'}
**Scheduled:** ${schedText}
${data.assigned_crew ? `**Crew:** ${data.assigned_crew}\n` : ''}**Total:** $${total.toFixed(2)}

Anything else I can help with?`
        });
      }
    }

    // ========================================
    // GROQ AI FOR INTELLIGENT RESPONSES
    // ========================================
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

**CANCELLATION POLICY:**
- Customers can request cancellations by providing their work order number AND last name
- If they want to cancel, ask them to provide: work order number (like WO-1234567) and their last name
- Example: "To cancel, please tell me your work order number and last name"
- Cancellations are processed within 1 hour

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
          ...chatHistory.slice(-6),
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
      response: 'I\'m here to help! You can ask me about our services, get pricing estimates, check your work order status, or request cancellations. What would you like to know?'
    });
  }
}