const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { body, validationResult } = require('express-validator');

const router = express.Router();

/**
 * POST /api/auth/register
 * Body: { name, email, password }
 */
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be >= 6 chars'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    try {
      const [existing] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
      if (existing.length > 0) return res.status(409).json({ error: 'Email already registered' });

      const hashed = await bcrypt.hash(password, 10);
      const [result] = await pool.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
        name,
        email,
        hashed,
      ]);

      const userId = result.insertId;
      const token = jwt.sign({ id: userId, name }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });

      return res.status(201).json({ token, user: { id: userId, name, email } });
    } catch (err) {
      console.error('Register error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      const [rows] = await pool.execute('SELECT id, name, password FROM users WHERE email = ?', [email]);
      if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

      const user = rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET || 'devsecret', {
        expiresIn: '7d',
      });

      return res.json({ token, user: { id: user.id, name: user.name, email } });
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

module.exports = router;
