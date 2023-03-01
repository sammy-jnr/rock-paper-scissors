import React from 'react'
import "./Navigation.css"
import homeIcon from "../../Assets/Icons/homeIcon.svg";
import friendsIconL from "../../Assets/Icons/friendsIconL.svg";
import settingsIcon from "../../Assets/Icons/settingsIcon.svg";
import notificationIcon from "../../Assets/Icons/notificationIcon.svg";
import { useParams, useLocation } from 'react-router-dom';



const Navigation = () => {
  const pathname = window.location.pathname
  
  return (
    <nav id='navigationContainer'>
      <div className="navItems"
      style={{backgroundColor: pathname === "/" ? "#0e0e36" : ""}}
      >
        <img src={homeIcon} alt="" className='largeIcon homeIcon'/>
      </div>
      <div className="navItems"
      style={{backgroundColor: pathname === "friends" ? "#0e0e36" : ""}}
      >
        <img src={friendsIconL} alt="" className='largeIcon friendsIcon'/>
      </div>
      <div className="navItems"
      style={{backgroundColor: pathname === "settings" ? "#0e0e36" : ""}}
      >
        <img src={settingsIcon} alt="" className='largeIcon'/>
      </div>
      <div className="navItems"
      style={{backgroundColor: pathname === "notification" ? "#0e0e36" : ""}}
      >
        <img src={notificationIcon} alt="" className='largeIcon'/>
      </div>
    </nav>
  )
}

export default Navigation