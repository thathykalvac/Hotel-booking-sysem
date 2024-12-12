import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import axios from "axios";

const BookRoomModal = ({ open, onClose, room, checkIn, checkOut, onBookingComplete }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [roomCount, setRoomCount] = useState(1);
  const [showConfirmPrompt, setShowConfirmPrompt] = useState(false);
  const pricePerNight = room?.price || 0;

  const handleRoomCountChange = (increment) => {
    setRoomCount((prevCount) => Math.max(1, prevCount + increment));
  };

  const calculateTotalPrice = () => {
    const nights =
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24);
    return nights * pricePerNight * roomCount;
  };

  const handleStripePayment = async () => {
    try {
      setError("");
      const token = localStorage.getItem("token");
      const headers = { token: `${token}` };

      const bookingDetails = {
        roomId: room._id,
        bookingDates: [checkIn, checkOut],
        customerName: name,
        customerEmail: email,
        roomCount,
      };

      localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

      const response = await axios.post(
        "http://localhost:5001/api/orders/stripe-session",
        {
          roomId: room._id,
          checkIn,
          checkOut,
          roomCount,
          totalPrice: calculateTotalPrice(),
        },
        { headers }
      );

      console.log("Stripe session URL:", response.data.url);
      window.location.href = response.data.url;
    } catch (err) {
      console.error("Error initiating payment:", err);
      setError("Failed to initiate payment. Please try again.");
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("payment_success")) {
      setShowConfirmPrompt(true);
    }
  }, []);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Confirm Your Booking</DialogTitle>
      <DialogContent>
        {success && <Alert severity="success">Room booked successfully!</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" color="primary">
            Hotel: {room?.hotelId?.name || "N/A"}
          </Typography>
          <Typography variant="body1">Location: {room?.hotelId?.address || "N/A"}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Room: {room?.title}
          </Typography>
          <Box
            component="img"
            src={`http://localhost:5001/${room.images[0]}`}
            alt={room?.title}
            sx={{ width: "100%", height: "200px", objectFit: "cover", mt: 2 }}
          />
        </Box>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField label="Check-In" fullWidth margin="normal" value={checkIn} disabled />
        <TextField label="Check-Out" fullWidth margin="normal" value={checkOut} disabled />
        {/* <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Rooms:
          </Typography>
          <IconButton onClick={() => handleRoomCountChange(-1)} disabled={roomCount <= 1}>
            <Remove />
          </IconButton>
          <Typography>{roomCount}</Typography>
          <IconButton onClick={() => handleRoomCountChange(1)}>
            <Add />
          </IconButton>
        </Box> */}
        <Typography variant="h6" color="secondary" sx={{ mt: 2 }}>
          Total Price: ${calculateTotalPrice().toFixed(2)}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleStripePayment} color="primary">
          Proceed to Payment
        </Button>
      </DialogActions>

      {/* Confirmation Prompt */}
      {showConfirmPrompt && (
        <Dialog open={showConfirmPrompt}>
          <DialogTitle>Confirm Booking</DialogTitle>
          <DialogContent>
            <Typography>Payment successful! Confirm booking for the room?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowConfirmPrompt(false)} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={async () => {
                try {
                  const token = localStorage.getItem("token");
                  const headers = { token: `${token}` };

                  const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));
                  const response = await axios.post(
                    "http://localhost:5001/api/orders/book",
                    bookingDetails,
                    { headers }
                  );

                  console.log("Booking confirmed:", response.data);
                  setSuccess(true);
                  onBookingComplete(); // Refresh parent data
                  setShowConfirmPrompt(false); // Close prompt
                  onClose(); // Close modal
                } catch (err) {
                  console.error("Error confirming booking:", err);
                  setError("Failed to confirm booking. Please try again.");
                }
              }}
              color="primary"
            >
              Confirm Booking
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Dialog>
  );
};

export default BookRoomModal;
