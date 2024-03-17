import React, { useEffect, useState } from "react";
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
import LaunchIcon from "@mui/icons-material/Launch";
function Landing() {
  const [scrollPastNav, setNavColor] = useState(false);
  const changeNav = () => {
    if (window.scrollY > 300) {
      setNavColor(true);
    }
    if (window.scrollY <= 300) {
      setNavColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);

    return () => window.removeEventListener("scroll", changeNav);
  }, []);

  return (
    <div>
      {/* add prop to change nav background and pass set */}
      <Navbar scrollPast={scrollPastNav} />
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
          <div className="hero img-round ">
            <div className="black-cover"></div>
            <div className="hero-content-main hero-text-1">
              ¡Tu proximo <span className="laburo-green">trabajo</span> te
              espera!
            </div>
            <div className="hero-content ">
              <Link
                to="/jobs"
                style={{ textDecoration: "none", color: "black" }}
              >
                <SearchJobsButton />
              </Link>
            </div>
          </div>

          {/*  */}
          <div style={{ position: "relative" }}>
            <div className="dr-content-container">
              <div className="dr-content-limit">
                <div className="dr-content-txt">
                  <div className="dr-content-element">
                    <div className="title-txt-size">
                      {" "}
                      Hecho para todos <br />
                    </div>
                    <div className="main-txt-size">
                      {" "}
                      En Laburo, creemos que todos merecen encontrar el trabajo
                      perfecto. Desde aquellos que están buscando su primer
                      trabajo hasta los que están listos para nuevos desafíos.
                    </div>
                  </div>
                  <div className="dr-content-element">
                    <div className="title-txt-size">En donde sea</div>
                    <div className="main-txt-size">
                      {" "}
                      Con nuestra plataforma puedes explorar miles de vacantes a
                      nivel global. Tenemos posiciones para lo que sea que estes
                      buscando.
                    </div>
                  </div>
                </div>

                <FeatureSquares />
              </div>
            </div>

            <div className="dr-black-cover"></div>
            <div
              className="image-container "
              style={{
                backgroundImage: `url(${WomanLabPicture})`,
                zIndex: "-2",
              }}
            ></div>
          </div>

          {/*  */}

          <div className="landing-text-container flx-col mt-50">
            <div className="landing-text-body flx-col ">
              <span className="title-txt-size mt-50 mb-25">
                Toma el control de tu futuro.
              </span>
              <span className="main-txt-size mb-50">
                Con nuestra plataforma puedes explorar miles de vacantes.
                Tenemos posiciones para lo que sea que estes buscando :
              </span>
            </div>
            {/* 4 squares */}

            <FeatureSquares />
          </div>
          {/* image 2 */}
          <div style={{ position: "relative", marginTop: "130px" }}>
            <div
              className="image-container"
              style={{ backgroundImage: `url(${ManDrillingpPicture})` }}
            >
              {" "}
              <div className="black-cover-secondary"></div>
            </div>
            <div className="landing-text-container">
              <div
                className="landing-text-body flx-col mb-50"
                style={{ position: "absolute", top: "50px", color: "white" }}
              >
                <span className="title-txt-size mb-25">
                  Encuentra tu siguiente aventura
                </span>
                <span className="main-txt-size">
                  Cada dia añadimos nuevas{" "}
                  <span className="laburo-green">posiciones</span> a nuestra
                  plataforma. Trabajamos duro para brindarte una excelente
                  experiencia de busqueda.
                </span>

                <div className="flx-center flx ">
                  <div className="mt-25 ">
                    <Link
                      to={"/jobs"}
                      className="link-style laburo-green  main-txt-size flx flx-center "
                    >
                      {"¡Buscar Ahora! "}{" "}
                      <LaunchIcon style={{ marginLeft: "5px" }} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
      <Footer type={1} />
    </div>
  );
}

export default Landing;
