const express = require('express');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const pool = require('../db');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Ensure uploads dir exists
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Multer storage config (store files on disk)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const safe = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, safe);
  }
});

// Accept only common CV types and limit size to 5MB
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  }
});

router.post(
  '/',
  upload.single('cv'),
  [
    body('name').trim().notEmpty().withMessage('Name required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('phone').optional().trim(),
    body('motivation').optional().trim(),
    body('teams').optional()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // delete file if validation fails
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, phone, education, major, institution, motivation, passion, teams, teamExplanation, hoursPerWeek, additional } = req.body;
      const teamsJson = Array.isArray(teams) ? JSON.stringify(teams) : (teams ? JSON.stringify(teams.split(',').map(t => t.trim())) : JSON.stringify([]));
      const cvFileName = req.file ? req.file.filename : null;
      const cvPath = req.file ? `/uploads/${req.file.filename}` : null;

      const [result] = await pool.execute(
        `INSERT INTO volunteers
         (name, email, phone, education, major, institution, motivation, passion, teams, team_explanation, hours_per_week, additional, cv_file_name, cv_path)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, email, phone || null, education || null, major || null, institution || null, motivation || null, passion || null, teamsJson, teamExplanation || null, hoursPerWeek || null, additional || null, cvFileName, cvPath]
      );

      return res.status(201).json({ id: result.insertId, message: 'Application received' });
    } catch (err) {
      console.error('Volunteer save error:', err);
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

module.exports = router;
