import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { orders } from "../dummydatas/sales.js";
import { orderSummary } from "../config/chartOptions.js";

const OrderSummaryChart = () => {
  return (
    <div className="best-selling-chart chart">
      <div className="filter">
        <span>LOOK UP: </span>
        <input type="month" name="" id="" />
      </div>
      <HighchartsReact highcharts={Highcharts} options={orderSummary(orders)} />
    </div>
  );
};

export default OrderSummaryChart;
