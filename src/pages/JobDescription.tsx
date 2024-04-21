import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useSearchParams } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { getJobPositionData } from "../utils/jobsUtils";

import LoadingWidget from "../components/widgets/LoadingWidget";
// make the inner part of this component a components  , that way I can pass the state to it

function JobDescription() {
  const [currJob, setCurrJob] = useState<DocumentData>();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  // ------

  // hide the from email

  // ------

  useEffect(() => {
    const fetchJobData = async () => {
      // get the job data from aprams

      const id = searchParams.get("id");
      if (id) {
        const jobData = await getJobPositionData(id);
        setCurrJob(jobData);
      }
      setLoading(false);
    };
    fetchJobData();
  }, [searchParams]);

  return (
    <div className=" skip-navbar-margin">
      <Navbar scrollPast={true} />

      {loading ? (
        <div className="mt-50 flx flx-center">
          <LoadingWidget loading={loading} />
        </div>
      ) : (
        <React.Fragment>
          <div className="job-des-content  ">
            {/*  */}
            <div className="mt-25 w100" style={{ maxWidth: "800px" }}>
              <div className="w100 mb-25">
                <Link
                  to={"/jobs"}
                  className="link-style "
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "fit-content",
                  }}
                >
                  <ArrowBackIcon /> Regresar
                </Link>
              </div>
              <div className="txt-s5 ">{currJob ? currJob.data.title : ""}</div>
              <div className="txt-s4 mt-25">
                {currJob ? currJob.data.company : ""}
              </div>
              <div
                className="txt-s3 mt-25"
                style={{ color: "rgba(0,0,0,0.5)" }}
              >
                {currJob
                  ? currJob.data.location.city +
                    "," +
                    currJob.data.location.country
                  : ""}
              </div>
              <div className="txt-s3 mt-25">
                {currJob ? (
                  <div
                    className="job-des-html ql-editor"
                    dangerouslySetInnerHTML={{
                      __html: currJob.data.description,
                    }}
                    style={{ maxHeight: "none" }}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* place job apply here and pass content  */}
          </div>
          <div className="w100 flx flx-center  mb-50">
            <div className="w100 flx flx-center">
              {!currJob?.data.recieveViaEmail ? (
                <a
                  href={`${currJob?.data.recieveEmail}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aplicar-btn"
                >
                  Aplicar
                </a>
              ) : (
                <Link
                  to={`job-apply/?id=${currJob?.id}&name=${currJob?.data.title}`}
                  className="link-style aplicar-btn"
                >
                  Aplicar
                </Link>
              )}
            </div>
          </div>
        </React.Fragment>
      )}

      <Footer type={2} />
    </div>
  );
}

export default JobDescription;
