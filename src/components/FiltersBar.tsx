import React, { useEffect, useState } from "react";
import { JobInt } from "../typescript/interfaces/JobInterface";
import "../assets/styles/job-sidebar.css";
import DropDown from "./widgets/DropDown";

interface FiltersBarProps {
  filters: React.Dispatch<
    React.SetStateAction<{
      datePosted: string;
      inPerson: boolean | undefined;
      fullTime: boolean | undefined;
    }>
  >;

  getJobsOnChange?: () => Promise<void>;
  mobile?: boolean;
  currJob?: JobInt;
}

function FiltersBar({ filters }: FiltersBarProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [datePosted, setDatePosted] = useState<string>("");
  const [inPerson, setInPerson] = useState<string>("");
  const [fullTime, setFullTime] = useState<string>("");

  useEffect(() => {
    let modality: boolean | undefined;
    let workType: boolean | undefined;

    if (inPerson === "En Persona") {
      modality = true;
    } else if (inPerson === "Remoto") {
      modality = false;
    }

    if (fullTime === "Tiempo Completo") {
      workType = true;
    } else if (fullTime === "Medio Tiempo") {
      workType = false;
    }

    filters({
      datePosted: datePosted || "",
      inPerson: modality,
      fullTime: workType,
    });
  }, [datePosted, inPerson, fullTime, filters]);

  return (
    <div className="mt-25 flx w100 job-filtersbar hide-scrollbar">
      {/* <DropDown
        name="Fecha de Publicación"
        options={["Hoy", "3 días", "7 días", "30 días"]}
        setSelected={setDatePosted}
      /> */}
      <DropDown
        name="Modalidad"
        options={["En Persona", "Remoto"]}
        setSelected={setInPerson}
      />

      <DropDown
        name="Contrato"
        options={["Tiempo Completo", "Medio Tiempo"]}
        setSelected={setFullTime}
      />
    </div>
  );
}

export default FiltersBar;
