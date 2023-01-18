import React from "react";

function PopupMessage({ setShowPopUp }) {
  return (
    <div className="popup-message">
      <div className="popup-message-content">
        <h2 className="Important"> Important! </h2>
        <p>
          Before you start, you need to know about an important security
          feature that we developed to advance the security level of your
          application. Upon deploying the application, you will be provided with
          a unique Secret Phrase. This Secret Phrase is a combination of random
          words that will be used to regain access to your application if you
          ever lost your password.
        </p>
        <p id="paragraph-1">
          It is imperative that you save this phrase in a secure location where
          only you have access to it.
        </p>
        <p>
          The secret phrase is:
          <br />
          <strong id="paragraph-2">
            "Repeat Shadow Fire Voltage Memory Duty Relax Estimated Agency
            Author Campus Emotion"
          </strong>
        </p>
        <p>
          We strongly advise that you write it down and store it in a safe
          place.
        </p>
        <button className="btn1" onClick={() => setShowPopUp(false)}>
          Close
        </button>
      </div>
    </div>
  );
}

export default PopupMessage;
