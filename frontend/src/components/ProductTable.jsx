import React from "react";

const ProductTable = () => {
  const Data = () => {
    return (
      <tr>
        <td>Shoe 1</td>
        <td>1234</td>
        <td>Red</td>
        <td>37, 41, 43</td>
        <td>10</td>
        <td>
          <div>
            <img src="/images/info.png" alt="INFO" />
            <span>VIEW</span>
          </div>
          <div>
            <img src="/images/pencil.png" alt="EDIT" />
            <span>EDIT</span>
          </div>
          <div>
            <img src="/images/buy.png" alt="BUY" />
            <span>BUY</span>
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
          <td>MODEL NO.</td>
          <td>COLOR</td>
          <td>SIZES</td>
          <td>STOCKS</td>
          <td>ACTION</td>
        </tr>
      </thead>
      <tbody>
        {/* map through the data here */}
        <Data />
      </tbody>
    </table>
  );
};

export default ProductTable;
