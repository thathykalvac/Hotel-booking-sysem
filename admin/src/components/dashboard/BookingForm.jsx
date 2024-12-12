import React, { useState } from "react";

const BookingForm = ({ roomId }) => {
  const [bookingDate, setBookingDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/bookings", { roomId, bookingDate });
      alert("Booking successful");
    } catch (error) {
      console.error(error);
      alert("Booking failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Select Booking Date:</label>
      <input type="date" onChange={(e) => setBookingDate(e.target.value)} required />
      <button type="submit">Confirm Booking</button>
    </form>
  );
};

export default BookingForm;