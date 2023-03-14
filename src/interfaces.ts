export interface NotificationObjectInterface {
  text: string;
  backgroundColor: string;
  status: boolean;
  time: number;
  fontSize: number;
}

export interface NotificationInterface{
  sender: string,
  imgUrl: string,
  text: string,
  type: string,
  id: string,
  totalRounds?: number,
  gameMode?: string
}

export interface CurrentGameInterface {
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
interface MessagesWithFriendInterface {
  sender: string,
  message: string,
}

export interface FriendInterface {
  username: string,
  imgUrl: string,
  messages: MessagesWithFriendInterface[]
}

export interface FriendsPopupInterface {
  type: "remove" | "challenge" | undefined,
  setshowChallengePopup: React.Dispatch<React.SetStateAction<boolean>>,
  setfriendPopupType: React.Dispatch<React.SetStateAction<"remove" | "challenge" | undefined>>,
  challengeId: string,
  selectedFriend: FriendInterface | undefined
}

export interface SelectedArrayInterface {
  username: string,
  url: string,
  friends: {
    username: string,
    imgUrl: string
  }[]
}
