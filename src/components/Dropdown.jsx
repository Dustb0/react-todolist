import { useState } from "react";
import "./Dropdown.scss";
import ArrowImage from "../assets/arrow_down.svg";

export default function Dropdown({ list, value, onSelect }) {
  const dropDownList = Object.keys(list);

  const [expanded, setExpanded] = useState(false);

  function onOptionSelect(key) {
    onSelect(list[key]);
  }

  return (
    <>
      <div className="dropdown" onClick={() => setExpanded(!expanded)}>
        <div className="dropdown__selected-item">
          <span>{dropDownList[value]}</span>
          <img src={ArrowImage} />
        </div>
        {expanded && (
          <div className="dropdown__options">
            {dropDownList.map((key) => (
              <div
                key={key}
                className="dropdown__option"
                onClick={() => onOptionSelect(key)}
              >
                <span>{key}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
