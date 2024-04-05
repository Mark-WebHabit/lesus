import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { bestSeller } from "../dummydatas/sales";
import { bestSellerSummaryOptions } from "../config/chartOptions";

const BestSellerChart = () => {
  return (
    <div className="best-selling-chart chart">
      <div className="filter">
        <span>LOOK UP: </span>
        <input type="month" name="" id="" />
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={bestSellerSummaryOptions(bestSeller)}
      />
    </div>
  );
};

export default BestSellerChart;
