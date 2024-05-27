import React from "react";
import "../assets/styles/navbar.css";
import "../assets/styles/global.css";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useState } from "react";

interface navProps {
  scrollPast: boolean;
  hidePublish?: boolean;
  hideSearch?: boolean;
  lockNavbar?: boolean;
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
        position: props.lockNavbar ? "static" : "fixed",
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
        className="flx  flx-center nav-inner-container "
        style={{
          justifyContent: "right",
          height: "100%",
          alignItems: "center",
        }}
      >
        {/* mobile */}
        <div
          className="flx "
          style={{
            alignItems: "center",

            gap: "20px",
          }}
        >
          <Link
            to="/post-job"
            className="mobile-only w100"
            style={{
              display: "flex",
              height: "100%",

              textDecoration: "none",
            }}
          >
            <div className="post-job-mobile-btn mobile-only">
              <div>Contratar</div>
            </div>
          </Link>

          <div
            onClick={toggleMenu}
            className="mobile-only  "
            style={{ height: "100%" }}
          >
            <MenuIcon
              style={{
                fontSize: "30px",
                display: "flex",
                height: "100%",
                justifyContent: "center",
                color: `${props.scrollPast ? "black" : "white"}`,
              }}
            />
          </div>
        </div>
        {/* desktop */}
        <div className="flx " style={{ alignItems: "baseline", width: "100%" }}>
          <div
            className="txt-s4 desktop-only nav-text-desk-search "
            style={{
              color: `${props.scrollPast ? "black" : "white"}`,
            }}
          >
            <Link to={"/jobs"} style={{ whiteSpace: "nowrap" }}>
              Buscar Trabajos
            </Link>
          </div>
          <Link
            to={"/post-job"}
            className="txt-s4 desktop-only nav-text nav-txt-desk-job link-style"
            style={{
              whiteSpace: "nowrap",
            }}
          >
            Contratar con Laburo
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
              Contratar con Laburo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
