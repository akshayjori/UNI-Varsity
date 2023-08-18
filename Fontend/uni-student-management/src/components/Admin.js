import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
/*
  wrapper to allow only admins
  to access children comonents
*/
const Admin = (props) => {
  const user = useSelector((state) => state.user.info);
  const [authorized, setAuthorized] = useState();

  useEffect(() => {
    if (user.role === "ADMIN") setAuthorized(true);
    if (user.role && user.role !== "ADMIN") setAuthorized(false);
  }, [user]);

  if (authorized) {
    return <>{props.children}</>;
  } else if (user.role && user.role !== "ADMIN") {
    return <Navigate to="/unauthorized" />;
  }
};

export default Admin;
