import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/styles/jobs.css";
import JobPost from "../components/JobPost";
import TuneIcon from "@mui/icons-material/Tune";
import { Button } from "@mui/material";
interface PostProps {
  position: string;
  company: string;
  location: string;
  salary?: string;
  posted?: Date;
}
function Jobs() {
  const [jobsnumber, setJobsNumber] = useState(12345);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<PostProps[]>([]); // Provide an initial value as an empty array
  const [jobPositions, setJobPositions] = useState<PostProps[]>([
    {
      position: "Analista de Servicio al Cliente",
      company: "Pydaco Cía Ltda",
      location: "Quito, Ecuador",
    },
    {
      position: "Desarrollador Frontend",
      company: "TechSolutions",
      location: "Guayaquil, Ecuador",
    },
    {
      position: "Diseñador Gráfico",
      company: "Creativos Studio",
      location: "Cuenca, Ecuador",
    },
    {
      position: "Ingeniero de Software",
      company: "InnovateTech",
      location: "Quito, Ecuador",
    },
    // Add more job positions as needed
  ]);

  const handleMouseEnter = (e: any) => {
    e.target.style.background = "";
  };
  const handleMouseLeave = (e: any) => {
    e.target.style.background = "maroon";
  };

  const fetchJobs = () => {
    // get the jobs from firebase
    // get length
    const filtered = jobPositions.filter(
      (jobs) => jobs.location === "Quito, Ecuador"
    );
    setJobPositions(filtered);
  };

  const searchJobs = (query: string) => {
    // get query and filter from available jobs
  };

  return (
    <div>
      <Navbar />
      <div className="flx-col flx-center job-page-container">
        <div className="search-container">
          <div className="search-pill">
            <input
              type="text"
              className="search-pill-input"
              placeholder="Posición "
            />
          </div>

          <div className="search-pill">
            <input
              type="text"
              className="search-pill-input"
              placeholder="Ubicación"
            />
          </div>
          <div
            className="bg-laburo-green search-btn"
            onClick={() => {
              fetchJobs();
            }}
          >
            Buscar
          </div>
        </div>
        <div className="flx space-btwn w100  filters-menu">
          <div>{jobsnumber} resultados</div>
          <div className="order-dropdown">
            <TuneIcon />
          </div>
        </div>
        {/* positions here  */}
        <div className="w100 mb-25">
          {jobPositions.map((job, index) => (
            <JobPost
              key={index}
              position={job.position}
              company={job.company}
              location={job.location}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Jobs;
