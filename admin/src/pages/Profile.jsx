import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user details (Replace with your API)
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/user/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary preset

    setLoading(true);
    try {
      const response = await axios.post("CLOUDINARY_URL=cloudinary://426989188837488:cmPyZOsAr8zvR8GJE9wyQ_-Wn7s@dqunb6sn2", formData);
      setProfilePic(response.data.secure_url);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    // Update user details (Replace with your API)
    try {
      await axios.put(
        "http://localhost:5001/api/user/profile",
        { ...user, profilePic },
        { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Profile</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={user.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={user.email || ""} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control type="file" onChange={handleImageUpload} />
          {loading ? <p>Uploading...</p> : profilePic && <img src={profilePic} alt="Profile" style={{ width: "100px" }} />}
        </Form.Group>
        <Button onClick={handleUpdate} variant="primary">Update Profile</Button>
      </Form>
    </Container>
  );
};

export default Profile;