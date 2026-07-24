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
                this.setSrc("castle_town.png");
                this.animated = true;
                this.animationComponent.frames = 3;
                this.animationComponent.sprite.src = "fountain.png"
                this.animatedPos = [147,-1]
                this.animationComponent.size = [24,66];
                this.movementComponent.mapSize = [320,240]
                this.scale = 2
                this.exits = {
                    south: "castletown_1",
                }
            break;
            case "castletown_1":
                this.name = "castletown_1";
                this.setSrc("Castle_Town_Chapter_1.png");
                this.animated = false;
                this.scale = 1
                this.movementComponent.mapSize = [640,480]
                this.exits = {
                    north: "castletown",
                }
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