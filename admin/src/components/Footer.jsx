import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Link, IconButton, Divider, Grid, Container } from "@mui/material";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Pinterest as PinterestIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";

const Footer = () => {
  const location = useLocation();

  // Social Media Links
  const socialMediaLinks = [
    { name: "Facebook", url: "https://www.facebook.com/LivinBoston", icon: <FacebookIcon /> },
    { name: "Instagram", url: "https://www.instagram.com/LivinBoston", icon: <InstagramIcon /> },
    { name: "Pinterest", url: "https://www.pinterest.com/LivinBoston", icon: <PinterestIcon /> },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/LivinBoston", icon: <LinkedInIcon /> },
  ];

  // Footer Links
  const footerLinks = [
    { name: "Contact", path: "/user/Contactus" },
    { name: "FAQ", path: "/user/AboutPage" },
    { name: "Press & Media", path: "/user/home" },
    { name: "Careers", path: "/user/home" },
    { name: "Terms of Use", path: "/user/home" },
    { name: "Global Privacy Policy", path: "/user/home" },
    { name: "Accessibility", path: "/user/home" },
  ];

  return (
    <Box component="footer" sx={{ backgroundColor: "#f8f9fa", py: 4, mt: 4, borderTop: "1px solid #ddd" }}>
      <Container maxWidth="lg">
        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Address and Contact */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#333" }}>
              LivinBoston
            </Typography>
            <Typography variant="body2" sx={{ color: "#555" }}>
              One Newbury Street, Boston, MA 02116
            </Typography>
            <Typography variant="body2" sx={{ color: "#555" }}>
              Phone:{" "}
              <Link href="tel:6175365700" underline="none" sx={{ color: "primary.main" }}>
                617-536-5706
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ color: "#555" }}>
              Email:{" "}
              <Link href="mailto:hello@livinboston.com" underline="none" sx={{ color: "primary.main" }}>
                hello@livinboston.com
              </Link>
            </Typography>
          </Grid>

          {/* Footer Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#333" }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  underline="none"
                  sx={{
                    color: location.pathname === link.path ? "primary.main" : "#555",
                    fontWeight: location.pathname === link.path ? "bold" : "normal",
                    "&:hover": { color: "primary.dark" },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#333" }}>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              {socialMediaLinks.map((social) => (
                <IconButton
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "#555", "&:hover": { color: "primary.main" } }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 3 }} />

        {/* Footer Bottom */}
        <Box textAlign="center">
          <Typography variant="body2" sx={{ color: "#777" }}>
            &copy; 2024 LivinBoston. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;