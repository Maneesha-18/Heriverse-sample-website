import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { api } from "../../services/api";
import "./Profile.css";

function Profile({ navigateTo }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    bio: "",
    address: "",
    dob: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
          navigateTo("home");
          return;
        }
        setUser(storedUser);
        
        // Fetch extended profile
        const data = await api.getUserProfile();
        if (data) {
          setProfile({
            bio: data.bio || "",
            address: data.address || "",
            dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : "",
          });
        }
      } catch (err) {
        console.warn("Could not load extended profile", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [navigateTo]);

  const handleLogout = () => {
    api.logout();
    navigateTo("home");
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.updateUserProfile(profile);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar navigateTo={navigateTo} onLogout={handleLogout} />
      
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <h2>User Profile</h2>
            {user && <p>Welcome back, {user.username}!</p>}
          </div>

          {loading ? (
            <p className="loading-text">Loading profile...</p>
          ) : (
            <form className="profile-form" onSubmit={handleSave}>
              {error && <p className="error-text">{error}</p>}
              {success && <p className="success-text" style={{ color: "green", textAlign: "center" }}>{success}</p>}
              
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={user?.email || ""} disabled />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea 
                  id="bio"
                  name="bio"
                  rows="3"
                  placeholder="Tell us about yourself..."
                  value={profile.bio}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address / City</label>
                <input 
                  type="text" 
                  id="address"
                  name="address"
                  placeholder="E.g., Chennai, Tamil Nadu"
                  value={profile.address}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input 
                  type="date" 
                  id="dob"
                  name="dob"
                  value={profile.dob}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-actions">
                <button type="button" className="back-home-arrow" onClick={() => navigateTo("home")} title="Go back">
                  ←
                </button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
