import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Alert,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import HotelIcon from "@mui/icons-material/Hotel";
import AddHotelModel from "./AddHotelModel";
import EditHotelModal from "./EditHotelModal";
import AddRoomModal from "./AddRoomModal";
import axios from "axios";

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHotels = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      const headers = { token: `${token}` };
      const response = await axios.get("http://localhost:5001/api/hotels", { headers });
      setHotels(response.data.hotels || []);
    } catch (err) {
      console.error("Error fetching hotels:", err);
      setError("Failed to load hotels. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      try {
        const token = localStorage.getItem("token");
        const headers = { token: `${token}` };
        await axios.delete(`http://localhost:5001/api/hotels/${id}`, { headers });
        setHotels((prevHotels) => prevHotels.filter((hotel) => hotel._id !== id));
        alert("Hotel deleted successfully.");
      } catch (err) {
        console.error("Error deleting hotel:", err);
        alert("Failed to delete hotel. Please try again.");
      }
    }
  };

  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
    setIsEditModalOpen(true);
  };

  const handleAddRoom = (hotel) => {
    setSelectedHotel(hotel);
    setIsAddRoomModalOpen(true);
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" color="primary" fontWeight="bold">
          Manage Hotels
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Hotel
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {hotels.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel._id}>
              <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <HotelIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="div">
                      {hotel.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {hotel.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {hotel.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => handleAddRoom(hotel)}
                  >
                    Add Room
                  </Button>
                  <Box>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(hotel)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(hotel._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <AddHotelModel
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onHotelAdded={fetchHotels}
      />
      <EditHotelModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        hotel={selectedHotel}
        onHotelUpdated={fetchHotels}
      />
      <AddRoomModal
        open={isAddRoomModalOpen}
        onClose={() => setIsAddRoomModalOpen(false)}
        hotelId={selectedHotel?._id}
      />
    </Container>
  );
};

export default ManageHotels;