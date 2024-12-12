import React, { useEffect, useState } from "react";
import { Container, Typography, TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Replace '/api/reviews' with your admin backend endpoint for fetching reviews
        const response = await axios.get("http://your-backend-url/api/reviews");
        setReviews(response.data); // Assuming the API returns an array of reviews
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleAddReview = async () => {
    try {
      // Replace '/api/reviews' with your backend endpoint for submitting reviews
      const response = await axios.post("http://your-backend-url/api/reviews", {
        content: newReview,
      });
      setReviews([...reviews, response.data]); // Add the new review to the list
      setNewReview("");
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Room Reviews
      </Typography>
      <List>
        {reviews.map((review) => (
          <ListItem key={review.id}>
            <ListItemText
              primary={review.content}
              secondary={`Date: ${review.date}`}
            />
          </ListItem>
        ))}
      </List>
      <TextField
        label="Add Review"
        variant="outlined"
        fullWidth
        margin="normal"
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddReview}
      >
        Submit Review
      </Button>
    </Container>
  );
};

export default Reviews;