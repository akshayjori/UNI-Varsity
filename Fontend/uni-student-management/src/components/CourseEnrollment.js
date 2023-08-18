import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { COLORS, PUBLISHABLE_STRIPE_KEY } from "../constants";
import { enrollCourses, getAllCourses } from "./services/studentRequestHelper";
import { getNonCommonCourses } from "./services/Util";
import cc from "../css/courseEnrollment.module.css";
import { FcCheckmark } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import StripeCheckout from "react-stripe-checkout";
import { ToastContainer, toast } from "react-toastify";
import logo from "../img/uni-logo-dp2.jpg";
import BackArrow from "./BackArrow";

const CourseEnrollment = () => {
  const [allCourses, setAllCourses] = useState();
  const student = useSelector((state) => state.user.student);
  const [nonCommonCourses, setNonCommonCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [, setFlag] = useState(false);
  const colors = COLORS;
  var colorCounter = 0;
  var total = 0;
  var discount = selectedCourses?.length >= 3 ? 10 : 0;

  // set all nonCommonCourses from db
  useEffect(() => {
    getAllCourses().then((res) => {
      setAllCourses(res.data);
    });
  }, []);
  // set non-errolled nonCommonCourses
  useEffect(() => {
    setNonCommonCourses(
      getNonCommonCourses(student.courses, allCourses)?.map((c) => {
        return { ...c, selected: false };
      })
    );
  }, [student, allCourses]);

  const forceUpdate = () => {
    setFlag((state) => !state);
  };

  const toggleSelect = (idx) => {
    // update selected status in nonCommonCourses
    var state = nonCommonCourses;
    // console.log(state);
    state[idx].selected = !state[idx]?.selected;
    setNonCommonCourses(state);
    setSelectedCourses(state?.filter((c) => c.selected));
    forceUpdate();
  };

  // on successful payment - enroll courses
  const onToken = (token) => {
    console.log("Token of payment:", token);
    toast.success(`Payment successful`, {
      position: "top-center",
    });
    selectedCourses.forEach((c) => {
      delete c.selected;
    });
    enrollCourses(selectedCourses, student.studentId)
      .then(() => {
        toast.success(
          `Great!! you got ${selectedCourses.length} more courses.`,
          {
            position: "top-center",
            theme: "colored",
          }
        );
        setNonCommonCourses(
          getNonCommonCourses(selectedCourses, nonCommonCourses)
        );
      })
      .catch((err) => {
        toast.error(`Sorry! there was something wrong.`, {
          position: "top-center",
          theme: "colored",
        });
        console.log("Error while enrolling", err);
      });
  };

  return (
    <div className={cc.container}>
      <ToastContainer />
      <BackArrow className="pt-3" />
      <div className={cc.left_col}>
        <h1 className={cc.left_title}>Select Courses:</h1>
        <div className={cc.course_select_wrapper}>
          {nonCommonCourses?.map((c, idx) => {
            return (
              <div
                key={c.courseCode}
                className={cc.course_select_card}
                style={{ background: colors[colorCounter++] }}
                onClick={() => {
                  toggleSelect(idx);
                }}
              >
                <div className={cc.course_name}>
                  <h1>{c.courseName}</h1>
                  <p>Course price: &#8377;{c.price}</p>
                </div>
                {c.selected && <FcCheckmark className={cc.ok_tick} />}
              </div>
            );
          })}
        </div>
      </div>
      <div className={cc.right_col}>
        <h1 className={cc.right_title}>Checkout:</h1>
        <h5 className="text-info mt-4">
          ({selectedCourses?.length} courses selected)
        </h5>
        {discount === 0 ? (
          <h6 className="text-danger">
            Select {3 - selectedCourses?.length} more courses to avail 10%
            discount
          </h6>
        ) : (
          <h6 className="text-success">
            Discount of 10% applied succesfully <FcApproval />
          </h6>
        )}
        <table className="w-100 mt-5 table">
          <thead className="w-100">
            <tr className="w-100">
              <th className="w-50">Course Name</th>
              <th className="w-50">Price(&#8377;)</th>
            </tr>
          </thead>
          <tbody>
            {selectedCourses?.map((c) => {
              total += Number(c.price) * (1 - discount / 100);
              return (
                <tr key={c.courseCode}>
                  <td>{c.courseName}</td>
                  <td>{Number(c.price).toFixed(2)}</td>
                </tr>
              );
            })}
            {selectedCourses?.length === 0 && (
              <tr>
                <td colSpan={2}>No Courses Selected</td>
              </tr>
            )}
          </tbody>
          <thead>
            <tr>
              <th>Your Total</th>
              <th className="text-danger">
                &#8377;{total.toFixed(2)}{" "}
                {discount > 0 && (
                  <small className="text-danger">
                    (-{((total * discount) / (100 - discount)).toFixed(2)})
                  </small>
                )}
              </th>
            </tr>
          </thead>
        </table>
        <StripeCheckout
          token={onToken}
          stripeKey={PUBLISHABLE_STRIPE_KEY}
          name="UNI University Co."
          description="AJ's Student Management Portal"
          image={logo}
          ComponentClass="div"
          currency="INR"
          email={student.email}
          amount={total * 100}
        >
          <button
            className={`${cc.pay_btn} btn btn-warning`}
            {...(total === 0 && { disabled: true })}
          >
            Checkout
          </button>
        </StripeCheckout>
      </div>
    </div>
  );
};

export default CourseEnrollment;
