import React, { useState } from "react";
import "../../assets/styles/resumeUploader.css";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

interface ResumeUploaderProps {
  setResume: React.Dispatch<React.SetStateAction<File | undefined>>;
  // setStatus: React.Dispatch<React.SetStateAction<number>>;
  status: number;
}
function ResumeUploader(props: ResumeUploaderProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [file, setFile] = useState<File>();
  // const [status, setStatus] = useState(0);
  const handleFileChange = (event: any) => {
    // Set the selected file to state
    setFile(event.target.files[0]);
    props.setResume(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleClick = (event: any) => {
    // Prevent form submission
    event.preventDefault();
    // Trigger the hidden file input
    document.getElementById("fileInput")?.click();
  };

  return (
    <React.Fragment>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.txt"
      />
      <button
        type="button"
        onClick={handleClick}
        className="uploader-container"
        style={file ? { opacity: "0.4" } : {}}
        disabled={file ? true : false}
      >
        {props.status > 0 ? (
          props.status
        ) : (
          <React.Fragment>
            Subir CV <AutoAwesomeIcon style={{ marginLeft: "10px" }} />
          </React.Fragment>
        )}
      </button>
      <div
        style={{ marginTop: "5px", display: "flex", alignItems: "baseline" }}
        onClick={() => {
          props.setResume(undefined);
          setFile(undefined);
        }}
      >
        {file?.name}{" "}
        {file && (
          <button type="button" className="erase-doc-button laburo-green">
            eliminar
          </button>
        )}
      </div>
    </React.Fragment>
  );
}

export default ResumeUploader;
