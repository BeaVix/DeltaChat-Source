import { ChatComponent } from "./chatComponent";
import { MovementComponent } from "./movementComponent";
import { PlayerAnimation } from "./playerAnimation";
import { AnimationComponent } from "./animationComponent";
import characterData from "./../characters.json";
class Player{
    constructor(id, nick, avatar, frames){
        this.id = id;
        this.nick = nick;

        for (let i = 0; i < characterData.length; i++) {
            const character = characterData[i];
            if(character.id == avatar){
                this.data = character;
                console.log(this.data)
                break
            }
        }

        this.muted = false;
        this.animationComponent = new PlayerAnimation(frames, avatar, this.data.size, this.data.animations);
        this.movementComponent = new MovementComponent(2, [160 - this.data.size[0]/2,120], this.animationComponent);
        this.chatComponent = new ChatComponent();
        this.grabbedBy;
        this.grabbing;
        this.sfx = new Audio();
        this.sfx.autoplay = true;
        
        this.sleep = false;
        let sleepBubble = "sleep_bubbleK"
        if(this.data.sleepBubble){
            sleepBubble = this.data.sleepBubble;
        }
        this.sleepBubble = new AnimationComponent(2,sleepBubble, [16,16])

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