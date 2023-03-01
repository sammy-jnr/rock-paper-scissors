import React from 'react'
import "./Selectoption.css"
import { RootState } from "../../store"
import { useSelector, useDispatch } from "react-redux"

import By3OptionDisplay from './components/By3OptionDisplay'
import By5OptionDisplay from './components/By5OptionDisplay'
import OptionSelected from './components/OptionSelected'

const Selectoption = () => {
  const dispatch = useDispatch()
  const store = useSelector((store: RootState) => store)
  const gameMode = store.main.gameMode
  const playerMode = store.main.playerMode
  const gameState = store.main.gameState
  const isLoggedIn = store.auth.isLoggedIn
  const onlineSoloScore = store.online.onlineSoloScore

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
                    onlineSoloScore ?? 0 
                    : 
                    localStorage.getItem("score") ?? 0
                  }
                </div>
              </div>
              :
              <div className='scoreInfo2'>
                <div id="player1">
                  <div>player1</div>
                  <div>0</div>
                </div>
                <div id="player2">
                  <div>player2</div>
                  <div>0</div>
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
          <OptionSelected/>
        </section>
      }
    </div>
  )
}

export default Selectoption