import React from "react";
import "../css/loadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="load-wrapper">
      <div className="load-circle">L</div>
      <div className="load-circle">O</div>
      <div className="load-circle">A</div>
      <div className="load-circle">D</div>
      <div className="load-circle">I</div>
      <div className="load-circle">N</div>
      <div className="load-circle">G</div>
    </div>
  );
};

export default LoadingSpinner;
