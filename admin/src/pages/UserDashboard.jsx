import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Box,
  CardMedia,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

const HoverCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme?.shadows?.[10] || "0px 10px 20px rgba(0, 0, 0, 0.12)", // Fallback shadow
  },
}));

const UserDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ price: "", hotel: "" });
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomResponse = await axios.get("http://localhost:5001/api/rooms/all");
        const hotelResponse = await axios.get("http://localhost:5001/api/hotels");
        setRooms(roomResponse.data.rooms);
        setFilteredRooms(roomResponse.data.rooms);
        setHotels(hotelResponse.data.hotels);
      } catch (error) {
        console.error("Error fetching rooms or hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleFilterChange = (field, value) => {
    setFilter({ ...filter, [field]: value });
  };

  useEffect(() => {
    let filtered = rooms;

    if (filter.price) {
      filtered = filtered.filter((room) => room.price <= filter.price);
    }
    if (filter.hotel) {
      filtered = filtered.filter((room) => room.hotelId?.name === filter.hotel);
    }

    setFilteredRooms(filtered);
  }, [filter, rooms]);

  if (loading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Available Rooms
      </Typography>
      <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
        <TextField
          select
          label="Max Price"
          value={filter.price}
          onChange={(e) => handleFilterChange("price", e.target.value)}
          sx={{ minWidth: 120 }}
        >
          {[50, 100, 150, 200].map((price) => (
            <MenuItem key={price} value={price}>
              ${price}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Hotel"
          value={filter.hotel}
          onChange={(e) => handleFilterChange("hotel", e.target.value)}
          sx={{ minWidth: 120 }}
        >
          {hotels.map((hotel) => (
            <MenuItem key={hotel._id} value={hotel.name}>
              {hotel.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Grid container spacing={3}>
        {filteredRooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room._id}>
            <HoverCard>
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:5001/${room.images[0]}`}
                alt={room.title}
              />
              <CardContent>
                <Typography variant="h6">
                  Hotel: {room.hotelId?.name || "N/A"}
                </Typography>
                <Typography variant="body2">{room.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {room.description}
                </Typography>
                <Typography variant="subtitle1" color="textPrimary">
                  Price: ${room.price}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Capacity: {room.capacity} Person(s)
                </Typography>
              </CardContent>
            </HoverCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserDashboard;