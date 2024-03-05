import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/styles/jobs.css";
import JobPost from "../components/JobPost";
// import TuneIcon from "@mui/icons-material/Tune";
import {
  getCollectionLength,
  getJobSnapshot,
  getJobsByLocationAndPosition,
} from "../utils/jobsUtils";
import {
  DocumentData,
  DocumentSnapshot,
  collection,
  getCountFromServer,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import AutocompleteLocation from "../components/AutocompleteLocation";
import { db } from "../firebase";
interface LocationData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}
function Jobs() {
  const [jobsnumber, setJobsNumber] = useState(0);

  const [selectedLocation, setSelectedLocation] = useState<LocationData>();
  const [loadMoreText, setLoadMoreText] = useState(true);
  const [grayButton, setGrayButton] = useState(true);
  const [positionValue, setPositionValue] = useState("");

  const [lastSnapshot, setLastSnapshot] =
    useState<DocumentSnapshot<DocumentData, DocumentData>>();
  // const [jobPositions, setJobPositions] =
  //   useState<{ data: DocumentData; id: string }[]>();
  const [filteredJobs, setFilteredJobs] =
    useState<{ data: DocumentData; id: string }[]>();

  // const fetchJobs = useCallback(async () => {
  //   console.log("fetching jobs");
  //   getJobsToDisplay();
  // }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // handle which filters to use
    getJobsToDisplay();
    setLoadMoreText(true);
    setGrayButton(true);
  };
  const getJobsToDisplay = async () => {
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

        console.log(selectedLocation);
      } else {
        console.log("no results found ");
        // setJobPositions([]);
        setFilteredJobs([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreJobs = async () => {
    // pass last job

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

          console.log("next job" + element.data);
        });

        if (filteredJobs?.length === jobsnumber) {
          setLoadMoreText(false);
        }
      } else {
        setLoadMoreText(false);
        console.log("no more jobs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const onMountFetchData = async () => {
      try {
        const jobsCollection = collection(db, "job");
        let q = query(jobsCollection);
        const snapshot = await getCountFromServer(q);

        const jobsSnapshot = await getDocs(query(q, limit(3)));

        setJobsNumber(snapshot.data().count);
        const jobsData = jobsSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        const index = jobsSnapshot.docs[jobsSnapshot.docs.length - 1].id;
        setLastSnapshot(await getJobSnapshot(index));
        setFilteredJobs(jobsData);
      } catch (error) {
        console.log(error);
      }
    };
    onMountFetchData();
    console.log("mounting");
    // fetchJobs();
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
            {/* <div className="order-dropdown">
              <TuneIcon />
            </div> */}
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
                      ? job.data.location.city +
                        ", " +
                        job.data.location.country
                      : " "
                  }
                />
              </Link>
            ))}
          </div>

          <div
            className={`${loadMoreText ? "laburo-green" : "laburo-gray"}`}
            onClick={loadMoreText ? getMoreJobs : undefined}
          >
            Cargar Más
          </div>
        </div>
        <Footer type={2} />
      </div>
    </div>
  );
}

export default Jobs;
