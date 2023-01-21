import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../table/Table";
import { ToastContainer, toast } from "react-toastify";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function ProductsPage({ token, currentUser, search }) {
  const [listOfScannedBarCodes, setListOfScannedBarCodes] = useState([]);
  const [sortType, setSortType] = useState("ID");
  const role = localStorage.getItem("role");
  //console.log("PrductsPage role:", role);

  useEffect(() => {
    const fetchBarcodes = async () => {
      // Send a GET request to the endpoint that retrieves the stored barcodes
      console.log(token);
      const url = "http://localhost:3000/products";
      const config = {
        headers: {
          token: token,
        },
      };
      try {
        // Send the request
        const response = await axios.get(url, config);
        // If the request is successful, set the barcodes state with the response data
        const data = response.data;
        data.barcods;
        // console.log("my world", data);
        setListOfScannedBarCodes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBarcodes();
  }, []);

  const handleDeleteButton = async () => {
    const selectedToDelete = Array.from(
      document.getElementsByClassName("check")
    )
      .filter((row) => row.checked === true)
      .map((row) => row.getAttribute("id"));
    let temp = [];

    const url = "http://localhost:3000/api/delete";
    const config = {
      headers: {
        token: token,
      },
    };

    const response = await axios.post(url, selectedToDelete, config);
    const data = response.data;
    if (data.success == 200) {
      listOfScannedBarCodes.forEach((elem) => {
        if (!selectedToDelete.includes(elem.ProductID.toString())) {
          temp.push(elem);
        }
      });
      setListOfScannedBarCodes(temp);
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
      // console.log("temp ", temp);
      // console.log("Deleted successfully");
    } else {
      console.log("not Authenticated");
    }
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

  console.log(currentUser);

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
      <div className="upper">
      <div className="btn-group">
          <div className="dropdown-table">
            <div className="hoffer-productspage">
              <button className="dropbtn-table">
                <div
                  id="header-button"
                  onClick={sortType === "ID" ? handleSortByProductID: handleSortByProductName}>
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
                  sortType === "ID" ? handleSortByProductName : handleSortByProductID}>
                {sortType === "ID" ? "Name" : "ID"}
              </a>
            </div>
          </div>
          {role === "user" ? null : (
            <button className="btn1" onClick={handleDeleteButton}>
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="scanned-table">
        <Table
          listOfScannedBarCodes={listOfScannedBarCodes}
          setListOfScannedBarCodes={setListOfScannedBarCodes}
          search={search}
        ></Table>
      </div>
    </div>
  );
}

export default ProductsPage;
