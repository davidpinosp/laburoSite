import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, redirect, useSearchParams } from "react-router-dom";
import { setJobData } from "../utils/jobsUtils";
import { useNavigate } from "react-router-dom";

function JobApply() {
  const [jobId, setJobId] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = {
      number,
      email,
      date: new Date(),
      description,
      jobId,
    };
    // set loading
    if ((await setJobData(data)) === true) {
      // turn off loading
      navigate("/thank-you");
    } else {
      alert("Unable to add");
    }

    // send data to firebase
    // redirect to thank you page
  };

  useEffect(() => {
    const id = searchParams.get("id");

    if (id) {
      setJobId(id);
    }
  }, [searchParams]);
  return (
    <div className="bg-laburo-gray">
      <Navbar />

      <div style={{ padding: "10px 0px 0px 10px" }}>
        {/* link back to job des prior */}
        <Link to={`/job-des/?id=${jobId}`} className="link-style">
          <ArrowBackIcon />
        </Link>
      </div>

      <div className="flx-col flx-center w100">
        <div className="job-des-content-apply  ">
          <div className="w100">
            <div style={{ marginBottom: "10px" }}> Nombre</div>

            <div className="search-pill">
              <input
                type="text"
                className="search-pill-input "
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="w100">
            <div style={{ marginBottom: "10px" }}> Email</div>

            <div className="search-pill">
              <input
                type="text"
                className="search-pill-input "
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="w100">
            <div style={{ marginBottom: "10px" }}> Telefono</div>

            <div className="search-pill">
              <input
                type="text"
                className="search-pill-input "
                value={number}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNumber(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="w100">
            <div style={{ marginBottom: "10px" }}>Descripción</div>
            <div className=" job-des-input">
              <textarea
                className="job-des-input-pill"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="w100 flx-center flx mb-50">
          <div className="aplicar-btn" onClick={handleSubmit}>
            {" "}
            Enviar{" "}
          </div>
        </div>
      </div>

      <Footer type={2} />
    </div>
  );
}

export default JobApply;
