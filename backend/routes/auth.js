const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

/* =========================
   REGISTER
========================= */
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

    // 1️⃣ تحقق من الحقول الأساسية
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 2️⃣ تحقق إذا الإيميل موجود
    const [existing] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // 3️⃣ تشفير كلمة المرور
    const password_hash = await bcrypt.hash(password, 10);

    // 4️⃣ إدخال المستخدم
    const [result] = await db.query(
      `
      INSERT INTO users
      (first_name, last_name, email, password_hash, gender, date_of_birth, height, weight)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        first_name,
        last_name,
        email,
        password_hash,
        gender || null,
        date_of_birth || null,
        height !== "" ? Number(height) : null,
        weight !== "" ? Number(weight) : null,
      ]
    );

    // 5️⃣ إنشاء JWT
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET IS MISSING");
      return res.status(500).json({ error: "JWT not configured" });
    }

    const token = jwt.sign(
      { id: result.insertId, email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6️⃣ الرد
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

module.exports = router;
