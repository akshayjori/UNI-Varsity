import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthService from "./services/AuthService";
import { getLoggedInUserDetails } from "./services/studentRequestHelper";
import { EMAIL_ID } from "../constants";
import { userActions } from "../store/userSlice";
import { getStudentById } from "./services/adminRequestHelper";

const Authenticator = () => {
  const isLoggedIn = AuthService.isUserLoggedIn();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const email = localStorage.getItem(EMAIL_ID);
      // setup redux store
      getLoggedInUserDetails(email)
        .then((res) => {
          // store user in redux store
          const user = {
            studentId: res.data.studentid,
            fullname: res.data.fullname,
            role: res.data.role,
          };

          dispatch(userActions.storeUser(user));
          // now get student by id
          getStudentById(res.data.studentid)
            .then((res) => {
              // store student in redux store
              // console.log("fetched student from db", res.data);
              dispatch(userActions.storeStudent(res.data));
            })
            .catch((error) => {
              console.log("error while getting student from db", error);
            });
        })
        .catch((error) => {
          console.log("error while fetching logged in user", error);
          AuthService.logout();
          navigate("/login");
        });
    }
  }, [isLoggedIn, dispatch, navigate]);

  return <></>;
};

export default Authenticator;
