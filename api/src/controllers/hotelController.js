const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

// Add a new hotel
exports.addHotel = async (req, res) => {
  try {
    const { name, address, location, description } = req.body;

    if (!name || !address || !location || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hotel = await Hotel.create({ name, address, location, description });
    res.status(201).json({ message: "Hotel added successfully", hotel });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all hotels
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate("rooms"); // Populate rooms if needed
    res.status(200).json({ hotels });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get a single hotel by ID
exports.getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id).populate("rooms"); // Include room details

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({ hotel });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update a hotel
exports.updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, location, description } = req.body;

    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { name, address, location, description },
      { new: true, runValidators: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({ message: "Hotel updated successfully", updatedHotel });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete a hotel
exports.deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Attempting to delete hotel with ID:", id);

    // Check if the hotel exists
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      console.error("Hotel not found:", id);
      return res.status(404).json({ message: "Hotel not found" });
    }

    console.log("Hotel found. Deleting associated rooms...");
    // Remove all associated rooms
    await Room.deleteMany({ hotelId: id });

    console.log("Deleting hotel...");
    // Delete the hotel document
    await Hotel.findByIdAndDelete(id);

    console.log("Hotel deleted successfully:", id);
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    console.error("Error during hotel deletion:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Search hotels by name or location
exports.searchHotels = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const hotels = await Hotel.find({ $text: { $search: query } });

    if (hotels.length === 0) {
      return res.status(404).json({ message: "No hotels found matching the query" });
    }

    res.status(200).json({ hotels });
  } catch (error) {
    console.error("Error searching hotels:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
