import React, { useEffect } from "react";
import "../assets/styles/navbar.css";
import "../assets/styles/global.css";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useState } from "react";
import { Dashboard, Person } from "@mui/icons-material";
import { getAuth, signOut } from "firebase/auth";
import { user } from "firebase-functions/v1/auth";
import useAuth from "../utils/useAuth";

interface navProps {
  scrollPast: boolean;
  hidePublish?: boolean;
  hideSearch?: boolean;
  hideDash?: boolean;
  hideSignIn?: boolean;
  lockNavbar?: boolean;
  highlightJobs?: boolean;
  highlightLogin?: boolean;
  highlightPost?: boolean;
  highlightDash?: boolean;
}
function Navbar(props: navProps) {
  const auth = getAuth();
  const { loading, user } = useAuth();
  const [navOpen, setNavOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const toggleMenu = () => {
    setNavOpen(!navOpen);
  };

  const handleOutsideClick = () => {
    setNavOpen(false);
  };

  // useEffect(() => {
  //   const auth = getAuth();
  //   const user = auth.currentUser;

  //   if (user != null) {
  //     setShowDashboard(true);
  //   }
  // }, []);
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
      <div className=" nav-inner-container ">
        {/* mobile */}
        <div
          className="flx "
          style={{
            gap: "20px",
            width: "100%",
            justifyContent: "right",
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
        <div
          className="flx "
          style={{ alignItems: "center", width: "100%", gap: "20px" }}
        >
          <div
            className="txt-s4 desktop-only nav-text-desk-search "
            style={{
              color: `${props.scrollPast ? "black" : "white"}`,
              opacity: props.highlightJobs ? "0.2" : "1",
            }}
          >
            <Link to={"/jobs"} style={{ whiteSpace: "nowrap" }}>
              Buscar Trabajos
            </Link>
          </div>
          <div
            className="person-icon txt-s4"
            style={{
              height: "100%",
              display: "flex",
              alignItems: "baseline",
            }}
          >
            {user != null ? (
              <Link
                className="desktop-only"
                to="/dashboard"
                style={{
                  color: `${props.scrollPast ? "black" : "white"}`,
                  opacity: props.highlightDash ? "0.2" : "1",
                }}
              >
                Panel de Control
              </Link>
            ) : (
              <div
                className="txt-s4 desktop-only nav-text-desk-search "
                style={{
                  color: `${props.scrollPast ? "black" : "white"}`,
                  opacity: props.highlightLogin ? "0.2" : "1",
                }}
              >
                {!props.hideSignIn && (
                  <Link to={"/ingresar"} style={{ whiteSpace: "nowrap" }}>
                    Iniciar Sesión
                  </Link>
                )}
              </div>
            )}
          </div>

          {user === null ? (
            <Link
              to={"/post-job"}
              className="txt-s4 desktop-only nav-text nav-txt-desk-job link-style"
              style={{
                whiteSpace: "nowrap",
                opacity: props.highlightPost ? "0.2" : "1",
              }}
            >
              Contratar con Laburo
            </Link>
          ) : (
            <button
              className="txt-s4 desktop-only cursor-pointer"
              onClick={() => signOut(auth)}
              style={{
                color: `${props.scrollPast ? "black" : "white"}`,
                backgroundColor: "inherit",
              }}
            >
              Cerrar Sesión
            </button>
          )}
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
          <div>
            <Link to="/ingresar" className="link-style laburo-green">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
