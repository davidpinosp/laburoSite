import React from "react";
import Navbar from "../components/Navbar";
// import AutocompleteLocation from "../components/AutocompleteLocation";
function ComingSoon() {
  return (
    <div>
      <Navbar />
      <div className="in-dev">
        <div className="flx-col flx-center">
          <div
            className="in-dev-txt mb-25"
            style={{ textAlign: "left", fontSize: "30px" }}
          >
            ¡Gracias por confiar en nosotros !
          </div>

          <div className="in-dev-txt">
            Tu applicación ha sido enviada exitosamente. La empresa se pondra en
            contacto contigo directamente. Que tengas un excelente dia y mucha
            suerte en tu busqueda.
          </div>

          {/* test autocomplete */}
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
