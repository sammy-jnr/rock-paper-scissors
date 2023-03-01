import React from 'react'
import "./Home.css"
import By3Logo from "../../Assets/Images/logo.svg"
import By5Logo from "../../Assets/Images/logo-bonus.svg"
import questionMarkIcon from "../../Assets/Icons/questionMark.svg"
import searchIcon from "../../Assets/Icons/searchIcon.svg"
import { Link, useNavigate } from "react-router-dom"
import { RootState } from "../../store"
import { useSelector, useDispatch } from "react-redux"
import { changeGameMode, changePlayerMode, setGameState } from '../../Features/MainSlice'

const Home = () => {
  const dispatch = useDispatch()
  const store = useSelector((store: RootState) => store)
  const gameMode = store.main.gameMode
  const playerMode = store.main.playerMode
  const gameState = store.main.gameState
  const isLoggedIn = store.auth.isLoggedIn

  return (
    <div className='homeContainer'>
      <section id="usenameSection">
        <div id="logoDiv">
          <img src={gameMode === "RPS" ? By5Logo : By5Logo} alt="" />
        </div>
        <div id="usernameDiv">
          {isLoggedIn ?
            <>
              <div id='userThumbnailHome'></div>
              <div id="displayUsername">sammy</div>
            </>
            :
            <div className='loginRegisterText'>
              <p>Register</p>
              <p>Login</p>
            </div>
          }
        </div>
      </section>
      <section className='homeToggleSection'>
        <div id="toogleContainerOuter">
          <div
            onClick={() => {
              dispatch(changeGameMode(gameMode === "RPS" ? "RPSLS" : "RPS"))
              console.log(gameMode === "RPS" ? "RPSLS" : "RPS")
            }}
            className="toogleContainer"
            style={{
              backgroundColor: gameMode === "RPSLS" ? "#526074" : "#cecece",
              paddingLeft: gameMode === "RPSLS" ? "30px" : "5px",
            }}
          >
            <div
              className="toogleBall"
              style={{
                backgroundColor: gameMode === "RPSLS" ? "#63a1f8" : "#1f3756",
              }}
            ></div>
          </div>
        </div>
        <div className="controlPlayerMode">
          <p
            onClick={() => {
              dispatch(changePlayerMode("singleplayer"))
            }}
            style={{
              backgroundColor: playerMode === "singleplayer" ? "#04054441" : "#24395a",
              color: playerMode === "singleplayer" ? "white" : "#cecece"
            }}
          >Single player</p>
          <p
            onClick={() => {
              dispatch(changePlayerMode("multiplayer"))
            }}
            style={{
              backgroundColor: playerMode === "multiplayer" ? "#04054441" : "#24395a",
              color: playerMode === "multiplayer" ? "white" : "#cecece"
            }}
          >Multiplayer</p>
        </div>
      </section>
      <section className="gameSection">
        <Link to={"/selectoption"} className="links startLink">
          <div id='startGameText'>START GAME</div>
        </Link>
      </section>

      <section className="homePageExtras">
        <Link to={"rules"} className="links">
          <div className="rulesText">
            <p>RULES</p>
            <img src={questionMarkIcon} className="small_medium" alt="" />
          </div>
        </Link>
        <Link to={"search"} className="links">
          <div className="searchText">
            <p>SEARCH</p>
            <img src={searchIcon} className="small_medium" alt="" />
          </div>
        </Link>
      </section>
    </div>
  )
}

export default Home