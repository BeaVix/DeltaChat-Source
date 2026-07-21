import {joinRoom, selfId} from 'trystero'
import { Room } from './Room';
import { updateOnline } from './onlineSidebar';
import { Player } from './Player';
import { Game } from './game';
import { displayMessage, serverMessage } from './chatBox';

const roomId = document.querySelector("#room-id")

let players = []

function connectToRoom(roomCode, nick, avatar,soundOff){
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
    const roomI = joinRoom(roomConfig, roomCode);
    const room = new Room(roomI);

    roomId.textContent ="ROOM: "+ roomCode;

    let frames = 2

    switch(avatar){
        case "pippins":
        case "ruddin":
        case "lancer":
            frames = 0;
            break;
        default:
            break;
    }

    const player = new Player(selfId, nick, avatar, frames);
    const game= new Game(player, players, room, soundOff.checked);

    players.push(player);
    room.actions.playerInfo.send(player);   //send player data to all peers
    updateOnline(players) 

    //Send player data to new peer
    room.room.onPeerJoin = (peerId) => {
        room.actions.playerInfo.send({info: player, bg: game.canvasComponent.bg.name, joined: game.chatBoxComponent.commandComponent.lastMapChange}, {target: peerId})
    }

    //receive player data
    room.actions.playerInfo.onMessage = ({info, bg, joined}, {peerId}) => {
        if(!getById(peerId)){
            const newPlayer = new Player(info.id, info.nick, info.animationComponent.avatar, info.animationComponent.frames)
            newPlayer.movementComponent.pos = info.movementComponent.pos;
            newPlayer.grabbing = info.grabbing;
            newPlayer.grabbed = info.grabbed;
            newPlayer.sleep = info.sleep;
            newPlayer.animationComponent.offset = info.animationComponent.offset;
            if(player.id != joined && joined == peerId){
                game.canvasComponent.bg.setBg(bg);
            }
            serverMessage(newPlayer.nick+" joined!", "green");
            newPlayer.playSound("snd_power");
            players.push(newPlayer);
            updateOnline(players);
        }
    }

    //Remove player
    room.room.onPeerLeave = (peerId) =>{
        const peer = getById(peerId);
        serverMessage(peer.nick +" left!", "red");
        const index = players.indexOf(peer);
        players.splice(index,1);
        updateOnline(players)
    }

    //Receive player movement
    room.actions.move.onMessage = (pos, {peerId})=>{
        const player = getById(peerId);
        player.movementComponent.pos[0] = pos[0];
        player.movementComponent.pos[1] = pos[1];
        if(player.grabbing){
            const grabbing = getById(player.grabbing);
            grabbing.movementComponent.pos[0] = pos[0];
            grabbing.movementComponent.pos[1] = pos[1];
        }
    }

    //Receive chat message
    room.actions.chat.onMessage = ({nick, msg}, {peerId})=>{
        const player = getById(peerId);
        if(!player.muted){
            displayMessage(nick, msg);
            player.playSound("snd_board_text_main_end")
            player.chatComponent.setMessage(msg);
        }
    }

    //Update animations
    room.actions.animationChanged.onMessage = ((offset, {peerId}) => {
        const player = getById(peerId);
        player.animationComponent.offset = offset;
        if(offset == 128){
            player.sleep = true;
        }else if(player.sleep){
            player.sleep = false;
        }
    });

    //change map
    room.actions.mapChanged.onMessage = (({map, size}, {peerId}) => {
        game.canvasComponent.bg.setBg(map)
        const peer = getById(peerId)
        player.movementComponent.mapSize = size;
        game.lastMapChange = peerId
        serverMessage(peer.nick+" changed the map!", "white");
    })

    room.actions.grab.onMessage = ((target, {peerId}) =>{
        const grabber = getById(peerId);
        const grabbed = getById(target);

        console.log(peerId, target)

        grabbed.movementComponent.canMove = false;
        grabbed.movementComponent.lockTyping = true;
        grabbed.animationComponent.rotation = 90;
        grabbed.grabbedBy = peerId;
        
        grabber.grabbing = target;
        grabber.playSound("snd_board_lift")
    })

    room.actions.release.onMessage = ({ side, target}, {peerId}) =>{
        const player = getById(peerId);
        const released = getById(target);

        released.animationComponent.rotation = 0;
        released.grabbedBy = undefined;
        player.release();

        //Fall animation
        const initialPos = released.movementComponent.pos[1];
        switch(side[0]){
			case 1:
				released.movementComponent.movement[0] = 1;		
			break;
			case -1:
				released.movementComponent.movement[0] = -1
			break;
		}
        released.movementComponent.movement[1] = -1
        released.playSound("snd_board_throw");
        setTimeout(()=>{
            released.movementComponent.movement[1] = 1
            const interval = setInterval(()=>{
                if(released.movementComponent.pos[1] == initialPos){
                    released.movementComponent.movement = [0,0]
                    clearInterval(interval);
                    released.movementComponent.canMove = true;
                    released.movementComponent.lockTyping = false;
                }
            },10)
        },150)
    }

    room.actions.hit.onMessage = (msg, {peerId}) => {
        if(msg.target == selfId){
            switch(msg.side[0]){
                case 1:
                    player.movementComponent.movement[0] = 1;		
                break;
                case -1:
                    player.movementComponent.movement[0] = -1
                break;
            }
            player.movementComponent.speed = 3;
            setTimeout(() =>{
                player.movementComponent.speed = 2;
                player.movementComponent.movement[0] = 0;
            }, 500 )
        }
    }

    room.actions.mute.onMessage = (o,{peerId}) =>{
        const mute = getById(peerId);
        mute.muted = true;
    }
    
}

function getById(id){
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        if(player.id == id){
            return player;
        }
    }
    return 0;
}

export {connectToRoom}