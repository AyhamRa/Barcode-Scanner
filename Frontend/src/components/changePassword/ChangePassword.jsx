import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ChangePassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Password must contain at least one lowercase letter one UpperCase letter on Digits and one speacial character
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;

function ChangePassword({ token }) {
  const [userName, setUserName] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setpasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const userRef = useRef();
  const errorRef = useRef();

  // set the focus in the first input. only happend when the compenot load
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Validate the Password
  useEffect(() => {
    const passwordResult = passwordRegex.test(newPassword);
    setValidPassword(passwordResult);
    const match = newPassword === matchPassword;
    setValidMatch(match);
  }, [newPassword, matchPassword]);

  // erase the Error message if the user change anything in the input
  useEffect(() => {
    setErrorMsg("");
  }, [matchPassword, newPassword]);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const url = "http://localhost:3000/change-password";

    try {
      const response = await axios.post(url, { newPassword, userName });
      console.log("response: ", response);
      if (response.status === 200) {
        toast.success("Your password has been reset successfully.", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          if (!token) {
          navigate("/login");}
          else {
            navigate("/home");
          }
        }, 2800);
      }
    } catch (error) {
      if (error.response.status === 403) {
        setErrorMsg("Username did not match");
      } else {
        setErrorMsg("error.response.data.message", error);
      }
    }
  };

  return (
    <div className="change-password">
      <ToastContainer />
      <div className="change-password-form">
        <h2 className="label2"> Reset Password </h2>
        <form onSubmit={(e) => handleChangePassword(e)}>
          <label htmlFor="username">Username</label>

          <input
            type="text"
            id="username"
            placeholder="Username"
            className="input-reset-password"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
            name="username"
            aria-describedby="user-note"
            required
          />

          <label htmlFor="password">
            Password
            <FontAwesomeIcon
              icon={faCheck}
              className={validPassword ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPassword || !newPassword ? "hide" : "invalid"}
            />
          </label>
          <input
            type="password"
            id="password"
            placeholder="**********"
            className="input-reset-password"
            onChange={(e) => setNewPassword(e.target.value)}
            name="password"
            aria-invalid={validPassword ? "false" : "true"}
            aria-describedby="password-note"
            onFocus={() => setpasswordFocus(true)}
            onBlur={() => setpasswordFocus(false)}
            required
          />

          <p
            id="password-note"
            className={
              passwordFocus && !validPassword ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase
            <br />
            letters, a number and a special
            <br />
            character. Allowed special characters:
            <span aria-label="exclamation mark">!</span>
            <span aria-label="at symbol">@</span>
            <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span>
          </p>

          <label htmlFor="confirm-password">
            Confirm Password
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPassword ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validMatch || !matchPassword ? "hide" : "invalid"}
            />
          </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="**********"
            className="input-reset-password"
            onChange={(e) => setMatchPassword(e.target.value)}
            name="confirm-password"
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="passwordConfirm-note"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            required
          />

          <p
            id="passwordConfirm-note"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match Password.
            <br />
          </p>

          <button className="btn-reset-password">Reset Password</button>

          <div className="error-msg" ref={errorRef}>
            {errorMsg}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
