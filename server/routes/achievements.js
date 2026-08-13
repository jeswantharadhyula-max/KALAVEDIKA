const express = require('express');
const db      = require('../db');
const auth    = require('../middleware/auth');
const router  = express.Router();

router.get('/', (_req, res) =>
  res.json(db.prepare('SELECT * FROM achievements ORDER BY year DESC, created_at DESC').all())
);

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM achievements WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

router.post('/', auth, (req, res) => {
  const { title, description, year, image_url, award_image_url } = req.body;
  const now = new Date().toISOString();
  const result = db.prepare(
    'INSERT INTO achievements (title,description,year,image_url,award_image_url,created_at,updated_at) VALUES (?,?,?,?,?,?,?)'
  ).run(title, description, year, image_url, award_image_url, now, now);
  res.status(201).json({ id: result.lastInsertRowid });
});

router.put('/:id', auth, (req, res) => {
  const { title, description, year, image_url, award_image_url } = req.body;
  const now = new Date().toISOString();
  db.prepare(
    'UPDATE achievements SET title=?,description=?,year=?,image_url=?,award_image_url=?,updated_at=? WHERE id=?'
  ).run(title, description, year, image_url, award_image_url, now, req.params.id);
  res.json({ updated: true });
});

router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM achievements WHERE id = ?').run(req.params.id);
  res.json({ deleted: true });
});

module.exports = router;
