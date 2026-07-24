import { Canvas } from "./canvas";
import { ChatBoxComponent, displayMessage, serverMessage } from "./chatBox";
import { InputListenerComponent } from "./inputListenerComponent";
import { songPlayer } from "./songPlayer";
import { Background } from "./bg";
import { joinRoom } from "trystero";
import { updateOnline } from "./onlineSidebar";
import { Room } from "./Room";

const sendButton = document.querySelector("#sendButton")
const textInput = document.querySelector("#textInput")

 class Game{
    constructor(player, players, room, map, soundOff){
        this.player = player;
        this.players = players;
        this.room = room;
        this.soundOff = soundOff;
        this.lastUpdate = 0

        this.musicPlayer = new songPlayer(soundOff);
        this.inputListenerComponent = new InputListenerComponent(player, players, room, this.musicPlayer.musicPlayer);
        this.bg = new Background(map, player.movementComponent);
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
        let newMap;
        if(obj.player.movementComponent.pos[1] == obj.player.movementComponent.mapSize[1] - obj.player.animationComponent.size[1]){
            newMap = this.bg.exits["south"]
            this.player.movementComponent.pos[1] = 0
        }else if(!obj.player.movementComponent.pos[1]){
            newMap = this.bg.exits["north"]
            this.player.movementComponent.pos[1] = 200
        }
        if(newMap){
            obj.loadMap(newMap)
        }

        obj.lastUpdate = timestamp;

        requestAnimationFrame((timestamp) => obj.gameLoop(timestamp, obj));
    }

    loadMap(newMap){
        this.room.room.leave()
        if(this.players.length > 1){
            this.players.splice(1)
        }
        const finalRoomCode = this.room.roomCode + "_"+newMap 
        const roomConfig = this.room.roomConfig
        const roomCode = this.room.roomCode;
        const newRoom = joinRoom(this.room.roomConfig, finalRoomCode)
        this.room = new Room(newRoom, roomCode, roomConfig, this.players, this.player, newMap)
       
        this.room.actions.playerInfo.send(this.player);
        this.bg.setBg(newMap)
    }
}

export {Game}