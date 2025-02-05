import React, { useEffect } from "react";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCompanies } from "../redux/companySlice";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchcompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/getcompany`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchcompanies();
  }, []);
};

export default useGetAllCompanies;
