import React from "react";

import "../styles/Home.css";

// components
import RecentItemHome from "../components/RecentItemHome";
const Home = () => {
  return (
    <div className="home">
      <div className="upper-element">
        <h1>WELCOME</h1>
        <div className="explore-button">
          <div className="explore-wrapper">
            <p>EXPLORE NOW</p>
          </div>
        </div>
        <div className="dark-cover"></div>
      </div>

      <div className="lower-element">
        <div className="link">
          <div className="icon">
            <img src="/images/facebook.png" alt="FB" />
            <span>LESUS</span>
          </div>
          <div className="icon">
            <img src="/images/location.png" alt="Location" />
            <span>27 Gladiola St. Cainta Rizal</span>
          </div>
        </div>

        {/* this will display all the recent items */}
        <RecentItemHome />
      </div>
    </div>
  );
};

export default Home;
