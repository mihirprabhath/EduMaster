import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const User = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    address: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setCurrentUser(parsedUser);
      setFormData({
        name: parsedUser.name,
        email: parsedUser.email,
        age: parsedUser.age,
        address: parsedUser.address
      });
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/users/${currentUser._id}`,
        {
          name: formData.name,
          email: formData.email,
          age: formData.age,
          address: formData.address
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      
      setCurrentUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (loading) {
    return <div className="loading">Loading user data...</div>;
  }

  if (!currentUser) {
    return <div className="not-logged-in">Please log in to view your profile</div>;
  }

  return (
    <div className="user-profile-container">
      <h1>Your Profile</h1>
      
      {!editMode ? (
        <div className="user-details-card">
          <div className="user-avatar">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <p><strong>Name:</strong> {currentUser.name}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Age:</strong> {currentUser.age}</p>
            <p><strong>Address:</strong> {currentUser.address}</p>
            <p><strong>Role:</strong> {currentUser.role}</p>
          </div>
          <button 
            className="edit-button"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="save-button">Save Changes</button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default User;