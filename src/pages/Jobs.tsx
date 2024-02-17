import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/styles/jobs.css";
import JobPost from "../components/JobPost";
function Jobs() {
  return (
    <div>
      <Navbar />
      <div className="flx-col flx-center job-page-container">
        <div className="search-container">
          <div className="search-pill">
            <input
              type="text"
              className="search-pill-input"
              placeholder="Buscar "
            />
          </div>

          <div className="search-pill">
            <input
              type="text"
              className="search-pill-input"
              placeholder="Ubicacion"
            />
          </div>
          <div className="bg-laburo-green search-btn">Boton Buscar</div>
        </div>
        <div className="flx space-btwn w100">
          <div>results</div>
          <div className="order-dropdown">Ordenar</div>
        </div>
        {/* positions here  */}
        <div className="w100 mb-25">
          <JobPost
            position="Ayudante De Boasdasdaasdasdasdasda"
            company="Pydaco CIa LTDA"
            location="quito"
            salary="1k-2k"
          />
        </div>
        <div className="mb-25"></div>
        <JobPost
          position="Ayudante asdasdasdasdaasdasdasdasdasdasdasdasdasdasasd"
          company="Pydacasdasdasdasdasdasdasdasdasdasdasdo CIa LTDA"
          location="quasdasdasdasdasdasdasdasdasdasdasdasdito"
          salary="1k-2k"
        />
        <div className="mb-25"></div>
      </div>
      <Footer />
    </div>
  );
}

export default Jobs;
