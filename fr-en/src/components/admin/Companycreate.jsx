import React, { useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";

const Companycreate = () => {
  const navigate = useNavigate();
  const [companyName, setcompanyname] = useState();
  const dispatch = useDispatch();
  const registernewcompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container-xxl mx-auto d-flex justify-content-center">
        <div className="w-75 my-5">
          <div className="my-5">
            <h1 className="fw-bold text-left">Your Company Name</h1>
            <p className="text-muted text-left">
              What would you like to give your company name?
            </p>
          </div>
          <div className="my-4">
            <label className="form-label">Company Name</label>
            <input
              className="form-control form-control-lg my-2"
              type="text"
              placeholder="Google, Facebook etc."
              onChange={(e) => setcompanyname(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-start gap-3 my-5">
            <button
              className="btn btn-outline-secondary px-4"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </button>
            <button
              className="btn btn-outline-primary px-4"
              onClick={registernewcompany}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companycreate;
