import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "../../redux/store";

const AdminJobTable = () => {
  const { allAdminjobs, searchJobByText } = useSelector((store) => store.job);
  const [filterjobs, setFilterjobs] = useState(allAdminjobs);
  const navigate = useNavigate();
  useEffect(() => {
    const filteredjobs =
      allAdminjobs.length >= 0 &&
      allAdminjobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            ?.toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterjobs(filteredjobs);
  }, [allAdminjobs, searchJobByText]);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <caption className="text-center">
          A List of Your Recently Posted Jobs
        </caption>
        <thead className="thead-dark">
          <tr>
            <th scope="col">Company Name</th>
            <th scope="col">Role</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterjobs?.map((job) => (
            <tr key={job._id}>
              <td>{job?.company?.name}</td>
              <td>{job?.title}</td>
              <td>{job?.createdAt.split("T")[0]}</td>
              <td>
                <button
                  onClick={() => navigate(`/admin/companies/${job?._id}`)}
                  className="btn btn-sm btn-outline-primary me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/admin/jobs/${job?._id}/applicants`)}
                  className="btn btn-sm btn-outline-dark"
                >
                  Applicants
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobTable;
