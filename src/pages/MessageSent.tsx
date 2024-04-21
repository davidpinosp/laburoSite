import React from "react";
import Navbar from "../components/Navbar";
// import AutocompleteLocation from "../components/AutocompleteLocation";
function MessageSent() {
  return (
    <div>
      <Navbar scrollPast={true} />
      <div className="in-dev skip-navbar-margin">
        <div className="flx-col flx-center">
          <div
            className="in-dev-txt mb-25"
            style={{ textAlign: "left", fontSize: "30px" }}
          >
            ¡Gracias por tu mensaje!
          </div>

          <div className="in-dev-txt">
            Tu mensaje ha sido enviado exitosamente. Nos pondremos en contacto
            lo mas pronto posible. Que tengas un excelente dia.
          </div>

          {/* test autocomplete */}
        </div>
      </div>
    </div>
  );
}

export default MessageSent;
