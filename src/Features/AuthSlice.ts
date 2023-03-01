import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    loginState: (state, actions:PayloadAction<string>)=>{
      switch (actions.payload) {
        case "login":
          state.isLoggedIn = true
          break;
        case "logout":
        state.isLoggedIn = false
          break;
        default: return state
      }
    },
  }
})

export const {
  loginState
} = authSlice.actions

export default authSlice.reducer