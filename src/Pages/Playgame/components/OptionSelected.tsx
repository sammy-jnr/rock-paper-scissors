import React from 'react'
import "./Components.css"
import { RootState } from "../../../store"
import { useSelector, useDispatch } from "react-redux"
import paperIcon from "../../../Assets/Icons/icon-paper.svg"
import rockIcon from "../../../Assets/Icons/icon-rock.svg"
import scissorsIcon from "../../../Assets/Icons/icon-scissors.svg"
import lizardIcon from "../../../Assets/Icons/icon-lizard.svg"
import spockIcon from "../../../Assets/Icons/icon-spock.svg"
import { setGameState, setSelectedOption, setOpponentOption, setGameProgress } from '../../../Features/MainSlice'
import { useNavigate } from 'react-router-dom'
import { setcurrentChallengeDisplay } from '../../../Features/OnlineSlice'

const OptionSelected = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const store = useSelector((store: RootState) => store)
  const selectedOption = store.main.selectedOption
  const opponentOption = store.main.opponentOption
  const gameProgress = store.main.gameProgress
  const isLoggedIn = store.auth.isLoggedIn
  const currentChallenge = store.online.currentChallenge




  const reset = () => {
    dispatch(setGameProgress(""))
    dispatch(setSelectedOption(""))
    dispatch(setOpponentOption(""))
    dispatch(setGameState("selectoption"))
    navigate("/")
  }





  const RockIcon = () => {
    return (
      <div className='objectsIconOuter rockIcon'>
        <div className="objectsIconInner">
          <img src={rockIcon} alt="" />
        </div>
      </div>
    )
  }
  const PaperIcon = () => {
    return (
      <div className='objectsIconOuter paperIcon'>
        <div className="objectsIconInner">
          <img src={paperIcon} alt="" />
        </div>
      </div>
    )
  }
  const ScissorsIcon = () => {
    return (
      <div className='objectsIconOuter scissorsIcon'>
        <div className="objectsIconInner">
          <img src={scissorsIcon} alt="" />
        </div>
      </div>
    )
  }
  const LizardIcon = () => {
    return (
      <div className='objectsIconOuter lizardIcon'>
        <div className="objectsIconInner">
          <img src={lizardIcon} alt="" />
        </div>
      </div>
    )
  }
  const SpockIcon = () => {
    return (
      <div className='objectsIconOuter spockIcon'>
        <div className="objectsIconInner">
          <img src={spockIcon} alt="" />
        </div>
      </div>
    )
  }

  return (
    <div id='optionSelectedContainer'>
      <div id="optionSelectedContainerTop">
        <div id="optionSelectedContainerTopImgs">
          <div>
            {selectedOption === "rock" && <RockIcon />}
            {selectedOption === "paper" && <PaperIcon />}
            {selectedOption === "scissors" && <ScissorsIcon />}
            {selectedOption === "lizard" && <LizardIcon />}
            {selectedOption === "spock" && <SpockIcon />}
          </div>
          <div>
            {opponentOption === "" &&
              <div className='objectsIconOuter '>
                <div className="objectsIconInner empty">
                  <div className="loader"></div>
                </div>
              </div>
            }
            {opponentOption === "rock" && <RockIcon />}
            {opponentOption === "paper" && <PaperIcon />}
            {opponentOption === "scissors" && <ScissorsIcon />}
            {opponentOption === "lizard" && <LizardIcon />}
            {opponentOption === "spock" && <SpockIcon />}
          </div>

        </div>
        <div id='optionSelectedContainerTopText'>
          <p>YOU PICKED</p>
          <p>THE HOUSE PICKED</p>
        </div>
      </div>
      <div id="optionSelectedContainerBottom">
        {(gameProgress === "won" || gameProgress === "lost" || gameProgress === "draw") && <>
          <div id="displayVerdict">
            {gameProgress === "won" && "You Won"}
            {gameProgress === "lost" && "You Lost"}
            {gameProgress === "draw" && "Draw"}
          </div>
          <div id='newGame'
            onClick={reset}
          >
            New Game
          </div>
        </>}
        {
          gameProgress === "waiting" &&
          <div className='waitingDiv'>
            Waiting . . .
          </div>
        }
        {
          gameProgress === "nextround" &&
          <div className='nextRound'
            onClick={() => {
              dispatch(setGameProgress(""))
              dispatch(setGameState("selectoption"))
              dispatch(setOpponentOption(""))
              dispatch(setSelectedOption(""))


              currentChallenge && setcurrentChallengeDisplay({ ...currentChallenge })
            }}
          >
            Next Round
          </div>
        }

      </div>
    </div>
  )
}

export default OptionSelected