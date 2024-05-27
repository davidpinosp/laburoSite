import React, { useEffect, useState } from "react";
import { JobInt } from "../../typescript/interfaces/JobInterface";
import "../../assets/styles/job-sidebar.css";
import JobPost from "../JobPost";
import InfoFlag from "../job-card/InfoFlag";
import BoltIcon from "@mui/icons-material/Bolt";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import JobDescPopUp from "./JobDescPopUp";

interface JobSideDescProps {
  jobs: JobInt[];
}

function JobSideDesc(props: JobSideDescProps) {
  const [selectedJob, setSelectedJob] = useState<JobInt>();
  const [highlightJob, setHighlightJob] = useState("");
  const [PopupOpen, setPopupOpen] = useState(true);
  const [isPinned, setIsPinned] = useState(true);
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
    const handleScroll = () => {
      // You can adjust this threshold value based on your requirement
      if (window.scrollY > 200) {
        setIsPinned(true);
      } else {
        setIsPinned(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // set selected and highlighted job to first
    let firstjob = props.jobs[0];
    if (firstjob._id && window.innerWidth > 750) {
      setSelectedJob(firstjob);
      setHighlightJob(firstjob._id);
    }
  }, [props.jobs]);

  return (
    <div className="job-sidebar w100">
      <div
        style={{
          // maxWidth: "450px",

          width: "85%",
          // height: "80vh",
          // overflow: "auto",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
        className="jsb-spacing"
      >
        {props.jobs?.map((job, index) => (
          <div
            key={index}
            onClick={() => {
              if (job._id) {
                setHighlightJob(job._id);

                setPopupOpen(true);
              }
            }}
          >
            <JobPost
              currJob={job as JobInt}
              setSelectedJob={setSelectedJob}
              selected={highlightJob === job._id}
            />
          </div>
        ))}
      </div>
      {/* hide when screen size is less than 700 */}

      <div
        className={`w100  job-sidebar-content hide-for-phone ${
          isPinned ? "pinned" : ""
        }`}
      >
        <div className="js-content-top">
          <div style={{ fontSize: "25px" }}>{selectedJob?.title}</div>
          <div style={{ fontSize: "20px" }}>{selectedJob?.company}</div>
          <div style={{ fontSize: "18px", color: "rgba(0,0,0,0.5)" }}>
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
                {!selectedJob?.fullTime && <InfoFlag name={"Medio Tiempo "} />}
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
      <div className="mobile-only">
        {PopupOpen && selectedJob && (
          <JobDescPopUp selectedJob={selectedJob} setPopOpen={setPopupOpen} />
        )}
      </div>
    </div>
  );
}

export default JobSideDesc;
