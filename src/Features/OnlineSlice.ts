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

interface NotificationInterface{
  sender: string,
  imgUrl: string,
  text: string,
  type: string,
  id: string,
  totalRounds?: number,
  gameMode?: string
}

interface CurrentChallengeInterface {
  myScore: number,
  opponentsScore: number,
  mode: string,
  me: string,
  opponent: string,
  roundsPlayed: number,
  totalRounds: number,
  myChoice: string,
  opponentsChoice: string,
}



interface InitialState {
  username: string,
  onlineSoloScore: number
  friends: FriendInterface[],
  notifications: NotificationInterface[]
  currentChallenge: CurrentChallengeInterface | undefined
  currentChallengeDisplay: CurrentChallengeInterface
  url: string,
  friendRequestsSent: string[], 
  friendRequestsReceived: string[],
  multiplayerGameStarted: boolean
}

const currentChallengeDisplayInitialState = {
  myScore: 0,
  opponentsScore: 0,
  mode: "RPS",
  me: "You",
  opponent: "Opponent",
  roundsPlayed: 0,
  totalRounds: 0,
  myChoice: "",
  opponentsChoice: "",
}

const initialState:InitialState = {
  username: "",
  onlineSoloScore: 0,
  friends: [],
  notifications: [],
  currentChallenge: undefined,
  currentChallengeDisplay: currentChallengeDisplayInitialState,
  url: "",
  friendRequestsSent: [], 
  friendRequestsReceived: [],
  multiplayerGameStarted: false
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
    setFriendsArray: (state, action:PayloadAction<FriendInterface[]>) => {
      state.friends = action.payload
    },
    setNotificationsArray: (state, action:PayloadAction<NotificationInterface[]>) => {
      if(!action.payload)return
      state.notifications = action.payload
    },
    setCurrentChallenge: (state, action:PayloadAction<CurrentChallengeInterface|undefined>) => {
      state.currentChallenge = action.payload
    },
    setcurrentChallengeDisplay: (state, action:PayloadAction<CurrentChallengeInterface>) => {
      state.currentChallengeDisplay = action.payload
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
    setMultiplayerGameStarted: (state, action:PayloadAction<boolean>) => {
      state.multiplayerGameStarted = action.payload
    },
    

  }
})

export const {
  setUsername,
  setCurrentChallenge,
  setcurrentChallengeDisplay,
  setFriendsArray,
  setNotificationsArray,
  setOnlineScore,
  setUrl,
  setFriendRequestsSent,
  setFriendRequestsReceived,
  setMultiplayerGameStarted
} = onlineSlice.actions

export default onlineSlice.reducer