import "./Home.css"
import By3Logo from "../../Assets/Images/logo.svg"
import By5Logo from "../../Assets/Images/logo-bonus.svg"
import questionMarkIcon from "../../Assets/Icons/questionMark.svg"
import searchIcon from "../../Assets/Icons/searchIcon.svg"
import { Link } from "react-router-dom"
import { RootState } from "../../store"
import { useSelector, useDispatch } from "react-redux"
import { changeGameMode, changePlayerMode, sendNewNotification } from '../../Features/MainSlice'

const Home = () => {
  const dispatch = useDispatch()
  const store = useSelector((store: RootState) => store)
  const gameMode = store.main.gameMode
  const playerMode = store.main.playerMode
  const isLoggedIn = store.auth.isLoggedIn
  const initialLoading = store.auth.initialLoading
  const username = store.online.username
  const url = store.online.url

  return (
    <div className='homeContainer'>
      <section id="usenameSection">
        <div id="logoDiv">
          <img src={gameMode === "RPS" ? By3Logo : By5Logo} alt="" className="logoImg"/>
        </div>
        <div id="usernameDiv">
          {
            initialLoading ?
              <span className="generalLoadingIcon"></span>
              :
              <>
                {isLoggedIn ?
                  <>
                    <div id='userThumbnailHome'>
                      {url && <img src={url} alt="" className='userThumbnailImages' />}
                    </div>
                    <div id="displayUsername">{username}</div>
                  </>
                  :
                  <div className='loginRegisterText'>
                    <Link to="/register" className='signtextslinks hoverable'><p>Register</p></Link>
                    <Link to="/login" className='signtextslinks hoverable'><p>Login</p></Link>
                  </div>
                }
              </>
          }
        </div>
      </section>
      <section className='homeToggleSection'>
        <div id="toogleContainerOuter">
          <div
            onClick={() => {
              dispatch(changeGameMode(gameMode === "RPS" ? "RPSLS" : "RPS"))
            }}
            className="toogleContainer hoverable"
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
        <div className="controlPlayerMode hoverable">
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
              isLoggedIn ?
                dispatch(changePlayerMode("multiplayer"))
                :
                dispatch(sendNewNotification({
                  backgroundColor: "#c9184a",
                  text: "You are not logged in.",
                  fontSize: 15,
                  status: true,
                  time: 3500
                }))
            }}
            style={{
              backgroundColor: playerMode === "multiplayer" ? "#04054441" : "#24395a",
              color: playerMode === "multiplayer" ? "white" : "#cecece"
            }}
          >Multiplayer</p>
        </div>
      </section>
      <section className="gameSection">
        <Link to={"/selectoption"} className="links startLink hoverable">
          <div id='startGameText'>START GAME</div>
        </Link>
      </section>

      <section className="homePageExtras">
        <Link to={"/rules"} className="links hoverable">
          <div className="rulesText">
            <p>RULES</p>
            <img src={questionMarkIcon} className="small_medium" alt="" />
          </div>
        </Link>
        <Link to={"/search"} className="links hoverable">
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