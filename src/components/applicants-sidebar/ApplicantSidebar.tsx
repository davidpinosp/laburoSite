import React, { useState } from "react";
import { ApplicantInt } from "../../typescript/interfaces/AppInterface";
import "../../assets/styles/dashboard/applicants.css";
import ApplicantPill from "./ApplicantPill";
import ApplicantSideInfo from "./ApplicantSideInfo";
interface ApplicantSidebarProps {
  aplicants: ApplicantInt[];
}
function ApplicantSidebar(props: ApplicantSidebarProps) {
  const [selectedApp, setSelectedApp] = useState(props.aplicants[0]);

  return (
    <div className="applicant-sidebar-container">
      <div className="applicant-sidebar-box ">
        <div className="applicant-sidebar-left-box">
          {props.aplicants.map((aplicant, index) => {
            return (
              <ApplicantPill
                key={index}
                applicant={aplicant}
                setSelectedApp={setSelectedApp}
                selected={aplicant === selectedApp}
              />
            );
          })}
        </div>

        <div className="applicant-sidebar-right-box">
          {selectedApp && <ApplicantSideInfo selected={selectedApp} />}
        </div>
      </div>
    </div>
  );
}

export default ApplicantSidebar;
