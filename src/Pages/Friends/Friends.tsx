import { useState, useEffect } from "react";
import "./Friends.css";
import removeIcon from "../../Assets/Icons/removeIcon.svg";
import swordsIcon from "../../Assets/Icons/swordsIcon.svg";
import messageIcon from "../../Assets/Icons/messageIcon.svg";
import infoIcon from "../../Assets/Icons/infoIcon.svg";
import FriendsPopups from "./FriendsPopups";
import { RootState } from "../../store"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sendChallengeDb } from '../../utils/axiosCalls'
import { socket } from '../../App'
import { FriendInterface } from "../../interfaces";

function Friends() {

  const navigate = useNavigate()


  const [showChallengePopup, setshowChallengePopup] = useState<boolean>(true);

  const [friendPopupType, setfriendPopupType] = useState<"remove" | "challenge" | undefined>();

  const [challengeId, setchallengeId] = useState("");


  const store = useSelector((store: RootState) => store)
  const totalRounds = store.main.totalRounds
  const gameMode = store.main.gameMode
  const friendsArray = store.online.friends


  useEffect(() => {
    let tempArr: boolean[] = [];
    friendsArray.forEach((item) => {
      tempArr.push(false);
    });
    setfriendOptionArray(tempArr);
    setunchangingFriendOptionArray(tempArr);
  }, [friendsArray]);

  const [friendOptionArray, setfriendOptionArray] = useState<boolean[]>([]);
  const [unchangingFriendOptionArray, setunchangingFriendOptionArray] = useState<boolean[]>([]);


  const [selectedFriend, setselectedFriend] = useState<FriendInterface | undefined>();


  const sendChallenge = (opponentUsername: string) => {
    sendChallengeDb(opponentUsername, totalRounds, gameMode)
      .then((res) => {
        setchallengeId(res.data.msg)
        socket.emit("newNotification", opponentUsername)
      })
      .catch((err) => {})
  }




  const mappedFriends = friendsArray.map((item, index) => {
    if (friendOptionArray.length === 0) return null;
    return (
      <div className="friendContainer" key={index}>
        <div className="friendPFP">
          <div>
            {item.imgUrl && <img src={item.imgUrl} alt="" className="userThumbnailImages"/>}
          </div>
        </div>
        <div className="friendInfo hoverable">
          <header
            onClick={() => {
              if (friendOptionArray[index] === true) {
                setfriendOptionArray((prev) => {
                  prev[index] = false;
                  return [...prev];
                });
                return;
              }
              let clonedArr = [...unchangingFriendOptionArray];
              clonedArr.splice(index, 1, !clonedArr[index]);
              setfriendOptionArray([...clonedArr]);
              setselectedFriend(friendsArray[index])
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
                  setfriendPopupType("remove")
                  setshowChallengePopup(true)
                }}
              >
                <img src={removeIcon} className="small_medium" alt="" />
                <p>Remove</p>
              </div>
              <div
                onClick={() => {
                  setfriendPopupType("challenge")
                  setshowChallengePopup(true)
                  sendChallenge(item.username)
                }}
              >
                <img src={swordsIcon} className="small_medium" alt="" />
                <p>Challenge</p>
              </div>

              <div
                onClick={() => navigate(item.username)}
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
      {showChallengePopup &&
        <FriendsPopups
          type={friendPopupType}
          setshowChallengePopup={setshowChallengePopup}
          setfriendPopupType={setfriendPopupType}
          challengeId={challengeId}
          selectedFriend={selectedFriend}
        />
      }
      <header>
        <h2>Friends</h2>
      </header>
      <div className="friendsPageInner">{mappedFriends}</div>
    </div>
  );
}

export default Friends;
