import React, { useState } from "react";
import "./MapSection.css";
import { FaSearch } from "react-icons/fa";

const initialLocations = [
  {
    name: "Tamil Nadu (State)",
    query: "Tamil Nadu, India",
    zoom: 7
  },
  {
    name: "Brihadeeswarar Temple",
    query: "Brihadeeswarar Temple, Thanjavur",
    zoom: 15
  },
  {
    name: "Meenakshi Amman Temple",
    query: "Meenakshi Amman Temple, Madurai",
    zoom: 15
  },
  {
    name: "Shore Temple",
    query: "Shore Temple, Mahabalipuram",
    zoom: 15
  },
  {
    name: "Vellore Fort",
    query: "Vellore Fort, Vellore",
    zoom: 15
  }
];

function MapSection() {
  const [locations, setLocations] = useState(initialLocations);
  const [activeLoc, setActiveLoc] = useState(initialLocations[0]);
  const [searchVal, setSearchVal] = useState("");

  // Construct Google Maps Embed URL
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(activeLoc.query)}&t=&z=${activeLoc.zoom}&ie=UTF8&iwloc=&output=embed`;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchVal.trim()) return;

    const newLoc = {
      name: `Search: "${searchVal.trim()}"`,
      query: `${searchVal.trim()}, Tamil Nadu, India`,
      zoom: 15
    };

    // Prepend search location to quick navigation list (keep list distinct and neat)
    setLocations((prev) => {
      const filtered = prev.filter((loc) => !loc.name.startsWith("Search:"));
      return [newLoc, ...filtered];
    });

    setActiveLoc(newLoc);
  };

  return (
    <section className="map-section" id="map-section">
      <div className="map-title">
        <h2>Interactive Heritage Map</h2>
        <p>Locate major heritage destinations and temples across Tamil Nadu.</p>
      </div>

      <div className="map-container">
        <div className="map-sidebar">
          <h3>Quick Navigation</h3>
          
          <form className="map-search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search destination..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <button type="submit" aria-label="Search">
              <FaSearch />
            </button>
          </form>

          <p style={{ marginTop: "15px", marginBottom: "15px" }}>Select a location to highlight it on the map:</p>
          <div className="map-buttons">
            {locations.map((loc, idx) => (
              <button
                key={idx}
                className={activeLoc.name === loc.name ? "active" : ""}
                onClick={() => setActiveLoc(loc)}
              >
                📍 {loc.name}
              </button>
            ))}
          </div>
        </div>

        <div className="map-iframe-container">
          <iframe
            title="Tamil Nadu Heritage Map"
            width="100%"
            height="100%"
            src={mapSrc}
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default MapSection;
