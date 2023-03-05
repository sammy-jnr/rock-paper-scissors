import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface MessagesWithFriendInterface {
  sender: string,
  message: string,
}

interface FriendInterface {
  username: string,
  imgUrl: string,
  messages: MessagesWithFriendInterface[]
}

const friends = [
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

interface NotificationInterface{
  username: string,
  imgUrl: string,
  text: string,
  type: string,
  id: string
}

interface CurrentGameInterface {
  myScore: Number,
  opponentsScore: Number,
  mode: String,
  sender: String,
  receiver: String,
  roundsPlayed: Number,
  totalRounds: Number,
  isAccepted: Boolean,
  myChoice: String,
  opponentsChoice: String,
}


interface InitialState {
  username: string,
  onlineSoloScore: number
  friends: FriendInterface[],
  notifications: NotificationInterface[]
  currentGame: CurrentGameInterface | undefined
  url: string,
  friendRequestsSent: string[], 
  friendRequestsReceived: string[], 
}


const initialState:InitialState = {
  username: "",
  onlineSoloScore: 0,
  friends: friends,
  notifications: [],
  currentGame: undefined,
  url: "",
  friendRequestsSent: [], 
  friendRequestsReceived: []
}
const onlineSlice = createSlice({
  name: "online",
  initialState,
  reducers:{
    setUsername: (state, action:PayloadAction<string>) =>{
      state.username = action.payload
    },
    setOnlineScore: (state, action:PayloadAction<number>) => {
      state.onlineSoloScore = action.payload
    },
    setFriendsArray: (state, action:PayloadAction<FriendInterface>) => {
      state.friends = [...state.friends, action.payload]
    },
    setNotificationsArray: (state, action:PayloadAction<NotificationInterface>) => {
      state.notifications = [...state.notifications, action.payload]
    },
    setCurrentChallenge: (state, action:PayloadAction<CurrentGameInterface|undefined>) => {
      state.currentGame = action.payload
    },
    setUrl: (state, action:PayloadAction<string>) => {
      state.url = action.payload
    },
    setFriendRequestsSent: (state, action:PayloadAction<string[]>) => {
      state.friendRequestsSent = action.payload
    },
    setFriendRequestsReceived: (state, action:PayloadAction<string[]>) => {
      state.friendRequestsReceived = action.payload
    },
    

  }
})

export const {
  setUsername,
  setCurrentChallenge,
  setFriendsArray,
  setNotificationsArray,
  setOnlineScore,
  setUrl,
  setFriendRequestsSent,
  setFriendRequestsReceived
} = onlineSlice.actions

export default onlineSlice.reducer