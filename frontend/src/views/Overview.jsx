import React from "react";
import "../styles/overview.css";
import { useNavigate } from "react-router-dom";
const Overview = () => {
  const navigate = useNavigate();

  //   pass the count of the categories here
  const Card = ({ icon, text, path }) => (
    <div className="card" onClick={() => navigate(`/admin/inventory/${path}`)}>
      <img src={`/images/${icon}.png`} alt="Inventory" />
      <p>{text}</p>
    </div>
  );

  return (
    <div className="overview-container">
      <h2> INVENTORY OVERVIEW </h2>
      <div className="overview-wrapper">
        <div className="overview-card-container">
          <Card
            icon={"product-list"}
            text={"100 products in the inventory"}
            path={"list"}
          />
          <Card
            icon={"recent-add"}
            text={"10 recent restocked products"}
            path={"recent-stock"}
          />
          <Card
            icon={"recent-sold"}
            text={"7 products recently sold"}
            path={"recent-sold"}
          />
          <Card
            icon={"critical"}
            text={"20 products need restocking"}
            path={"critical"}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
