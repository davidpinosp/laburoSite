import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingWidget from "../components/widgets/LoadingWidget";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formAlert, setFormAlert] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      setFormAlert(true);
      window.scrollTo(0, 0);
    } else {
      setLoading(true);
      console.log("Submit form data:", formData);

      // Here you would normally handle the form submission, such as sending an email or saving the data
      const apiUrl: string =
        "https://us-central1-hrbot-e8686.cloudfunctions.net/customerSupport";

      axios
        .post(apiUrl, formData)
        .then((response) => {
          console.log(response.data);
          navigate("/message-sent");
          setLoading(false);
        })
        .catch((error) => {
          alert("No pudimos enviar tu mensaje. Por favor intentalo de nuevo");
          console.log(error);
          setLoading(false);
        });
      setFormAlert(false);
    }
  };

  const handleInvalidEmail = (e: any) => {
    // e.currentTarget.setCustomValidity(
    //   "Por favor introduce una dirección de correo válida."
    // );
  };

  return (
    <div className="w100 flx flx-col flx-center skip-navbar-margin">
      <Navbar scrollPast={true} />
      <div style={{ width: "100%", maxWidth: "800px" }}>
        {formAlert && (
          <div className="w100 mb-25">
            <Alert severity="error" style={{ borderRadius: "10px" }}>
              Por favor completa todos los campos antes de enviar.
            </Alert>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="w100 postjob-gray-container">
            <div className="postjob-container-title">Contáctanos </div>
            <div className="w100">
              <div style={{ marginBottom: "10px", fontSize: "18px" }}>
                Nombre
              </div>
              <div className="search-pill">
                <input
                  type="text"
                  className="search-pill-input"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="w100">
              <div style={{ marginBottom: "10px", fontSize: "18px" }}>
                Email
              </div>
              <div className="search-pill">
                <input
                  type="email"
                  className="search-pill-input"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onInvalid={handleInvalidEmail}
                  onInput={(e) => e.currentTarget.setCustomValidity("")}
                />
              </div>
            </div>

            <div className="w100">
              <div style={{ marginBottom: "10px", fontSize: "18px" }}>
                Asunto
              </div>
              <div className="search-pill">
                <input
                  type="text"
                  className="search-pill-input"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="w100">
              <div style={{ marginBottom: "10px", fontSize: "18px" }}>
                Mensaje
              </div>
              <div
                className="search-pill"
                style={{ width: "100%", height: "300px" }}
              >
                <textarea
                  className="search-pill-input"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    height: "300px",
                    padding: "10px 5px",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flx flx-col flx-center mt-25 w100">
            <LoadingWidget loading={loading} />
            <button type="submit" className="postjob-createjob-button mt-25">
              Enviar
            </button>
          </div>
        </form>
      </div>
      <Footer type={2} />
    </div>
  );
}

export default ContactForm;
