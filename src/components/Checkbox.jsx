import "./Checkbox.scss";
import checkmarkImage from "../assets/Check.svg";

export default function Checkbox({ label, checked, onCheckedChanged }) {
  return (
    <div
      className={checked ? "checkbox checkbox--checked" : "checkbox"}
      onClick={onCheckedChanged}
    >
      <div className="checkbox__input">
        {checked && <img src={checkmarkImage} alt="" />}
      </div>
      <span>{label}</span>
    </div>
  );
}
