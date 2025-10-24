import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, service, urgency, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'loscabohandyman@gmail.com',
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });

    // Email to YOU
    const businessEmail = {
      from: 'loscabohandyman@gmail.com',
      to: 'loscabohandyman@gmail.com',
      subject: `🔔 New Contact - ${urgency || 'Normal'} - ${service || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #14b8a6;">🔧 New Contact Form - Cabos Handyman</h2>
          
          <div style="background: #f0fdfa; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #14b8a6;">
            <h3 style="margin-top: 0;">👤 Customer Information:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/Mazatlan' })}</p>
          </div>
          
          <div style="background: ${urgency === 'emergency' ? '#fee2e2' : urgency === 'urgent' ? '#fef3c7' : '#f3f4f6'}; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">🔧 Service Request:</h3>
            <p><strong>Service Type:</strong> ${service || 'Not specified'}</p>
            <p><strong>Urgency Level:</strong> <span style="color: ${urgency === 'emergency' ? '#dc2626' : urgency === 'urgent' ? '#ea580c' : '#059669'}; font-weight: bold;">${urgency || 'Normal'}</span></p>
          </div>
          
          <div style="background: #fafafa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">💬 Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <div style="background: ${urgency === 'emergency' || urgency === 'urgent' ? '#fee2e2' : '#f0f9ff'}; padding: 15px; border-radius: 8px; border-left: 4px solid ${urgency === 'emergency' || urgency === 'urgent' ? '#ef4444' : '#3b82f6'};">
            <p style="margin: 0;"><strong>⚠️ Action Required:</strong></p>
            <p style="margin: 10px 0 0 0;">
              ${urgency === 'emergency' ? '🚨 EMERGENCY - Contact immediately at ' + phone : 
                urgency === 'urgent' ? '⚡ URGENT - Respond within 24 hours to ' + email : 
                'Respond within 24-48 hours to ' + email}
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f8fafc; border-radius: 8px;">
            <p style="margin: 0 0 10px 0; color: #64748b;">Quick Actions:</p>
            <a href="tel:${phone}" style="display: inline-block; margin: 5px; padding: 10px 20px; background: #14b8a6; color: white; text-decoration: none; border-radius: 6px;">📞 Call ${phone}</a>
            <a href="mailto:${email}" style="display: inline-block; margin: 5px; padding: 10px 20px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px;">📧 Email ${email}</a>
            <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="display: inline-block; margin: 5px; padding: 10px 20px; background: #10b981; color: white; text-decoration: none; border-radius: 6px;">💬 WhatsApp</a>
          </div>
        </div>
      `
    };

    await transporter.sendMail(businessEmail);

    // Confirmation email to customer
    const customerEmail = {
      from: 'loscabohandyman@gmail.com',
      to: email,
      subject: 'We received your message - Cabos Handyman',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #14b8a6 0%, #0891b2 100%);">
            <h1 style="color: white; margin: 0;">Cabos Handyman</h1>
            <p style="color: #f0fdfa; margin: 10px 0 0 0;">Professional Home Services in Los Cabos</p>
          </div>
          
          <div style="padding: 30px;">
            <h2 style="color: #14b8a6;">Thank you for contacting us!</h2>
            
            <p>Hi ${name},</p>
            
            <p>We've received your inquiry about <strong>${service || 'handyman services'}</strong> and appreciate you reaching out to Cabos Handyman.</p>
            
            <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #14b8a6;">
              <h3 style="margin-top: 0; color: #0891b2;">📋 Your Request Summary:</h3>
              <p style="margin: 5px 0;"><strong>Service:</strong> ${service || 'General Inquiry'}</p>
              <p style="margin: 5px 0;"><strong>Priority:</strong> ${urgency || 'Normal'}</p>
              <p style="margin: 15px 0 5px 0;"><strong>Your Message:</strong></p>
              <p style="background: white; padding: 10px; border-radius: 4px; margin: 5px 0;">${message}</p>
            </div>
            
            <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #059669;">✅ What happens next?</h3>
              <p style="margin: 10px 0;">✓ Our team will review your request</p>
              <p style="margin: 10px 0;">✓ We'll respond within 24 hours (Mon-Fri, 7 AM - 5 PM)</p>
              <p style="margin: 10px 0;">✓ We'll discuss your project and schedule a consultation</p>
            </div>
            
            ${urgency === 'emergency' || urgency === 'urgent' ? `
            <div style="background: #fee2e2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h3 style="margin-top: 0; color: #dc2626;">⚡ Need Immediate Help?</h3>
              <p style="margin: 10px 0;">For urgent matters, contact us directly:</p>
              <p style="margin: 10px 0;"><strong>📞 Phone:</strong> <a href="tel:+526121698328" style="color: #dc2626;">+52 612 169 8328</a></p>
              <p style="margin: 10px 0;"><strong>💬 WhatsApp:</strong> <a href="https://wa.me/526121698328" style="color: #10b981;">Chat Now</a></p>
            </div>
            ` : ''}
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <h3 style="margin-top: 0; color: #475569;">📞 Contact Information</h3>
              <p style="margin: 8px 0;">📱 Phone: <a href="tel:+526121698328" style="color: #14b8a6; text-decoration: none;">+52 612 169 8328</a></p>
              <p style="margin: 8px 0;">💬 WhatsApp: <a href="https://wa.me/526121698328" style="color: #10b981; text-decoration: none;">Click to Chat</a></p>
              <p style="margin: 8px 0;">🌐 Website: <a href="https://caboshandyman.com" style="color: #3b82f6; text-decoration: none;">caboshandyman.com</a></p>
              <p style="margin: 8px 0;">📧 Email: loscabohandyman@gmail.com</p>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
            
            <p style="color: #64748b; font-size: 14px; margin: 20px 0;">
              <strong>Cabos Handyman</strong><br>
              Licensed, Insured & Bonded<br>
              Serving Cabo San Lucas & Los Cabos<br>
              20+ Years of Construction Excellence
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(customerEmail);

    console.log('✅ Contact emails sent successfully to loscabohandyman@gmail.com');
    
    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully'
    });

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send message. Please call us at +52 612 169 8328',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
