import React, { useState, useEffect } from "react";
import "./FeaturedPlaces.css";
import localPlaces from "./data";
import PlaceCard from "../PlaceCard/PlaceCard";
import { api } from "../../services/api";

function FeaturedPlaces({ activeCategory, activeSearch, activeDistrict, onViewDetails }) {
  const [places, setPlaces] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync activeCategory from search/category sections
  useEffect(() => {
    if (activeCategory) {
      setFilter(activeCategory);
    }
  }, [activeCategory]);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      // Query parameters for backend search
      const data = await api.getPlaces(
        activeSearch || "",
        filter === "All" ? "" : filter,
        activeDistrict || ""
      );
      
      if (data && data.length > 0) {
        setPlaces(data);
        setError(null);
      } else {
        // Fallback to local places if backend returns empty list (and search matches locally)
        filterLocalPlaces();
      }
    } catch (err) {
      console.warn("Backend offline or error. Using local fallback data:", err.message);
      filterLocalPlaces();
    } finally {
      setLoading(false);
    }
  };

  const filterLocalPlaces = () => {
    let filtered = localPlaces;
    
    // Filter by category
    if (filter !== "All") {
      filtered = filtered.filter(p => p.category.toLowerCase() === filter.toLowerCase());
    }
    
    // Filter by district
    if (activeDistrict) {
      filtered = filtered.filter(p =>
        p.district.toLowerCase().includes(activeDistrict.toLowerCase())
      );
    }
    
    // Filter by active search query
    if (activeSearch) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
        p.district.toLowerCase().includes(activeSearch.toLowerCase())
      );
    }

    setPlaces(filtered);
  };

  useEffect(() => {
    fetchPlaces();
  }, [filter, activeSearch, activeDistrict]);

  const handleSeedDatabase = async () => {
    setLoading(true);
    try {
      await api.seedPlaces();
      alert("Sample places successfully seeded in MongoDB!");
      fetchPlaces();
    } catch (err) {
      alert("Could not seed database. Ensure MongoDB & backend server are running on port 5000: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="featured-places" id="featured-places-section">
      <div className="featured-title">
        <h2>Featured Heritage Places</h2>
        <p>
          Discover the timeless beauty and rich cultural heritage of Tamil Nadu.
        </p>
      </div>

      {/* Smart Filter */}
      <div className="filter-buttons">
        {["All", "Temple", "Fort", "Beach", "Hill", "Museum"].map((cat) => (
          <button
            key={cat}
            className={filter === cat ? "active" : ""}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>



      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", fontSize: "20px" }}>Loading heritage sites...</div>
      ) : (
        <div className="places-grid">
          {places.length > 0 ? (
            places.map((place) => (
              <PlaceCard
                key={place.id || place._id}
                place={place}
                onViewDetails={onViewDetails}
              />
            ))
          ) : (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px", fontSize: "18px", color: "#666" }}>
              No heritage places match your search options.
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default FeaturedPlaces;
