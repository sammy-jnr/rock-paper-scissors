import { useEffect } from "react"
import "./Selectoption.css"
import { RootState } from "../../store"
import { useSelector, useDispatch } from "react-redux"
import By3OptionDisplay from './components/By3OptionDisplay'
import By5OptionDisplay from './components/By5OptionDisplay'
import OptionSelected from './components/OptionSelected'
import { setcurrentChallengeDisplay } from "../../Features/OnlineSlice"
import { setGameProgress, setGameState, setShowNavClass } from "../../Features/MainSlice"
const Selectoption = () => {
  const dispatch = useDispatch()
  const store = useSelector((store: RootState) => store)
  const gameMode = store.main.gameMode
  const playerMode = store.main.playerMode
  const gameState = store.main.gameState
  const isLoggedIn = store.auth.isLoggedIn
  const currentChallengeDisplay = store.online.currentChallengeDisplay

  const currentChallengeDisplayInitialState = {
    myScore: 0,
    opponentsScore: 0,
    mode: "RPS",
    me: "You",
    opponent: "Opponent",
    roundsPlayed: 0,
    totalRounds: 0,
    myChoice: "",
    opponentsChoice: "",
  }
  const pathname = window.location.pathname
  useEffect(() => {
    dispatch(setShowNavClass(pathname.includes("/selectoption") ? "noNav" : "appInner"))
  }, []);
  
  useEffect(() => {
    return () => {
      dispatch(setcurrentChallengeDisplay(currentChallengeDisplayInitialState))
      dispatch(setGameProgress(""))
      dispatch(setGameState("selectoption"))
    }
  }, []);

  return (
    <div id='selectOptionContainer'>
      <section className="gameInfoPreview">
        <div className="gameSettingsPreview">
          <div>
            <p>Game Mode</p>
            <p>{gameMode}</p>
          </div>
          <div>
            <p>Player Mode</p>
            <p>{playerMode}</p>
          </div>
        </div>
        <div className="userSettingsPreview">
          {
            playerMode === "singleplayer" ?
              <div className='scoreInfo'>
                <div id='scoreText'>SCORE</div>
                <div id='scorevalue'>
                  {isLoggedIn
                    ?
                    localStorage.getItem("onlineScore") ?? 0
                    :
                    localStorage.getItem("score") ?? 0
                  }
                </div>
              </div>
              :
              <div className='scoreInfo2'>
                <div id="player1">
                  <div>{currentChallengeDisplay.me ?? "player1"}   </div>
                  <div>{currentChallengeDisplay.myScore ?? 0}</div>
                </div>
                <div id="player2">
                  <div>{currentChallengeDisplay.opponent ?? "player2"}   </div>
                  <div>{currentChallengeDisplay.opponentsScore ?? 0}</div>
                </div>
              </div>
          }
        </div>
      </section>
      {gameState === "selectoption"
        ?
        <section className="selectOption">
          {
            gameMode === "RPS"
              ?
              <By3OptionDisplay />
              :
              <By5OptionDisplay />
          }
        </section>
        :
        <section className='selectedOption'>
          <OptionSelected />
        </section>
      }
    </div>
  )
}

export default Selectoption