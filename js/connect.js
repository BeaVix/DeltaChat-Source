import {joinRoom, selfId} from 'trystero'
import { Room } from './Room';
import { updateOnline } from './onlineSidebar';
import { Player } from './Player';
import { Game } from './game';
import { displayMessage, serverMessage } from './chatBox';
import { VolumeControl } from "./volumeControl";
import maps from "./../maps.json"

const roomId = document.querySelector("#room-id")

let players = []

function connectToRoom(roomCode, map, nick, avatar,soundOff, volume){
    const roomConfig = {
        appId: 'com.trystero-demo.lol',

        turnConfig:[
            {
			"urls":
			[
			"turn:turn.cloudflare.com:3478?transport=udp",
			"turn:turn.cloudflare.com:3478?transport=tcp",
			"turns:turn.cloudflare.com:5349?transport=tcp",
			"turn:turn.cloudflare.com:53?transport=udp",
			"turn:turn.cloudflare.com:80?transport=tcp",
			"turns:turn.cloudflare.com:443?transport=tcp"
			],
            "username":"g02a32ec65a19a193bf8a74b5009c8b33081b80fdc4d74b169a9d5eeedaf6fa8",
            "credential":"321d6b13183dc5136ce241e4530d4e0a3772687f69bd6c2c9643c2571c89c132"
        }
        ]
}
    const finalRoomCode = roomCode + "_"+map;
    const roomI = joinRoom(roomConfig, finalRoomCode);

    roomId.textContent ="ROOM: "+ roomCode;

    const volumeControl = new VolumeControl(players);

    let frames = 2
    const player = new Player(selfId, nick, avatar, frames);
    const room = new Room(roomI, roomCode,roomConfig,  players, player, map, volumeControl);
    const game= new Game(player, players, room, map, soundOff);
    
    players.push(player);
    room.actions.playerInfo.send(player);   //send player data to all peers
    updateOnline(players) 
    volumeControl.setVolume(volume)
}

export {connectToRoom}