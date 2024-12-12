import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div>
      <h1>Room Management</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            {room.name} - {room.price} USD
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomManagement;