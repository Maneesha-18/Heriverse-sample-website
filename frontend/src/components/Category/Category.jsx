import React from "react";
import "./Category.css";
import categories from "./data";

function Category({ onSelectCategory }) {
  const handleClick = (catName) => {
    if (onSelectCategory) {
      onSelectCategory(catName);
      const el = document.getElementById("featured-places-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="category" id="category-section">
      <div className="category-title">
        <h2>Explore by Category</h2>
        <p>
          Discover the rich heritage, culture and natural beauty of Tamil Nadu
        </p>
      </div>
      <div className="category-grid">
        {categories.map((item) => (
          <div className="category-card" key={item.id}>
            <img
              src={item.image}
              alt={item.title}
              className="category-image"
            />
            <div className="category-content">
              <h3>{item.title}</h3>
              <button 
                className="category-btn"
                onClick={() => handleClick(item.categoryName)}
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Category;
