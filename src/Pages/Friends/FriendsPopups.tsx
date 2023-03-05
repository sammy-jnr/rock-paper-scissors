import React, { useEffect, useState } from "react";
import "./Friends.css";
import { RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"





interface ActiveChallengeInterface {
  username: string,
  opponentUsername: string,
  mode: string,
  myScore: number,
  opponentsScore: number,
  roundsPlayed: number,
  totalRounds: number,
  isAccepted: boolean,
  myChoice: string,
  opponentsChoice: string,
}
function FriendsPopups(props: ActiveChallengeInterface, ) {

  const dispatch = useDispatch()

  const store = useSelector((store: RootState) => store)


  

  return (
    <div className="friendsPopupsContainer">
      <section className="gameChalleengeSection">
        <p>Waiting...</p>
        <div>{"time"}</div>
        <div>
          <p>
            game mode: <b>{props.mode}</b>
          </p>
          <p>
            Best of: <b>{props.totalRounds}</b>
          </p>
        </div>
        <button
        onClick={()=>{
        }}
        >Cancel</button>
      </section>
    </div>
  );
}

export default FriendsPopups;
