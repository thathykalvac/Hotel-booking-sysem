import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const AdminBookingPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch bookings when component loads
  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch all booking orders for admin
  const fetchBookings = async () => {
    try {
      const response = await axios.get("/admin/get-booking-orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
        },
      });
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch bookings. Please try again.");
      setLoading(false);
    }
  };

  // Update booking status (Approve/Reject)
  const updateBookingStatus = async (bookingId, status) => {
    try {
      await axios.put(
        `/admin/update-booking-order/${bookingId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchBookings(); // Refresh the list
    } catch (err) {
      alert("Failed to update booking status.");
    }
  };

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Admin Booking Management</h1>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Room</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.user.name}</td>
                <td>{booking.room.name}</td>
                <td>{booking.status}</td>
                <td>
                  <button
                    onClick={() => updateBookingStatus(booking.id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateBookingStatus(booking.id, "rejected")}
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => updateBookingStatus(booking.id, "cancelled")}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminBookingPanel;