import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/styles/jobs.css";
import JobPost from "../components/JobPost";
import TuneIcon from "@mui/icons-material/Tune";
import { getJobsData } from "../utils/jobsUtils";
import { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";
import AutocompleteLocation from "../components/AutocompleteLocation";
interface LocationData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}
function Jobs() {
  const [jobsnumber, setJobsNumber] = useState(0);
  // const [pageNumber, setPageNumber] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<LocationData>();
  const [grayButton, setGrayButton] = useState(true);
  const [locationValue, setLocationValue] = useState();
  const [positionValue, setPositionValue] = useState("");
  const [jobPositions, setJobPositions] =
    useState<{ data: DocumentData; id: string }[]>();
  const [filteredJobs, setFilteredJobs] =
    useState<{ data: DocumentData; id: string }[]>();

  const fetchJobs = useCallback(async () => {
    const jobsList = await getJobsData(0);
    setJobPositions(jobsList);
    setFilteredJobs(jobsList); // Display all jobs initially
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const jobsList = jobPositions;
    if (jobsList) {
      let filtered: { data: DocumentData; id: string }[] = jobsList;
      if (selectedLocation && positionValue) {
        filtered = jobsList
          .filter(
            (jobs) => jobs.data.location.country === selectedLocation.country
          )
          .filter((jobs) => jobs.data.title === positionValue);
      } else if (selectedLocation) {
        filtered = jobsList.filter(
          (jobs) => jobs.data.location.country === selectedLocation.country
        );
      } else if (positionValue) {
        filtered = jobsList.filter((jobs) => jobs.data.title === positionValue);
      }
      console.log("filtered jobs:", filtered);
      setFilteredJobs(filtered);
    }
    setGrayButton(true);
    console.log(selectedLocation);
  };

  useEffect(() => {
    console.log("mounting");
    fetchJobs();
    setJobsNumber(27);
  }, [fetchJobs]);

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
                    setGrayButton(false);
                  }}
                />
              </div>

              {/* <input
                  type="text"
                  className="search-pill-input"
                  placeholder="Ubicación"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setLocationValue(e.target.value);
                  }}
                /> */}
              <AutocompleteLocation
                setSelectedLocation={setSelectedLocation}
                setGrayButton={setGrayButton}
              />

              <button
                className={` search-btn ${
                  grayButton ? "bg-laburo-gray" : "bg-laburo-green"
                }`}
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
