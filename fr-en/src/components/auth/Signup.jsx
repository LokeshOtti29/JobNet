import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";

import { Loader2 } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null, // Default null for file
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const changefilehandler = (e) => {
    setFormData({
      ...formData,
      file: e.target.files?.[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("fullname", formData.fullname);
    form.append("email", formData.email);
    form.append("phoneNumber", formData.phoneNumber);
    form.append("password", formData.password);
    form.append("role", formData.role);

    if (formData.file) {
      form.append("file", formData.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Sign Up As</label>
                <div className="d-flex align-items-center">
                  <div className="form-check me-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="student"
                      value="student"
                      checked={formData.role === "student"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="student">
                      Student
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="recruiter"
                      value="recruiter"
                      checked={formData.role === "recruiter"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="recruiter">
                      Recruiter
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2 mb-3">
                <label htmlFor="upload">Profile</label>
                <input
                  type="file"
                  name="file"
                  id="upload"
                  accept="image/*"
                  onChange={changefilehandler}
                  className="cursor-pointer"
                />
              </div>

              {loading ? (
                <button className="btn btn-primary w-100">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait...
                </button>
              ) : (
                <button type="submit" className="btn btn-primary w-100">
                  SignUp
                </button>
              )}
            </form>

            <div className="text-center mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
