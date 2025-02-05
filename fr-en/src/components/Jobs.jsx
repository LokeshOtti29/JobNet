import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Filtercard from "./Filtercard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { alljobs, searchQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(alljobs);

  useEffect(() => {
    if (searchQuery) {
      const filteredJobs = alljobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(alljobs);
    }
  }, [alljobs, searchQuery]);

  return (
    <div>
      <Navbar />
      <div
        className="container mt-5"
        style={{ maxWidth: "7xl", margin: "0 auto" }}
      >
        <div className="d-flex gap-5">
          <div style={{ width: "20%" }}>
            <Filtercard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>No Jobs Available!!!</span>
          ) : (
            <div className="flex-1">
              <div
                className="row my-5"
                style={{
                  overflowY: "auto",
                  maxHeight: "calc(100vh - 200px)",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                    className="col-md-4 d-flex justify-content-center mb-4"
                    style={{
                      minWidth: "300px",
                      flex: "1 1 300px",
                    }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
