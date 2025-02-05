import React from "react";
import Latestjobcarts from "./Latestjobcarts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Latestjobs = () => {
  const { alljobs } = useSelector((store) => store.job);
  const navigate = useNavigate();
  return (
    <div className="text-center my-20">
      <h1 className="fw-bold">
        <span className="text-info">Latest & Top</span> Job Openings
      </h1>
      <div className="container">
        <div className="row justify-content-center my-5">
          {alljobs.length <= 0 ? (
            <span>No Jobs Available</span>
          ) : (
            alljobs.slice(0, 6).map((job) => (
              <div
                onClick={() => navigate(`/description/${job._id}`)}
                className="col-md-4 d-flex justify-content-center mb-4"
              >
                <Latestjobcarts key={job._id} job={job} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Latestjobs;
