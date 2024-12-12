import React from "react";
import { Container, Typography } from "@mui/material";

const BookingCancel = () => {
  return (
    <Container>
      <Typography variant="h4" color="error">
        Payment Canceled
      </Typography>
      <Typography>Your payment was not processed. Please try booking again.</Typography>
    </Container>
  );
};

export default BookingCancel;
