// api/work-order-status.js - Work Order Status Lookup

import { createClient } from '@supabase/supabase-js';

export const config = {
  maxDuration: 30,
  api: {
    bodyParser: {
      sizeLimit: '1mb'
    }
  }
};

const supabase = createClient(
  'https://okwcasooleetwvfuwtuz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rd2Nhc29vbGVldHd2ZnV3dHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNjUwMzEsImV4cCI6MjA3NDk0MTAzMX0.942cbD0ITALrlHoI0A5o8kGx3h-XQ1k4DPSxrXoIcXc'
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { work_order_number, client_name, search_type } = req.body;

    console.log('🔍 Work order lookup:', { work_order_number, client_name, search_type });

    // SEARCH BY WORK ORDER NUMBER
    if (search_type === 'by_number' && work_order_number) {
      const { data, error } = await supabase
        .from('pending')
        .select('*')
        .eq('id', parseInt(work_order_number))
        .single();

      if (error || !data) {
        return res.status(200).json({
          success: false,
          found: false,
          message: `Work order #${work_order_number} not found in our system.`
        });
      }

      // Return preview (need name to confirm)
      return res.status(200).json({
        success: true,
        found: true,
        needs_verification: true,
        preview: {
          id: data.id,
          client_name: data.client_name,
          description: data.description,
          items_count: data.items?.length || 0
        }
      });
    }

    // SEARCH BY NAME ONLY
    if (search_type === 'by_name' && client_name) {
      const { data, error } = await supabase
        .from('pending')
        .select('*')
        .ilike('client_name', `%${client_name}%`);

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        return res.status(200).json({
          success: false,
          found: false,
          message: `No work orders found for "${client_name}".`
        });
      }

      if (data.length === 1) {
        // One match - show preview
        return res.status(200).json({
          success: true,
          found: true,
          count: 1,
          needs_verification: true,
          preview: {
            id: data[0].id,
            description: data[0].description,
            items_count: data[0].items?.length || 0
          }
        });
      }

      // Multiple matches - list work order numbers only
      return res.status(200).json({
        success: true,
        found: true,
        count: data.length,
        multiple: true,
        work_orders: data.map(wo => ({
          id: wo.id,
          description: wo.description
        })),
        message: `Found ${data.length} work orders for "${client_name}". Please provide the work order number.`
      });
    }

    // VERIFY AND SHOW FULL DETAILS
    if (search_type === 'verify' && work_order_number && client_name) {
      const { data, error } = await supabase
        .from('pending')
        .select('*')
        .eq('id', parseInt(work_order_number))
        .single();

      if (error || !data) {
        return res.status(200).json({
          success: false,
          found: false,
          message: 'Work order not found.'
        });
      }

      // Verify name matches (case insensitive, partial match OK)
      const nameMatch = data.client_name.toLowerCase().includes(client_name.toLowerCase());

      if (!nameMatch) {
        return res.status(200).json({
          success: false,
          verified: false,
          message: 'Name does not match our records for this work order. Please call us to verify.'
        });
      }

      // VERIFIED - Return full details
      const totalCost = data.items?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;

      return res.status(200).json({
        success: true,
        verified: true,
        work_order: {
          id: data.id,
          client_name: data.client_name,
          description: data.description,
          items: data.items,
          total_cost: totalCost,
          work_photo: data.work_photo,
          status: 'Pending' // You can expand this if you add status field
        }
      });
    }

    return res.status(400).json({
      success: false,
      error: 'Invalid search parameters'
    });

  } catch (error) {
    console.error('❌ Work order lookup error:', error);
    return res.status(500).json({
      success: false,
      error: 'Unable to lookup work order',
      message: 'Please try again or call us for assistance.'
    });
  }
}
