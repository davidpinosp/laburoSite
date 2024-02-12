import React from "react";
import Navbar from "../components/Navbar";
function ComingSoon() {
  return (
    <div>
      <Navbar />
      <div
        className="in-dev flx-col"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="in-dev-txt mb-25">
          Disculpa! Esta pagina aun esta en desarollo...
        </div>

        <div className="in-dev-txt">
          Mientras tanto puedes acceder a todos nuestros servicios a traves de
          whatsapp
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
