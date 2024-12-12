import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Typography, Alert } from "@mui/material";

const StripePayment = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [stripeUrl, setStripeUrl] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const initiateStripePayment = async () => {
      try {
        setError("");
        const token = localStorage.getItem("token");
        const headers = { token: `${token}` };

        const roomId = searchParams.get("roomId");
        const checkIn = searchParams.get("checkIn");
        const checkOut = searchParams.get("checkOut");
        const roomCount = searchParams.get("roomCount");
        const totalPrice = searchParams.get("totalPrice");

        if (!roomId || !checkIn || !checkOut || !roomCount || !totalPrice) {
          setError("Missing required payment details.");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          "http://localhost:5001/api/orders/stripe-session",
          {
            roomId,
            checkIn,
            checkOut,
            roomCount,
            totalPrice,
          },
          { headers }
        );

        setStripeUrl(response.data.url);
      } catch (err) {
        console.error("Error initiating Stripe payment:", err);
        setError("Failed to initiate payment. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initiateStripePayment();
  }, [searchParams]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (stripeUrl) {
    window.location.href = stripeUrl; // Redirect to Stripe Checkout
    return null;
  }

  return (
    <Typography variant="h6">
      Redirecting to payment...
    </Typography>
  );
};

export default StripePayment;
