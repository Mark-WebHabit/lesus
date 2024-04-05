import React from "react";
import "../styles/Admin.css";
import { Outlet } from "react-router-dom";
// components
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
