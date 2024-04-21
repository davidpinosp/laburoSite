import React from "react";
import "../assets/styles/companycar.css";
import Favalle from "../assets/images/companies/favalle.png";
import Pydaco from "../assets/images/companies/pydaco.png";
import Soff from "../assets/images/companies/soff.png";
function CompaniesCarousel() {
  return (
    <div className="compcar-container">
      <div className="compcar-title">Publican con nosotros</div>

      <div className="compcar-box">
        <div className="compcar-element">
          <img src={Soff} alt="" />
        </div>
        <div className="compcar-element">
          <img src={Pydaco} alt="" />
        </div>
        <div className="compcar-element">
          <img src={Favalle} alt="" />
        </div>
      </div>
    </div>
  );
}

export default CompaniesCarousel;
