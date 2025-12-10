const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = process.env.DB_PATH || path.join("/data", "dashboard.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      site_name TEXT NOT NULL DEFAULT 'Altorf',
      subtitle TEXT NOT NULL DEFAULT 'Jouw centrale afstandsbediening'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS theme (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      primary_color TEXT,
      background_color TEXT,
      accent_color TEXT,
      border_radius INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      icon TEXT,
      color TEXT,
      position INTEGER,
      enabled INTEGER NOT NULL DEFAULT 1
    )
  `);

  db.run(`
    INSERT INTO settings (id)
    SELECT 1
    WHERE NOT EXISTS (SELECT 1 FROM settings WHERE id = 1)
  `);

  db.run(`
    INSERT INTO theme (id)
    SELECT 1
    WHERE NOT EXISTS (SELECT 1 FROM theme WHERE id = 1)
  `);
});

module.exports = db;
