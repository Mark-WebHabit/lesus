import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { customerEngagementData } from "../dummydatas/sales.js";
import { customerEngagementChart } from "../config/chartOptions.js";
const CustomerEngagementChart = () => {
  return (
    <div className="customer-engagement-chart chart">
      <div className="filter">
        <span>LOOK UP: </span>
        <input
          type="number"
          name="year"
          id=""
          min="2023"
          max="2024"
          placeholder="year"
        />
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={customerEngagementChart(customerEngagementData)}
      />
    </div>
  );
};

export default CustomerEngagementChart;
