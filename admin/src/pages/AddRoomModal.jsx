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

const AddRoomModal = ({ open, onClose, hotelId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("hotelId", hotelId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("capacity", capacity);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const token = localStorage.getItem("token");
      const headers = {
        token: `${token}`,
        "Content-Type": "multipart/form-data",
      };

      await axios.post("http://localhost:5001/api/rooms/create", formData, { headers });
      setSuccess("Room added successfully!");
      onClose(); // Close modal after successful submission
    } catch (err) {
      console.error("Error adding room:", err);
      setError("Failed to add room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Room
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            label="Price"
            fullWidth
            margin="normal"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <TextField
            label="Capacity"
            fullWidth
            margin="normal"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
          <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
            Upload Images
            <input type="file" hidden multiple onChange={handleFileChange} />
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Add Room"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddRoomModal;
