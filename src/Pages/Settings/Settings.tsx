import React, { useState, useRef, useEffect } from "react";
import "./Settings.css";
import { useNavigate } from "react-router-dom";
import editIcon from "../../Assets/Icons/editIcon.svg";
import caretUp from "../../Assets/Icons/caretUp.svg";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { RootState } from "../../store"
import { useSelector, useDispatch } from "react-redux"
import { changeGameMode, changePlayerMode, sendNewNotification, setTotalRounds } from '../../Features/MainSlice'
import { setUsername } from "../../Features/OnlineSlice";
import { logOut } from "../../Features/AuthSlice";
import { changeNameDb } from "../../utils/axiosCalls";
import { audio, victorySound, defeatSound, clickSound, drawSound } from "../../utils/audio";
import { socket } from "../../App";

function Settings() {

  const newNameRef: React.Ref<HTMLInputElement> = useRef(null)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const store = useSelector((store: RootState) => store)
  const playerMode = store.main.playerMode
  const gameMode = store.main.gameMode
  const totalRounds = store.main.totalRounds
  const isLoggedIn = store.auth.isLoggedIn


  const [soundSlider, setsoundSlider] = useState<number>(100);
  const [musicSlider, setmusicSlider] = useState<number>(100);
  const totalRoundsStyle = {
    backgroundColor: "#1f3756",
    color: "#cecece"
  }
  const [showEditNameInput, setshowEditNameInput] = useState<boolean>(false);
  const [isMusicPlaying, setisMusicPlaying] = useState<boolean>(false);
  const [isNameTaken, setisNameTaken] = useState<boolean>(false);

  const [isLoading, setisLoading] = useState<boolean>(false);

  useEffect(() => {
    const musicVolume = localStorage.getItem("musicVolume")
    if (musicVolume) {
      setmusicSlider(Math.floor(Number(musicVolume) * 100))
    }
    const soundVolume = localStorage.getItem("soundVolume")
    if (soundVolume) {
      setsoundSlider(Math.floor(Number(soundVolume) * 100))
    }
  }, []);


  const changeName = (newName: string) => {
    setisLoading(true)
    changeNameDb(newName)
      .then((res) => {
        dispatch(setUsername(res.data.newName))
        socket.emit("joinRoom", res.data.newName)
        setshowEditNameInput(false)
        setisLoading(false)
        dispatch(sendNewNotification({
          backgroundColor: "green",
          text: "Saved",
          fontSize: 16,
          status: true,
          time: 1500
        }))
        if(newNameRef.current?.value)
        newNameRef.current.value = ""
      })
      .catch(() => {
        setisLoading(false)
        setisNameTaken(true)
      })
  }

  const changeMusicVolume = (volume: number) => {
    const newVolume = volume / 100
    audio.volume = newVolume
    localStorage.setItem("musicVolume", String(newVolume))
  }
  const changeSoundVolume = (volume: number) => {
    const newVolume = volume / 100
    victorySound.volume = newVolume
    defeatSound.volume = newVolume
    clickSound.volume = newVolume
    drawSound.volume = newVolume
    localStorage.setItem("soundVolume", String(newVolume))
  }


  return (
    <div className="settingsPage">
      <header>
        <h2>Settings</h2>
      </header>
      <div className="settingsPageInner">
        <section className="changeName hoverable">
          <div
            className="changeNameText"
            onClick={() => {
              if(!isLoggedIn)return
              setshowEditNameInput((prev) => !prev);
            }}
          >
            <p className="hoverable">Change name</p>
            {!showEditNameInput && (
              <img src={editIcon} className="smallIcon" alt="" />
            )}
            {showEditNameInput && (
              <img src={caretUp} className="smallIcon" alt="" />
            )}
          </div>
          {showEditNameInput && (
            <>
              <div className="inputName">
                <input type="text"
                  placeholder="Enter name"
                  ref={newNameRef}
                  onFocus={() => setisNameTaken(false)}
                />
                <button
                  onClick={() => {
                    if (isLoading) return
                    newNameRef.current?.value && changeName(newNameRef.current?.value)
                  }}
                >
                  {isLoading ? <span className='generalLoadingIconSmall'></span> : "Save"}
                </button>
              </div>
              {isNameTaken && <div id="nameTakenText">Name has been taken</div>}
            </>
          )}
        </section>
        <section className="uploadTextSettings">
          <p>Update profile picture</p>
          <p
            className="hoverable"
            onClick={() => {
              if(!isLoggedIn)return
              navigate("imagepreview")
            }}
          >upload</p>
        </section>
        <section className="controlSound">
          <p>Sound</p>
          <div id="soundSlider">
            <Slider
              min={0}
              max={100}
              onChange={(value) => {
                if (typeof value === "number") {
                  setsoundSlider(value)
                  changeSoundVolume(value)
                };
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
        <section className="quickSettingsToggle">
          <p>Toggle music</p>
          <div
            className="hoverable"
            onClick={() => {
              setisMusicPlaying((prev) => !prev);
              if (isMusicPlaying) {
                audio.pause()
              } else {
                audio.play()
              }
            }}
          >
            <div
              className="toogleContainer"
              style={{
                backgroundColor: isMusicPlaying ? "#526074" : "#cecece",
                paddingLeft: isMusicPlaying ? "30px" : "5px",
              }}
            >
              <div
                className="toogleBall"
                style={{
                  backgroundColor: isMusicPlaying ? "#63a1f8" : "#1f3756",
                }}
              ></div>
            </div>
          </div>
        </section>
        <section className="controlMusic">
          <p>Music</p>
          <div id="musicSlider">
            <Slider
              min={0}
              max={100}
              onChange={(value) => {
                if (typeof value === "number") {
                  setmusicSlider(value);
                  changeMusicVolume(value)
                }
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
              className="hoverable"
            >
              Single Player
            </p>
            <p
              className="hoverable"
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
              className="hoverable"
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
              className="hoverable"
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
          <div className="totalRoundsOptionDiv hoverable">
            <p style={totalRounds === 1 ? totalRoundsStyle : undefined}
              onClick={() => dispatch(setTotalRounds(1))}
            >1</p>
            <p style={totalRounds === 3 ? totalRoundsStyle : undefined}
              onClick={() => dispatch(setTotalRounds(3))}
            >3</p>
            <p style={totalRounds === 5 ? totalRoundsStyle : undefined}
              onClick={() => dispatch(setTotalRounds(5))}
            >5</p>
            <p style={totalRounds === 7 ? totalRoundsStyle : undefined}
              onClick={() => dispatch(setTotalRounds(7))}
            >7</p>
            <p style={totalRounds === 9 ? totalRoundsStyle : undefined}
              onClick={() => dispatch(setTotalRounds(9))}
            >9</p>

          </div>
        </div>}
        {isLoggedIn && <div className="logoutBtn hoverable"
          onClick={() => dispatch(logOut())}
        >
          logout
        </div>}
      </div>
    </div>
  );
}

export default Settings;
