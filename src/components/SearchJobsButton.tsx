import React from "react";
import "../assets/styles/searchjobsbutton.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
function SearchJobsButton() {
  return (
    <div className="search-jobs-btn-container">
      <div style={{ margin: "0 auto" }}>Buscar Trabajos</div>
      <ChevronRightIcon className="search-icon " />
    </div>
  );
}

export default SearchJobsButton;
