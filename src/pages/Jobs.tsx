import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/styles/jobs.css";
import JobPost from "../components/JobPost";
// import TuneIcon from "@mui/icons-material/Tune";
import {
  getJobSnapshot,
  getJobsByLocationAndPosition,
} from "../utils/jobsUtils";
import { LocationData } from "../typescript/interfaces/Location";
import {
  DocumentData,
  DocumentSnapshot,
  collection,
  getCountFromServer,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import AutocompleteLocation from "../components/AutocompleteLocation";
import { db } from "../firebase";
import LoadingWidget from "../components/widgets/LoadingWidget";

function Jobs() {
  const [jobsnumber, setJobsNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData>();
  const [loadMoreText, setLoadMoreText] = useState(false);
  const [grayButton, setGrayButton] = useState(true);
  const [positionValue, setPositionValue] = useState("");

  const [lastSnapshot, setLastSnapshot] =
    useState<DocumentSnapshot<DocumentData, DocumentData>>();

  const [filteredJobs, setFilteredJobs] =
    useState<{ data: DocumentData; id: string }[]>();

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
      // get jobs with filters
      const jobsList = await getJobsByLocationAndPosition(
        selectedLocation,
        positionValue,
        setJobsNumber
      );
      // set length

      if (jobsList.length > 0) {
        const lastIndex = jobsList[jobsList.length - 1].id;

        // get the length from function directly
        setLastSnapshot(await getJobSnapshot(lastIndex));

        // setJobPositions(jobsList);

        setFilteredJobs(jobsList);
      } else {
        // setJobPositions([]);
        setFilteredJobs([]);
      }

      setLoading(false);
      if (jobsList.length > 20) {
        setLoadMoreText(true);
      } else {
        setLoadMoreText(false);
      }
    } catch (error) {
      //  error
    }
  };

  const getMoreJobs = async () => {
    // pass last job
    setLoading(true);
    try {
      const moreJobs = await getJobsByLocationAndPosition(
        selectedLocation,
        positionValue,
        setJobsNumber,
        lastSnapshot
      );

      if (moreJobs.length > 0) {
        const lastIndex = moreJobs[moreJobs.length - 1].id;

        setLastSnapshot(await getJobSnapshot(lastIndex));

        moreJobs.forEach((element) => {
          filteredJobs?.push(element);

          // console.log("next job" + element.data);
        });

        if ((filteredJobs?.length as number) < jobsnumber) {
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
        const jobsCollection = collection(db, "job");
        let q = query(jobsCollection);
        q = query(q, where("status", "==", true));
        const snapshot = await getCountFromServer(q);

        const jobsSnapshot = await getDocs(query(q, limit(20)));
        const totalCount = snapshot.data().count;
        // if (totalCount === jobsSnapshot.docs.length) {
        //   setLoadMoreText(false);
        // }
        if (totalCount > 20) {
          setLoadMoreText(true);
        }
        setJobsNumber(totalCount);
        const jobsData = jobsSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        const index = jobsSnapshot.docs[jobsSnapshot.docs.length - 1].id;

        setLastSnapshot(await getJobSnapshot(index));
        setFilteredJobs(jobsData);
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
              {filteredJobs?.length === 0 && (
                <div className="flx flx-center mt-25 ">
                  <div style={{ fontSize: "18px", textAlign: "center" }}>
                    😔 Lo sentimos, no pudimos encontrar nada con tu búsqueda.
                    ¡Inténtalo de nuevo!
                  </div>
                </div>
              )}

              {filteredJobs?.map((job, index) => (
                <a
                  href={`/job-des/?id=${job.id}`}
                  target="_blank" // Opens the link in a new tab
                  rel="noopener noreferrer" // Security measure for links to open in a new tab
                  key={index}
                  className="link-style"
                >
                  <JobPost
                    position={job.data.title}
                    company={job.data.company}
                    location={
                      job.data.location.city
                        ? job.data.location.city +
                          ", " +
                          job.data.location.country
                        : " "
                    }
                  />
                </a>
              ))}
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
