import axios from "axios"
import { AxiosResponse } from "axios"
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
export const getUser = (username:string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/user`,
    method: "post",
    data:{
      username,
    },
    headers: headers
  })
}

export const getNewAccessToken = (username:string) => {
  return axios({
    withCredentials: true,
    url: `${baseUrl}/refreshToken`,
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
console.log("first")

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
      friendUsername
    },
    headers: headers
  })
}
export const cancelFriendResquestSentToDb = (friendUsername:string) => {
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

