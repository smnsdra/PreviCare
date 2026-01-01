const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../db');
const nodemailer = require('nodemailer');

const router = express.Router();

/* =========================
   GET /api/contact (TEST)
   ========================= */
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM contact');
    res.json(rows);
  } catch (err) {
    console.error('Contact GET error:', err);
    res.status(500).json({ error: 'DB error' });
  }
});

/* =========================
   POST /api/contact
   ========================= */
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('subject').trim().notEmpty().withMessage('Subject required'),
    body('message').trim().notEmpty().withMessage('Message required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, subject, message } = req.body;

    try {
      const [result] = await pool.execute(
        'INSERT INTO contact (name, email, subject, message) VALUES (?, ?, ?, ?)',
        [name, email, subject, message]
      );

      // optional email notification
      if (
        process.env.SMTP_HOST &&
        process.env.SMTP_USER &&
        process.env.SMTP_PASS &&
        process.env.CONTACT_NOTIFICATION_EMAIL
      ) {
        try {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          await transporter.sendMail({
            from: `"PreviCare Contact" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_NOTIFICATION_EMAIL,
            subject: `New contact: ${subject}`,
            text: `${name} <${email}>\n\n${message}`,
          });
        } catch (mailErr) {
          console.warn('Contact email send failed:', mailErr);
        }
      }

      res.status(201).json({
        id: result.insertId,
        message: 'Message received',
      });
    } catch (err) {
      console.error('Contact save error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

module.exports = router;
