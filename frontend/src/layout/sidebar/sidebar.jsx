import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Styles from "./Sidebar.module.css";

const Sidebar = () => {
  const userId = localStorage.getItem("userId");
  const [isActive, setIsActive] = useState(false); 

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <button className={Styles.toggleButton} onClick={handleToggle}>
      <i className={!isActive ? "fas fa-times" : "fas fa-bars"}></i>
      </button>
      
      <div className={`${Styles.sidebar} ${isActive ? Styles.active : ""}`}>
        
        <button className={Styles.toggleButton} onClick={handleToggle}>
        <i className={!isActive ? "fas fa-times" : "fas fa-bars"}></i>
        </button>

        <NavLink
          to={`/home/scan/${userId}`}
          className={({ isActive }) => (isActive ? Styles.active : "")}
        >
          Scan
        </NavLink>
        <NavLink
          to={`/home/view-warranties`}
          className={({ isActive }) => (isActive ? Styles.active : "")}
        >
          View Warranties
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
