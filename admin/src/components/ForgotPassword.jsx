import React, { useState } from "react";
import axios from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/forgot-password", { email });
      setMessage(response.data.message || "Password reset link sent.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send reset link.");
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleForgotPassword}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;