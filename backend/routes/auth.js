const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

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

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [exists] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (exists.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users
      (first_name, last_name, email, password_hash, gender, date_of_birth, height, weight)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name,
        last_name,
        email,
        password_hash,
        gender,
        date_of_birth,
        height,
        weight,
      ]
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
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
