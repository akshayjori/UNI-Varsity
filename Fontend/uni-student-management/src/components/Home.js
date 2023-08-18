import React from "react";
import { useSelector } from "react-redux";
import "../css/home.css";
import AdminHome from "./AdminHome";
import UserHome from "./UserHome";

const Home = () => {
  const userInfo = useSelector((state) => state.user.info);

  if (userInfo.role === "ADMIN") return <AdminHome />;
  if (userInfo.role && userInfo.role !== "ADMIN") return <UserHome />;
};

export default Home;
