import { AnimationComponent } from "./animationComponent";

class PlayerAnimation extends AnimationComponent{
    constructor(frames, avatar,size, animations){
        super(frames,avatar, size)
        this.offset = 0;
        this.animation = "idle";
        this.animations = animations;
        this.setAnimation("idle")
    }

    setAnimation(animationName){
        let animation = this.animations[animationName]
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
        if(this.avatar){
            this.frame[0] = (this.size[0]*this.currentFrame) + this.offset
        }
    }
    
}

export {PlayerAnimation}