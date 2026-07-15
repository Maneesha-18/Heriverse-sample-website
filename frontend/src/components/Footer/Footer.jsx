import React from "react";
import "./Footer.css";
import logo from "../../assets/images/logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="HeriVerse Logo" />
            <span>HeriVerse</span>
          </div>

          <p>Smart Tourist Assistance System for Tamil Nadu Heritage Sites. Discover the grandeur of Dravidian architecture and heritage.</p>
        </div>
        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li>Temples</li>
            <li>Forts</li>
            <li>Museums</li>
            <li>Festivals</li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact & Info</h4>
          <p>📧 support@heriverse.in</p>
          <p>📞 +91 44 2468 1357</p>
          <p>📍 Tamil Nadu Tourism, Chennai, India</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HeriVerse. All Rights Reserved. Built with ❤️ for Tamil Nadu Heritage.</p>
      </div>
    </footer>
  );
}

export default Footer;
