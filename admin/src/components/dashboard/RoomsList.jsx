import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import axios from "axios";

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // Replace '/api/rooms' with your admin backend endpoint for fetching rooms
        const response = await axios.get("http://your-backend-url/api/rooms");
        setRooms(response.data); // Assuming the API returns an array of rooms
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleBookRoom = async (roomId) => {
    try {
      // Replace '/api/bookings' with your backend endpoint for booking
      await axios.post("http://your-backend-url/api/bookings", { roomId });
      alert("Room booked successfully!");
    } catch (error) {
      console.error("Error booking room:", error);
      alert("Failed to book room.");
    }
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Available Rooms
      </Typography>
      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5">{room.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {room.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleBookRoom(room.id)}
                >
                  Book Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RoomsList;