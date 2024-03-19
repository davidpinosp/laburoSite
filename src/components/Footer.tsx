import React from "react";
import "../assets/styles/footer.css";
import { Link } from "react-router-dom";

interface FooterProps {
  type: number;
}

function Footer({ type }: FooterProps) {
  return (
    <div className="footer-container ">
      {type === 1 ? (
        <div className="footer-sub-container">
          <div className="flx-col hire-text">
            <span className="txt-s5 mb-25"> Listo Para Contratar ? </span>
            <span className="txt-s4">
              Usa nuestra plataforma para llegar a miles de aplicantes
            </span>
          </div>
          <div className="post-job-btn2-container mt-25 mb-50">
            <div className="post-job-btn2">
              <Link
                to="/post-job"
                style={{ textDecoration: "none", color: "white" }}
              >
                Publica un trabajo
              </Link>
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
        >
          {/* <div className="footer-menu">
            <div>Quienes Somos</div>
            <div>Whatsapp</div>
          </div> */}
        </div>
      )}
      <div style={{ paddingTop: "10px" }}>
        <div style={{ marginBottom: "5px" }}>Politica de Privacidad</div>
        <div style={{ fontSize: "12px" }}>
          Humm Labs. Reservados todos los Derechos 2024
        </div>
      </div>
    </div>
  );
}

export default Footer;
