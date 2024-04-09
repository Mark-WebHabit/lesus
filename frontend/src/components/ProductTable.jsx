import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductTable = ({
  handleToggleViewProductModal,
  handleToggleEditProductModal,
  products,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (products) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [products]);
  // other component
  const Data = ({ item }) => {
    const { product_name, colors, price } = item;

    return (
      <tr>
        <td>{product_name}</td>
        <td>{price}</td>
        <td>
          {colors.length > 0 &&
            colors.map((color, index) => (
              <React.Fragment key={index}>
                {color.color}
                {index < colors.length - 1 ? ", " : ""}
              </React.Fragment>
            ))}
        </td>
        <td>
          {colors.length > 0 &&
            colors.map((color, index) => (
              <React.Fragment key={index}>
                {color.sizes.map((val, i) => (
                  <React.Fragment key={i}>
                    {val.size}
                    {i < color.sizes.length - 1 ? ", " : ""}
                  </React.Fragment>
                ))}
                {index < colors.length - 1 ? ", " : ""}
              </React.Fragment>
            ))}
        </td>
        <td>
          {colors.reduce((totalStock, color) => {
            // Sum the stock for each size in the current color
            const colorStock = color.sizes.reduce(
              (sum, size) => (sum += +size.stock),
              0
            );
            // Add the sum of the current color's stock to the total stock
            return totalStock + colorStock;
          }, 0)}
        </td>

        <td>
          <div onClick={() => handleToggleViewProductModal(item._id)}>
            <img src="/images/info.png" alt="INFO" />
            <span>VIEW</span>
          </div>
          <div>
            <img
              src="/images/pencil.png"
              alt="EDIT"
              onClick={() => handleToggleEditProductModal(item._id)}
            />
            <span>EDIT</span>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <table className="product-list">
      <thead>
        <tr>
          <td>PRODUCT</td>
          <td>Price</td>
          <td>COLOR</td>
          <td>SIZES</td>
          <td>STOCKS</td>
          <td>ACTION</td>
        </tr>
      </thead>
      {show && (
        <tbody>
          {/* map through the data here */}
          {products &&
            products.map((item) => <Data key={item._id} item={item} />)}
        </tbody>
      )}
    </table>
  );
};

export default ProductTable;
