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

function connectToRoom(roomCode, map, nick, avatar,soundOff){
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
                "username":"g03da9b858657aec92514e6ed36a015a93c68e71fc179cbfac136a8d755bf8d3",
                "credential":"398afc7c71dab0fdf3cbb9736347943ab383a3af1a8066edcdcb5f57a7dd9acb"
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
    const game= new Game(player, players, room, map, soundOff.checked);
    
    players.push(player);
    room.actions.playerInfo.send(player);   //send player data to all peers
    updateOnline(players) 
}

export {connectToRoom}