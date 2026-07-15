import React, { useState } from "react";
import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../assets/images/logo.png";

function Navbar({ navigateTo, onLoginClick, onLogout }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigateTo("home");
    }
  };

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);
    if (!token) {
      onLoginClick();
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigateTo("home");
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => { navigateTo("home"); setMenuOpen(false); }} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
        <img src={logo} alt="HeriVerse Logo" style={{ height: "36px", width: "auto", borderRadius: "50%" }} />
        HeriVerse
      </div>

      {/* Hamburger button - visible only on mobile */}
      <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li onClick={() => { navigateTo("home"); setMenuOpen(false); }}>Home</li>
        <li onClick={() => handleNavClick("featured-places-section")}>Explore</li>
        <li onClick={() => handleNavClick("map-section")}>Map</li>
        <li onClick={() => handleNavClick("ai-assistant-section")}>AI Assistant</li>
      </ul>

      <div className="nav-icons" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {token ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div 
              onClick={() => { navigateTo("profile"); setMenuOpen(false); }} 
              style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
            >
              <FaUserCircle style={{ width: "24px", height: "24px", color: "white", flexShrink: 0 }} />
              <span style={{ fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap" }}>Vanakkam, {user.username}!</span>
            </div>
            <button 
              onClick={handleLogout}
              style={{
                background: "#FFD56B",
                color: "#6D3B16",
                border: "none",
                padding: "6px 12px",
                borderRadius: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.3s",
                whiteSpace: "nowrap",
                fontSize: "13px"
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={onLoginClick}
            style={{
              background: "#FFD56B",
              color: "#6D3B16",
              border: "none",
              padding: "8px 18px",
              borderRadius: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s"
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
