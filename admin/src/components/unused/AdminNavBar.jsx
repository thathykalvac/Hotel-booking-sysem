import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Admin Dashboard
                </Typography>
                <Button color="inherit" onClick={() => navigate("/admin/home")}>
                    Dashboard
                </Button>
                <Button color="inherit" onClick={() => navigate("/admin/dashboard")}>
                    Post Hotels
                </Button>
                <Button color="inherit" onClick={() => navigate("/admin/orders")}>
                    Manage Bookings
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default AdminNavbar;
