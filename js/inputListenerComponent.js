const sendButton = document.querySelector("#sendButton")
const textInput = document.querySelector("#textInput")
class InputListenerComponent{
    constructor(player, players, room, musicPlayer){
    this.player = player
    this.players = players;
    this.musicPlayer = musicPlayer;
    this.animationComponent = player.animationComponent;
    this.movementComponent = player.movementComponent;
    this.room = room;
    this.lastKeyPressed;
    window.addEventListener("keydown", e => {
        if(this.movementComponent.canMove && !this.movementComponent.animationPlaying){
            switch(e.key.toLowerCase()){
                case "arrowup":
                case "w":
                    this.movementComponent.movement[1] = -1
                    this.animationComponent.setAnimation("walk_up");
                    break;
                case "arrowdown":
                case "s":
                    this.movementComponent.movement[1] = 1
                    this.animationComponent.setAnimation("walk_down")
                    break;
                case "arrowright":
                case "d":
                    this.movementComponent.movement[0] = 1
                    this.animationComponent.setAnimation("walk_right")
                    break;
                case "arrowleft":
                case "a":
                    this.movementComponent.movement[0] = -1
                    this.animationComponent.setAnimation("walk_left")
                    break;
                case "m":
                    if(!this.musicPlayer.paused){
                        this.musicPlayer.pause()
                    }else{
                        this.musicPlayer.play()
                    }
                    break;
                case "e":
                    const playerTest = this.testHitbox();
                    if(playerTest && playerTest.canBePushed){
                        this.room.actions.hit.send({target: playerTest.id, side: this.player.movementComponent.lastMovement});
                    }
                break;
                case "g":
                    if(!this.player.grabbing && !this.player.grabbedBy){
                        const playerTest = this.testHitbox();
                        console.log(playerTest)
                        if(playerTest && playerTest.canBeGrabbed){
                            this.player.grabbing = playerTest.id;
                            playerTest.grabbedBy = this.player.id;
                            playerTest.animationComponent.rotation = 90;
                            playerTest.movementComponent.pos = this.player.movementComponent.pos
                            this.room.actions.grab.send(playerTest.id)
                            this.player.sound.playSound("snd_board_lift")
                        }
                    }else{
                        this.room.actions.release.send({side: this.player.movementComponent.lastMovement, target: this.player.grabbing})
                        const peer = this.searchById(this.player.grabbing)
                        peer.grabbedBy = undefined;
                        peer.animationComponent.rotation = 0;
                        peer.movementComponent.pos = [this.player.movementComponent.pos[0], this.player.movementComponent.pos[1]-25]
                        this.player.grabbing = undefined;
                    }
                    break;
                case "q":
                    if(this.player.data.sfx){
                        const specialSfxChance = Math.floor(Math.random() * 100)
                        const index = Math.floor(Math.random()*this.player.data.sfx.length)
                        let sound = this.player.data.sfx[index]
                        if(specialSfxChance == 1 && this.player.data.specialSfx){
                           sound = this.player.data.specialSfx
                        }
                        this.player.sound.playSound(sound)
                        this.room.actions.playSound.send(sound);
                    }
                default:
                break;
            }
            switch(e.key.toLowerCase()){
                case "arrowup":
                case "w":
                case "arrowdown":
                case "s":
                case "arrowright":
                case "d":
                case "arrowleft":
                case "a":
                    this.player.sleep = false
                    if(this.lastKeyPressed != e.key){
                        this.room.actions.animationChanged.send(this.animationComponent.animation);
                    }else{
                        this.lastKeyPressed = e.key;
                    }
                    
                break;
            }
        }
        if(e.key.toLowerCase() == "enter"){
            sendButton.click();
            this.player.isTyping = false;
        }else if(e.key == "Escape"){
            if(textInput == document.activeElement){
                textInput.blur();
            }
        }
});

    textInput.addEventListener("input", e => {
        if(textInput.value != "" && textInput.value[0] != "/"){
            this.player.isTyping = true;
            this.room.actions.typing.send(true);
        }else{
            this.player.isTyping = false;
            this.room.actions.typing.send(false);
        }
    })

    window.addEventListener("keyup", e =>{
        if(this.movementComponent.canMove && !this.movementComponent.animationPlaying){
            switch(e.key.toLowerCase()){
                case "arrowup":
                case "w":
                case "arrowdown":
                case "s":
                    this.movementComponent.movement[1] = 0
                    break;
                case "arrowright":
                case "d":
                case "arrowleft":
                case "a":
                    this.movementComponent.movement[0] = 0
                default:
                    break;
                case "t":
                    textInput.focus();
                    this.movementComponent.movement[0] = 0
                    this.movementComponent.movement[1] = 0
                break;
                break;
            }
            if(!this.movementComponent.movement[0] && !this.movementComponent.movement[1]){
                this.animationComponent.setAnimation("idle")
                room.actions.animationChanged.send(this.animationComponent.animation);
            }
        }
    })
    }
    searchById(id){
        for (let i = 0; i < this.players.length; i++) {
            const peer = this.players[i];
            if(id == peer.id){
                return peer;
            }    
        }
    }

    testHitbox(){
        for (let i = 0; i < this.players.length; i++) {
            const playerTest = this.players[i];
            if(playerTest.id != this.player.id && !playerTest.muted && !playerTest.movementComponent.animationPlaying && !playerTest.grabbedBy){
                const hit = this.movementComponent.testHitbox(playerTest.movementComponent.pos, playerTest.animationComponent.size);
                if(hit){
                    return playerTest;
                }
            }
        }
    }
}



export{InputListenerComponent}