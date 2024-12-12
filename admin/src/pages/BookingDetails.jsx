import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

const BookingDetails = () => {
  const { bookingId } = useParams(); // Get booking ID from the URL
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch booking details from the backend
  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const headers = { token: `${token}` };

      const response = await axios.get(
        `http://localhost:5001/api/orders/${bookingId}`,
        { headers }
      );

      setBooking(response.data.booking);
    } catch (err) {
      console.error("Error fetching booking details:", err);
      setError("Failed to load booking details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Booking Details
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : booking ? (
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Hotel: {booking.hotelId?.name || "N/A"}
            </Typography>
            <Typography>Address: {booking.hotelId?.address || "N/A"}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Room Details:
            </Typography>
            <Typography>Title: {booking.roomId?.title || "N/A"}</Typography>
            <Typography>Price: ${booking.roomId?.price || 0} per night</Typography>
            <Typography>
              Capacity: {booking.roomId?.capacity || "N/A"} guests
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Booking Dates:
            </Typography>
            <Typography>
              Check-In:{" "}
              {booking.checkIn ? new Date(booking.checkIn).toDateString() : "N/A"}
            </Typography>
            <Typography>
              Check-Out:{" "}
              {booking.checkOut ? new Date(booking.checkOut).toDateString() : "N/A"}
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Customer Information:
            </Typography>
            <Typography>Name: {booking.customerName || "N/A"}</Typography>
            <Typography>Email: {booking.customerEmail || "N/A"}</Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Booking Status:
            </Typography>
            <Typography>Status: {booking.status || "N/A"}</Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography>No booking details available.</Typography>
      )}
    </Container>
  );
};

export default BookingDetails;
