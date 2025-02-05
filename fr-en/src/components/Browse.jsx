import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import useGetalljob from "../hooks/useGetalljob";
import { setSearchQuery } from "../redux/jobSlice";

const Browse = () => {
  useGetalljob();
  const { alljobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="container my-5" style={{ maxWidth: "7xl" }}>
        <h4>Search Results ({alljobs.length})</h4>
        <div className="row">
          {alljobs.map((job) => {
            console.log(job);
            return (
              <div className="col-md-4 mb-4">
                <Job key={job._id} job={job} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
