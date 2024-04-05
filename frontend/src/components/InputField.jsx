import React from "react";

const InputField = ({
  label,
  type = "text",
  error,
  max,
  value,
  handleChange,
  placeholder,
}) => {
  return (
    <div className={`input-field ${error !== "" && "error"}`}>
      <label
        htmlFor={label == "contactOrUsername" ? "cou" : label}
        className={value != "" ? "focus" : ""}
      >
        {label == "contactOrUsername" ? "Contact Number Or Username" : label}
      </label>
      <input
        type={type}
        id={label == "contactOrUsername" ? "cou" : label}
        maxLength={max}
        name={label}
        value={value}
        onChange={handleChange}
        placeholder={placeholder ? placeholder : ""}
      />
      <span className="error-message">{error}</span>
    </div>
  );
};

export default InputField;
