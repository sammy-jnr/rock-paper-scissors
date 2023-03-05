import React, { useState, useEffect } from "react";
import "./Notification.css";
import trashIcon from "../../Assets/Icons/trash.svg";
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { RandomID } from '../../ID'

interface NotificationInterface {
  type: string;
  sender: string;
  message: string;
  id: string,
  // imgUrl: string,
}


function Notification() {

  // const [notificationArray, setnotificationArray] = useState<NotificationInterface[]>([]);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const store = useSelector((store: RootState) => store)
 
const notificationArray:NotificationInterface[] = [{
  sender: "sam",
  type: "friendRequest",
  id: "432",
  message: "texting 123"
}]

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

  const getNotifications = async () => {

  }


  const acceptChallenge = async (name: string) => {
  }

  useEffect(() => {

  }, []);



  return (
    <div className="notificationPage">
      <header>
        <h2>Notifications</h2>
      </header>
      <div className="notificationPageInner">
        
        <section className="currentChallenge">
          <header>
            <p>
              {" "}
              <b>{"username"}</b> sent you a challenge
            </p>
          </header>
          <p>
            Best of <b>{currentChallenge.totalRounds}</b>
          </p>
          <p>
            Game mode <b>{currentChallenge.mode}</b>{" "}
          </p>
          <footer>
            <button
              onClick={() => {
              }}
            >Reject</button>
            <button
              onClick={() => {
                if (currentChallenge.opponentUsername)
                  acceptChallenge(currentChallenge.opponentUsername)
              }}
            >Accept</button>
          </footer>
        </section>

        {notificationArray.map((item, index) => {
          if (item.type === "friendRequest") {
            return (
              <section className="receivedRequests" key={index}>
                <p><b>{item.sender}</b> sent you a friend request</p>
                <footer>
                  <button
                  >Reject</button>
                  <button
                    onClick={() => {
                    }}
                  >Accept</button>
                </footer>
              </section>
            );
          }
          return (
            <section className="otherNotifications" key={index}>
              <p>{item.message}</p>
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
