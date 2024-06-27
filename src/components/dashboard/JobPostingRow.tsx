import React, { useState } from "react";
import "../../assets/styles/dashboard/positions.css";
import { JobInt } from "../../typescript/interfaces/JobInterface";
import JobEditPopUp from "./JobEditPopUp";
import EditIcon from "@mui/icons-material/Edit";
interface JobPostingRowProps {
  job: JobInt;
  getPositions: () => Promise<void>;
}
function JobPostingRow(props: JobPostingRowProps) {
  // get job description by id and then allow the user to edit status and description
  const [showJobPopUp, setShowJobPopUp] = useState(false);

  const handleClick = () => {
    setShowJobPopUp(true);
  };

  const parseDate = (date: Date): string => {
    const dateObject = new Date(date);
    const today = new Date();

    // Calculate the difference in time
    const timeDifference = today.getTime() - dateObject.getTime();

    // Calculate the difference in days
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    // Format date
    const formattedDate = dateObject.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Return the formatted date and days ago
    return `${formattedDate} (quedan ${45 - daysDifference} días)`;
  };
  return (
    //
    <div className="positions-box-table-row">
      <div className="positions-box-table-cell btc-title">
        {props.job.title}
      </div>
      <div className="positions-box-table-cell">
        {props.job.location.city &&
          props.job.location.country &&
          props.job.location.city + ", " + props.job.location.country}
      </div>
      <div className="positions-box-table-cell">
        {props.job.applicants || 0}
      </div>
      <div className="positions-box-table-cell">
        {parseDate(props.job.datePosted)}
      </div>
      <div
        className="positions-box-table-cell"
        style={{ color: props.job.status ? "var(--laburo-green)" : "gray" }}
      >
        {props.job.status ? "activo" : "pausado"}{" "}
      </div>

      <div
        className="positions-box-table-cell btc-edit flx flx-center"
        style={{ gap: "10px" }}
        onClick={() => {
          handleClick();
        }}
      >
        Editar
        <EditIcon fontSize="inherit" />
      </div>

      {showJobPopUp && (
        <JobEditPopUp
          setJobPopUp={setShowJobPopUp}
          job={props.job}
          getPositions={props.getPositions}
        />
      )}
    </div>
  );
}

export default JobPostingRow;
