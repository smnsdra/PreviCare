require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const recordsRoutes = require('./routes/records');
const volunteersRoutes = require('./routes/volunteers');
const contactRoutes = require('./routes/contact');
const pool = require('./db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

// Serve uploaded CVs statically (be mindful of exposing uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health
app.get('/', (req, res) => res.send('PreviCare backend is running'));

// API
app.use('/api/auth', authRoutes);
app.use('/api/records', recordsRoutes);
app.use('/api/volunteers', volunteersRoutes);
app.use('/api/contact', contactRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
