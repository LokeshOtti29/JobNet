import React, { useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import Navbar from "../Navbar";
import { JOB_API_END_POINT } from "../../utils/constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobtype: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    console.log(selectedCompany);
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/postjob`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form
              onSubmit={submitHandler}
              className="p-4 border rounded shadow-sm bg-light"
            >
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={input.title}
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
                  <label className="form-label">Requirements</label>
                  <input
                    type="text"
                    name="requirements"
                    value={input.requirements}
                    onChange={changeEventHandler}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Salary</label>
                  <input
                    type="text"
                    name="salary"
                    value={input.salary}
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
                  <label className="form-label">Job Type</label>
                  <input
                    type="text"
                    name="jobtype"
                    value={input.jobtype}
                    onChange={changeEventHandler}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Experience Level</label>
                  <input
                    type="text"
                    name="experience"
                    value={input.experience}
                    onChange={changeEventHandler}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Number of Positions</label>
                  <input
                    type="number"
                    name="position"
                    value={input.position}
                    onChange={changeEventHandler}
                    className="form-control"
                  />
                </div>
                {companies.length > 0 && (
                  <div className="col-md-12">
                    <label className="form-label">Select a Company</label>
                    <select
                      className="form-select"
                      onChange={(e) => selectChangeHandler(e.target.value)}
                    >
                      <option value="">Choose...</option>
                      {companies.map((company) => (
                        <option
                          key={company._id}
                          value={company?.name?.toLowerCase()}
                        >
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              {loading ? (
                <button className="btn btn-primary w-100 mt-4" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Posting Job...
                </button>
              ) : (
                <button type="submit" className="btn btn-primary w-100 mt-4">
                  Post New Job
                </button>
              )}
              {companies.length === 0 && (
                <p className="text-danger text-center mt-3">
                  *Please register a company first before posting jobs.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
