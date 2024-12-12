const express = require("express");
const { 
  addHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
  searchHotels,
} = require("../controllers/hotelController");

const router = express.Router();

// Routes
router.post("/", addHotel); // Add a new hotel
router.get("/", getHotels); // Get all hotels
router.get("/:id", getHotelById); // Get a single hotel by ID
router.put("/:id", updateHotel); // Update a hotel
router.delete("/:id", deleteHotel); // Delete a hotel
router.get("/search", searchHotels); // Search hotels

module.exports = router;
