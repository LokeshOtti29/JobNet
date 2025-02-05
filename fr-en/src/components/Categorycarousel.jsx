import React, { useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { MoveRight, MoveLeft } from "lucide-react"; // Importing the icons
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../redux/jobSlice";
import { useDispatch } from "react-redux";

// Sample categories array
const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Mobile Developer",
  "DevOps Engineer",
  "AI Engineer",
];

const CategoryCarousel = () => {
  const carouselRef = useRef(null); // Create a ref to control the carousel
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchJobhandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };
  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      {/* Left Navigation Button */}
      <button
        className="btn p-0 me-2" // Small button with no padding
        onClick={() => carouselRef.current?.prev()} // Previous button
        style={{
          background: "transparent", // Make background transparent
          border: "none", // Remove border
          color: "black", // Set arrow color to black
          fontSize: "24px", // Adjust font size for the arrow
        }}
      >
        <MoveLeft size={16} /> {/* Left arrow icon */}
      </button>

      {/* Carousel Component */}
      <Carousel
        ref={carouselRef}
        style={{ width: "30%", background: "transparent" }}
        controls={false}
        indicators={false}
      >
        {categories.map((category, index) => (
          <Carousel.Item key={index}>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "60px" }}
            >
              <button
                onClick={() => {
                  searchJobhandler(category);
                }}
                className="btn btn-danger btn-sm" // Changed button color to 'btn-danger' (red)
                style={{ margin: "0 5px" }} // Adding margin for gap between buttons
              >
                {category}
              </button>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Right Navigation Button */}
      <button
        className="btn p-0 ms-2" // Small button with no padding
        onClick={() => carouselRef.current?.next()} // Next button
        style={{
          background: "transparent", // Make background transparent
          border: "none", // Remove border
          color: "black", // Set arrow color to black
          fontSize: "24px", // Adjust font size for the arrow
        }}
      >
        <MoveRight size={16} /> {/* Right arrow icon */}
      </button>
    </div>
  );
};

export default CategoryCarousel;
