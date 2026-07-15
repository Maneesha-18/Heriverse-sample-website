import React, { useState, useEffect } from "react";
import "./FeaturedPlaces.css";
import localPlaces from "./data";
import PlaceCard from "../PlaceCard/PlaceCard";
import { api } from "../../services/api";

function FeaturedPlaces({ activeCategory, activeSearch, activeDistrict, onViewDetails }) {
  const [places, setPlaces] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  // Sync activeCategory from search/category sections
  useEffect(() => {
    if (activeCategory) {
      setFilter(activeCategory);
    }
  }, [activeCategory]);

  const filterLocalPlaces = (currentFilter) => {
    let filtered = localPlaces;

    if (currentFilter !== "All") {
      filtered = filtered.filter(p => p.category.toLowerCase() === currentFilter.toLowerCase());
    }
    if (activeDistrict) {
      filtered = filtered.filter(p =>
        p.district.toLowerCase().includes(activeDistrict.toLowerCase())
      );
    }
    if (activeSearch) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
        p.district.toLowerCase().includes(activeSearch.toLowerCase())
      );
    }
    setPlaces(filtered);
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const data = await api.getPlaces(
          activeSearch || "",
          filter === "All" ? "" : filter,
          activeDistrict || ""
        );
        if (data && data.length > 0) {
          setPlaces(data);
        } else {
          filterLocalPlaces(filter);
        }
      } catch (err) {
        console.warn("Backend offline or error. Using local fallback data:", err.message);
        filterLocalPlaces(filter);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, activeSearch, activeDistrict]);

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
