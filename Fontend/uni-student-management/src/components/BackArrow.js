import React from "react";
import cc from "../css/backarrow.module.css";
import { useNavigate } from "react-router-dom";

const BackArrow = (props) => {
  const navigate = useNavigate();
  return (
    <i
      className={`${cc.back_arrow} ${props.className} bi bi-arrow-left-circle text-light h5`}
      onClick={() => {
        navigate(-1);
      }}
    ></i>
  );
};

export default BackArrow;
