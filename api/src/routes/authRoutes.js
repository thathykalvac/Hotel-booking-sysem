const express = require("express");
const { register, login, otpregister, verifyOtp } = require("../controllers/authController");

const router = express.Router();

// Routes for user registration and login
router.post("/otpregister", otpregister);
router.post("/verify-otp", verifyOtp);
router.post("/register", register); // Handles user registration
router.post("/login", login);       // Handles user login

module.exports = router;