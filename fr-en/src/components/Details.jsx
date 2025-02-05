import React, { useEffect, useState } from "react";
import { Container, Badge, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
// import useGetsinglejob from "../hooks/useGetsinglejob";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../utils/constant";
import { setSingleJob } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Details = () => {
  const params = useParams();
  const jobId = params.id;
  const { Singlejob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isApplied =
    Singlejob?.applications?.some(
      (application) => application.applicant == user?._id
    ) || false;
  const [isApp, setInitial] = useState(isApplied);
  const dispatch = useDispatch();
  const applyjobhandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/applyjob/${jobId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        setInitial(true); //update local state
        const updatesinglejob = {
          ...Singlejob,
          applications: [...Singlejob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatesinglejob)); // help us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const fetchsinglejobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          console.log(res.data.job);
          dispatch(setSingleJob(res.data.job));
          setInitial(
            res.data.job.applications.some(
              (application) => application.applicant == user?._id
            )
          ); //Ensure the state is sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchsinglejobs();
  }, [jobId, dispatch, user?._id]);
  return (
    <div
      className="container mx-auto my-5 p-4 shadow"
      style={{ maxWidth: "7xl" }}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="font-weight-bold text-xl">{Singlejob?.title}</h5>
          <div className="d-flex align-items-center gap-2 mt-3">
            <span className="badge text-primary rounded-pill shadow-sm px-3 py-1">
              {Singlejob?.position}Positions
            </span>
            <span className="badge text-info rounded-pill shadow-sm px-3 py-1">
              {Singlejob?.jobtype}
            </span>
            <span className="badge text-danger rounded-pill shadow-sm px-3 py-1">
              {Singlejob?.salary}LPA
            </span>
          </div>
        </div>

        <Button
          onClick={isApp ? null : applyjobhandler}
          variant={isApp ? "secondary" : "primary"}
          className={`mt-4 px-4 py-2 ${isApp ? "disabled" : ""}`}
          disabled={isApp} // Disable the button when applied
        >
          {isApp ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Description Section */}
      <h5 className="border-bottom border-2 border-gray py-3 font-weight-medium">
        Job Description
      </h5>
      <div>
        <h6 className="fw-medium my-1">
          Role:{" "}
          <span className="ps-4 fw-normal text-secondary">
            {Singlejob?.title}
          </span>
        </h6>
        <h6 className="fw-medium my-1">
          Location:{" "}
          <span className="ps-4 fw-normal text-secondary">
            {Singlejob?.location}
          </span>
        </h6>
        <h6 className="fw-medium my-1">
          Description:{" "}
          <span className="ps-4 fw-normal text-secondary">
            {Singlejob?.description}
          </span>
        </h6>
        <h6 className="fw-medium my-1">
          Experience:{" "}
          <span className="ps-4 fw-normal text-secondary">
            {Singlejob?.experienceLevel}yrs
          </span>
        </h6>
        <h6 className="fw-medium my-1">
          Salary:{" "}
          <span className="ps-4 fw-normal text-secondary">
            {Singlejob?.salary} Lpa
          </span>
        </h6>
        <h6 className="fw-medium my-1">
          Total Applicants:{" "}
          <span className="ps-4 fw-normal text-secondary">
            {Singlejob?.applications.length}
          </span>
        </h6>
        <h6 className="fw-medium my-1">
          Posted Date:{" "}
          <span className="ps-4 fw-normal text-secondary">
            {Singlejob?.createdAt.split("T")[0]}
          </span>
        </h6>
      </div>
    </div>
  );
};

export default Details;
