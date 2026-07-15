import React from "react";
import "./Festival.css";

// Place your festival images in:
// src/assets/images/festivals/
//   pongal.jpg
//   chithirai.jpg
//   karthigai.jpg

let pongalImg, chithiraiImg, karthigaiImg;

try { pongalImg = require("../../assets/images/festivals/pongal.jpg"); } catch { pongalImg = null; }
try { chithiraiImg = require("../../assets/images/festivals/chithirai.jpg"); } catch { chithiraiImg = null; }
try { karthigaiImg = require("../../assets/images/festivals/karthigai.jpg"); } catch { karthigaiImg = null; }

const placeholderStyle = (label) => (
  <div style={{
    width: "100%",
    height: "220px",
    background: "linear-gradient(135deg, #6D3B16 0%, #b57a33 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "14px",
    fontFamily: "Cinzel, serif",
    gap: "8px"
  }}>
    <span style={{ fontSize: "36px" }}>🎉</span>
    <span>{label}</span>
    <span style={{ fontSize: "11px", opacity: 0.8 }}>Add image to festivals folder</span>
  </div>
);

const sampleFestivals = [
  {
    id: 1,
    name: "Pongal (Harvest Festival)",
    date: "Mid-January",
    description: "A four-day Thanksgiving harvest festival celebrated throughout Tamil Nadu, dedicated to the Sun God, featuring boiling of sweet rice ('Pongal') in decorated clay pots.",
    image: pongalImg,
    label: "pongal.jpg"
  },
  {
    id: 2,
    name: "Chithirai Festival (Madurai)",
    date: "April - May",
    description: "Re-enacts the celestial wedding of Goddess Meenakshi to Lord Sundareswarar. The Madurai streets come alive with grand processions of the golden chariot.",
    image: chithiraiImg,
    label: "chithirai.jpg"
  },
  {
    id: 3,
    name: "Karthigai Deepam",
    date: "November - December",
    description: "The festival of lights celebrated during the full moon of Karthigai month, where oil lamps ('deepams') light up homes and a giant bonfire is lit on Thiruvannamalai Hill.",
    image: karthigaiImg,
    label: "karthigai.jpg"
  }
];

function Festival() {
  return (
    <section className="festival-section" id="festival-section">
      <div className="festival-title">
        <h2>Traditional Tamil Nadu Festivals</h2>
        <p>Experience the vibrant colors, rituals, and music that bring heritage sites to life.</p>
      </div>

      <div className="festival-grid">
        {sampleFestivals.map((fest) => (
          <div className="festival-card" key={fest.id}>
            <div className="festival-image">
              {fest.image ? (
                <img src={fest.image} alt={fest.name} />
              ) : (
                placeholderStyle(fest.label)
              )}
              <span className="festival-date">{fest.date}</span>
            </div>
            <div className="festival-content">
              <h3>{fest.name}</h3>
              <p>{fest.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Festival;

