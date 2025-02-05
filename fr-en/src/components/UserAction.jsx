import axios from "axios";
import React from "react";
import { GoPerson } from "react-icons/go"; // Import your icon
import { IoIosLogOut } from "react-icons/io"; // Import your icon
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { USER_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/authSlice";

function UserActions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="d-flex flex-column">
      {user && user.role === "student" && (
        <div className="d-flex align-items-center mb-2">
          <GoPerson size={25} className="me-2 text-primary" />
          <button
            className="btn text-dark"
            style={{
              padding: 0,
              border: "none",
              backgroundColor: "transparent",
              textAlign: "left", // Align text to the left for better aesthetics
              fontWeight: 500, // Optional: Adjust font weight
            }}
          >
            <Link to="/Profile"> View Profile</Link>
          </button>
        </div>
      )}

      <div className="d-flex align-items-center">
        <IoIosLogOut size={25} className="me-2 text-danger" />
        <button
          className="btn text-dark"
          onClick={handlelogout}
          style={{
            padding: 0,
            border: "none",
            backgroundColor: "transparent",
            textAlign: "left", // Align text to the left for better aesthetics
            fontWeight: 500, // Optional: Adjust font weight
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserActions;
