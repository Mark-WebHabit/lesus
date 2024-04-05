import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// componnets
import InputField from "../components/InputField";
import SubmitButtonAuth from "../components/SubmitButtonAuth";

import { instance } from "../config/instance.js";

// utilities
import {
  isUsernameValid,
  isPasswordValid,
  validPhone,
} from "../utilities/form.js";
import { useRef } from "react";

const Register = ({ handleNavigate, triggerAlert }) => {
  const [datas, setDatas] = useState({
    username: "",
    password: "",
    address: "",
    contact: "",
    // code: "",
  });

  // const [codeFromServer, setCodeFromServer] = useState("");

  const [errors, setErrors] = useState({
    contact: "",
    username: "",
    password: "",
    address: "",
  });

  const [termAgreed, setTermAgreed] = useState(false);

  const handleChange = (e) => {
    setDatas({ ...datas, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", ["clientError"]: "" });
  };
  const clearState = () => {
    setDatas({
      contact: "",
      username: "",
      password: "",
      address: "",
      // code: "",
    });
  };
  const triggerRef = useRef(null);

  const navigate = () => {
    clearState();
    handleNavigate();
  };

  // send otp
  const requestCode = async (e) => {
    if (!datas.contact) {
      return;
    }

    try {
      const response = await instance.post("/auth/code", {
        contact: datas.contact,
      });

      e.target.textContent = "REQUESTING...";

      if (response) {
        e.target.textContent = "REQUEST NEW";
        let data = response.data;
        if (data.data) {
          setCodeFromServer(data.data);
        }
      }
    } catch (error) {
      e.target.textContent = "TRY AGAIN";
      if (error.response?.data) {
        setErrors({ ...errors, ["clientError"]: error.response.data.data });
      } else {
        setErrors({ ...errors, ["clientError"]: error.message });
      }
    }
  };

  const handleSubmit = async () => {
    const { contact, username, address, password } = datas;

    // Object to accumulate errors
    const newErrors = {};

    // the user has to agree to the terms and conditions
    if (!termAgreed) return;

    const validUsername = isUsernameValid(username);
    if (typeof validUsername === "string") newErrors.username = validUsername;

    const validContact = validPhone(contact);
    if (!validContact) newErrors.contact = "Invalid Phone Number";

    const validAdd = address === "";
    if (validAdd) newErrors.address = "Provide Current Address";

    const validPass = isPasswordValid(password);
    if (typeof validPass === "string") newErrors.password = validPass;

    // Update the errors state in one go
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // if (!codeFromServer) {
    //   setErrors({
    //     ...errors,
    //     ["clientError"]: "Provide your number and request an OTP",
    //   });
    //   return;
    // }
    // if (!code) {
    //   setErrors({
    //     ...errors,
    //     ["clientError"]: "Write the code sent to your number",
    //   });
    //   return;
    // }

    // if (codeFromServer !== code) {
    //   setErrors({ ...errors, ["clientError"]: "Wrong Code" });
    //   return;
    // }

    try {
      const response = await instance.post(
        `/auth/register`,
        { contact, username, address, password } // Directly pass the object
      );

      if (response.data.data._id) {
        alert("Account registered");

        setDatas({
          contact: "",
          username: "",
          password: "",
          address: "",
        });

        triggerRef.current.click();
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
      <h1>REGISTER</h1>
      <span className="general-error-auth">{errors.clientError}</span>
      <div className="form">
        <InputField
          label={"username"}
          value={datas.username}
          handleChange={handleChange}
          max={20}
          error={errors.username}
        />
        <InputField
          label={"contact"}
          value={datas.contact}
          handleChange={handleChange}
          max={12}
          error={errors.contact}
          type="number"
          placeholder="639********"
        />

        <InputField
          label={"address"}
          value={datas.address}
          handleChange={handleChange}
          max={100}
          error={errors.address}
        />
        <InputField
          label={"password"}
          value={datas.password}
          handleChange={handleChange}
          max={100}
          type="password"
          error={errors.password}
        />

        {/* <div className="code">
          <input
            type="text"
            name="code"
            id=""
            value={datas.code}
            onChange={handleChange}
            disabled={!codeFromServer}
          />
          <button
            className="button-code"
            style={{
              background: !datas.contact ? "#338fc266" : "#338fc2",
            }}
            onClick={requestCode}
          >
            REQUEST
          </button>
        </div> */}

        <div className="terms">
          <span className="box" onClick={() => setTermAgreed(!termAgreed)}>
            <img
              src="/images/check.png"
              alt="Check"
              className={termAgreed ? "check" : ""}
            />
          </span>
          <small>I agree to the Terms and Conditions</small>
        </div>
        <SubmitButtonAuth event={handleSubmit} />

        <p className="nav-auth" onClick={navigate} ref={triggerRef}>
          Already have an account
        </p>
      </div>
    </>
  );
};

export default Register;
