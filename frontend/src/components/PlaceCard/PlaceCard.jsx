import React, { useState } from "react";
import "./PlaceCard.css";
import localPlaces from "../FeaturedPlaces/data";
import {
  FaStar,
  FaMapMarkerAlt,
  FaHeart,
  FaClock,
  FaCloudSun,
  FaVolumeUp,
  FaVolumeMute
} from "react-icons/fa";

function PlaceCard({ place, onViewDetails }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const getResolvedImage = () => {
    if (place.image && typeof place.image === "string" && !place.image.startsWith("data:") && !place.image.startsWith("/static/media/")) {
      const local = localPlaces.find((p) => p.name.toLowerCase() === place.name.toLowerCase());
      if (local) return local.image;
    }
    return place.image;
  };

  const handleAudioGuide = (e) => {
    e.stopPropagation();
    
    // Simple text to speech guide using window.speechSynthesis
    if ("speechSynthesis" in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.cancel(); // Stop any currently playing speech
        const speech = new SpeechSynthesisUtterance();
        speech.text = `Vanakkam! Welcome to ${place.name} in ${place.district} district. ${place.description}`;
        speech.lang = "en-IN";
        speech.rate = 0.9;
        
        speech.onend = () => {
          setIsPlaying(false);
        };
        speech.onerror = () => {
          setIsPlaying(false);
        };

        window.speechSynthesis.speak(speech);
        setIsPlaying(true);
      }
    } else {
      alert("Audio Text-to-Speech is not supported in this browser.");
    }
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    alert(`${place.name} added to your Favorites!`);
  };

  return (
    <div className="place-card">
      {/* Image */}
      <div className="place-image">
        <img src={getResolvedImage()} alt={place.name} />
        {place.unesco && (
          <span className="unesco-badge">
            UNESCO
          </span>
        )}
      </div>
      {/* Content */}
      <div className="place-content">
        <div className="rating">
          <FaStar className="star" />
          <span>{place.rating}</span>
        </div>
        <h3>{place.name}</h3>
        <p className="location">
          <FaMapMarkerAlt />
          {place.district}
        </p>
        <p className="category">{place.category}</p>
        <div className="info">
          <p>
            💰 <strong>Entry:</strong> {place.entryFee}
          </p>
          <p>
            <FaClock /> {place.timings}
          </p>
          <p>
            <FaCloudSun /> Best: {place.bestTime}
          </p>
        </div>
        <div className="card-buttons">
          <button className="wishlist-btn" onClick={handleWishlist}>
            <FaHeart style={{ color: "#d9534f", marginRight: "5px" }} />
            Wishlist
          </button>
          <button className="audio-btn" onClick={handleAudioGuide}>
            {isPlaying ? (
              <>
                <FaVolumeMute style={{ color: "#0275d8", marginRight: "5px" }} />
                Mute
              </>
            ) : (
              <>
                <FaVolumeUp style={{ color: "#0275d8", marginRight: "5px" }} />
                Audio
              </>
            )}
          </button>
        </div>
        <button className="details-btn" onClick={() => onViewDetails(place.id || place._id)}>
          View Details
        </button>
      </div>
    </div>
  );
}

export default PlaceCard;
