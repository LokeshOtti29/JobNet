// Navbar.js
import React, { useEffect } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Avatar from "./Avatar"; // Import the Avatar component
import UserActions from "./UserAction";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../redux/store";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  // Popover content
  const popover = (
    <Popover
      id="popover-basic"
      className="border border-secondary rounded shadow"
    >
      <Popover.Header as="h3" className="bg-light fw-bold border-bottom">
        <div className="d-flex align-items-center gap-3">
          <img
            src={user?.profile?.profilePhoto}
            alt="User Avatar"
            className="rounded-circle"
            style={{
              width: "50px", // Set a fixed width for better control
              height: "50px", // Set a fixed height for better control
              objectFit: "cover",
              border: "2px solid #007bff", // Add a border color (optional)
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
            }}
          />
          <div className="d-flex flex-column">
            <h1 className="fs-6 mb-0">{user?.fullname}</h1>
            <h6 className="text-muted" style={{ marginTop: "0.2rem" }}>
              {user?.email}
            </h6>
          </div>
        </div>
      </Popover.Header>
      <Popover.Body
        className="text-dark"
        style={{ fontSize: "0.875rem", padding: "1rem" }}
      >
        <UserActions />
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <div className="container bg-light d-flex justify-content-between align-items-center my-4">
        <div>
          <h1 className="fw-bold">
            Job<span className="text-danger">Net</span>
          </h1>
        </div>
        <div className="d-flex align-items-center gap-5">
          <ul className="list-unstyled fw-semibold d-flex align-items-center gap-4 mb-0">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    className={`nav-link ${
                      location.pathname === "/admin/companies" ? "active" : ""
                    }`}
                    to="/"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    className={`nav-link ${
                      location.pathname === "/admin/jobs" ? "active" : ""
                    }`}
                    to="/admin/jobs"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    className={`nav-link ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className={`nav-link ${
                      location.pathname === "/jobs" ? "active" : ""
                    }`}
                    to="/jobs"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    className={`nav-link ${
                      location.pathname === "/Browse" ? "active" : ""
                    }`}
                    to="/Browse"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="d-flex align-items-center gap-4">
              <Link to="/login">
                <button
                  className="btn text-dark"
                  style={{
                    padding: "0",
                    border: "none",
                    backgroundColor: "transparent",
                    textAlign: "left", // Align text to the left for better aesthetics
                    fontWeight: 500, // Optional: Adjust font weight
                  }}
                >
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button type="button" className="btn btn-outline-dark">
                  Sign-Up
                </button>
              </Link>
            </div>
          ) : (
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popover}
            >
              <div>
                <Avatar
                  name="John Doe"
                  imageUrl={user?.profile?.profilePhoto}
                  size={50}
                />
              </div>
            </OverlayTrigger>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
