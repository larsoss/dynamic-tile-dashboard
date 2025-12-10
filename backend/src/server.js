const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

app.use(cors());
app.use(express.json());

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

app.get("/api/config", (req, res) => {
  db.get("SELECT site_name, subtitle FROM settings WHERE id = 1", (_, settings) => {
    db.get(
      "SELECT primary_color, background_color, accent_color, border_radius FROM theme WHERE id = 1",
      (_, theme) => {
        db.all(
          "SELECT id, title, url, icon, color, position, enabled FROM tiles ORDER BY position",
          (_, tiles) => {
            res.json({
              settings,
              theme,
              tiles
            });
          }
        );
      }
    );
  });
});

app.post("/api/config", requireAuth, (req, res) => {
  const { settings, theme, tiles } = req.body;

  db.serialize(() => {
    db.run("BEGIN TRANSACTION");

    if (settings) {
      db.run(
        "UPDATE settings SET site_name = ?, subtitle = ? WHERE id = 1",
        [settings.site_name, settings.subtitle]
      );
    }

    if (theme) {
      db.run(
        "UPDATE theme SET primary_color=?, background_color=?, accent_color=?, border_radius=? WHERE id=1",
        [theme.primary_color, theme.background_color, theme.accent_color, theme.border_radius]
      );
    }

    if (Array.isArray(tiles)) {
      db.run("DELETE FROM tiles");
      const stmt = db.prepare(
        "INSERT INTO tiles (title, url, icon, color, position, enabled) VALUES (?, ?, ?, ?, ?, ?)"
      );
      tiles.forEach((t, i) =>
        stmt.run(t.title, t.url, t.icon, t.color, t.position ?? i, t.enabled ? 1 : 0)
      );
      stmt.finalize();
    }

    db.run("COMMIT");
    res.json({ ok: true });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend draait op poort ${PORT}`);
});
