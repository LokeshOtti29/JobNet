import React from "react";
import SearchBar from "./SearchBar";

const HeroSection = () => {
  return (
    <div className="text-center">
      <div className="d-flex flex-column gap-4 my-10">
        <h1 className="fw-bolder ">
          Search,Apply &<br />
          Get Your <span className="text-info">Dream Job</span>
        </h1>
      </div>
      <p>
        Discover your next opportunity or hire the perfect candidate
        effortlessly with JobNet
      </p>
      <br />
      <SearchBar />
    </div>
  );
};

export default HeroSection;
