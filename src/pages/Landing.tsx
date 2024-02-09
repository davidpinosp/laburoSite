import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/landing.css";
import "../assets/styles/global.css";
import Navbar from "../components/Navbar";

import FeatureSquares from "../components/FeatureSquares";
import SearchJobsButton from "../components/SearchJobsButton";
import WomanWritingPicture from "../assets/images/woman-writing.jpg";
import ManDrillingpPicture from "../assets/images/man-drillling.jpg";
import WomanLabPicture from "../assets/images/woman-lab.jpg";
import PublicarTrabajo from "./PostJob";
function Landing() {
  return (
    <div className="landing-container">
      {/*  navbar */}
      <Navbar />
      {/* image */}
      <div className="hero">
        <div className="hero-content hero-text-1">
          Tu proximo <span className="laburo-green">trabajo</span> te espera!
        </div>
        <div className="hero-content">
          <Link to="/jobs" style={{ textDecoration: "none", color: "black" }}>
            <SearchJobsButton />
          </Link>
        </div>
      </div>
      <div className="landing-text-body txt-s6">
        Laburo es la nueva manera de encontrar tu siguiente trabajo y tomar el
        control de tu futuro.
      </div>
      {/* 4 squares */}
      <FeatureSquares />
      <div className="landing-text-body flx-col mb-50">
        <span className="txt-s6">Hecho para todos </span>
        <span className="txt-s4">
          puedes acceder a nuestros servicios a traves de nuestra pagina web o
          por <span className="laburo-green">whatsapp</span>
        </span>
      </div>
      {/* image 2 */}
      <img src={WomanWritingPicture} alt=" Woman Writing" />
      <div className="landing-text-body flx-col mb-50">
        <span className="txt-s6">
          Encuentra tu siguiente aventura con nosotros
        </span>
        <span className="txt-s4">
          Cada dia añadimos nuevas posiciones son a nuestra plataforma.
        </span>
      </div>
      {/* images 3/4 */}
      <img src={ManDrillingpPicture} alt="" />
      <img src={WomanLabPicture} alt="" />
      {/*  */}
      <div className="landing-text-body flx-col">
        <span className="txt-s6"> Listo Para Contratar ? </span>
        <span className="txt-s4">
          Usa nuestra plataforma para llegar a miles de aplicantes y asi poder
          obtener el mejor talento para tu empresa.
        </span>
      </div>
      {/*  */}

      <div className="post-job-btn2-container mt-50 mb-50">
        <div className="post-job-btn2">
          <Link
            to="/post-job"
            style={{ textDecoration: "none", color: "black" }}
          >
            Publicar un trabajo
          </Link>
        </div>
      </div>

      {/* footer */}
    </div>
  );
}

export default Landing;
