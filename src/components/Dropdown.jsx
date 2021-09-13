import { useRef, useState } from "react";
import "./Dropdown.scss";
import ArrowImage from "../assets/arrow_down.svg";
import useOnClickOutside from "../hooks/clickOutside";

export default function Dropdown({ list, value, onSelect }) {
  const dropDownList = Object.keys(list);

  const [expanded, setExpanded] = useState(false);

  function onOptionSelect(key) {
    onSelect(list[key]);
  }

  // Use a reference to the parent element to detect if the user
  // clicks outside the dropdown to close it
  const containerRef = useRef();
  useOnClickOutside(containerRef, () => setExpanded(false));

  return (
    <>
      <div
        className="dropdown"
        onClick={() => setExpanded(!expanded)}
        ref={containerRef}
      >
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
