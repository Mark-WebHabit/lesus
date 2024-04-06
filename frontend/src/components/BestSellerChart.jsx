import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { bestSellerSummaryOptions } from "../config/chartOptions";
import { getCurrentMonth, getMonthAndYear } from "../utilities/dates";
import { setBestSellingFilter } from "../app/features/salesSlice";

const BestSellerChart = () => {
  // Create a state variable for the input value
  const [currentMonth, setCurrentMonth] = useState("");
  const bestSelling = useSelector((state) => state.sales.bestSelling);
  const dispatch = useDispatch();

  // Set the current month as default value when the component mounts
  useEffect(() => {
    const initialMonth = getCurrentMonth();
    setCurrentMonth(initialMonth);
  }, []);

  const handleChange = (e) => {
    setCurrentMonth(e.target.value);
  };

  useEffect(() => {
    const { month, year } = getMonthAndYear(currentMonth);
    if (month && year) {
      const formatted = `${year}-${parseInt(month) > 9 ? month : "0" + month}`;
      dispatch(setBestSellingFilter(formatted));
    }
  }, [currentMonth]);

  return (
    <div className="best-selling-chart chart">
      <div className="filter">
        <span>LOOK UP: </span>
        <input
          type="month"
          name=""
          id=""
          value={currentMonth}
          onChange={handleChange}
        />
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={bestSellerSummaryOptions(bestSelling)}
      />
    </div>
  );
};

export default BestSellerChart;
