import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./User.css"; // Import the CSS file

function User(props) {
  const { _id, name, email, age, address } = props.User || {}; 
  const navigate = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5000/users/${_id}`)
      .then(res => res.data)
      .then(() => navigate("/"))
      .then(() => navigate("/userdetails"))
  }

  return (
    <div className="user-display">
      <h1>User</h1>
      <h3>ID: {_id}</h3>
      <h3>Name: {name}</h3>
      <h3>Email: {email}</h3>
      <h3>Age: {age}</h3>
      <h3>Address: {address}</h3>
      
      <div className="user-actions">
        <button className="update-btn">
          <Link to={`/userdetails/${_id}`}>Update</Link>
        </button>
        <button className="delete-btn" onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
}

export default User;