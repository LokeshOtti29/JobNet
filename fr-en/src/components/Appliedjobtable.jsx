import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const JobTable = () => {
  // Sample job data
  const { allAppliedjobs } = useSelector((store) => store.job);

  return (
    <div
      className="bg-white rounded-pill mx-auto p-4"
      style={{ maxWidth: "56rem" }}
    >
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Job Role</th>
            <th>Company</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allAppliedjobs.length <= 0 ? (
            <span>You haven't applied any job yet</span>
          ) : (
            allAppliedjobs.map((job) => (
              <tr key={job._id}>
                <td>{job?.createdAt?.split("T")[0]}</td>
                <td>{job?.Job?.title}</td>
                <td>{job?.Job?.company?.name}</td>
                <td>
                  <span
                    className={`badge ${
                      job?.status === "rejected"
                        ? "bg-danger"
                        : job?.status === "pending"
                        ? "bg-warning"
                        : "bg-success"
                    } text-white rounded-pill shadow-sm px-3 py-2`}
                  >
                    {job.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default JobTable;
