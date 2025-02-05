import React, { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setAllAdminJobs } from "../redux/jobSlice";
import axios from "axios";

const useGetallAdminjob = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchallAdminjobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjob`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchallAdminjobs();
  }, []);
};

export default useGetallAdminjob;
