import Box from "./Box";
import "../css/loginBox.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import authService from "./services/AuthService";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { G_CLIENT_ID, G_IMAGE_URL, G_PASS, G_USER } from "../constants";
import {
  getLoggedInUserDetails,
  registerUser,
  sendEmailOTP,
  verifyEmailOTP,
} from "./services/studentRequestHelper";
import { userActions } from "../store/userSlice";
import AuthService from "./services/AuthService";
import { gapi } from "gapi-script";
import { registerStudent } from "./services/adminRequestHelper";
import InputTableRow from "./InputTableRow";
import { TiArrowBack } from "react-icons/ti";
import { validateUser } from "./services/Util";
import { FaBirthdayCake, FaUserEdit } from "react-icons/fa";
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userIdRef = useRef("");
  const passwordRef = useRef("");
  const [isValid, setIsValid] = useState(false);
  const [alert, setAlert] = useState({ message: "", color: "" });
  const [isRegistering, setIsRegistering] = useState(false);
  const initialUserState = {
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialUserState);
  const loggedInUser = useSelector((state) => state.user.info);
  const dispatch = useDispatch();
  const [counter, setCouter] = useState(0);
  const otpRef = useRef();
  const [showOTP, setShowOTP] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    if (location?.state?.message) {
      toast.warning(location?.state?.message, {
        position: "top-center",
      });
      location.state.message = {};
    }
  }, [location?.state]);

  // if user is logged in already - redirect to /home
  useEffect(() => {
    document.body.style = "background: grey;";
    if (AuthService.isUserLoggedIn()) {
      if (loggedInUser.role === "ADMIN") navigate("/admin/home");
      else navigate("/home");
    }
    return () => {
      document.body.style.background = null;
    };
  }, [navigate, loggedInUser]);

  // normal login ----------------------------------------------------------------------------
  const submitHandler = (event) => {
    setAlert({});
    event.preventDefault();
    if (isRegistering) registrationHandler();
    else loginHandler();
  };

  // if user is logging in
  const loginHandler = () => {
    const email = userIdRef.current?.value;
    const password = passwordRef.current?.value;
    authService
      .executeJwtAuthenticationService(email, password)
      .then((response) => {
        // store token in localstorage
        authService.registerSuccessfulLogin(response.data.token, email);
        navigate("/home");
      })
      .catch((error) => {
        if (error.response.status === 401)
          toast.error("Invalid Credentials", {
            position: "top-center",
            theme: "colored",
          });
        else {
          toast.error("Something went wrong", {
            position: "top-center",
            theme: "colored",
          });
          console.log("error", error);
        }
      });
  };

  // register user
  const registrationHandler = () => {
    // verify all fields of user object
    if (validateUser(user)) {
      // return if email verification is not done
      if (!isEmailVerified) {
        otpRef.current.backgroundColor = "red";
        toast.warning("Please Verify your email.", { position: "top-center" });
        return;
      }
      // console.log("registering", user);
      registerUser(user)
        .then(() => {
          setAlert({
            message: "User Registered Successfully",
            color: "success",
          });
          toast.success("User Registered Successfully.", {
            position: "top-center",
            theme: "colored",
          });
          document.getElementById("login-form").reset();
        })
        .catch((error) => {
          if (error.response.data.message !== "") {
            toast.warning(error.response.data.message, {
              position: "top-center",
              theme: "colored",
            });
          } else {
            console.log("error while registering new user", error);
            toast.error("Something went wrong!");
          }
        });
    }
  };

  // google login -----------------------------------------------------------------------------

  // to initialize google app client on every render
  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: G_CLIENT_ID,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  // handle successful signin/up
  const onSuccess = (res) => {
    //getting the profile info received
    const firstName = res.profileObj.givenName;
    const lastName = res.profileObj.familyName;
    const email = res.profileObj.email;

    // get jwt token using special user & store it in localStorage
    authService
      .executeJwtAuthenticationService(G_USER, G_PASS)
      .then((response) => {
        console.log("response received using G_USER", response);
        authService.registerSuccessfulLogin(response.data.token, email);
        localStorage.setItem(G_IMAGE_URL, res.profileObj.imageUrl);

        // now get user info from api
        getLoggedInUserDetails(email)
          .then((res) => {
            console.log("user receive with G_USER token:", res);
            // CASE 1: success - means user exists
            // store user in redux store
            dispatch(
              userActions.storeUser({
                studentId: res.data.studentid,
                fullname: `${firstName} ${lastName}`,
                role: res.data.role,
              })
            );
            // google login - complete
            if (res.data.role === "ADMIN") navigate("/home/admin");
            else navigate("/home");
          })
          .catch((error) => {
            console.log("google user doesn't exist in db", error);
            // CASE 2: failed - means new user
            // register new student
            const student = {
              firstName,
              lastName,
              email,
            };
            registerStudent(student)
              .then((res) => {
                console.log("new googel user created in db:", res);
                dispatch(
                  // on success - store user in redux store
                  userActions.storeUser({
                    studentId: res.data.studentId,
                    fullname: `${firstName} ${lastName}`,
                    role: res.data.role,
                  })
                );
                // google signup - complete
                if (res.data.role === "ADMIN") navigate("/home/admin");
                else navigate("/home");
              })
              .catch((error) => {
                console.log("error while registering google user: ", error);
              });
          });
      })
      .catch((error) => {
        console.log("error while getting jwt-token using G_USER:", error);
      });
  };

  // handle failed signin/up
  const onFailure = (err) => {
    console.log("google signin failed", err);
  };

  const inputChangeHandler = () => {
    navigate({ message: {} }); // removing "logged out" message
    const email = userIdRef.current?.value;
    const password = passwordRef.current?.value;
    if (email !== "" && password !== "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setUser((state) => {
      return { ...state, email, password };
    });
  };

  //// OTP verification ............................................................

  const sendOTP = () => {
    const promise = sendEmailOTP(user.email)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
    toast.promise(
      promise,
      {
        pending: "Sending OTP...",
        success:
          "OTP Sent to " +
          user.email.slice(0, 2) +
          "********" +
          user.email.slice(-4),
        error: "Couldn't send the OTP",
      },
      { position: "top-center" }
    );
  };
  const verifyOTPHandler = () => {
    const otp = otpRef.current.value;
    // console.log("OTP", otp);
    verifyEmailOTP(user.email, otp)
      .then(() => {
        toast.success("Email verified successfully", {
          position: "top-center",
          theme: "colored",
        });
        setShowOTP(false);
        setIsEmailVerified(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid OTP", {
          position: "top-center",
          theme: "colored",
        });
        setIsEmailVerified(false);
      });
  };

  return (
    <div className="login-box">
      <h1 className="heading text-center text-light mb-4">
        {isRegistering ? "Register" : "Login Here"}
      </h1>
      <Box>
        <form onSubmit={submitHandler} id="login-form">
          {isRegistering && (
            <div className="reveal-box">
              <table className="registration-fields">
                <tbody>
                  <InputTableRow
                    name="firstName"
                    lable="First name:"
                    type="text"
                    placeholder="Enter your first name"
                    setUser={setUser}
                    setAlert={setAlert}
                    icon={<FaUserEdit />}
                  />
                  <InputTableRow
                    name="lastName"
                    lable="Last name:"
                    type="text"
                    placeholder="Enter your last name"
                    setUser={setUser}
                    setAlert={setAlert}
                    icon={<MdDriveFileRenameOutline />}
                  />
                  <InputTableRow
                    name="dob"
                    lable="Birth date:"
                    type="date"
                    setUser={setUser}
                    setAlert={setAlert}
                    icon={<FaBirthdayCake className="mb-1" />}
                  />
                  <InputTableRow
                    name="email"
                    lable="Email id:"
                    type="text"
                    placeholder="Enter email address"
                    setUser={setUser}
                    setAlert={setAlert}
                    setValidEmail={setShowOTP}
                    icon={<MdEmail />}
                    verified={isEmailVerified}
                    setVerified={setIsEmailVerified}
                  />
                  {showOTP && (
                    <tr>
                      <td></td>
                      <td>
                        <div className="otp-verification-div">
                          <button
                            className="btn btn-dark w-25"
                            type="button"
                            onClick={sendOTP}
                          >
                            Send OTP
                          </button>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter OTP"
                            ref={otpRef}
                          />
                          <button
                            className="btn btn-success w-25"
                            type="button"
                            onClick={verifyOTPHandler}
                          >
                            Verify
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                  <InputTableRow
                    name="password"
                    lable="Password:"
                    type="password"
                    placeholder="Enter your password"
                    setUser={setUser}
                    setAlert={setAlert}
                    icon={<RiLockPasswordFill />}
                  />
                </tbody>
              </table>
            </div>
          )}

          {!isRegistering && (
            <>
              {counter > 0 && <div className="shrinking-div"></div>}
              <div className="form-group">
                <label htmlFor="userid">Enter Email Id:</label>
                <input
                  className="form-control"
                  type="text"
                  id="userid"
                  placeholder="Enter your email id"
                  ref={userIdRef}
                  required
                  onChange={inputChangeHandler}
                  onFocus={() => {
                    setAlert({});
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Enter Password:</label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  ref={passwordRef}
                  onChange={inputChangeHandler}
                  onFocus={() => {
                    setAlert({});
                  }}
                />
              </div>
            </>
          )}
          {!isRegistering ? (
            <div>
              <span className="left-span">Don't have an account?</span>&nbsp;
              <span
                className="right-span"
                onClick={() => {
                  setIsRegistering(true);
                  setCouter((c) => c + 1);
                  setAlert({});
                }}
              >
                Register here <TiArrowBack />
              </span>
            </div>
          ) : (
            <div>
              <span className="left-span">Already have an account?</span>
              &nbsp;
              <span
                className="right-span"
                onClick={() => {
                  setIsRegistering(false);
                  setAlert({});
                  setIsValid(false);
                }}
              >
                Go back to login <TiArrowBack />
              </span>
            </div>
          )}
          {alert.message && (
            <div
              className={`alert alert-${
                alert.color || "warning"
              } text-center mt-3 mb-0`}
              role="alert"
            >
              {alert.message}
            </div>
          )}
          {isRegistering ? (
            <button className="btn btn-success">Register</button>
          ) : (
            <button className="btn btn-success" disabled={!isValid}>
              Login
            </button>
          )}
        </form>
        <div className="google-login">
          <GoogleLogin
            className="google-login-btn"
            clientId={G_CLIENT_ID}
            buttonText="Continue with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={false}
          />
        </div>
        <ToastContainer />
      </Box>
    </div>
  );
};

export default Login;
