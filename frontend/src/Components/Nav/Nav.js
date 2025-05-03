import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";
 
const Nav = ({ isLoggedIn, onLoginClick, onLogout, currentUser }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div className="nav-logo">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <span>EduMaster</span>
        </div>
        </div>

        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          
          {isLoggedIn && (
            <>
              <Link to="/Profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
              
              {currentUser?.role === 'admin' && (
                <>
                  <Link to="/adduser" onClick={() => setIsMenuOpen(false)}>Add User</Link>
                  <Link to="/userdetails" onClick={() => setIsMenuOpen(false)}>Users</Link>
                </>
              )}
            </>
          )}

          <div className="auth-buttons">
            {isLoggedIn ? (
              <>
                <span className="user-info">
                  {/* <FaUser /> */}
                   {currentUser?.name || "User"}
                </span>
                <button onClick={handleLogout} className="logout-button">
                  {/* <FaSignOutAlt />  */}
                  Logout
                </button>
              </>
            ) : (
              <button onClick={onLoginClick} className="login-button">
                {/* <FaSignInAlt />  */}
                Login
              </button>
            )}
          </div>
        </div>

        <div className="mobile-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {/* {isMenuOpen ? <FaTimes /> : <FaBars />} */}
        </div>
      </div>
    </nav>
  );
};

export default Nav;