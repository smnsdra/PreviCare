const express = require("express");
const { body, validationResult } = require("express-validator");
const pool = require("../db");

const router = express.Router();

router.post(
  "/",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("subject").notEmpty(),
    body("message").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    try {
      const [rows] = await pool.query(
        "SELECT IFNULL(MAX(id), 0) + 1 AS nextId FROM contact"
      );

      const nextId = rows[0].nextId;

      await pool.execute(
        "INSERT INTO contact (id, name, email, subject, message) VALUES (?, ?, ?, ?, ?)",
        [nextId, name, email, subject, message]
      );

      res.status(201).json({ message: "Message saved" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "DB error", details: err.message });
    }
  }
);

module.exports = router;
