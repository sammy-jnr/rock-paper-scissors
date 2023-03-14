import React, { useState, useEffect } from "react";
import "./Notification.css";
import trashIcon from "../../Assets/Icons/trash.svg";
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { RandomID } from '../../ID'
import { acceptFriendRequestToDb, rejectFriendRequestToDb, acceptChallengeDb, deleteNotification } from "../../utils/axiosCalls";
import { setNotificationsArray, setCurrentChallenge, setcurrentChallengeDisplay } from "../../Features/OnlineSlice";
import { socket } from '../../App'
import { NotificationInterface } from "../../interfaces";
import { changeGameMode, changePlayerMode } from "../../Features/MainSlice";



function Notification() {


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const store = useSelector((store: RootState) => store)
  const notificationArray = store.online.notifications
  const username = store.online.username

  const [isLoading, setisLoading] = useState<boolean>(false);

  const acceptChallenge = async (challengeRequest: NotificationInterface) => {
    await acceptChallengeDb(challengeRequest.sender, challengeRequest.gameMode, challengeRequest.totalRounds, challengeRequest.id)
    console.log(challengeRequest)
    navigate("/selectoption")
    challengeRequest.gameMode && dispatch(changeGameMode(challengeRequest.gameMode))
    dispatch(changePlayerMode("multiplayer"))
    if (!challengeRequest.totalRounds || !challengeRequest.gameMode) return
    dispatch(setCurrentChallenge({
      myScore: 0,
      opponentsScore: 0,
      mode: challengeRequest.gameMode,
      me: username,
      opponent: challengeRequest.sender,
      roundsPlayed: 0,
      totalRounds: challengeRequest.totalRounds,
      myChoice: "",
      opponentsChoice: "",
    }))
    dispatch(setcurrentChallengeDisplay({
      myScore: 0,
      opponentsScore: 0,
      mode: challengeRequest.gameMode,
      me: username,
      opponent: challengeRequest.sender,
      roundsPlayed: 0,
      totalRounds: challengeRequest.totalRounds,
      myChoice: "",
      opponentsChoice: "",
    }))
    socket.emit("challengeAccepted", challengeRequest.sender)
  }

  const removeNotificationLocal = (notificationId: string) => {
    const newNotifications = notificationArray.filter(item => item.id !== notificationId)
    dispatch(setNotificationsArray(newNotifications))
  }

  const rejectChallenge = (notificationId: string) => {
    removeNotificationLocal(notificationId)
    deleteNotification(notificationId)
      .catch(err => console.log(err))
  }
  const acceptFriendRequest = async (friendUsername: string, notificationId: string) => {
    removeNotificationLocal(notificationId)
    acceptFriendRequestToDb(friendUsername, notificationId)
      .catch(err => console.log(err))
  }
  const rejectFriendRequest = async (friendUsername: string, notificationId: string) => {
    removeNotificationLocal(notificationId)
    rejectFriendRequestToDb(friendUsername, notificationId)
      .then((res) => {
        dispatch(setNotificationsArray(res.data.msg))
      })
      .catch(err => console.log(err))
  }

useEffect(() => {
  console.log(notificationArray)
}, [notificationArray]);



  return (
    <div className="notificationPage">
      <header>
        <h2>Notifications</h2>
      </header>
      <div className="notificationPageInner">
        {notificationArray.map((item, index) => {
          if (item.type === "friendRequest") {
            return (
              <section className="receivedRequests" key={item.id}>
                <div>
                  <span>
                    {item.imgUrl && <img src={item.imgUrl} alt="" className="userThumbnailImages" />}
                  </span>
                  <p><b>{item.sender}</b> sent you a friend request</p>
                </div>
                <footer>
                  <button
                    onClick={() => rejectFriendRequest(item.sender, item.id)}
                  >Reject</button>
                  <button
                    onClick={() => {
                      acceptFriendRequest(item.sender, item.id)
                    }}
                  >Accept</button>
                </footer>
              </section>
            );
          }
          if (item.type === "challenge") {
            return (
              <section className="receivedChallenge" key={item.id}>
                <header>
                  <span>
                    {item.imgUrl && <img src={item.imgUrl} alt="" className="userThumbnailImages" />}
                  </span>
                  <p>
                    {" "}
                    <b>{item.sender}</b> sent you a challenge
                  </p>
                </header>
                <p>
                  No of rounds ---- <b>{item.totalRounds}</b>
                </p>
                <p>
                  Game mode ---- <b>{item.gameMode}</b>{" "}
                </p>
                <footer>
                  <button
                    onClick={() => {
                      rejectChallenge(item.id)
                    }}
                  >Reject</button>
                  <button
                    onClick={() => {
                      acceptChallenge(item)
                    }}
                  >Accept</button>
                </footer>
              </section>
            )
          }
          return (
            <section className="otherNotifications" key={item.id}>
              <p><b>{item.sender}</b> {item.text}</p>
              <div>
                <img src={trashIcon}
                  className="mediumIcon notificationTrashIcon"
                  alt=""
                  onClick={() => {
                    removeNotificationLocal(item.id)
                    deleteNotification(item.id)
                      .catch(err => console.log(err))
                  }}
                />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Notification;
