import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../app/features/salesSlice.js";
import { setOrdersFilter } from "../app/features/orderSlice.js";

// componentes
import StatisticCard from "./StatisticCard";

const DashboardCards = () => {
  const sales = useSelector((state) => state.sales.totalSales);
  const totalStocks = useSelector((state) => state.inventory.totalStocks);
  const totalTransactions = useSelector((state) => state.orders.totalOrders);
  const criticalItems = useSelector((state) => state.inventory.criticalItems);
  const dispatch = useDispatch();

  const handleTotalSalesFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleTotalTransactionFilterChange = (e) => {
    dispatch(setOrdersFilter(e.target.value));
  };

  return (
    <>
      <StatisticCard
        title={"Total sales"}
        data={sales}
        description={"Accumulated Sales"}
        options={[
          { value: "today", text: "TODAY" },
          {
            value: "week",
            text: "Prev Week",
          },
          {
            value: "month",
            text: "Prev Month",
          },
        ]}
        event={handleTotalSalesFilterChange}
      />
      <StatisticCard
        title={"Stocks"}
        data={totalStocks}
        description={"Stocks in the inventory"}
      />
      <StatisticCard
        title={"Total Orders"}
        data={totalTransactions}
        description={"transactions made"}
        options={[
          { value: "all", text: "ALL" },
          {
            value: "pending",
            text: "PENDING",
          },
          {
            value: "completed",
            text: "COMPLETED",
          },
          {
            value: "cancelled",
            text: "CANCELLED",
          },
        ]}
        event={handleTotalTransactionFilterChange}
      />
      <StatisticCard
        title={"Critical Items"}
        data={criticalItems?.length || 0}
        description={"Items need restocking"}
      />
      <StatisticCard
        title={"Total sales"}
        data={"10,000"}
        description={"Accumulated SAles"}
      />
    </>
  );
};

export default DashboardCards;
