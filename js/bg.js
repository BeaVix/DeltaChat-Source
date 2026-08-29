import { AnimationComponent } from "./animationComponent";

class Background{
    constructor(data, movementComponent){
        this.id = data.id
        this.size = data.size
        this.initialPos = data.initialPos;
        this.image = data.image
        this.hitboxes = data.hitboxes
        this.objects = data.objects
        this.scale = data.scale
        this.movementComponent = movementComponent

        this.animationComponent = new AnimationComponent(data.frames, this.image, this.size);
        this.movementComponent.mapSize = this.size
    }
    setSrc(src){
        this.sprite.src = src;
    }
}

export {Background}