const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addReview, getRoomReviews } = require("../controllers/reviewController");

const router = express.Router();

router.post("/", protect, addReview);
router.get("/:roomId", getRoomReviews);

module.exports = router;