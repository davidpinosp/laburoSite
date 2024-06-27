import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SubBar from "../components/dashboard/SubBar";
import Positions from "../components/dashboard/Positions";
import Applicants from "../components/dashboard/Applicants";
import { getPostedJobsById } from "../utils/applicantFunctions";
import { getAuth } from "firebase/auth";
import { JobInt } from "../typescript/interfaces/JobInterface";
import LoadingWidget from "../components/widgets/LoadingWidget";

function Dashboard() {
  const [selectedPage, setSelectedPage] = useState(() => {
    return localStorage.getItem("currentPage") || "vacantes";
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currPositions, setCurrPositions] = useState<JobInt[] | undefined>();
  const auth = getAuth();
  const getInitialPositions = useCallback(async () => {
    if (auth.currentUser) {
      try {
        const user = auth.currentUser.email;
        const positions = await getPostedJobsById(user as string);
        setCurrPositions(positions);
        console.log(positions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    }
  }, [auth]);

  useEffect(() => {
    getInitialPositions();
  }, [getInitialPositions]);

  useEffect(() => {
    // Store the current page number in localStorage
    localStorage.setItem("currentPage", selectedPage);
    console.log(selectedPage);
  }, [selectedPage]);

  return (
    <div className="w100 flx flx-col " style={{ minHeight: "100vh" }}>
      <Navbar scrollPast={true} lockNavbar={true} highlightDash={true} />
      <SubBar setSelectedPage={setSelectedPage} loading={isLoading} />
      {/* content */}

      <div>
        {!isLoading && currPositions ? (
          selectedPage === "vacantes" ? (
            <Positions
              positions={currPositions}
              getPositions={getInitialPositions}
            />
          ) : currPositions.length > 0 ? (
            <Applicants jobs={currPositions} />
          ) : (
            <div className="flx flx-center mt-50 txt-s4">
              {" "}
              Añade una vacante para recibir aplicantes
            </div>
          )
        ) : (
          <div className="flx flx-center mt-25">
            <LoadingWidget loading={isLoading} />
          </div>
        )}
      </div>

      {/* 
      <SignOut /> */}
    </div>
  );
}

export default Dashboard;
