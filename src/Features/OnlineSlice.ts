import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface InitialState {
  onlineSoloScore: number
}

const initialState:InitialState = {
  onlineSoloScore: 0
}
const onlineSlice = createSlice({
  name: "online",
  initialState,
  reducers:{
  }
})

export const {
  
} = onlineSlice.actions

export default onlineSlice.reducer