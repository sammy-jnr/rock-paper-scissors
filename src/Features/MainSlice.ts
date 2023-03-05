import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationObjectInterface {
  text: string;
  backgroundColor: string;
  status: boolean;
  time: number;
  fontSize: number;
}

interface InitialState {
  playerMode: string,
  gameMode: string,
  gameState: string,
  gameProgress: string,
  selectedOption:string,
  opponentOption: string,
  notificationObj: NotificationObjectInterface
  // verdict:string
}

let notificationObject = {
  backgroundColor: "",
  text: "",
  status: false,
  time: 0,
  fontSize: 0
}

const initialState:InitialState = {
  playerMode: "singleplayer",
  gameMode: "RPS",
  gameState: "selectoption",
  gameProgress: "",
  selectedOption:"",
  opponentOption: "",
  notificationObj: notificationObject
  // verdict: ""
}

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers:{
    changePlayerMode:(state, action: PayloadAction<string>)=>{
      if (action.payload === "singleplayer"){
        state.playerMode = "singleplayer"
      }else{
        state.playerMode = "multiplayer"
      }
    },
    changeGameMode:(state, action: PayloadAction<string>)=>{
      if (action.payload === "RPS"){
        state.gameMode = "RPS"
      }else{
        state.gameMode = "RPSLS"
      }
    },
    setGameState: (state, action: PayloadAction<string>) => {
        state.gameState = action.payload
    },
    setGameProgress: (state, action: PayloadAction<string>) => {
      state.gameProgress = action.payload
    },
    setSelectedOption: (state, action: PayloadAction<string>) => {
      state.selectedOption = action.payload
    },
    setOpponentOption: (state, action: PayloadAction<string>) => {
      state.opponentOption = action.payload
    },
    sendNewNotification: (state, action: PayloadAction<NotificationObjectInterface>) => {
      state.notificationObj.backgroundColor = action.payload.backgroundColor
      state.notificationObj.fontSize = action.payload.fontSize
      state.notificationObj.status = action.payload.status
      state.notificationObj.text = action.payload.text
      state.notificationObj.time = action.payload.time
    },
    // setVerdict: (state, action: PayloadAction<string>) => {
    //   state.verdict = action.payload
    // },
  }
})

export const {
  changeGameMode,
  changePlayerMode,
  setGameState,
  setGameProgress,
  setSelectedOption,
  setOpponentOption,
  sendNewNotification
} = mainSlice.actions

export default mainSlice.reducer