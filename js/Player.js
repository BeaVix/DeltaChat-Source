import { ChatComponent } from "./chatComponent";
import { MovementComponent } from "./movementComponent";
import { PlayerAnimation } from "./playerAnimation";
import { AnimationComponent } from "./animationComponent";
import characterData from "./../characters.json";
import { SoundComponent } from "./soundComponent";

const playerVolume = document.querySelector("#playerVolume")
class Player{
    constructor(id, nick, avatar, frames, initialPos){
        this.id = id;
        this.nick = nick;

        this.data = characterData.find(character => character.id == avatar)
        this.setAvatar(avatar)

        this.muted = false;
        
        this.chatComponent = new ChatComponent();
        this.sound = new SoundComponent(playerVolume);
        this.grabbedBy;
        this.grabbing;

        
        this.isTyping = false;
        let typingBubble = this.data.typingBubble ? this.data.typingBubble: "typing_bubbleK";
        this.typingBubble = new AnimationComponent(2,typingBubble, [16,16])

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

    setAvatar(avatar){
        let found = false;
        for (let i = 0; i < characterData.length; i++) {
            const character = characterData[i];
            if(character.id == avatar){
                this.data = character;
                found = true
                break
            }
        }
        if(found){
            if(!this.animationComponent){
                this.animationComponent = new PlayerAnimation(0, avatar, this.data.size, this.data.animations);
                this.movementComponent = new MovementComponent(2, [160 - this.data.size[0]/2,120], this.animationComponent);
            }else{
                this.animationComponent.setAvatar(avatar)
                this.animationComponent.size = this.data.size
                this.animationComponent.animations = this.data.animations
                if(this.data.sleepBubble){
                    this.sleepBubble.setAvatar(this.data.sleepBubble)
                }else{
                    this.sleepBubble.setAvatar("sleep_bubbleK")
                }
                let typingBubble = this.data.typingBubble ? this.data.typingBubble : "typing_bubbleK";
                this.typingBubble.setAvatar(typingBubble);
            }
        }
        return found
    }
}

export{Player}