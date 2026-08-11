import { connectToRoom } from "./connect";

const nickInput = document.querySelector("#nickInput");
const roomInput = document.querySelector("#roomInput");
const randomizeBtn = document.querySelector("#randomizeBtn");
const confirmBtn = document.querySelector("#confirm-nick-btn");
const setupScreen = document.querySelector("#setup-window");
const gameScreen = document.querySelector("#gameWindow");
const chatBox = document.querySelector("#chat-container");
const sideBar = document.querySelector("#side-bar");
const musicVolSlider = document.querySelector("#musicVolume-preGame");
const portrait = document.querySelector("#portrait");
const map = document.querySelector("#map");
const avatarSlct = document.querySelector("#characterName")
const volumeSlider = document.querySelector("#sfxVolume-preGame")
const playerVolSlider = document.querySelector("#playerVolume-preGame") 

const musicAudio = new Audio("snd_ralseising1.wav")
const sfxAudio = new Audio("snd_splat.wav")
const playerAudio = new Audio("snd_pombark.wav")

const strLen = 9;

const nick = localStorage.getItem("nick") || ""
const roomCode = localStorage.getItem("roomCode") || "DUMBWorld"

nickInput.value = nick
roomInput.value = roomCode

let alphanumeric = "ABCDEFGHIJKMNLOPQRSTUVWXYZ1234567890"
alphanumeric = alphanumeric.split("");

nickInput.addEventListener("change", e=>{
    localStorage.setItem("nick", nickInput.value);
})

roomInput.addEventListener("change", e => {
    localStorage.setItem("roomCode", roomInput.value);
})

randomizeBtn.addEventListener("click", e => {
    let codeStr = ""
    for (let i = 0; i < strLen; i++) {
        const char = alphanumeric[Math.floor(Math.random()*alphanumeric.length)];
        codeStr += char;
    }
    roomInput.value = codeStr;
    localStorage.setItem("roomCode", roomInput.value);
});

musicVolSlider.addEventListener("change", e =>{
    musicAudio.volume = musicVolSlider.value/100;
    musicAudio.fastSeek(0)
    musicAudio.play()
})

volumeSlider.addEventListener("change", e =>{
    sfxAudio.volume = volumeSlider.value/100;
    sfxAudio.fastSeek(0)
    sfxAudio.play()
})

playerVolSlider.addEventListener("change", e =>{
    playerAudio.volume = playerVolSlider.value/100;
    playerAudio.fastSeek(0)
    playerAudio.play()
})

confirmBtn.addEventListener("click", e => {
    setupScreen.style.display = "none";
    gameScreen.style.display = "block";
    chatBox.style.display = "block";
    sideBar.style.display = "block";
    const nick = nickInput.value;
    const roomCode = roomInput.value;
    const avatar = avatarSlct.textContent.toLowerCase();
    const mapValue = map.value;
    const volume = volumeSlider.value
    const musicVol = musicVolSlider.value
    const playerVol = playerVolSlider.value

    if(roomCode != ""){
        connectToRoom(roomCode, mapValue, nick, avatar, musicVol, volume, playerVol)
    }
});