import {joinRoom, selfId} from 'trystero'
import { Room } from './Room';
import { updateOnline } from './onlineSidebar';
import { Player } from './Player';
import { Game } from './game';
import { SoundComponent } from './soundComponent';

const roomId = document.querySelector("#room-id")
const sfxVolume = document.querySelector("#sfxVolume")
const grabCheckbox = document.querySelector("#allowGrab");
const pushCheckbox = document.querySelector("#allowPush");

let players = []

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
"username":"g0efdbae8a1c122fcb3dd10c44b78c7afa29a78059633f8d2fe0779487f778fa",
"credential":"d9384177cc5f4891b0334c43a0be82955f9905560ec71eb01baf271ba01ae690"}
        ]
}

function connectToRoom(roomCode, map, config){

    const finalRoomCode = roomCode + "_"+map;
    const roomI = joinRoom(roomConfig, finalRoomCode);

    roomId.textContent ="ROOM: "+ roomCode;

    const globalSFX = new SoundComponent(sfxVolume);
    globalSFX.setVolume(config.volume)

    const player = new Player(selfId, config.nick, config.avatar, config.allowGrab, config.allowPush);
    const room = new Room(roomI, roomCode,roomConfig,  players, player, map, globalSFX);
    const game= new Game(player, players, room, map, config.musVol, globalSFX);
    
    player.sound.setVolume(config.playerVol);

    players.push(player);
    room.actions.playerInfo.send(player);   //send player data to all peers
    updateOnline(players)

    grabCheckbox.checked = config.allowGrab;
    pushCheckbox.checked = config.allowPush;

    grabCheckbox.addEventListener("change", e => {
        player.canBeGrabbed = grabCheckbox.checked
        room.actions.changeGrab.send(grabCheckbox.checked)
    });

    pushCheckbox.addEventListener("change", e => {
        player.canBePushed = pushCheckbox.checked
        room.actions.changePush.send(pushCheckbox.checked)
    })
}

export {connectToRoom }