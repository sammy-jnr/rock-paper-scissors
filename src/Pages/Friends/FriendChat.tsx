import React, { useRef, useState } from "react";
import "./Friends.css";
import { useParams, useNavigate } from "react-router-dom";
import arrowLeft from "../../Assets/Icons/arrowLeft.svg";
import InputTextarea from "./InputTextarea";

function FriendChat() {
  const params = useParams();

  const Navigate = useNavigate();

  interface Messages {
    type: string;
    message: string;
  }

  const mockMessage: Messages[] = [
    { type: "sent", message: "how far boss" },
    { type: "received", message: "how far boss" },
    { type: "sent", message: "make we go play ball nah" },
    { type: "sent", message: "how far boss" },
    {
      type: "received",
      message:
        "how far boss dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    },
  ];

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
        {mockMessage.map((item, index) => {
          if (item.type === "sent") {
            return (
              <div className="messageContainer sentMessages" key={index}>
                {item.message}
                <div className="displayMessageTime">time</div>
              </div>
            );
          }
          return (
            <div className="messageContainer" key={index}>
              {item.message}
              <div className="displayMessageTime">time</div>
            </div>
          );
        })}
      </section>
      <InputTextarea />
    </div>
  );
}

export default FriendChat;
