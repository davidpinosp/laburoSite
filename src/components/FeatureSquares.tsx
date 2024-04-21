import React from "react";

import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";

import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import AssignmentIcon from "@mui/icons-material/Assignment";
// recien graduado, remoto , medio tiempo , todo lo demas

function FeatureSquares() {
  return (
    <div className="flx flx-center">
      <div className="feature-squares-contianer">
        <div className="feature-square">
          <div className="feature-square-title">
            <SchoolRoundedIcon
              style={{ marginRight: "10px", fontSize: "30px" }}
            />{" "}
            <div>Primer Trabajo</div>
          </div>
          <div style={{ textAlign: "left" }} className="feature-square-text">
            Toma el primer paso a tu futuro
          </div>
        </div>

        <div className="feature-square">
          <div className="feature-square-title">
            <ComputerRoundedIcon
              style={{ marginRight: "10px", fontSize: "30px" }}
            />

            <div>Remoto</div>
          </div>

          <div style={{ textAlign: "left" }} className="feature-square-text">
            Conectate desde donde tu quieras
          </div>
        </div>

        <div className="feature-square">
          <div className="feature-square-title">
            <AssignmentIcon style={{ marginRight: "10px", fontSize: "30px" }} />{" "}
            <div>Temporal</div>
          </div>

          <div style={{ textAlign: "left" }} className="feature-square-text">
            Trabajos por contrato o por proyecto
          </div>
        </div>
        <div className="feature-square">
          <div className="feature-square-title">
            <HandymanOutlinedIcon
              style={{ marginRight: "10px", fontSize: "30px" }}
            />{" "}
            <div>Todo lo demas </div>
          </div>
          <div style={{ textAlign: "left" }} className="feature-square-text">
            Tenemos posiciones para todos
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureSquares;
