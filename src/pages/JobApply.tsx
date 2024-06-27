import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useSearchParams } from "react-router-dom";
import { getJobById } from "../utils/jobsUtils";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import axios from "axios";
import RichTextEditor from "../components/RichTextEditor";

import LoadingWidget from "../components/widgets/LoadingWidget";
import ResumeUploader from "../components/resume/ResumeUploader";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { JobInt } from "../typescript/interfaces/JobInterface";

function JobApply() {
  const storage = getStorage();
  const [jobId, setJobId] = useState("");
  const [jobName, setJobName] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [searchParams] = useSearchParams();
  const [formAlert, setformAlert] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currJob, setCurrJob] = useState<JobInt>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState<File>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (resume && name && number && email) {
      setformAlert(false);
      setLoading(true);

      let url = ""; // Default to empty string if no file is uploaded

      if (resume instanceof File) {
        // Proceed with the file upload
        const storageRef = ref(
          storage,
          `/files/${new Date().getTime()}__${jobId}_${name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, resume);

        try {
          await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const percent =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadStatus(percent);
                console.log(percent + "% done");
              },
              (err) => reject(err),
              () => resolve(uploadTask.snapshot.ref)
            );
          });

          url = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Download URL:", url);
        } catch (err) {
          console.error("Upload or URL retrieval failed:", err);
          alert("Upload failed: " + err);
          setLoading(false);
          return; // Stop further execution on error
        }
      }

      // Prepare data to send, regardless of whether a file was uploaded
      const apiData = {
        to: currJob?.recieveEmail,
        subject: "Aplicación para la posición de " + jobName,
        html: description,
        company: currJob?.company,
        name,
        number,
        email,
        date: new Date(),
        description,
        jobName: jobName,
        resume,
        resumeUrl: url,
        jobId: jobId,
      };

      const apiUrl = "https://sendmessage-gi2cautoja-uc.a.run.app";

      try {
        const response = await axios.post(apiUrl, apiData);
        console.log(response.data);
        navigate("/thank-you");
      } catch (error) {
        console.error("Failed to send application: ", error);
        alert("Error: No se pudo enviar la aplicación: " + error);
      } finally {
        setLoading(false);
      }
    } else {
      setformAlert(true);
      window.scrollTo(0, 0);
      setLoading(false);
    }
  };
  const showEmptyFields = () => {
    let names = ["CV", "Nombre", "Email", "Teléfono"];
    let form = [resume, name, number, email];
    return form.map((val, index) => {
      if (!val) {
        return <div key={index}>{names[index]}</div>;
      }
      return null;
    });
  };

  const handleInvalidEmail = (e: React.FormEvent<HTMLInputElement>) => {
    // Set a custom message in Spanish
    // e.currentTarget.setCustomValidity(
    //   "Por favor introduce una dirección de correo válida."
    // );
  };
  // disable button until the data is populated
  useEffect(() => {
    // const name = searchParams.get("name");
    const fetchJobData = async () => {
      // get the job data from aprams
      const id = searchParams.get("id");
      if (id) {
        // const jobData = await getJobPositionData(id);
        // setJobId(id);
        // setCurrJob(jobData);
        const jobData = await getJobById(id);
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
                to={`/jobs`}
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
              <ResumeUploader setResume={setResume} status={uploadStatus} />

              <div className="w100 mt-25">
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
                  editorName="Información Adicional (Opcional)"
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
