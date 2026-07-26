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
                urls:["turn:turn.cloudflare.com:3478?transport=udp",
			"turn:turn.cloudflare.com:3478?transport=tcp",
			"turns:turn.cloudflare.com:5349?transport=tcp",	
			"turn:turn.cloudflare.com:53?transport=udp",
			"turn:turn.cloudflare.com:80?transport=tcp",
			"turns:turn.cloudflare.com:443?transport=tcp"],
			username:"g0875ddc3b910f13ddb0ab82a9523f816a1f70cd8f8f381ec520da55f8041bbd",
			credential:"ec9cdaf98463e6761cf49526b77dd4d16a36960fb42a22c2946734a8cbe19921"
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