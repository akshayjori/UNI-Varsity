import { useEffect, useRef, useState } from "react";
import {
  getCurrentDateMinusYear,
  validateDob,
  validateEmail,
  validateName,
  validatePassword,
} from "./services/Util";
import "../css/inputtablerow.css";
import { FcApproval } from "react-icons/fc";

const InputTableRow = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const valueRef = useRef();

  useEffect(() => {
    if (props.value) {
      valueRef.current.value = props.value;
    }
    return () => {
      setErrorMessage("");
    };
  }, [props?.value]);

  const date = getCurrentDateMinusYear(10);
  const additionalAttributes =
    props.name === "firstName"
      ? {
          pattern: "[A-Za-z]+",
          title: "First name cannot contain white spaces or special characters",
        }
      : props.name === "lastName"
      ? {
          pattern: "[A-Za-z]+",
          title: "Lirst name cannot contain white spaces or special characters",
        }
      : props.name === "dob"
      ? {
          max: date,
          title: "Select your date of birth",
        }
      : props.name === "email"
      ? {
          pattern: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
          title: "please enter valid email",
        }
      : props.name === "password"
      ? {
          title: "Password must have at least 6 characters",
        }
      : {};

  let inputChangeTimer;
  const inputChangeHandler = (e) => {
    //resetting any errorMessages
    clearTimeout(inputChangeTimer);
    if (errorMessage !== "") {
      setErrorMessage("");
    }
    inputChangeTimer = setTimeout(() => {
      const { name, value } = e.target; // validations
      switch (name) {
        case "firstName":
          if (!validateName(value))
            setErrorMessage(
              "Cannot contain white spaces or special characters"
            );
          else
            props.setUser((state) => {
              return { ...state, [name]: value };
            });
          break;

        case "lastName":
          if (!validateName(value))
            setErrorMessage(
              "Cannot contain white spaces or special characters"
            );
          else
            props.setUser((state) => {
              return { ...state, [name]: value };
            });
          break;

        case "email":
          if (props.setVerified) props.setVerified(false);
          if (!validateEmail(value)) {
            setErrorMessage("Please enter a valid email");
            if (props.setValidEmail) props.setValidEmail(false);
          } else {
            props.setUser((state) => {
              return { ...state, [name]: value };
            });
            if (props.setValidEmail) props.setValidEmail(true);
          }
          break;

        case "dob":
          if (validateDob(value))
            props.setUser((state) => {
              return { ...state, [name]: value };
            });
          break;

        case "password":
          if (!validatePassword(value))
            setErrorMessage("Password must have at least 6 characters");
          else
            props.setUser((state) => {
              return { ...state, [name]: value };
            });
          break;

        default:
          break;
      }
    }, 1000);
  };

  return (
    <tr className={`${props.className} input-table-row`}>
      <td className="left-col text-left">
        <label>
          <span className="icon">{props.icon}</span> {props.lable}{" "}
          {props.verified ? <FcApproval /> : ""}
        </label>
      </td>
      <td className="right-col">
        <input
          className={`form-control ${errorMessage ? "invalid" : ""}`}
          name={props.name}
          type={props.type}
          defaultValue={props.value ? props.value : ""}
          ref={valueRef} // defaultValue={props.value ? props.value : ""}
          disabled={props.isDisabled}
          placeholder={props.placeholder}
          {...additionalAttributes}
          required
          onChange={inputChangeHandler}
          onFocus={() => {
            if (props.setAlert) props.setAlert({});
          }}
        />{" "}
        {errorMessage && (
          <div className="error-box">
            <small className="tooltiptext">{errorMessage}</small>
          </div>
        )}
      </td>
    </tr>
  );
};

export default InputTableRow;
