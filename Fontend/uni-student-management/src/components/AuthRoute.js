import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { userActions } from "../store/userSlice";
import AuthService from "./services/AuthService";

//wrapper for Autherized components
const AuthRoute = (props) => {
  const isLoggedIn = AuthService.isUserLoggedIn();
  const dispatch = useDispatch();

  if (isLoggedIn) {
    return <>{props.children}</>;
  } else {
    AuthService.logout();
    dispatch(userActions.removeUser());
    return <Navigate to="/login" />;
  }
};

export default AuthRoute;
