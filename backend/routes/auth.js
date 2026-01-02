const express = require("express");
const pool = require("../db");

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    gender,
    date_of_birth,
    height,
    weight,
  } = req.body;

  try {
    const [result] = await pool.execute(
      `
      INSERT INTO users
      (first_name, last_name, email, password, gender, date_of_birth, height, weight)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        first_name,
        last_name,
        email,
        password,
        gender,
        date_of_birth,
        height || null,
        weight || null,
      ]
    );

    res.json({
      success: true,
      id: result.insertId,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({
      error: "DB error",
      details: err.message,
    });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({
      success: true,
      user: rows[0],
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({
      error: "DB error",
      details: err.message,
    });
  }
});

module.exports = router;
