import React from "react";
import StoreIcon from "@mui/icons-material/Store";
import { JobInt } from "../typescript/interfaces/JobInterface";
import InfoFlag from "./job-card/InfoFlag";

interface postProps {
  currJob: JobInt;
}

const JobPost = (data: postProps) => {
  const props = data.currJob;
  // const [position, setPostiion] = useState(
  //   "Ayudante De Boasdasdaasdasdasdasda"
  // );
  // const [company, setCompany] = useState("Pydaco cia ltda ");
  // const [location, setLocation] = useState("Quito,Ecuador");
  // const [salary, setSalary] = useState("$100-$200");
  const checkTimeDif = () => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const a = new Date();
    const b = new Date(props.datePosted);
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc1 - utc2) / _MS_PER_DAY);
  };

  const getDaysDisplay = () => {
    let daysDiff = checkTimeDif();

    if (daysDiff > 2) {
      return (
        <React.Fragment>
          <span> {checkTimeDif()}</span> <span> días </span>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <span> hoy </span>
        </React.Fragment>
      );
    }
  };
  return (
    <div className="job-post-container">
      {/* image  */}
      <div className="job-post-img-container">
        <div className="job-post-img bg-laburo-green flx flx-center">
          <StoreIcon style={{ fontSize: "35px" }} />
        </div>
      </div>

      {/* text */}
      <div className="flx   job-post-txt">
        <div className="job-post-txt-col1">
          <div className="flx flx-space-btwn w100">
            <div className="txt-s4  job-post-position">
              {props.title ? props.title : "Posición"}
            </div>
            {props.datePosted && (
              <div
                className="flx days-ago "
                style={{ marginRight: "15px", width: "auto" }}
              >
                {getDaysDisplay()}
              </div>
            )}
          </div>
          <div className="job-post-company">
            {props.company ? props.company : "Compania"}
          </div>
          <div
            className="job-post-location"
            style={{ color: "rgba(0,0,0,0.5)" }}
          >
            {props.location
              ? props.location.city + ", " + props.location.country
              : "Lugar"}
          </div>
          <div className="flag-container">
            {checkTimeDif() < 10 && <InfoFlag name={"Nuevo"} />}
            {!props.inPerson && <InfoFlag name={"Remoto"} />}
            {!props.fullTime && <InfoFlag name={"Medio Tiempo "} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPost;
