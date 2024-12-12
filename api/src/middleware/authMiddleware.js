const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify token and authenticate user
exports.protect = async (req, res, next) => {
  let token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request object
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(404).json({ message: "User not found." });
    }

    next(); // Continue to the next middleware or controller
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired. Please log in again." });
    }
    res.status(403).json({ message: "Invalid token." });
  }
};

// Middleware to authorize based on roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Ensure the user has one of the allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. You do not have permission to perform this action.`,
      });
    }
    next(); // User is authorized, proceed
  };
};
