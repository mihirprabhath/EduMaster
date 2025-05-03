import React, { useState, useEffect } from "react";
import "./App.css";
import User from "./Components/Home/Home";
import Nav from "./Components/Nav/Nav";
import { Route, Routes } from "react-router-dom";
import AddUser from "./Components/AddUser/AddUser";
import Users from "./Components/UserDetails/Users";
import UpdateUser from "./Components/UpdateUser/UpdateUser";
import LoginModal from "./Components/LoginModal/LoginModal";
import Web from "./Components/Web/Web";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check for existing token on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    if (token && user) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
  };

  return (
    <div>
      {/* <Nav 
        isLoggedIn={isLoggedIn} 
        onLoginClick={() => setShowLoginModal(true)}
        currentUser={currentUser} 
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsLoggedIn(false);
          setCurrentUser(null);
        }}
      /> */}
       
      <React.Fragment>
      <Nav 
        isLoggedIn={isLoggedIn} 
        onLoginClick={() => setShowLoginModal(true)}
        currentUser={currentUser} 
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsLoggedIn(false);
          setCurrentUser(null);
        }}
      />
        <Routes>
          
          <Route path="/" element={<Web />} />
          <Route path="/Profile" element={<User />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/userdetails" element={<Users />} />
          <Route path="/userdetails/:id" element={<UpdateUser />} />
        </Routes>
      </React.Fragment>

      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;