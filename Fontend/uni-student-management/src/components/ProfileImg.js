import React, { useEffect, useState } from "react";
import { G_IMAGE_URL } from "../constants";
import defaultDP from "../img/default_dp.png";
import { useSelector } from "react-redux";
import { getProfilePhoto } from "./services/studentRequestHelper";

const ProfileImg = (props) => {
  const [profilePhoto, setProfilePhoto] = useState("");
  var [googleUserPhoto, setGoogleUserPhoto] = useState("");
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const userInfo = useSelector((state) => state.user.info);

  useEffect(() => {
    if (isLoggedIn) {
      const g_dp = localStorage.getItem(G_IMAGE_URL);
      if (g_dp) {
        setGoogleUserPhoto(g_dp);
      } else {
        getProfilePhoto(userInfo.studentId)
          .then((response) => {
            const base64 = btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            setProfilePhoto(base64);
          })
          .catch(() => {
            setProfilePhoto();
          });
      }
    } else {
      setProfilePhoto("");
      setGoogleUserPhoto("");
    }
  }, [isLoggedIn, userInfo.studentId, props]);

  // console.log(
  // "profilePhoto:--> ",
  // profilePhoto,
  // "| gphoto:--> ",
  // googleUserPhoto
  // );

  return (
    <div>
      <img
        className={props.className}
        onClick={() => {
          props.onClick();
        }}
        src={
          profilePhoto
            ? `data:image/jpeg;charset=utf-8;base64,${profilePhoto}`
            : googleUserPhoto
            ? googleUserPhoto
            : defaultDP
        }
        alt="DP"
      />
    </div>
  );
};

export default ProfileImg;
