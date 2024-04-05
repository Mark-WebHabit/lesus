import React, { useState, useEffect } from "react";

// chart options
import { salesSummaryOptions } from "../config/chartOptions.js";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// dummy datas to be replaced by actual data from db
import { monthlySalesData, weeklySalesData } from "../dummydatas/sales";

const SalesSumaryChart = () => {
  const [salesFilter, setSalesFilter] = useState(monthlySalesData);
  const [datas, setDatas] = useState({});

  useEffect(() => {
    const sales = salesFilter.map((data) => data.totalSales);
    const date = salesFilter.map((data) => data.date);
    setDatas({
      date,
      sales,
    });
  }, [salesFilter]);

  return (
    <div className="sales-summary-chart chart">
      <div className="filter">
        <span>FILTER: </span>
        <select name="" id="">
          <option value="month">Each Month of the year</option>
          <option value="week">Each day of curent week</option>
        </select>
      </div>
      {datas.date && datas.sales && (
        <HighchartsReact
          highcharts={Highcharts}
          options={salesSummaryOptions(datas)}
        />
      )}
    </div>
  );
};

export default SalesSumaryChart;
