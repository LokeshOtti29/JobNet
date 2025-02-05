import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "1lakh to 5lakh", "15lakh to 40lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    console.log(selectedValue);
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-100 bg-white p-3 rounded">
      <h1 className="font-weight-bold h5">Filter Jobs</h1>
      <hr className="mt-3" />
      <div className="form-check">
        {fitlerData.map((data, index) => (
          <div key={index}>
            <h2 className="font-weight-bold h6">{data.fitlerType}</h2>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={idx} className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id={itemId}
                    name={data.fitlerType}
                    value={item}
                    checked={selectedValue === item}
                    onChange={() => changeHandler(item)}
                  />
                  <label className="form-check-label" htmlFor={itemId}>
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;
