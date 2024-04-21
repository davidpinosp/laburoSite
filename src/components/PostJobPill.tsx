import React, { useState } from "react";

import "../assets/styles/postjobs.css";

interface pillProps {
  step: number;
}
function PostJobPill(props: pillProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [step, setStep] = useState(props.step);
  // pass in which step is on
  return (
    <div className="postjob-top-pill">
      <div className="postjob-top-pill-title">Publica un Trabajo</div>

      <div className="flx space-even postjob-top-pill-container w100">
        <div className="postjob-top-pill-step">
          <div className="postjob-step-number"> Paso 1 </div>
          {step === 1 ? <FilledBar /> : <Bar />}
          <div className="postjob-step-name"> Crear</div>
        </div>

        <div className="postjob-top-pill-step">
          <div className="postjob-step-number"> Paso 2 </div>
          {step === 2 ? <FilledBar /> : <Bar />}
          <div className="postjob-step-name"> Validar</div>
        </div>

        <div className="postjob-top-pill-step">
          <div className="postjob-step-number"> Paso 3 </div>
          {step === 3 ? <FilledBar /> : <Bar />}
          <div className="postjob-step-name"> Pagar</div>
        </div>
      </div>
    </div>
  );
}

const FilledBar = () => {
  return <div className="progress-bar filled-bar"> </div>;
};

const Bar = () => {
  return <div className="progress-bar "> </div>;
};

export default PostJobPill;
