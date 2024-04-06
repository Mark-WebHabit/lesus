import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Highcharts, { fireEvent } from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { customerEngagementData } from "../dummydatas/sales.js";
import { customerEngagementChart } from "../config/chartOptions.js";
import {
  setEngagementChart,
  setFilterUserlogs,
} from "../app/features/userlogSlice.js";
const CustomerEngagementChart = () => {
  const [filter, setFilter] = useState(new Date().getFullYear());
  const dispatch = useDispatch();
  const engagementChart = useSelector(
    (state) => state.userlogs.engagementChart
  );

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    dispatch(setFilterUserlogs(filter));
  }, [filter]);

  return (
    <div className="customer-engagement-chart chart">
      <div className="filter">
        <span>LOOK UP: </span>
        <input
          type="number"
          name="year"
          id=""
          min="2023"
          max={new Date().getFullYear()}
          placeholder="year"
          value={filter}
          onChange={handleChange}
        />
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={customerEngagementChart(engagementChart)}
      />
    </div>
  );
};

export default CustomerEngagementChart;
