import { AnimationComponent } from "./animationComponent";

class Background{
    constructor(name){
        this.sprite = new Image;
        this.name = name;
        this.animationComponent = new AnimationComponent(0, "")
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
                this.scale = 2
            break;
            case "castletown_1":
                this.name = "castletown_1";
                this.setSrc("Castle_Town_Chapter_1.png");
                this.animated = false;
                this.scale = 1
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