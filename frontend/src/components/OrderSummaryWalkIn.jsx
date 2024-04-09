import React from "react";
const OrderSummaryWalkIn = ({
  setSellModal,
  orders,
  handleRemove,
  handleComplete,
}) => {
  return (
    <div className="order-summary">
      <table>
        <thead>
          <tr>
            <td>Product</td>
            <td>Price</td>
            <td>Color</td>
            <td>Size</td>
            <td>QTY</td>
            <td>total</td>
            <td></td>
          </tr>
        </thead>
        {orders.length !== 0 && (
          <tbody>
            {orders.map((order, i) => (
              <tr key={i}>
                <td>{order.product_name}</td>
                <td>{order.price}</td>
                <td>{order.colors[0].color}</td>
                <td>{order.colors[0].sizes[0].size}</td>
                <td>{order.qty}</td>
                <td>{order.sub_total}</td>
                <td>
                  <img
                    src="/images/x.png"
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRemove(order)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {orders.length !== 0 && (
        <>
          <p className="sub-total">
            Sub Total:{" "}
            {orders.reduce((acc, item) => acc + parseInt(item.sub_total), 0)}
          </p>
          <p className="sub-total" style={{ lineHeight: "0.1rem" }}>
            Order ID: {orders[0].orderId}
          </p>
          <div className="buttons">
            <p className="cancel" onClick={() => setSellModal(false)}>
              cancel
            </p>
            <p className="complete" onClick={handleComplete}>
              complete
            </p>
          </div>
        </>
      )}
      {orders.length === 0 && <h1>No Orders Yet</h1>}
    </div>
  );
};

export default OrderSummaryWalkIn;
