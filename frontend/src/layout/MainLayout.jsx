import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "../styles/MainLayout.css";
import { useNavigate } from "react-router-dom";
// components
import MainHeader from "../components/MainHeader";
import SplashScreen from "../views/SplashScreen";

// redux kit
import { useDispatch, useSelector } from "react-redux";
// slice
import { getLoggedInUser } from "../app/features/userSlice.js";

const MainLayout = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // check if theres a user logged in persist at first render
  useEffect(() => {
    try {
      dispatch(getLoggedInUser());
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  // watch for user role
  useEffect(() => {
    if (user._id && user.role === "admin") {
      navigate("/admin");
    }
  }, [user.role]);

  return (
    <div className="mainlayout-container">
      <MainHeader user={user} />
      <Outlet />
    </div>
  );
};

export default MainLayout;
