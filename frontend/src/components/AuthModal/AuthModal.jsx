import React, { useState } from "react";
import "./AuthModal.css";
import { api } from "../../services/api";

function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState("login"); // "login" | "signup" | "forgot"
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.login(email, password);
      alert("Login successfully");
      onLoginSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.register(username, email, mobile, password);
      alert("Signup successful! Please login with your credentials.");
      setMode("login");
      setPassword("");
    } catch (err) {
      setError(err.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to: ${email}`);
    setMode("login");
  };

  const handleGoogleAuth = () => {
    // Mock successful Google Login
    const mockUser = { id: "google123", username: "GoogleTraveler", email: "google@gmail.com" };
    localStorage.setItem("token", "mock_google_jwt_token_12345");
    localStorage.setItem("user", JSON.stringify(mockUser));
    alert("Login successfully (via Google)");
    onLoginSuccess();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>

        {mode === "login" && (
          <>
            <h2 className="modal-title">🏛 HeriVerse Sign In</h2>
            <p className="modal-subtitle">Login to unlock heritage explore details</p>

            {error && <div className="modal-error">{error}</div>}

            <form onSubmit={handleLogin} className="modal-form">
              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="modal-submit-btn" disabled={loading}>
                {loading ? "Authenticating..." : "Sign In"}
              </button>
            </form>

            <div className="divider"><span>OR</span></div>

            <button className="google-btn" onClick={handleGoogleAuth}>
              <svg className="google-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Sign in with Google Mail
            </button>

            <div className="modal-footer">
              <span onClick={() => setMode("signup")}>Create account (Sign Up)</span>
              <span onClick={() => setMode("forgot")}>Forgot Password?</span>
            </div>
          </>
        )}

        {mode === "signup" && (
          <>
            <h2 className="modal-title">🏛 Join HeriVerse</h2>
            <p className="modal-subtitle">Sign up to access heritage guide planner</p>

            {error && <div className="modal-error">{error}</div>}

            <form onSubmit={handleSignup} className="modal-form">
              <div className="input-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="VanakkamTraveler"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="modal-submit-btn" disabled={loading}>
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <div className="divider"><span>OR</span></div>

            <button className="google-btn" onClick={handleGoogleAuth}>
              <svg className="google-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Sign up with Google Mail
            </button>

            <div className="modal-footer">
              <span onClick={() => setMode("login")}>Already have an account? Sign In</span>
            </div>
          </>
        )}

        {mode === "forgot" && (
          <>
            <h2 className="modal-title">🏛 Forgot Password</h2>
            <p className="modal-subtitle">Enter your email to receive recovery instructions</p>

            <form onSubmit={handleForgotPassword} className="modal-form">
              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="modal-submit-btn">
                Send Reset Link
              </button>
            </form>

            <div className="modal-footer">
              <span onClick={() => setMode("login")}>← Back to Login</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
