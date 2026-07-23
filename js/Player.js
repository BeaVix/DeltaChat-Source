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
                break;
            case "kawkaw":
                this.randomSfx = [
                    "snd_bird_happy_1",
                    "snd_bird_happy_2",
                    "snd_bird_licking_1",
                    "snd_bird_licking_2",
                    "snd_bird_licking_3",
                ]
                break;
            case "flowery":
                this.randomSfx = [
                    "./flowery/snd_flowery_voiceclip_all_according_to_all_according_to_plant",
                    "./flowery/snd_flowery_voiceclip_glue",
                    "./flowery/snd_flowery_voiceclip_go_home",
                    "./flowery/snd_flowery_voiceclip_heh_it_s_my_jarona",
                    "./flowery/snd_flowery_voiceclip_hereicome",
                    "./flowery/snd_flowery_voiceclip_hereicomesanfrandisc",
                    "./flowery/snd_flowery_voiceclip_hereicomesanfrandisco_strong",
                    "./flowery/snd_flowery_voiceclip_hereicomesanfrandisco_weak",
                    "./flowery/snd_flowery_voiceclip_heyguysithinkifoundaglue",
                    "./flowery/snd_flowery_voiceclip_mysterious_wind",
                    "./flowery/snd_flowery_voiceclip_my_king",
                    "./flowery/snd_flowery_voiceclip_what_a_predictable_creature",
                    "./flowery/snd_flowery_voiceclip_theyre_eating_my_flesh",
                    "./flowery/snd_flowery_voiceclip_yourdadsmybestfriend",
                    "./flowery/snd_flowery_voiceclip_your_dad",
                    "./flowery/snd_flowery_voiceclip_stingus",
                    "./flowery/snd_flowery_voiceclip_sorrytokeepyouwaiting1",
                    "./flowery/snd_flowery_voiceclip_flowers_blooms_in_your_heart",
                    "./flowery/snd_flowery_voiceclip_mostlys",
                    "./flowery/snd_flowery_voiceclip_yes",
                    "./flowery/snd_flowery_voiceclip_imsorryonceagainikeptaladyinwaiting",
                    "./flowery/snd_flowery_voiceclip_nonono",
                    "./flowery/snd_flowery_voiceclip_sanfran",
                    "./flowery/snd_flowery_voiceclip_itsmeflowery"
                ]
                break;
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