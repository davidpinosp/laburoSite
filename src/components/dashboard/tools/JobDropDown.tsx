import React, { useState } from "react";
import { OptionsInt } from "../../../typescript/interfaces/AppInterface";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// Define types for the options and component props

interface DropdownProps {
  options: OptionsInt[];
  value: OptionsInt;
  onSelect: (option: OptionsInt) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionsInt | null>(
    value
  );

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: OptionsInt) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="applicant-dropdown">
      <div className="applicant-dropdown-box">
        <div
          className={`applicant-dropdown-header ${isOpen ? " adl-open" : ""}`}
          onClick={handleToggle}
        >
          {value.label}
          <span className="applicant-dropdown-arrow">
            {isOpen ? (
              <ArrowDropDownIcon style={{ transform: "rotate(180deg)" }} />
            ) : (
              <ArrowDropDownIcon />
            )}
          </span>
        </div>
        {isOpen && (
          <ul className="applicant-dropdown-list">
            {options.map(
              (option, index) =>
                option.label !== selectedOption?.label && (
                  <div
                    key={index}
                    className="applicant-dropdown-list-item"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.label}
                  </div>
                )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
