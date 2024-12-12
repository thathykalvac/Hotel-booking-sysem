import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const EditHotelModal = ({ open, onClose, hotel, onHotelUpdated }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hotel) {
      setName(hotel.name);
      setAddress(hotel.address);
      setDescription(hotel.description);
    }
  }, [hotel]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = {
        token: `${token}`,
      };
      await axios.put(
        `http://localhost:5001/api/hotels/${hotel._id}`,
        { name, address, description },
        { headers }
      );
      alert("Hotel updated successfully.");
      onHotelUpdated(); // Refresh hotels list
      onClose();
    } catch (err) {
      console.error("Error updating hotel:", err);
      alert("Failed to update hotel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Hotel</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditHotelModal;
