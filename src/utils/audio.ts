import myAudio from "../Assets/Audio/backgroundMusic.mp3"
import clickAudio from "../Assets/Audio/clickAudio.wav"
import defeatAudio from "../Assets/Audio/defeatAudio.wav"
import victoryAudio from "../Assets/Audio/victoryAudio.wav"
import drawAudio from "../Assets/Audio/drawAudio.flac"


export const audio = new Audio(myAudio)
audio.loop = true

const musicVolume = localStorage.getItem("musicVolume")
if(musicVolume){
  audio.volume = Number(musicVolume)
}


export const clickSound = new Audio(clickAudio)
export const defeatSound = new Audio(defeatAudio)
export const victorySound = new Audio(victoryAudio)
export const drawSound = new Audio(drawAudio)

const soundVolume = localStorage.getItem("soundVolume")
if(soundVolume){
  clickSound.volume = Number(soundVolume)
  defeatSound.volume = Number(soundVolume)
  victorySound.volume = Number(soundVolume)
  drawSound.volume = Number(soundVolume)
}

