import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [people, setPeople] = useState(1);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/hotels/${id}`);
        const data = await response.json();
        setRoom(data);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetails();
  }, [id]);

  const handleBooking = () => {
    alert(
      `Booking confirmed for ${room.title} from ${checkInDate} to ${checkOutDate} for ${people} people.`
    );
  };

  if (!room) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {room.title}
      </Typography>
      <Typography variant="subtitle1">{room.description}</Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={room.image}
            alt={room.title}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <ListItemText primary="Price" secondary={`$${room.price} / night`} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Max People" secondary={room.maxPeople} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Amenities" secondary={room.amenities.join(", ")} />
            </ListItem>
          </List>

          <Box mt={4}>
            <TextField
              label="Check-in Date"
              type="date"
              fullWidth
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
            <TextField
              label="Check-out Date"
              type="date"
              fullWidth
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
            <TextField
              label="Number of People"
              type="number"
              fullWidth
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              InputProps={{ inputProps: { min: 1 } }}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleBooking}
              style={{ marginTop: "10px" }}
            >
              Book Now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RoomDetails;