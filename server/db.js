const Database = require('better-sqlite3');
const path     = require('path');

// server/db.js  →  ../../data/kalavedika.db  →  root/data/kalavedika.db
const dbPath = path.join(__dirname, '..', 'data', 'kalavedika.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

module.exports = db;
