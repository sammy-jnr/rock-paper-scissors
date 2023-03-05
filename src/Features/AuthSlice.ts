import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeCookie } from "../utils/cookies";

interface InitialState {
  isLoggedIn: boolean
}


const initialState:InitialState = {
  isLoggedIn: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    setIsLoggedIn: (state, actions:PayloadAction<boolean>)=>{
      state.isLoggedIn = actions.payload
    },
    logOut: (state) => {
      state.isLoggedIn = false
      removeCookie("accessToken")
      removeCookie("refreshToken")
    },
  }
})

export const {
  setIsLoggedIn,
  logOut,
} = authSlice.actions

console.log(initialState.isLoggedIn)

export default authSlice.reducer