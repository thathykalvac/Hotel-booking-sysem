import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      const headers = { token: `${token}` };

      const response = await axios.get("http://localhost:5001/api/orders/user", {
        headers,
      });
      setBookings(response.data.bookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { token: `${token}` };

      await axios.put(
        `http://localhost:5001/api/orders/${id}/cancel`,
        {},
        { headers }
      );

      setSuccessMessage("Booking canceled successfully.");
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === id ? { ...booking, status: "canceled" } : booking
        )
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error("Error canceling booking:", err);
      setError("Failed to cancel booking. Please try again.");
    }
  };

  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "canceled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}>
        Your Bookings
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {bookings.length === 0 ? (
            <Typography>No bookings found.</Typography>
          ) : (
            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Hotel</StyledTableCell>
                    <StyledTableCell>Room</StyledTableCell>
                    <StyledTableCell>Check-In</StyledTableCell>
                    <StyledTableCell>Check-Out</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.map((booking) => {
                    const isCancelable =
                      booking.status === "confirmed" &&
                      new Date(booking.checkIn) > new Date();

                    return (
                      <StyledTableRow key={booking._id}>
                        <TableCell>{booking.hotelId?.name || "N/A"}</TableCell>
                        <TableCell>{booking.roomId?.title || "N/A"}</TableCell>
                        <TableCell>{new Date(booking.checkIn).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(booking.checkOut).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Chip 
                            label={booking.status} 
                            color={getStatusColor(booking.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => viewBookingDetails(booking)}
                            sx={{ mr: 1 }}
                          >
                            Details
                          </Button>
                          {isCancelable && (
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => cancelBooking(booking._id)}
                            >
                              Cancel
                            </Button>
                          )}
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <>
              <Typography><strong>Hotel:</strong> {selectedBooking.hotelId?.name || "N/A"}</Typography>
              <Typography><strong>Room:</strong> {selectedBooking.roomId?.title || "N/A"}</Typography>
              <Typography><strong>Check-In:</strong> {new Date(selectedBooking.checkIn).toLocaleDateString()}</Typography>
              <Typography><strong>Check-Out:</strong> {new Date(selectedBooking.checkOut).toLocaleDateString()}</Typography>
              <Typography><strong>Status:</strong> {selectedBooking.status}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserBookings;