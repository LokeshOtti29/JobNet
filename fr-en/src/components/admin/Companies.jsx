import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Companiestable from "./Companiestable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
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
            onClick={() => navigate("/admin/companies/Companycreate")}
            className="btn btn-primary"
          >
            New Company
          </button>
        </div>
        <Companiestable />
      </div>
    </div>
  );
};

export default Companies;
