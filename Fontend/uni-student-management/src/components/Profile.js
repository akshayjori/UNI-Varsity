import React, { useEffect, useRef, useState } from "react";
import cc from "../css/profile.module.css";
import "../css/profile.css";
import InputTableRow from "./InputTableRow";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileImg from "./ProfileImg";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdAddPhotoAlternate } from "react-icons/md";
import { updateStudent } from "./services/adminRequestHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deletProfilePhoto,
  uploadPhoto,
} from "./services/studentRequestHelper";
import AuthService from "./services/AuthService";
import { G_IMAGE_URL } from "../constants";

const Profile = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const userInfo = useSelector((state) => state.user.student);
  const [user, setUser] = useState({});
  const [alert, setAlert] = useState({});
  const navigate = useNavigate();
  const fileRef = useRef();
  const [file, setFile] = useState({ selected: false, name: "" });
  const [updateImage, setUpdateImage] = useState(false);
  const isLoggedIn = AuthService.isUserLoggedIn();

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  const updateHandler = (e) => {
    e.preventDefault();
    console.log(user);
    setAlert({});
    updateStudent(user)
      .then(() => {
        toast.success("Details updated successfully.", {
          position: "top-center",
          theme: "colored",
        });
        setIsDisabled(true);
      })
      .catch((err) => {
        if (err.response.data.message) {
          toast.error(err.response.data.message, {
            position: "top-center",
            theme: "colored",
          });
        }
        console.log("error while updating details", err);
        toast("Something went wrong!");
      });
  };

  const checkPhoto = (e) => {
    if (fileRef.current.value) {
      setFile({
        selected: true,
        name: fileRef.current.files[0].name,
      });
    } else setFile({ selected: false, name: "" });
  };

  const uploadPhotoHandler = (e) => {
    e.preventDefault();
    if (localStorage.getItem(G_IMAGE_URL)) {
      toast.warn("Cannot update google user's profile image", {
        position: "top-center",
        theme: "colored",
      });
      return;
    }
    const data = new FormData();
    data.append(
      `image`,
      fileRef.current.files[0],
      fileRef.current.files[0].name
    );
    uploadPhoto(data, user.studentId)
      .then((res) => {
        setUpdateImage((state) => {
          return !state;
        });
        toast.success("Photo uploaded.", {
          position: "top-center",
          theme: "colored",
        });
      })
      .catch((err) => {
        console.log("error while uploading photo", err);
        toast.error(err.response.data.message, {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  const deletePhoto = () => {
    if (localStorage.getItem(G_IMAGE_URL)) {
      toast.warn("Cannot delete google user's profile image", {
        position: "top-center",
        theme: "colored",
      });
      return;
    }
    deletProfilePhoto(user.studentId)
      .then(() => {
        toast.success("Profile Photo Deleted!", {
          position: "top-center",
          theme: "colored",
        });
        setUpdateImage((state) => {
          return !state;
        });
      })
      .catch((err) => {
        if (err.response.data.status === 404) {
          toast.warn(err.response.data.message, {
            position: "top-center",
            theme: "colored",
            autoClose: 1000,
          });
        } else if (err.response?.data?.message === "No value present") {
          toast.warn("Cannot delete google user's profile image", {
            position: "top-center",
            theme: "colored",
          });
        } else {
          console.log("Error while deleting profile photo:", err);
        }
      });
  };
  return (
    <div>
      <ToastContainer />
      <i
        className="bi bi-arrow-left-circle back-arrow text-info"
        onClick={() => {
          navigate(-1);
        }}
      ></i>
      <div className={cc.container}>
        <div className={cc.col_left}>
          <ProfileImg className={cc.profile_img} update={updateImage} />
          <div className={cc.dp_actions}>
            <form onSubmit={uploadPhotoHandler}>
              <div className={`${(cc.row, cc.row1)}`}>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={deletePhoto}
                >
                  <RiDeleteBin5Line className="pb-1" />
                </button>
                <label
                  htmlFor="file-upload"
                  className={`${cc.file_upload_btn} btn btn-secondary`}
                >
                  <MdAddPhotoAlternate className="pt-1" />
                </label>
                <input
                  id="file-upload"
                  type="file"
                  ref={fileRef}
                  accept="image/png, image/jpeg"
                  onChange={checkPhoto}
                />
              </div>{" "}
              {file.selected && (
                <>
                  <div className={`${(cc.row, cc.row2)} mt-3 mb-2`}>
                    <span className="w-100">
                      {file.name || "No"} Photo Selected
                    </span>
                  </div>
                  <div className={`${(cc.row, cc.row3)}`}>
                    <button type="submit" className="btn btn-info">
                      Upload Photo
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
        <form onSubmit={updateHandler} className={cc.col_right}>
          <table>
            <tbody>
              <InputTableRow
                name="firstName"
                lable="First name:"
                type="text"
                value={user.firstName}
                placeholder="Enter your first name"
                setUser={setUser}
                isDisabled={isDisabled}
              />
              <InputTableRow
                name="lastName"
                lable="Last name:"
                type="text"
                value={user.lastName}
                placeholder="Enter your last name"
                setUser={setUser}
                isDisabled={isDisabled}
              />
              <InputTableRow
                name="dob"
                lable="Birth date:"
                type="date"
                value={user.dob}
                setUser={setUser}
                isDisabled={isDisabled}
              />
              <InputTableRow
                name="email"
                lable="Email id:"
                type="text"
                value={user.email}
                placeholder="Enter email address"
                setUser={setUser}
                isDisabled={isDisabled || isLoggedIn}
              />
            </tbody>
          </table>{" "}
          {alert.message && (
            <div
              className={`alert alert-${alert.color}`}
              id="alert-box"
              role="alert"
            >
              {alert.message}
            </div>
          )}{" "}
          {isDisabled ? (
            <button
              className="btn btn-secondary w-75"
              onClick={() => setIsDisabled(false)}
            >
              Edit Details
            </button>
          ) : (
            <>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setIsDisabled(true);
                  setUser({});
                  setTimeout(() => {
                    setUser(userInfo);
                  }, 500);
                }}
              >
                Cancel Edit
              </button>
              <button type="submit" className="btn btn-info" onClick={() => {}}>
                Update Details
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
