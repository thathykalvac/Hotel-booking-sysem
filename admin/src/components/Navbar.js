import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import HotelIcon from "@mui/icons-material/Hotel";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RoomIcon from '@mui/icons-material/Room';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

// Styled Components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#424242", // Dark Grey
  boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  textTransform: 'none',
  fontWeight: 600,
  margin: theme.spacing(0, 1),
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255,255,255,0.2)',
    transform: 'scale(1.05)',
  },
}));

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch the user role from localStorage
  const userRole = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  // Define navigation items based on role
  const navItems =
    userRole === "admin"
      ? [
          { label: "Home", path: "/admin/home", icon: <PersonOutlineIcon /> },
          { label: "Manage Hotels", path: "/admin/manage-hotels", icon: <HotelIcon /> },
          { label: "Manage Rooms", path: "/admin/manage-rooms", icon: <RoomIcon /> },
          { label: "Manage Orders", path: "/admin/orders", icon: <ReceiptLongIcon /> },
        ]
      : [
          { label: "Home", path: "/user/home", icon: <HomeIcon /> },
          { label: "Hotels", path: "/user/dashboard", icon: <HotelIcon/> },
          { label: "Bookings", path: "/user/bookings", icon: <HotelIcon /> },
          { label: "Search Rooms", path: "/user/search-rooms", icon: <SearchIcon /> },
          { label: "About Us", path: "/user/Aboutpage", icon: <InfoIcon /> },
          { label: "Contact Us", path: "/user/Contactus", icon: <ContactMailIcon /> },


        ];

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1 }}
        >
          LivinBoston
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          {navItems.map((item) => (
            <NavButton 
              key={item.label} 
              component={Link} 
              to={item.path}
              startIcon={item.icon}
            >
              {item.label}
            </NavButton>
          ))}
          <NavButton 
            onClick={handleLogout} 
            startIcon={<ExitToAppIcon />}
            color="inherit"
          >
            Logout
          </NavButton>
        </Box>

        {/* Mobile Navigation Toggle */}
        <IconButton
          color="inherit"
          edge="end"
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Drawer for Mobile View */}
      <Drawer 
        anchor="right" 
        open={drawerOpen} 
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: "#424242",
            color: 'white',
          }
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {navItems.map((item) => (
              <ListItem 
                button 
                key={item.label} 
                component={Link} 
                to={item.path}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  }
                }}
              >
                {item.icon}
                <ListItemText primary={item.label} sx={{ ml: 2 }} />
              </ListItem>
            ))}
            <ListItem 
              button 
              onClick={handleLogout}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                }
              }}
            >
              <ExitToAppIcon />
              <ListItemText primary="Logout" sx={{ ml: 2 }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </StyledAppBar>
  );
};

export default Navbar;