import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Assuming you're using React Bootstrap
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/authSlice";
import { toast } from "react-toastify";

import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { Loader2 } from "lucide-react";

const UpdateProfile = ({ open, setOpen }) => {
  const [loading, setloading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });
  const dispatch = useDispatch();

  // Close modal when 'x' button is clicked
  const handleClose = () => {
    setOpen(false);
  };

  // Handle form submission
  const handlechanged = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  // Handle resume file change
  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("fullname", input.fullname);
    form.append("email", input.email);
    form.append("phoneNumber", input.phoneNumber);
    form.append("bio", input.bio);
    form.append("skills", input.skills);
    if (input.file) {
      form.append("file", input.file);
    }
    try {
      setloading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profileUpdate`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setloading(false);
    }
    setOpen(false);

    console.log(input);
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className="form-control"
              placeholder="Enter full name"
              value={input.fullname}
              onChange={handlechanged}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={input.email}
              onChange={handlechanged}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="number" className="form-label">
              Contact
            </label>
            <input
              type="text"
              id="number"
              name="number"
              className="form-control"
              placeholder="Enter contact number"
              value={input.phoneNumber}
              onChange={handlechanged}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="bio" className="form-label">
              Description
            </label>
            <textarea
              id="bio"
              name="bio"
              className="form-control"
              rows="3"
              placeholder="Enter description"
              value={input.bio}
              onChange={handlechanged}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="skills" className="form-label">
              Skills
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              className="form-control"
              placeholder="Enter skills (comma separated)"
              value={input.skills}
              onChange={handlechanged}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="file" className="form-label">
              Upload Resume
            </label>
            <input
              type="file"
              id="file"
              name="file"
              className="form-control"
              accept="application/pdf" // Restrict to common resume formats
              onChange={handleResumeChange}
            />
          </div>

          {loading ? (
            <button className="btn btn-primary w-100">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait...
            </button>
          ) : (
            <button type="submit" className="btn btn-primary w-100">
              Update
            </button>
          )}
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateProfile;
