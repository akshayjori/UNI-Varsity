import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";

import "../css/bootstrap.css";
import "../css/navbar.css";
import AuthService from "./services/AuthService";
import logoutIcon from "../img/logout-icon.png";
import profileIcon from "../img/profile-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import ProfileImg from "./ProfileImg";
import uniLogo from "../img/uni-logo-white.png";
import uniNameLogo from "../img/uni-name-logo-1.png";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const userInfo = useSelector((state) => state.user.info);
  const [pMenuClass, setPMenuClass] = useState("inactive");
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setPMenuClass((prevState) => {
      return prevState === "active" ? "inactive" : "active";
    });
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    setPMenuClass("inactive");
    dispatch(userActions.removeUser());
    AuthService.logout();
    navigate("/login", { state: { message: "You have been logged out" } });
  };

  return (
    <div className="nav-div">
      <nav className="navbar nav-left">
        <Link className="navbar-brand" to="/home">
          <img className="uni-logo" src={uniLogo} alt="" />
          <img className="uni-name-logo" src={uniNameLogo} alt="" />
        </Link>
      </nav>
      <nav className="navbar nav-right navbar-expand-lg float-right">
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-right" id="navbarText">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/about">
                About us
              </Link>
            </li>
            <ProfileImg className="profilePhoto" onClick={toggleMenu} />
            <div className={`profile-menu-wrap ${pMenuClass}`}>
              <div className="profile-menu" id="profile-menu">
                <div className="user-info">
                  <ProfileImg className="dp-large" />
                  <h3>{userInfo.fullname ? userInfo.fullname : "Guest 123"}</h3>
                </div>
                <hr />
                {isLoggedIn && (
                  <>
                    <Link
                      className="p-menu-link"
                      to="/profile"
                      onClick={toggleMenu}
                    >
                      <img src={profileIcon} alt="" /> <p>View Profile</p>
                      <span>{">"}</span>
                    </Link>
                    <Link
                      className="p-menu-link"
                      to="/fff"
                      onClick={logoutHandler}
                    >
                      <img src={logoutIcon} alt="" />
                      <p>Log out</p>
                      <span>{">"}</span>
                    </Link>
                  </>
                )}
                {!isLoggedIn && (
                  <Link
                    className="p-menu-link"
                    to="/login"
                    onClick={toggleMenu}
                  >
                    <IoMdLogIn className="menu-icon" /> <p>Go to Login</p>
                    <span>{">"}</span>
                  </Link>
                )}
              </div>
            </div>
          </ul>
        </div>
      </nav>
      <div
        className={`back-drop-${pMenuClass}`}
        onClick={() => {
          toggleMenu();
        }}
      ></div>
    </div>
  );
};

export default Navbar;
