import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/styles/jobs.css";

// import TuneIcon from "@mui/icons-material/Tune";
import { getDbLength, getJobs } from "../utils/jobsUtils";
import { LocationData } from "../typescript/interfaces/Location";

import location from "../assets/icons/location.png";
import business from "../assets/icons/business.png";
import AutocompleteLocation from "../components/AutocompleteLocation";
import "../assets/styles/jobsearchbar.css";
import LoadingWidget from "../components/widgets/LoadingWidget";
import { JobInt } from "../typescript/interfaces/JobInterface";
import JobSideDesc from "../components/job-sidebar/JobSideDesc";
import FiltersBar from "../components/FiltersBar";

function Jobs() {
  const [jobsnumber, setJobsNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filtersLoading, setFiltersLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<LocationData>();
  const [loadMoreText, setLoadMoreText] = useState(false);
  const [grayButton, setGrayButton] = useState(true);
  const [positionValue, setPositionValue] = useState("");
  const [initialRender, setInitialRender] = useState(true);
  // set filters
  const [filtersObject, setFiltersObject] = useState<{
    datePosted: string;
    inPerson: boolean | undefined;
    fullTime: boolean | undefined;
  }>({ datePosted: "", inPerson: undefined, fullTime: undefined });

  // refactor   -----------------------
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = useState(20);
  const [jobsToDisplay, setJobsToDisplay] = useState<JobInt[]>([]);
  const [lastId, setLastId] = useState("");
  const [lastDate, setLastDate] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    getJobsToDisplay();
    setGrayButton(true);
  };

  const getJobsToDisplay = async () => {
    setLoading(true);
    try {
      const jobResults = await getJobs(
        selectedLocation,
        positionValue,
        undefined,
        undefined,
        filtersObject,
        pageSize,
        setJobsNumber
      );

      if (jobResults.length > 0) {
        setLastId(jobResults[jobResults.length - 1]._id);
        setLastDate(
          new Date(jobResults[jobResults.length - 1].datePosted).toISOString()
        );
      }

      setJobsToDisplay(jobResults);
      setLoading(false);
      setLoadMoreText(jobResults.length >= pageSize);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getMoreJobs = async () => {
    setLoading(true);
    try {
      const moreJobs: JobInt[] = await getJobs(
        selectedLocation,
        positionValue,
        lastId,
        lastDate,
        filtersObject,
        pageSize
      );

      if (moreJobs.length > 0) {
        setLastId(moreJobs[moreJobs.length - 1]._id as string);
        setLastDate(
          new Date(moreJobs[moreJobs.length - 1].datePosted).toISOString()
        );
        setJobsToDisplay((prevJobs) => [...prevJobs, ...moreJobs]);
        setLoadMoreText(moreJobs.length >= pageSize);
      } else {
        setLoadMoreText(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const onMountFetchData = async () => {
      try {
        setLoading(true);
        const totalCount = await getDbLength();
        const jobs = await getJobs(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          pageSize
        );

        if (totalCount > jobs.length) {
          setLoadMoreText(true);
        }

        setJobsNumber(totalCount);
        setJobsToDisplay(jobs);

        if (jobs.length > 0) {
          setLastId(jobs[jobs.length - 1]._id);
          setLastDate(new Date(jobs[jobs.length - 1].datePosted).toISOString());
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    onMountFetchData();
    document.title = "Buscar Trabajos";
    setInitialRender(false);
  }, [pageSize]);

  useEffect(() => {
    const handleFilters = async () => {
      setFiltersLoading(true);
      if (!initialRender) {
        await getJobsToDisplay();
      }
      setFiltersLoading(false);
    };
    handleFilters();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersObject]);

  return (
    <div>
      <Navbar scrollPast={true} />
      <div className="w100 flx-center flx-col skip-navbar-margin">
        <div
          className="flx-col w100"
          style={{ minHeight: "100vh", alignItems: "center" }}
        >
          <div className="flx-col flx-center job-page-container">
            <form onSubmit={handleSubmit} className="hide">
              <div className="search-container">
                <div className="search-pill">
                  <input
                    type="text"
                    className="search-pill-input"
                    placeholder="Posición"
                    value={positionValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPositionValue(e.target.value);
                      setGrayButton(false);
                    }}
                  />
                </div>

                <AutocompleteLocation
                  setSelectedLocation={setSelectedLocation}
                  setGrayButton={setGrayButton}
                  placeholder="Ciudad, País"
                />

                <button
                  className={`search-btn ${
                    grayButton ? "bg-laburo-gray" : "bg-laburo-green"
                  }`}
                  disabled={loading}
                >
                  Buscar
                </button>
              </div>
            </form>
            <form
              onSubmit={handleSubmit}
              className="flx flx-center hide-for-phone"
            >
              <div className="jsb-container">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 0px",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <div className="jsb-input-field">
                    <img
                      src={business}
                      style={{ width: "20px", height: "20px" }}
                      alt=""
                    />
                    <input
                      type="text"
                      className="search-pill-input"
                      placeholder="Posición o Empresa"
                      value={positionValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPositionValue(e.target.value);
                        setGrayButton(false);
                      }}
                    />
                  </div>
                  <div className="jsb-line-search-separator"></div>
                  <div
                    className="jsb-input-field"
                    style={{ paddingRight: "5px" }}
                  >
                    <img
                      src={location}
                      style={{ width: "20px", height: "20px" }}
                      alt=""
                    />
                    <AutocompleteLocation
                      setSelectedLocation={setSelectedLocation}
                      setGrayButton={setGrayButton}
                      placeholder="Ciudad, País"
                      border={false}
                    />
                  </div>
                </div>

                <button
                  className={`search-btn jsb-search-btn ${
                    grayButton ? "bg-laburo-gray" : "bg-laburo-green"
                  }`}
                  disabled={loading}
                >
                  Buscar
                </button>
              </div>
            </form>

            <form
              onSubmit={handleSubmit}
              className="flx flx-center hide-for-desktop"
            >
              <div className="jsb-container jsb-mobile">
                <div className="jsb-mobile-input-bars">
                  <div className="jsb-input-field jsb-input-mobile">
                    <img
                      src={business}
                      style={{ width: "20px", height: "20px" }}
                      alt=""
                    />
                    <input
                      type="text"
                      className="search-pill-input"
                      placeholder="Posición o Empresa"
                      value={positionValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPositionValue(e.target.value);
                        setGrayButton(false);
                      }}
                    />
                  </div>

                  <div
                    className="jsb-input-field jsb-input-mobile"
                    style={{ paddingRight: "5px" }}
                  >
                    <img
                      src={location}
                      style={{ width: "20px", height: "20px" }}
                      alt=""
                    />
                    <AutocompleteLocation
                      setSelectedLocation={setSelectedLocation}
                      setGrayButton={setGrayButton}
                      placeholder="Ciudad, País"
                      border={false}
                    />
                  </div>
                </div>
                <div className="w100">
                  <button
                    className={`search-btn jsb-search-btn jsb-mobile-btn ${
                      grayButton ? "bg-laburo-gray" : "bg-laburo-green"
                    }`}
                    disabled={loading}
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </form>

            <FiltersBar filters={setFiltersObject} loading={filtersLoading} />
            <div
              className="flx space-btwn w100 filters-menu "
              style={{ marginTop: "25px" }}
            >
              <div>{jobsnumber} resultados</div>
            </div>

            <div className="w100 mb-25">
              {jobsToDisplay?.length === 0 && !loading && (
                <div className="flx flx-center mt-25">
                  <div style={{ fontSize: "18px", textAlign: "center" }}>
                    😔 Lo sentimos, no pudimos encontrar nada con tu búsqueda.
                    ¡Inténtalo de nuevo!
                  </div>
                </div>
              )}

              {/* <div className="hide">
                {jobsToDisplay?.map((job, index) =>
                  job.recieveViaEmail ? (
                    <a
                      href={`/job-des/?id=${job._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
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
              </div> */}

              <div>
                {jobsToDisplay.length > 0 && (
                  <JobSideDesc jobs={jobsToDisplay || []} />
                )}
              </div>
            </div>

            <LoadingWidget loading={loading} />

            <button
              className={`button ${
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
