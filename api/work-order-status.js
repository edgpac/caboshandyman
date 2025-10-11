// api/work-order-status.js - Work Order Status Lookup (CommonJS for Vercel)

const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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
    const { work_order_number, client_name, search_type } = req.body;

    console.log('🔍 Work order lookup:', { work_order_number, client_name, search_type });

    // Extract numeric ID from work order number (strip WO- prefix if present)
    const extractNumericId = (woNumber) => {
      if (!woNumber) return null;
      const cleaned = woNumber.toString().replace(/^WO-/i, '');
      return parseInt(cleaned);
    };

    // SEARCH BY WORK ORDER NUMBER
    if (search_type === 'by_number' && work_order_number) {
      // Try searching by work_order_number field first (exact match)
      let { data, error } = await supabase
        .from('pending')
        .select('*')
        .eq('work_order_number', work_order_number)
        .single();

      // If not found, try by numeric ID
      if (error || !data) {
        const numericId = extractNumericId(work_order_number);
        if (numericId) {
          const result = await supabase
            .from('pending')
            .select('*')
            .eq('id', numericId)
            .single();
          data = result.data;
          error = result.error;
        }
      }

      if (error || !data) {
        return res.status(200).json({
          success: false,
          found: false,
          message: `Work order ${work_order_number} not found in our system.`
        });
      }

      // Return preview (need name to confirm)
      return res.status(200).json({
        success: true,
        found: true,
        needs_verification: true,
        preview: {
          id: data.id,
          work_order_number: data.work_order_number,
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
            work_order_number: data[0].work_order_number,
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
          work_order_number: wo.work_order_number,
          description: wo.description
        })),
        message: `Found ${data.length} work orders for "${client_name}". Please provide the work order number.`
      });
    }

    // VERIFY AND SHOW FULL DETAILS
    if (search_type === 'verify' && work_order_number && client_name) {
      // Try searching by work_order_number field first
      let { data, error } = await supabase
        .from('pending')
        .select('*')
        .eq('work_order_number', work_order_number)
        .single();

      // If not found, try by numeric ID
      if (error || !data) {
        const numericId = extractNumericId(work_order_number);
        if (numericId) {
          const result = await supabase
            .from('pending')
            .select('*')
            .eq('id', numericId)
            .single();
          data = result.data;
          error = result.error;
        }
      }

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

      // VERIFIED - Return full details with NEW FIELDS
      const totalCost = data.items?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;

      // Format scheduled date and time
      let scheduledInfo = null;
      if (data.scheduled_date) {
        const date = new Date(data.scheduled_date);
        scheduledInfo = {
          date: data.scheduled_date,
          time: data.scheduled_time || null,
          formatted: date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        };
      }

      return res.status(200).json({
        success: true,
        verified: true,
        work_order: {
          id: data.id,
          work_order_number: data.work_order_number,
          client_name: data.client_name,
          description: data.description,
          items: data.items,
          total_cost: totalCost,
          work_photo: data.work_photo,
          status: data.status || 'Pending',
          scheduled: scheduledInfo,
          assigned_crew: data.assigned_crew || null
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
      message: error.message || 'Please try again or call us for assistance.'
    });
  }
};