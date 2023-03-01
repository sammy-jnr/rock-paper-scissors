import React from 'react'
import "./Components.css"
import paperIcon from "../../../Assets/Icons/icon-paper.svg"
import rockIcon from "../../../Assets/Icons/icon-rock.svg"
import scissorsIcon from "../../../Assets/Icons/icon-scissors.svg"
import { optionClicked } from "../../../utils/optionClicked"
import { RootState } from "../../../store"
import { useSelector, useDispatch } from "react-redux"
import { setGameState, setSelectedOption, setOpponentOption, setGameProgress } from '../../../Features/MainSlice'

const By3OptionDisplay = () => {

  const dispatch = useDispatch()
  const store = useSelector((store: RootState) => store)
  const gameMode = store.main.gameMode
  const playerMode = store.main.playerMode
  const gameState = store.main.gameState
  const isLoggedIn = store.auth.isLoggedIn

  const calculateVerdict = (selectedOption: string) => {
    const result = optionClicked(selectedOption, gameMode, playerMode, isLoggedIn)
    if (!result) return
    if (typeof result === "object" && "computerChoice" in result) {
      dispatch(setSelectedOption(selectedOption))
      dispatch(setGameState("optionSelected"))
      setTimeout(() => {
        dispatch(setOpponentOption(result.computerChoice))
      }, 1000);
      setTimeout(() => {
        dispatch(setGameProgress(result.verdict))
      }, 2000);
    } else {
      console.log(result)
    }
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
        <PaperIcon />
        <ScissorsIcon />
      </div>
      <div id="selectOption3Bottom">
        <RockIcon />
      </div>
    </div>
  )
}

export default By3OptionDisplay