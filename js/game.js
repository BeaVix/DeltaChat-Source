import { Canvas } from "./canvas";
import { ChatBoxComponent, displayMessage, serverMessage } from "./chatBox";
import { InputListenerComponent } from "./inputListenerComponent";
import { songPlayer } from "./songPlayer";

const sendButton = document.querySelector("#sendButton")
const textInput = document.querySelector("#textInput")

 class Game{
    constructor(player, players, room,soundOff){
        this.player = player;
        this.players = players;
        this.room = room;
        this.soundOff = soundOff;
        this.lastUpdate = 0
        this.lastMapChange = 0;

        this.musicPlayer = new songPlayer(soundOff);
        this.inputListenerComponent = new InputListenerComponent(player, players, room, this.musicPlayer.musicPlayer);
        this.canvasComponent = new Canvas();
        this.chatBoxComponent = new ChatBoxComponent(player, players, room, serverMessage, this.canvasComponent, this.updateLastMapChange);

        requestAnimationFrame((timestamp) => this.gameLoop(timestamp, this))
        
    }

    gameLoop(timestamp, obj){
            obj.canvasComponent.draw(timestamp, obj.players);

            if(obj.player.movementComponent.movement[0] || obj.player.movementComponent.movement[1]){
                obj.player.movementComponent.move();
                obj.room.actions.move.send(obj.player.movementComponent.pos)
            }

            obj.lastUpdate = timestamp;

            requestAnimationFrame((timestamp) => obj.gameLoop(timestamp, obj));
        }

    updateLastMapChange(id){
        this.lastMapChange = id;
    }
}





export {Game}