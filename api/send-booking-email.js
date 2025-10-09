import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      analysisData,
      customerInfo,
      imageData, // This is an ARRAY of base64 images
      timestamp 
    } = req.body;

    // ✅ Validate environment variable
    if (!process.env.EMAIL_APP_PASSWORD) {
      console.error('EMAIL_APP_PASSWORD not configured');
      return res.status(500).json({ 
        success: false, 
        error: 'Email service not configured' 
      });
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'chatscalendar@gmail.com',
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });

    // Prepare email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">🔧 New Service Request - Maintenance Master</h2>
        
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">📋 Customer Information:</h3>
          <p><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</p>
          <p><strong>Analysis ID:</strong> ${analysisData.analysisId || 'N/A'}</p>
          <p><strong>Browser:</strong> ${customerInfo?.userAgent || 'N/A'}</p>
        </div>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">🔨 Project Details:</h3>
          <p><strong>Issue Type:</strong> ${analysisData.analysis?.issue_type || 'N/A'}</p>
          <p><strong>Severity:</strong> <span style="color: ${
            analysisData.analysis?.severity === 'high' ? '#dc2626' : 
            analysisData.analysis?.severity === 'medium' ? '#ea580c' : '#16a34a'
          }; font-weight: bold;">${analysisData.analysis?.severity?.toUpperCase() || 'N/A'}</span></p>
          <p><strong>Description:</strong> ${analysisData.analysis?.description || 'N/A'}</p>
          <p><strong>Difficulty:</strong> ${analysisData.analysis?.difficulty_level || 'N/A'}</p>
          ${analysisData.analysis?.time_estimate ? `<p><strong>Time Estimate:</strong> ${analysisData.analysis.time_estimate}</p>` : ''}
        </div>
        
        <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">💰 Cost Estimate:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 5px;"><strong>Materials:</strong></td>
              <td style="padding: 5px;">$${analysisData.cost_estimate?.parts_cost?.min || 0} - $${analysisData.cost_estimate?.parts_cost?.max || 0}</td>
            </tr>
            <tr>
              <td style="padding: 5px;"><strong>Labor:</strong></td>
              <td style="padding: 5px;">$${analysisData.cost_estimate?.labor_cost || 0} (${analysisData.cost_estimate?.labor_hours || 0} hours)</td>
            </tr>
            <tr>
              <td style="padding: 5px;"><strong>Crew Size:</strong></td>
              <td style="padding: 5px;">${analysisData.cost_estimate?.crew_size || 1} person(s)</td>
            </tr>
            ${analysisData.cost_estimate?.disposal_cost > 0 ? `
            <tr>
              <td style="padding: 5px;"><strong>Disposal:</strong></td>
              <td style="padding: 5px;">$${analysisData.cost_estimate.disposal_cost}</td>
            </tr>` : ''}
            ${analysisData.cost_estimate?.permits_misc > 0 ? `
            <tr>
              <td style="padding: 5px;"><strong>Permits/Misc:</strong></td>
              <td style="padding: 5px;">$${analysisData.cost_estimate.permits_misc}</td>
            </tr>` : ''}
            <tr style="border-top: 2px solid #2563eb;">
              <td style="padding: 10px 5px;"><strong>Total Range:</strong></td>
              <td style="padding: 10px 5px; font-size: 18px; color: #2563eb;"><strong>$${analysisData.cost_estimate?.total_cost?.min || 0} - $${analysisData.cost_estimate?.total_cost?.max || 0}</strong></td>
            </tr>
          </table>
        </div>
        
        ${analysisData.analysis?.required_parts?.length > 0 ? `
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">🛠️ Required Parts:</h3>
          <ul>
            ${analysisData.analysis.required_parts.map(part => 
              `<li><strong>${part.name}</strong> - Qty: ${part.quantity || 1}${part.estimated_cost ? ` ($${part.estimated_cost})` : ''}</li>`
            ).join('')}
          </ul>
        </div>
        ` : ''}
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        
        <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
          <p style="margin: 0;"><strong>⚠️ Important:</strong></p>
          <p style="margin: 10px 0 0 0;">Customer will receive Cal.com booking confirmation separately. Follow up using Cal.com booking details.</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 8px; text-align: center;">
          <p style="margin: 0; color: #6b7280; font-size: 12px;">
            Images attached: ${imageData?.length || 0}<br>
            Sent from AI Quote Assistant
          </p>
        </div>
      </div>
    `;

    // ✅ FIX: Handle multiple images properly
    let attachments = [];
    if (imageData && Array.isArray(imageData) && imageData.length > 0) {
      attachments = imageData.map((imgData, index) => {
        // Remove the "data:image/jpeg;base64," prefix if present
        const base64Data = imgData.includes(',') ? imgData.split(',')[1] : imgData;
        
        return {
          filename: `work-photo-${index + 1}-${Date.now()}.jpg`,
          content: base64Data,
          encoding: 'base64'
        };
      });
    }

    // Prepare mail options
    const mailOptions = {
      from: 'chatscalendar@gmail.com',
      to: 'chatscalendar@gmail.com',
      subject: `🔧 New Service Request - ${analysisData.analysis?.issue_type || 'Maintenance'} [${analysisData.analysis?.severity?.toUpperCase() || 'NORMAL'}]`,
      html: emailHtml,
      attachments: attachments
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Booking email sent successfully:', info.messageId);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Email notification sent',
      messageId: info.messageId,
      imagesAttached: attachments.length
    });

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    
    // More detailed error logging
    if (error.code === 'EAUTH') {
      console.error('Gmail authentication failed. Check EMAIL_APP_PASSWORD');
    }
    
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send email notification',
      details: error.message,
      code: error.code
    });
  }
}