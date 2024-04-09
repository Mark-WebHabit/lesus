import React, { useEffect } from "react";
import "../styles/Dashboard.css";

// components
import DashboardCards from "../components/DashboardCards";

// chart
import SalesSumaryChart from "../components/SalesSumaryChart";
import BestSellerChart from "../components/BestSellerChart";
import CustomerEngagementChart from "../components/CustomerEngagementChart";
import OrderSummaryChart from "../components/OrderSummaryChart";

const Dashboard = () => {
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
