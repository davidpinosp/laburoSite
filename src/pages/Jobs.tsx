import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/styles/jobs.css";
import JobPost from "../components/JobPost";
function Jobs() {
  const [jobsnumber, setJobsNumber] = useState(12345);
  const jobPositions = [
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
  ];

  const fetchJobs = () => {
    // get the jobs from firebase
    // get length
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
              placeholder="Buscar "
            />
          </div>

          <div className="search-pill">
            <input
              type="text"
              className="search-pill-input"
              placeholder="Ubicación"
            />
          </div>
          <div className="bg-laburo-green search-btn">Boton Buscar</div>
        </div>
        <div className="flx space-btwn w100 mt-25">
          <div>{jobsnumber} resultados</div>
          <div className="order-dropdown">Ordenar </div>
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
