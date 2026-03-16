
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use("/", itemRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use("/", authRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("Backend is live...");
});