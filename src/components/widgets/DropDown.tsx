import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import SlideLoader from "../animations/SlideLoader";

interface DropDownProps {
  setSelected?: React.Dispatch<React.SetStateAction<string>>;

  name: string;
  options: string[];
  loading: boolean;
  popup?: boolean;
}

function DropDown(props: DropDownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterSelected, setFilterSelected] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const htmlRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (htmlRef.current && !htmlRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    // document.body.classList.add("body-no-scroll");
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // document.body.classList.remove("body-no-scroll");
    };
  }, []);
  useEffect(() => {
    if (showDropdown === true && window.innerWidth < 750) {
      document.body.classList.add("body-no-scroll");
    }
    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [showDropdown]);
  return (
    <div ref={htmlRef}>
      <div
        className="dropdown-container"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div
          onClick={() => {
            console.log(showDropdown);
            setShowDropdown(!showDropdown);
          }}
        >
          {filterSelected ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                whiteSpace: "nowrap",
              }}
            >
              {filterSelected}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setFilterSelected("");
                  setSelectedValue("");
                  if (props.setSelected) {
                    props.setSelected("");
                  }
                }}
              >
                <CloseIcon style={{ fontSize: "18px" }} />
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ whiteSpace: "nowrap" }}>{props.name}</div>
              <ArrowDropDownIcon style={{ fontSize: "18px" }} />
            </div>
          )}
        </div>
        <SlideLoader visible={props.loading} />
      </div>
      {showDropdown && (
        <div>
          <div className="dropdown-content hide-for-phone">
            {props.options?.map((item, index) => {
              return (
                <div
                  className="drop-down-element"
                  key={index}
                  onClick={() => {
                    if (props.setSelected) {
                      props.setSelected(item);
                      setShowDropdown(false);
                      setFilterSelected(item);
                    }
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div className="dropdown-popup-container hide-for-desktop ">
            <div className="dropdown-popup-content">
              <div className="w100">
                <div
                  className="flx flx-center"
                  style={{ fontSize: "22px", position: "relative" }}
                >
                  {props.name}{" "}
                  <div
                    className="flx flx-center"
                    style={{ position: "absolute", right: 5, top: 0 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedValue("");
                      setShowDropdown(false);
                    }}
                  >
                    <CloseIcon />
                  </div>
                </div>
                <div className="dropdown-popup-divider"></div>
                <div className="dropdown-popup-items">
                  {props.options?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flx"
                        style={{
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          setSelectedValue(item);
                        }}
                      >
                        <div>{item}</div>
                        <div>
                          {selectedValue === item ? (
                            <div className="tof-dot-true">
                              {" "}
                              <CheckOutlinedIcon
                                style={{ color: "white", fontSize: "18px" }}
                              />{" "}
                            </div>
                          ) : (
                            <div
                              className={`${"tof-question-dot"}`}
                              style={{ border: "1px solid gray" }}
                            >
                              {" "}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="w100">
                <button
                  className="dropdown-popup-button"
                  onClick={() => {
                    if (props.setSelected) {
                      props?.setSelected(selectedValue);
                      setShowDropdown(false);
                      setFilterSelected(selectedValue);
                    }
                  }}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropDown;
