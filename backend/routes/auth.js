const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [exists] = await db.query(
      "SELECT id FROM registration WHERE email = ?",
      [email]
    );

    if (exists.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO registration (first_name, last_name, email, password_hash)
       VALUES (?, ?, ?, ?)`,
      [first_name, last_name, email, password_hash]
    );

    const token = jwt.sign(
      { id: result.insertId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: result.insertId,
        first_name,
        last_name,
        email,
      },
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM registration WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
