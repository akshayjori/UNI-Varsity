import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cc from "../css/studentmanager.module.css";
import StudentRow from "./StudentRow";
import LoadingSpinner from "./LoadingSpinner";
import { getAllStudents, searchStudents } from "./services/adminRequestHelper";
import { FcSearch } from "react-icons/fc";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

const StudentManager = () => {
  const isLoading = useSelector((state) => state.common.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);
  const [sort, setSort] = useState({
    sortBy: "studentId",
    sortOrder: "asc",
    pageNumber: 0,
  });
  const searchRef = useRef();
  const [forceUpdate, setForceUpdate] = useState(false);
  var idAsc = sort.sortBy === "studentId" && sort.sortOrder === "asc";
  var nameAsc = sort.sortBy === "name" && sort.sortOrder === "asc";
  var emailAsc = sort.sortBy === "email" && sort.sortOrder === "asc";
  var courseAsc = sort.sortBy === "course" && sort.sortOrder === "asc";
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    // dispatch(commonActions.startLoadingSpinner());
    if (searchRef.current.value) {
      // searchStudentHandler();
      if (searchRef.current.value) {
        setSearching(true);
        searchStudents(searchRef.current.value)
          .then((res) => {
            setStudentList(res.data);
          })
          .catch((err) => {
            console.log("Error while searching students by keyword", err);
          });
      } else {
        setSearching(false);
        setForceUpdate((state) => {
          return !state;
        });
      }
    } else {
      getAllStudents(sort.sortBy, sort.sortOrder, sort.pageNumber).then(
        (response) => {
          // console.log(response.data);
          setStudentList(response.data.content);
          setIsFirstPage(response.data.pageNumber === 0);
          setIsLastPage(response.data.last);
          // dispatch(commonActions.stopLoadingSpinner());
        }
      );
    }
  }, [dispatch, forceUpdate, sort]);

  let inputChangeTimer;
  const searchStudentHandler = () => {
    clearTimeout(inputChangeTimer);
    inputChangeTimer = setTimeout(() => {
      if (searchRef.current.value) {
        setSearching(true);
        // console.log("searchRef", searchRef.current.value);
        searchStudents(searchRef.current.value)
          .then((res) => {
            setStudentList(res.data);
          })
          .catch((err) => {
            console.log("Error while searching students by keyword", err);
          });
      } else {
        setSearching(false);
        setForceUpdate((state) => {
          return !state;
        });
      }
    }, 200);
  };

  // console.log("studentList", studentList);

  //// page navigation..............

  const nextPage = () => {
    const nextPageNo = sort.pageNumber + 1;
    setSort((state) => {
      return {
        ...state,
        pageNumber: nextPageNo,
      };
    });
  };

  const previousPage = () => {
    const prevPageNo = sort.pageNumber - 1;
    setSort((state) => {
      return {
        ...state,
        pageNumber: prevPageNo,
      };
    });
  };

  //// sorting......................

  const sortByIdAsc = () => {
    searchRef.current.value = "";
    setSort({
      sortBy: "studentId",
      sortOrder: "asc",
      pageNumber: 0,
    });
  };
  const sortByIdDesc = () => {
    searchRef.current.value = "";
    setSort({
      sortBy: "studentId",
      sortOrder: "desc",
      pageNumber: 0,
    });
  };
  const sortByNameAsc = () => {
    searchRef.current.value = "";
    setSort({
      sortBy: "name",
      sortOrder: "asc",
      pageNumber: 0,
    });
  };
  const sortByNameDesc = () => {
    searchRef.current.value = "";
    setSort({
      sortBy: "name",
      sortOrder: "desc",
      pageNumber: 0,
    });
  };
  const sortByEmailAsc = () => {
    searchRef.current.value = "";
    setSort({
      sortBy: "email",
      sortOrder: "asc",
      pageNumber: 0,
    });
  };
  const sortByEmailDesc = () => {
    searchRef.current.value = "";
    setSort({
      sortBy: "email",
      sortOrder: "desc",
      pageNumber: 0,
    });
  };
  const sortByCourseAsc = () => {
    searchRef.current.value = "";
    setSort({
      sortBy: "course",
      sortOrder: "asc",
      pageNumber: 0,
    });
  };
  const sortByCourseDesc = () => {
    searchRef.current.value = "";
    setSort({
      sortBy: "course",
      sortOrder: "desc",
      pageNumber: 0,
    });
  };
  return (
    <div className={`${cc.all_student_table}`}>
      <i
        className={`${cc.back_arrow} bi bi-arrow-left-circle text-light h5`}
        onClick={() => {
          navigate(-1);
        }}
      ></i>
      <h1 className="text-light mb-4">All Employee Details</h1>
      <nav className={`${cc.search_bar} navbar navbar-light bg-light`}>
        <input
          className={`${cc.search_box} form-control`}
          type="search"
          placeholder="Type something... e.g. 100025, 25, Akshay, abc@gmail.com, chem, Physics, etc."
          aria-label="Search"
          ref={searchRef}
          onChange={searchStudentHandler}
        />
        <FcSearch className={cc.search_icon} />
        <button
          className="btn btn-success my-2 my-sm-0"
          type="button"
          onClick={searchStudentHandler}
        >
          Search
        </button>
      </nav>
      <table className="table table-striped table-bordered table-light">
        <thead className="thead-dark">
          <tr>
            <th className={cc.col1}>
              Student Id{" "}
              {idAsc && <BsFillCaretDownFill onClick={sortByIdDesc} />}{" "}
              {!idAsc && <BsFillCaretUpFill onClick={sortByIdAsc} />}
            </th>
            <th className={cc.col2}>
              Full Name{" "}
              {nameAsc ? (
                <BsFillCaretDownFill onClick={sortByNameDesc} />
              ) : (
                <BsFillCaretUpFill onClick={sortByNameAsc} />
              )}
            </th>
            <th className={cc.col3}>
              Email Id{" "}
              {emailAsc ? (
                <BsFillCaretDownFill onClick={sortByEmailDesc} />
              ) : (
                <BsFillCaretUpFill onClick={sortByEmailAsc} />
              )}
            </th>
            <th className={cc.col4}>
              Enrolled Courses{" "}
              {courseAsc ? (
                <BsFillCaretDownFill onClick={sortByCourseDesc} />
              ) : (
                <BsFillCaretUpFill onClick={sortByCourseAsc} />
              )}
            </th>
            <th className={cc.col5}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {" "}
          {isLoading && (
            <tr>
              <td colSpan={8}>
                <LoadingSpinner />
              </td>
            </tr>
          )}{" "}
          {studentList.map((student) => {
            return (
              <StudentRow
                student={student}
                key={student.studentId}
                setStudentList={setStudentList}
                setForceUpdate={setForceUpdate}
              />
            );
          })}
        </tbody>
      </table>
      <div>
        {" "}
        {!searching && !isFirstPage && (
          <button className="btn btn-success" onClick={previousPage}>
            Previous
          </button>
        )}{" "}
        {!searching && !isLastPage && (
          <button className="btn btn-success" onClick={nextPage}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentManager;
