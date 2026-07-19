import { AnimationComponent } from "./animationComponent";

class Background{
    constructor(src, animated=false,frames=0, animatedSrc=undefined,animatedPos=undefined){
        this.animated = animated
        this.sprite = new Image;
        this.sprite.src = src;
        if(this.animated){    
            this.animatedPos = animatedPos
            this.animationComponent = new AnimationComponent(frames, animatedSrc)
        }
    }
    setSrc(src){
        this.sprite.src = src;
    }
}

export {Background}