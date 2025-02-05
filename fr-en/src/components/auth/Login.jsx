import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import store from "../../redux/store";
import { Loader2 } from "lucide-react";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-4 col-sm-6">
            <div
              className="card p-3"
              style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
            >
              <div className="card-header text-center">
                <h3 className="mb-0">Login</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="role" className="form-label">
                      You are a:
                    </label>
                    <div className="form-check me-4">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        id="student"
                        value="student"
                        checked={formData.role === "student"}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="recruiter">
                        Recruiter
                      </label>
                    </div>
                  </div>
                  {loading ? (
                    <button className="btn btn-primary w-100">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please Wait...
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary w-100">
                      Login
                    </button>
                  )}
                </form>

                <p className="mt-3 text-center">
                  Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
