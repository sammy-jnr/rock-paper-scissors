export let countdownTime:string

let intervalState = false

export const clearIntervalFunc = (state:boolean) => {
  intervalState = state
}

export const countdown = () => {
  let timeLeft = 300
  const myInterval = setInterval(()=>{
    if(timeLeft < 0 || intervalState === true){
      countdownTime = `5:00`
      clearInterval(myInterval)
      return
    }
    let minutes = Math.floor( (timeLeft/60) % 60 );
    let seconds = Math.floor( timeLeft % 60 )
    if([1,2,3,4,5,6,7,8,9,0].includes(seconds)){
      countdownTime = `${minutes}:0${seconds}`
    }else{
      countdownTime = `${minutes}:${seconds}`
    }
    timeLeft -=1;
  },1000)
}
// clearInterval(myInterval)