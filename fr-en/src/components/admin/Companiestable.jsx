import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Companiestable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filtercompany, setFiltercompany] = useState(companies);
  const navigate = useNavigate();
  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFiltercompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <caption className="text-center">
          A List of Your Recently Registered Companies
        </caption>
        <thead className="thead-dark">
          <tr>
            <th scope="col">Logo</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {companies.length === 0 ? (
            <span>No Companies Registered</span>
          ) : (
            filtercompany.map((company) => (
              <tr key={company._id}>
                <td>
                  <Image
                    src={company.logo || "https://via.placeholder.com/40"}
                    alt={`${company.name} Logo`}
                    roundedCircle
                    width={40}
                    height={40}
                  />
                </td>
                <td>{company.name}</td>
                <td>{company.createdAt.split("T")[0]}</td>
                <td>
                  <button
                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Companiestable;
