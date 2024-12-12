const express = require("express");
const router = express.Router();
const {
    getTotalBookings,
    getActiveUsers,
    getTotalUsers,
    getRoomDistribution,
    getBookingTrends,
    getRevenueTrends,
} = require("../controllers/metricsController");

// Total Bookings
router.get("/bookings/total", getTotalBookings);

// Active Users
router.get("/users/active", getActiveUsers);

// Total Registered Users
router.get("/users/total", getTotalUsers);

// Room Distribution
router.get("/rooms/distribution", getRoomDistribution);

// Booking Trends
router.get("/bookings/trends", getBookingTrends);

// Revenue Trends
router.get("/revenue/trends", getRevenueTrends);

module.exports = router;
