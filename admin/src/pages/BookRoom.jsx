import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookRoom = ({ roomId }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleBooking = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");
      const headers = { token: `${token}` };

      const response = await axios.post(
        "http://localhost:5001/api/orders/book",
        {
          roomId,
          bookingDates: [checkIn, checkOut],
          customerName: "Your Name", // Replace with user data from auth
          customerEmail: "user@example.com", // Replace with user data from auth
        },
        { headers }
      );

      setSuccess("Booking confirmed!");
      setTimeout(() => navigate("/user/bookings"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to book room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Book Room
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <TextField
        label="Check-In Date"
        type="date"
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }}
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
      />
      <TextField
        label="Check-Out Date"
        type="date"
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }}
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleBooking}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Confirm Booking"}
      </Button>
    </Container>
  );
};

export default BookRoom;
