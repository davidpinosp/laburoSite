import React from "react";
import "../../assets/styles/dashboard/positions.css";

import { JobInt } from "../../typescript/interfaces/JobInterface";
import JobPostingRow from "./JobPostingRow";
import { Link } from "react-router-dom";

interface PositionsProps {
  positions: JobInt[];
  getPositions: () => Promise<void>;
}

function Positions(props: PositionsProps) {
  return (
    <React.Fragment>
      <div className="positions-container">
        <div className="positions-box">
          <div className="positions-box-filters">
            <Link to="/post-job">
              <div className="add-position-btn">Añadir Vacante</div>
            </Link>
          </div>

          <div className="positions-box-table" style={{ position: "relative" }}>
            {props.positions.length !== 0 && (
              <div
                className="positions-box-table-row "
                style={{
                  border: "none",
                  alignItems: "flex-end",
                  height: "100%",
                  fontSize: "18px",
                }}
              >
                <div className="positions-box-table-cell btc-title">
                  Vacante
                </div>
                <div className="positions-box-table-cell">Lugar</div>
                <div className="positions-box-table-cell">Aplicantes</div>
                <div className="positions-box-table-cell">Publicado</div>
                <div className="positions-box-table-cell">Activo</div>
                <div className="positions-box-table-cell "></div>
              </div>
            )}

            {props.positions && props.positions.length > 0 ? (
              props.positions?.map((pos, index) => {
                return (
                  <JobPostingRow
                    job={pos}
                    key={index}
                    getPositions={props.getPositions}
                  />
                );
              })
            ) : props.positions.length === 0 ? (
              <div className="flx flx-center txt-s4">
                {" "}
                ¡Añade una vacante para conseguir el mejor talento!
              </div>
            ) : (
              "cargando..."
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Positions;
