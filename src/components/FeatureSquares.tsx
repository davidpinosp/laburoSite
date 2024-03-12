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
          <div className="feature-square-title">Primer Trabajo</div>
          <div>
            <img src={SchoolIcon} alt="School Icon" />
          </div>
        </div>

        <div className="feature-square">
          <div className="feature-square-title">Un Cambio </div>

          <img src={ChangeIcon} alt="Change Icon" />
        </div>
        <div className="feature-square">
          <div className="feature-square-title">Progresar</div>
          <div>
            <img src={GrowthIcon} alt="Growth Icon" />
          </div>
        </div>
        <div className="feature-square">
          <div className="feature-square-title">Todo lo demas</div>
          <div>
            <img src={PlanetIcon} alt="Planet Icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureSquares;
