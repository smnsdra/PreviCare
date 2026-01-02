const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    gender,
    date_of_birth,
    height,
    weight
  } = req.body;

  if (!first_name || !last_name || !email || !password || !gender || !date_of_birth) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users
      (first_name, last_name, email, password, gender, date_of_birth, height, weight)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        first_name,
        last_name,
        email,
        hashedPassword,
        gender,
        date_of_birth,
        height || null,
        weight || null
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        const token = jwt.sign(
          { id: result.insertId, email },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        res.json({
          token,
          user: {
            id: result.insertId,
            first_name,
            last_name,
            email
          }
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (rows.length === 0) return res.status(401).json({ error: "Invalid credentials" });

      const user = rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        token,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        }
      });
    }
  );
});

module.exports = router;
