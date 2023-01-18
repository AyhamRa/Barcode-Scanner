import React, { useState } from "react";
import "./SettingsPage.css";
import { getSidebarData } from "./SidebarsData";
import { NavLink, Outlet } from "react-router-dom";

const SettingsPage = () => {
  const role = localStorage.getItem("role");

  return (
    <div className="setting-page">
      <div className="sidebar">
        <ul className="component-list">
          {" "}
          {getSidebarData().map((val, key) => {
            return (
              <li className="component-row" key={key}>
                <NavLink to={val.path} id="title" relative="/settings">
                  <div className="component-row">
                    <div id="icon"> {val.icon} </div>
                    <div id="title">{val.title}</div>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default SettingsPage;
