import React from "react";
import "../Styles/home.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home-top">
      <div className="home-inner-top">
        <div className="company-detail">
          <div className="company-name">
            EFFORTLESS LICENSE ASSIGNMENTS FOR SMOOTH TRAVELS AHEAD
          </div>
          <div className="company-desc">
            Streamline the assessment and assignment of licenses, ensuring
            seamless travel experiences through our user-friendly and intuitive
            platform.
          </div>
          <div>
            <Link className="company-btn">Take Assessment</Link>
          </div>
        </div>
        <div className="home-banner"></div>
      </div>
    </div>
  );
};

export default Home;
