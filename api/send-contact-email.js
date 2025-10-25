import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, service, urgency, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields (name, email, and message are required)' 
      });
    }

    // Validate email configuration
    if (!process.env.CONTACTEMAIL_APP_PASSWORD) {
      console.error('CONTACTEMAIL_APP_PASSWORD not configured');
      return res.status(500).json({ 
        success: false, 
        error: 'Email service not configured. Please contact us directly at loscabohandyman@gmail.com' 
      });
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'loscabohandyman@gmail.com',
        pass: process.env.CONTACTEMAIL_APP_PASSWORD
      }
    });

    // Get current date/time
    const submissionDate = new Date().toLocaleString('en-US', { 
      timeZone: 'America/Mazatlan',
      dateStyle: 'full',
      timeStyle: 'short'
    });

    // Map service codes to readable names
    const serviceNames = {
      'kitchen': 'Kitchen Remodeling',
      'bathroom': 'Bathroom Renovation',
      'plumbing': 'Plumbing Repairs',
      'electrical': 'Electrical Services',
      'painting': 'Painting & Drywall',
      'carpentry': 'Carpentry',
      'commercial': 'Commercial Projects',
      'hoa': 'HOA Property Maintenance',
      'emergency': 'Emergency Repairs',
      'other': 'Other / General Inquiry'
    };

    const urgencyLevels = {
      'normal': 'Normal - Within a week',
      'soon': 'Soon - Within 2-3 days',
      'urgent': 'Urgent - Within 24 hours',
      'emergency': '🚨 EMERGENCY - Immediate attention needed'
    };

    const serviceName = serviceNames[service] || service || 'Not specified';
    const urgencyText = urgencyLevels[urgency] || urgency || 'Normal';

    // Prepare email HTML for business
    const businessEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #02af9f;">🔧 New Contact Form Submission - Cabos Handyman</h2>
        
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">👤 Customer Information:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone ? `<a href="tel:${phone}">${phone}</a>` : 'Not provided'}</p>
          <p><strong>Submission Date:</strong> ${submissionDate}</p>
        </div>
        
        <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">🔨 Service Request:</h3>
          <p><strong>Service Type:</strong> ${serviceName}</p>
          <p><strong>Urgency Level:</strong> <span style="color: ${urgency === 'emergency' ? '#dc2626' : urgency === 'urgent' ? '#ea580c' : '#059669'};">${urgencyText}</span></p>
        </div>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">📝 Project Details:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        
        <div style="background: ${urgency === 'emergency' || urgency === 'urgent' ? '#fee2e2' : '#fef2f2'}; padding: 15px; border-radius: 8px; border-left: 4px solid ${urgency === 'emergency' || urgency === 'urgent' ? '#dc2626' : '#ef4444'};">
          <p style="margin: 0;"><strong>⚠️ ${urgency === 'emergency' ? 'URGENT ACTION REQUIRED!' : 'Action Required:'}</strong></p>
          <p style="margin: 10px 0 0 0;">Contact this customer to discuss their handyman needs and schedule a service call.</p>
          <p style="margin: 5px 0 0 0; font-size: 14px;">
            📞 <a href="tel:${phone}">${phone || 'No phone provided'}</a><br>
            📧 <a href="mailto:${email}">Reply to customer</a>
          </p>
        </div>
      </div>
    `;

    // Send email to business
    const mailOptions = {
      from: process.env.GMAIL_USER || 'loscabohandyman@gmail.com',
      to: process.env.GMAIL_USER || 'loscabohandyman@gmail.com',
      subject: `🔧 ${urgency === 'emergency' ? '🚨 EMERGENCY - ' : ''}New Contact: ${serviceName} - ${name}`,
      html: businessEmailHtml,
      replyTo: email
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #02af9f 0%, #018f82 100%); border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0;">Thank You for Contacting Cabos Handyman!</h2>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <p style="font-size: 16px; color: #333;">Dear ${name},</p>
          
          <p style="font-size: 16px; color: #333;">
            We've received your message and appreciate you reaching out to us for your handyman and maintenance needs in Cabo San Lucas.
          </p>
          
          ${urgency === 'emergency' ? `
          <div style="background: #fee2e2; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <h3 style="margin-top: 0; color: #dc2626;">🚨 Emergency Request Noted</h3>
            <p style="margin: 10px 0;">We understand this is urgent. Our team is being notified immediately.</p>
            <p style="margin: 10px 0;"><strong>For fastest response, please call or WhatsApp:</strong></p>
            <p style="margin: 10px 0; font-size: 18px;"><a href="tel:+526121698328" style="color: #dc2626;">📱 +52 612 169 8328</a></p>
          </div>
          ` : ''}
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #02af9f;">
            <h3 style="margin-top: 0; color: #02af9f;">What Happens Next?</h3>
            <p style="margin: 10px 0;">✅ We'll review your request carefully</p>
            <p style="margin: 10px 0;">📞 Our team will contact you ${urgency === 'urgent' ? 'within 2-4 hours' : urgency === 'soon' ? 'within 24 hours' : 'within 24-48 hours'}</p>
            <p style="margin: 10px 0;">🔧 We'll discuss your project and schedule a service call</p>
            <p style="margin: 10px 0; padding: 10px; background: #fef3c7; border-radius: 4px;">
              <strong>Service Call:</strong> $100 USD (includes diagnosis and first 30 minutes of labor)
            </p>
          </div>
          
          <div style="background: #e0f2f1; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Your Request Summary:</h3>
            <p><strong>Service Type:</strong> ${serviceName}</p>
            <p><strong>Urgency:</strong> ${urgencyText}</p>
            <p style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px; margin-top: 10px;">${message}</p>
          </div>
          
          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Need Immediate Assistance?</h3>
            <p style="margin: 5px 0;">📱 <strong>Call/WhatsApp:</strong> <a href="tel:+526121698328" style="color: #02af9f;">+52 612 169 8328</a></p>
            <p style="margin: 5px 0;">⚡ <strong>Emergency Service:</strong> Available 24/7</p>
            <p style="margin: 5px 0;">📧 <strong>Email:</strong> <a href="mailto:loscabohandyman@gmail.com" style="color: #02af9f;">loscabohandyman@gmail.com</a></p>
          </div>
          
          <div style="background: #e0e7ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">🏠 Our Services:</h3>
            <p style="margin: 5px 0; font-size: 14px;">✓ Kitchen & Bathroom Remodeling</p>
            <p style="margin: 5px 0; font-size: 14px;">✓ Plumbing & Electrical</p>
            <p style="margin: 5px 0; font-size: 14px;">✓ Painting & Drywall</p>
            <p style="margin: 5px 0; font-size: 14px;">✓ Carpentry & Woodwork</p>
            <p style="margin: 5px 0; font-size: 14px;">✓ Commercial Projects & HOA Maintenance</p>
            <p style="margin: 5px 0; font-size: 14px;">✓ Emergency Repairs</p>
          </div>
          
          <p style="font-size: 16px; color: #333;">
            We look forward to helping with your project!
          </p>
          
          <p style="font-size: 16px; color: #333;">
            Best regards,<br>
            <strong>Cabos Handyman Team</strong>
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; background: #333; color: white; border-radius: 0 0 8px 8px;">
          <p style="margin: 5px 0; font-size: 14px;"><strong>Building visions, shaping the future.</strong></p>
          <p style="margin: 5px 0; font-size: 12px;">20+ Years Experience | Licensed & Insured</p>
          <p style="margin: 5px 0; font-size: 12px;">Cabo San Lucas, BCS, Mexico</p>
          <p style="margin: 5px 0; font-size: 12px;">
            <a href="https://caboshandyman.com" style="color: #02af9f;">www.caboshandyman.com</a>
          </p>
        </div>
      </div>
    `;

    const customerMailOptions = {
      from: process.env.GMAIL_USER || 'loscabohandyman@gmail.com',
      to: email,
      subject: `We Received Your ${urgency === 'emergency' ? 'Emergency ' : ''}Request - Cabos Handyman`,
      html: customerEmailHtml
    };

    await transporter.sendMail(customerMailOptions);

    console.log('✅ Contact form emails sent successfully to:', email);
    
    return res.status(200).json({ 
      success: true, 
      message: urgency === 'emergency' 
        ? 'Emergency request received! Please call us at +52 612 169 8328 for immediate assistance.'
        : 'Message sent successfully! We\'ll contact you soon.'
    });

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send message. Please try calling us directly at +52 612 169 8328',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}