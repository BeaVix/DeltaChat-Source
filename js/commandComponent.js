import { Command } from "./command"
import { setBg } from "./canvas";
class CommandComponent{
    constructor(player, players, room, msg){
        this.player = player;
        this.room = room;
        this.players = players;
        this.msg = msg;
        this.commands = [
			new Command("mute", this.mute, 1), 
			new Command("leave", this.leaveRoom, 0),
			new Command("changeMap", this.changeMap, 1),
			new Command("sleep", this.sleep, 0)
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
    changeMap(obj, map){
        setBg(map);
        let size;
        switch (map) {
            case "castletown":
                size = [320,240]
                break;
        
            case "castletown_1":
                size = [640,480]
                break;
        }
        obj.player.movementComponent.mapSize = size
        obj.msg("Changed map", "white")
        obj.room.actions.mapChanged.send({map: map, size: size});
    }
    sleep(obj){
        obj.player.animationComponent.offset = 128;
        obj.player.sleep = true;
        obj.room.actions.animationChanged.send(obj.player.animationComponent.offset)
    }
}

export{CommandComponent}