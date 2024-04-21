import React from "react";
import StoreIcon from "@mui/icons-material/Store";

interface PostProps {
  position: string;
  company: string;
  location: string;
  salary?: string;
  posted?: Date;
}

const JobPost: React.FC<PostProps> = ({
  position,
  company,
  location,
  salary,
  posted,
}) => {
  // const [position, setPostiion] = useState(
  //   "Ayudante De Boasdasdaasdasdasdasda"
  // );
  // const [company, setCompany] = useState("Pydaco cia ltda ");
  // const [location, setLocation] = useState("Quito,Ecuador");
  // const [salary, setSalary] = useState("$100-$200");

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
          <div className="txt-s4 job-post-position">
            {position ? position : "Posición"}
          </div>
          <div className="job-post-company">
            {company ? company : "Compania"}
          </div>
          <div
            className="job-post-location"
            style={{ color: "rgba(0,0,0,0.5)" }}
          >
            {location ? location : "Lugar"}
          </div>
        </div>
        <div className="job-post-txt-col2">
          <div className="job-post-salary">{salary ? salary : ""} </div>
        </div>
      </div>
    </div>
  );
};

export default JobPost;
