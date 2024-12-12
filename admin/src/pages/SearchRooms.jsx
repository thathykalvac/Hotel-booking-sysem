import React, { useState } from "react";
import { Container, TextField, Button, Grid, Card, CardContent, Typography, Alert, CardMedia } from "@mui/material";
import axios from "axios";
import BookRoomModal from "./BookRoomModal"; // Import the modal

const SearchRooms = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [keyword, setKeyword] = useState(""); // New state for keyword search
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isSearchDisabled = !checkIn || !checkOut || new Date(checkOut) < new Date(checkIn);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `http://localhost:5001/api/rooms/search?checkIn=${checkIn}&checkOut=${checkOut}${keyword ? `&keyword=${keyword}` : ""}`
      );
      setRooms(response.data.rooms || []);
    } catch (err) {
      console.error("Error searching rooms:", err);
      setError("Failed to fetch rooms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Search Rooms
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <TextField
            type="date"
            fullWidth
            label="Check-In Date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            type="date"
            fullWidth
            label="Check-Out Date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            InputLabelProps={{ shrink: true }}
            error={checkOut && new Date(checkOut) < new Date(checkIn)}
            helperText={
              checkOut && new Date(checkOut) < new Date(checkIn)
                ? "Check-out date cannot be before check-in date."
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            type="text"
            fullWidth
            label="Keyword (optional)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., Deluxe, Suite"
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            fullWidth
            disabled={isSearchDisabled}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <Typography>Loading rooms...</Typography>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {rooms.map((room) => (
            <Grid item xs={12} md={4} key={room._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:5001/${room.images[0]}`}
                  alt={room.title}
                />
                <CardContent>
                  <Typography variant="h6" color="primary">
                    Hotel: {room.hotelId?.name || "N/A"}
                  </Typography>
                  <Typography variant="body2">{room.title}</Typography>
                  <Typography variant="body2">{room.description}</Typography>
                  <Typography variant="body2">Price: ${room.price}</Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleBookNow(room)}
                  sx={{ m: 1 }}
                >
                  Book Now
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {selectedRoom && (
        <BookRoomModal
          open={isModalOpen}
          onClose={handleModalClose}
          room={selectedRoom}
          checkIn={checkIn}
          checkOut={checkOut}
          onBookingComplete={handleSearch}
        />
      )}
    </Container>
  );
};

export default SearchRooms;
