import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config({ path: './backend/.env' })

const app = express()
app.use(cors())
app.use(express.json())

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('MONGODB_URI is missing in backend/.env')
  process.exit(1)
}

await mongoose.connect(uri, { dbName: 'portfolio' })

const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
)
const Message = mongoose.model('Message', MessageSchema)

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'All fields are required' })
    }
    await Message.create({ name, email, message })

    let mailed = false
    try {
      const mailPort = Number(process.env.MAIL_PORT || 587)
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        port: mailPort,
        secure: mailPort === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: { rejectUnauthorized: false },
      })
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: process.env.EMAIL_TO || process.env.SMTP_USER,
        subject: `New portfolio message from ${name}`,
        html: `<div style="font-family:Inter,system-ui">
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/</g,'&lt;')}</p>
        </div>`,
      })
      mailed = true
    } catch (e) {
      console.error('Mailer error', e.message)
    }

    return res.json({ ok: true, mailed })
  } catch (err) {
    console.error('Contact submit error', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`)
})
