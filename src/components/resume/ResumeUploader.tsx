import React, { useState, useRef } from "react";
import "../../assets/styles/resumeUploader.css";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

interface ResumeUploaderProps {
  setResume: React.Dispatch<React.SetStateAction<File | undefined>>;
  status: number;
}

function ResumeUploader(props: ResumeUploaderProps) {
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : undefined;
    setFile(selectedFile);
    props.setResume(selectedFile);
    console.log(selectedFile);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    // Clear the internal state and prop
    setFile(undefined);
    props.setResume(undefined);
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <React.Fragment>
      <input
        type="file"
        id="fileInput"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.txt"
      />
      <button
        type="button"
        onClick={handleClick}
        className="uploader-container"
        style={file ? { opacity: "0.4" } : {}}
        disabled={!!file}
      >
        <React.Fragment>
          Subir CV <AutoAwesomeIcon style={{ marginLeft: "10px" }} />
        </React.Fragment>
      </button>
      {file && (
        <div
          style={{ marginTop: "5px", display: "flex", alignItems: "baseline" }}
        >
          {file.name}
          <button
            type="button"
            className="erase-doc-button laburo-green"
            onClick={handleRemove}
          >
            eliminar
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

export default ResumeUploader;
