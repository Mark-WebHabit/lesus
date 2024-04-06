import React from "react";
import Logo from "../assets/Logo";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/userSlice";
// svg
import DashboardSvg from "../assets/Dashboard";
import InventorySvg from "../assets/Inventory";
import OrderSvg from "../assets/Orders";
import UsersSvg from "../assets/Users";
import LogoutSvg from "../assets/Logout";
import { useLocation, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const locations = location.split("/");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogout = async () => {
    try {
      await dispatch(logout(user._id));
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/lesus");
    }
  };

  const handleNvigate = (text) => {
    if (text == "logout") {
      if (user._id) {
        handleLogout();
      }
    } else {
      navigate(`/admin/${text}`);
    }
  };

  const Nav = ({ Svg, text }) => {
    let active = false;
    if (text == "dashboard" && locations.length == 2) {
      active = true;
    } else if (locations.includes(text)) {
      active = true;
    } else {
      active = false;
    }

    return (
      <div
        className={`nav ${active ? "active" : ""}`}
        onClick={() => handleNvigate(text)}
      >
        <Svg />
        <span>{text}</span>
      </div>
    );
  };

  return (
    <div className="admin-sidebar">
      <div className="logo-container">
        <Logo event={() => navigate("/")} />
        <p onClick={() => navigate("/")}>LESUS</p>
      </div>
      <div className="navigation-container">
        <Nav Svg={DashboardSvg} text={"dashboard"} />
        <Nav Svg={InventorySvg} text={"inventory"} />
        <Nav Svg={OrderSvg} text={"orders"} />
        <Nav Svg={UsersSvg} text={"users"} />
        <Nav Svg={LogoutSvg} text={"logout"} />
      </div>
    </div>
  );
};

export default AdminSidebar;
