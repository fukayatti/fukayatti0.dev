import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import nodemailer from 'nodemailer';

const app = new Hono().basePath('/api');

app.post('/contact', async (c) => {
  try {
    const { name, email, subject, message } = await c.req.json<{
      name: string;
      email: string;
      subject: string;
      message: string;
    }>();

    // Basic validation
    if (!name || !email || !message) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`, // Use custom FROM if set
      to: process.env.SMTP_USER, // Send to yourself
      replyTo: email, // Allow replying to the user
      subject: `[Portfolio Contact] ${subject || 'No Subject'}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<hr />
<p><strong>Message:</strong></p>
<pre>${message}</pre>
      `,
    });

    return c.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return c.json({ error: 'Failed to send email' }, 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
