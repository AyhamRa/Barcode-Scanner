import React from "react";
import { useState, useEffect, useRef } from "react";
import "./SecretPhrase.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function SecretPhrase() {
  const [secretPhrase, setSecretPhrase] = useState(new Array(12).fill(""));
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setErrorMsg("");
  }, [secretPhrase]);

  // Verify Secret Phrase
  async function verifySecretPhrase(e) {
    e.preventDefault();

    const url = "http://localhost:3000/api/verify-secret-phrase";
    const payload = {
      secretPhrase: secretPhrase.join(" "),
    };

    const response = await axios.post(url, payload);
    const data = response.data;
    console.log(data);
    if (data.success == 200) {
      toast.success("success", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // The secret phrase is correct, proceed with the password reset process
      console.log("Verified");
    } else {
      // The secret phrase is incorrect, display an error message
      toast.error("incorrect", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("not Verified");
    }
    // errorRef.current.focus();
  }

  const updateArray = (newValue, newIndex) => {
    const arr = [...secretPhrase];
    arr[newIndex] = newValue;
    setSecretPhrase(arr);
  };

  const handleSubmitSecrectPhrase = (e) => {
    e.preventDefault();
    verifySecretPhrase(e);
  };

  return (
    <div className="secret-phrase-form">
      <ToastContainer />
      <div className="secret-phrase-box">
        <form onSubmit={handleSubmitSecrectPhrase}>
          <h2 className="label3">Secret Phrase</h2>
          <div className="secret-phrase-container">
            {secretPhrase.map((value, index) => {
              return (
                <li className="list-of-components" key={index}>
                  <input
                    type="text"
                    className="secret-phrase"
                    value={value}
                    onChange={(e) => {
                      updateArray(e.target.value, index);
                    }}
                  />
                </li>
              );
            })}
            <div className="error-msg">{errorMsg}</div>
          </div>
          <button type="submit" className="submit-secret-phrase">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SecretPhrase;
