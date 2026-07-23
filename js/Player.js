import { ChatComponent } from "./chatComponent";
import { MovementComponent } from "./movementComponent";
import { PlayerAnimation } from "./playerAnimation";
import { AnimationComponent } from "./animationComponent";
class Player{
    constructor(id, nick, avatar, frames){
        this.id = id;
        this.nick = nick;
        this.muted = false;
        this.animationComponent = new PlayerAnimation(frames, avatar);
        this.movementComponent = new MovementComponent(2, [150,140], this.animationComponent);
        this.chatComponent = new ChatComponent();
        this.grabbedBy;
        this.grabbing;
        this.sfx = new Audio();
        this.sfx.autoplay = true;
        
        this.sleep = false;
        let bubble = "sleep_bubbleK"
        switch (avatar) {
            case "susie":
                bubble = "sleep_bubbleS"
                break;
            case "ralsei":
            case "noyno":
                bubble = "sleep_bubbleR"
            default:
                break;
        }
        this.sleepBubble = new AnimationComponent(2,bubble)

        if(nick.replace(" ","") != "" && nick){
            nick = nick.trim();
            this.nick = nick;     
        }else if(!nick){
            this.nick = ("ANON_"+id).slice(0,10);
        }
    }
    release(){
        this.grabbing = undefined;
    }

    playSound(src){
        this.sfx.src = src + ".wav"
    }
}

export{Player}