const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const multer = require("multer");
const {
  addRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  checkRoomAvailability,
  getRoomBookings,
  searchRoomsByDate,
  searchRoomsByKeywords,
  // searchRooms,
} = require("../controllers/roomController");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename files to avoid conflicts
  },
});
const upload = multer({ storage });

const router = express.Router();

// Add a new room with image upload
router.post("/create", protect, authorize("admin"), upload.array("images", 5), addRoom);

// Get all rooms
router.get("/all", getRooms);

// Get room metrics (total, occupied, vacant)
router.get("/metrics", protect, authorize("admin"), async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    const occupiedRooms = await Room.countDocuments({ roomStatus: "occupied" });
    const vacantRooms = totalRooms - occupiedRooms;

    res.status(200).json({
      success: true,
      metrics: {
        totalRooms,
        occupiedRooms,
        vacantRooms,
      },
    });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({ success: false, message: "Error fetching metrics" });
  }
});


// Check room availability
router.post("/availability", checkRoomAvailability);
router.get("/:roomId/bookings", protect, authorize("admin"), getRoomBookings);
router.get("/search", searchRoomsByDate);
router.get("/keyword", searchRoomsByKeywords);
// router.get("/search", searchRooms);
// Get a single room by ID
router.get("/:id", getRoomById);

// Update a room by ID
router.put("/:id", protect, authorize("admin"), upload.array("images", 5), updateRoom);

// Delete a room by ID
router.delete("/:id", protect, authorize("admin"), deleteRoom);

module.exports = router;
