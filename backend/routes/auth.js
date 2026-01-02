const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
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

    const hashed = await bcrypt.hash(password, 10);

    await pool.execute(
      `INSERT INTO users 
      (first_name, last_name, email, password, gender, date_of_birth, height, weight)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, email, hashed, gender, date_of_birth, height, weight]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

module.exports = router;
