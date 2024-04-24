import React, { useEffect, useState, useRef } from "react";
import "../styles/SellProductModal.css";
import { useDispatch } from "react-redux";
import { getProductThruModelNumber } from "../app/features/inventorySlice";
import { walkInOrder } from "../app/features/salesSlice";
import { generateRandom10DigitNumber } from "../utilities/number";
import {
  updateAfterWalkInSell,
  updateOneObjectProduct,
} from "../app/features/inventorySlice";

// component
import OrderSummaryWalkIn from "./OrderSummaryWalkIn";
const SellProductModal = ({ setSellModal }) => {
  const [search, setSearch] = useState("");
  const [productReducedByOrder, setProductReducedByOrder] = useState([]);
  const [product, setProduct] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [orderQty, setOrderQty] = useState("");
  const searchRef = useRef();
  const [orderId, setOrderId] = useState(generateRandom10DigitNumber());

  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (!search) return;

    const response = await dispatch(getProductThruModelNumber(search));
    const data = response.payload.data;

    const hasExisitingOrder = productReducedByOrder.find(
      (product) => product._id === data._id
    );

    if (hasExisitingOrder) {
      setProduct(hasExisitingOrder);
    } else {
      setProduct(data);
    }
  };

  const hanldeSelectColor = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleSelectSize = (obj) => {
    setSelectedSize(obj);
  };

  const handleChangeQty = (e) => {
    if (!selectedSize?.stock) return;

    if (isNaN(e.target.value)) {
      return;
    }
    if (e.target.value > selectedSize.stock) return;
    if (e.target.value <= 0) return;

    setOrderQty(e.target.value);
  };

  useEffect(() => {
    if (!product || !product?.colors) return;
    setSelectedColor(product?.colors[0]?.color);
    setOrderQty("");
  }, [product]);

  useEffect(() => {
    if (!selectedColor || !product) return;
    const productIndex = product.colors.findIndex(
      (color) => color.color === selectedColor
    );

    setSizes(product.colors[productIndex].sizes);
  }, [selectedColor]);

  useEffect(() => {
    if (!product || !product?.colors || !selectedColor) return;
    setSelectedSize(product.colors[0].sizes[0]);
  }, [selectedColor, product]);

  const handleAddOrder = () => {
    if (
      !product?._id ||
      selectedColor == "" ||
      sizes == {} ||
      selectedSize == ""
    ) {
      return;
    }

    if (
      parseFloat(orderQty) > selectedSize.stock ||
      parseFloat(orderQty) == 0 ||
      !orderQty
    ) {
      return;
    }

    const confirmation = confirm("Confirm Order?");

    if (!confirmation) return;

    const orderProduct = {
      _id: product._id,
      product_name: product.product_name,
      sub_total: orderQty * product.price,
      price: product.price,
      colors: [{ color: selectedColor, sizes: [{ size: selectedSize.size }] }],
      qty: orderQty,
      orderId,
    };

    const colorIndex = product.colors.findIndex(
      (color) => color.color === selectedColor
    );
    const sizeIndex = product.colors[colorIndex].sizes.findIndex(
      (size) => size.size === selectedSize.size
    );

    product.colors[colorIndex].sizes[sizeIndex].stock =
      selectedSize.stock - parseFloat(orderQty);

    const exisitingEl = productReducedByOrder.findIndex(
      (val) => val._id === product._id
    );

    if (exisitingEl !== -1) {
      productReducedByOrder[exisitingEl] = product;
    } else {
      setProductReducedByOrder([...productReducedByOrder, product]);
    }
    setOrders([...orders, orderProduct]);
  };

  const handleRemove = (obj) => {
    const isExisitng = productReducedByOrder.findIndex(
      (prod) => prod._id === obj._id
    );
    if (isExisitng == -1) {
      return;
    }

    const colorIndex = productReducedByOrder[isExisitng].colors.findIndex(
      (color) => color.color === obj.colors[0].color
    );

    const sizeIndex = productReducedByOrder[isExisitng].colors[
      colorIndex
    ].sizes.findIndex((size) => size.size === obj.colors[0].sizes[0].size);

    productReducedByOrder[isExisitng].colors[colorIndex].sizes[
      sizeIndex
    ].stock += +obj.qty;

    if (product._id === obj._id) {
      const colorIndex = product.colors.findIndex(
        (color) => color.color == obj.colors[0].color
      );
      const sizeIndex = product.colors[colorIndex].sizes.findIndex(
        (size) => size.size == obj.colors[0].sizes[0].size
      );
    }
    setProduct(productReducedByOrder[isExisitng]);
    const newOrders = orders.filter((order) => order !== obj);
    setOrders(newOrders);
  };

  const handleComplete = () => {
    if (orders.length === 0) {
      return;
    }

    let newOrder = [];

    orders.forEach((order) => {
      const exisitingOrder = newOrder.findIndex((item) => {
        return item._id === order._id;
      });

      if (exisitingOrder !== -1) {
        const colorIndex = newOrder[exisitingOrder].colors.findIndex(
          (color) => color.color === order.colors[0].color
        );

        if (colorIndex !== -1) {
          const sizeIndex = newOrder[exisitingOrder].colors[
            colorIndex
          ].sizes.findIndex(
            (size) => size.size === order.colors[0].sizes[0].size
          );

          if (sizeIndex !== -1) {
            newOrder[exisitingOrder].colors[colorIndex].sizes[sizeIndex].qty +=
              parseInt(order.qty);
          } else {
            newOrder[exisitingOrder].colors[colorIndex].sizes.push({
              size: order.colors[0].sizes[0].size,
              qty: parseInt(order.qty),
            });
          }
        } else {
          newOrder[exisitingOrder].colors.push({
            color: order.colors[0].color,
            sizes: [
              { size: order.colors[0].sizes[0].size, qty: parseInt(order.qty) },
            ],
          });
        }
        newOrder[exisitingOrder].sub_total += parseFloat(order.sub_total);
      } else {
        const data = {
          _id: order._id,
          product_name: order.product_name,
          price: order.price,
          orderId: order.orderId,
          sub_total: order.sub_total,
          colors: [
            {
              color: order.colors[0].color,
              sizes: [
                {
                  size: order.colors[0].sizes[0].size,
                  quantity: parseInt(order.qty),
                },
              ],
            },
          ],
        };

        newOrder.push(data);
      }

      newOrder.forEach(async (order) => {
        if (order) {
          try {
            const response = await dispatch(walkInOrder(order));
          } catch (error) {
            if (error?.response?.data) {
              console.log(error?.response?.data);
            } else {
              console.log(error.message);
            }
          }
        }
      });

      productReducedByOrder.forEach(async (order) => {
        if (order) {
          try {
            const response = await dispatch(
              updateAfterWalkInSell({ _id: order._id, colors: order.colors })
            );

            const productIndex = productReducedByOrder.findIndex(
              (item) => item._id === response.payload._id
            );

            if (productIndex !== -1) {
              productReducedByOrder[productIndex] = response.payload;
            }

            dispatch(updateOneObjectProduct(response.payload));
          } catch (error) {
            if (error?.response?.data) {
              console.log(error?.response?.data);
            } else {
              console.log(error.message);
            }
          }
        }
      });
    });

    setSellModal(false)
  };

  useEffect(() => {
    function hitEnter(e) {
      if (e.key === "Enter") {
        searchRef.current.click();
      }
      
    }

    window.addEventListener("keypress", hitEnter);

    return () => window.addEventListener("keypress", hitEnter);
  }, []);

  return (
    <div className="sell-product-container">
      <div className="sell-product-wrapper">
        <div className="sell-side">
          {/*  */}
          <div className="search-model-number">
            {/* if the barcode cant be scanned type the barcode instead */}
            <input
              type="text"
              name=""
              id=""
              placeholder="Model Number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <img
              src="/images/search.png"
              alt="Search"
              onClick={handleSearch}
              ref={searchRef}
            />
          </div>

          {/* product detail whens canned */}
          <h2>PRODUCT DETAIL:</h2>
          <p className="order-sell product-name">
            {product?._id ? product.product_name : "Product Name"}
          </p>
          <p className="order-sell price">
            {product?._id ? product.price : "Price"}
          </p>
          <div className="inputs">
            <div className="color">
              <label htmlFor="colors">COLORS:</label>

              <select
                name=""
                className="colors"
                id="color"
                onChange={hanldeSelectColor}
              >
                {product?._id &&
                  product.colors.map((color) => (
                    <option key={color.color} value={color.color}>
                      {color?.color.toUpperCase()}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {product?._id && sizes.length !== 0 && (
            <>
              <span className="size-title">SIZES SELECTION:</span>
              <div className="sizes-selection">
                {sizes.map((size, i) => (
                  <p
                    className="size"
                    key={i}
                    onClick={() => handleSelectSize(size)}
                    style={{
                      background:
                        selectedSize?.size == size.size ? "var(--blue)" : "",
                      color:
                        selectedSize?.size == size.size ? "var(--white)" : "",
                    }}
                  >
                    {size.size}
                  </p>
                ))}
              </div>
            </>
          )}

          <div className="quantity-incrementor">
            <span className="stocks-lefts">
              stocks left: {selectedSize?.stock && selectedSize.stock}{" "}
            </span>
            <input
              type="number"
              className="quantity"
              placeholder="Quantity"
              disabled={sizes.length === 0 || selectedSize.stock === 0}
              min={1}
              max={selectedSize?.stock}
              value={orderQty}
              onChange={handleChangeQty}
            />
            <img src="/images/plus.png" alt="plus" />
          </div>

          <p className="button-add-order" onClick={handleAddOrder}>
            ADD TO ORDER
          </p>
        </div>
        <OrderSummaryWalkIn
          setSellModal={setSellModal}
          orders={orders}
          handleRemove={handleRemove}
          handleComplete={handleComplete}
        />
      </div>
    </div>
  );
};

export default SellProductModal;
