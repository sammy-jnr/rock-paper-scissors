import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defeatSound, victorySound, drawSound } from "../utils/audio";

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
  totalRounds: number,
  gameState: string,
  gameProgress: string,
  selectedOption:string,
  opponentOption: string,
  notificationObj: NotificationObjectInterface
  countdownStarted: boolean
  showNavClass: string,
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
  totalRounds: 5,
  gameState: "selectoption",
  gameProgress: "",
  selectedOption:"",
  opponentOption: "",
  notificationObj: notificationObject,
  countdownStarted: false,
  showNavClass: "appInner",
}

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers:{
    changePlayerMode:(state, action: PayloadAction<string>)=>{
      state.playerMode = action.payload
    },
    changeGameMode:(state, action: PayloadAction<string>)=>{
      state.gameMode = action.payload
    },
    setGameState: (state, action: PayloadAction<string>) => {
        state.gameState = action.payload
    },
    setGameProgress: (state, action: PayloadAction<string>) => {
      state.gameProgress = action.payload
      if(action.payload === "won"){
        victorySound.play()
      }
      if(action.payload === "lost"){
        defeatSound.play()
      }
      if(action.payload === "draw"){
        drawSound.play()
      }
    },
    setTotalRounds: (state, action: PayloadAction<number>) => {
      state.totalRounds = action.payload
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
    setCountdownStarted: (state, actions:PayloadAction<boolean>) =>{
      state.countdownStarted = actions.payload
    },
    setShowNavClass: (state, actions:PayloadAction<string>) =>{
      state.showNavClass = actions.payload
    },
  }
})

export const {
  changeGameMode,
  changePlayerMode,
  setGameState,
  setGameProgress,
  setSelectedOption,
  setOpponentOption,
  sendNewNotification,
  setCountdownStarted,
  setTotalRounds,
  setShowNavClass,
} = mainSlice.actions

export default mainSlice.reducer