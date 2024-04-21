import React from "react";
import "../assets/styles/navbar.css";
import "../assets/styles/global.css";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useState } from "react";

interface navProps {
  scrollPast: boolean;
}
function Navbar(props: navProps) {
  const [navOpen, setNavOpen] = useState(false);
  const toggleMenu = () => {
    setNavOpen(!navOpen);
  };

  const handleOutsideClick = () => {
    setNavOpen(false);
  };
  return (
    <div
      className="nav-container"
      style={{
        backgroundColor: `${props.scrollPast ? "white" : ""}`,
      }}
    >
      <div className="laburo-logo-txt">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: `${props.scrollPast ? "black" : "white"}`,
          }}
        >
          Laburo
        </Link>
      </div>
      <div
        className="flx space-btwn flx-center nav-inner-container"
        style={{ minWidth: "150px" }}
      >
        <div className="bg-laburo-green post-job-btn flx flx-center mobile-only">
          <Link
            to="/post-job"
            style={{
              textDecoration: "none",
            }}
          >
            <div>Publicar</div>
          </Link>
        </div>
        {/* <div>
          <PersonOutlineIcon style={{ fontSize: "30px" }} />
        </div> */}
        <div onClick={toggleMenu} className="mobile-only ">
          <MenuIcon
            style={{
              fontSize: "30px",
              color: `${props.scrollPast ? "black" : "white"}`,
            }}
          />
        </div>
        <div className="flx " style={{ alignItems: "baseline" }}>
          <div
            className="txt-s4 desktop-only nav-text-desk-search"
            style={{
              color: `${props.scrollPast ? "black" : "white"}`,
            }}
          >
            <Link to={"/jobs"}>Buscar Trabajos</Link>
          </div>
          <Link
            to={"/post-job"}
            className="txt-s4 desktop-only nav-text nav-txt-desk-job link-style"
            style={{
              marginRight: "40px",
            }}
          >
            Publicar un Trabajo
          </Link>
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
