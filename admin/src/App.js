import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import AdminHome from "./pages/AdminHome";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import ManageHotels from "./pages/ManageHotels";
import AddHotelModel from "./pages/AddHotelModel"; // Corrected path for AddHotelModal
import UserDashboard from "./pages/UserDashboard";
import UserHome from "./pages/UserHome";
import ManageRooms from "./pages/ManageRooms";
import Navbar from "./components/Navbar"; // Unified Navbar
import UserRegistration from "./pages/UserRegistration";
import UserBookings from "./pages/UserBookings";
import SearchRooms from "./pages/SearchRooms";
import BookRoom from "./pages/BookRoom";
import BookingSuccess from "./pages/BookingSuccess.jsx";
import BookingCancel from "./pages/BookingCancel.jsx";
import StripePayment from "./pages/StripePayment.jsx";
import AboutPage from "./pages/Aboutpage.jsx";
import Footer from "./components/Footer.jsx";
import Contactus from "./pages/Contactus.jsx"

import BookingDetails from "./pages/BookingDetails";

// Role-Based Private Route Component
const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (role !== requiredRole) {
    // Redirect to home or an unauthorized page if role doesn't match
    return <Navigate to={role === "admin" ? "/admin/home" : "/user/home"} replace />;
  }

  // Render the child component if authentication and role match
  return children;
};

const App = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/" && location.pathname !== "/register";
  const showfooter = location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <>
      {/* Conditional Navbar */}
      {showNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/user/book-room/:roomId" element={<BookRoom />} />
        <Route path="/user/bookings" element={<UserBookings />} />
        <Route path="/user/bookings/:bookingId" element={<BookingDetails />} />
        <Route path="/payment" element={<StripePayment />} />


        {/* User Routes */}
        <Route
          path="/user/home"
          element={
            <PrivateRoute requiredRole="user">
              <UserHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/search-rooms"
          element={
            <PrivateRoute requiredRole="user">
              <SearchRooms />
            </PrivateRoute>
          }
        />
        <Route 
          path="/booking-success"
          element={
            <PrivateRoute requiredRole="user">
              <BookingSuccess />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/booking-cancel"
          element={
            <PrivateRoute requiredRole="user">
              <BookingCancel />
            </PrivateRoute>
          } 
        />
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute requiredRole="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />
         <Route
          path="/user/AboutPage"
          element={
            <PrivateRoute requiredRole="user">
              <AboutPage />
            </PrivateRoute>
          }
        />

<Route
          path="/user/Contactus"
          element={
            <PrivateRoute requiredRole="user">
              <Contactus />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/home"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-hotels"
          element={
            <PrivateRoute requiredRole="admin">
              <ManageHotels />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-rooms"
          element={
            <PrivateRoute requiredRole="admin">
              <ManageRooms />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-hotel"
          element={
            <PrivateRoute requiredRole="admin">
              <AddHotelModel />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminOrders />
            </PrivateRoute>
          }
        />

      

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      {showfooter && <Footer />}
    </>
  );
};

export default App;
