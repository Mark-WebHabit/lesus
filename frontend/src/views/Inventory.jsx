import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/Inventory.css";

// compoennts
import FilterContainer from "../components/FilterContainer";
import ProductTable from "../components/ProductTable";

const Inventory = () => {
  return (
    <div className="inventory-container">
      {/* pass the page parameter here */}
      <h1>STOCKS {">"} ALL</h1>
      <FilterContainer />
      <div className="table-container">
        <ProductTable />
      </div>
    </div>
  );
};

export default Inventory;
