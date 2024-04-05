import React from "react";
import "../styles/Alert.css";

const AlertComponent = ({ text, hide }) => {
  return (
    <div className="alert-container">
      <div className="alert-modal">
        <p>{text}</p>
        <div className="button">
          <button onClick={hide}>UNDERSTOOD</button>
        </div>
      </div>
    </div>
  );
};

export default AlertComponent;
