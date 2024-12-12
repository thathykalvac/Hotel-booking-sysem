import React, { useEffect, useState } from "react";
import { Container, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Replace '/api/orders' with your admin backend endpoint for fetching user orders
        const response = await axios.get("http://your-backend-url/api/orders");
        setOrders(response.data); // Assuming the API returns an array of orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      // Replace '/api/orders/:id' with your backend endpoint for canceling orders
      await axios.delete(`http://your-backend-url/api/orders/${orderId}`);
      alert("Order canceled successfully!");
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Failed to cancel order.");
    }
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>
      <List>
        {orders.map((order) => (
          <ListItem key={order.id} sx={{ boxShadow: 1, mb: 2 }}>
            <ListItemText
              primary={`Room: ${order.roomName}`}
              secondary={`Date: ${order.date}`}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleCancelOrder(order.id)}
            >
              Cancel
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Orders;