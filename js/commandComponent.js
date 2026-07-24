import { Command } from "./command"
class CommandComponent{
    constructor(player, players, room, msg, canvas){
        this.player = player;
        this.room = room;
        this.players = players;
        this.msg = msg;
        this.canvas = canvas;
        this.commands = [
			new Command("mute", this.mute, 1), 
			new Command("leave", this.leaveRoom, 0),
			new Command("sleep", this.sleep, 0),
		]
    }

    mute(obj, playerId){
        for (let i = 0; i < obj.players.length; i++) {
            const player = obj.players[i];
            
            if (player.id == playerId) {
                player.muted = true;
                obj.msg("Muted " +player.nick, "red")
                obj.room.actions.mute.send({}, {target: playerId})
                break;
            }
        }
        
    }
    leaveRoom(obj){
        obj.room.room.leave();
        location.reload();
    }
    sleep(obj){
        obj.player.animationComponent.setAnimation("sleep")
        obj.player.sleep = true;
        obj.room.actions.animationChanged.send("sleep")
    }
}

export{CommandComponent}