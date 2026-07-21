import { AnimationComponent } from "./animationComponent";

class PlayerAnimation extends AnimationComponent{
    constructor(frames, avatar){
        super(frames,avatar)
        this.offset = 0;
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