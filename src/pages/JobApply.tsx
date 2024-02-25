import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DocumentData } from "firebase/firestore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { getJobPositionData } from "../utils/jobsUtils";

function JobApply() {
  const [jobId, setJobId] = useState();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="bg-laburo-gray">
      <Navbar />
      <div style={{ padding: "10px 0px 0px 10px" }}>
        {/* link back to job des prior */}
        <Link to={`/job-des/?id=${jobId}`} className="link-style">
          <ArrowBackIcon />
        </Link>
      </div>
      <div className="job-des-content ">
        <div className="w100">
          <div className="search-pill">
            <input
              type="text"
              className="search-pill-input"
              placeholder="Posición "
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="search-pill">
            <input
              type="text"
              className="search-pill-input"
              placeholder="Name "
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="search-pill">
            <input
              type="text"
              className="search-pill-input"
              placeholder="Descrip "
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>

        {/*  */}
      </div>

      <div className="w100 flx-center flx mb-50">
        <Link to={`job-apply/?id=${jobId}`} className="link-style">
          <div className="aplicar-btn"> Aplicar </div>
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default JobApply;
