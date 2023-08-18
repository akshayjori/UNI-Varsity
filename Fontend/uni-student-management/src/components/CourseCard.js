import React from "react";
import lock from "../img/lock.png";
import "../css/coursecard.css";

const CourseCard = (props) => {
  return (
    <div
      className="course"
      key={props.course.courseCode}
      onClick={() => {
        props.onClick();
      }}
    >
      <div
        className={`course-name ${props.isLocked ? "locked" : ""}`}
        style={{ background: props.color }}
      >
        <div className="course-name-wrap">
          <h1>{props.course.courseName}</h1>
          <p>{props.course.description}</p>
        </div>
      </div>
      <div className="course-footer">
        {props.isLocked ? <img src={lock} alt="" /> : <h3>Go to course</h3>}
      </div>
    </div>
  );
};

export default CourseCard;
