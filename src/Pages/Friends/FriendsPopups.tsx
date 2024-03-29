import { useEffect, useState } from "react";
import "./Friends.css";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { countdown, countdownTime, clearIntervalFunc } from "../../utils/countDownTimer";
import { changePlayerMode, setCountdownStarted } from "../../Features/MainSlice";
import { removeFriendDb, cancelChallengeDb } from "../../utils/axiosCalls";
import { setFriendsArray, setMultiplayerGameStarted } from "../../Features/OnlineSlice";
import { socket } from '../../App'
import { FriendsPopupInterface } from "../../interfaces";



function FriendsPopups(props: FriendsPopupInterface) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const store = useSelector((store: RootState) => store)
  const countdownStarted = store.main.countdownStarted
  const totalRounds = store.main.totalRounds
  const gameMode = store.main.gameMode
  const friends = store.online.friends
  const multiplayerGameStarted = store.online.multiplayerGameStarted




  const [time, settime] = useState("5:00");

  useEffect(() => {
    if (props.type !== "challenge") return
    const myInterval = setInterval(() => {
      settime(countdownTime)
    }, 1000)
    if (countdownStarted === true) return
    dispatch(setCountdownStarted(true))
    countdown()
    clearIntervalFunc(false)

    return () => { clearInterval(myInterval) }
  }, [props.type]);

  useEffect(() => {
    if (countdownTime === `0:00`) {
      props.selectedFriend && cancelChallenge(props.selectedFriend.username)
    }
  }, [countdownTime]);

  useEffect(() => {
    if (!multiplayerGameStarted) return
    navigate("/selectoption")
    dispatch(changePlayerMode("multiplayer"))
    dispatch(setMultiplayerGameStarted(false))
  }, [multiplayerGameStarted]);




  const cancelChallenge = (opponentUsername: string) => {
    props.setshowChallengePopup(false)
    dispatch(setCountdownStarted(false))
    props.setfriendPopupType(undefined)
    clearIntervalFunc(true)
    cancelChallengeDb(opponentUsername, props.challengeId)
      .then(() => {
        socket.emit("newNotification", opponentUsername)
      })
      .catch((err) => {})
  }

  const removeFriend = (friendUsername: string) => {
    removeFriendDb(friendUsername)
      .then((res) => {
        dispatch(setFriendsArray(res.data.msg))
      })
      .catch(() => {})
  }

  if (!props.type) return null
  return (
    <div className="friendsPopupsContainer">
      {
        props.type === "remove"
          ?
          <div id="friendRemovalConfirmationDiv">
            <p>Are you sure?</p>
            <div>
              <button
                className="hoverable"
                onClick={() => props.setshowChallengePopup(false)}
              >No</button>
              <button id="FPYesBtn"
                className="hoverable"
                onClick={() => {
                  props.setshowChallengePopup(false)
                  // remove the friend instantly before the database returns a response
                  if (props.selectedFriend === undefined) return
                  let friendUsername = props.selectedFriend.username
                  dispatch(setFriendsArray(friends.filter(item => item.username !== friendUsername)))
                  // 
                  removeFriend(friendUsername)
                }}
              >Yes</button>
            </div>
          </div>
          :
          <section className="gameChalleengeSection">
            <div>{time}</div>
            <div>
              <p>
                Game mode ---- <b>{gameMode}</b>
              </p>
              <p>
                Best of ---- <b>{totalRounds}</b>
              </p>
            </div>
            <button
              className="hoverable"
              onClick={() => {
                props.selectedFriend && cancelChallenge(props.selectedFriend.username)
              }}
            >Cancel</button>
          </section>
      }

    </div>
  );
}

export default FriendsPopups;
