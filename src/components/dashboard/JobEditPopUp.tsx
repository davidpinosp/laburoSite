import React, { useEffect, useRef, useState } from "react";
import { JobInt } from "../../typescript/interfaces/JobInterface";
import { Alert, Switch } from "@mui/material";
import { updateDbStatusDescription } from "../../utils/jobsUtils";
import RichTextEditor from "../RichTextEditor";

import Close from "@mui/icons-material/Close";
import LoadingWidget from "../widgets/LoadingWidget";
interface JobEditPopUpProps {
  setJobPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  job: JobInt;
  getPositions: () => Promise<void>;
}
function JobEditPopUp(props: JobEditPopUpProps) {
  const [loading, setIsLoading] = useState(false);
  const [loadingAlert, setLoadingAlert] = useState(false);

  const [successAlert, setSuccessAlert] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [htmlValue, setHTMLValue] = useState("");
  const label = { inputProps: { "aria-label": "Color switch demo" } };

  const popupRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    if (popupRef.current) {
      popupRef.current.scrollTop = 0;
    }
  };

  const closeOnClick = () => {
    props.setJobPopUp(false);
  };

  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  //   retrieve the data
  const handleSubmit = async () => {
    setIsLoading(true);
    if (props.job) {
      const updatedPost = {
        ...props.job,
        description: htmlValue,
        status: isChecked,
      };
      try {
        await updateDbStatusDescription(updatedPost, true);
        // set timeout and lose flag and also scroll to the top when submitting
        setIsLoading(false);
        scrollToTop();
        setSuccessAlert(true);

        props.getPositions();

        await timeout(3000);

        setSuccessAlert(false);
      } catch (error) {
        console.log(error);
        setLoadingAlert(true);

        setIsLoading(false);
        await timeout(3000);
        setLoadingAlert(false);
      }
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    console.log(event.target.checked);
  };

  useEffect(() => {
    const getJobData = async () => {
      setIsLoading(true);
      // when result is null put ale
      if (props.job) {
        try {
          setIsChecked(props.job.status);
          setHTMLValue(props.job.description);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getJobData();
  }, [props.job]);
  return (
    <div className="job-edit-popup-container">
      <div className="job-edit-popup-box" ref={popupRef}>
        {loadingAlert && (
          <Alert
            severity="error"
            className=" mt-25 w100"
            style={{
              borderRadius: "10px",
              position: "absolute",
              top: 10,
              left: 10,
              maxWidth: "500px",
            }}
          >
            No se pudieron guardar tus cambios
          </Alert>
        )}

        {successAlert && (
          <Alert
            className=" mt-25 w100"
            style={{
              borderRadius: "10px",
              position: "absolute",
              maxWidth: "500px",
              top: 10,
              left: 10,
            }}
          >
            ¡Tus cambios han sido guardados con éxito!
          </Alert>
        )}
        <div onClick={closeOnClick} className="txt-s4 job-edit-close-btn">
          <Close />
        </div>
        <div className="flx flx-col" style={{ gap: "15px" }}>
          <div className="txt-s5">{props.job.title}</div>
          <div className="txt-s4">{props.job.company}</div>
          <div>
            {props.job.location.city + ", " + props.job.location.country}{" "}
          </div>
        </div>

        <div className="flx mt-25 " style={{ alignItems: "baseline" }}>
          <div className="txt-s3"> Pausa</div>
          <Switch
            {...label}
            color="primary"
            onChange={handleChange}
            checked={isChecked}
          />
          <div className="txt-s3">Activo</div>
        </div>
        <div>
          <RichTextEditor
            editorName={""}
            htmlValue={htmlValue}
            setHTMLValue={setHTMLValue}
          />
        </div>

        <div className="w100 flx mt-50 button-cont-edit">
          {loading ? (
            <LoadingWidget loading={loading} />
          ) : (
            <button
              className="edit-post-button green bg-laburo-green"
              style={{ color: "white" }}
              onClick={handleSubmit}
            >
              Guardar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobEditPopUp;
