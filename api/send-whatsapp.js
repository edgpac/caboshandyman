// api/send-whatsapp.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, phone } = req.body;

    if (!message || !phone) {
      return res.status(400).json({ error: 'Missing message or phone number' });
    }

    // Clean phone number
    const cleanPhone = validatePhoneNumber(phone);
    if (!cleanPhone) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Try WhatsApp first, then fallback to SMS
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      
      // Option 1: Try WhatsApp first
      try {
        const whatsappResponse = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            From: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
            To: `whatsapp:${cleanPhone}`,
            Body: message
          })
        });

        if (whatsappResponse.ok) {
          const result = await whatsappResponse.json();
          return res.status(200).json({ 
            success: true, 
            messageId: result.sid,
            provider: 'whatsapp',
            to: cleanPhone
          });
        } else {
          const error = await whatsappResponse.json();
          console.log('WhatsApp failed, trying SMS fallback:', error.message);
          
          // If WhatsApp fails, immediately try SMS
          throw new Error('WhatsApp failed, falling back to SMS');
        }
      } catch (whatsappError) {
        console.log('WhatsApp error, falling back to SMS:', whatsappError.message);
      }

      // Option 2: SMS Fallback
      try {
        const smsResponse = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            From: process.env.TWILIO_PHONE_NUMBER, // Your SMS phone number
            To: cleanPhone, // No whatsapp: prefix for SMS
            Body: message
          })
        });

        if (smsResponse.ok) {
          const result = await smsResponse.json();
          return res.status(200).json({ 
            success: true, 
            messageId: result.sid,
            provider: 'sms',
            to: cleanPhone,
            note: 'Sent via SMS (WhatsApp unavailable)'
          });
        } else {
          const smsError = await smsResponse.json();
          console.error('SMS also failed:', smsError);
          throw new Error(`SMS failed: ${smsError.message}`);
        }
      } catch (smsError) {
        console.error('Both WhatsApp and SMS failed:', smsError);
      }
    }

    // Option 3: Email fallback if both messaging options fail
    console.log('All messaging options failed, using email fallback');
    
    const emailResponse = await fetch('/api/send-booking-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerInfo: {
          message: message,
          phone: cleanPhone,
          timestamp: new Date().toISOString(),
          fallbackReason: 'SMS and WhatsApp unavailable'
        }
      })
    });

    if (emailResponse.ok) {
      return res.status(200).json({ 
        success: true, 
        provider: 'email',
        message: 'Sent via email (messaging services unavailable)',
        to: 'business email'
      });
    } else {
      throw new Error('All notification methods failed');
    }

  } catch (error) {
    console.error('Complete notification failure:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send notification',
      details: error.message 
    });
  }
}

// Utility function to validate and format phone numbers
function validatePhoneNumber(phone) {
  if (!phone) return null;
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid length (10-15 digits)
  if (cleaned.length < 10 || cleaned.length > 15) {
    return null;
  }
  
  // Add country code if missing (assume Mexico +52 for Cabo)
  if (cleaned.length === 10 && !cleaned.startsWith('52')) {
    return '+52' + cleaned;
  }
  
  // Add + if missing
  if (!phone.startsWith('+')) {
    return '+' + cleaned;
  }
  
  return '+' + cleaned;
}