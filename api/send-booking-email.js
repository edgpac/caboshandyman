import nodemailer from 'nodemailer';
import { checkOrigin, rateLimit, getClientIp, sanitizeHtml } from './_security.js';

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'chatscalendar@gmail.com';

export default async function handler(req, res) {
  if (!checkOrigin(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limit: 20 booking emails per hour per IP
  const ip = getClientIp(req);
  if (!rateLimit(ip, 20, 60 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
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
        user: NOTIFICATION_EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });

    // Sanitize all user-supplied values before HTML interpolation (CRIT-4)
    const issueType    = sanitizeHtml(analysisData.analysis?.issue_type);
    const severity     = sanitizeHtml(analysisData.analysis?.severity);
    const description  = sanitizeHtml(analysisData.analysis?.description);
    const difficulty   = sanitizeHtml(analysisData.analysis?.difficulty_level);
    const timeEstimate = sanitizeHtml(analysisData.analysis?.time_estimate);
    const analysisId   = sanitizeHtml(analysisData.analysisId);
    const userAgent    = sanitizeHtml(customerInfo?.userAgent);
    const severityColor =
      analysisData.analysis?.severity === 'high'   ? '#dc2626' :
      analysisData.analysis?.severity === 'medium' ? '#ea580c' : '#16a34a';

    // Prepare email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">🔧 New Service Request - Cabos Handyman</h2>

        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">📋 Customer Information:</h3>
          <p><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</p>
          <p><strong>Analysis ID:</strong> ${analysisId || 'N/A'}</p>
          <p><strong>Browser:</strong> ${userAgent || 'N/A'}</p>
        </div>

        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">🔨 Project Details:</h3>
          <p><strong>Issue Type:</strong> ${issueType || 'N/A'}</p>
          <p><strong>Severity:</strong> <span style="color: ${severityColor}; font-weight: bold;">${severity?.toUpperCase() || 'N/A'}</span></p>
          <p><strong>Description:</strong> ${description || 'N/A'}</p>
          <p><strong>Difficulty:</strong> ${difficulty || 'N/A'}</p>
          ${timeEstimate ? `<p><strong>Time Estimate:</strong> ${timeEstimate}</p>` : ''}
        </div>

        <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">💰 Cost Estimate:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 5px;"><strong>Materials:</strong></td>
              <td style="padding: 5px;">$${Number(analysisData.cost_estimate?.parts_cost?.min) || 0} - $${Number(analysisData.cost_estimate?.parts_cost?.max) || 0}</td>
            </tr>
            <tr>
              <td style="padding: 5px;"><strong>Labor:</strong></td>
              <td style="padding: 5px;">$${Number(analysisData.cost_estimate?.labor_cost) || 0} (${Number(analysisData.cost_estimate?.labor_hours) || 0} hours)</td>
            </tr>
            <tr>
              <td style="padding: 5px;"><strong>Crew Size:</strong></td>
              <td style="padding: 5px;">${Number(analysisData.cost_estimate?.crew_size) || 1} person(s)</td>
            </tr>
            ${Number(analysisData.cost_estimate?.disposal_cost) > 0 ? `
            <tr>
              <td style="padding: 5px;"><strong>Disposal:</strong></td>
              <td style="padding: 5px;">$${Number(analysisData.cost_estimate.disposal_cost)}</td>
            </tr>` : ''}
            ${Number(analysisData.cost_estimate?.permits_misc) > 0 ? `
            <tr>
              <td style="padding: 5px;"><strong>Permits/Misc:</strong></td>
              <td style="padding: 5px;">$${Number(analysisData.cost_estimate.permits_misc)}</td>
            </tr>` : ''}
            <tr style="border-top: 2px solid #2563eb;">
              <td style="padding: 10px 5px;"><strong>Total Range:</strong></td>
              <td style="padding: 10px 5px; font-size: 18px; color: #2563eb;"><strong>$${Number(analysisData.cost_estimate?.total_cost?.min) || 0} - $${Number(analysisData.cost_estimate?.total_cost?.max) || 0}</strong></td>
            </tr>
          </table>
        </div>

        ${Array.isArray(analysisData.analysis?.required_parts) && analysisData.analysis.required_parts.length > 0 ? `
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">🛠️ Required Parts:</h3>
          <ul>
            ${analysisData.analysis.required_parts.map(part =>
              `<li><strong>${sanitizeHtml(part.name)}</strong> - Qty: ${Number(part.quantity) || 1}${part.estimated_cost ? ` ($${Number(part.estimated_cost)})` : ''}</li>`
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
      from: NOTIFICATION_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `🔧 New Service Request - ${issueType || 'Maintenance'} [${severity?.toUpperCase() || 'NORMAL'}]`,
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
      error: 'Email service temporarily unavailable'
    });
  }
}