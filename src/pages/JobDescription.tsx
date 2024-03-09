import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useSearchParams } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { getJobPositionData } from "../utils/jobsUtils";

function JobDescription() {
  // get data from params for id
  const [currJob, setCurrJob] = useState<DocumentData>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchJobData = async () => {
      // get the job data from aprams
      const id = searchParams.get("id");
      if (id) {
        const jobData = await getJobPositionData(id);
        setCurrJob(jobData);
      }
    };
    fetchJobData();
  }, [searchParams]);

  return (
    <div className="job-des-bg">
      <Navbar />

      <div style={{ padding: "10px 0px 0px 10px" }}>
        <Link to={"/jobs"} className="link-style">
          <ArrowBackIcon />
        </Link>
      </div>
      <div className="job-des-content  ">
        {/*  go back  */}

        {/* info */}
        <div className="mt-25 " style={{ maxWidth: "700px" }}>
          {/* <div className="flx ">
            <div className="job-des-img">
              <PersonOutline style={{ fontSize: "35px" }} />
            </div>
            <div style={{ marginLeft: "100px" }}>1k-2k</div>
          </div> */}

          <div className="txt-s5 ">
            {currJob ? currJob.data.title : "Loading..."}
          </div>
          <div className="txt-s4 mt-25">
            {currJob ? currJob.data.company : "Compania"}
          </div>
          <div className="txt-s3 mt-25" style={{ color: "rgba(0,0,0,0.5)" }}>
            {currJob
              ? currJob.data.location.city + "," + currJob.data.location.country
              : ""}
          </div>
          <div className="txt-s3 mt-25">
            {currJob ? currJob.data.description : ""}
          </div>
        </div>

        {/* next button */}
      </div>

      <div className="w100 flx-center flx mb-50">
        <Link
          to={`job-apply/?id=${currJob?.id}&name=${currJob?.data.title}`}
          className="link-style"
        >
          <div className="aplicar-btn"> Aplicar </div>
        </Link>
      </div>

      <Footer type={2} />
    </div>
  );
}

export default JobDescription;
