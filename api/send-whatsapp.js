// api/send-whatsapp.js
import { checkOrigin, rateLimit, getClientIp, MAX_WHATSAPP_LENGTH } from './_security.js';

const BASE_URL = process.env.SITE_URL || 'https://www.caboshandyman.com';

export default async function handler(req, res) {
  if (!checkOrigin(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limit: 20 messages per hour per IP
  const ip = getClientIp(req);
  if (!rateLimit(ip, 20, 60 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  try {
    const { message, phone } = req.body;

    if (!message || !phone) {
      return res.status(400).json({ error: 'Missing message or phone number' });
    }

    if (typeof message !== 'string' || message.length > MAX_WHATSAPP_LENGTH) {
      return res.status(400).json({ error: 'Message too long' });
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
        }
        // WhatsApp failed — fall through to SMS
        console.log('WhatsApp unavailable, trying SMS fallback');
      } catch (whatsappError) {
        console.log('WhatsApp error, falling back to SMS');
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
            From: process.env.TWILIO_PHONE_NUMBER,
            To: cleanPhone,
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
        }
        console.error('SMS also failed');
      } catch (smsError) {
        console.error('Both WhatsApp and SMS failed');
      }
    }

    // Option 3: Email fallback — use absolute URL (MED-2 fix)
    console.log('All messaging options failed, using email fallback');
    const emailResponse = await fetch(`${BASE_URL}/api/send-booking-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerInfo: {
          message,
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
        message: 'Sent via email (messaging services unavailable)'
      });
    }

    throw new Error('All notification methods failed');

  } catch (error) {
    console.error('Complete notification failure:', error);
    return res.status(500).json({
      success: false,
      error: 'Notification service temporarily unavailable'
    });
  }
}

// Validate and format phone numbers
function validatePhoneNumber(phone) {
  if (!phone || typeof phone !== 'string') return null;

  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length < 10 || cleaned.length > 15) return null;

  if (cleaned.length === 10 && !cleaned.startsWith('52')) {
    return '+52' + cleaned;
  }

  return '+' + cleaned;
}
