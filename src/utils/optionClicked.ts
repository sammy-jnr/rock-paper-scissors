import { updateScore } from "./axiosCalls";

// interface SinglePlayerResult {
//   computerChoice: string;
//   verdict: string;
// }
// interface MultiplayerResult {
//   verdict: string
// }

export const optionClicked = (selectedOption:string,gameMode:string,playerMode:string,isLoggedIn:boolean) => {
  const result = playerVsComputer(selectedOption,gameMode)
  isLoggedIn && result && updateScore(result.verdict)
  return result
}
const randomChoice = (gameMode:string) => {
  let optionsArray: string[];
  if(gameMode === "RPS"){
    optionsArray = ["rock", "paper", "scissors"]
  }else{
    optionsArray = ["rock", "paper", "scissors", "lizard", "spock"]
  }
  return optionsArray[Math.floor(Math.random() * optionsArray.length)]
}

const gameVerdict = (selectedOption:string, opponentsOption:string) => {
  const rockArray = ["scissors", "lizard"]
  const paperArray = ["rock", "spock"]
  const scissorsArray = ["paper", "lizard"]
  const lizardArray = ["paper", "spock"]
  const spockArray = ["scissors", "rock"]
  switch (selectedOption) {
    case "rock":
      if(opponentsOption === "rock"){return "draw"} 
      if(rockArray.includes(opponentsOption)){return "won"}
      if(!rockArray.includes(opponentsOption)){return "lost"};
    break;
    case "paper":
      if(opponentsOption === "paper"){return "draw"} 
      if(paperArray.includes(opponentsOption)){return "won"}
      if(!paperArray.includes(opponentsOption)){return "lost"};
    break;
    case "scissors":
      if(opponentsOption === "scissors"){return "draw"} 
      if(scissorsArray.includes(opponentsOption)){return "won"}
      if(!scissorsArray.includes(opponentsOption)){return "lost"}
    break;
    case "lizard":
      if(opponentsOption === "lizard"){return "draw"} 
      if(lizardArray.includes(opponentsOption)){return "won"}
      if(!lizardArray.includes(opponentsOption)){return "lost"};
      break;
    case "spock":
      if(opponentsOption === "spock"){return "draw"} 
      if(spockArray.includes(opponentsOption)){return "won"}
      if(!spockArray.includes(opponentsOption)){return "lost"};
      break;
    default: 
      break;
  }
}

const playerVsComputer = (selectedOption:string,gameMode:string) => {
  let computerChoice = randomChoice(gameMode)
  let verdict = gameVerdict(selectedOption,computerChoice)
  const score = localStorage.getItem("score")
  setTimeout(() => {
    addScoreToLocalStorage(score, verdict)
  }, 2000);
  if(verdict && computerChoice){
    return {computerChoice, verdict}
  }
}

const addScoreToLocalStorage = (score:string|null, verdict:string|undefined) => {
  if(verdict === "won"){
    score 
    ? 
    localStorage.setItem("score", String(Number(score) + 1))
    :
    localStorage.setItem("score", "1")
  }else if (verdict === "lost"){
    if(score === "0") return
    score 
    ? 
    localStorage.setItem("score", String(Number(score) - 1))
    :
    localStorage.setItem("score", "0")
  }
}