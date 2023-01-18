import { useState, useEffect, useRef } from "react";
import React from "react";
import "./resetPass.css";
import axios from "axios";
import decodeJwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function ResetPassword() {
  
  const [adminPassword, setAdminPassword] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showSecretPhraseField, setShowSecretPhraseField] = useState(false);

  const errorRef = useRef();
  const navigate = useNavigate();

  const login_request = async (data = {}) => {
    const url = "http://localhost:3000/login";
    try {
      let response = await axios.post(url, data);

      // the word "data" come form axios req.body
      console.log(response.data);
      if (response.data.token) {
        const token = response.data.token;

        const decodedToken = decodeJwt(token);
        if (decodedToken.data.role === "admin") {
          // toast.success("success", {
          //   position: "top-center",
          //   autoClose: 1000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          // });

          // The secret phrase is correct, proceed with the password reset process
          console.log("Verified");
          navigate("/change-password");
        } else {
          toast.error("not an Admin", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        setErrorMsg("");
        console.log(token);
        console.log(decodedToken);

        return;
      }
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        setErrorMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrorMsg("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setErrorMsg("Wrong Username or Password");
      }
    }
  };

  const handleShowSecretPhraseField = (e) => {
    e.preventDefault();
    setShowSecretPhraseField(true);
    navigate("/secretphrase")
  };

  const handleAdminIsTrue = async (e) => {
    e.preventDefault();
    await login_request({ username: adminUsername, password: adminPassword });
    if (!adminUsername && !adminPassword) {
      toast.error("incoorect", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }); 
    }
  };

  return (
    <div className="resetPassword">
      <ToastContainer />
      <div className="resetPass-form">
          <>
            <label htmlFor="admin-username">Admin Username</label>
            <input
              type="text"
              id="admin-username"
              className="input-reset"
              value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
            />
            <label htmlFor="admin-password">Admin Password</label>
            <input
              type="password"
              id="admin-password"
              className="input-reset"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            <button
              type="button"
              className="btn-reset-pass"
              onClick={handleAdminIsTrue}
            >
              Reset
            </button>
            <button
              type="button"
              className="btn-secret-phrase"
              onClick={handleShowSecretPhraseField}
            >
              Secret Phrase
            </button>
          </>
      </div>
    </div>
  );
}

export default ResetPassword;


