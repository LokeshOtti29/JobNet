import React from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { toast } from "react-toastify";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    console.log("called");
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <Table striped bordered hover>
        <caption>A list of your recent applied user</caption>
        <thead>
          <tr>
            <th>FullName</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Resume</th>
            <th>Date</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr key={item._id}>
                <td>{item?.applicant?.fullname}</td>
                <td>{item?.applicant?.email}</td>
                <td>{item?.applicant?.phoneNumber}</td>
                <td>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-primary"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalname}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </td>
                <td>{item?.applicant.createdAt.split("T")[0]}</td>
                <td className="text-right">
                  {shortlistingStatus.map((status, index) => (
                    <Button
                      key={index}
                      variant={status === "Accepted" ? "success" : "danger"}
                      className="me-2"
                      onClick={() => statusHandler(status, item?._id)}
                    >
                      {status}
                    </Button>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
