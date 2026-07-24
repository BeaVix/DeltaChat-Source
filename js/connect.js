import {joinRoom, selfId} from 'trystero'
import { Room } from './Room';
import { updateOnline } from './onlineSidebar';
import { Player } from './Player';
import { Game } from './game';
import { displayMessage, serverMessage } from './chatBox';

const roomId = document.querySelector("#room-id")

let players = []

function connectToRoom(roomCode, map, nick, avatar,soundOff){
    const roomConfig = {
        appId: 'com.trystero-demo.lol',

        turnConfig:[
            {
                urls:[
                    "stun:stun.cloudflare.com:3478",
                    "turn:turn.cloudflare.com:3478?transport=udp"
                ],
                username:"g070096ddaefb7bd59e4bfed110ebf61d75cdb718632bd582b2d41759c3d180e",
                credential:"809ec1156bc5d44ac7fa4aea1b98ea230c9b67b8deba7aeec72aa0352d83db43"
            }
        ]
	}
    const finalRoomCode = roomCode + "_"+map;
    const roomI = joinRoom(roomConfig, finalRoomCode);

    roomId.textContent ="ROOM: "+ roomCode;

    let frames = 2

    switch(avatar){
        case "pippins":
        case "green pippins":    
        case "ruddin":
        case "lancer":
        case "pink (ghost)":
        case "pink":
        case "jackpins":
            frames = 0;
            break;
        default:
            break;
    }

    const player = new Player(selfId, nick, avatar, frames);
    const room = new Room(roomI, roomCode,roomConfig,  players, player, map);
    const game= new Game(player, players, room, map, soundOff.checked);
    
    players.push(player);
    room.actions.playerInfo.send(player);   //send player data to all peers
    updateOnline(players) 
}

export {connectToRoom}