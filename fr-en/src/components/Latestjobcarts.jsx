import { Badge } from "lucide-react";
import React from "react";

const Latestjobcarts = ({ job }) => {
  return (
    <div>
      <div className="card shadow" style={{ width: "22rem" }}>
        {" "}
        {/* Increased width */}
        <div className="card-body text-start">
          <h5 className="card-title fw-bold h6">
            {" "}
            {/* Reduced font size using Bootstrap heading class */}
            {job?.company?.name}
          </h5>
          <p className="card-text small">
            {" "}
            {/* Used Bootstrap small text class */}
            India
          </p>
          <div>
            <h6 className="fw-bold h6">
              {" "}
              {/* Reduced font size using Bootstrap heading class */}
              {job?.title}
            </h6>
            <p className="card-text mb-3 small">
              {" "}
              {/* Used Bootstrap small text class and margin-bottom for spacing */}
              {job?.description}
            </p>
          </div>
          <div className="d-flex gap-2 mt-2">
            <span className="badge text-primary rounded-pill shadow-sm px-3 py-1">
              {job?.position} Positions
            </span>
            <span className="badge text-info rounded-pill shadow-sm px-3 py-1">
              {job?.salary}LPA
            </span>
            <span className="badge text-danger rounded-pill shadow-sm px-3 py-1">
              {job?.jobtype}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Latestjobcarts;
