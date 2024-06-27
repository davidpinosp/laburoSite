import React, { useEffect, useState } from "react";
import { JobInt } from "../../typescript/interfaces/JobInterface";
import JobDropDown from "./tools/JobDropDown";
import {
  ApplicantInt,
  OptionsInt,
} from "../../typescript/interfaces/AppInterface";
import { getApplicantsById } from "../../utils/applicantFunctions";
import ApplicantSidebar from "../applicants-sidebar/ApplicantSidebar";
import LoadingWidget from "../widgets/LoadingWidget";

interface ApplicantsProps {
  jobs: JobInt[];
}

// update date to today on payment confirmation for 45 day calculation

function Applicants(props: ApplicantsProps) {
  const [selectedJob, setSelectedJob] = useState(props.jobs[0]);
  const [jobOptions, setJoboptions] = useState<OptionsInt[]>([]);
  const [applicants, setApplicants] = useState<ApplicantInt[]>([]);
  const [loading, setLoading] = useState(true);
  const handleOptionClick = (option: OptionsInt) => {
    setSelectedJob(option.value);
  };

  useEffect(() => {
    const getJobOptions = () => {
      if (props.jobs) {
        const options = props.jobs.map((job) => {
          return { value: job, label: job.title };
        });
        setJoboptions(options);
      }
    };
    const getApplicants = async () => {
      setLoading(true);
      if (selectedJob._id) {
        const appList = await getApplicantsById(selectedJob._id);
        console.log("applist");
        setApplicants(appList);
      }
      setLoading(false);
    };
    console.log("fetching jobs posted by user");
    getJobOptions();
    getApplicants();
  }, [props.jobs, selectedJob]);

  return (
    <div
      className="w100"
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "0px 10px",
      }}
    >
      <div className="w100" style={{ maxWidth: "1000px", height: "100%" }}>
        {!loading && (
          <JobDropDown
            options={jobOptions}
            value={{ value: selectedJob, label: selectedJob.title }}
            onSelect={handleOptionClick}
          />
        )}

        {/* display jobs */}
        {!loading ? (
          applicants.length > 0 ? (
            <ApplicantSidebar aplicants={applicants} />
          ) : (
            <div>Aún no tienes candidatos</div>
          )
        ) : (
          // center
          <div className="flx flx-center mt-25">
            <LoadingWidget loading={true} />
          </div>
        )}
      </div>
      {/* add the list of applicants  */}
    </div>
  );
}

export default Applicants;
