import React, { useEffect, useState } from "react";
import "../styles/SplashScreen.css";

// svg
import LogoSvg from "../assets/Logo";

const SplashScreen = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((dots) => {
        switch (dots) {
          case "":
            return ".";
          case ".":
            return "..";
          case "..":
            return "...";
          default:
            return "";
        }
      });
    }, 500);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="splash-container">
      <div className="splash-wrapper">
        <div className="logo">
          <div className="absolute"></div>
          <LogoSvg />
        </div>
        <p>Loading resources{dots}</p>
      </div>
    </div>
  );
};

export default SplashScreen;
