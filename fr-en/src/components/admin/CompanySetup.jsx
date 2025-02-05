import React, { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import Navbar from "../Navbar";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { toast } from "react-toastify";
import useGetCompanyById from "../../hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/updatecompany/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="container p-4 border rounded my-4">
        <form onSubmit={submitHandler}>
          <div className="d-flex align-items-center mb-4">
            <button
              type="button"
              className="btn btn-outline-secondary me-3"
              onClick={() => navigate("/admin/companies")}
            >
              &#8592; Back
            </button>
            <h1 className="fw-bold fs-4 mb-0">Company Setup</h1>
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Website</label>
              <input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="form-control"
              />
            </div>
          </div>
          <div className="mt-4">
            {loading ? (
              <button className="btn btn-primary w-100" disabled>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Please wait
              </button>
            ) : (
              <button type="submit" className="btn btn-primary w-100">
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
