import { selfId } from "trystero";
import { Player } from "./Player";
import { displayMessage, serverMessage } from "./chatBox";
import { updateOnline } from "./onlineSidebar";
class Room{
    constructor(room, roomCode, roomConfig, players, player, bg){
        this.room = room;
        this.roomConfig = roomConfig
        this.roomCode = roomCode
        this.player = player;
        this.players = players
        this.bg = bg

        this.actions = {}
        this.actions.chat = room.makeAction("chat");
        this.actions.move = room.makeAction("move");
        this.actions.changeAvatar = room.makeAction("changeAvatar");
        this.actions.playerInfo = room.makeAction("playerInfo");
        this.actions.hit = room.makeAction("hit");
        this.actions.mute = room.makeAction("mute");
        this.actions.animationChanged = room.makeAction("animationChanged");
        this.actions.grab = room.makeAction("grab");
        this.actions.release = room.makeAction("release");
        this.actions.playSound = room.makeAction("playSound");


    //Send player data to new peer
        this.room.onPeerJoin = (peerId) => {
        this.actions.playerInfo.send({info: player, bg: this.bg, joined:0}, {target: peerId})
    }

    //receive player data
    this.actions.playerInfo.onMessage = ({info, bg, joined}, {peerId}) => {
        if(!this.getById(peerId)){
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
    this.room.onPeerLeave = (peerId) =>{
        const peer = this.getById(peerId);
        serverMessage(peer.nick +" left!", "red");
        const index = players.indexOf(peer);
        players.splice(index,1);
        updateOnline(players)
    }

    //Receive player movement
    this.actions.move.onMessage = (pos, {peerId})=>{
        const player = this.getById(peerId);
        player.movementComponent.pos[0] = pos[0];
        player.movementComponent.pos[1] = pos[1];
        if(player.grabbing){
            const grabbing = this.getById(player.grabbing);
            grabbing.movementComponent.pos[0] = pos[0];
            grabbing.movementComponent.pos[1] = pos[1];
        }
    }

    //Receive chat message
    this.actions.chat.onMessage = ({nick, msg}, {peerId})=>{
        const player = this.getById(peerId);
        if(!player.muted){
            displayMessage(nick, msg);
            player.playSound("snd_board_text_main_end")
            player.chatComponent.setMessage(msg);
        }
    }

    //Update animations
    this.actions.animationChanged.onMessage = ((animation, {peerId}) => {
        const player = this.getById(peerId);
        player.animationComponent.setAnimation(animation);
        if(animation == "sleep"){
            if(player)
            player.sleep = true;
        }else if(player.sleep){
            player.sleep = false;
        }
    });

    this.actions.grab.onMessage = ((target, {peerId}) =>{
        const grabber = this.getById(peerId);
        const grabbed = this.getById(target);

        console.log(peerId, target)

        grabbed.movementComponent.canMove = false;
        grabbed.movementComponent.lockTyping = true;
        grabbed.animationComponent.rotation = 90;
        grabbed.grabbedBy = peerId;
        
        grabber.grabbing = target;
        grabber.playSound("snd_board_lift")
    })

    this.actions.release.onMessage = ({ side, target}, {peerId}) =>{
        const player = this.getById(peerId);
        const released = this.getById(target);

        released.animationComponent.rotation = 0;
        released.grabbedBy = undefined;
        player.release();

        //Fall animation
        released.movementComponent.animationPlaying = true;
        const initialPos = released.movementComponent.pos[1];
        switch(side[0]){ //Side to throw
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
                    released.movementComponent.animationPlaying = false;
                    released.movementComponent.lockTyping = false;
                }
            },10)
        },150)
    }

    this.actions.hit.onMessage = (msg, {peerId}) => {
        if(msg.target == selfId){
            player.movementComponent.animationPlaying = true;
            console.log(msg)
            player.movementComponent.movement[1] = 0
            switch(msg.side[0]){
                case 1:
                    player.movementComponent.movement[0] = 1;		
                break;
                case -1:
                    player.movementComponent.movement[0] = -1
                break;
            }
            setTimeout(() =>{
                player.movementComponent.movement[0] = 0;
                player.movementComponent.animationPlaying = false;
            }, 500 )
        }
    }

    this.actions.mute.onMessage = (o,{peerId}) =>{
        const mute = this.getById(peerId);
        mute.muted = true;
    }

    this.actions.playSound.onMessage = (sound, {peerId}) => {
        const playing = this.getById(peerId);
        playing.playSound(sound);
    }
    }
    getById(id){
    for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];
        if(player.id == id){
            return player;
        }
    }
    return 0;
}
}



export {Room}