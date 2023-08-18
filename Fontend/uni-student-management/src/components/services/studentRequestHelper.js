import { API_URL } from "../../constants";
import { request } from "./axios-service";

//register new user
export const registerUser = (user) => {
  return request({
    url: `${API_URL}/register`,
    method: "post",
    data: user,
  });
};

export const getLoggedInUserDetails = (email) => {
  return request({
    url: `${API_URL}/login/user`,
    method: "post",
    data: { email },
  });
};

export const getAllCourses = () => {
  return request({
    url: `${API_URL}/courses`,
    method: "get",
  });
};

export const enrollCourses = (courses, studentid) => {
  return request({
    url: `${API_URL}/students/${studentid}/enroll`,
    method: "post",
    data: courses,
  });
};

export const uploadPhoto = (data, studentid) => {
  return request({
    url: `${API_URL}/profilephoto/${studentid}`,
    method: "post",
    data: data,
  });
};

//get employee profile photo
export const getProfilePhoto = (studentid) => {
  return request({
    url: `${API_URL}/profilephoto/${studentid}`,
    method: "get",
    responseType: "arraybuffer",
  });
};

export const deletProfilePhoto = (studentid) => {
  return request({
    url: `${API_URL}/profilephoto/${studentid}`,
    method: "delete",
  });
};

export const sendEmailOTP = (email) => {
  return request({
    url: `${API_URL}/otp-verification/generate`,
    method: "post",
    data: { email },
  });
};

export const verifyEmailOTP = (email, otp) => {
  return request({
    url: `${API_URL}/otp-verification/validate`,
    method: "post",
    data: { email, otp },
  });
};
