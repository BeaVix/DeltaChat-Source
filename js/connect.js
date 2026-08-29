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
const grabCheckbox = document.querySelector("#allowGrab");
const pushCheckbox = document.querySelector("#allowPush");

let players = []

function connectToRoom(roomCode, map, nick, avatar,musVol, volume, playerVol, allowGrab, allowPush){
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
"username":"g0634e01308a0f9e27ad253e29661a8560856de1d14d6fa4406ec20f618dec1c",
"credential":"2b71a867c6a47ed63ddcc33e1af0cea04e5bde7a3340943331f2e6855c9cfbb9"}
        ]
}
    const finalRoomCode = roomCode + "_"+map;
    const roomI = joinRoom(roomConfig, finalRoomCode);

    roomId.textContent ="ROOM: "+ roomCode;

    const globalSFX = new SoundComponent(sfxVolume);
    globalSFX.setVolume(volume)

    const player = new Player(selfId, nick, avatar, allowGrab, allowPush);
    const room = new Room(roomI, roomCode,roomConfig,  players, player, map, globalSFX);
    const game= new Game(player, players, room, map, musVol, globalSFX);
    
    player.sound.setVolume(playerVol);

    players.push(player);
    room.actions.playerInfo.send(player);   //send player data to all peers
    updateOnline(players)

    grabCheckbox.checked = allowGrab;
    pushCheckbox.checked = allowPush;

    grabCheckbox.addEventListener("change", e => {
        player.canBeGrabbed = grabCheckbox.checked
        room.actions.changeGrab.send(grabCheckbox.checked)
    });

    pushCheckbox.addEventListener("change", e => {
        player.canBePushed = pushCheckbox.checked
        room.actions.changePush.send(pushCheckbox.checked)
    })
}

export {connectToRoom}