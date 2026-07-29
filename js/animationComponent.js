class AnimationComponent{
    constructor(frames, avatar, size){
        this.frames = frames
        this.setAvatar(avatar)
        this.size = size;
        this.frame = [0,0];
        this.currentFrame = 0;
        this.framerate = 345    //milliseconds
        this.lastUpdate = 0;
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
        if(delta >= this.framerate && this.frames && this.size){
            this.nextFrame();
            this.lastUpdate = timestamp
        }
    }

    setAvatar(avatar){
        this.avatar = avatar
        this.sprite = new Image();
        this.sprite.src = this.avatar + ".png";
    }
}

export {AnimationComponent}