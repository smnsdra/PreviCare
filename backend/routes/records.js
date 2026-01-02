const express = require('express');
const pool = require('../db');
const { body, validationResult, param } = require('express-validator');
const authenticate = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/records
 * Create a record (protected)
 * Body: { title, description, date }
 */
router.post(
  '/',
  authenticate,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').optional().trim(),
    body('date').optional().isISO8601().withMessage('Date must be ISO8601'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, description, date } = req.body;
    const userId = req.user.id;

    try {
      const [result] = await pool.execute(
        'INSERT INTO records (user_id, title, description, date) VALUES (?, ?, ?, ?)',
        [userId, title, description || null, date || null]
      );
      const insertedId = result.insertId;
      return res.status(201).json({ id: insertedId });
    } catch (err) {
      console.error('Create record error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * GET /api/records
 * List records for authenticated user
 */
router.get('/', authenticate, async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await pool.execute('SELECT id, title, description, date, created_at FROM records WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    res.json(rows);
  } catch (err) {
    console.error('List records error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/records/:id
 * Read single record (must belong to user)
 */
router.get('/:id', authenticate, [param('id').isInt()], async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    const [rows] = await pool.execute('SELECT id, title, description, date, created_at FROM records WHERE id = ? AND user_id = ?', [id, userId]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Get record error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /api/records/:id
 * Update record (owner only)
 */
router.put('/:id', authenticate, [param('id').isInt()], async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  const { title, description, date } = req.body;
  try {
    const [rows] = await pool.execute('SELECT id FROM records WHERE id = ? AND user_id = ?', [id, userId]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found or not allowed' });

    await pool.execute('UPDATE records SET title = ?, description = ?, date = ? WHERE id = ?', [
      title || null,
      description || null,
      date || null,
      id,
    ]);
    res.json({ message: 'Updated' });
  } catch (err) {
    console.error('Update record error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /api/records/:id
 */
router.delete('/:id', authenticate, [param('id').isInt()], async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    const [rows] = await pool.execute('SELECT id FROM records WHERE id = ? AND user_id = ?', [id, userId]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found or not allowed' });

    await pool.execute('DELETE FROM records WHERE id = ?', [id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Delete record error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
