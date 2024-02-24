import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TuneIcon from "@mui/icons-material/Tune";
import PersonOutline from "@mui/icons-material/PersonOutline";
import "../assets/styles/jobdes.css";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { getJobPositionData } from "../utils/jobsUtils";
function JobDescription() {
  // get data from params for id
  const [currJob, setCurrJob] = useState<DocumentData>();
  const [queryParameters] = useSearchParams();

  useEffect(() => {
    const fetchJobData = async () => {
      // get the job data from aprams
      const jobData = await getJobPositionData("65AiGCSqRTCQ65ddWzJX");
      setCurrJob(jobData);
    };
    fetchJobData();
  }, []);

  return (
    <div className="job-des-bg">
      <Navbar />
      <div className="job-des-content">
        <div>
          <Link to={"/jobs"} className="link-style">
            regresar
          </Link>
        </div>
        {/*  go back  */}

        {/* info */}
        <div className="mt-25">
          {/* <div className="flx ">
            <div className="job-des-img">
              <PersonOutline style={{ fontSize: "35px" }} />
            </div>
            <div style={{ marginLeft: "100px" }}>1k-2k</div>
          </div> */}

          <div className="txt-s5">{currJob ? currJob.data.title : "Pos"}</div>
          <div className="txt-s4">
            {currJob ? currJob.data.company : "Compania"}
          </div>
          <div className="txt-s3">
            {currJob
              ? currJob.data.location.city + "," + currJob.data.location.country
              : "Pos"}
          </div>
          <div className="txt-s3">
            {currJob ? currJob.data.description : "Descripcion"}
          </div>
        </div>

        {/* next button */}
      </div>

      <div className="w100 flx-center flx mb-50">
        <div className="aplicar-btn"> Aplicar </div>
      </div>

      <Footer />
    </div>
  );
}

export default JobDescription;
