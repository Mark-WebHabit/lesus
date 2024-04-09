import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../styles/AddModal.css";
import LogoSvg from "../assets/Logo";
import { addProduct, fetchAllProducts } from "../app/features/inventorySlice";

const AddProductModal = ({ handleToggleAddProductModal }) => {
  const [datas, setDatas] = useState({
    productName: "",
    modelNo: "",
    color: "",
    size: "",
    price: "",
    images: [],
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setError("");
    setDatas({ ...datas, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { productName, modelNo, color, size, price, images } = datas;
    if (
      productName === "" ||
      size === "" ||
      color === "" ||
      price === "" ||
      modelNo === ""
    ) {
      setError("All fields are required");
      return;
    }

    if (isNaN(price)) {
      setError("Invalid Price Format");
      return;
    }

    await dispatch(
      addProduct({
        productName: productName.toLowerCase(),
        modelNo,
        color: color.toLowerCase(),
        size,
        price,
        images,
      })
    );
    await dispatch(fetchAllProducts());
    setDatas({
      productName: "",
      modelNo: "",
      color: "",
      size: "",
      price: "",
      images: [],
    });
    setError("");
    handleToggleAddProductModal();
  };

  // extra component
  const ImageIndicator = ({ filename, event }) => {
    return (
      <div className="image-indicator">
        <span>file.jpg</span>
        <img src="/images/x.png" alt="close" />
      </div>
    );
  };

  return (
    <div className="add-modal-continaer">
      <div className="add-modal-wrapper">
        <div className="add-modal-flex">
          <div className="image-container">
            <LogoSvg />
            {/* <img src="" alt="" /> */}
            <input type="file" name="" id="" accept="jpg, jpeg" />
            <button className="upload">UPLOAD</button>
          </div>
          <div className="add-product">
            <p className="error">{error}</p>

            <div className="input-wrapper">
              <div className="input">
                <label htmlFor="product-name">Name || Brand</label>
                <input
                  maxLength={100}
                  type="text"
                  name="productName"
                  id="product-name"
                  onChange={handleChange}
                  value={datas.productName}
                />
              </div>
              <div className="input">
                <label htmlFor="price">Price</label>
                <input
                  maxLength={100}
                  type="text"
                  name="price"
                  id="price"
                  onChange={handleChange}
                  value={datas.price}
                />
              </div>
              <div className="input">
                <label htmlFor="size">Model Number</label>
                <input
                  maxLength={100}
                  type="text"
                  name="modelNo"
                  id="size"
                  onChange={handleChange}
                  value={datas.modelNo}
                />
              </div>
              <div className="input half">
                <label htmlFor="size">Size</label>
                <input
                  maxLength={100}
                  type="text"
                  name="size"
                  id="size"
                  value={datas.size}
                  onChange={handleChange}
                />
              </div>

              <div className="input half">
                <label htmlFor="color">Color</label>
                <input
                  maxLength={100}
                  type="text"
                  name="color"
                  id="color"
                  value={datas.color}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="button">
              <button className="cancel" onClick={handleToggleAddProductModal}>
                CANCEL
              </button>
              <button className="submit" onClick={handleSubmit}>
                SUBMIT
              </button>
            </div>
          </div>
        </div>
        <div className="image-list"></div>
      </div>
    </div>
  );
};

export default AddProductModal;
