import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sortProducts,
  setSortFilter,
  setSortStateMode,
} from "../app/features/inventorySlice";
const FilterContainer = ({
  handleToggleAddProductModal,
  setSearch,
  search,
}) => {
  const dispatch = useDispatch();
  const { mode, sortFilter } = useSelector((state) => state.inventory);

  const handleModeChange = () => {
    if (mode == "asc") {
      dispatch(setSortStateMode("desc"));
    } else {
      dispatch(setSortStateMode("asc"));
    }
  };

  const handleFilterChange = (e) => {
    dispatch(setSortFilter(e.target.value));
  };
  useEffect(() => {
    dispatch(sortProducts());
  }, [mode, sortFilter]);

  return (
    <div className="filter-container">
      <div className="search-product">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search Product via Name "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src="/images/search.png" alt="Search" />
      </div>

      <div className="filter-product">
        <div className="sort-icon" onClick={handleModeChange}>
          <img src="/images/sort.png" alt="Sort" />
          <p>{mode.toUpperCase()}</p>
        </div>
        <select name="" id="" onChange={handleFilterChange}>
          <option value=""></option>
          <option value="brand">NAME</option>
          <option value="price">PRICE</option>
        </select>
      </div>

      <div className="add-product" onClick={handleToggleAddProductModal}>
        <img src="/images/plus.png" alt="Add" />
        <p>Add Product</p>
      </div>
    </div>
  );
};

export default FilterContainer;
