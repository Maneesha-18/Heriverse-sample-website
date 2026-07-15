import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Category from "../../components/Category/Category";
import FeaturedPlaces from "../../components/FeaturedPlaces/FeaturedPlaces";
import Festival from "../../components/Festival/Festival";
import AIAssistant from "../../components/AIAssistant/AIAssistant";
import MapSection from "../../components/MapSection/MapSection";
import Footer from "../../components/Footer/Footer";
import AuthModal from "../../components/AuthModal/AuthModal";

function Home({ navigateTo }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Sync state with token presence
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);


  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSearchQuery(""); // Clear search to focus on category explore
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    // Smooth scroll to Category section after rendering completes
    setTimeout(() => {
      const el = document.getElementById("category-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  const handleOpenAuth = () => {
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Navbar navigateTo={navigateTo} onLoginClick={handleOpenAuth} onLogout={handleLogout} />
      <Hero onExploreClick={handleOpenAuth} />
      
      {isLoggedIn ? (
        <>
          <Category onSelectCategory={handleSelectCategory} />
          <FeaturedPlaces
            activeCategory={selectedCategory}
            activeSearch={searchQuery}
            activeDistrict={selectedDistrict}
            onViewDetails={(id) => navigateTo("details", id)}
          />
          <Festival />
          <MapSection />
          <AIAssistant />
        </>
      ) : (
        <div style={{
          textAlign: "center",
          padding: "80px 20px",
          background: "#F8F1E5",
          borderTop: "1px solid #EAD6B8",
          borderBottom: "1px solid #EAD6B8"
        }}>
          <h2 style={{ fontFamily: "Cinzel, serif", color: "#6D3B16", fontSize: "32px", marginBottom: "15px" }}>
            Uncover the Wonders of Tamil Nadu
          </h2>
          <p style={{ color: "#555", fontSize: "18px", maxWidth: "600px", margin: "0 auto 30px" }}>
            Sign in to start searching heritage destinations, listen to local audio guides, and chat with our smart AI assistant.
          </p>
          <button 
            onClick={handleOpenAuth}
            style={{
              background: "#6D3B16",
              color: "white",
              border: "none",
              padding: "14px 35px",
              borderRadius: "30px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 5px 15px rgba(109, 59, 22, 0.2)"
            }}
          >
            Sign In / Register Now
          </button>
        </div>
      )}

      <Footer />

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default Home;
