import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import hotel1 from "../images/hotel1.jpg"; // Correct path to logo

const AppNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="px-3">
      <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center">
        <img
          src={hotel1}
          alt="LivinBoston Logo"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#8B0000" }}>
          LivinBoston
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/home">Home</Nav.Link>
          <NavDropdown title="Profile" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/profile">View Profile</NavDropdown.Item>
            <NavDropdown.Item>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;