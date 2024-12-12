import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Visibility, VisibilityOff, Person, Email, Phone, Lock } from "@mui/icons-material";

// Styled Components
const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: "500px",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 8px 40px rgba(0, 0, 0, 0.12)",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  fontWeight: 600,
  textTransform: "none",
  fontSize: "1rem",
  borderRadius: theme.shape.borderRadius * 5,
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius * 5,
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)",
    },
    "&.Mui-focused": {
      boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.2)",
    },
  },
}));

const AdminRegistration = () => {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5001/api/auth/otpregister", {
        userName,
        fullName,
        email,
        phone,
        password,
      });

      console.log(response.data);
      setSnackbarMessage("OTP sent to your email. Please verify.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setOtpDialogOpen(true);
    } catch (error) {
      console.error("Registration failed:", error);
      setSnackbarMessage("Failed to send OTP. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/api/auth/verify-otp", {
        email,
        otp,
      });

      console.log(response.data);
      setSnackbarMessage("Registration successful! Redirecting to login...");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setOtpDialogOpen(false);
      setUserName("");
      setFullName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setOtp("");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("OTP verification failed:", error);
      setSnackbarMessage("Invalid OTP. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StyledPaper>
          <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
            New User Registration
          </Typography>
          <form onSubmit={handleRegistration} style={{ width: "100%" }}>
            <StyledTextField
              fullWidth
              label="Username"
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            <StyledTextField
              fullWidth
              label="Full Name"
              variant="outlined"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            <StyledTextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <StyledTextField
              fullWidth
              label="Phone"
              variant="outlined"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
            <StyledTextField
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Register"}
            </StyledButton>
          </form>
        </StyledPaper>
      </motion.div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={otpDialogOpen} onClose={() => setOtpDialogOpen(false)}>
        <DialogTitle>Verify OTP</DialogTitle>
        <DialogContent>
          <StyledTextField
            fullWidth
            label="Enter OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVerifyOtp} variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Verify"}
          </Button>
          <Button onClick={() => setOtpDialogOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default AdminRegistration;