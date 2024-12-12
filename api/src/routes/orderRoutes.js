const express = require("express");
const {
  createBooking,
  getAllBookingsAdmin,
  getUserBookings,
  cancelBooking,
  approveBooking,
  getBookingDetails,
  getBookingMetrics,
  rejectBooking,
  cancelUserBooking,
  createStripeSession,
  getPaymentDetails,
  stripeWebhook,
} = require("../controllers/bookingController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Routes for user and admin
router.post("/book", protect, createBooking); // Create a new booking
router.get("/user", protect, getUserBookings); // Get bookings for logged-in user
router.get("/:id", protect, getBookingDetails);
router.put("/:id/cancel", protect, cancelUserBooking); // User-specific cancellation
router.get("/payment-details", getPaymentDetails);
// Admin-specific routes
router.get("/", protect, authorize("admin"), getAllBookingsAdmin); // Get all bookings (admin only)
router.get("/metrics", protect, authorize("admin"), getBookingMetrics);
router.put("/:id/cancel", protect, authorize("admin"), cancelBooking);
router.put("/:id/approve", protect, authorize("admin"), approveBooking); // Approve a booking (admin only)
router.put("/:id/reject", protect, authorize("admin"), rejectBooking);
router.post("/stripe-session", createStripeSession);
router.post("/stripe-webhook", express.raw({ type: "application/json" }), stripeWebhook);
module.exports = router;
