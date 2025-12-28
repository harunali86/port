import sendgrid from '@sendgrid/mail'
const { Pool } = require('pg')

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // Save to database
    await pool.query(
      'INSERT INTO "ContactMessage" (name, email, phone, message, created_at) VALUES ($1, $2, $3, $4, NOW())',
      [name, email, phone || null, message]
    )

    // Send email via SendGrid
    await sendgrid.send({
      to: 'harun.ilahi.shaikh@gmail.com',         // Must be YOUR email
      from: 'harun.ilahi.shaikh@gmail.com',       // Must be verified in SendGrid sender list
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br/>")}</p>`,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    // Yeh part update karo 👇
    console.error('SendGrid/API Error:', error?.response?.body || error.message || error.toString());
    return res.status(500).json({
      error: error?.response?.body?.errors?.[0]?.message ||
             error.message ||
             error.toString() ||
             'Unknown error'
    });
  }
}
