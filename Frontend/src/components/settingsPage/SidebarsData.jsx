import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export const getSidebarData = () => {
  const role = localStorage.getItem("role");

  const SidebarsData = [
    {
      title: "Profile",
      icon: <AccountCircleIcon />,
      path: "profile",
    },
  ];
  if (role === "admin") {
    SidebarsData.push(
      {
        title: "Users",
        icon: <GroupIcon />,
        path: "users",
      },
      {
        title: "New Account",
        icon: <PersonAddIcon />,
        path: "register",
      }
    );
  }
  return SidebarsData;
};
