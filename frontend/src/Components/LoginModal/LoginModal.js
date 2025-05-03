import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginModal.css";

const LoginModal = ({ show, onClose, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });

      // Store token and user data including role
      localStorage.setItem("token", response.data.token);
      const userData = {
        ...response.data.user,
        role: response.data.user.role || 'user' // Default to 'user' if role not specified
      };
      localStorage.setItem("user", JSON.stringify(userData));

      setIsLoading(false);
      onLoginSuccess(userData); // Pass the complete user data including role
      onClose();
      
      // Redirect based on role
      if (userData.role === 'admin') {
        navigate("/userdetails"); // Or wherever you want admins to go
      } else {
        navigate("/Profile"); // Regular users go to home
      }
    } catch (err) {
      setIsLoading(false);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="modal-footer">
          <p>
            Don't have an account? <span onClick={onClose}>Register</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;