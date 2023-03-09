import React, { useState, useEffect } from "react";
import "./Notification.css";
import trashIcon from "../../Assets/Icons/trash.svg";
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { RandomID } from '../../ID'
import { acceptFriendRequestToDb, rejectFriendRequestToDb, acceptChallengeDb } from "../../utils/axiosCalls";
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


  const currentChallenge = {
    username: "",
    opponentUsername: "",
    mode: "gameMode",
    myScore: 0,
    opponentsScore: 0,
    roundsPlayed: 0,
    totalRounds: "bestOf",
    isAccepted: true,
    myChoice: "",
    opponentsChoice: "",
  }



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

  const acceptFriendRequest = async (friendUsername: string, notificationId: string) => {
    acceptFriendRequestToDb(friendUsername, notificationId)
      .then((res) => {
        dispatch(setNotificationsArray(res.data.msg))
      })
  }
  const rejectFriendRequest = async (friendUsername: string, notificationId: string) => {
    rejectFriendRequestToDb(friendUsername, notificationId)
      .then((res) => {
        dispatch(setNotificationsArray(res.data.msg))
      })
  }

  useEffect(() => {

  }, []);



  return (
    <div className="notificationPage">
      <header>
        <h2>Notifications</h2>
      </header>
      <div className="notificationPageInner">
        {notificationArray.map((item, index) => {
          if (item.type === "friendRequest") {
            return (
              <section className="receivedRequests" key={index}>
                <div>
                  <span>
                    {/* <img src="" alt="" className="profileImgs"/>  */}
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
              <section className="receivedChallenge">
                <header>
                  <span></span>
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
            <section className="otherNotifications" key={index}>
              <p><b>{item.sender}</b> {item.text}</p>
              <div>
                <img src={trashIcon} className="mediumIcon" alt="" />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Notification;
