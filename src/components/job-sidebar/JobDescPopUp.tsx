import React, { useEffect, useState } from "react";
import { JobInt } from "../../typescript/interfaces/JobInterface";
import "../../assets/styles/job-sidebar.css";
import JobPost from "../JobPost";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import InfoFlag from "../job-card/InfoFlag";
import BoltIcon from "@mui/icons-material/Bolt";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";

interface JobDesdPopupProps {
  selectedJob: JobInt;
  setPopOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function JobDescPopUp({ selectedJob, setPopOpen }: JobDesdPopupProps) {
  const navigate = useNavigate();

  const handleApply = (
    id: string,
    title: string,
    recieveViaEmail: boolean,
    recieveEmail: string
  ) => {
    if (recieveViaEmail) {
      //  send to apply
      window.open(
        `/job-des/job-apply/?id=${id}&name=${title}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      // redirect
      window.open(recieveEmail, "_blank", "noopener,noreferrer");
    }
  };
  useEffect(() => {
    // Add the class to disable scroll when the component mounts

    if (window.innerWidth < 750) {
      document.body.classList.add("body-no-scroll");

      // Cleanup function to remove the class when the component unmounts
    } else {
      setPopOpen(false);
    }
    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, []);

  return (
    <div className="jsb-popup-container">
      <div className="jsb-popup-window">
        <div className={`w100 job-sidebar-content `} style={{ height: "100%" }}>
          <div className="js-content-top" style={{ gap: "10px" }}>
            <div className="flx">
              <div
                onClick={() => {
                  setPopOpen(false);
                }}
                className="flx jsb-back-button"
                style={{ alignItems: "center" }}
              >
                <ArrowBackIcon /> Regresar
              </div>
            </div>

            <div style={{ fontSize: "23px" }}>{selectedJob?.title}</div>
            <div style={{ fontSize: "19px" }}>{selectedJob?.company}</div>
            <div style={{ fontSize: "17px", color: "rgba(0,0,0,0.5)" }}>
              {selectedJob?.location.city && selectedJob?.location.country
                ? selectedJob?.location.city +
                  ", " +
                  selectedJob?.location.country
                : "Remoto"}
            </div>
            {/* logic to take user to apply or  */}

            <button className="apply-btn-sidebar">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "18px",
                }}
                onClick={() => {
                  if (selectedJob?._id) {
                    handleApply(
                      selectedJob?._id,
                      selectedJob?.title,
                      selectedJob?.recieveViaEmail,
                      selectedJob?.recieveEmail
                    );
                  }
                }}
              >
                {selectedJob?.recieveViaEmail ? (
                  <React.Fragment>
                    Aplicar
                    <BoltIcon style={{ fontSize: "20px", marginLeft: "5px" }} />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    Aplicar
                    <OpenInNewIcon
                      style={{ fontSize: "18px", marginLeft: "10px" }}
                    />
                  </React.Fragment>
                )}
              </div>
            </button>
          </div>
          {/* ----------- */}
          <div className="js-content-btm">
            {selectedJob?.recieveViaEmail && (
              <div className="js-content-btm-sub">
                <div style={{ fontSize: "20px" }}>Detalles</div>

                <div className="flag-container">
                  {/* {checkTimeDif() < 10 && <InfoFlag name={"Nuevo"} />} */}
                  {!selectedJob?.inPerson && <InfoFlag name={"Remoto"} />}
                  {!selectedJob?.fullTime && (
                    <InfoFlag name={"Medio Tiempo "} />
                  )}
                </div>

                <div className="sidebar-divider"></div>
              </div>
            )}

            <div className="js-content-btm-desc">
              <div style={{ fontSize: "20px" }}>
                {selectedJob?.recieveViaEmail
                  ? "Descripción"
                  : "Serás redirigido a la página especificada por la empresa"}
              </div>

              {selectedJob?.description && (
                <div
                  dangerouslySetInnerHTML={{ __html: selectedJob?.description }}
                  className="sidebar-content-description "
                  style={{ maxHeight: "none" }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDescPopUp;
