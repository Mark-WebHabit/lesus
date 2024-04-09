import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// layouts
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import AdminLayout from "./layout/AdminLayout";

// views
import Home from "./views/Home";

// admin views
import Dashboard from "./views/Dashboard";
import Inventory from "./views/Inventory";
import Orders from "./views/Orders";
import Users from "./views/Users";
import Overview from "./views/Overview";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/lesus" element={<AuthLayout />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
