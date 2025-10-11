// api/feedback-chat.js - Simplified with direct Supabase

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
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question required' });

    // Extract work order number and name
    const woMatch = question.match(/WO-(\d+)|#?(\d{10,})/i);
    const nameMatch = question.match(/(?:name\s+is\s+|last\s*name\s+)([a-z]+)/i);
    
    const workOrderNum = woMatch ? (woMatch[1] || woMatch[2]) : null;
    const clientName = nameMatch ? nameMatch[1] : null;

    console.log('Query:', { workOrderNum, clientName });

    // If we have both, lookup in Supabase
    if (workOrderNum && clientName) {
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
          response: `✅ Work Order ${data.work_order_number}\n\n**Status:** ${data.status || 'Pending'}\n**Scheduled:** ${schedText}\n${data.assigned_crew ? `**Crew:** ${data.assigned_crew}\n` : ''}**Total:** $${total}\n\nAnything else I can help with?`
        });
      }
    }

    // Fallback - ask for info
    return res.status(200).json({
      success: true,
      response: 'I can check your work order status! Please provide your work order number (like WO-1234567) and your last name.'
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: true,
      response: 'I can help! Please provide your work order number and last name so I can look up your schedule.'
    });
  }
}