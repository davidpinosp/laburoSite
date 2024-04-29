import React from "react";
import "../assets/styles/footer.css";
import { Link } from "react-router-dom";

interface FooterProps {
  type: number;
}

function Footer({ type }: FooterProps) {
  return (
    <div
      className="footer-container "
      style={{
        color: `${type === 1 ? "white" : "black"}`,
        backgroundColor: `${type === 1 ? "#000000cc" : "white"}`,
      }}
    >
      {type === 1 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="flx flx-col w100 flx-center"
            style={{ padding: "0px 15px" }}
          >
            <div className="footer-sub-container">
              <div className="hire-text">
                <div
                  className="flx flx-col"
                  style={{
                    alignItems: "baseline",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <div className="txt-s5 mb-25 txt-pos w100">
                    Listo Para Contratar ?
                  </div>
                  <div className="txt-s4 txt-pos" style={{ width: "100%" }}>
                    Usa nuestra plataforma para llegar a miles de aplicantes y
                    asegurarte de conseguir el mejor talento.
                  </div>
                </div>

                <div className="footer-button">
                  <Link
                    to="/post-job"
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    className="button-hover"
                  >
                    <div className="post-job-btn2 ">Publica un trabajo</div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="footer-line-break"> </div>

            <div className="flx w100 space-even mt-25 mb-50">
              <Link to={"/about-us"}>nosotros </Link>
              <Link to={"/contact-us"}>contacto </Link>
              <Link to={"/privacy"}>privacidad </Link>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "5px",
          }}
        ></div>
      )}
      <div style={{ paddingTop: "10px" }}>
        <div style={{ fontSize: "12px", marginBottom: "15px" }}>
          <div
            className="flx flx-center"
            style={{ fontSize: "14px", alignItems: "baseline" }}
          >
            <div> Hecho con </div>{" "}
            <div style={{ fontSize: "12px", margin: "0px 3px" }}> ❤️ </div>
            <div>en </div>
            <div
              className="flx "
              style={{
                fontSize: "14px",
                margin: "0px 3px",
              }}
            >
              Ecuador
            </div>
          </div>
          Humm Labs. Reservados todos los Derechos 2024
        </div>
      </div>
    </div>
  );
}

export default Footer;
