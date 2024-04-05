import React, { useState } from "react";
import { instance } from "../config/instance.js";
import { useNavigate } from "react-router-dom";
// componnets
import InputField from "../components/InputField";
import SubmitButtonAuth from "../components/SubmitButtonAuth";

const Login = ({ handleNavigate }) => {
  const [datas, setDatas] = useState({
    contactOrUsername: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    contactOrUsername: "",
    password: "",
    clientError: "",
  });
  const navigation = useNavigate();

  const handleChange = (e) => {
    setDatas({ ...datas, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", ["clientError"]: "" });
  };
  const clearState = () => {
    setDatas({
      contactOrUsername: "",
      password: "",
    });
    setErrors({
      contactOrUsername: "",
      password: "",
      clientError: "",
    });
  };

  const navigate = () => {
    clearState();
    handleNavigate();
  };

  const handleSubmit = async () => {
    const { contactOrUsername, password } = datas;

    // Object to accumulate errors
    const newErrors = {};

    if (contactOrUsername == "")
      newErrors.contactOrUsername = "Enter Contact Number or Username";
    if (password == "") newErrors.password = "Password Cannot Be Blank";

    // Update the errors state in one go
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await instance.post("/auth/login", {
        contactOrUsername,
        password,
      });

      if (typeof response.data.data == "boolean") {
        if (response.data.role == "admin") {
          navigation("/admin");
        } else {
          navigation("/");
        }
      }
    } catch (error) {
      if (error.response?.data) {
        setErrors({ ...errors, ["clientError"]: error.response.data.data });
      } else {
        setErrors({ ...errors, ["clientError"]: error.message });
      }
    }
  };

  return (
    <>
      <h1>LOGIN</h1>
      <span className="general-error-auth">{errors.clientError}</span>
      <div className="form">
        <InputField
          label={"contactOrUsername"}
          value={datas.contactOrUsername}
          handleChange={handleChange}
          max={100}
          error={errors.contactOrUsername}
        />

        <InputField
          label={"password"}
          value={datas.password}
          handleChange={handleChange}
          max={100}
          type="password"
          error={errors.password}
        />

        <SubmitButtonAuth event={handleSubmit} />
        <p className="forgot-pass">Forgot Password</p>
        <p className="nav-auth" onClick={navigate}>
          Create an account
        </p>
      </div>
    </>
  );
};

export default Login;
