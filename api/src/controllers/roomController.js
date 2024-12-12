const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
const path = require('path');

// Add a new room
exports.addRoom = async (req, res) => {
  try {
    const { hotelId, title, description, price, capacity } = req.body;
    const images = req.files.map((file) => file.path);
    console.log(images);
    if (!hotelId || !title || !description || !images || !price || !capacity) {
      return res.status(400).json({ message: "All fields are required" });
     }

    const room = await Room.create({
      hotelId,
      title,
      description,
      images,
      price,
      capacity
    });

    // Add room to the corresponding hotel
    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: room._id } });

    res.status(201).json({ message: "Room added successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("hotelId", "name address");
    res.status(200).json({ rooms });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get a specific room by ID
exports.getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id).populate("hotelId", "name address");

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ room });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update room details
exports.updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, images, price, capacity, roomStatus } = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { title, description, images, price, capacity, roomStatus },
      { new: true, runValidators: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ message: "Room updated successfully", updatedRoom });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete a room
exports.deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the room by ID
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Remove the room ID from the hotel's room list
    await Hotel.findByIdAndUpdate(room.hotelId, { $pull: { rooms: id } });

    // Delete the room
    await Room.deleteOne({ _id: id });

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error.message); // Log the error for debugging
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Check room availability
exports.checkRoomAvailability = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut } = req.body;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const isAvailable = !room.bookings.some((booking) => {
      const existingCheckIn = new Date(booking.checkIn);
      const existingCheckOut = new Date(booking.checkOut);

      return (
        new Date(checkIn) <= existingCheckOut && new Date(checkOut) >= existingCheckIn
      );
    });

    if (!isAvailable) {
      return res.status(400).json({ message: "Room is not available for the selected dates" });
    }

    res.status(200).json({ message: "Room is available" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
exports.getRoomBookings = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId).populate({
      path: "bookings.bookingId",
      populate: {
        path: "userId",
        select: "fullName email",
      },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ bookings: room.bookings });
  } catch (error) {
    console.error("Error fetching room bookings:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// Search rooms by date
exports.searchRoomsByDate = async (req, res) => {
  try {
    const { checkIn, checkOut, keyword } = req.query;

    // Validate that check-in and check-out dates are provided
    if (!checkIn || !checkOut) {
      return res.status(400).json({ message: "Check-in and check-out dates are required" });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Construct the keyword query
    const keywordQuery = keyword
      ? {
          $or: [
            { title: { $regex: `.*${keyword.trim()}.*`, $options: "i" } }, // Case-insensitive, trims whitespace
            { description: { $regex: `.*${keyword.trim()}.*`, $options: "i" } },
          ],
        }
      : {};


    // Query all rooms with optional keyword filtering
    const rooms = await Room.find(keywordQuery).populate("hotelId", "name address");


    if (!rooms.length) {
      return res.status(200).json({ rooms: [] }); // Return empty if no rooms match the keyword
    }

    // Filter rooms based on booking dates
    const availableRooms = rooms.filter((room) =>
      room.bookings.every((booking) => {
        const existingCheckIn = new Date(booking.checkIn);
        const existingCheckOut = new Date(booking.checkOut);

        // Room is available if there are no overlapping bookings
        return checkOutDate <= existingCheckIn || checkInDate >= existingCheckOut;
      })
    );


    res.status(200).json({ rooms: availableRooms });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};





// Search rooms by keywords
exports.searchRoomsByKeywords = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Use MongoDB's text search to find matching rooms
    const rooms = await Room.find({ $text: { $search: query } }).populate("hotelId", "name address");

    if (rooms.length === 0) {
      return res.status(404).json({ message: "No rooms found matching the query" });
    }

    res.status(200).json({ rooms });
  } catch (error) {
    console.error("Error searching rooms by keywords:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

