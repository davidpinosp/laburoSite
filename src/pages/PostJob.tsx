import React from "react";
import Navbar from "../components/Navbar";

function PostJob() {
  return (
    <div>
      <Navbar scrollPast={true} />
      <div className="in-dev">
        <div className="flx-col flx-center">
          <div className="in-dev-txt mb-25">
            Disculpa! Esta pagina aun esta en desarollo...
          </div>

          <div className="in-dev-txt">
            Mientras tanto puedes acceder a todos nuestros servicios para
            publicar un trabajo a través de
            <span className="laburo-green"> whatsapp</span>
          </div>

          <div className="in-dev-txt" style={{ marginTop: "20px" }}>
            El precio de una publicación estandar es de $89 c/u
          </div>

          <div className="in-dev-txt" style={{ marginTop: "20px" }}>
            ¡Contactanos para mas información!
          </div>
        </div>
      </div>
      <div>
        <a
          href="https://wa.me/593999112525"
          className="whatsapp_float"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-whatsapp whatsapp-icon"></i>
        </a>
      </div>
    </div>
  );
}

export default PostJob;
