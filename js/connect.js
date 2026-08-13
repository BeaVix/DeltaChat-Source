import {joinRoom, selfId} from 'trystero'
import { Room } from './Room';
import { updateOnline } from './onlineSidebar';
import { Player } from './Player';
import { Game } from './game';
import { displayMessage, serverMessage } from './chatBox';
import maps from "./../maps.json"
import { SoundComponent } from './soundComponent';

const roomId = document.querySelector("#room-id")
const sfxVolume = document.querySelector("#sfxVolume")

let players = []

function connectToRoom(roomCode, map, nick, avatar,musVol, volume, playerVol){
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
            "username":"g07638b83f8ae846e8b8544098ae19891c044a42d5e4c8548576b21bbf890659",
            "credential":"edb8f5bf62b9838c015b885c17aa2082f92dbec978266607033140d24a8d1ac2"
        }
        ]
}
    const finalRoomCode = roomCode + "_"+map;
    const roomI = joinRoom(roomConfig, finalRoomCode);

    roomId.textContent ="ROOM: "+ roomCode;

    const globalSFX = new SoundComponent(sfxVolume);
    globalSFX.setVolume(volume)

    let frames = 2
    const player = new Player(selfId, nick, avatar, frames);
    const room = new Room(roomI, roomCode,roomConfig,  players, player, map, globalSFX);
    const game= new Game(player, players, room, map, musVol, globalSFX);
    
    player.sound.setVolume(playerVol);

    players.push(player);
    room.actions.playerInfo.send(player);   //send player data to all peers
    updateOnline(players)
}

export {connectToRoom}