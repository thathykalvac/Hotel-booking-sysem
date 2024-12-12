import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Container,
  Paper,
  Snackbar,
  IconButton,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  Send as SendIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Message as MessageIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50",
      light: "#81C784",
      dark: "#388E3C",
    },
    secondary: {
      main: "#FF5722",
    },
    background: {
      default: "#F9F9F9",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 12,
  background: "linear-gradient(145deg, #ffffff, #f3f3f3)",
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.dark,
    },
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
  },
}));

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError("All fields are required");
    } else {
      setError("");
      setSnackbarMessage("Your message has been sent!");
      setSnackbarOpen(true);
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      {/* Page Header */}
      <Box textAlign="center" mb={5}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          Contact Us
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ maxWidth: 600, mx: "auto" }}>
          We'd love to hear from you! Fill out the form below, and we'll get back to you as soon as possible.
        </Typography>
      </Box>

      {/* Form Section */}
      <StyledPaper>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Full Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                InputProps={{
                  startAdornment: <PersonIcon color="primary" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Email Address"
                variant="outlined"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: <EmailIcon color="primary" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                label="Message"
                variant="outlined"
                multiline
                rows={6}
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                InputProps={{
                  startAdornment: <MessageIcon color="primary" sx={{ mr: 1, mt: 1 }} />,
                }}
              />
            </Grid>
          </Grid>

          {/* Error Message */}
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2, fontWeight: "bold" }}>
              {error}
            </Typography>
          )}

          {/* Submit Button */}
          <Box textAlign="center" mt={4}>
            <GradientButton
              variant="contained"
              color="primary"
              type="submit"
              endIcon={<SendIcon />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                borderRadius: "30px",
                background: "linear-gradient(45deg, #4caf50, #81c784)",
              }}
            >
              Send Message
            </GradientButton>
          </Box>
        </form>
      </StyledPaper>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

// Wrap the component with ThemeProvider
const App = () => (
  <ThemeProvider theme={theme}>
    <ContactPage />
  </ThemeProvider>
);

export default App;
