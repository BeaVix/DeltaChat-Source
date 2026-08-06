import { Command } from "./command"
import { updateOnline } from "./onlineSidebar";

class CommandComponent{
    constructor(player, players, room, msg){
        this.player = player;
        this.room = room;
        this.players = players;
        this.msg = msg;
        this.commands = [
			new Command("mute", this.mute, 1, "Mute player"), 
			new Command("leave", this.leaveRoom, 0, "Leave room"),
			new Command("sleep", this.sleep, 0, "Sleep emote"),
            new Command("sloop", this.sleep,0,"Sloop emote"),
            new Command("avatar", this.avatar, 1, "Change avatar"),
            new Command("nick", this.nick, 1, "Change nickname"),
            new Command("help", this.help, 0, "Show this list")
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
    avatar(obj, avatar){
        avatar = avatar.replace("_", " ")
        if(obj.player.setAvatar(avatar)){
            obj.player.animationComponent.setAnimation("idle");
            this.sprite = new Image();
            obj.room.actions.changeAvatar.send(avatar)
            obj.room.actions.animationChanged.send("idle")
            updateOnline(obj.players)
        }else{
            obj.msg("No such avatar (hint: replace spaces with underscores!)", "red")
        }
    }
    nick(obj, name){
        name  = name.replace("_", " ");
        obj.player.nick = name;
        obj.room.actions.changeNick.send(name)
        updateOnline(obj.players)
    }
    help(obj){
        obj.commands.forEach(command => {
            obj.msg(command.name+": " + command.desc, "white")
        });
    }
}

export{CommandComponent}