const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true }, // Hotel reference
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true }, // Room capacity (number of guests)
    roomStatus: {
      type: String,
      enum: ["available", "occupied", "maintenance"],
      default: "available",
    },
    bookings: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        checkIn: { type: Date, required: true },
        checkOut: { type: Date, required: true },
        status: { type: String, enum: ["confirmed", "canceled"], default: "confirmed" },
      },
    ],
  },
  { timestamps: true }
);
roomSchema.index({ title: "text", description: "text" });
module.exports = mongoose.model("Room", roomSchema);
