import React from "react";
import SchoolIcon from "../assets/images/icons/school.svg";
import ChangeIcon from "../assets/images/icons/change.svg";
import PlanetIcon from "../assets/images/icons/planet.svg";
import GrowthIcon from "../assets/images/icons/growth.svg";

function FeatureSquares() {
  return (
    <div className="flx flx-center">
      <div className="feature-squares-contianer">
        <div className="feature-square">
          <div className="feature-square-title">
            <img src={SchoolIcon} alt="School Icon" /> <div>Primer Trabajo</div>
          </div>
          <div style={{ textAlign: "left" }} className="feature-square-text">
            Toma el primer paso hacia el futuro que deseas.
          </div>
        </div>

        <div className="feature-square">
          <div className="feature-square-title">
            <img src={ChangeIcon} alt="School Icon" />

            <div>Un Cambio</div>
          </div>

          <div style={{ textAlign: "left" }} className="feature-square-text">
            ¿Cansado de lo mismo? Prueba algo nuevo
          </div>
        </div>

        <div className="feature-square">
          <div className="feature-square-title">
            <img src={GrowthIcon} alt="School Icon" /> <div>Progresar</div>
          </div>

          <div style={{ textAlign: "left" }} className="feature-square-text">
            ¿Cansado de lo mismo? Prueba algo nuevo
          </div>
        </div>
        <div className="feature-square">
          <div className="feature-square-title">
            <img src={PlanetIcon} alt="School Icon" /> <div>Progresar</div>
          </div>
          <div style={{ textAlign: "left" }} className="feature-square-text">
            ¿Cansado de lo mismo? Prueba algo nuevo
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureSquares;
