import React from "react";
import "../assets/styles/footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div
        className="flx space-btwn "
        style={{ margin: "100px 20px 50px 20px" }}
      >
        <div>Quienes Somos</div>
        <div>Whatsapp</div>
        <div>Trabaja Con Nosotros</div>
      </div>

      <div>Politica de Privacidad</div>
      <div>Humm. Reservados todos los Derechos 2024</div>
    </div>
  );
}

export default Footer;
