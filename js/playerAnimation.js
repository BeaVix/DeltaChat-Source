import { AnimationComponent } from "./animationComponent";

class PlayerAnimation extends AnimationComponent{
    constructor(frames, avatar){
        super(frames,avatar)
        this.offset = 0;
        this.atlas = {
            idle: 0,
            left: 32,
            right: 64,
            up: 96,
            down: 0,
            sleep:128
        }
        this.animation = "idle";
        switch(avatar){
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
    }

    setAnimation(animationName){
        const animations = Object.keys(this.atlas)
        for (let i = 0; i < animations.length; i++) {
            const animation = animations[i];
            if(animation == animationName){
                this.offset = this.atlas[animation];
                this.animation = animationName
                break
            }
        }
    }

    nextFrame(){
        if(this.frames && this.currentFrame < this.frames-1){
            this.currentFrame += 1
        }else{
            this.currentFrame = 0
        }
        if(this.avatar != "bibliox" && this.avatar != "rabbick"){
            this.frame[0] = (16*this.currentFrame) + this.offset
        }else{
            this.frame[0] = (16*this.currentFrame)
        }
    }
    
}

export {PlayerAnimation}