import React, { useState } from "react";
import "./Settings.css";
import editIcon from "../../Assets/Icons/editIcon.svg";
import arrowUp from "../../Assets/Icons/arrowUp.svg";
import caretUp from "../../Assets/Icons/caretUp.svg";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { RootState } from "../../store"
import { useSelector, useDispatch } from "react-redux"
import { changeGameMode, changePlayerMode, sendNewNotification, setTotalRounds } from '../../Features/MainSlice'
import { logOut } from "../../Features/AuthSlice";

function Settings() {

  const dispatch = useDispatch()
  const store = useSelector((store: RootState) => store)
  const playerMode = store.main.playerMode
  const gameMode = store.main.gameMode
  const totalRounds = store.main.totalRounds
  const isLoggedIn = store.auth.isLoggedIn






  const [soundSlider, setsoundSlider] = useState<number>(100);
  const [musicSlider, setmusicSlider] = useState<number>(100);

  // const [totalRounds, settotalRounds] = useState<number>(5);
const totalRoundsStyle = {
  backgroundColor: "#1f3756",
  color: "#cecece"
}
  // const [gameMode, setgameMode] = useState<string>("RPS");

  const [showEditNameInput, setshowEditNameInput] = useState<boolean>(false);

  const [toogleQuickSettings, settoogleQuickSettings] =
    useState<boolean>(false);

  return (
    <div className="settingsPage">
      <header>
        <h2>Settings</h2>
      </header>
      <div className="settingsPageInner">
        <section className="changeName">
          <div
            className="changeNameText"
            onClick={() => {
              setshowEditNameInput((prev) => !prev);
            }}
          >
            <p>Change name</p>
            {!showEditNameInput && (
              <img src={editIcon} className="smallIcon" alt="" />
            )}
            {showEditNameInput && (
              <img src={caretUp} className="smallIcon" alt="" />
            )}
          </div>
          {showEditNameInput && (
            <div className="inputName">
              <input type="text" placeholder="Enter name " />
              <button>Save</button>
            </div>
          )}
        </section>
        <section className="changeImg">
          <p>Update profile picture</p>
          <div>
            <input type="file" />
            <div>
              <p>upload</p>
              <img src={arrowUp} alt="" className="mediumIcon" />
            </div>
          </div>
        </section>
        <section className="controlSound">
          <p>Sound</p>
          <div id="soundSlider">
            <Slider
              min={0}
              max={100}
              onChange={(value) => {
                if (typeof value === "number") setsoundSlider(value);
              }}
              value={soundSlider}
              railStyle={{
                height: 8,
              }}
              trackStyle={{
                backgroundColor: "orange",
                height: 8,
              }}
              handleStyle={{
                width: 25,
                height: 25,
                top: 1,
                backgroundColor: "#ff7300",
                opacity: 1,
                border: "none",
              }}
            />
            <p>{soundSlider}%</p>
          </div>
        </section>
        <section className="controlMusic">
          <p>Music</p>
          <div id="musicSlider">
            <Slider
              min={0}
              max={100}
              onChange={(value) => {
                if (typeof value === "number") setmusicSlider(value);
              }}
              value={musicSlider}
              railStyle={{
                height: 8,
              }}
              trackStyle={{
                backgroundColor: "orange",
                height: 8,
              }}
              handleStyle={{
                width: 25,
                height: 25,
                top: 1,
                backgroundColor: "#ff7300",
                opacity: 1,
                border: "none",
              }}
            />
            <p>{musicSlider}%</p>
          </div>
        </section>
        <section className="playerMode">
          <header>
            <p>Player Mode</p>
          </header>
          <div>
            <p
              style={{
                backgroundColor:
                  playerMode === "singleplayer" ? "#1f3756" : "#cecececc",
                color: playerMode === "singleplayer" ? "white" : "#1f3756",
              }}
              onClick={() => {
                dispatch(changePlayerMode("singleplayer"))
              }}
            >
              Single Player
            </p>
            <p
              style={{
                backgroundColor:
                  playerMode === "multiplayer" ? "#1f3756" : "#cecececc",
                color: playerMode === "multiplayer" ? "white" : "#1f3756",
              }}
              onClick={() => {
                isLoggedIn ?
                  dispatch(changePlayerMode("multiplayer"))
                  :
                  dispatch(sendNewNotification({
                    backgroundColor: "red",
                    text: "You are not logged in.",
                    fontSize: 15,
                    status: true,
                    time: 3500
                  }))
              }}
            >
              Multiplayer
            </p>
          </div>
        </section>
        <section className="GameMode">
          <header>
            <p>Game Mode</p>
          </header>
          <div>
            <p
              style={{
                backgroundColor: gameMode === "RPS" ? "#1f3756" : "#cecececc",
                color: gameMode === "RPS" ? "white" : "#1f3756",
              }}
              onClick={() => {
                dispatch(changeGameMode("RPS"))
              }}
            >
              Rock Paper Scissors
            </p>
            <p
              style={{
                backgroundColor: gameMode === "RPSLS" ? "#1f3756" : "#cecececc",
                color: gameMode === "RPSLS" ? "white" : "#1f3756",
              }}
              onClick={() => {
                dispatch(changeGameMode("RPSLS"))
              }}
            >
              Rock Paper Scissors spock lizard
            </p>
          </div>
        </section>
        {isLoggedIn && <div className="totalRounds"
        ><header><p>Total Rounds</p><p id="trm">(Multiplayer)</p></header>
          <div className="totalRoundsOptionDiv">
            <p style={totalRounds === 1 ? totalRoundsStyle : undefined}
            onClick={()=> dispatch(setTotalRounds(1))}
            >1</p>
            <p style={totalRounds === 3 ? totalRoundsStyle : undefined}
            onClick={()=> dispatch(setTotalRounds(3))}
            >3</p>
            <p style={totalRounds === 5 ? totalRoundsStyle : undefined}
            onClick={()=> dispatch(setTotalRounds(5))}
            >5</p>
            <p style={totalRounds === 7 ? totalRoundsStyle : undefined}
            onClick={()=> dispatch(setTotalRounds(7))}
            >7</p>
            <p style={totalRounds === 9 ? totalRoundsStyle : undefined}
            onClick={()=> dispatch(setTotalRounds(9))}
            >9</p>
           
          </div>
        </div>}
        <section className="quickSettingsToggle">
          <p>Show Quick Settings in home page</p>
          <div
            onClick={() => {
              settoogleQuickSettings((prev) => !prev);
            }}
          >
            <div
              className="toogleContainer"
              style={{
                backgroundColor: toogleQuickSettings ? "#526074" : "#cecece",
                paddingLeft: toogleQuickSettings ? "30px" : "5px",
              }}
            >
              <div
                className="toogleBall"
                style={{
                  backgroundColor: toogleQuickSettings ? "#63a1f8" : "#1f3756",
                }}
              ></div>
            </div>
          </div>
        </section>
        {isLoggedIn && <div className="logoutBtn"
          onClick={() => dispatch(logOut())}
        >
          logout
        </div>}
      </div>
    </div>
  );
}

export default Settings;
