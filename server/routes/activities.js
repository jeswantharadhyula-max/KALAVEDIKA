const express = require('express');
const db      = require('../db');
const auth    = require('../middleware/auth');
const router  = express.Router();

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM activities ORDER BY created_at DESC').all();
  res.json(rows.map(r => ({ ...r, gallery_json: JSON.parse(r.gallery_json || '[]') })));
});

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM activities WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Activity not found' });
  res.json({ ...row, gallery_json: JSON.parse(row.gallery_json || '[]') });
});

router.post('/', auth, (req, res) => {
  const { title, description, category, date, image_url, gallery_json } = req.body;
  const now = new Date().toISOString();
  const result = db.prepare(
    'INSERT INTO activities (title,description,category,date,image_url,gallery_json,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)'
  ).run(title, description, category, date, image_url, JSON.stringify(gallery_json || []), now, now);
  res.status(201).json({ id: result.lastInsertRowid });
});

router.put('/:id', auth, (req, res) => {
  const { title, description, category, date, image_url, gallery_json } = req.body;
  const now = new Date().toISOString();
  db.prepare(
    'UPDATE activities SET title=?,description=?,category=?,date=?,image_url=?,gallery_json=?,updated_at=? WHERE id=?'
  ).run(title, description, category, date, image_url, JSON.stringify(gallery_json || []), now, req.params.id);
  res.json({ updated: true });
});

router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM activities WHERE id = ?').run(req.params.id);
  res.json({ deleted: true });
});

module.exports = router;
