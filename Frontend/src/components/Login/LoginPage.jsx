import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./LoginPage.css";
import ResetPassword from "../resetPass/ResetPass";
import decodeJwt from "jwt-decode";
import { useNavigate } from "react-router-dom";

function LoginPage({ setCurrentUser, setLoggedOn, currentUser }) {
  const [currentpassword, setCurrentpassword] = useState("");
  const [userNameOnChange, setUsernameonChange] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);
  const navigate = useNavigate();

  const userRef = useRef();
  const errorRef = useRef();

  // set the focus in the first input. only happend when the compenot load
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // erase the Error message if the user change anything in the input
  useEffect(() => {
    setErrorMsg("");
  }, [currentUser, currentpassword]);

  const login_request = async (data = {}) => {
    const url = "http://localhost:3000/login";
    try {
      let response = await axios.post(url, data);

      // the word "data" come form axios req.body
      if (response.data.token) {
        const token = response.data.token;
        const decodedToken = decodeJwt(token);

        setLoggedOn(true);
        setCurrentUser(userNameOnChange);
        setErrorMsg("");

        localStorage.setItem("token", token);
        localStorage.setItem("role", decodedToken.data.role);
        localStorage.setItem("user", decodedToken.data.user);

        navigate("/home");
        return;
      }
    } catch (error) {
      //console.log(error)
      if (!error?.response) {
        setErrorMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrorMsg("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setErrorMsg("Wrong Username or Password");
      }
      errorRef.current.focus();
      return;
    }
    
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    username = username.toLowerCase();
    // console.log("username", username);
    const password = e.target.password.value;
    await login_request({ username, password });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setPasswordReset(true);
    navigate("/reset");
  };

  // ? means condition, : means else condition, <ResetPassword> come from resetPass components
  return (
    <div className="Login">
      {passwordReset ? (
        <ResetPassword
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
          currentpassword={currentpassword}
        ></ResetPassword>
      ) : ( 
        <div className="login-form">
          <h2 className="label2">Login</h2>
        <form onSubmit={(e) => handleLogin(e)}>
          <>
            <label className="label">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="input-login"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUsernameonChange(e.target.value)}
              name="username"
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="**********"
              className="input-login"
              id="password"
              name="password"
              onChange={(e) => setCurrentpassword(e.target.value)}
              required
            />
            <button type="submit" className="btn2">
              Log In
            </button>
            <button
              type="submit"
              className="forgot-pass"
              onClick={handleResetPassword}>
              Forgot password?
            </button>
            <div className="error-msg" ref={errorRef}>
              {errorMsg}
            </div>
          </>
        </form>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
