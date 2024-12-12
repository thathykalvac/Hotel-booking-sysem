const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    status: { type: String, enum: ["pending", "confirmed", "canceled"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
