require("dotenv").config();
const express = require("express");
const cors = require("cors");

const contactRoutes = require("./routes/contact");
const usersRoutes = require("./routes/users");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://smnsdra.github.io",
      "http://localhost:3000"
    ]
  })
);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/api/contact", contactRoutes);
app.use("/api/users", usersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started"));

