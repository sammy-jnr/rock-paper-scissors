import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginGoogle, registerGoogle } from '../../utils/axiosCalls'
import * as queryString from 'query-string';
import { setCookie } from '../../utils/cookies';
import { socket } from '../../App';
import { setUsername } from '../../Features/OnlineSlice';
import { setIsLoggedIn } from '../../Features/AuthSlice';


function Onboarding() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const urlParams = queryString.default.parse(window.location.search);


  const [isLoading, setisLoading] = useState<boolean|null>(null);
  const [error, seterror] = useState("");

  useEffect(() => {
    if (typeof urlParams.code !== "string") return
    if(isLoading)return
    setisLoading(true)
    console.log("trial")
    const code = urlParams.code
    const googleAction = localStorage.getItem("path")
    if (googleAction === "register") {
      registerGoogle(code)
        .then((res) => {
          if (!res) return console.log("an error occurred")
          const { username, accessToken, refreshToken } = res.data
          setCookie("accessToken", accessToken, 1)
          setCookie("refreshToken", refreshToken, 7)
          socket.emit("joinRoom", username)
          dispatch(setUsername(username));
          localStorage.setItem("username", username)
          dispatch(setIsLoggedIn(true))
          navigate("/")
          setisLoading(false)
        })
        .catch((error) => {
          setisLoading(false)
          if (error.response.data.msg === "email has been used please login") {
            seterror("Email has been used, login")
          } else if (error.response.data.msg === "couldn't sign up with google") {
            seterror("Couldn't sign up with google")
          } else if (error.response.data.msg === "couldn't login with google") {
            seterror("Couldn't login with google")
          } else if (error.response.data.msg === "user not found") {
            seterror("User not found")
          } else {
            seterror("An error occurred on the server")
          }
        })
    }
    if (googleAction === "login") {
      loginGoogle(code)
        .then((res) => {
          if (!res) return console.log("an error occurred")
          const { username, accessToken, refreshToken } = res.data
          setCookie("accessToken", accessToken, 1)
          setCookie("refreshToken", refreshToken, 7)
          socket.emit("joinRoom", username)
          dispatch(setUsername(username));
          localStorage.setItem("username", username)
          dispatch(setIsLoggedIn(true))
          navigate("/")
          setisLoading(false)
        })
        .catch((error) => {
          setisLoading(false)
          if (error.response.data.msg === "email has been used please login") {
            seterror("Email has been used, login")
          } else if (error.response.data.msg === "couldn't sign up with google") {
            seterror("Couldn't sign up with google")
          } else if (error.response.data.msg === "couldn't login with google") {
            seterror("Couldn't login with google")
          } else if (error.response.data.msg === "user not found") {
            seterror("User not found")
          } else {

          }
        })
    }
  }, [urlParams]);



  if (!urlParams.code || isLoading === null) return null
  return (
    <div className='onbordingPage'>
      {
        isLoading ?
          <span className='generalLoadingIconLarge'></span>
          :
          <div className='onboardingError'>
            <header>Error</header>
            <hr />
            <p>{error}</p>
            <button onClick={() => { 
              localStorage.getItem("path") && navigate(`/${localStorage.getItem("path")}`) }}>Try again</button>
          </div>
      }
    </div>
  )
}

export default Onboarding