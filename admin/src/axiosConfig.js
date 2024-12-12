import axios from "axios";

// Set the base URL for backend API
const instance = axios.create({
  baseURL: "http://localhost:5001", // Update to your backend base URL
});

export default instance;
