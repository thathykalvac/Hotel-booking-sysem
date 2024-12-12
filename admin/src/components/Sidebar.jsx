import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <List>
      <ListItem button onClick={() => navigate("/admin/dashboard")}>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => navigate("/admin/users")}>
        <ListItemText primary="User Management" />
      </ListItem>
      <ListItem button onClick={() => navigate("/admin/rooms")}>
        <ListItemText primary="Room Management" />
      </ListItem>
      <ListItem button onClick={() => navigate("/admin/orders")}>
        <ListItemText primary="Order Management" />
      </ListItem>
    </List>
  );
};

export default Sidebar;