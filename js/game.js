import { draw, setCanvas, bg } from "./canvas";
import { ChatBoxComponent, displayMessage, serverMessage } from "./chatBox";
import { InputListenerComponent } from "./inputListenerComponent";
import { songPlayer } from "./songPlayer";

const sendButton = document.querySelector("#sendButton")
const textInput = document.querySelector("#textInput")

let lastUpdate = 0

function startGame(player, players, room,soundOff){

    const musicPlayer = new songPlayer(soundOff);

    const inputListenerComponent = new InputListenerComponent(player, players, room, musicPlayer.musicPlayer);

    const chatBoxComponent = new ChatBoxComponent(player, players, room, serverMessage);

    

    requestAnimationFrame(gameLoop)

    function gameLoop(timestamp){

        draw(timestamp, players);

        if(player.movementComponent.movement[0] || player.movementComponent.movement[1]){
            player.movementComponent.move();
            room.actions.move.send(player.movementComponent.pos)
        }

        lastUpdate = timestamp;

        requestAnimationFrame(gameLoop);
    }
}



export {startGame}