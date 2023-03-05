import React from 'react'
import "./Navigation.css"
import homeIcon from "../../Assets/Icons/homeIcon.svg";
import friendsIconL from "../../Assets/Icons/friendsIconL.svg";
import settingsIcon from "../../Assets/Icons/settingsIcon.svg";
import notificationIcon from "../../Assets/Icons/notificationIcon.svg";
import { useNavigate } from 'react-router-dom';
import { RootState } from "../../store"
import { useSelector, useDispatch } from "react-redux"
import { sendNewNotification } from '../../Features/MainSlice'



const Navigation = () => {
  const pathname = window.location.pathname

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const store = useSelector((store: RootState) => store)
  const isLoggedIn = store.auth.isLoggedIn

  return (
    <nav id='navigationContainer'>
      <div className="navItems"
        style={{ backgroundColor: pathname === "/" ? "#0e0e36" : "" }}
        onClick={() => navigate("/")}
      >
        <img src={homeIcon} alt="" className='largeIcon homeIcon' />
        <p className='navItemsText'>Home</p>
      </div>
      <div className="navItems"
        style={{ backgroundColor: pathname === "friends" ? "#0e0e36" : "" }}
        onClick={() => {
          if(!isLoggedIn){
            dispatch(sendNewNotification({
              backgroundColor: "red",
              text: "Login to access that page",
              fontSize: 15,
              status: true,
              time: 3500
            }))
            return
          } 
          navigate("/friends")}
        }
      >
        <img src={friendsIconL} alt="" className='largeIcon friendsIcon' />
        <p className='navItemsText'>Friends</p>
      </div>
      <div className="navItems"
        style={{ backgroundColor: pathname === "/settings" ? "#0e0e36" : "" }}
        onClick={()=>navigate("/settings")}
      >
        <img src={settingsIcon} alt="" className='largeIcon' />
        <p className='navItemsText'>Settings</p>
      </div>
      <div className="navItems"
        style={{ backgroundColor: pathname === "/notifications" ? "#0e0e36" : "" }}
        onClick={()=>{
          if(!isLoggedIn){
            dispatch(sendNewNotification({
              backgroundColor: "red",
              text: "Login to access that page",
              fontSize: 15,
              status: true,
              time: 3500
            }))
            return
          } 
          navigate("/notifications")
        }}
      >
        <img src={notificationIcon} alt="" className='largeIcon' />
        <p className='navItemsText'>Notification</p>
      </div>
    </nav>
  )
}

export default Navigation