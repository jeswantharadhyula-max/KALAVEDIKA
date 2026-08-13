const express = require('express');
const multer  = require('multer');
const path    = require('path');
const db      = require('../db');
const auth    = require('../middleware/auth');
const router  = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (_, file, cb) => cb(null, `img-${Date.now()}-${Math.round(Math.random()*1e9)}${path.extname(file.originalname)}`),
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// GET /api/members
router.get('/', (req, res) => {
  const { domain, generation, year, department } = req.query;
  let sql = 'SELECT * FROM members WHERE 1=1';
  const params = [];
  if (domain)     { sql += ' AND domain = ?';     params.push(domain); }
  if (generation) { sql += ' AND generation = ?'; params.push(generation); }
  if (year)       { sql += ' AND year = ?';       params.push(year); }
  if (department) { sql += ' AND department = ?'; params.push(department); }
  sql += ' ORDER BY created_at DESC';
  res.json(db.prepare(sql).all(...params));
});

// GET /api/members/:id
router.get('/:id', (req, res) => {
  const member = db.prepare('SELECT * FROM members WHERE id = ?').get(req.params.id);
  if (!member) return res.status(404).json({ error: 'Member not found' });
  res.json(member);
});

// POST /api/members  (admin only)
router.post('/', auth, upload.single('photo'), (req, res) => {
  const { name, position, description, domain, generation, roll_number, year, department } = req.body;
  const photo_url = req.file ? `/uploads/${req.file.filename}` : req.body.photo_url || '';
  const now = new Date().toISOString();
  const result = db.prepare(
    'INSERT INTO members (name,position,description,photo_url,domain,generation,roll_number,year,department,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
  ).run(name, position, description, photo_url, domain, generation, roll_number, year, department, now, now);
  res.status(201).json({ id: result.lastInsertRowid });
});

// PUT /api/members/:id  (admin only)
router.put('/:id', auth, upload.single('photo'), (req, res) => {
  const { name, position, description, domain, generation, roll_number, year, department } = req.body;
  const photo_url = req.file ? `/uploads/${req.file.filename}` : req.body.photo_url;
  const now = new Date().toISOString();
  db.prepare(
    'UPDATE members SET name=?,position=?,description=?,photo_url=?,domain=?,generation=?,roll_number=?,year=?,department=?,updated_at=? WHERE id=?'
  ).run(name, position, description, photo_url, domain, generation, roll_number, year, department, now, req.params.id);
  res.json({ updated: true });
});

// DELETE /api/members/:id  (admin only)
router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM members WHERE id = ?').run(req.params.id);
  res.json({ deleted: true });
});

module.exports = router;
