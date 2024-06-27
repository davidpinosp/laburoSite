import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/styles/footerfiles.css";
function AboutUs() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar scrollPast={true} />
      <div className="skip-navbar-margin w100 flx flx-col flx-center mt-25 ff-container">
        <div
          className="flx-col  w100"
          style={{
            minHeight: "100vh",
            alignItems: "center",
            maxWidth: "800px",
          }}
        >
          <div className="w100 ff-title">Misión y Vision</div>

          <div className="section-spacing" style={{ marginBottom: "0px" }}>
            Humm Labs es un idea lab creado con el propósito de fortalecer el
            ecosistema tecnológico de América Latina. Nuestro objetivo principal
            es impulsar la región mediante la creación de empleo y la
            exportación de servicios tecnológicos a nivel global. Nos esforzamos
            por ser líderes en innovación, contribuyendo de manera significativa
            al progreso tecnológico y económico de América Latina.
          </div>
        </div>
      </div>
      <Footer type={2} />
    </div>
  );
}

export default AboutUs;
