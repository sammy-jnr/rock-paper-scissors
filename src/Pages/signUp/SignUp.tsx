import React, { useState } from 'react'
import "./SignUp.css"
import closeIcon from "../../Assets/Icons/closeIcon.svg"
import googleIcon from "../../Assets/Icons/googleIcon.svg"
import closedEyesIcon from "../../Assets/Icons/closedEyesIcon.svg"
import openEyesIcon from "../../Assets/Icons/openEyesIcon.svg"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { registerNewUser, setCookieOnLogin } from '../../utils/axiosCalls'
import { setCookie } from "../../utils/cookies"
import { setIsLoggedIn } from '../../Features/AuthSlice'
import { socket } from '../../App'
import { setUsername } from '../../Features/OnlineSlice'
import { sendNewNotification } from '../../Features/MainSlice'
import { googleRegisterUrl } from '../../utils/google'


function SignUp() {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [showPassword, setshowPassword] = useState<boolean>(false)
  const [username, setusername] = useState<string>("")
  const [email, setemail] = useState<string>("")
  const [password, setpassword] = useState<string>("")
  const [confirmPassword, setconfirmPassword] = useState<string>("")


  const [arePasswordsSame, setarePasswordsSame] = useState<boolean>(true)
  const [nameTooShort, setnameTooShort] = useState<boolean>(false)
  const [nameContainsAt, setnameContainsAt] = useState<boolean>(false)
  const [wrongEmail, setwrongEmail] = useState<boolean>(false)
  const [shortPassword, setshortPassword] = useState<boolean>(false)

  const [isNameTaken, setisNameTaken] = useState(false);
  const [emailUnavailable, setemailUnavailable] = useState(false);


  const [isLoading, setisLoading] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLoading) return
    if (username.includes("@")) {
      setnameContainsAt(true)
      return
    }
    if (username.length < 2) {
      setnameTooShort(true)
      return
    }
    let regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if (!regex.test(email)) {
      setwrongEmail(true)
      return
    }
    if (password !== confirmPassword) {
      setarePasswordsSame(false)
      return
    }
    if (password.length < 6) {
      setshortPassword(true)
      return
    }
    setisLoading(true)
    registerNewUser(username, email, password)
      .then((res) => {
        if (!res) return
        const { username, accessToken, refreshToken } = res.data
        setCookie("accessToken", accessToken, 1)
        setCookie("refreshToken", refreshToken, 7)
        setCookieOnLogin(accessToken, refreshToken)
        socket.emit("joinRoom", username)
        dispatch(setUsername(username));
        localStorage.setItem("username", username)
        dispatch(setIsLoggedIn(true))
        navigate("/")
        setisLoading(false)
      })
      .catch(error => {
        setisLoading(false)
        if (error.response.data.msg === "username unavailable") {
          setisNameTaken(true)
        } else if (error.response.data.msg === "email has been used please login") {
          setemailUnavailable(true)
        } else {
          sendNewNotification({
            backgroundColor: "#c9184a",
            text: "An error occurred",
            status: true,
            time: 2000,
            fontSize: 16
          })
        }
      })
  }


  


  return (
    <div id='getStartedContainer'>
      <div className='signContainer'>
        <img src={closeIcon} alt="" className='largeIcon closeIcon'
          onClick={() => {
            navigate("/")
          }}
        />
        <Link to={googleRegisterUrl} className="links">
          <section className='signWithGoogle'>
            <img src={googleIcon} alt="" className='largeIcon' />
            <p className='signWithGoogleText'>Get Started with Google</p>
          </section>
        </Link>
        <section className='orSection'>
          <hr className='orHr' />
          <div className='orDiv'>or</div>
        </section>
        <form action="submit" onSubmit={(e) => { submit(e) }} noValidate>
          <div className='label'>
            <p className="miniText">Username</p>
            <input type="text" className="formInput"
              onChange={(e) => {
                setusername(e.target.value)
                setnameTooShort(false)
                setnameContainsAt(false)
                setisNameTaken(false)
              }}
            />
            {nameTooShort && <div className='warningText'>name is too short</div>}
            {nameContainsAt && <div className='warningText'>name must not contain @</div>}
            {isNameTaken && <div className='warningText'>username taken</div>}
          </div>
          <div className='label'>
            <p className="miniText">Email</p>
            <input type="email" className="formInput"
              onChange={(e) => {
                setemail(e.target.value)
                setwrongEmail(false)
                setemailUnavailable(false)
              }}
            />
            {wrongEmail && <div className='warningText'>Please enter a valid email address</div>}
            {emailUnavailable && <div className='warningText'>Email has been used please login</div>}
          </div>
          <div className='label'>
            <p className="miniText">Password</p>
            <div className='passwordDiv'>
              <input type={showPassword ? "text" : "password"} className="passwordInput"
                onChange={(e) => {
                  setpassword(e.target.value)
                  setarePasswordsSame(true)
                  setshortPassword(false)
                }}
              />
              {!showPassword &&
                <img src={openEyesIcon}
                  alt=""
                  className='passwordIcon'
                  onClick={() => {
                    setshowPassword(prev => !prev)
                  }}
                />}
              {showPassword &&
                <img src={closedEyesIcon}
                  alt=""
                  className='passwordIcon'
                  onClick={() => {
                    setshowPassword(prev => !prev)
                  }}
                />}
            </div>
            {!arePasswordsSame && <div className='warningText'>passwords don't match</div>}
            {shortPassword && <div className='warningText'>passwords is too short</div>}
          </div>
          <div className='label'>
            <p className="miniText">Confirm password</p>
            <div className='passwordDiv'>
              <input type={showPassword ? "text" : "password"} className="passwordInput"
                onChange={(e) => {
                  setconfirmPassword(e.target.value)
                  setarePasswordsSame(true)
                  setshortPassword(false)
                }}
              />
              {!showPassword &&
                <img src={openEyesIcon}
                  alt=""
                  className='passwordIcon'
                  onClick={() => {
                    setshowPassword(prev => !prev)
                  }}
                />}
              {showPassword &&
                <img src={closedEyesIcon}
                  alt=""
                  className='passwordIcon'
                  onClick={() => {
                    setshowPassword(prev => !prev)
                  }}
                />}
            </div>
            {!arePasswordsSame && <div className='warningText'>passwords don't match</div>}
          </div>
          <button className='signButton'>
            {isLoading ? <span className='generalLoadingIcon'></span> : "Sign Up"}
          </button>
        </form>
        <section className='getStartedExtraInfo'>
          <div style={{ marginBottom: 5 }}>Already have an account?
            <span className='blueText hoverable'
              onClick={() => {
                navigate("/login")
              }}
            >Login</span></div>
          <div>Forgot password? <span className='blueText hoverable'>Click here</span></div>
        </section>
      </div>
    </div>
  )
}
export default SignUp