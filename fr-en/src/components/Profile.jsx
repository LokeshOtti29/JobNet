import React, { useState } from "react";
import Navbar from "./Navbar";
import { Image } from "react-bootstrap"; // Importing React Bootstrap's Image component
import { MdEdit } from "react-icons/md"; // Importing the pen (edit) icon from react-icons
import { FaEnvelope, FaAddressBook } from "react-icons/fa";
import Appliedjobtable from "./Appliedjobtable";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";

const isResume = true;
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <Navbar />
      <div
        className="container bg-white border  rounded my-5 p-5"
        style={{ maxWidth: "56rem" }}
      >
        <div className="d-flex align-items-start mx-5">
          {/* Avatar and user details section */}
          <div className="d-flex align-items-center flex-grow-1">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1EMI4EFvTbcfO4giukzhRdzttVJGDz4B_Sg&s"
              roundedCircle
              alt="User Avatar"
              style={{ width: "60px", height: "60px" }} // Keeping the avatar size
              className="me-3"
            />
            <div>
              <h5>{user?.fullname}</h5>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          {/* Edit button positioned above user details */}
          <button
            className="btn btn-light"
            onClick={() => {
              setOpen(true);
            }}
            style={{
              padding: "0",
              border: "none",
              background: "transparent",
              height: "auto",
              width: "auto",
              marginTop: "-20px", // Move the button up
            }}
          >
            <MdEdit style={{ fontSize: "20px", color: "#000" }} />
          </button>
        </div>
        <div className="mx-5 mt-3 mb-3">
          <div className="d-flex gap-3 align-items-center">
            <FaEnvelope /> {/* Email Icon */}
            <span>{user?.email}</span>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <FaAddressBook /> {/* Contacts Icon */}
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="mx-5 mt-3 mb-3">
          <h5>Skills</h5>
          <div className="d-flex align-items-center gap-3 flex-wrap">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <span
                  key={index}
                  className="badge text-primary rounded-pill shadow-sm px-3 py-2"
                >
                  {item}
                </span>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        <div className="d-flex align-items-start flex-column mx-5 mt-3 mb-3 gap-2">
          <label className="text-md fw-bold">Resume</label>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-primary"
              style={{ textDecoration: "none", cursor: "pointer" }}
              download={user?.profile?.resume}
            >
              {user?.profile?.resumeOriginalname}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div
        className="bg-white rounded-pill mx-auto "
        style={{ maxWidth: "56rem" }} // Equivalent to 4xl
      >
        <h4 className="fw-bold fs-5 mx-4">Applied Jobs</h4>
        <Appliedjobtable />
      </div>
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
