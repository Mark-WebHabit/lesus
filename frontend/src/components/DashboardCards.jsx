import React from "react";

const DashboardCards = () => {
  const Card = ({ title, data, description }) => (
    <div className="card">
      <div className="card-header">
        <span className="title">{title}</span>
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

  return (
    <>
      <Card
        title={"Total sales"}
        data={"10,000"}
        description={"Accumulated SAles"}
      />
      <Card
        title={"Total sales"}
        data={"10,000"}
        description={"Accumulated SAles"}
      />
      <Card
        title={"Total sales"}
        data={"10,000"}
        description={"Accumulated SAles"}
      />
      <Card
        title={"Total sales"}
        data={"10,000"}
        description={"Accumulated SAles"}
      />
      <Card
        title={"Total sales"}
        data={"10,000"}
        description={"Accumulated SAles"}
      />
    </>
  );
};

export default DashboardCards;
