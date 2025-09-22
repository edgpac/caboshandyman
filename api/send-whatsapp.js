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

    // Option 1: Twilio WhatsApp API (most reliable)
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`, // Your Twilio WhatsApp number
          To: `whatsapp:${phone}`,
          Body: message
        })
      });

      if (response.ok) {
        const result = await response.json();
        return res.status(200).json({ 
          success: true, 
          messageId: result.sid,
          provider: 'twilio'
        });
      } else {
        console.error('Twilio error:', await response.text());
        throw new Error('Twilio API failed');
      }
    }

    // Option 2: WhatsApp Business API (if you have official access)
    if (process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_ID) {
      const response = await fetch(`https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: phone.replace(/\D/g, ''), // Remove non-digits
          type: 'text',
          text: {
            body: message
          }
        })
      });

      if (response.ok) {
        const result = await response.json();
        return res.status(200).json({ 
          success: true, 
          messageId: result.messages[0].id,
          provider: 'whatsapp_business'
        });
      } else {
        console.error('WhatsApp Business API error:', await response.text());
        throw new Error('WhatsApp Business API failed');
      }
    }

    // Option 3: Email fallback if no WhatsApp APIs are configured
    console.log('No WhatsApp API configured, using email fallback');
    
    // Send via email instead
    const emailResponse = await fetch('/api/send-booking-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerInfo: {
          message: message,
          phone: phone,
          timestamp: new Date().toISOString()
        }
      })
    });

    if (emailResponse.ok) {
      return res.status(200).json({ 
        success: true, 
        fallback: 'email',
        message: 'Sent via email (WhatsApp not configured)'
      });
    } else {
      throw new Error('Email fallback also failed');
    }

  } catch (error) {
    console.error('WhatsApp send error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send notification',
      details: error.message 
    });
  }
}

// Utility function to validate phone numbers
function validatePhoneNumber(phone) {
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
