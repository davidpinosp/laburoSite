import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useSearchParams } from "react-router-dom";
import { getJobPositionData } from "../utils/jobsUtils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RichTextEditor from "../components/RichTextEditor";
import { DocumentData } from "firebase/firestore";
function JobApply() {
  const [jobId, setJobId] = useState("");
  const [jobName, setJobName] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [searchParams] = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currJob, setCurrJob] = useState<DocumentData>();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = {
      name,
      number,
      email,
      date: new Date(),
      description,
      jobId,
    };
    // hide the from email
    const apiData = {
      to: process.env.REACT_APP_TO_EMAIL,
      subject: "Aplicación para la posición de " + jobName,
      html: description,
      name,
      number,
      email,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      description,
      jobName: jobName,
    };

    const apiUrl: string = "";

    axios
      .post(apiUrl, apiData)
      .then((response) => {
        console.log(response.data);
        // (await setJobData(data)) === true
        if (true) {
          // turn off loading
          navigate("/thank-you");
        } else {
          alert("Unable to add");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // set loading
  };
  // disable button until the data is populated
  useEffect(() => {
    // const name = searchParams.get("name");
    const fetchJobData = async () => {
      // get the job data from aprams
      const id = searchParams.get("id");
      if (id) {
        const jobData = await getJobPositionData(id);
        setJobId(id);
        setCurrJob(jobData);
      }
    };
    const name = searchParams.get("name");
    if (name) {
      setJobName(name);
    }
    fetchJobData();
  }, [searchParams]);
  return (
    <div className="bg-laburo-gray flx-col ">
      <Navbar scrollPast={true} />

      <div style={{ padding: "10px 0px 0px 10px" }}>
        {/* link back to job des prior */}
        <Link to={`/job-des/?id=${jobId}`} className="link-style">
          <ArrowBackIcon />
        </Link>
      </div>

      <div
        className="flx-col  w100"
        style={{ minHeight: "100vh", alignItems: "center" }}
      >
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
            {/* <div style={{ marginBottom: "10px" }}>Descripción</div> */}
            {/* <div className=" job-des-input"> */}
            <RichTextEditor
              editorName="Descripción"
              setHTMLValue={setDescription}
            />
            {/* <textarea
                className="job-des-input-pill"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setDescription(e.target.value);
                }}
              /> */}
            {/* </div> */}
          </div>
        </div>

        <div className="w100 flx-center flx mb-50 mt-25 ">
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
