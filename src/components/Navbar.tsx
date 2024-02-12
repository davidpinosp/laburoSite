import React from "react";
import "../assets/styles/navbar.css";
import "../assets/styles/global.css";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useState, useRef } from "react";
function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const dropDownRef = useRef(null);
  const toggleMenu = () => {
    setNavOpen(!navOpen);
  };

  const handleOutsideClick = () => {
    setNavOpen(false);
  };
  return (
    <div className="nav-container">
      <div className="txt-s5">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          Laburo
        </Link>
      </div>
      <div
        className="flx space-btwn flx-center nav-inner-container"
        style={{ minWidth: "200px" }}
      >
        <div className="bg-laburo-green post-job-btn ">
          <div>
            <Link
              to="/post-job"
              style={{ textDecoration: "none", color: "white" }}
            >
              Publica un Trabajo
            </Link>
          </div>
        </div>
        <div>
          <PersonOutlineIcon style={{ fontSize: "30px" }} />
        </div>
        <div onClick={toggleMenu}>
          <MenuIcon style={{ fontSize: "30px" }} />
        </div>
      </div>
      {/* nav menu */}

      {navOpen && (
        <div className="nav-menu-block" onClick={handleOutsideClick}></div>
      )}

      <div className={`nav-menu ${navOpen ? "open" : ""}`}>
        <div className="nav-menu-items">
          <div>
            <Link to="/" className="link-style">
              Pagina Principal
            </Link>
          </div>
          <div>
            <Link to="/jobs" className="link-style">
              Buscar Trabajos
            </Link>
          </div>
          <div>
            <Link to="/post-job" className="link-style">
              Publicar un Trabajo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
