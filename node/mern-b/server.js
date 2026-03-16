require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

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
app.use("/", authRoutes);
app.use("/uploads", express.static("uploads"));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});