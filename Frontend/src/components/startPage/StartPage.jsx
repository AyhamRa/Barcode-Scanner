import React from "react";
import "./StartPage.css";
import { Link } from "react-router-dom";

function StartPage() {
  return (
    <div className="start-page">
      
      <div className="left-side">
      <h2>Welcome to our barcode scanning service!</h2>
      <br />
        <p className="text" id="text">
          Our service is designed to help businesses in the industry field
          streamline and automate their operations by providing an easy and
          convenient way to scan and track barcodes.
        </p>
        <br />
        <p className="text" id="text">
          With our web application, you can quickly and accurately scan barcodes
          and save the information to a database for later reference. Whether
          you're managing inventory, tracking the movement of goods, or simply
          need a reliable way to store and access product information, our
          service is here to help.
        </p>
        <br />
        <p className="text" id="text">
          Our user-friendly interface and powerful features make it easy to use,
          and our commitment to security and privacy means you can trust us to
          keep your data safe and secure. We believe that our service can make a
          real difference in the way you do business, and we are dedicated to
          providing the best possible experience to our customers. Thank you for
          choosing our service, and we hope you'll find it to be an invaluable
          tool in your operations.
        </p>
        <Link to="/login">
        <button className="btn-get-stated">GET STARTED</button>
        </Link>
      </div>
      
      <div className="right-side">
        <object data="Barcode-amico.svg"  width="500" height="500"></object>
      </div>
    </div>
  );
}

export default StartPage;
