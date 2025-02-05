import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companySlice";
import AdminJobTable from "./AdminJobTable";
import useGetallAdminjob from "../../hooks/useGetAllAdminJobs";
import { setSearchJobBytext } from "../../redux/jobSlice";

const AdminJobs = () => {
  useGetallAdminjob();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchJobBytext(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-3">
          <input
            type="text"
            placeholder="Filter by Name"
            className="form-control me-3"
            style={{ maxWidth: "300px" }}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={() => navigate("/admin/job/create")}
            className="btn btn-primary"
          >
            Post New Jobs
          </button>
        </div>
        <AdminJobTable />
      </div>
    </div>
  );
};

export default AdminJobs;
