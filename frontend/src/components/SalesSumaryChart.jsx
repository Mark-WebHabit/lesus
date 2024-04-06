import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChartFilterSales } from "../app/features/salesSlice.js";
// chart options
import { salesSummaryOptions } from "../config/chartOptions.js";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const SalesSumaryChart = () => {
  const [datas, setDatas] = useState({});
  const chartData = useSelector((state) => state.sales.chartData);
  const chartFilter = useSelector((state) => state.sales.chartFilterSales);
  const dispatch = useDispatch();

  useEffect(() => {
    let sales, date;
    if (chartFilter === "this year") {
      sales = chartData.map((data) => data.sales);
      date = chartData.map((data) => data.month);
    } else if (chartFilter === "this week") {
      sales = chartData.map((data) => data.sales);
      date = chartData.map((data) => data.day);
    }
    setDatas({
      date,
      sales,
    });
  }, [chartData, chartFilter]);

  const handleChange = (e) => {
    dispatch(setChartFilterSales(e.target.value));
  };

  return (
    <div className="sales-summary-chart chart">
      <div className="filter">
        <span>FILTER: </span>
        <select name="" id="" onChange={handleChange}>
          <option value="this week">Each day of curent week</option>
          <option value="this year">Each Month of the year</option>
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
