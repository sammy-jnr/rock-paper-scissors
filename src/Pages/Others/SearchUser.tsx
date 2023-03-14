import React, { useEffect, useState } from 'react'
import arrowLeft from "../../Assets/Icons/arrowLeft.svg"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers, sendFriendResquestToDb, cancelFriendResquestSentToDb } from '../../utils/axiosCalls'
import {
  setFriendRequestsSent,
} from '../../Features/OnlineSlice'
import { socket } from '../../App'
import { SelectedArrayInterface } from '../../interfaces'

function SearchUser() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const store = useSelector((store: RootState) => store)
  const friendRequestsSent = store.online.friendRequestsSent
  const username = store.online.username

  const [allUsers, setallUsers] = useState<SelectedArrayInterface[]>([]);

  const [selectedArray, setselectedArray] = useState<SelectedArrayInterface[]>([]);



  useEffect(() => {
    getAllUsers()
      .then((res) => {
        console.log(res.data.msg)
        setallUsers(res.data.msg.filter((item: string) => item !== username))
      })
      .catch(() => console.log("couldn't fetch users"))
  }, []);


  const filterUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newArray: SelectedArrayInterface[] = []
    allUsers.forEach(element => {
      const length = e.target.value.length
      if (element.username.toLocaleLowerCase().substring(0, length) === e.target.value.toLocaleLowerCase()) {
        newArray.push(element)
      }
    })
    setselectedArray(newArray)
  }


  const sendFriendRequest = (username: string) => {
    sendFriendResquestToDb(username)
      .then((res) => {
        dispatch(setFriendRequestsSent(res.data.msg))
        socket.emit("newNotification", username)
      })
  }
  const cancelFriendRequestSent = (username: string) => {
    cancelFriendResquestSentToDb(username)
      .then((res) => {
        dispatch(setFriendRequestsSent(res.data.msg))
        socket.emit("newNotification", username)
      })
  }

  const mapped = selectedArray.map((item, index) => {
    return (<div className='selectedUser' key={index}>
      <div className='selectedUserInner'>
        <div className='selectedUserInnerTop'>
          <span>
            {item.url && <img src={item.url} alt="" className='userThumbnailImages' />}
          </span>
          <p>{item.username}</p>
        </div>
        <div className='selectedUserInnerButtonsDiv'>
          <button id='addBtnSearchPage'
            style={{
              backgroundColor: friendRequestsSent.includes(item.username) ? "#b35340" : "#45458d"
            }}
            onClick={() => {
              if (friendRequestsSent.includes(item.username)) {
                cancelFriendRequestSent(item.username)
                dispatch(setFriendRequestsSent(friendRequestsSent.filter(element => element !== item.username)))
              } else {
                sendFriendRequest(item.username)
                dispatch(setFriendRequestsSent([...friendRequestsSent, item.username]))
              }
            }}
          >
            {friendRequestsSent.includes(item.username) ? "Cancel" : "Add friend"}
          </button>
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
              if (e.target.value === "") {
                return setselectedArray([])
              }
              filterUsers(e)
            }} />
        </div>
      </header>
      {selectedArray.length < 1 &&
        <div id='noUserDiv'>
          No user found
        </div>}
      {mapped}
    </div>
  )
}

export default SearchUser