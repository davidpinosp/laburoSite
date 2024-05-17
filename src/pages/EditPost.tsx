import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../assets/styles/editPost.css";
import RichTextEditor from "../components/RichTextEditor";

import Switch from "@mui/material/Switch";
import { Alert, alpha, styled } from "@mui/material";
import { pink } from "@mui/material/colors";
import { useSearchParams } from "react-router-dom";
import { getJobByEditKey, updateDbStatusDescription } from "../utils/jobsUtils";
import { JobInt } from "../typescript/interfaces/JobInterface";
import { TryRounded } from "@mui/icons-material";
import LoadingWidget from "../components/widgets/LoadingWidget";

function EditPost() {
  const [htmlValue, setHTMLValue] = useState("");
  const [currPost, setCurrPost] = useState<JobInt>();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAlert, setLoadingAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const label = { inputProps: { "aria-label": "Color switch demo" } };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  const resetInfo = () => {
    if (currPost) {
      setIsChecked(currPost.status);
      setHTMLValue(currPost.description);
    }
  };
  const handleSubmit = async () => {
    if (currPost) {
      const updatedPost = {
        ...currPost,
        description: htmlValue,
        status: isChecked,
      };
      try {
        await updateDbStatusDescription(updatedPost);
        setSuccessAlert(true);
      } catch (error) {
        console.log(error);
        setLoadingAlert(true);
      }
    }
  };
  useEffect(() => {
    const getJobData = async () => {
      const editKey = searchParams.get("editId");
      // when result is null put ale
      if (editKey) {
        try {
          const result = await getJobByEditKey(editKey);

          setCurrPost(result);
          setIsChecked(result.status);
          setHTMLValue(result.description);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getJobData();
  }, []);
  return (
    <div className="edit-post-container">
      <Navbar scrollPast={true} />
      <div className="skip-navbar-margin edit-post-content">
        <div className="w100 flx flx-col " style={{ alignItems: "center" }}>
          {loadingAlert && (
            <Alert
              severity="error"
              className=" mt-25 w100"
              style={{
                borderRadius: "10px",
                position: "absolute",
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
              }}
            >
              ¡Tus cambios han sido guardados con éxito!
            </Alert>
          )}

          <div className="txt-s6" style={{ marginTop: "100px" }}>
            Editar Publicación
          </div>
          {/* activar desactivar */}
          <div className="flx mt-50 " style={{ alignItems: "baseline" }}>
            <div className="txt-s4"> Pausa</div>
            <Switch
              {...label}
              color="primary"
              onChange={handleChange}
              checked={isChecked}
            />
            <div className="txt-s4">Activo</div>
          </div>
          <RichTextEditor
            editorName={""}
            htmlValue={htmlValue}
            setHTMLValue={setHTMLValue}
          />
          <LoadingWidget loading={isLoading} />
          <div className="w100 flx  flx-center mt-50" style={{ gap: "50px" }}>
            <button className="edit-post-button " onClick={resetInfo}>
              Descartar
            </button>
            <button
              className="edit-post-button green bg-laburo-green"
              onClick={handleSubmit}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
