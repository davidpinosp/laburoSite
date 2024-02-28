import React from "react";
import Navbar from "../components/Navbar";
import AutocompleteLocation from "../components/AutocompleteLocation";
function ComingSoon() {
  return (
    <div>
      <Navbar />
      <div className="in-dev">
        <div className="flx-col flx-center">
          <div className="in-dev-txt mb-25">
            Disculpa! Esta pagina aun esta en desarollo...
          </div>

          <div className="in-dev-txt">
            Mientras tanto puedes acceder a todos nuestros servicios a traves de
            whatsapp
          </div>

          {/* test autocomplete */}
          <AutocompleteLocation />
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
