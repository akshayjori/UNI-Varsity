import { API_URL } from "../../constants";
import AuthService from "./AuthService";
import { request } from "./axios-service";

//while updating employee
//to verify if the typed current password is correct
export const verifyPassword = (employeeId, password) => {
  if (AuthService.getLoggedInUser().role === "ADMIN") {
    return new Promise(function (myResolve) {
      myResolve("OK");
    });
  }
  return request({
    url: `${API_URL}/verify-password`,
    method: "post",
    data: { employeeId, password },
  });
};

//updates employee
export const updateEmployee = (employee) => {
  return request({
    url: `${API_URL}/employees/${employee.employeeId}`,
    method: "put",
    data: employee,
  });
};

export const getAllStudents = (sortBy, sortOrder, pageNumber) => {
  return request({
    url: `${API_URL}/students?sortBy=${sortBy}&sortOrder=${sortOrder}&pageNumber=${pageNumber}`,
    method: "get",
  });
};

//get single student
export const getStudentById = (studentid) => {
  return request({
    url: `${API_URL}/students/${studentid}`,
    method: "get",
  });
};

//update student
export const updateStudent = (student) => {
  return request({
    url: `${API_URL}/students/${student.studentId}`,
    method: "put",
    data: student,
  });
};

//register new student
export const registerStudent = (student) => {
  return request({
    url: `${API_URL}/students`,
    method: "post",
    data: student,
  });
};

//deletes student
export const deleteStudent = (studentid) => {
  return request({
    url: `${API_URL}/students/${studentid}`,
    method: "delete",
  });
};

//search students
export const searchStudents = (search) => {
  return request({
    url: `${API_URL}/students/?search=${search}`,
    method: "get",
  });
};

//get sorted students
export const getSortedStudents = (sort, order) => {
  return request({
    url: `${API_URL}/students?sortBy=${sort}&sortOrder=${order}`,
    method: "get",
  });
};

//get course registration report
export const getCourseReport = () => {
  return request({
    url: `${API_URL}/courses/report`,
    method: "get",
  });
};
