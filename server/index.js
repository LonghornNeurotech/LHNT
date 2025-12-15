/* eslint-env node */
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import pg from "pg";

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  PORT = 8080,
  CORS_ORIGIN = "*",
} = process.env;

const pool = new pg.Pool({
  host: DB_HOST,
  port: Number(DB_PORT || 5432),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  ssl: { rejectUnauthorized: false },
});

const app = express();
const allowedOrigins =
  CORS_ORIGIN === "*"
    ? "*"
    : CORS_ORIGIN.split(",").map((o) => o.trim()).filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins === "*") return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get("/api/progress", async (req, res) => {
  const eid = String(req.query.eid || "").trim().toLowerCase();
  if (!eid) return res.status(400).json({ error: "eid is required" });

  try {
    const result = await pool.query(
      "SELECT progress, full_name FROM member_progress WHERE eid = $1",
      [eid]
    );
    const row = result.rows[0];
    res.json({
      eid,
      full_name: row?.full_name || null,
      progress: row?.progress || { tasks: {}, submodules: {}, visited: {} },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/progress", async (req, res) => {
  const eid = String(req.body?.eid || "").trim().toLowerCase();
  const fullName = req.body?.full_name ? String(req.body.full_name).trim() : null;
  const progress = req.body?.progress;
  if (!eid) return res.status(400).json({ error: "eid is required" });
  if (!progress || typeof progress !== "object") {
    return res.status(400).json({ error: "progress is required" });
  }

  try {
    await pool.query(
      `
      INSERT INTO member_progress (eid, full_name, progress)
      VALUES ($1, $2, $3::jsonb)
      ON CONFLICT (eid)
      DO UPDATE SET
        full_name = COALESCE(EXCLUDED.full_name, member_progress.full_name),
        progress = EXCLUDED.progress
      `,
      [eid, fullName, JSON.stringify(progress)]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/delete-account", async (req, res) => {
  const eid = String(req.body?.eid || "").trim().toLowerCase();
  if (!eid) return res.status(400).json({ error: "eid is required" });

  try {
    await pool.query("DELETE FROM member_progress WHERE eid = $1", [eid]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Progress API listening on :${PORT}`);
});

