import React, { useEffect, useState } from "react";
import "../styles/Admin.css";
import { Outlet, useNavigate } from "react-router-dom";
// redux kit
import { useDispatch, useSelector } from "react-redux";
// components
import AdminSidebar from "../components/AdminSidebar";

// slice
import { getLoggedInUser } from "../app/features/userSlice.js";
import {
  setTotalSales,
  setChartSummarySales,
  setBestSelling,
  fetchAllSales,
} from "../app/features/salesSlice";
import {
  setTotalInventory,
  setCriticalItemsm,
  fetchAllProducts,
} from "../app/features/inventorySlice";
import {
  setTotalTransactions,
  setPieChartData,
  fetchAllOrders,
} from "../app/features/orderSlice";
import {
  setEngagementChart,
  setFilterUserlogs,
} from "../app/features/userlogSlice";

const AdminLayout = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const salesFilter = useSelector((state) => state.sales.filter);
  const chartFilterSales = useSelector((state) => state.sales.chartFilterSales);
  const bestSellingFilter = useSelector(
    (state) => state.sales.bestSellingFilter
  );
  const ordersFilter = useSelector((state) => state.orders.filter);
  const userLogsFilter = useSelector((state) => state.userlogs.filter);
  const products = useSelector((state) => state.inventory.products);
  const soldProducts = useSelector((state) => state.sales.soldProducts);
  const orders = useSelector((state) => state.orders.orders);

  // watch for user role
  useEffect(() => {
    if (user._id && user.role === "admin") {
      navigate("/admin");
    }
  }, [user.role]);

  // use other dispatch in this file to init analytics======================================
  // initialize total sales and watch fro changes of filter
  useEffect(() => {
    dispatch(fetchAllSales());
  }, []);

  useEffect(() => {
    dispatch(setTotalSales());
  }, [salesFilter, soldProducts]);
  useEffect(() => {
    dispatch(setChartSummarySales());
  }, [chartFilterSales, soldProducts]);
  useEffect(() => {
    dispatch(setBestSelling());
  }, [bestSellingFilter, soldProducts]);

  // initialize inventory count and critical items
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  useEffect(() => {
    dispatch(setTotalInventory());
    dispatch(setCriticalItemsm());
  }, [products]);

  // initialize orders count
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);
  useEffect(() => {
    dispatch(setTotalTransactions());
  }, [ordersFilter, orders]);

  useEffect(() => {
    dispatch(setPieChartData());
  }, [orders]);

  // initializie customer engagement data
  useEffect(() => {
    dispatch(setEngagementChart());
  }, [userLogsFilter]);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
