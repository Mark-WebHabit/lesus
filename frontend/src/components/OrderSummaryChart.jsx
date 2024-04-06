import React from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { orders } from "../dummydatas/sales.js";
import { orderSummary } from "../config/chartOptions.js";

const OrderSummaryChart = () => {
  const pieData = useSelector((state) => state.orders.pieData);
  return (
    <div className="best-selling-chart chart">
      {/* <div className="filter">
        <span>LOOK UP: </span> */}
      {/* <input type="month" name="" id="" /> */}
      {/* <select name="" id="">
          <option value="all">ALL</option>
          <option value="pending">PENDING</option>
          <option value="completed">COMPLETED</option>
          <option value="cancelled">CANCELLED</option>
        </select>
      </div> */}
      <HighchartsReact
        highcharts={Highcharts}
        options={orderSummary(pieData)}
      />
    </div>
  );
};

export default OrderSummaryChart;
