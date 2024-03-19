import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/landing.css";
import "../assets/styles/global.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeatureSquares from "../components/FeatureSquares";
import SearchJobsButton from "../components/SearchJobsButton";
import ManDrillingpPicture from "../assets/images/man-drillling.jpg";
import WomanLabPicture from "../assets/images/woman-lab.jpg";
import waIcon from "../assets/images/icons/whatsapp.svg";
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
                  <div className="dr-content-element mb-25">
                    <div className="title-txt-size">
                      {" "}
                      Hecho para todos <br />
                    </div>
                    <div className="main-txt-size">
                      {" "}
                      En Laburo, creemos que todos merecen encontrar el trabajo
                      perfecto.
                    </div>
                  </div>
                  <div className="dr-content-element mb-25">
                    <div className="title-txt-size">Tu siguiente aventura</div>
                    <div className="main-txt-size">
                      {" "}
                      Cada dia añadimos nuevas{" "}
                      <span className="laburo-green">posiciones</span> a nuestra
                      plataforma.
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

          {/* image 2 */}
          <div style={{ position: "relative", width: "100vw" }}>
            <div
              className="image-container"
              style={{ backgroundImage: `url(${ManDrillingpPicture})` }}
            >
              {" "}
              <div className="black-cover-secondary"></div>
            </div>
            <div className="landing-text-container">
              <div
                className="landing-text-body drilling-content-container mb-50"
                style={{ position: "absolute", top: "50px", color: "white" }}
              >
                <div className="title-txt-size mb-25 drilling-content-title">
                  En donde sea
                </div>
                <div className="main-txt-size drilling-content-text">
                  Con nuestra plataforma puedes explorar miles de vacantes a
                  nivel global. Tenemos posiciones para lo que sea que estes
                  buscando. Usa nuestros servicios a través de nuestra pagina
                  web o contactanos por WhatsApp.
                  <div className="flx flx-center mt-25">
                    <Link to={"/coming-soon"}>
                      <div className="whatsapp-button-container">
                        <img
                          src={waIcon}
                          style={{ height: "100%" }}
                          alt="WhatsApp Icon"
                        />
                      </div>
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
