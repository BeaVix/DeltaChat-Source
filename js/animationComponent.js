class AnimationComponent{
    constructor(frames, avatar){
        this.frames = frames
        this.avatar = avatar;
        this.size = [16,16];
        this.frame = [0,0];
        this.currentFrame = 0;
        this.framerate = 345    //milliseconds
        this.lastUpdate = 0;
        this.sprite = new Image();
        this.sprite.src = this.avatar + ".png";
        this.rotation = 0;   //degs
    }

    nextFrame(){
        if(this.frames && this.currentFrame < this.frames-1){
            this.currentFrame += 1
        }else{
            this.currentFrame = 0
        }
        this.frame[0] = (this.size[0]*this.currentFrame)
    }

    update(timestamp){
        if(this.lastUpdate == undefined){
            this.lastUpdate = timestamp
        }
        const delta = timestamp - this.lastUpdate;
        if(delta >= this.framerate && this.frames){
            this.nextFrame();
            this.lastUpdate = timestamp
        }
    }
}

export {AnimationComponent}