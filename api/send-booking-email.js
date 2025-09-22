import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      analysisData,
      customerInfo,
      imageData,
      timestamp 
    } = req.body;

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
      <h2>New Service Request - Maintenance Master</h2>
      
      <h3>Customer Information:</h3>
      <p><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</p>
      <p><strong>Analysis ID:</strong> ${analysisData.analysisId || 'N/A'}</p>
      
      <h3>Project Details:</h3>
      <p><strong>Issue Type:</strong> ${analysisData.analysis?.issue_type || 'N/A'}</p>
      <p><strong>Severity:</strong> ${analysisData.analysis?.severity || 'N/A'}</p>
      <p><strong>Description:</strong> ${analysisData.analysis?.description || 'N/A'}</p>
      <p><strong>Difficulty:</strong> ${analysisData.analysis?.difficulty_level || 'N/A'}</p>
      
      <h3>Cost Estimate:</h3>
      <p><strong>Materials:</strong> $${analysisData.cost_estimate?.parts_cost?.min || 0} - $${analysisData.cost_estimate?.parts_cost?.max || 0}</p>
      <p><strong>Labor:</strong> $${analysisData.cost_estimate?.labor_cost || 0} (${analysisData.cost_estimate?.labor_hours || 0} hours)</p>
      <p><strong>Crew Size:</strong> ${analysisData.cost_estimate?.crew_size || 1} person(s)</p>
      <p><strong>Total Range:</strong> $${analysisData.cost_estimate?.total_cost?.min || 0} - $${analysisData.cost_estimate?.total_cost?.max || 0}</p>
      
      <h3>Required Parts:</h3>
      <ul>
        ${analysisData.analysis?.required_parts?.map(part => 
          `<li>${part.name} (Qty: ${part.quantity || 1})</li>`
        ).join('') || '<li>No specific parts listed</li>'}
      </ul>
      
      <hr>
      <p><em>Customer should receive Cal.com booking confirmation separately.</em></p>
      <p><em>Follow up with customer using Cal.com booking details.</em></p>
    `;

    // Prepare mail options
    const mailOptions = {
      from: 'chatscalendar@gmail.com',
      to: 'chatscalendar@gmail.com',
      subject: `New Service Request - ${analysisData.analysis?.issue_type || 'Maintenance'}`,
      html: emailHtml,
      attachments: imageData ? [
        {
          filename: `work-photo-${Date.now()}.jpg`,
          content: imageData.split(',')[1],
          encoding: 'base64'
        }
      ] : []
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log('Booking email sent successfully');
    
    return res.status(200).json({ 
      success: true, 
      message: 'Email notification sent' 
    });

  } catch (error) {
    console.error('Email sending failed:', error);
    
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send email notification',
      details: error.message
    });
  }
}