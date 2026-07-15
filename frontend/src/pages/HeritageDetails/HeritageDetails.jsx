import React, { useState, useEffect } from "react";
import "./HeritageDetails.css";
import localPlaces from "../../components/FeaturedPlaces/data";
import { api } from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaClock, FaCloudSun, FaMapMarkerAlt, FaStar, FaVolumeUp } from "react-icons/fa";

function HeritageDetails({ navigateTo, placeId }) {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const getResolvedImage = (placeObj) => {
    if (!placeObj) return null;
    if (placeObj.image && typeof placeObj.image === "string" && !placeObj.image.startsWith("data:") && !placeObj.image.startsWith("/static/media/")) {
      const local = localPlaces.find((p) => p.name.toLowerCase() === placeObj.name.toLowerCase());
      if (local) return local.image;
    }
    return placeObj.image;
  };

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      try {
        if (typeof placeId === "string" && placeId.length > 10) {
          // Likely a MongoDB ObjectId string
          const data = await api.getPlaceById(placeId);
          setPlace(data);
        } else {
          // Local fallback
          findLocalFallback();
        }
      } catch (err) {
        console.warn("Backend failed fetching place details. Using local fallback:", err.message);
        findLocalFallback();
      } finally {
        setLoading(false);
      }
    };

    const findLocalFallback = () => {
      const found = localPlaces.find((p) => p.id === Number(placeId));
      setPlace(found || null);
    };

    if (placeId) {
      loadDetails();
    }
  }, [placeId]);

  const handleAudioGuide = () => {
    if (!place) return;
    if ("speechSynthesis" in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance();
        speech.text = `Welcome to ${place.name}. ${place.description}`;
        speech.lang = "en-IN";
        speech.rate = 0.9;
        speech.onend = () => setIsPlaying(false);
        speech.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(speech);
        setIsPlaying(true);
      }
    }
  };

  if (loading) {
    return (
      <div className="details-loading">
        <h3>Loading heritage details...</h3>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="details-error">
        <h3>Place not found</h3>
        <button className="back-home-arrow" onClick={() => navigateTo("home")} title="Go back">←</button>
      </div>
    );
  }

  // Construct map embed source
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(place.name + ", " + place.district)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <>
      <Navbar navigateTo={navigateTo} />
      <div className="details-page-wrapper">
        <button className="back-home-arrow" onClick={() => navigateTo("home")} title="Go back">
          ←
        </button>

        <div className="details-content-card">
          <div className="details-hero-image">
            <img src={getResolvedImage(place)} alt={place.name} />
            {place.unesco && <span className="unesco-badge">UNESCO Site</span>}
          </div>

          <div className="details-main-info">
            <div className="title-row">
              <h2>{place.name}</h2>
              <div className="details-rating">
                <FaStar />
                <span>{place.rating} / 5</span>
              </div>
            </div>

            <p className="details-location">
              <FaMapMarkerAlt /> {place.district}, Tamil Nadu
            </p>

            <span className="details-category-badge">{place.category}</span>

            <div className="details-description">
              <h3>History & Significance</h3>
              <p>{place.description}</p>
            </div>

            <div className="details-quick-specs">
              <div className="spec-item">
                <strong>💰 Entry Fee:</strong>
                <span>{place.entryFee}</span>
              </div>
              <div className="spec-item">
                <FaClock />
                <strong>Timings:</strong>
                <span>{place.timings}</span>
              </div>
              <div className="spec-item">
                <FaCloudSun />
                <strong>Best Time to Visit:</strong>
                <span>{place.bestTime}</span>
              </div>
              <div className="spec-item">
                <strong>🌦 Weather:</strong>
                <span>{place.weather}</span>
              </div>
            </div>

            <div className="details-actions">
              <button className="details-audio-btn" onClick={handleAudioGuide}>
                <FaVolumeUp /> {isPlaying ? "Stop Audio Guide" : "Listen to Audio Guide"}
              </button>
              <a href={place.googleMap} target="_blank" rel="noopener noreferrer" className="gmap-link-btn">
                Open in Google Maps App
              </a>
            </div>
          </div>
        </div>

        {/* Embedded Map Section specific to this place */}
        <div className="details-map-section">
          <h3>Location Map</h3>
          <p>Find {place.name} on the map:</p>
          <div className="details-map-frame">
            <iframe
              title={place.name}
              width="100%"
              height="350px"
              src={mapSrc}
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HeritageDetails;
