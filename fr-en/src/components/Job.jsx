import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  const toggleBookmark = (e) => {
    e.preventDefault();
    setIsBookmarked((prev) => !prev);
  };
  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
  };

  return (
    <div
      className="card border-0 shadow mb-4 mx-auto"
      style={{ maxWidth: "100%", width: "400px", borderRadius: "10px" }}
    >
      <div className="card-body p-3">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <p className="mb-0 me-2 text-muted" style={{ fontSize: "0.9rem" }}>
            {daysAgo(job?.createdAt) == 0
              ? "Today"
              : `${daysAgo(job?.createdAt)}days ago`}
          </p>
          <div
            onClick={toggleBookmark}
            className="d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: "35px",
              height: "35px",
              padding: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
              boxShadow: isBookmarked ? "0 0 5px rgba(0,0,0,0.5)" : "none",
            }}
            role="button"
            aria-pressed={isBookmarked}
          >
            {isBookmarked ? (
              <FaBookmark style={{ fontSize: "1.2rem", color: "black" }} />
            ) : (
              <FaRegBookmark style={{ fontSize: "1.2rem", color: "black" }} />
            )}
          </div>
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <button
            className="btn d-flex align-items-center justify-content-center rounded-circle border-0"
            style={{ padding: "0" }}
          >
            <Image
              src={job?.company?.logo}
              alt="Company Logo"
              roundedCircle
              width={40}
              height={40}
            />
          </button>
          <div>
            <h6 className="mb-1" style={{ fontSize: "1.2rem" }}>
              {job?.company?.name}
            </h6>
            <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>
              India
            </p>
          </div>
        </div>
        <h5 className="mb-1" style={{ fontSize: "1.1rem" }}>
          {job?.title}
        </h5>
        <div className="mb-2">
          <p className="card-text" style={{ fontSize: "0.95rem" }}>
            {job?.description}
          </p>
        </div>
        {/* Badge Section with Flex-Wrap */}
        <div
          className="d-flex gap-2 mt-2 flex-wrap"
          style={{ justifyContent: "flex-start" }}
        >
          <span className="badge text-primary rounded-pill shadow-sm px-3 py-1">
            {job?.position} Positions
          </span>
          <span className="badge text-info rounded-pill shadow-sm px-3 py-1">
            {job?.jobtype}
          </span>
          <span className="badge text-danger rounded-pill shadow-sm px-3 py-1">
            {job?.salary} LPA
          </span>
        </div>
        <div className="d-flex align-items-center mt-4 gap-3 flex-wrap">
          <button
            className="btn btn-outline-primary btn-sm shadow-sm"
            onClick={() => navigate(`/description/${job?._id}`)}
          >
            Details
          </button>
          <button className="btn btn-primary btn-sm shadow-sm">
            Save For Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default Job;
