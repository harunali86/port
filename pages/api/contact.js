import { createClient } from '@supabase/supabase-js'

// ENV VARIABLES
const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPA_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TG_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const CMB_PHONE = process.env.CALLMEBOT_PHONE; // e.g., +919999999999
const CMB_APIKEY = process.env.CALLMEBOT_APIKEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

  // 1. Prepare Text
  const text = `🚀 *Portfolio Lead*\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nMsg: ${message}`;

  const tasks = [];

  try {
    // ----------------------------
    // A. SUPABASE (Database)
    // ----------------------------
    if (SUPA_URL && SUPA_KEY) {
      const supabase = createClient(SUPA_URL, SUPA_KEY);
      const dbTask = supabase.from('contacts').insert([{
        name, email, phone, message, created_at: new Date().toISOString()
      }]);
      tasks.push(dbTask);
    }

    // ----------------------------
    // B. TELEGRAM (Free Notification)
    // ----------------------------
    if (TG_TOKEN && TG_CHAT_ID) {
      const dbMsg = `\n-------------------------\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📱 *Phone:* ${phone || 'N/A'}\n📝 *Message:* ${message}`;
      const tgTask = fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TG_CHAT_ID, text: `🚀 New Contact:${dbMsg}`, parse_mode: 'Markdown' })
      });
      tasks.push(tgTask);
    }

    // ----------------------------
    // C. CALLMEBOT (Free WhatsApp)
    // ----------------------------
    if (CMB_PHONE && CMB_APIKEY) {
      // URL Encode the text
      const waText = encodeURIComponent(`New Contact from ${name}:\n${message}\n(Email: ${email})`);
      const cmbUrl = `https://api.callmebot.com/whatsapp.php?phone=${CMB_PHONE}&text=${waText}&apikey=${CMB_APIKEY}`;
      tasks.push(fetch(cmbUrl));
    }

    if (tasks.length === 0) {
      // No keys configured
      console.warn("No keys configured for Contact API");
      return res.status(200).json({ success: true, warning: 'No integrations effective' });
    }

    await Promise.allSettled(tasks);
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(200).json({ success: true }); // Prevent frontend error
  }
}
