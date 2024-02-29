import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/landing.css";
import "../assets/styles/global.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeatureSquares from "../components/FeatureSquares";
import SearchJobsButton from "../components/SearchJobsButton";
import WomanWritingPicture from "../assets/images/woman-writing.jpg";
import ManDrillingpPicture from "../assets/images/man-drillling.jpg";
import WomanLabPicture from "../assets/images/woman-lab.jpg";

function Landing() {
  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="landing-container">
          {/*  navbar */}

          {/* image */}
          <div className="hero img-round">
            <div className="hero-content hero-text-1">
              ¡Tu proximo <span className="laburo-green">trabajo</span> te
              espera!
            </div>
            <div className="hero-content">
              <Link
                to="/jobs"
                style={{ textDecoration: "none", color: "black" }}
              >
                <SearchJobsButton />
              </Link>
            </div>
          </div>

          <div className="landing-text-body flx-col ">
            <span className="txt-s5 mb-25">Toma el control de tu futuro.</span>
            <span className="txt-s4">
              {" "}
              Con nuestra plataorma puedes explorar miles de vacantes. Tenemos
              posiciones para lo que sea que estes buscando :
            </span>
          </div>
          {/* 4 squares */}
          <FeatureSquares />
          <div className="landing-text-body flx-col mb-50">
            <span className="txt-s5 mb-25">Hecho para todos </span>
            <span className="txt-s4">
              Aplica comodamente a través de nuestras integraciones multicanal.
              Puedes acceder a todos nuestros servicios a traves de nuestra
              pagina web o por
              <span className="laburo-green"> whatsapp</span>
            </span>
          </div>
          {/* image 2 */}
          <div
            className="image-container img-round-top"
            style={{ backgroundImage: `url(${ManDrillingpPicture})` }}
          ></div>
          <div
            className="image-container img-round-bt"
            style={{ backgroundImage: `url(${WomanLabPicture})` }}
          ></div>

          <div className="landing-text-body flx-col mb-50">
            <span className="txt-s5 mb-25">
              Encuentra tu siguiente aventura
            </span>
            <span className="txt-s4">
              Cada dia añadimos nuevas{" "}
              <span className="laburo-green">posiciones</span> a nuestra
              plataforma. Trbajamos duro para brindarte una excelente
              experiencia de busqueda.
            </span>
          </div>
          {/* images 3/4 */}
          <div
            className="image-container img-round"
            style={{
              backgroundImage: `url(${WomanWritingPicture})`,
            }}
          ></div>

          {/*  */}
        </div>
      </div>
      <Footer type={1} />
    </div>
  );
}

export default Landing;
