import express from "express";
import pool from "./config/database.js";

const app = express();

app.use(express.json());

/*
|--------------------------------------------------------------------------
| Health
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "CookBook API is running",
  });
});

/*
|--------------------------------------------------------------------------
| Database Health
|--------------------------------------------------------------------------
*/

app.get("/api/health/db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS time");

    res.json({
      status: "ok",
      database: "connected",
      time: result.rows[0].time,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

export default app;