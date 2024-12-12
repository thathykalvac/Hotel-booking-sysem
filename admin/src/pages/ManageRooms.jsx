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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRoomModal from "./AddRoomModal"; // Modal for adding/updating rooms
import axios from "axios";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null); // Room to edit

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get("http://localhost:5001/api/rooms/all", {
        headers: { token: `${localStorage.getItem("token")}` },
      });
      setRooms(response.data.rooms || []);
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setError("Failed to load rooms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteRoom = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        token: `${token}`,
      };
  
      console.log("Deleting room with ID:", id); // Debug log for room ID
  
      await axios.delete(`http://localhost:5001/api/rooms/${id}`, { headers });
      console.log("Room deleted successfully.");
      fetchRooms(); // Refetch rooms after deletion
    } catch (error) {
      console.error("Error deleting room:", error);
      alert("Failed to delete room. Please try again.");
    }
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentRoom(null);
  };

  const handleEdit = (room) => {
    setCurrentRoom(room); // Set current room to edit
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Manage Rooms
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Grid container spacing={3}>
            {rooms.map((room) => (
              <Grid item xs={12} md={6} lg={4} key={room._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{room.title}</Typography>
                    <Typography variant="body2">{room.description}</Typography>
                    <Typography variant="body2">Price: ${room.price}</Typography>
                    <Typography variant="body2">Capacity: {room.capacity}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(room)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => deleteRoom(room._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <AddRoomModal
        open={isModalOpen}
        onClose={handleModalClose}
        onRoomAdded={fetchRooms} // Refresh rooms after adding/editing
        room={currentRoom} // Pass current room to modal for editing
      />
    </Container>
  );
};

export default ManageRooms;
