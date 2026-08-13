const express = require('express');
const db      = require('../db');
const auth    = require('../middleware/auth');
const router  = express.Router();

router.get('/', (_req, res) =>
  res.json(db.prepare('SELECT * FROM founders ORDER BY display_order ASC').all())
);

router.post('/', auth, (req, res) => {
  const { name, role, description, photo_url, year_founded, display_order } = req.body;
  const now = new Date().toISOString();
  const result = db.prepare(
    'INSERT INTO founders (name,role,description,photo_url,year_founded,display_order,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)'
  ).run(name, role, description, photo_url, year_founded, display_order, now, now);
  res.status(201).json({ id: result.lastInsertRowid });
});

router.put('/:id', auth, (req, res) => {
  const { name, role, description, photo_url, year_founded, display_order } = req.body;
  const now = new Date().toISOString();
  db.prepare(
    'UPDATE founders SET name=?,role=?,description=?,photo_url=?,year_founded=?,display_order=?,updated_at=? WHERE id=?'
  ).run(name, role, description, photo_url, year_founded, display_order, now, req.params.id);
  res.json({ updated: true });
});

router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM founders WHERE id = ?').run(req.params.id);
  res.json({ deleted: true });
});

module.exports = router;
