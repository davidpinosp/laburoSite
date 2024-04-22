import React, { useState } from "react";
import "../../assets/styles/postjobs.css";
import AutocompleteLocation from "../AutocompleteLocation";
import { LocationData } from "../../typescript/interfaces/Location";
import TrueorFalse from "./TrueorFalse";

import RichTextEditor from "../RichTextEditor";
import { JobInt } from "../../typescript/interfaces/JobInterface";

import { Alert } from "@mui/material";

interface CreateJobProps {
  job: JobInt;
  setJob: React.Dispatch<React.SetStateAction<JobInt | undefined>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function CreateJob(props: CreateJobProps) {
  const [title, setTitle] = useState(props.job.title);
  const [company, setCompany] = useState(props.job.company);

  const [selectedLocation, setSelectedLocation] = useState<
    LocationData | undefined
  >(props.job.location);

  const [description, setDescription] = useState(props.job.description);
  const [inPerson, setInPerson] = useState(props.job.inPerson);
  const [fullTime, setFullTime] = useState(props.job.fullTime);
  const [recieveViaEmail, setRecieveViaEmail] = useState(
    props.job.recieveViaEmail
  );
  // const [image, setImage] = useState<any>(null);
  const [destination, setDestination] = useState(props.job.recieveEmail);
  // const hiddenFileInput = useRef<any>(null);
  const [formAlert, setformAlert] = useState(false);
  const increaseStep = () => {
    props.setJob({
      ...props.job,
      title,
      company,
      description,
      location: selectedLocation as LocationData,
      inPerson,
      fullTime,
      recieveViaEmail,
      recieveEmail: destination,
    });
    props.setStep(2);
  };
  const showEmptyFields = () => {
    let names = ["Posición", "Empresa", "Lugar", "Descripción", "Email"];
    let form = [title, company, selectedLocation, description, destination];
    return form.map((val, index) => {
      if (!val) {
        return <div key={index}>{names[index]}</div>;
      }
      return null;
    });
  };
  const handleInvalidEmail = (e: React.FormEvent<HTMLInputElement>) => {
    // Set a custom message in Spanish
    e.currentTarget.setCustomValidity(
      "Por favor introduce una dirección de correo válida."
    );
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(selectedLocation);
    if (title && company && description && selectedLocation && destination) {
      increaseStep();
    } else {
      window.scrollTo(0, 0);
      setformAlert(true);
    }
  };
  return (
    <div className="w100">
      <div className="postjob-gray-container mb-25">
        <div
          className="postjob-container-title"
          style={{ marginBottom: "15px" }}
        >
          Detalles
        </div>
        <div>
          ¡Dale un impulso a tus ofertas de trabajo con nuestra oferta especial!
          Por solo $89 dólares (USD) antes de impuestos, tu vacante estará en
          nuestra lista destacada durante 45 días completos. Es tu mejor
          oportunidad para encontrar al candidato perfecto para tu equipo.
        </div>
      </div>
      {formAlert && (
        <div className="w100 mb-25">
          <Alert severity="error" style={{ borderRadius: "10px" }}>
            <div className="">
              Por favor completa estos campos: {showEmptyFields()}
            </div>
          </Alert>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="postjob-gray-container">
          <div className="w100">
            <div className="postjob-container-title">Información</div>

            <div className="w100">
              <div style={{ marginBottom: "10px", fontSize: "18px" }}>
                {" "}
                Posición
              </div>

              <div className="search-pill">
                <input
                  type="text"
                  className="search-pill-input "
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="w100">
              <div style={{ marginBottom: "10px", fontSize: "18px" }}>
                {" "}
                Empresa
              </div>

              <div className="search-pill">
                <input
                  type="text"
                  className="search-pill-input "
                  value={company}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setCompany(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="w100">
              <div style={{ marginBottom: "10px", fontSize: "18px" }}>
                Ubicación
              </div>

              <AutocompleteLocation setSelectedLocation={setSelectedLocation} />
            </div>

            {/*  */}
            {/* add logo */}
            {/* <div className="postjob-upload-logo-container">
            {image ? (
              <div>
                <div className="postjob-logo-container">
                  <img
                    alt="Por favor intente de nuevo"
                    src={URL.createObjectURL(image)}
                    className="postjob-logo-image"
                  />
                </div>

                <button onClick={() => setImage(null)}>Eliminar</button>
              </div>
            ) : (
              <div className="postjob-default-logo">
                <StoreIcon style={{ fontSize: "35px" }} />{" "}
              </div>
            )}

            <div onClick={handleClick} className="postjob-upload-button-button">
              Select Image
            </div>

            <input
              type="file"
              name="myImage"
              onChange={(event: any) => {
                console.log(event.target.files[0]);
                setImage(event.target.files[0]);
              }}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
          </div> */}

            {/*  Set descritpion*/}
            <RichTextEditor
              setHTMLValue={setDescription}
              htmlValue={description}
              editorName="Descripción"
            />
          </div>
        </div>

        <div className="postjob-gray-container mt-25">
          <div className="postjob-container-title">Preguntas Adicionales</div>

          <TrueorFalse
            name={"Modalidad"}
            value={inPerson}
            setResult={setInPerson}
            optionA="En Persona"
            optionB="Remoto"
          />
          <TrueorFalse
            name={"Tipo de posición"}
            setResult={setFullTime}
            value={fullTime}
            optionA="Tiempo Completo"
            optionB="Medio Tiempo"
          />
        </div>

        <div className="postjob-gray-container mt-25">
          <div className="postjob-container-title">Destino</div>

          {/* manage the input so that it clears if button switches  */}
          <TrueorFalse
            name="Como deseas manejar las aplicaciones ?"
            value={recieveViaEmail}
            optionA="Correo"
            optionB="Redireccionar a tu / otra  pagina"
            setResult={setRecieveViaEmail}
          />

          <div className="w100">
            <div style={{ marginBottom: "10px", marginTop: "10px" }}>
              {recieveViaEmail
                ? "Correo Para Recibir Aplicaciones "
                : "URL para redireccionar aplicantes"}{" "}
            </div>

            <div className="search-pill">
              <input
                type="email"
                className="search-pill-input "
                value={destination}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setDestination(e.target.value);
                  e.target.setCustomValidity("");
                }}
                onInvalid={handleInvalidEmail}
              />
            </div>
          </div>
        </div>
        <div className=" flx flx-center mt-25">
          <button type="submit" className="postjob-createjob-button">
            Validar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateJob;
