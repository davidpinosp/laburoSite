import React, { useState } from "react";
import { ApplicantInt } from "../../typescript/interfaces/AppInterface";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { updateApplicantById } from "../../utils/applicantFunctions";
interface ApplicantPillProps {
  applicant: ApplicantInt;
  setSelectedApp?: React.Dispatch<React.SetStateAction<ApplicantInt>>;
  selected?: boolean;
}

const ApplicantPill: React.FC<ApplicantPillProps> = (props) => {
  const { applicant, setSelectedApp, selected } = props;
  const [likedApp, setLikedApp] = useState(applicant.liked);
  const checkTimeDif = (): number => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const today = new Date();
    const applicantDate = new Date(applicant.date);
    const utcToday = Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const utcApplicantDate = Date.UTC(
      applicantDate.getFullYear(),
      applicantDate.getMonth(),
      applicantDate.getDate()
    );

    return Math.floor((utcToday - utcApplicantDate) / _MS_PER_DAY);
  };

  const getDaysDisplay = () => {
    const daysDiff = checkTimeDif();

    if (daysDiff > 2) {
      return <span style={{ whiteSpace: "nowrap" }}>{daysDiff} días</span>;
    } else {
      return <div>reciente</div>;
    }
  };

  const hadleApplicantLike = async () => {
    setLikedApp(!likedApp);

    const result = await updateApplicantById(props.applicant);
    if (!result) {
      setLikedApp(!likedApp);
    }
    console.log("updating heart");
    console.log(result);
  };

  return (
    <div
      className={`job-post-container ${
        selected ? "selected-job-highlight" : ""
      }`}
      onClick={() => {
        if (setSelectedApp) {
          setSelectedApp(applicant);
        }
      }}
    >
      <div className="flx w100 job-post-txt">
        <div className="job-post-txt-col1 w100">
          <div className="flx w100" style={{ justifyContent: "space-between" }}>
            <div className="txt-s4 job-post-position">
              {applicant.name ? applicant.name : "name"}
            </div>
            <div
              onClick={() => {
                hadleApplicantLike();
              }}
            >
              {likedApp ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </div>
          </div>
          <div className="flx w100" style={{ justifyContent: "space-between" }}>
            <div className="job-post-company">
              {applicant.email ? applicant.email : "Compania"}
            </div>
            {applicant.date && (
              <div
                className="flx days-ago"
                style={{ marginRight: "5px", width: "auto" }}
              >
                {getDaysDisplay()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantPill;
