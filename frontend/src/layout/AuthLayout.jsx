import React, { useEffect, useState } from "react";
import "../styles/AuthLayout.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser } from "../app/features/userSlice.js";
// components
import Register from "../views/Register";
import Login from "../views/Login";
import AlertComponent from "../components/AlertComponent";

const AuthLayout = () => {
  const [page, setPage] = useState("login");
  const [allowTransformation, setAllowTransaformation] = useState(true);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alert, setAlert] = useState("");

  // hoooks
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  // check if theres a user logged in persist at first render
  useEffect(() => {
    try {
      dispatch(getLoggedInUser());
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  //listens if theres no user, redirect to login
  useEffect(() => {
    if (user?._id) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setAllowTransaformation(false);
      } else {
        setAllowTransaformation(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (alert) {
      setShowAlertModal(true);
    } else {
      setShowAlertModal(false);
    }
  }, [alert]);

  const handleNavigate = () => {
    if (page == "register") {
      setPage("login");
    } else {
      setPage("register");
    }
  };

  const triggerAlert = (alertMssg) => {
    setAlert(alertMssg);
  };

  const hideALert = () => {
    setShowAlertModal(false);
    setAlert("");
  };

  return (
    <>
      {showAlertModal && alert && (
        <AlertComponent text={alert} hide={hideALert} />
      )}
      <div className="auth-layout">
        <div className="auth-container">
          <div
            className="welcome-container"
            style={{
              transform:
                page == "register" && allowTransformation
                  ? "translateX(100%)"
                  : "translateX(0)",
              borderTopLeftRadius:
                page == "register" && allowTransformation ? "30%" : "0",
              borderBottomLeftRadius:
                page == "register" && allowTransformation ? "30%" : "0",
              borderBottomRightRadius:
                page == "login" && allowTransformation ? "30%" : "0%",
              borderTopRightRadius:
                page == "login" && allowTransformation ? "30%" : "0%",
            }}
          >
            <div className="faded-blue"></div>

            <img
              src="/images/logo.svg"
              alt="LOGO"
              onClick={() => navigate("/")}
            />
            <p>WELCOME</p>
          </div>
          <div
            className="form-container"
            style={{
              transform:
                page == "register" && allowTransformation
                  ? "translateX(-100%)"
                  : "translateX(0)",
            }}
          >
            {page == "register" ? (
              <Register
                handleNavigate={handleNavigate}
                triggerAlert={triggerAlert}
              />
            ) : (
              <Login handleNavigate={handleNavigate} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
