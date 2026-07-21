import { Canvas } from "./canvas";
import { ChatBoxComponent, displayMessage, serverMessage } from "./chatBox";
import { InputListenerComponent } from "./inputListenerComponent";
import { songPlayer } from "./songPlayer";
import { Background } from "./bg";

const sendButton = document.querySelector("#sendButton")
const textInput = document.querySelector("#textInput")

 class Game{
    constructor(player, players, room,soundOff){
        this.player = player;
        this.players = players;
        this.room = room;
        this.soundOff = soundOff;
        this.lastUpdate = 0

        this.musicPlayer = new songPlayer(soundOff);
        this.inputListenerComponent = new InputListenerComponent(player, players, room, this.musicPlayer.musicPlayer);
        this.bg = new Background("castletown");
        this.canvasComponent = new Canvas(this.bg);
        this.chatBoxComponent = new ChatBoxComponent(player, players, room, serverMessage, this.canvasComponent);

        this.bg.sprite.onload = (e => {
            this.canvasComponent.setCanvas()
        })

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
}





export {Game}