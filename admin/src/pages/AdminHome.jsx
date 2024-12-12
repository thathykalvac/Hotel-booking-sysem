import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid } from "recharts";
import axios from "axios";
import "../Styles/adminhome.scss"

const COLORS = ["#0088FE", "#FFBB28", "#00C49F", "#FF8042"];

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalHotels: 0,
    totalRooms: 0,
    pendingBookings: 0,
    totalBookings: 0,
    activeUsers: 0,
    totalUsers: 0,
    roomDistribution: { occupied: 0, vacant: 0 },
    bookingTrends: [],
    revenueTrends: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const headers = { token: `${token}` };

      const [
        hotelsResponse,
        roomsResponse,
        bookingsResponse,
        totalBookingsResponse,
        activeUsersResponse,
        totalUsersResponse,
        roomDistributionResponse,
        bookingTrendsResponse,
        revenueTrendsResponse,
      ] = await Promise.all([
        axios.get("http://localhost:5001/api/hotels", { headers }),
        axios.get("http://localhost:5001/api/rooms/all", { headers }),
        axios.get("http://localhost:5001/api/orders?status=pending", { headers }),
        axios.get("http://localhost:5001/api/metrics/bookings/total", { headers }),
      axios.get("http://localhost:5001/api/metrics/users/active", { headers }),
      axios.get("http://localhost:5001/api/metrics/users/total", { headers }),
      axios.get("http://localhost:5001/api/metrics/rooms/distribution", { headers }),
      axios.get("http://localhost:5001/api/metrics/bookings/trends", { headers }),
      axios.get("http://localhost:5001/api/metrics/revenue/trends", { headers }),
    ]);

      setMetrics({
        totalHotels: hotelsResponse.data.hotels?.length || 0,
        totalRooms: roomsResponse.data.rooms?.length || 0,
        pendingBookings: bookingsResponse.data.bookings?.length || 0,
        totalBookings: totalBookingsResponse.data.totalBookings || 0,
        activeUsers: activeUsersResponse.data.activeUsers || 0,
        totalUsers: totalUsersResponse.data.totalUsers || 0,
        roomDistribution: roomDistributionResponse.data,
        bookingTrends: bookingTrendsResponse.data.trends || [],
        revenueTrends: revenueTrendsResponse.data.trends || [],
      });
    } catch (err) {
      console.error("Error fetching metrics:", err);
      setError("Failed to load metrics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const { roomDistribution, bookingTrends, revenueTrends } = metrics;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={4}>
        {/* Metrics Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Hotels</Typography>
              <Typography variant="h6">{metrics.totalHotels}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Rooms</Typography>
              <Typography variant="h6">{metrics.totalRooms}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Pending Bookings</Typography>
              <Typography variant="h6">{metrics.pendingBookings}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Bookings</Typography>
              <Typography variant="h6">{metrics.totalBookings}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Active Users</Typography>
              <Typography variant="h6">{metrics.activeUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Registered Users</Typography>
              <Typography variant="h6">{metrics.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Room Distribution (Pie Chart) */}
<Grid item xs={12} md={6}>
  <Typography variant="h6" color="textSecondary">
    Room Distribution
  </Typography>
  {
  metrics.roomDistribution.occupiedRooms === 0 && metrics.roomDistribution.vacantRooms === 0 ? (
    <Typography>No room data available.</Typography>
  ) : (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={[
            { name: "Occupied", value: metrics.roomDistribution.occupiedRooms },
            { name: "Vacant", value: metrics.roomDistribution.vacantRooms },
          ]}
          cx="50%"
          cy="50%"
          label
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          <Cell key="Occupied" fill="#0088FE" />
          <Cell key="Vacant" fill="#FFBB28" />
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

</Grid>


        {/* Booking Trends (Bar Chart) */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" color="textSecondary">
            Booking Trends
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill={COLORS[2]} />
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        {/* Revenue Trends (Line Chart) */}
        <Grid item xs={12}>
          <Typography variant="h6" color="textSecondary">
            Revenue Trends
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke={COLORS[3]} />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
