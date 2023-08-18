import React from "react";
import "../css/home.css";
import Logo from "./Logo";
import cc from "../css/adminhome.module.css";
import { useNavigate } from "react-router-dom";
import CourseReport from "./CourseReport";
import wavingHand from "../img/waving-hand.png";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className={cc.container}>
      <div className={cc.welcome_msg}>
        <div className="display-3">
          <img className={cc.waving_hand} src={wavingHand} alt="" />
          Hi! Admin..
        </div>
      </div>

      <div className={cc.left_col}>
        <CourseReport />
      </div>

      <div className={cc.right_col}>
        <div className={cc.right_inner}>
          <Logo className={cc.logo} />
          <button
            className="btn btn-warning"
            onClick={() => {
              navigate(`/manage/students`);
            }}
          >
            MANAGE STUDENTS
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
