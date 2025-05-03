import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddUser.css";

function AddUser() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    address: "",
    role: "user", // Changed from userType to role to match backend
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", {
        name: input.name,
        email: input.email,
        password: input.password,
        age: Number(input.age),
        address: input.address,
        role: input.role, // Make sure this matches your select value
      });
      navigate("/userdetails");
    } catch (error) {
      console.error("Failed to add user:", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="add-user-container">
      <div className="form-section">
        <h2>Create User</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <div className="two-columns">
            <input
              name="age"
              type="number"
              placeholder="Age"
              onChange={handleChange}
              required
            />
            <select name="role" value={input.role} onChange={handleChange}>
              <option value="user">Normal User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
          />
          <button type="submit">Create User</button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
