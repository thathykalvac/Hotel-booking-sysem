import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Typography, Dialog, DialogActions, DialogContent } from "@mui/material";

const BookingSuccess = () => {
  const [showPrompt, setShowPrompt] = useState(true); // Show confirmation prompt
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure page has payment_success query parameter
    const queryParams = new URLSearchParams(window.location.search);
    if (!queryParams.get("payment_success")) {
      navigate("/"); // Redirect to home if invalid access
    }
  }, [navigate]);

  const handleConfirmBooking = async () => {
    try {
      setError("");
      const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));
      const token = localStorage.getItem("token");
      const headers = { token: `${token}` };

      const response = await axios.post("http://localhost:5001/api/orders/book", bookingDetails, {
        headers,
      });

      console.log("Booking created successfully:", response.data);
      localStorage.removeItem("bookingDetails"); // Clear temporary data
      navigate("/user/bookings"); // Redirect to bookings
    } catch (err) {
      console.error("Error confirming booking:", err);
      setError("Failed to confirm booking. Please try again.");
    }
  };

  return (
    <Dialog open={showPrompt}>
      <DialogContent>
        <Typography variant="h6">Payment Successful</Typography>
        <Typography variant="body1">
          Do you want to confirm the booking for the room you selected?
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigate("/")} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleConfirmBooking} color="primary">
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingSuccess;
