import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    CircularProgress,
    Snackbar,
    Alert,
    Box,
} from "@mui/material";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Fetch orders from the backend
    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = { token: `${token}` };
            const response = await axios.get("http://localhost:5001/api/orders", { headers });
            setOrders(response.data.bookings || []);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    // Cancel an order
    const handleCancelOrder = async (orderId) => {
        try {
            const token = localStorage.getItem("token");
            const headers = { token: `${token}` };
            await axios.put(`http://localhost:5001/api/orders/${orderId}/cancel`, {}, { headers });
            setSnackbarMessage("Order canceled successfully!");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
            fetchOrders(); // Refresh orders after cancelation
        } catch (error) {
            setSnackbarMessage("Error canceling order. Please try again.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

    // Approve an order
    const handleApproveOrder = async (orderId) => {
        try {
            const token = localStorage.getItem("token");
            const headers = { token: `${token}` };
            await axios.put(`http://localhost:5001/api/orders/${orderId}/approve`, {}, { headers });
            setSnackbarMessage("Order approved successfully!");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
            fetchOrders();
        } catch (error) {
            setSnackbarMessage("Error approving order. Please try again.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" color="primary" gutterBottom>
                Manage Orders
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Hotel</TableCell>
                            <TableCell>Room</TableCell>
                            <TableCell>Check-In</TableCell>
                            <TableCell>Check-Out</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>{order.customerEmail}</TableCell>
                                <TableCell>{order.hotelId?.name}</TableCell>
                                <TableCell>{order.roomId?.title}</TableCell>
                                <TableCell>{new Date(order.checkIn).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(order.checkOut).toLocaleDateString()}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>
                                    {/* {order.status === "pending" && (
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => handleApproveOrder(order._id)}
                                            sx={{ mr: 1 }}
                                        >
                                            Approve
                                        </Button>
                                    )} */}
                                    {order.status !== "canceled" && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleCancelOrder(order._id)}
                                            sx={{ mt: 1 }}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AdminOrders;
