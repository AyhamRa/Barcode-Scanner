import React, { useState } from 'react';
import "./SettingsPage.css"
import {SidebarsData} from './SidebarsData'

const SettingsPage = () => {
  const [activeButton, setActiveButton] = useState('Profile');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  }

  const Profile = () => {
    return (
      <div>
        This is the profile page.
      </div>
    );
  };
  
    const RegisterNewAccount = () => {
      return (
        <div>
          This is the register new account page.
        </div>
      );
    };

  return (
    <div className="setting-page">
      <div className="sidebar">
        <button onClick={() => handleButtonClick('Profile')}>Profile</button>
        <button onClick={() => handleButtonClick('Register new Account')}>Register new Account</button>
      </div>
      {activeButton === 'Profile' && <Profile />}
      {activeButton === 'Register new Account' && <RegisterNewAccount />}

    </div>
  );
};



export default SettingsPage;
