import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../constants";
import cc from "../css/userhome.module.css";
import CourseCard from "./CourseCard";
import { getAllCourses } from "./services/studentRequestHelper";
import { getNonCommonCourses } from "./services/Util";
import wavingHand from "../img/waving-hand.png";

const UserHome = () => {
  const [courses, setCourses] = useState();
  const student = useSelector((state) => state.user.student);
  const navigate = useNavigate();
  const colors = COLORS;
  var colorCounter = 0;

  useEffect(() => {
    getAllCourses().then((res) => {
      setCourses(res.data);
    });
  }, []);

  return (
    <div className={cc.home}>
      <div className={cc.welcome_msg}>
        <div className="display-3">
          <img className={cc.waving_hand} src={wavingHand} alt="" />
          Welcome!
        </div>
        <p className="lead">
          “The great aim of education is not knowledge but action.”
        </p>
      </div>
      <div className={cc.course_wrapper}>
        {student.courses?.map((c) => {
          return (
            <CourseCard
              key={c.courseCode}
              course={c}
              isLocked={false}
              color={colors[colorCounter++]}
              onClick={() => {
                navigate(`/courses/${c.courseName}`);
              }}
            />
          );
        })}
        {getNonCommonCourses(student.courses, courses)?.map((c) => {
          return (
            <CourseCard
              key={c.courseCode}
              course={c}
              isLocked={true}
              color={colors[colorCounter++]}
              onClick={() => {
                navigate(`/courses/enroll`);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserHome;
