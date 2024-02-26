import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/styles/jobs.css";
import JobPost from "../components/JobPost";
import TuneIcon from "@mui/icons-material/Tune";
import { getJobsData } from "../utils/jobsUtils";
import { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";

function Jobs() {
  const [jobsnumber, setJobsNumber] = useState(0);
  // const [pageNumber, setPageNumber] = useState(0);
  const [locationValue, setLocationValue] = useState("");
  const [positionValue, setPositionValue] = useState("");
  const [jobPositions, setJobPositions] =
    useState<{ data: DocumentData; id: string }[]>();
  const [filteredJobs, setFilteredJobs] =
    useState<{ data: DocumentData; id: string }[]>();

  const fetchJobs = async () => {
    // get the jobs from firebase
    // get length
    const jobsList = await getJobsData(0);

    let filtered: { data: DocumentData; id: string }[] = jobsList;
    if (locationValue && positionValue) {
      filtered = jobsList
        .filter((jobs) => jobs.data.location.country === locationValue)
        .filter((jobs) => jobs.data.title === positionValue);
    } else if (locationValue) {
      filtered = jobsList.filter(
        (jobs) => jobs.data.location.country === locationValue
      );
    } else if (positionValue) {
      filtered = jobsList.filter((jobs) => jobs.data.title === positionValue);
    }
    console.log("filtered jobs: " + filtered);
    setJobPositions(jobsList);
    setFilteredJobs(filtered);
    console.log(jobPositions);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
    setJobsNumber(12345);
  }, []);

  // use effect to fetch all jobs or saved filters

  return (
    <div>
      <Navbar />

      <div className="w100 flx-center flx-col">
        <div className="  flx-col flx-center job-page-container">
          <form onSubmit={handleSubmit}>
            <div className="search-container">
              <div className="search-pill">
                <input
                  type="text"
                  className="search-pill-input"
                  placeholder="Posición "
                  value={positionValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPositionValue(e.target.value);
                  }}
                />
              </div>

              <div className="search-pill">
                <input
                  type="text"
                  className="search-pill-input"
                  placeholder="Ubicación"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setLocationValue(e.target.value);
                  }}
                />
              </div>
              <button
                className="bg-laburo-green search-btn"
                onClick={() => {
                  fetchJobs();
                }}
              >
                Buscar
              </button>
            </div>
          </form>

          <div className="flx space-btwn w100  filters-menu">
            <div>{jobsnumber} resultados</div>
            <div className="order-dropdown">
              <TuneIcon />
            </div>
          </div>
          {/* positions here  */}
          <div className="w100 mb-25">
            {filteredJobs?.map((job, index) => (
              <Link
                to={`/job-des/?id=${job.id}`}
                key={index}
                className="link-style"
              >
                <JobPost
                  position={job.data.title}
                  company={job.data.company}
                  location={
                    job.data.location.city
                      ? job.data.location.city + "," + job.data.location.country
                      : " "
                  }
                />
              </Link>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Jobs;
