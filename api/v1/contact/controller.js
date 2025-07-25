import nodemailer from 'nodemailer';

export const submitContactForm = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;

    if (!fullName?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
  from: process.env.EMAIL_USER,
  to: email,
  subject: `Welcome to Our Blog, ${fullName}!`,
  text: `Hi ${fullName},\n\nThank you for reaching out to us.\nWe'll get back to you soon!\n\n- The Blog Team`,
  html: `<div style="font-family: Arial; color: #333;">
    <h2>Hi ${fullName},</h2>
    <p>Thank you for contacting us at <strong>BlogSphere</strong>.</p>
    <p>We’ll reply soon. Until then, enjoy reading more blog posts!</p>
    <a href="http://localhost:5175" style="background-color:#4CAF50; padding:10px 15px; color:white; text-decoration:none; border-radius:4px;">Go to Blog</a>
    <p style="font-size: 13px; color: #777;">- The Blog Team</p>
  </div>`,
};


    const info=await transporter.sendMail(mailOptions);
    console.log("Email sent",info);

    res.status(200).json({ message: 'Form submitted successfully and email sent!' });
  } catch (error) {
    console.error('Email sending error:', error.message, error.response || error);
    res.status(500).json({ error: 'Something went wrong while sending email.' });
  }
};
