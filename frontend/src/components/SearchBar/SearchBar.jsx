import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("District");
  const [category, setCategory] = useState("Category");

  const handleSearch = () => {
    onSearch({ search, district, category });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="search-section" id="search-bar-section">
      <h2>Find Your Heritage Destination</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search Heritage Site..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <select value={district} onChange={(e) => setDistrict(e.target.value)}>
          <option value="District">District</option>
          <option value="Madurai">Madurai</option>
          <option value="Thanjavur">Thanjavur</option>
          <option value="Mahabalipuram">Mahabalipuram</option>
          <option value="Kumbakonam">Kumbakonam</option>
          <option value="Ariyalur">Ariyalur</option>
          <option value="Vellore">Vellore</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Category">Category</option>
          <option value="Temple">Temple</option>
          <option value="Fort">Fort</option>
          <option value="Museum">Museum</option>
          <option value="Festival">Festival</option>
          <option value="Beach">Beach</option>
          <option value="Hill">Hill</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
    </section>
  );
}

export default SearchBar;
