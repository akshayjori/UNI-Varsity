import React from "react";

import "../css/box.css";

const Box = (props) => {
  return <div className="box">{props.children}</div>;
};

export default Box;
