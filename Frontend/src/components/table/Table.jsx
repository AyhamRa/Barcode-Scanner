import React from "react";
import { useState, useEffect } from "react";
import "./Table.css"

const Table = ( { listOfScannedBarCodes, setListOfScannedBarCodes, search, displayAsInput }) => {
  const [displayColumn, setDisplayColumn] = useState(false);
  let counterID = 1;

  useEffect(() => {
    const path = window.location.pathname;
    setDisplayColumn(path.includes("/products") ? true : false);
  }, [displayColumn]);

  // handl all checkboxes
  const handleCheckALLCheckbox = (e) => {
    const checked = e.target.checked;
    const checkboxes = document.getElementsByClassName("check");

    // Cast From Html collection to array
    Array.from(checkboxes).map((elem) => (elem.checked = checked));

    setListOfScannedBarCodes(
      listOfScannedBarCodes.map((d) => {
        d.select = checked;

        return d;
      })
    );
    console.log(listOfScannedBarCodes);
  };

  // handl all checkbox
  const handleCheckbox = (e) => {
    const id = e.target.id;

    const checked = e.target.checked;
    setListOfScannedBarCodes(
      listOfScannedBarCodes.map((data) => {
          if (Number(id) === data.ProductID) {
            data.select = checked; //true
          }

        return data;
      })
    );
  };

  return (
    <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              id="checkAllbox"
              className="checkbox"
              onChange={handleCheckALLCheckbox}
            ></input>
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Model</th>
          <th>Description</th>

          {displayColumn && (
            <>
              <th>CreationDate</th>
              <th>Scanned by</th>
            </>
          )}
        </tr>
      </thead>

      <tbody className="table1" id="table1">
        {listOfScannedBarCodes
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.ProductName.toLowerCase().includes(search.toLowerCase()) ||
                  item.Model.toLowerCase().includes(search.toLowerCase());
          })
          .map((d) => (
            <tr key={d.ProductID}>
              <th>
                <input
                  className="check"
                  type="checkbox"
                  onChange={handleCheckbox}
                  id={d.ProductID}
                ></input>
              </th>
              <td>{displayColumn ? d.ProductName.slice(0, 2) + '-' + d.ProductID : d.ProductID}</td>
              <td>{d.ProductName}</td>
              <td>{d.Model}</td>
              <td>
                {displayAsInput ? (
                  // <input type="text" id="description" defaultValue={d.Description} />
                  <div contentEditable="true" id={"description" + d.ProductID} suppressContentEditableWarning data-placeholder="Enter a description">
                  {d.Description}
                </div>
                ) : (
                  d.Description
                )}
              </td>

              {displayColumn && (
                <>
                  <td>{d.CreationDate}</td>
                  <td>{d.User}</td>
                </>
              )}
            </tr>
          ))}
      </tbody>
    </table>

    </div>
  );
};

export default Table;