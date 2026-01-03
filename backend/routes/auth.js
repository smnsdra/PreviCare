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

    // تحقق صارم (ولا قيمة فاضية)
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !gender ||
      !date_of_birth ||
      height === undefined ||
      weight === undefined
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // تأكد أن البريد غير مستخدم
    const [exists] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (exists.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // تشفير كلمة المرور
    const password_hash = await bcrypt.hash(password, 10);

    // إدخال البيانات (بدون null)
    const [result] = await db.query(
      `
      INSERT INTO users
      (first_name, last_name, email, password_hash, gender, date_of_birth, height, weight)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        first_name.trim(),
        last_name.trim(),
        email.trim(),
        password_hash,
        gender,
        date_of_birth,          // DATE
        Number(height),         // INT
        Number(weight),         // INT
      ]
    );

    // JWT
    const token = jwt.sign(
      {
        id: result.insertId,
        email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
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
