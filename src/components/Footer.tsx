import React from "react";
import "../assets/styles/footer.css";

function Footer() {
  return (
    <div className="footer-container ">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="footer-menu">
          <div>Quienes Somos</div>
          <div>Whatsapp</div>
          <div>Trabaja Con Nosotros</div>
        </div>
      </div>

      <div>Politica de Privacidad</div>
      <div>Humm Inc. Reservados todos los Derechos 2024</div>
    </div>
  );
}

export default Footer;
