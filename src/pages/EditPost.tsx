import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../assets/styles/editPost.css";
import RichTextEditor from "../components/RichTextEditor";

import Switch from "@mui/material/Switch";
import { Alert } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useSearchParams } from "react-router-dom";
import { getJobByEditKey, updateDbStatusDescription } from "../utils/jobsUtils";
import { JobInt } from "../typescript/interfaces/JobInterface";

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
    console.log(event.target.checked);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (currPost) {
      const updatedPost = {
        ...currPost,
        description: htmlValue,
        status: isChecked,
      };
      try {
        await updateDbStatusDescription(updatedPost);
        setSuccessAlert(true);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setLoadingAlert(true);
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    const getJobData = async () => {
      const editKey = searchParams.get("editId");
      setIsLoading(true);
      // when result is null put ale
      if (editKey) {
        try {
          const result = await getJobByEditKey(editKey);

          setCurrPost(result);
          setIsChecked(result.status);
          setHTMLValue(result.description);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getJobData();
  }, [searchParams]);
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

          <div className="txt-s6 " style={{ marginTop: "100px" }}>
            Editar Publicación
          </div>
          {/* activar desactivar */}

          <div className="mt-25 mb-25">
            <LoadingWidget loading={isLoading} />
          </div>

          <div className="flx mt-25 " style={{ alignItems: "baseline" }}>
            <div className="txt-s4"> Pausa</div>
            <Switch
              {...label}
              color="primary"
              onChange={handleChange}
              checked={isChecked}
            />
            <div className="txt-s4">Activo</div>
          </div>
          <div
            className="w100"
            style={{ position: "relative", height: "10px" }}
          >
            <button
              className="refresh-post-button "
              onClick={() => {
                window.location.reload();
              }}
            >
              <RefreshIcon
                style={{ fontSize: "25px", fontStyle: "bold", color: "black" }}
              />
            </button>
          </div>
          <RichTextEditor
            editorName={""}
            htmlValue={htmlValue}
            setHTMLValue={setHTMLValue}
          />

          <div className="w100 flx mt-50 button-cont-edit">
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
