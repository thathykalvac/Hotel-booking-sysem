const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    description: { type: String, required: true }, // Hotel description
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }], // Reference to Room model
  },
  { timestamps: true }
);
hotelSchema.index({ name: "text", address: "text", description: "text" });

module.exports = mongoose.model("Hotel", hotelSchema);
