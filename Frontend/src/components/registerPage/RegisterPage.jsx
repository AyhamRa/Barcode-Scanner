import React from "react";
import { useState, useEffect, useRef } from "react";
import { faCheck, faTimes, faInfoCircle } 
from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import axios from "axios";
import "./RegisterPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LockResetIcon from "@mui/icons-material/LockReset";

// Username start with a lowercase or upper case letter and then followed by 3 to 23 digits.
const userNameRegex = /^[A-z][A-z0-9-_]{3,23}$/;

// Password must contain at least one lowercase letter one UpperCase letter on Digits and one speacial character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;

function RegisterPage( {token} ) {
  const [userName, setUserName] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setpasswordFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [showIcons, setShowIcons] = useState(false);

  const userRef = useRef();
  const errorRef = useRef();

  // set the focus in the first input. only happend when the compenot load
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Validate the Username
  useEffect(() => {
    const userNameResult = userNameRegex.test(userName);
    setValidName(userNameResult);
  }, [userName]);

  // Validate the Password
  useEffect(() => {
    const passwordResult = passwordRegex.test(password);
    setValidPassword(passwordResult);
  }, [password]);

  // erase the Error message if the user change anything in the input
  useEffect(() => {
    setErrorMsg("");
  }, [userName, password]);

  // Genertation Password
  function generatePassword() {
    // The characters that can be used in the password
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialCharacters = "!@#$%.";

    // The minimum and maximum length of the password
    const minLength = 8;
    const maxLength = 24;

    // Generate a random number between 8 and 24 for the minimum password length
    const passwordLength = _.random(minLength, maxLength + 1);

    // Initialize the password as an empty string
    let password = "";

    // Add a random Letters, Numbers and Characters
    password += _.sample(uppercaseLetters);
    password += _.sample(lowercaseLetters);
    password += _.sample(numbers);
    password += _.sample(specialCharacters);

    // Add random characters from all character sets until the password is long enough
    while (password.length < passwordLength) {
      const characterSet =
        uppercaseLetters + lowercaseLetters + numbers + specialCharacters;
      password += _.sample(characterSet);
    }

    // Truncate the password if it is too long
    password = password.substring(0, maxLength);

    // Fill the password and confirm password fields with the generated password
    document.getElementById("password").value = password;
    setPassword(password);
  }

  const handleGeneratePassword = () => {
    generatePassword();
  };

  // handle the Creation of a new Account
  const handleRegister = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/register";
    const role = document.getElementsByClassName("dropdown-register")[0].value;
    const config = {
      headers: {
        token: token,
      },
    };
    try {
      const response = await axios.post(url, {
        user: userName,
        password,
        role
      }, config);
      toast.success("New user added successfully.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("new user has been add", response);
    } catch (error) {
      //console.log(error)
      if (!error?.response) {
        setErrorMsg("No Server Response");
      } else if (error.response?.status === 409) {
        setErrorMsg("Username already exists");
      } else {
        setErrorMsg("Registration did not succeed");
      }
      errorRef.current.focus();
      return;
    }
    setUserName(" ");
    setPassword(" ");
    setValidName(false);
    setValidPassword(false);
    setShowIcons(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="register">
        <form className="register-form" onSubmit={(e) => handleRegister(e)}>
          <label>
            <h2> Create new Account </h2>
          </label>
          <div className="Username-container">
            <label htmlFor="username">
              Username
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !userName || !showIcons ? "hide" : "invalid"}
              />
            </label>

            <input
              type="text"
              id="username"
              value={userName.toLocaleLowerCase()}
              placeholder="Username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUserName(e.target.value)}
              name="username"
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="user-note"
              onFocus={() => {setUserFocus(true), setShowIcons(true)}}
              onBlur={() => {setUserFocus(false), setShowIcons(false)}}
              required
            />
            <p
              id="user-note"
              className={
                userFocus && userName && !validName
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, number, and underscore are allowed.
            </p>
          </div>

          <div className="password-w-generate">
            <div className="passwordContainer">
              <label htmlFor="password">
                Password
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPassword ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPassword || !password || !showIcons ? "hide" : "invalid"}
                />
              </label>
              <input
                type="text"
                id="password"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="password-note"
                onFocus={() => {setpasswordFocus(true), setShowIcons(true)}}
                onBlur={() => {setpasswordFocus(false), setShowIcons(false)}}
                required
              />
            </div>

            <button
              id="btn-generate"
              type="button"
              onClick={handleGeneratePassword}
            >
              <LockResetIcon />
            </button>
          </div>
          <p
            id="password-note"
            className={
              passwordFocus && !validPassword ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters,
            <br />
            a number and a special character.
            <br />
            Allowed special characters:
            <span aria-label="exclamation mark">!</span>
            <span aria-label="at symbol">@</span>
            <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span>
          </p>

          <label> Role: </label>
          <select className="dropdown-register">
            <option value="user"> User </option>
            <option value="admin"> Admin </option>
            <option value="moderator"> Moderator </option>
          </select>

          <button className="btn">Sign Up</button>

          <div className="error-msg" ref={errorRef}>
            {errorMsg}
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;
