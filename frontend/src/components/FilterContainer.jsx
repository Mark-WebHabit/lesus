import React from "react";

const FilterContainer = () => {
  return (
    <div className="filter-container">
      <div className="search-product">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search Product via Name or Prize"
        />
        <img src="/images/search.png" alt="Search" />
        <img src="/images/undo.png" alt="Search" />
      </div>

      <div className="filter-product">
        <div className="sort-icon">
          <img src="/images/sort.png" alt="Sort" />
          <p>ASC</p>
        </div>
        <select name="" id="">
          <option value=""></option>
          <option value="brand">NAME</option>
          <option value="price">PRICE</option>
          <option value="stocks">STOCKS</option>
        </select>
      </div>
    </div>
  );
};

export default FilterContainer;
