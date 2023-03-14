import "./Components.css"
import paperIcon from "../../../Assets/Icons/icon-paper.svg"
import rockIcon from "../../../Assets/Icons/icon-rock.svg"
import scissorsIcon from "../../../Assets/Icons/icon-scissors.svg"
import lizardIcon from "../../../Assets/Icons/icon-lizard.svg"
import spockIcon from "../../../Assets/Icons/icon-spock.svg"
import { clickSound } from '../../../utils/audio'
import { optionClicked } from "../../../utils/optionClicked"
import { RootState } from "../../../store"
import { useSelector, useDispatch } from "react-redux"
import { setGameState, setSelectedOption, setOpponentOption, setGameProgress } from '../../../Features/MainSlice'
import { selectedOptionDb } from '../../../utils/axiosCalls'
import { setcurrentChallengeDisplay, setCurrentChallenge } from '../../../Features/OnlineSlice'
import { socket } from '../../../App'


const By5OptionDisplay = () => {

  const dispatch = useDispatch()
  const store = useSelector((store: RootState) => store)
  const gameMode = store.main.gameMode
  const playerMode = store.main.playerMode
  const currentChallenge = store.online.currentChallenge
  const isLoggedIn = store.auth.isLoggedIn

  const calculateVerdict = (selectedOption: string) => {
    clickSound.play()
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
    console.log(currentChallenge.opponent)
    selectedOptionDb(selectedOption, currentChallenge.opponent)
      .then((res) => {
        if (res.data.msg === "successful") {
          console.log(res.data.msg)
          dispatch(setGameProgress("waiting"))
          socket.emit("optionSelected", currentChallenge.me, currentChallenge.opponent)
        } else {
          let { verdict, opponentsChoice, myScore, opponentsScore, myChoice } = res.data
          dispatch(setcurrentChallengeDisplay({ ...currentChallenge, opponentsChoice, myScore, opponentsScore }))
          dispatch(setOpponentOption(opponentsChoice))
          dispatch(setGameProgress(verdict))
          if(verdict === "won" || verdict === "lost"){
            dispatch(setCurrentChallenge(undefined))
          }
          socket.emit("optionSelected", currentChallenge.me, currentChallenge.opponent, verdict, myChoice, myScore, opponentsScore)
        }
      })
  }




  const RockIconSm = () => {
    return (
      <div className='objectsIconOuterSmall rockIcon'
        onClick={() => calculateVerdict("rock")}
      >
        <div className="objectsIconInnerSmall">
          <img src={rockIcon} alt="" className='smallImages' />
        </div>
      </div>
    )
  }
  const PaperIconSm = () => {
    return (
      <div className='objectsIconOuterSmall paperIcon'
        onClick={() => calculateVerdict("paper")}
      >
        <div className="objectsIconInnerSmall">
          <img src={paperIcon} alt="" className='smallImages' />
        </div>
      </div>
    )
  }
  const ScissorsIconSm = () => {
    return (
      <div className='objectsIconOuterSmall scissorsIcon'
        onClick={() => calculateVerdict("scissors")}
      >
        <div className="objectsIconInnerSmall">
          <img src={scissorsIcon} alt="" className='smallImages' />
        </div>
      </div>
    )
  }
  const LizardIconSm = () => {
    return (
      <div className='objectsIconOuterSmall lizardIcon'
        onClick={() => calculateVerdict("lizard")}
      >
        <div className="objectsIconInnerSmall">
          <img src={lizardIcon} alt="" className='smallImages' />
        </div>
      </div>
    )
  }
  const SpockIconSm = () => {
    return (
      <div className='objectsIconOuterSmall spockIcon'
        onClick={() => calculateVerdict("spock")}
      >
        <div className="objectsIconInnerSmall">
          <img src={spockIcon} alt="" className='smallImages' />
        </div>
      </div>
    )
  }
  return (
    <div id='by5container'>
      <div className="selectOption5First">
        <ScissorsIconSm />
      </div>
      <div className="selectOption5Second">
        <SpockIconSm />
        <PaperIconSm />
      </div>
      <div className="selectOption5Third">
        <LizardIconSm />
        <RockIconSm />
      </div>
    </div>
  )
}

export default By5OptionDisplay