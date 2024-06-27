import React from "react";
import { ApplicantInt } from "../../typescript/interfaces/AppInterface";
import "../../assets/styles/dashboard/applicants.css";
import EmailIcon from "@mui/icons-material/Email";

import PDFViewer from "../PDFViewer";
import { Phone } from "@mui/icons-material";
interface ApplicantSideInfoProps {
  selected: ApplicantInt;
}

function ApplicantSideInfo(props: ApplicantSideInfoProps) {
  return (
    <div className="applicant-info-container">
      <div className="applicant-info-box">
        <div className="txt-s6">{props.selected.name}</div>
        <div className="flx flx-col" style={{ gap: "5px" }}>
          <div className="txt-s4" style={{ color: "rgba(0,0,0,0.6" }}>
            Contacto
          </div>
          <div
            className="txt-s4 flx "
            style={{ alignItems: "center", gap: "10px" }}
          >
            <EmailIcon style={{ fontSize: "18px" }} /> {props.selected.email}
          </div>
          <div
            className="txt-s4 flx "
            style={{ alignItems: "center", gap: "10px" }}
          >
            <Phone style={{ fontSize: "18px" }} /> {props.selected.number}
          </div>
        </div>
        <div className="flx flx-col" style={{ gap: "5px" }}>
          <div className="txt-s4" style={{ color: "rgba(0,0,0,0.6" }}>
            Información Adicional
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: props.selected.description }}
            className="validate-job-text ql-editor txt-s4"
            style={{
              height: "100%",
              minHeight: "0px",
              paddingLeft: "0px",
              paddingTop: "0px",
            }}
          ></div>
        </div>
        <div className="txt-s4" style={{ color: "rgba(0,0,0,0.6" }}>
          Hoja de Vida / CV
        </div>
        <PDFViewer path={props.selected.resumeUrl} name={props.selected.name} />
      </div>
    </div>
  );
}

export default ApplicantSideInfo;
