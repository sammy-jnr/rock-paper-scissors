import "./Components.css"
import paperIcon from "../../../Assets/Icons/icon-paper.svg"
import rockIcon from "../../../Assets/Icons/icon-rock.svg"
import scissorsIcon from "../../../Assets/Icons/icon-scissors.svg"
import { clickSound } from '../../../utils/audio'
import { optionClicked } from "../../../utils/optionClicked"
import { RootState } from "../../../store"
import { useSelector, useDispatch } from "react-redux"
import { setGameState, setSelectedOption, setOpponentOption, setGameProgress } from '../../../Features/MainSlice'
import { selectedOptionDb } from '../../../utils/axiosCalls'
import { setCurrentChallenge, setcurrentChallengeDisplay } from '../../../Features/OnlineSlice'
import { socket } from '../../../App'



const By3OptionDisplay = () => {

  const dispatch = useDispatch()
  const store = useSelector((store: RootState) => store)
  const gameMode = store.main.gameMode
  const playerMode = store.main.playerMode
  const currentChallenge = store.online.currentChallenge
  const isLoggedIn = store.auth.isLoggedIn

  const calculateVerdict = (selectedOption: string) => {
    // clickSound.play()
    if (playerMode === "singleplayer") {
      const result = optionClicked(selectedOption, gameMode, isLoggedIn)
      if (!result) return
      dispatch(setSelectedOption(selectedOption))
      dispatch(setGameState("optionSelected"))
      setTimeout(() => {
        dispatch(setOpponentOption(result.computerChoice))
      }, 1000);
      setTimeout(() => {
        dispatch(setGameProgress(result.verdict))
      }, 2000);
    } else {
      optionClickedMultiplayer(selectedOption)
    }
  }

  const optionClickedMultiplayer = (selectedOption: string) => {
    if (!currentChallenge) return
    dispatch(setGameState("optionSelected"))
    dispatch(setcurrentChallengeDisplay({ ...currentChallenge, myChoice: selectedOption }))
    dispatch(setSelectedOption(selectedOption))
    selectedOptionDb(selectedOption, currentChallenge.opponent)
      .then((res) => {
        if (res.data.msg === "successful") {
          console.log(res.data.msg)
          dispatch(setGameProgress("waiting"))
          socket.emit("optionSelected", currentChallenge.me, currentChallenge.opponent)
        } else {
          let { verdict, opponentsChoice, myScore, opponentsScore, myChoice, roundsPlayed } = res.data
          dispatch(setcurrentChallengeDisplay({ ...currentChallenge, opponentsChoice, myScore, opponentsScore, roundsPlayed }))
          dispatch(setOpponentOption(opponentsChoice))
          dispatch(setGameProgress(verdict))
          if(verdict === "won" || verdict === "lost" || verdict === "draw"){
            console.log(undefined)
            dispatch(setCurrentChallenge(undefined))
          }
          console.log(roundsPlayed)
          socket.emit("optionSelected", currentChallenge.me, currentChallenge.opponent, verdict, myChoice, myScore, opponentsScore)
        }
      })
  }


  const PaperIcon = () => {
    return (
      <div className='objectsIconOuter paperIcon'
        onClick={() => calculateVerdict("paper")}
      >
        <div className="objectsIconInner">
          <img src={paperIcon} alt="" />
        </div>
      </div>
    )
  }
  const ScissorsIcon = () => {
    return (
      <div className='objectsIconOuter scissorsIcon'
        onClick={() => calculateVerdict("scissors")}
      >
        <div className="objectsIconInner">
          <img src={scissorsIcon} alt="" />
        </div>
      </div>
    )
  }
  const RockIcon = () => {
    return (
      <div className='objectsIconOuter rockIcon'
        onClick={() => calculateVerdict("rock")}
      >
        <div className="objectsIconInner">
          <img src={rockIcon} alt="" />
        </div>
      </div>
    )
  }
  return (
    <div id='by3container'>
      <div id="selectOption3Top">
        <RockIcon />
        <ScissorsIcon />
      </div>
      <div id="selectOption3Bottom">
        <PaperIcon />
      </div>
    </div>
  )
}

export default By3OptionDisplay