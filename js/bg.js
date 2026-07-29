import { AnimationComponent } from "./animationComponent";

class Background{
    constructor(data, movementComponent){
        this.size = data.size
        this.image = data.image
        this.hitboxes = data.hitboxes
        this.objects = data.objects
        this.movementComponent = movementComponent

        this.animationComponent = new AnimationComponent(data.frames, this.image, this.size);
        this.movementComponent.mapSize = this.size
    }
    setSrc(src){
        this.sprite.src = src;
    }
}

export {Background}