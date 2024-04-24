import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useSearchParams } from "react-router-dom";
import { getJobPositionData } from "../utils/jobsUtils";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import axios from "axios";
import RichTextEditor from "../components/RichTextEditor";
import { DocumentData } from "firebase/firestore";
import LoadingWidget from "../components/widgets/LoadingWidget";
function JobApply() {
  const [jobId, setJobId] = useState("");
  const [jobName, setJobName] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [searchParams] = useSearchParams();
  const [formAlert, setformAlert] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currJob, setCurrJob] = useState<DocumentData>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit event" + formAlert);

    if (name && number && email && description) {
      setformAlert(false);
      setLoading(true);
      console.log(loading);
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
        to: currJob?.data.recieveEmail,
        subject: "Aplicación para la posición de " + jobName,
        html: description,
        name,
        number,
        email,
        date: new Date(),
        description,
        jobName: jobName,
      };

      const apiUrl: string =
        "http://127.0.0.1:5001/hrbot-e8686/us-central1/sendmessage";

      axios
        .post(apiUrl, apiData)
        .then((response) => {
          console.log(response.data);

          navigate("/thank-you");
          setLoading(false);
        })
        .catch((error) => {
          alert(error.message);
          console.log(error);
        });
    } else {
      setformAlert(true);
      window.scrollTo(0, 0);
    }
  };
  const showEmptyFields = () => {
    let names = ["Nombre", "Email", "Teléfono", "Descripción"];
    let form = [name, number, email, description];
    return form.map((val, index) => {
      if (!val) {
        return <div key={index}>{names[index]}</div>;
      }
      return null;
    });
  };

  const handleInvalidEmail = (e: React.FormEvent<HTMLInputElement>) => {
    // Set a custom message in Spanish
    e.currentTarget.setCustomValidity(
      "Por favor introduce una dirección de correo válida."
    );
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
    <div className=" flx-col skip-navbar-margin ">
      <Navbar scrollPast={true} />

      <div
        className="flx-col  w100"
        style={{ minHeight: "100vh", alignItems: "center" }}
      >
        <form onSubmit={handleSubmit} className="flx flx-col flx-center">
          <div className=" job-des-content-apply  ">
            <div className="mt-25 w100 mb-25">
              {/* link back to job des prior */}

              <Link
                to={`/job-des/?id=${jobId}`}
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
            {formAlert && (
              <div className="w100 mb-25">
                <Alert severity="error" style={{ borderRadius: "10px" }}>
                  <div className="">
                    Por favor completa estos campos: {showEmptyFields()}
                  </div>
                </Alert>
              </div>
            )}
            <div className="w100 postjob-gray-container">
              <div className="w100">
                <div style={{ marginBottom: "10px", fontSize: "18px" }}>
                  {" "}
                  Nombre
                </div>

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
                <div style={{ marginBottom: "10px", fontSize: "18px" }}>
                  {" "}
                  Email
                </div>

                <div className="search-pill">
                  <input
                    type="email"
                    className="search-pill-input "
                    onInvalid={handleInvalidEmail}
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setEmail(e.target.value);
                      e.target.setCustomValidity("");
                    }}
                  />
                </div>
              </div>
              <div className="w100">
                <div style={{ marginBottom: "10px", fontSize: "18px" }}>
                  {" "}
                  Telefono
                </div>

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
                  htmlValue={description}
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
          </div>

          <div className="w100 flx-center flx-col mb-50 mt-25 ">
            {loading ? (
              <LoadingWidget loading={loading} />
            ) : (
              <button type="submit" className="aplicar-btn" disabled={loading}>
                Enviar
              </button>
            )}
          </div>
        </form>
        <Footer type={2} />
      </div>
    </div>
  );
}

export default JobApply;
