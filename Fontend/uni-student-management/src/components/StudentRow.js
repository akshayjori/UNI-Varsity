import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import DeleteAlert from "./DeleteAlert";
import { deleteStudent, updateStudent } from "./services/adminRequestHelper";
import cc from "../css/studentrow.module.css";
import { COLORS } from "../constants";
import InputTableRow from "./InputTableRow";
import Select from "react-select";
import { getAllCourses } from "./services/studentRequestHelper";
import { ToastContainer, toast } from "react-toastify";

const StudentRow = (props) => {
  const s = props.student;
  const [student, setStudent] = useState(s);
  const [deleteAlert, setDeleteAlert] = useState({
    message: "",
    show: false,
  });
  const colors = COLORS;
  const [showUpdate, setShowUpdate] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    // assign options
    getAllCourses()
      .then((res) => {
        const courses = res.data;
        var opts = [];
        courses.forEach((c) => {
          opts.push({ value: c, label: c.courseName });
        });
        setOptions(opts);
      })
      .catch((err) => {
        console.log("couldn't get courses", err);
      });
    // assign selected options
    var selectOpts = [];
    student.courses.forEach((c) => {
      selectOpts.push({ value: c, label: c.courseName });
    });
    setSelectedOptions(selectOpts);
  }, [student.courses]);

  // on clickin update
  const updateHandler = () => {
    updateStudent(student)
      .then((res) => {
        toast.success("Student Updated Successfuly.", {
          position: "top-center",
          theme: "colored",
          autoClose: 5000,
        });
        props.setForceUpdate((state) => {
          return !state;
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Something went wrong !!!", {
          position: "top-center",
          theme: "colored",
        });
        console.log("error while updating student", err);
      });
  };
  const cancelUpdate = () => {
    if (showUpdate) {
      setStudent(s);
    }
    setShowUpdate((state) => {
      return !state;
    });
  };

  const deleteHandler = () => {
    setDeleteAlert({
      message: `Do you really want to delete ${s.firstName} ${s.lastName} (Student Id: ${s.studentId}) ?`,
      show: true,
    });
  };
  const confirmDelete = (confirm) => {
    if (confirm) {
      deleteStudent(s.studentId).then(() => {
        props.setForceUpdate((state) => {
          return !state;
        });
        setDeleteAlert({
          message: "",
          show: false,
        });
      });
    } else {
      setDeleteAlert({
        message: "",
        show: false,
      });
      return;
    }
  };

  const selectChangeHandler = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    var selectedCourses = [];
    selectedOptions.forEach((o) => {
      selectedCourses.push(o.value);
    });
    setStudent((student) => {
      return { ...student, courses: selectedCourses };
    });
  };
  // 5 columns
  return (
    <>
      <tr>
        <td>{s.studentId}</td>
        <td>{`${s.firstName} ${s.lastName}`} </td>
        <td>{s.email}</td>
        <td>
          {" "}
          {s.courses.length > 0 ? (
            <div className={cc.courses}>
              {" "}
              {s.courses.map((c, idx) => {
                return (
                  <div
                    className={cc.course}
                    style={{ background: colors[idx] }}
                    key={c.courseCode}
                  >
                    {c.courseCode}
                  </div>
                );
              })}
            </div>
          ) : (
            "Not enrolled into any courses"
          )}
        </td>
        <td className="actions-col">
          <button className="btn btn-warning ml-3" onClick={cancelUpdate}>
            {showUpdate ? "Cancel" : "Update"}
          </button>
          <button className="btn btn-danger ml-3" onClick={deleteHandler}>
            Delete
          </button>
        </td>{" "}
        {deleteAlert.show &&
          ReactDOM.createPortal(
            <DeleteAlert
              deleteAlert={deleteAlert}
              confirmDelete={confirmDelete}
            />,
            document.getElementById("delete-alert-root")
          )}
      </tr>{" "}
      {showUpdate && (
        <tr className={cc.update_row}>
          <td colSpan={5}>
            <div className={cc.update_box}>
              <table className="w-50">
                <tbody>
                  <InputTableRow
                    className={cc.left_col}
                    name="firstName"
                    lable="First name:"
                    type="text"
                    value={student.firstName}
                    placeholder="Enter your first name"
                    setUser={setStudent}
                  />
                  <InputTableRow
                    className={cc.right_col}
                    name="lastName"
                    lable="Last name:"
                    type="text"
                    value={student.lastName}
                    placeholder="Enter your last name"
                    setUser={setStudent}
                  />
                </tbody>
              </table>
              <table className="w-50">
                <tbody>
                  <InputTableRow
                    className={cc.left_col}
                    name="dob"
                    lable="Birth date:"
                    type="date"
                    value={student.dob}
                    setUser={setStudent}
                  />
                  <InputTableRow
                    className={cc.right_col}
                    name="email"
                    lable="Email id:"
                    type="text"
                    value={student.email}
                    placeholder="Enter email address"
                    setUser={setStudent}
                  />
                </tbody>
              </table>
              <div className={cc.select_wrapper}>
                <label className={cc.select_label}>Enrolled Courses:</label>
                <Select
                  className={cc.select}
                  closeMenuOnSelect={false}
                  isMulti
                  options={options}
                  defaultValue={selectedOptions}
                  onChange={selectChangeHandler}
                />
                <button className={`btn btn-info`} onClick={updateHandler}>
                  Update
                </button>
                <ToastContainer />
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default StudentRow;
