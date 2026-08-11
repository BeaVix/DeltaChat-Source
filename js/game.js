import { Canvas } from "./canvas";
import { ChatBoxComponent, displayMessage, serverMessage } from "./chatBox";
import { InputListenerComponent } from "./inputListenerComponent";
import { songPlayer } from "./songPlayer";
import { Background } from "./bg";
import { joinRoom } from "trystero";
import { updateOnline } from "./onlineSidebar";
import { Room } from "./Room";
import maps from "./../maps.json";
import { SoundComponent } from "./soundComponent";


const sendButton = document.querySelector("#sendButton")
const textInput = document.querySelector("#textInput")

 class Game{
    constructor(player, players, room, map, musVolume){
        this.player = player;
        this.players = players;
        this.room = room;
        this.musVolume = musVolume;
        this.lastUpdate = 0
        this.hitBounds = false;

        let mapData = maps.find(m => m.id == map)

        this.musicPlayer = new songPlayer();
        this.musicPlayer.musicPlayer.volume = musVolume/100
        this.inputListenerComponent = new InputListenerComponent(player, players, room, this.musicPlayer.musicPlayer);
        this.bg = new Background(mapData, player.movementComponent);
        this.canvasComponent = new Canvas(this.bg);
        this.chatBoxComponent = new ChatBoxComponent(player, players, room, serverMessage, this.canvasComponent);

        this.loaders = this.bg.objects.filter((object) => object.type == "levelLoader")

        this.bg.animationComponent.sprite.onload = (e => {
            this.canvasComponent.setCanvas()
        })

        requestAnimationFrame((timestamp) => this.gameLoop(timestamp, this))
        
    }

    gameLoop(timestamp, obj){
        obj.canvasComponent.draw(timestamp, obj.players);

        obj.loaders.forEach(loader => {
            if(obj.player.movementComponent.testHitbox(loader.pos, loader.size)){
                this.loadMap(loader.map)
            }
        })

        // Process map hitboxes
        obj.bg.hitboxes.forEach(hitbox => {
                while(obj.player.movementComponent.testHitbox(hitbox.pos, hitbox.size)){
                    if (obj.player.movementComponent.lastMovement[0]) {
                        obj.player.movementComponent.pos[0] -= 1*obj.player.movementComponent.lastMovement[0]
                    }
                    if (obj.player.movementComponent.lastMovement[1]) {
                        obj.player.movementComponent.pos[1] -= 1*obj.player.movementComponent.lastMovement[1]
                    }
                }
            });

        if((obj.player.movementComponent.movement[0] || obj.player.movementComponent.movement[1])){
            obj.player.movementComponent.move();
            
            obj.room.actions.move.send(obj.player.movementComponent.pos)
        }
        let newMap;
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
        this.inputListenerComponent.room = this.room;
        this.chatBoxComponent.room = this.room;
        let mapData = maps.find(m => m.id == newMap)
       
        this.player.movementComponent.pos = mapData.spawnPos[this.bg.id];
        this.bg.objects = mapData.objects
        this.loaders = this.bg.objects.filter((object) => object.type == "levelLoader")
        this.canvasComponent.setDrawQueue()
        
        this.bg.id = mapData.id

        this.room.actions.playerInfo.send(this.player);
        
        this.bg.animationComponent.setAvatar(mapData.image)
        this.bg.animationComponent.frames = mapData.frames
        
    }
}

export {Game}