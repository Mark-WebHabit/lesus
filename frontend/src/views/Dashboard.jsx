import React, { useEffect } from "react";
import "../styles/Dashboard.css";
import { useDispatch, useSelector } from "react-redux";

import {
  setTotalSales,
  setChartSummarySales,
  setBestSelling,
} from "../app/features/salesSlice";
import {
  setTotalInventory,
  setCriticalItemsm,
} from "../app/features/inventorySlice";
import {
  setTotalTransactions,
  setPieChartData,
} from "../app/features/orderSlice";
import {
  setEngagementChart,
  setFilterUserlogs,
} from "../app/features/userlogSlice";

// components
import DashboardCards from "../components/DashboardCards";

// chart
import SalesSumaryChart from "../components/SalesSumaryChart";
import BestSellerChart from "../components/BestSellerChart";
import CustomerEngagementChart from "../components/CustomerEngagementChart";
import OrderSummaryChart from "../components/OrderSummaryChart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const salesFilter = useSelector((state) => state.sales.filter);
  const chartFilterSales = useSelector((state) => state.sales.chartFilterSales);
  const bestSellingFilter = useSelector(
    (state) => state.sales.bestSellingFilter
  );
  const ordersFilter = useSelector((state) => state.orders.filter);
  const userLogsFilter = useSelector((state) => state.userlogs.filter);
  // use other dispatch in this file to init analytics======================================
  // initialize total sales and watch fro changes of filter
  useEffect(() => {
    dispatch(setTotalSales());
  }, [salesFilter]);
  useEffect(() => {
    dispatch(setChartSummarySales());
  }, [chartFilterSales]);
  useEffect(() => {
    dispatch(setBestSelling());
  }, [bestSellingFilter]);

  // initialize inventory count and critical items
  useEffect(() => {
    dispatch(setTotalInventory());
    dispatch(setCriticalItemsm());
  }, []);

  // initialize orders count
  useEffect(() => {
    dispatch(setTotalTransactions());
  }, [ordersFilter]);

  useEffect(() => {
    dispatch(setPieChartData());
  }, []);

  // initializie customer engagement data
  useEffect(() => {
    dispatch(setEngagementChart());
  }, [userLogsFilter]);

  return (
    <div className="dashboard-container">
      <div className="info-cards">
        <DashboardCards />
      </div>
      <div className="chart-row2">
        <SalesSumaryChart />
        <BestSellerChart />
      </div>
      <div className="chart-row3">
        <CustomerEngagementChart />
        <OrderSummaryChart />
      </div>
    </div>
  );
};

export default Dashboard;
