import React, { useState } from "react";

import { JobInt } from "../typescript/interfaces/JobInterface";
import JobPost from "./JobPost";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StripeButton from "./stripe/StripeButton";
import LoadingWidget from "./widgets/LoadingWidget";
interface ValidateJobProps {
  job: JobInt;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
function ValidateJob(props: ValidateJobProps) {
  const [loading, setLoading] = useState(false);

  const decreaseStep = () => {
    props.setStep(1);
  };
  return (
    <div className="w100">
      <div>
        <div
          className="flx"
          onClick={decreaseStep}
          style={{
            marginBottom: "10px",
            alignItems: "center",
            width: "fit-content",
          }}
        >
          <ArrowBackIcon /> Regresar
        </div>
      </div>
      <div className="postjob-gray-container mb-50">
        <div className="validate-job-title">Validar Información</div>
        {/* imagen */}
        <div className="w100">
          <div className="validate-job-text"> Posición: {props.job.title}</div>
          <div className="validate-job-text"> Empresa: {props.job.company}</div>
          <div className="validate-job-text">
            {props.job.location.city && props.job.location.country ? (
              <React.Fragment>
                Ubicación:{" "}
                {props.job.location.city + ", " + props.job.location.country}
              </React.Fragment>
            ) : (
              ""
            )}
          </div>
          {props.job.recieveViaEmail ? (
            <div className="validate-job-text">Descripción: </div>
          ) : (
            <div className="validate-job-text">
              {" "}
              Los aplicantes seran redireccionados a {
                props.job.recieveEmail
              }{" "}
            </div>
          )}
          <div
            dangerouslySetInnerHTML={{ __html: props.job.description }}
            className="validate-job-text ql-editor"
            style={{ maxHeight: "none" }}
          ></div>
        </div>
      </div>
      <div>
        {" "}
        <JobPost currJob={props.job} />{" "}
      </div>

      <div className=" flx flx-center ">
        <div className="w100 flx flx-center">
          {loading ? (
            <LoadingWidget loading={loading} />
          ) : (
            <StripeButton body={props.job} setLoading={setLoading} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ValidateJob;
