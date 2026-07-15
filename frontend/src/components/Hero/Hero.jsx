import React from "react";
import "./Hero.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import hero1 from "../../assets/images/hero/hero1.jpg";
import hero2 from "../../assets/images/hero/hero2.jpg";
import hero3 from "../../assets/images/hero/hero3.jpg";

function Hero({ onExploreClick }) {
  const token = localStorage.getItem("token");

  const handleExplore = () => {
    if (!token) {
      onExploreClick();
    } else {
      const el = document.getElementById("category-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleAI = () => {
    if (!token) {
      onExploreClick();
    } else {
      const el = document.getElementById("ai-assistant-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="hero">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="hero-slider"
      >
        <SwiperSlide>
          <img src={hero1} alt="Brihadeeswarar Temple - Thanjavur" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={hero2} alt="Meenakshi Temple - Madurai" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={hero3} alt="Mahabalipuram Shore Temple" />
        </SwiperSlide>
      </Swiper>
      <div className="hero-overlay">
        <h1>Discover the Heritage of Tamil Nadu</h1>
        <p>
          Explore temples, monuments, traditions, festivals,
          virtual tours and AI-powered travel assistance.
        </p>
        <div className="hero-buttons">
          <button onClick={handleExplore}>Explore Now</button>
          <button className="secondary-btn" onClick={handleAI}>AI Assistant</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
