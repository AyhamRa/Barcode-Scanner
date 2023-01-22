import { useEffect, useState } from "react";
import "./Home.css";
import PopupMessage from "../homePage/PopupMessage";
import axios from "axios";
import Table from "../table/Table";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import decodeJwt from "jwt-decode";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function HomePage({ currentUser, search, accessToken }) {
  const [lastScannedBarCode, setLastScannedBarCode] = useState("");
  const [listOfScannedBarCodes, setListOfScannedBarCodes] = useState([]);
  const [sortType, setSortType] = useState("ID");
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    const hasLoggedIn = localStorage.getItem("hasLoggedIn");
    const decodedToken = decodeJwt(accessToken);
    // console.log(hasLoggedIn === null && decodedToken.data.role === "admin");
    if (hasLoggedIn === null && decodedToken.data.role === "admin") {
      setShowPopUp(true);
      localStorage.setItem("hasLoggedIn", true);
      console.log("showPopUp", showPopUp);
      return;
    }
  }, [currentUser]);

  document.onkeydown = (e) => {
    setTimeout(keyPressed(e), 500);
  };

  // Keyboard shortcuts fuction
  function keyPressed(e) {
    if (e.target != document.body) {
      return;
    }

    var charCode = typeof e.which == "number" ? e.which : e.keyCode;

    if (charCode != 13) {
      // ascii 13 is return key
      setLastScannedBarCode(
        lastScannedBarCode + String.fromCodePoint(charCode)
      );
    } else {
      // barcode reader indicate code finished with "enter"
      var lastCode = lastScannedBarCode;

      lastCode = remove_non_ascii(lastCode);
      setListOfScannedBarCodes([...listOfScannedBarCodes, lastCode]);
      addDynamicProductElement(lastCode);

      setLastScannedBarCode(""); // zero out last code (so we do not keep adding)
    }
  }

  function remove_non_ascii(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/[^\x20-\x7E]/g, "");
  }

  // Parsed scanned barcode
  function parseScannedItems(code) {
    const split = code.split(" ");
    console.log("this is my code", split);
    const productName_First = split[0];
    const productName_Secound = split[1];
    let productName = productName_First + " " + productName_Secound;
    const model = split[3];
    productName = remove_non_ascii(productName);

    return { productName, model };
  }

  // add a new product dynamically
  function addDynamicProductElement(code) {
    const parsedItems = parseScannedItems(code);

    const currentDate = moment();
    const creationDate = currentDate.format("DD-MM-YYYY HH:mm");
    console.log("creationDate", creationDate);

    let id = 0;
    listOfScannedBarCodes.forEach((item) => {
      id = Math.max(id, item.ProductID);
    });
    id++;

    listOfScannedBarCodes.push({
      select: false,
      ProductID: id,
      Model: parsedItems.model,
      Description: " ",
      ProductName: parsedItems.productName,
      User: currentUser,
      CreationDate: creationDate,
    });

    setListOfScannedBarCodes(listOfScannedBarCodes);
  }

  // handle click send products list to server
  const handleAddArticles = async () => {
    const selectedToAdd = listOfScannedBarCodes
      .filter((row) => row.select === true && row.ProductName && row.Model)
      .map((row) => {
        row.Description = document.getElementById(
          "description" + row.ProductID
        ).textContent;
        console.log(row.Description);
        return row;
      });

    // console.log("scanned-products", listOfScannedBarCodes);

    const url = "http://localhost:3000/products";
    const config = {
      headers: {
        token: accessToken,
      },
    };
    let response = null;
    try {
      response = await axios.post(url, selectedToAdd, config);
    } catch {
      console.log("error");
      return;
    }

    if (response.status != 200) {
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

      return;
    }
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

    const data = response.data;
    data.forEach((element) => {
      console.log("Prodcut faild, ID =", element);
    });

    // new filter for the remind Scanned cods
    const remindScanned = listOfScannedBarCodes.filter(
      (row) => row.select === false || !row.ProductName || !row.Model
    );

    setListOfScannedBarCodes(remindScanned);
    document.getElementById("checkAllbox").checked = false;
    const checkboxes = document.getElementsByClassName("check");

    // Cast From Html collection to array
    Array.from(checkboxes).map((elem) => (elem.checked = false));
  };

  // handle click of Delete button
  const handleDeleteButton = () => {
    const selectedToDelete = listOfScannedBarCodes.filter(
      (row) => row.select === false
    );
    toast.success("deleted", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setListOfScannedBarCodes(selectedToDelete);
  };

  const handleSortByProductName = () => {
    const sortedList = [...listOfScannedBarCodes].sort((a, b) => {
      return a.ProductName.localeCompare(b.ProductName);
    });
    setListOfScannedBarCodes(sortedList);
    setSortType("Name");
  };

  const handleSortByProductID = () => {
    const sortedList = [...listOfScannedBarCodes].sort((a, b) => {
      return a.ProductID - b.ProductID;
    });
    setListOfScannedBarCodes(sortedList);
    setSortType("ID");
  };

  useEffect(() => {
    if (sortType === "ID") {
      document.getElementById("header-button").innerHTML = "Sort by: ID";
      document.getElementById("name-option").innerHTML = "Name";
    } else {
      document.getElementById("header-button").innerHTML = "Sort by: Name";
      document.getElementById("name-option").innerHTML = "ID";
    }
  }, [sortType]);

  return (
    <div className="home">
      <ToastContainer />
      {showPopUp ? <PopupMessage setShowPopUp={setShowPopUp}/> : null}
      <div className="upper">
        <div className="btn-group">
          <div className="dropdown-table">
            <div className="hoffer-homepage">
              <button className="dropbtn-table">
                <div
                  id="header-button"
                  onClick={
                    sortType === "ID"
                      ? handleSortByProductID
                      : handleSortByProductName
                  }
                >
                  Sort by {sortType}
                </div>
                <KeyboardArrowDownIcon className="KeyboardArrowDownIcon" />
              </button>
            </div>
            <div className="dropdown-content-table">
              <a
                id="name-option"
                href="#"
                onClick={
                  sortType === "ID"
                    ? handleSortByProductName
                    : handleSortByProductID
                }
              >
                {sortType === "ID" ? "Name" : "ID"}
              </a>
            </div>
          </div>
          <button className="btn1" onClick={handleDeleteButton}>
            Delete
          </button>
          <button className="btn1" onClick={handleAddArticles}>
            Approve
          </button>
        </div>
      </div>

      <div className="scanned-table">
        <Table
          listOfScannedBarCodes={listOfScannedBarCodes}
          setListOfScannedBarCodes={setListOfScannedBarCodes}
          search={search}
          displayAsInput={true}
        ></Table>
      </div>
    </div>
  );
}

export default HomePage;