import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Slider,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: "0 8px 28px rgba(0, 0, 0, 0.08)",
  borderRadius: theme.spacing(2),
  overflow: "hidden",
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 240,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(50);
  const [images, setImages] = useState(null);
  const [capacity, setCapacity] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleCreateRoom = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("capacity", capacity);
      formData.append("roomStatus", roomStatus);
      if (images) {
        Array.from(images).forEach((file) => formData.append("images", file));
      }

      const response = await axios.post("http://localhost:5001/api/rooms/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setSnackbarMessage("Room created successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        setTitle("");
        setDescription("");
        setPrice(50);
        setImages(null);
        setPreviewImage(null);
        setCapacity("");
        setRoomStatus("");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setSnackbarMessage("Error creating room. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
    if (e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <StyledContainer maxWidth="md">
      <Typography variant="h4" color="primary" gutterBottom>
        Post Room Availability
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <StyledCardMedia
              image={previewImage || "https://via.placeholder.com/400x240?text=Room+Image"}
              title="Room Preview"
            />
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {title || "Room Title"}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {description || "Room description will appear here"}
              </Typography>
              <Typography variant="h6" component="div">
                ${price} / night
              </Typography>
              <Box mt={2}>
                <Chip label={`Capacity: ${capacity || 0} Person(s)`} sx={{ mr: 1 }} />
                <Chip label={roomStatus || "Status"} color="primary" />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleCreateRoom}>
            <TextField
              fullWidth
              label="Room Title"
              variant="outlined"
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              required
            />
            <Box mt={3} mb={2}>
              <Typography gutterBottom>Price: ${price}</Typography>
              <Slider
                value={price}
                onChange={(e, newValue) => setPrice(newValue)}
                min={50}
                max={500}
                step={10}
                marks={[
                  { value: 50, label: "$50" },
                  { value: 500, label: "$500" },
                ]}
                valueLabelDisplay="auto"
              />
            </Box>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Capacity</InputLabel>
              <Select
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              >
                {[1, 2, 3, 4].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option} Person(s)
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Room Status</InputLabel>
              <Select
                value={roomStatus}
                onChange={(e) => setRoomStatus(e.target.value)}
              >
                {["Occupied", "Available", "Ready for Checkout"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box mt={3} mb={2}>
              <Typography gutterBottom>Upload Images</Typography>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Room"}
            </Button>
          </form>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default AdminDashboard;