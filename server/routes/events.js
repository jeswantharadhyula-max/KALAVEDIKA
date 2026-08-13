const express = require('express');
const db      = require('../db');
const auth    = require('../middleware/auth');
const router  = express.Router();

// GET /api/events?upcoming=true
router.get('/', (req, res) => {
  let sql = 'SELECT * FROM events';
  const params = [];
  if (req.query.upcoming === 'true') { sql += ' WHERE is_upcoming = 1'; }
  sql += ' ORDER BY date ASC';
  res.json(db.prepare(sql).all(...params));
});

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Event not found' });
  res.json(row);
});

router.post('/', auth, (req, res) => {
  const { title, description, date, time, location, image_url, registration_info, is_upcoming } = req.body;
  const now = new Date().toISOString();
  const result = db.prepare(
    'INSERT INTO events (title,description,date,time,location,image_url,registration_info,is_upcoming,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)'
  ).run(title, description, date, time, location, image_url, registration_info, is_upcoming ? 1 : 0, now, now);
  res.status(201).json({ id: result.lastInsertRowid });
});

router.put('/:id', auth, (req, res) => {
  const { title, description, date, time, location, image_url, registration_info, is_upcoming } = req.body;
  const now = new Date().toISOString();
  db.prepare(
    'UPDATE events SET title=?,description=?,date=?,time=?,location=?,image_url=?,registration_info=?,is_upcoming=?,updated_at=? WHERE id=?'
  ).run(title, description, date, time, location, image_url, registration_info, is_upcoming ? 1 : 0, now, req.params.id);
  res.json({ updated: true });
});

router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM events WHERE id = ?').run(req.params.id);
  res.json({ deleted: true });
});

module.exports = router;
