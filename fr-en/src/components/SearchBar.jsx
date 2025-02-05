import React, { useState } from "react";
import { Search } from "lucide-react"; // Using Lucide for the search icon
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobhandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };
  return (
    <div className="d-flex justify-content-center my-4">
      <div
        className="input-group"
        style={{
          width: "45%",
          borderRadius: "50px",
          background: "transparent",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Added shadow
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Find your dream jobs"
          style={{
            border: "none",
            borderRadius: "50px",
            padding: "10px 15px",
            background: "transparent",
            color: "#333", // Text color
          }}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchJobhandler}
          type="button"
          className="btn"
          style={{
            background: "transparent",
            border: "none",
            borderRadius: "50px", // Make the button round
            padding: "10px 15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Search className="h-5 w-5" style={{ opacity: 0.6, color: "#333" }} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
