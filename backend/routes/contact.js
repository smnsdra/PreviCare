const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /api/contact
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const id = Date.now();

    const sql = `
      INSERT INTO contact (id, name, email, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.execute(sql, [id, name, email, subject || null, message]);

    res.status(201).json({ message: "Contact saved successfully" });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({
      error: "DB error",
      details: err.message
    });
  }
});

module.exports = router;
