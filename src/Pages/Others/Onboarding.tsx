import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { loginGoogle, registerGoogle } from '../../utils/axiosCalls'
import * as queryString from 'query-string';
import { setCookie } from '../../utils/cookies';
import { socket } from '../../App';
import { setUsername } from '../../Features/OnlineSlice';
import { setIsLoggedIn } from '../../Features/AuthSlice';


function Onboarding() {

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const urlParams = queryString.default.parse(window.location.search);


  const [isLoading, setisLoading] = useState<boolean | null>(null);
  const [error, seterror] = useState("");

  useEffect(() => {
    if (typeof urlParams.code !== "string") return
    console.log(params.action)
    if (isLoading) return
    console.log(isLoading)
    setisLoading(true)
    const code = urlParams.code
    if (params.action === "register") {
      console.log(code)
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
    if (params.action === "login") {
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
  }, []);



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
              navigate(`/${params.action}`)
            }}>Try again</button>
          </div>
      }
    </div>
  )
}

export default Onboarding