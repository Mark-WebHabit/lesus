import React, { useEffect, useState } from "react";
import "../styles/Inventory.css";
import { useSelector, useDispatch } from "react-redux";

// compoennts
import FilterContainer from "../components/FilterContainer";
import ProductTable from "../components/ProductTable";
import AddProductModal from "../components/AddProductModal";
import ViewProductModal from "../components/ViewProductModal";
import EditProductModal from "../components/EditProductModal";
import SellProductModal from "../components/SellProductModal";

// state
import { setSortedProducts } from "../app/features/inventorySlice";

const Inventory = () => {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);
  // if this id has a value it will trigger the view modal
  const [viewId, setViewId] = useState("");
  const [editId, setEditId] = useState("");

  const [search, setSearch] = useState("");
  const stocks = useSelector((state) => state.inventory.products);
  const [products, setProducts] = useState();

  // logics
  // listen for search changes
  useEffect(() => {
    const result = stocks.filter((stock) =>
      stock.product_name.toLowerCase().includes(search.toLowerCase())
    );
    if (result) {
      setProducts(result);
    } else {
      setProducts(stocks);
    }
  }, [search, stocks]);
  // trigger the view
  useEffect(() => {
    if (viewId) {
      setShowProductModal(true);
    } else {
      setShowProductModal(false);
    }
  }, [viewId]);

  // trigger the edit modal
  useEffect(() => {
    if (editId) {
      setShowEditModal(true);
    } else {
      setShowEditModal(false);
    }
  }, [editId]);

  const handleToggleAddProductModal = () => {
    setShowAddProductModal(!showAddProductModal);
  };
  const handleToggleViewProductModal = (id = null) => {
    setViewId(id);
  };
  const handleToggleEditProductModal = (id = null) => {
    setEditId(id);
  };

  return (
    <div className="inventory-container">
      {sellModal && <SellProductModal setSellModal={setSellModal} />}
      {showEditModal && (
        <EditProductModal
          editId={editId}
          handleToggleEditProductModal={handleToggleEditProductModal}
        />
      )}
      {showAddProductModal && !showProductModal && (
        <AddProductModal
          handleToggleAddProductModal={handleToggleAddProductModal}
        />
      )}
      {showProductModal && !showAddProductModal && (
        <ViewProductModal
          viewId={viewId}
          handleToggleViewProductModal={handleToggleViewProductModal}
        />
      )}
      {/* pass the page parameter here */}
      <h1>STOCKS {">"} ALL</h1>
      <FilterContainer
        handleToggleAddProductModal={handleToggleAddProductModal}
        setSellModal={setSellModal}
        setSearch={setSearch}
        search={search}
      />
      <button id="sell" onClick={() => setSellModal(true)}>
        <img src="/images/walkin.png" alt="walkin" />
        <span>SELL</span>
      </button>
      <div className="table-container">
        <ProductTable
          handleToggleEditProductModal={handleToggleEditProductModal}
          handleToggleViewProductModal={handleToggleViewProductModal}
          products={products}
        />
      </div>
    </div>
  );
};

export default Inventory;
