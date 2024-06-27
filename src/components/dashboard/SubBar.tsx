import React, { useEffect, useState } from "react";
import "../../assets/styles/dashboard/subbar.css";
interface SubBarProps {
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}

function SubBar(props: SubBarProps) {
  const [currVal, setCurrVal] = useState(() => {
    return localStorage.getItem("currentPage") || "vacantes";
  });
  const handleClick = (value: string) => {
    props.setSelectedPage(value);
    setCurrVal(value);
  };

  useEffect(() => {
    // Store the current page number in localStorage
    localStorage.setItem("currentPage", currVal);
    console.log(currVal);
  }, [currVal]);

  return (
    <div className="subbar-container">
      <div className="subbar-box">
        <button
          disabled={props.loading}
          className={`subbar-btn${
            currVal === "vacantes" ? " subbar-btn-selected" : ""
          }`}
          onClick={() => {
            handleClick("vacantes");
          }}
        >
          Vacantes
        </button>
        <button
          disabled={props.loading}
          className={`subbar-btn${
            currVal === "aplicantes" ? " subbar-btn-selected" : ""
          }`}
          onClick={() => {
            handleClick("aplicantes");
          }}
        >
          Aplicantes
        </button>
      </div>
    </div>
  );
}

export default SubBar;
