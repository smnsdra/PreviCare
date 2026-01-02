require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const recordsRoutes = require('./routes/records');
const volunteersRoutes = require('./routes/volunteers');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

/* =====================
   MIDDLEWARES
===================== */

// JSON body
app.use(express.json());

// ✅ CORS (هذا هو التعديل المهم)
app.use(
  cors({
    origin: [
      "https://smnsdra.github.io",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* =====================
   ROUTES
===================== */

// Health check
app.get('/', (req, res) => {
  res.send('PreviCare backend is running');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/records', recordsRoutes);
app.use('/api/volunteers', volunteersRoutes);
app.use('/api/contact', contactRoutes);

/* =====================
   ERROR HANDLER
===================== */
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

/* =====================
   START SERVER
===================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
