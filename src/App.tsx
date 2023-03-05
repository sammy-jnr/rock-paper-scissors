import { useEffect } from "react";
import "./All.css";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RootState } from "./store"
import { useSelector, useDispatch } from "react-redux"
import { setCookie, getCookie } from "./utils/cookies";
import { getUser, getNewAccessToken } from "./utils/axiosCalls";
import { setIsLoggedIn } from "./Features/AuthSlice";
import {
  setCurrentChallenge,
  setUsername,
  setFriendsArray,
  setNotificationsArray,
  setOnlineScore,
  setUrl,
  setFriendRequestsSent,
  setFriendRequestsReceived
 } from './Features/OnlineSlice'
import Navigation from "./Pages/Navigation/Navigation";
import Selectoption from "./Pages/Playgame/Selectoption";
import Popup from "./Popup/Popup";
import Settings from "./Pages/Settings/Settings";
import Rules from "./Pages/Others/Rules";
import SearchUser from "./Pages/Others/SearchUser";
import SignUp from "./Pages/signUp/SignUp";
import SignIn from "./Pages/signUp/SignIn";
import Onboarding from "./Pages/signUp/Onboarding";
import Friends from "./Pages/Friends/Friends";
import Notification from "./Pages/Notification/Notification";


function App() {
  const dispatch = useDispatch()
  let store = useSelector((store: RootState) => store)
  const isLoggedIn = store.auth.isLoggedIn

  const accessTokenCookie = getCookie("accessToken")
  const refreshTokenCookie = getCookie("refreshToken")
  
  useEffect(() => {
    console.log("called")
    const username = localStorage.getItem("username")
    if (!username) return
    if (accessTokenCookie) {
      getUser(username)
      .then((res) => {
        const {username, score, friends, notifications, url, currentChallenge,friendRequestsSent, friendRequestsReceived} = res.data;
        dispatch(setOnlineScore(score));
        dispatch(setCurrentChallenge(currentChallenge));
        dispatch(setFriendsArray(friends));
        dispatch(setUsername(username));
        dispatch(setNotificationsArray(notifications));
        dispatch(setUrl(url));
        dispatch(setFriendRequestsSent(friendRequestsSent));
        dispatch(setFriendRequestsReceived(friendRequestsReceived));
        dispatch(setIsLoggedIn(true));
      })
      .catch(() => console.log("couldn't fetch user"))
      return;
    }
    else {
      if (refreshTokenCookie) {
        getNewAccessToken(username)
          .then((res) => {
            let accessToken = res.data.accessToken
            setCookie("accessToken",accessToken,1)
            dispatch(setIsLoggedIn(true));
          })
      }else{
        dispatch(setIsLoggedIn(false))
      }
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Popup />
        <div className="appInner">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/selectoption" element={<Selectoption />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/search" element={<SearchUser />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/notifications" element={<Notification />} />
            
          </Routes>
        </div>
        <Navigation />
      </Router>
    </div>
  );
}

export default App;
