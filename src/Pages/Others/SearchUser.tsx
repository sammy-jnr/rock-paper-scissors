import React, { useEffect, useState, useRef } from 'react'
import arrowLeft from "../../Assets/Icons/arrowLeft.svg"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { RandomID } from '../../ID'
import { getAllUsers, sendFriendResquestToDb, cancelFriendResquestSentToDb } from '../../utils/axiosCalls'
import {
  setFriendRequestsSent,
  setFriendRequestsReceived
 } from '../../Features/OnlineSlice'
interface SelectedArrayInterface {
  username: string,
  url: string,
  friends: {
    username: string,
    imgUrl: string
  }[]
}

function SearchUser() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const store = useSelector((store: RootState) => store)
  const friendRequestsSent = store.online.friendRequestsSent
  const friends = store.online.friends
  const username = store.online.username

  const [allUsers, setallUsers] = useState<SelectedArrayInterface[]>([]);

  const [selectedArray, setselectedArray] = useState<SelectedArrayInterface[]>([]);

  const [friendsUsernamesArray, setfriendsUsernamesArray] = useState();
  

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setallUsers(res.data.msg)
      })
      .catch(() => console.log("couldn't fetch users"))
  }, []);

  useEffect(() => {
    const tempArr:string[] = [username]
    friends.forEach(item => tempArr.push(item.username))
    setallUsers(allUsers.filter(item => !tempArr.includes(item.username)))
  }, [friends]);

  const filterUsers = (e: React.ChangeEvent<HTMLInputElement>) => {

    let newArray: SelectedArrayInterface[] = []
    allUsers.forEach(element => {
      if (element.username.includes(e.target.value)) {
        newArray.push(element)
      }
    })
    setselectedArray(newArray)
  }


  const sendFriendRequest = (username:string) =>{
    sendFriendResquestToDb(username)
    .then((res)=>{
      dispatch(setFriendRequestsSent(res.data.msg))
    })
  }
  const cancelFriendRequestSent = (username:string) =>{
    cancelFriendResquestSentToDb(username)
    .then((res)=>{
      dispatch(setFriendRequestsSent(res.data.msg))
    })
  }
  function drawUsernameFromFriendObject() {
    const tempArr:string[] = []
    friends.forEach(item => tempArr.push(item.username))
    console.log(tempArr)
  }
  drawUsernameFromFriendObject()
  const mapped = selectedArray.map((item, index) => {
    return (<div className='selectedUser' key={index}>
      <div className='selectedUserInner'>
        <div className='selectedUserInnerTop'>
          <span></span>
          <p>{item.username}</p>
        </div>
        <div className='selectedUserInnerButtonsDiv'>
          <button id='addBtnSearchPage'
          style={{
            backgroundColor: friendRequestsSent.includes(item.username) ? "#b35340" : "#45458d"
          }}
          onClick={()=>{
            if(friendRequestsSent.includes(item.username)){
              cancelFriendRequestSent(item.username)
              dispatch(setFriendRequestsSent(friendRequestsSent.filter(element => element !== item.username)))  
            }else{
              sendFriendRequest(item.username)
              dispatch(setFriendRequestsSent([...friendRequestsSent, item.username]))  
            }
          }}
          >
            {friendRequestsSent.includes(item.username) ? "Cancel" : "Add friend"}
          </button>
          <button id='challengeBtnSearchPage'>Challenge</button>
        </div>
      </div>
    </div>)
  })
 
 

  return (
    <div className='searchUserPage'>
      <header>
        <img src={arrowLeft}
          onClick={() => {
            navigate("/")
          }}
          className="largeIcon" alt=""
        />
        <div>
          <input type="text" placeholder='Search username'
            onChange={(e) => {
              if(e.target.value === ""){
                return setselectedArray([])
              }
              filterUsers(e)
            }} />
          <button
          onClick={()=>{
            console.log("clicked")
            getAllUsers()
          }}
          >Search</button>
        </div>
      </header>
      {mapped}
    </div>
  )
}

export default SearchUser