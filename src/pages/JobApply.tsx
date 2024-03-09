import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useSearchParams } from "react-router-dom";
import { setJobData } from "../utils/jobsUtils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function JobApply() {
  const [jobId, setJobId] = useState("");
  const [jobName, setJobName] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = {
      name,
      number,
      email,
      date: new Date(),
      description,
      jobId,
    };

    const apiData = {
      to: "davidspinosp@gmail.com",
      from: "nidolivingsolutions@gmail.com",
      subject: "Aplicación para la posición de " + jobName,
      text: "asd",
      html:
        "<!DOCTYPE html> <html lang=`en`> <head> <meta charset=`UTF-8`> <meta http-equiv=`X-UA-Compatible` content=`IE=edge`><meta name=`viewport` content=`width=device-width, initial-scale=1.0`> <title>Recibiste una Aplicación </title> </head><body style=`font-family: 'Arial', sans-serif;`> <h2>Recibiste Una Aplicación</h2><p>Estimado/a,</p><p> Haz recibido una aplicación a través de Laburo. La aplicación es para la posición de " +
        jobName +
        ", publicada " +
        data.date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }) +
        ". <br> Estos son los detalles del aplicante:</p><ul> <li><strong>Nombre:</strong> " +
        data.name +
        "</li><li><strong>Email:</strong> " +
        data.email +
        "</li><li><strong>Numero Celular:</strong> " +
        data.number +
        "</li><li><strong>Descripción:</strong>" +
        data.description +
        "  </li></ul><p>¡Muchas Gracias por confiar en nosotros!</p><p>Suerte en su busqueda,<br>El equipo de Laburo</p></body></html>",
    };

    //  pass job title as param too and send to email

    // axios post request to http://127.0.0.1:5001/hrbot-e8686/us-central1/sendmessage

    const apiUrl: string =
      "https://us-central1-hrbot-e8686.cloudfunctions.net/sendmessage";

    if ((await setJobData(data)) === true) {
      // turn off loading
      navigate("/thank-you");
      axios
        .post(apiUrl, apiData)
        .then(async (response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Unable to add");
    }

    // set loading
  };

  useEffect(() => {
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    // const name = searchParams.get("name");
    if (id) {
      setJobId(id);
    }
    if (name) {
      setJobName(name);
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
