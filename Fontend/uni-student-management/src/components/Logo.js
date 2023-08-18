import React from "react";
import logo from "../img/uni-logo-white.png";
import "../css/logo.css";

const Logo = (props) => {
  return (
    <div>
      <img className={props.className} src={logo} alt="EMP logo" />
    </div>
  );
};

export default Logo;
