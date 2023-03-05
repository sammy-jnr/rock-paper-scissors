import React, { useState, useEffect } from "react";
import "./Friends.css";
import removeIcon from "../../Assets/Icons/removeIcon.svg";
import swordsIcon from "../../Assets/Icons/swordsIcon.svg";
import messageIcon from "../../Assets/Icons/messageIcon.svg";
import infoIcon from "../../Assets/Icons/infoIcon.svg";
import FriendsPopups from "./FriendsPopups";
import { RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateScore } from '../../utils/axiosCalls'


function Friends() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  

  
  updateScore("won")

  
  
  

  const store = useSelector((store: RootState) => store)
  // const friendsArray = store.online.friends

  const friendsArray = [
    {
    username: "mattew",
    imgUrl: "string",
    messages: []},
    {
    username: "mark",
    imgUrl: "string",
    messages: []},
    {
    username: "luke",
    imgUrl: "string",
    messages: []},
    {
    username: "john",
    imgUrl: "string",
    messages: []},
  ]

  useEffect(() => {
    let tempArr: boolean[] = [];
    friendsArray.forEach((item) => {
      tempArr.push(false);
    });
    setfriendOptionArray(tempArr);
    setunchangingFriendOptionArray(tempArr);
  }, []);

  const [friendOptionArray, setfriendOptionArray] = useState<boolean[]>([]);
  const [unchangingFriendOptionArray, setunchangingFriendOptionArray] = useState<boolean[]>([]);
 

  const [currentFriendIndex, setcurrentFriendIndex] = useState<number|undefined>();
  

  

 
 

  const mappedFriends = friendsArray.map((item, index) => {
    if (friendOptionArray.length === 0) return;
    return (
      <div className="friendContainer" key={index}>
        <div className="friendPFP">
          <div></div>
        </div>
        <div className="friendInfo">
          <header
            onClick={() => {
              if (friendOptionArray[index] === true) {
                setfriendOptionArray((prev) => {
                  prev[index] = false;
                  return [...prev];
                });
                setcurrentFriendIndex(undefined);
                return;
              }
              let clonedArr = [...unchangingFriendOptionArray];
              clonedArr.splice(index, 1, !clonedArr[index]);
              setfriendOptionArray([...clonedArr]);
              setcurrentFriendIndex(index);
            }}
            style={{
              height: friendOptionArray[index] ? "50%" : "100%",
            }}
          >
            <p>{item.username}</p>
            <img src={infoIcon} className="mediumIcon" alt="" />
          </header>
          {friendOptionArray[index] && (
            <div>
              <div
                onClick={() => {
                  console.log("removed");
                }}
              >
                <img src={removeIcon} className="small_medium" alt="" />
                <p>Remove</p>
              </div>

              <div
            
              >
                <img src={swordsIcon} className="small_medium" alt="" />
                <p>Challenge</p>
              </div>

              <div
              onClick={()=>{
              }}
              >
                <img src={messageIcon} className="small_medium" alt="" />
                <p>Message</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  });

  return (
    <div className="friendsPage">
      {/* {showChallengePopup && <FriendsPopups {...activeChallenge} />} */}
      <header>
        <h2>Friends</h2>
      </header>
      <div className="friendsPageInner">{mappedFriends}</div>
    </div>
  );
}

export default Friends;
