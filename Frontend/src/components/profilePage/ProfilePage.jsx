import React from 'react'
import "./ProfilePage.css"
import { useNavigate } from "react-router-dom";

function ProfilePage({ currentUser }) {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleChangePassword = () => { 
    if (role === "admin") {
      navigate("/secretphrase");
    } else {
    navigate("/reset"); };
  }
  return (
    <div className="profile">
      <div className="username-container">
      <label htmlFor="username-profile">
          Username:
        </label>
        <div id="username-profile">
        {currentUser}
        </div>
      </div>

      <div className="role-container">
      <label id="role">
          Role:
        </label>
        <div id="role">
        {role}
        </div>
      </div>

      <div className="password-container">
      <label htmlFor="password-change">
          Password:
        </label>
        <button id="edit" onClick={handleChangePassword }>
        Change Password
        </button>
      </div>
    
    </div>
  )
}

export default ProfilePage