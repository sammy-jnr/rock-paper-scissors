import axios from "axios"
import { RandomID } from '../ID'
import { getCookie } from "./cookies"

const accessTokenCookie = getCookie("accessToken")
const refreshTokenCookie = getCookie("refreshToken")

const headers = {
  "Content-Type": "application/json",
  authorization: `Bearer ${accessTokenCookie}`,
};

const baseUrl = "http://localhost:5000"

export const registerNewUser = (username:string,email:string,password:string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/register`,
    method: "post",
    data:{
      username,
      email,
      password
    }
  })
}
export const login = (email:string,password:string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/login`,
    method: "post",
    data:{
      email,
      password
    }
  })
}

export const registerGoogle = (code:string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/registerGoogle`,
    method: "post",
    data:{
      code
    }
  })
}
export const loginGoogle = (code:string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/loginGoogle`,
    method: "post",
    data:{
      code
    }
  })
}


export const getUser = (username:string, accessToken:string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/user`,
    method: "post",
    data:{
      username,
    },
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    }
  })
}

export const getNewAccessToken = (username:string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/newAccessToken`,
    method: "post",
    data: {
      refreshToken: refreshTokenCookie,
      username
    }
  })
}

export const updateScore = (verdict:string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/updateScore`,
    method: "put",
    data: {
      verdict
    },
    headers: headers
  })
}

export const optionSelected = (option:string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/updateScore`,
    method: "put",
    data: {
      option
    }
  })
}
export const getAllUsers = () => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/getAllUsers`,
    method: "get",
    headers: headers
  })
}
export const sendFriendResquestToDb = (friendUsername:string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/sendFriendRequest`,
    method: "post",
    data:{
      friendUsername,
      notificationId: RandomID()
    },
    headers: headers
  })
}
export const cancelFriendResquestSentToDb = (friendUsername:string, ) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/cancelFriendRequest`,
    method: "post",
    data:{
      friendUsername
    },
    headers: headers
  })
}

export const acceptFriendRequestToDb = (friendUsername:string, notificationId: string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/acceptFriendRequest`,
    method: "post",
    data:{
      friendUsername,
      notificationId
    },
    headers: headers
  })
}
export const rejectFriendRequestToDb = (friendUsername:string, notificationId: string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/rejectFriendRequest`,
    method: "post",
    data:{
      friendUsername,
      notificationId
    },
    headers: headers
  })
}

export const removeFriendDb = (friendUsername:string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/removeFriend`,
    method: "post",
    data:{
      friendUsername,
    },
    headers: headers
  })
}

export const sendMessageDb = (friendUsername:string, message:string,) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/sendMessage`,
    method: "post",
    data:{
      friendUsername,
      message
    },
    headers: headers
  })
}
export const sendChallengeDb = (opponentUsername:string,totalRounds:number,gameMode:string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/sendChallenge`,
    method: "post",
    data:{
      opponentUsername,
      totalRounds,
      gameMode,
      notificationId: RandomID()
    },
    headers: headers
  })
}
export const cancelChallengeDb = (opponentUsername:string, challengeId:string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/cancelChallenge`,
    method: "post",
    data:{
      opponentUsername,
      challengeId
    },
    headers: headers
  })
}
export const acceptChallengeDb = (opponentUsername:string, gameMode:string|undefined, totalRounds:number|undefined, notificationId:string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/acceptChallenge`,
    method: "post",
    data:{
      opponentUsername,
      gameMode,
      totalRounds,
      notificationId
    },
    headers: headers
  })
}

export const deleteNotification = (notificationId:string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/deleteNotification`,
    method: "post",
    data:{
      notificationId
    },
    headers: headers
  })
}

export const selectedOptionDb = (option:string, opponentUsername:string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/selectedOption`,
    method: "post",
    data:{
      option,
      opponentUsername
    },
    headers: headers
  })
}
export const clearMultiplayerGameDb = () => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/clearMultiplayerGame`,
    method: "put",
    headers: headers
  })
}


export const changeNameDb = (newName:string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/changeName`,
    method: "post",
    data:{
      newName
    },
    headers: headers
  })
}

export const updateProfilePicture = (formData:FormData) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/updateProfilePicture`,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${accessTokenCookie}`,
    }
  })
}



