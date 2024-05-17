import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/styles/jobs.css";
import JobPost from "../components/JobPost";
// import TuneIcon from "@mui/icons-material/Tune";
import { getDbLength, getJobs } from "../utils/jobsUtils";
import { LocationData } from "../typescript/interfaces/Location";

import AutocompleteLocation from "../components/AutocompleteLocation";

import LoadingWidget from "../components/widgets/LoadingWidget";
import { JobInt } from "../typescript/interfaces/JobInterface";

function Jobs() {
  const [jobsnumber, setJobsNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData>();
  const [loadMoreText, setLoadMoreText] = useState(false);
  const [grayButton, setGrayButton] = useState(true);
  const [positionValue, setPositionValue] = useState("");

  // refactor   -----------------------
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = useState(0);
  const [jobsToDisplay, setJobsToDisplay] = useState<JobInt[]>();
  const [lastId, setLastId] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // handle which filters to use
    getJobsToDisplay();
    // setLoadMoreText(true);
    setGrayButton(true);
  };

  const getJobsToDisplay = async () => {
    setLoading(true);

    try {
      // ---------refactor------------

      // get jobs
      let jobResults;

      jobResults = await getJobs(
        selectedLocation,
        positionValue,
        undefined,
        undefined,
        pageSize,
        setJobsNumber
      );
      // const jobLength = await getDbLength(selectedLocation, positionValue);

      // setJobsNumber(jobLength);
      // get last id
      if (jobResults.length > 0) {
        setLastId(jobResults[jobResults.length - 1]._id);
      }
      setJobsToDisplay(jobResults);

      setLoading(false);
      if (jobResults.length > pageSize) {
        setLoadMoreText(true);
      } else {
        setLoadMoreText(false);
      }
    } catch (error) {
      //  error

      console.log(error);
      setLoading(false);
    }
  };

  const getMoreJobs = async () => {
    // pass last job
    setLoading(true);
    try {
      const moreJobs: JobInt[] = await getJobs(
        selectedLocation,
        positionValue,
        lastId,
        pageSize
      );

      ///---
      const lastIndex = moreJobs[moreJobs.length - 1]._id;
      if (moreJobs.length > 0 && lastIndex) {
        setLastId(lastIndex);

        moreJobs.forEach((element) => {
          jobsToDisplay?.push(element);
        });

        if ((jobsToDisplay?.length as number) < jobsnumber) {
          setLoadMoreText(true);
        }
      } else {
        // setLoadMoreText(false);
        // console.log("no more jobs");
      }
    } catch (error) {
      // console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const onMountFetchData = async (
      setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      try {
        setLoading(true);
        const pageSize = 20;
        setPageSize(pageSize);
        // get initial jobs
        //  get count of jobs

        const totalCount = await getDbLength();
        const jobs = await getJobs(
          undefined,
          undefined,
          undefined,
          undefined,
          pageSize
        );
        let lastIndex;
        // if (totalCount === jobsSnapshot.docs.length) {
        //   setLoadMoreText(false);
        // }
        if (totalCount > jobs.length) {
          setLoadMoreText(true);
        }

        setJobsNumber(totalCount);
        setJobsToDisplay(jobs);
        lastIndex = jobs[jobs.length - 1]._id;

        setLastId(lastIndex);
      } catch (error) {
        // console.log(error);
      }
      setLoading(false);
    };

    onMountFetchData(setLoading);
    document.title = "Buscar Trabajos";

    // console.log("mounting");
    // fetchJobs();
  }, []);

  // use effect to fetch all jobs or saved filters

  return (
    <div>
      <Navbar scrollPast={true} />
      <div className="w100 flx-center flx-col skip-navbar-margin">
        <div
          className="flx-col  w100"
          style={{ minHeight: "100vh", alignItems: "center" }}
        >
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
                  placeholder="Ciudad, País"
                />

                <button
                  className={` search-btn ${
                    grayButton ? "bg-laburo-gray" : "bg-laburo-green"
                  }`}
                  disabled={loading}
                >
                  Buscar
                </button>
              </div>
            </form>

            <div className="flx space-btwn w100  filters-menu">
              <div>{jobsnumber} resultados</div>
              {/* <div className="order-dropdown">
              <TuneIcon />
            </div> */}
            </div>
            {/* positions here  */}
            <div className="w100 mb-25">
              {jobsToDisplay?.length === 0 && (
                <div className="flx flx-center mt-25 ">
                  <div style={{ fontSize: "18px", textAlign: "center" }}>
                    😔 Lo sentimos, no pudimos encontrar nada con tu búsqueda.
                    ¡Inténtalo de nuevo!
                  </div>
                </div>
              )}

              {jobsToDisplay?.map((job, index) =>
                job.recieveViaEmail ? (
                  <a
                    href={`/job-des/?id=${job._id}`}
                    target="_blank" // Opens the link in a new tab
                    rel="noopener noreferrer" // Security measure for links to open in a new tab
                    key={index}
                    className="link-style"
                  >
                    <JobPost currJob={job as JobInt} />
                  </a>
                ) : (
                  <a
                    href={job.recieveEmail}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-style"
                  >
                    <JobPost currJob={job as JobInt} />
                  </a>
                )
              )}
            </div>

            <LoadingWidget loading={loading} />

            <button
              className={`button  ${
                loadMoreText ? "laburo-green" : "laburo-gray"
              }`}
              style={{ fontSize: "18px" }}
              onClick={() => {
                setLoadMoreText(false);

                if (loadMoreText) {
                  getMoreJobs();
                }
              }}
              disabled={!loadMoreText}
            >
              Cargar Más
            </button>
          </div>
          <Footer type={2} />
        </div>
      </div>
    </div>
  );
}

export default Jobs;
