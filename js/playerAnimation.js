import { AnimationComponent } from "./animationComponent";

class PlayerAnimation extends AnimationComponent{
    constructor(frames, avatar){
        super(frames,avatar)
        this.offset = 0;
        this.animation = "idle";
        this.atlas = {
            idle: {pos: 0, frames: frames },
            left: {pos: 32, frames: frames},
            right: {pos: 64, frames: frames},
            up: {pos: 96, frames: frames},
            down: {pos: 0, frames: frames},
            sleep: {pos: 128, frames: frames}
        }
        switch(avatar){
            case "frisk":
            case "chara":
            case "flowey":
                this.atlas.sleep.frames = 1;
            break;
            case "spamton":
                this.atlas.idle.pos = 216;
                this.atlas.idle.frames = 3
                this.atlas.left.pos = 0;
                this.atlas.right.pos = 120;
                this.atlas.up.pos = 48;
                this.atlas.up.frames = 3
                this.atlas.down.pos = 0;
                this.atlas.sleep.pos = 168;
                this.atlas.sleep.frames = 1;
                break;
            case "kawkaw":
                this.atlas.down = 96
                this.atlas.up = 128;
                break;
            case "noyno":
            case "flowery":
                this.atlas.up = 32
                this.atlas.left = 64
                this.atlas.right = 96
                this.atlas.sleep = 128
                break
        }
        if(avatar== "flowey"){
            this.atlas.idle.frames = 1;
            this.atlas.left.frames = 4;
            this.atlas.right.frames = 4;
            this.atlas.up.frames = 4;
            this.atlas.down.frames = 4;
            this.atlas.left.pos = 16;
            this.atlas.right.pos = 16;
            this.atlas.up.pos = 16;
            this.atlas.down.pos = 16;
        }
        this.setAnimation("idle")
    }

    setAnimation(animationName){
        let animation = this.atlas[animationName]
        this.offset = animation.pos;
        this.frames = animation.frames;
        this.animation = animationName
    }

    nextFrame(){
        if(this.frames > 1 && this.currentFrame < this.frames-1){
            this.currentFrame += 1
        }else{
            this.currentFrame = 0
        }
        if(this.avatar != "bibliox" && this.avatar != "rabbick" && this.avatar != "orange rabbick"){
            this.frame[0] = (this.size[0]*this.currentFrame) + this.offset
        }else{
            this.frame[0] = (this.size[0]*this.currentFrame)
        }
    }
    
}

export {PlayerAnimation}