import { connectToRoom } from "./connect";

const nickInput = document.querySelector("#nickInput");
const roomInput = document.querySelector("#roomInput");
const avatarSlct = document.querySelector("#avatar")
const randomizeBtn = document.querySelector("#randomizeBtn");
const confirmBtn = document.querySelector("#confirm-nick-btn");
const setupScreen = document.querySelector("#setup-window");
const gameScreen = document.querySelector("#gameWindow");
const chatBox = document.querySelector("#chat-container");
const sideBar = document.querySelector("#side-bar");
const musicChk = document.querySelector("#soundOff");
const portrait = document.querySelector("#portrait");

const strLen = 9;

let alphanumeric = "ABCDEFGHIJKMNLOPQRSTUVWXYZ1234567890"
alphanumeric = alphanumeric.split("");

avatarSlct.addEventListener("change", loadPortrait)
avatarSlct.addEventListener("load", loadPortrait);

function loadPortrait(){
    const val = avatarSlct.value;
    let src = "portrait_"+val+".png"
    portrait.src = src;
}

randomizeBtn.addEventListener("click", e => {
    let codeStr = ""
    for (let i = 0; i < strLen; i++) {
        const char = alphanumeric[Math.floor(Math.random()*alphanumeric.length)];
        codeStr += char;
    }
    roomInput.value = codeStr;
});

confirmBtn.addEventListener("click", e => {
    setupScreen.style.display = "none";
    gameScreen.style.display = "block";
    chatBox.style.display = "block";
    sideBar.style.display = "block";
    const nick = nickInput.value;
    const roomCode = roomInput.value;
    const avatar = avatarSlct.value;

    if(roomCode != ""){
        connectToRoom(roomCode, nick, avatar, soundOff)
    }
});