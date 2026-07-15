import React, { useState } from "react";
import "../Login/Login.css"; // Reuse shared styling
import { api } from "../../services/api";

function Register({ navigateTo }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.register(username, email, password);
      alert("Registration successful! Welcome to HeriVerse.");
      navigateTo("home");
    } catch (err) {
      setError(err.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">🏛 HeriVerse Register</h2>
        <p className="login-subtitle">Create an account to save favorite places</p>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="TamilTraveler"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Already have an account?{" "}
            <span className="link-text" onClick={() => navigateTo("login")}>
              Login here
            </span>
          </p>
          <button className="back-home-arrow" onClick={() => navigateTo("home")} title="Go back">
            ←
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
