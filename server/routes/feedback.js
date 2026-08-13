const express = require('express');
const db      = require('../db');
const auth    = require('../middleware/auth');
const router  = express.Router();

// POST /api/feedback  (public — anyone can submit)
router.post('/', (req, res) => {
  const { name, email, phone, category, rating, message } = req.body;
  if (!name || !message) return res.status(400).json({ error: 'Name and message are required' });
  const now = new Date().toISOString();
  const result = db.prepare(
    'INSERT INTO feedback (name,email,phone,category,rating,message,created_at) VALUES (?,?,?,?,?,?,?)'
  ).run(name, email || '', phone || '', category || 'General', rating || 5, message, now);
  res.status(201).json({ id: result.lastInsertRowid, message: 'Feedback submitted. Thank you!' });
});

// GET /api/feedback  (admin only)
router.get('/', auth, (_req, res) =>
  res.json(db.prepare('SELECT * FROM feedback ORDER BY created_at DESC').all())
);

// DELETE /api/feedback/:id  (admin only)
router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM feedback WHERE id = ?').run(req.params.id);
  res.json({ deleted: true });
});

module.exports = router;
