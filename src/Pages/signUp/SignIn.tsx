import React, { useState, useEffect } from 'react'
import "./SignUp.css"
import closeIcon from "../../Assets/Icons/closeIcon.svg"
import googleIcon from "../../Assets/Icons/googleIcon.svg"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from '../../utils/axiosCalls'
import { setCookie } from "../../utils/cookies"
import { setIsLoggedIn } from '../../Features/AuthSlice'
import { setUsername } from '../../Features/OnlineSlice'
import { googleLoginUrl } from '../../utils/google'
import { Link } from 'react-router-dom'


function SignIn() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [logInEmail, setlogInEmail] = useState<string>("")
  const [loginPassword, setloginPassword] = useState<string>("")

  const [wrongEmail, setwrongEmail] = useState<boolean>(false)
  const [wrongPassword, setwrongPassword] = useState<boolean>(false)

  const [isLoading, setisLoading] = useState(false);


  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (logInEmail.length < 2) return
    setisLoading(true)
    login(logInEmail, loginPassword)
      .then((res) => {
        const { username, accessToken, refreshToken } = res.data
        setCookie("accessToken", accessToken, 1)
        setCookie("refreshToken", refreshToken, 30)
        dispatch(setUsername(username));
        localStorage.setItem("username", username)
        dispatch(setIsLoggedIn(true))
        navigate("/")
      })
      .catch((err) => {
        let error = err.response.data.msg
        if (error === "user not found") {
          setwrongEmail(true)
        }
        if (error === "wrong password") {
          setwrongPassword(true)
        }
        setisLoading(false)
      })
  }

  const focus = () => {
    setwrongEmail(false);
    setwrongPassword(false)
  }

  return (
    <div id='getStartedContainer'>
      <div className='signContainer'>
        <img src={closeIcon} alt="" className='largeIcon closeIcon'
          onClick={() => {
            navigate("/")
          }}
        />
        <Link to={googleLoginUrl} className="links">
          <section className='signWithGoogle'>
            <img src={googleIcon} alt="" className='largeIcon' />
            <p className='signWithGoogleText'>Login with Google</p>
          </section>
        </Link>
        <section className='orSection'>
          <hr className='orHr' />
          <div className='orDiv'>or</div>
        </section>
        <form action="submit" onSubmit={(e) => { signIn(e) }}>
          <div className='label'>
            <p className="miniText">Email</p>
            <input type="email" className="formInput"
              onFocus={focus}
              onChange={(e) => {
                setlogInEmail(e.target.value)
              }}
            />
            {wrongEmail && <p className='errorText'>User not found.</p>}
          </div>
          <div className='label'>
            <p className="miniText">Password</p>
            <input type="password" className="formInput"
              onFocus={focus}
              onChange={(e) => {
                setloginPassword(e.target.value)
              }}
            />
            {wrongPassword && <p className='errorText'>Incorrect password.</p>}
          </div>
          <button className='signButton'>
            {isLoading ? <span className='generalLoadingIcon'></span> : "Login"}
          </button>
        </form>
        <section className='getStartedExtraInfo'>
          <div style={{ marginBottom: 5 }}>Dont't have an account?
            <span
              onClick={() => {
                navigate("/register")
              }}
              className='blueText hoverable'
            >Sign up</span>
          </div>
          <div>forgot password? <span className='blueText hoverable'>Click here</span></div>
        </section>
      </div>
    </div>
  )
}

export default SignIn