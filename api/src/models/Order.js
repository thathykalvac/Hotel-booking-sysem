const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Booked", "Cancelled"], default: "Booked" },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);