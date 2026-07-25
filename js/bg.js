import { AnimationComponent } from "./animationComponent";

class Background{
    constructor(name, movementComponent){
        this.sprite = new Image;
        this.name = name;
        this.animationComponent = new AnimationComponent(0, "")
        this.movementComponent = movementComponent
        this.setBg(name)
    }
    setBg(background){
        switch(background.toLowerCase()){
            case "castletown":
                this.name = "castletown";
                this.setSrc("castletown.png");
                this.animated = true;
                this.animationComponent.frames = 3;
                this.animationComponent.sprite.src = "fountain.png"
                this.animatedPos = [147,-1]
                this.animationComponent.size = [24,66];
                this.movementComponent.mapSize = [320,580]
                this.scale = 2
            break;
            case "cafe":
                this.name = "cafe";
                this.setSrc("cafe.png");
                this.animated = false;
                this.movementComponent.mapSize = [640,480]
                this.scale = 2
            break;
            default:
                return 0;
        }
        return this.bg;
    }
    setSrc(src){
        this.sprite.src = src;
    }
}

export {Background}