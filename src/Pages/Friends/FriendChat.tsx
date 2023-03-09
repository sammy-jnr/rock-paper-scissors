import React, { useEffect, useRef } from "react";
import "./Friends.css";
import { useParams, useNavigate } from "react-router-dom";
import arrowLeft from "../../Assets/Icons/arrowLeft.svg";
import InputTextarea from "./InputTextarea";
import { RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { setShowNavClass } from "../../Features/MainSlice";
import { sendMessageDb } from "../../utils/axiosCalls";
import { setFriendsArray } from "../../Features/OnlineSlice";

function FriendChat() {
  const params = useParams();
  const Navigate = useNavigate();
  const dispatch = useDispatch()
  const pathname = window.location.pathname
  const bottomRef: React.Ref<HTMLDivElement> | null = useRef(null)


  const store = useSelector((store: RootState) => store)
  const friends = store.online.friends
  const username = store.online.username

  const messageArray = friends.find(item => item.username === params.name)?.messages



  useEffect(() => {
    dispatch(setShowNavClass(pathname.includes("/friends/") ? "noNav" : "appInner"))
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [friends]);


  const updateMessageLocally = (message: string) => {
    const friend = friends.find(item => item.username === params.name)
    if (!friend) return
    const newMessages = [...friend.messages, { sender: username, message }]
    const newFriendObject = { ...friend, messages: newMessages }
    const newFriendsArray = friends.filter(item => item.username !== params.name)
    dispatch(setFriendsArray([...newFriendsArray, newFriendObject]))
  }

  const sendMessage = (message: string) => {
    if (!params.name) return
    sendMessageDb(params.name, message)
    updateMessageLocally(message)
  }

  return (
    <div className="friendChatContainer">
      <header>
        <img
          src={arrowLeft}
          className="largeIcon"
          alt=""
          onClick={() => {
            Navigate("/friends");
          }}
        />
        <h2>{params.name}</h2>
      </header>
      <section className="friendChatBody">
        {messageArray && messageArray.map((item, index) => {
          if (item.sender === username) {
            return (
              <pre className="messageContainer sentMessages" key={index}>
                {item.message}
              </pre>
            );
          }
          return (
            <pre className="messageContainer" key={index}>
              {item.message}
            </pre>
          );
        })}
        <div ref={bottomRef}></div>
      </section>
      <InputTextarea sendMessage={sendMessage} />
    </div>
  );
}

export default FriendChat;
