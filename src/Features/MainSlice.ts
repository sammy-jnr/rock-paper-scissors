import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  playerMode: string,
  gameMode: string,
  gameState: string,
  gameProgress: string,
  selectedOption:string,
  opponentOption: string,
  // verdict:string
}


const initialState:InitialState = {
  playerMode: "singleplayer",
  gameMode: "RPS",
  gameState: "selectoption",
  gameProgress: "",
  selectedOption:"",
  opponentOption: "",
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
} = mainSlice.actions

export default mainSlice.reducer