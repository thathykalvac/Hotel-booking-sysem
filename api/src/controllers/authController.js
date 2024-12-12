const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const OTP = require("otp-generator");
const sendEmail = require("../services/emailService");

const otpCache = new Map(); // Temporary in-memory store for OTPs
const registrationCache = new Map(); // Temporary in-memory store for registration data

// Register and send OTP
exports.otpregister = async (req, res) => {
  try {
    const { userName, fullName, email, phone, password } = req.body;

    if (!userName || !fullName || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Generate OTP and store it temporarily
    const otp = OTP.generate(6, { upperCase: false, specialChars: false });
    otpCache.set(email, otp);

    // Temporarily store registration data
    registrationCache.set(email, { userName, fullName, phone, password });

    // Send OTP via email
    await sendEmail(
      email,
      "Email Verification OTP",
      `Your OTP for registration is ${otp}. It is valid for 5 minutes.`,
      `<p>Your OTP for registration is <b>${otp}</b>. It is valid for 5 minutes.</p>`
    );

    res.status(200).json({ message: "OTP sent to your email. Verify to complete registration." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// Verify OTP and save user
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Validate OTP
    const validOtp = otpCache.get(email);
    if (!validOtp || validOtp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Retrieve registration data
    const registrationData = registrationCache.get(email);
    if (!registrationData) {
      return res.status(400).json({ message: "No registration data found for this email" });
    }

    // Save the user to the database
    const { userName, fullName, phone, password } = registrationData;
    const newUser = await User.create({ userName, fullName, email, phone, password });

    // Clean up OTP and registration data
    otpCache.delete(email);
    registrationCache.delete(email);

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { userName, fullName, email, phone, password } = req.body;

    if (!userName || !fullName || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.create({ userName, fullName, email, phone, password });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      token,
      role: user.role,
      message: user.role === "admin" ? "Admin login successful" : "User login successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};