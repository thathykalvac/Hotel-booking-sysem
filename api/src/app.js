const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Load environment variables
dotenv.config();

// App initialization
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Routes
const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const roomRoutes = require("./routes/roomRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");
const metricsRoutes = require("./routes/metricsRoutes");
app.use("/api/metrics", metricsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
