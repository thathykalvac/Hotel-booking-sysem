import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

// Modal Styling
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddHotelModel = ({ open, onClose, onHotelAdded }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleAddHotel = async () => {
    // Validate input
    if (!name || !address || !description || !location.lat || !location.lng) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token"); // Get token from localStorage
      const headers = {
        token: `${token}`, // Add Authorization header
      };

      // API Call to Add Hotel
      const response = await axios.post(
        "http://localhost:5001/api/hotels",
        {
          name,
          address,
          location,
          description,
        },
        { headers }
      );

      console.log("Hotel added successfully:", response.data);

      // Clear fields and close modal
      setName("");
      setAddress("");
      setLocation({ lat: "", lng: "" });
      setDescription("");
      onClose();

      // Refresh hotel list in parent component
      onHotelAdded();
    } catch (err) {
      console.error("Error adding hotel:", err);
      setError("Failed to add hotel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>
          Add New Hotel
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          fullWidth
          margin="normal"
          label="Hotel Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Latitude"
          value={location.lat}
          onChange={(e) =>
            setLocation((prev) => ({ ...prev, lat: e.target.value }))
          }
        />
        <TextField
          fullWidth
          margin="normal"
          label="Longitude"
          value={location.lng}
          onChange={(e) =>
            setLocation((prev) => ({ ...prev, lng: e.target.value }))
          }
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddHotel}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Add Hotel"}
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddHotelModel;
