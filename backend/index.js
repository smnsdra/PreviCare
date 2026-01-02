require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const recordsRoutes = require("./routes/records");
const volunteersRoutes = require("./routes/volunteers");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: [
      "https://smnsdra.github.io",
      "http://localhost:3000",
    ],
  })
);

// health check
app.get("/", (req, res) => {
  res.send("Backend running");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/records", recordsRoutes);
app.use("/api/volunteers", volunteersRoutes);

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
