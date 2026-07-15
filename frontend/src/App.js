import React, { useState } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import HeritageDetails from "./pages/HeritageDetails/HeritageDetails";
import Profile from "./pages/Profile/Profile";

function App() {
  const [currentPage, setCurrentPage] = useState("home"); // "home" | "login" | "register" | "details"
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  const navigateTo = (page, placeId = null) => {
    setCurrentPage(page);
    if (placeId) {
      setSelectedPlaceId(placeId);
    }
    window.scrollTo(0, 0);
  };

  return (
    <>
      {currentPage === "home" && <Home navigateTo={navigateTo} />}
      {currentPage === "login" && <Login navigateTo={navigateTo} />}
      {currentPage === "register" && <Register navigateTo={navigateTo} />}
      {currentPage === "details" && <HeritageDetails navigateTo={navigateTo} placeId={selectedPlaceId} />}
      {currentPage === "profile" && <Profile navigateTo={navigateTo} />}
    </>
  );
}

export default App;
