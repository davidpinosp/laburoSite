import React, { useState } from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
interface tofProps {
  name: string;
  optionA: string;
  optionB: string;
  value: boolean;
  setResult: React.Dispatch<React.SetStateAction<boolean>>;
}
function TrueorFalse(props: tofProps) {
  const [firstSelected, setFirstSelected] = useState(true);
  return (
    <div className="tof-container">
      <div className="tof-title">{props.name}</div>
      <div className="tof-question-box">
        <div className="tof-question-option">
          {props.optionA}

          {props.value ? (
            <div className="tof-dot-true">
              {" "}
              <CheckOutlinedIcon
                style={{ color: "white", fontSize: "18px" }}
              />{" "}
            </div>
          ) : (
            <div
              className="tof-question-dot"
              onClick={() => {
                props.setResult(true);
                setFirstSelected(true);
              }}
            >
              {" "}
            </div>
          )}
        </div>
        <div className="tof-question-option">
          {props.optionB}
          {!props.value ? (
            <div className="tof-dot-true">
              {" "}
              <CheckOutlinedIcon
                style={{ color: "white", fontSize: "18px" }}
              />{" "}
            </div>
          ) : (
            <div
              className="tof-question-dot"
              onClick={() => {
                props.setResult(false);
                setFirstSelected(false);
              }}
            >
              {" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrueorFalse;
