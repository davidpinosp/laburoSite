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
          <div className="w100 ff-title">Vision</div>
          <div className="section-spacing">
            En Laburo, nuestra visión es diseñar y construir productos para
            todos. Estamos comprometidos con hacer que los beneficios de la
            tecnología sean accesibles a toda la comunidad. Nuestro enfoque está
            en democratizar la tecnología para garantizar que cada persona pueda
            disfrutar de sus ventajas, independientemente de su ubicación o
            contexto.
          </div>
          <div className="w100 ff-title">Misión </div>

          <div className="section-spacing" style={{ marginBottom: "0px" }}>
            Como empresa matriz, Humm Labs se dedica a desarrollar el ecosistema
            tecnológico de América Latina. Nuestro objetivo principal es
            potenciar la región a través de la creación de empleo y la
            exportación de servicios tecnológicos a nivel global. Nos esforzamos
            por ser líderes en la innovación, contribuyendo significativamente
            al progreso tecnológico y economico de América Latina.
          </div>
        </div>
      </div>
      <Footer type={2} />
    </div>
  );
}

export default AboutUs;
