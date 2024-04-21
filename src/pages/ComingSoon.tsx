import React from "react";
import Navbar from "../components/Navbar";
// import AutocompleteLocation from "../components/AutocompleteLocation";
import Footer from "../components/Footer";

function ComingSoon() {
  return (
    <div>
      <Navbar scrollPast={true} />
      <div className="in-dev skip-navbar-margin">
        <div className="flx-col flx-center">
          <div className="in-dev-txt mb-25">
            Disculpa! Esta pagina aun esta en desarollo...
          </div>

          <div className="in-dev-txt">
            Mientras tanto puedes acceder a todos nuestros servicios a traves de
            whatsapp
          </div>

          {/* test autocomplete */}
        </div>
      </div>

      <Footer type={2} />
    </div>
  );
}

export default ComingSoon;
