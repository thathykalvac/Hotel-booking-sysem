const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  try {
    const { roomId, rating, comment } = req.body;

    if (!roomId || !rating || !comment) {
      return res.status(400).json({ message: "Room, rating, and comment are required" });
    }

    const review = await Review.create({
      user: req.user._id,
      room: roomId,
      rating,
      comment,
    });

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getRoomReviews = async (req, res) => {
  try {
    const { roomId } = req.params;

    const reviews = await Review.find({ room: roomId }).populate("user", "fullName");
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};