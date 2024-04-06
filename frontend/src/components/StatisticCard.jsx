import React from "react";

const StatisticCard = ({
  title,
  data,
  description,
  options = null,
  event = null,
}) => {
  const handleChange = (e) => {
    if (event) {
      event(e);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="title">{title}</span>
        {options && (
          <select name="" id="" onChange={handleChange}>
            {options &&
              options.map((opt, index) => {
                return (
                  <option value={opt.value} key={index}>
                    {opt.text}
                  </option>
                );
              })}
          </select>
        )}
      </div>
      <div className="card-info">
        <h2>{data}</h2>
        <p>{description}</p>
        <div className="view-indicator">
          <img src="/images/view.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;
